import { performance } from 'perf_hooks';
import fs from 'fs/promises';
import path from 'path';

interface PerformanceMetric {
  timestamp: string;
  endpoint: string;
  responseTime: number;
  statusCode: number;
  method: string;
  userAgent?: string;
  memoryUsage: NodeJS.MemoryUsage;
  cpuUsage: NodeJS.CpuUsage;
}

interface SystemHealth {
  timestamp: string;
  uptime: number;
  memoryUsage: NodeJS.MemoryUsage;
  cpuUsage: NodeJS.CpuUsage;
  loadAverage: number[];
  freeMemory: number;
  totalMemory: number;
}

class PerformanceMonitor {
  private metricsBuffer: PerformanceMetric[] = [];
  private systemHealthBuffer: SystemHealth[] = [];
  private readonly MAX_BUFFER_SIZE = 10000;
  private readonly METRICS_FILE = path.join(process.cwd(), 'performance-metrics.json');
  private readonly HEALTH_FILE = path.join(process.cwd(), 'system-health.json');
  private startTime = process.hrtime.bigint();

  constructor() {
    // Collect system health every 30 seconds
    setInterval(() => {
      this.collectSystemHealth();
    }, 30000);

    // Flush buffers to files every 5 minutes
    setInterval(() => {
      this.flushToFiles();
    }, 300000);
  }

  // Middleware to track API performance
  trackRequest() {
    return (req: any, res: any, next: any) => {
      const startTime = performance.now();
      const startCpuUsage = process.cpuUsage();

      res.on('finish', () => {
        const endTime = performance.now();
        const responseTime = endTime - startTime;
        const endCpuUsage = process.cpuUsage(startCpuUsage);

        const metric: PerformanceMetric = {
          timestamp: new Date().toISOString(),
          endpoint: req.path,
          responseTime: Math.round(responseTime * 100) / 100, // Round to 2 decimal places
          statusCode: res.statusCode,
          method: req.method,
          userAgent: req.get('User-Agent'),
          memoryUsage: process.memoryUsage(),
          cpuUsage: endCpuUsage
        };

        this.addMetric(metric);
      });

      next();
    };
  }

  private addMetric(metric: PerformanceMetric) {
    this.metricsBuffer.push(metric);
    
    // Keep buffer size manageable
    if (this.metricsBuffer.length > this.MAX_BUFFER_SIZE) {
      this.metricsBuffer = this.metricsBuffer.slice(-this.MAX_BUFFER_SIZE);
    }
  }

  private collectSystemHealth() {
    const health: SystemHealth = {
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      cpuUsage: process.cpuUsage(),
      loadAverage: process.platform === 'linux' ? require('os').loadavg() : [0, 0, 0],
      freeMemory: require('os').freemem(),
      totalMemory: require('os').totalmem()
    };

    this.systemHealthBuffer.push(health);
    
    // Keep last 24 hours of data (2880 data points at 30s intervals)
    if (this.systemHealthBuffer.length > 2880) {
      this.systemHealthBuffer = this.systemHealthBuffer.slice(-2880);
    }
  }

  private async flushToFiles() {
    try {
      // Save performance metrics
      if (this.metricsBuffer.length > 0) {
        await fs.writeFile(this.METRICS_FILE, JSON.stringify(this.metricsBuffer, null, 2));
      }

      // Save system health data
      if (this.systemHealthBuffer.length > 0) {
        await fs.writeFile(this.HEALTH_FILE, JSON.stringify(this.systemHealthBuffer, null, 2));
      }
    } catch (error) {
      console.error('Failed to flush performance data to files:', error);
    }
  }

  // Get current performance statistics
  async getPerformanceStats() {
    const now = Date.now();
    const last24Hours = this.metricsBuffer.filter(
      m => Date.now() - new Date(m.timestamp).getTime() < 24 * 60 * 60 * 1000
    );

    const stats = {
      totalRequests: last24Hours.length,
      averageResponseTime: last24Hours.reduce((sum, m) => sum + m.responseTime, 0) / last24Hours.length || 0,
      medianResponseTime: this.calculateMedian(last24Hours.map(m => m.responseTime)),
      p95ResponseTime: this.calculatePercentile(last24Hours.map(m => m.responseTime), 95),
      p99ResponseTime: this.calculatePercentile(last24Hours.map(m => m.responseTime), 99),
      errorRate: (last24Hours.filter(m => m.statusCode >= 400).length / last24Hours.length) * 100 || 0,
      requestsPerSecond: last24Hours.length / (24 * 60 * 60),
      endpointBreakdown: this.getEndpointBreakdown(last24Hours),
      memoryStats: this.getMemoryStats(),
      uptime: process.uptime()
    };

    return stats;
  }

  private calculateMedian(values: number[]): number {
    if (values.length === 0) return 0;
    const sorted = values.sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
  }

  private calculatePercentile(values: number[], percentile: number): number {
    if (values.length === 0) return 0;
    const sorted = values.sort((a, b) => a - b);
    const index = Math.ceil(sorted.length * (percentile / 100)) - 1;
    return sorted[index] || 0;
  }

  private getEndpointBreakdown(metrics: PerformanceMetric[]) {
    const breakdown: { [key: string]: { count: number; avgResponseTime: number } } = {};
    
    metrics.forEach(m => {
      if (!breakdown[m.endpoint]) {
        breakdown[m.endpoint] = { count: 0, avgResponseTime: 0 };
      }
      breakdown[m.endpoint].count++;
      breakdown[m.endpoint].avgResponseTime += m.responseTime;
    });

    // Calculate averages
    Object.keys(breakdown).forEach(endpoint => {
      breakdown[endpoint].avgResponseTime = 
        breakdown[endpoint].avgResponseTime / breakdown[endpoint].count;
    });

    return breakdown;
  }

  private getMemoryStats() {
    const usage = process.memoryUsage();
    return {
      rss: Math.round(usage.rss / 1024 / 1024), // MB
      heapTotal: Math.round(usage.heapTotal / 1024 / 1024), // MB
      heapUsed: Math.round(usage.heapUsed / 1024 / 1024), // MB
      external: Math.round(usage.external / 1024 / 1024), // MB
      arrayBuffers: Math.round(usage.arrayBuffers / 1024 / 1024) // MB
    };
  }

  // Export data for academic review
  async exportPerformanceReport() {
    const stats = await this.getPerformanceStats();
    const report = {
      generatedAt: new Date().toISOString(),
      systemInfo: {
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch,
        uptime: process.uptime()
      },
      performanceMetrics: stats,
      rawMetrics: this.metricsBuffer,
      systemHealth: this.systemHealthBuffer
    };

    const reportFile = path.join(process.cwd(), `performance-report-${Date.now()}.json`);
    await fs.writeFile(reportFile, JSON.stringify(report, null, 2));
    
    return reportFile;
  }
}

export const performanceMonitor = new PerformanceMonitor();