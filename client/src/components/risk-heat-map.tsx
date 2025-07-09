import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Activity,
  MapPin,
  Clock,
  Thermometer,
  Zap,
  RefreshCw
} from 'lucide-react';

interface RiskData {
  id: string;
  projectName: string;
  projectType: 'solar' | 'wind' | 'hydro' | 'biomass' | 'geothermal';
  location: string;
  riskLevel: number; // 0-100
  riskCategory: 'Low' | 'Medium' | 'High' | 'Critical';
  factors: RiskFactor[];
  trend: 'increasing' | 'decreasing' | 'stable';
  lastUpdated: string;
  alerts: string[];
}

interface RiskFactor {
  name: string;
  value: number;
  impact: 'positive' | 'negative' | 'neutral';
  description: string;
}

interface HeatMapCell {
  x: number;
  y: number;
  value: number;
  project: RiskData;
  color: string;
}

export default function RiskHeatMap() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const [selectedCell, setSelectedCell] = useState<HeatMapCell | null>(null);
  const [isRealTime, setIsRealTime] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate real-time risk data
  const [riskData, setRiskData] = useState<RiskData[]>([
    {
      id: 'risk-1',
      projectName: 'Lagos Solar Farm',
      projectType: 'solar',
      location: 'Lagos, Nigeria',
      riskLevel: 25,
      riskCategory: 'Low',
      factors: [
        { name: 'Weather Risk', value: 15, impact: 'negative', description: 'Seasonal variation in solar irradiance' },
        { name: 'Regulatory Risk', value: 10, impact: 'neutral', description: 'Stable government policies' },
        { name: 'Technology Risk', value: 5, impact: 'positive', description: 'Proven solar technology' },
        { name: 'Market Risk', value: 20, impact: 'negative', description: 'Energy price volatility' }
      ],
      trend: 'stable',
      lastUpdated: '2 mins ago',
      alerts: []
    },
    {
      id: 'risk-2',
      projectName: 'Kano Wind Farm',
      projectType: 'wind',
      location: 'Kano, Nigeria',
      riskLevel: 45,
      riskCategory: 'Medium',
      factors: [
        { name: 'Weather Risk', value: 35, impact: 'negative', description: 'Variable wind patterns' },
        { name: 'Technology Risk', value: 15, impact: 'neutral', description: 'Mature wind technology' },
        { name: 'Grid Risk', value: 25, impact: 'negative', description: 'Grid stability concerns' },
        { name: 'Environmental Risk', value: 10, impact: 'positive', description: 'Low environmental impact' }
      ],
      trend: 'increasing',
      lastUpdated: '5 mins ago',
      alerts: ['Wind speed below forecast', 'Grid connectivity issues reported']
    },
    {
      id: 'risk-3',
      projectName: 'Plateau Hydro Plant',
      projectType: 'hydro',
      location: 'Jos, Nigeria',
      riskLevel: 15,
      riskCategory: 'Low',
      factors: [
        { name: 'Water Risk', value: 20, impact: 'negative', description: 'Seasonal water level variation' },
        { name: 'Technology Risk', value: 5, impact: 'positive', description: 'Proven hydro technology' },
        { name: 'Environmental Risk', value: 15, impact: 'neutral', description: 'Managed environmental impact' },
        { name: 'Political Risk', value: 10, impact: 'neutral', description: 'Stable regional politics' }
      ],
      trend: 'decreasing',
      lastUpdated: '1 min ago',
      alerts: []
    },
    {
      id: 'risk-4',
      projectName: 'Cross River Biomass',
      projectType: 'biomass',
      location: 'Calabar, Nigeria',
      riskLevel: 65,
      riskCategory: 'High',
      factors: [
        { name: 'Supply Risk', value: 45, impact: 'negative', description: 'Biomass feedstock availability' },
        { name: 'Technology Risk', value: 30, impact: 'negative', description: 'Emerging biomass technology' },
        { name: 'Regulatory Risk', value: 20, impact: 'neutral', description: 'Evolving biomass regulations' },
        { name: 'Market Risk', value: 25, impact: 'negative', description: 'Competition for biomass' }
      ],
      trend: 'increasing',
      lastUpdated: '3 mins ago',
      alerts: ['Feedstock supply disruption', 'Technology maintenance required']
    }
  ]);

  // Generate heat map grid
  const generateHeatMapData = (): HeatMapCell[] => {
    const gridSize = 8;
    const cells: HeatMapCell[] = [];

    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        // Map risk data to grid positions
        const projectIndex = (x * gridSize + y) % riskData.length;
        const project = riskData[projectIndex];
        const value = project.riskLevel + Math.random() * 10 - 5; // Add some variation

        const color = getRiskColor(value);

        cells.push({
          x,
          y,
          value: Math.max(0, Math.min(100, value)),
          project,
          color
        });
      }
    }

    return cells;
  };

  const getRiskColor = (value: number): string => {
    if (value < 25) return '#10b981'; // Green
    if (value < 50) return '#f59e0b'; // Yellow
    if (value < 75) return '#f97316'; // Orange
    return '#ef4444'; // Red
  };

  const getRiskIcon = (category: string) => {
    switch (category) {
      case 'Low': return <TrendingDown className="w-4 h-4 text-green-600" />;
      case 'Medium': return <Activity className="w-4 h-4 text-yellow-600" />;
      case 'High': return <TrendingUp className="w-4 h-4 text-orange-600" />;
      case 'Critical': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="w-3 h-3 text-red-500" />;
      case 'decreasing': return <TrendingDown className="w-3 h-3 text-green-500" />;
      default: return <Activity className="w-3 h-3 text-gray-500" />;
    }
  };

  // Simulate real-time updates
  useEffect(() => {
    if (!isRealTime) return;

    const interval = setInterval(() => {
      setRiskData(prev => prev.map(project => ({
        ...project,
        riskLevel: Math.max(0, Math.min(100, project.riskLevel + (Math.random() - 0.5) * 5)),
        lastUpdated: 'Just now'
      })));
      setLastUpdate(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, [isRealTime]);

  const heatMapData = generateHeatMapData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-primary" />
              <CardTitle>Real-time Investment Risk Heat Map</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={isRealTime ? 'default' : 'outline'}
                size="sm"
                onClick={() => setIsRealTime(!isRealTime)}
              >
                <RefreshCw className={`w-4 h-4 mr-1 ${isRealTime ? 'animate-spin' : ''}`} />
                {isRealTime ? 'Live' : 'Paused'}
              </Button>
              <div className="flex gap-1">
                {(['1h', '24h', '7d', '30d'] as const).map(timeframe => (
                  <Button
                    key={timeframe}
                    variant={selectedTimeframe === timeframe ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTimeframe(timeframe)}
                  >
                    {timeframe}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Live risk monitoring across your renewable energy portfolio • Last updated: {lastUpdate.toLocaleTimeString()}
          </p>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Heat Map Visualization */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Risk Distribution Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Heat Map Grid */}
                <div className="grid grid-cols-8 gap-1 p-4 bg-gray-50 rounded-lg">
                  {heatMapData.map((cell, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded cursor-pointer transition-all hover:scale-110 hover:z-10"
                      style={{ backgroundColor: cell.color }}
                      onClick={() => setSelectedCell(cell)}
                      title={`${cell.project.projectName}: ${cell.value.toFixed(1)}% risk`}
                    />
                  ))}
                </div>

                {/* Legend */}
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span>Low Risk</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <div className="w-4 h-4 bg-orange-500 rounded"></div>
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                  </div>
                  <span>High Risk</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Risk Details Panel */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {selectedCell ? selectedCell.project.projectName : 'Risk Details'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedCell ? (
                <>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="capitalize">
                      {selectedCell.project.projectType}
                    </Badge>
                    <div className="flex items-center gap-1">
                      {getRiskIcon(selectedCell.project.riskCategory)}
                      <span className="text-sm font-medium">{selectedCell.project.riskCategory}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="w-3 h-3" />
                      {selectedCell.project.location}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="w-3 h-3" />
                      {selectedCell.project.lastUpdated}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Risk Factors</h4>
                    {selectedCell.project.factors.map((factor, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>{factor.name}</span>
                          <span className={
                            factor.impact === 'positive' ? 'text-green-600' :
                            factor.impact === 'negative' ? 'text-red-600' : 'text-gray-600'
                          }>
                            {factor.value}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div 
                            className={`h-1 rounded-full ${
                              factor.impact === 'positive' ? 'bg-green-500' :
                              factor.impact === 'negative' ? 'bg-red-500' : 'bg-gray-500'
                            }`}
                            style={{ width: `${factor.value}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500">{factor.description}</p>
                      </div>
                    ))}
                  </div>

                  {selectedCell.project.alerts.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-red-600">Active Alerts</h4>
                      {selectedCell.project.alerts.map((alert, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 bg-red-50 rounded text-sm">
                          <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span className="text-red-700">{alert}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <p className="text-sm text-gray-500 text-center py-8">
                  Click on a cell in the heat map to view detailed risk information
                </p>
              )}
            </CardContent>
          </Card>

          {/* Risk Summary */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Portfolio Risk Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {riskData.map(project => (
                  <div key={project.id} className="flex items-center justify-between p-2 rounded border">
                    <div className="flex items-center gap-2">
                      {getRiskIcon(project.riskCategory)}
                      <span className="text-sm font-medium truncate">{project.projectName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(project.trend)}
                      <span className="text-sm">{project.riskLevel.toFixed(0)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}