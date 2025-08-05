import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Brain,
  MapPin,
  Zap,
  DollarSign,
  Clock,
  Target,
  RefreshCw
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface SimulationProject {
  id: string;
  name: string;
  country: string;
  location: string;
  capacity: number; // MW
  technology: string;
  investmentRequired: number; // USD millions
  predictedIRR: number;
  riskScore: number; // 0-100 (lower is better)
  riskCategory: 'Low' | 'Medium' | 'High';
  successProbability: number; // 0-100%
  paybackPeriod: number; // years
  esgScore: number; // 0-100
  aiConfidence: number; // 0-100%
  riskFactors: {
    political: number;
    regulatory: number;
    financial: number;
    technical: number;
    environmental: number;
    market: number;
  };
  projectedMetrics: {
    year1Revenue: number;
    year5Revenue: number;
    totalJobs: number;
    co2Reduction: number; // tons per year
  };
  keyInsights: string[];
  recommendations: string[];
}

interface AIRiskSimulationResultsProps {
  isMobile?: boolean;
  className?: string;
}

export default function AIRiskSimulationResults({ isMobile = false, className = "" }: AIRiskSimulationResultsProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState<'risk' | 'returns' | 'esg'>('risk');
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const [selectedCountries, setSelectedCountries] = useState<string[]>(['Ghana', 'Nigeria', 'Kenya']);

  // Simulated AI processing for 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const simulationProjects: SimulationProject[] = [
    {
      id: 'ghana-solar-1',
      name: 'Accra Solar Complex',
      country: 'Ghana',
      location: 'Greater Accra Region',
      capacity: 50,
      technology: 'Crystalline Silicon PV + Battery Storage',
      investmentRequired: 65,
      predictedIRR: 19.2,
      riskScore: 25,
      riskCategory: 'Low',
      successProbability: 91,
      paybackPeriod: 5.8,
      esgScore: 87,
      aiConfidence: 94,
      riskFactors: {
        political: 15,
        regulatory: 20,
        financial: 18,
        technical: 12,
        environmental: 8,
        market: 22
      },
      projectedMetrics: {
        year1Revenue: 12.5,
        year5Revenue: 18.7,
        totalJobs: 285,
        co2Reduction: 42000
      },
      keyInsights: [
        "Strong government renewable energy commitment",
        "Excellent solar irradiance (4.5-5.5 kWh/m²/day)",
        "Stable political environment",
        "Growing industrial electricity demand"
      ],
      recommendations: [
        "Proceed with investment - excellent risk-return profile",
        "Consider expanding capacity by 20MW in Phase 2",
        "Implement community engagement program"
      ]
    },
    {
      id: 'nigeria-solar-1',
      name: 'Kano Solar Farm',
      country: 'Nigeria',
      location: 'Kano State',
      capacity: 75,
      technology: 'Monocrystalline Silicon PV',
      investmentRequired: 95,
      predictedIRR: 17.8,
      riskScore: 42,
      riskCategory: 'Medium',
      successProbability: 84,
      paybackPeriod: 6.4,
      esgScore: 82,
      aiConfidence: 89,
      riskFactors: {
        political: 35,
        regulatory: 28,
        financial: 45,
        technical: 15,
        environmental: 12,
        market: 38
      },
      projectedMetrics: {
        year1Revenue: 16.8,
        year5Revenue: 24.2,
        totalJobs: 420,
        co2Reduction: 63000
      },
      keyInsights: [
        "Large-scale market opportunity",
        "Grid stability challenges in northern regions",
        "Currency volatility risks (Naira)",
        "Strong solar resource availability"
      ],
      recommendations: [
        "Implement robust currency hedging strategy",
        "Partner with local grid operators",
        "Phase development to mitigate political risks"
      ]
    },
    {
      id: 'kenya-solar-1',
      name: 'Garissa Solar Park',
      country: 'Kenya',
      location: 'Garissa County',
      capacity: 60,
      technology: 'Thin-Film PV + Smart Grid Integration',
      investmentRequired: 78,
      predictedIRR: 18.5,
      riskScore: 31,
      riskCategory: 'Low',
      successProbability: 88,
      paybackPeriod: 6.1,
      esgScore: 90,
      aiConfidence: 92,
      riskFactors: {
        political: 22,
        regulatory: 18,
        financial: 25,
        technical: 20,
        environmental: 15,
        market: 28
      },
      projectedMetrics: {
        year1Revenue: 14.4,
        year5Revenue: 21.1,
        totalJobs: 350,
        co2Reduction: 50400
      },
      keyInsights: [
        "Progressive renewable energy policies",
        "Strong ESG performance potential",
        "Reliable grid infrastructure in region",
        "Government green bond financing available"
      ],
      recommendations: [
        "Leverage government green financing options",
        "Focus on community solar initiatives",
        "Consider mini-grid expansion opportunities"
      ]
    }
  ];

  // Filter projects based on selected countries
  const filteredProjects = simulationProjects.filter(project => 
    selectedCountries.includes(project.country)
  );

  // Prepare comparison data for charts
  const comparisonData = filteredProjects.map(project => ({
    country: project.country,
    name: project.name.split(' ')[0], // Short name for charts
    IRR: project.predictedIRR,
    Risk: 100 - project.riskScore, // Convert to "safety score" for better visualization
    ESG: project.esgScore,
    Investment: project.investmentRequired,
    Success: project.successProbability,
    Payback: project.paybackPeriod
  }));

  // Transform risk factor data for radar chart (factors as axes, countries as series)
  const createRiskFactorData = () => {
    const factors = ['Political', 'Regulatory', 'Financial', 'Technical', 'Environmental', 'Market'];
    return factors.map(factor => {
      const dataPoint: any = { factor };
      filteredProjects.forEach(project => {
        const factorKey = factor.toLowerCase() as keyof typeof project.riskFactors;
        dataPoint[project.country] = 100 - project.riskFactors[factorKey];
      });
      return dataPoint;
    });
  };

  const riskFactorData = createRiskFactorData();

  // Available countries for selection
  const availableCountries = simulationProjects.map(p => p.country);

  // Toggle country selection
  const toggleCountry = (country: string) => {
    if (selectedCountries.includes(country)) {
      // Don't allow removing if only 2 countries left
      if (selectedCountries.length > 2) {
        setSelectedCountries(selectedCountries.filter(c => c !== country));
      }
    } else {
      setSelectedCountries([...selectedCountries, country]);
    }
  };

  const getRiskColor = (riskCategory: string) => {
    switch (riskCategory) {
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatCurrency = (amount: number) => `$${amount.toFixed(1)}M`;

  if (isLoading) {
    return (
      <Card className={`border-2 border-blue-200 ${className}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-600 animate-pulse" />
            AI Risk Simulation Processing...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
              <span className="text-sm text-gray-600">Analyzing 3 solar projects across West/East Africa...</span>
            </div>
            <Progress value={75} className="w-full" />
            <div className="text-xs text-gray-500">
              Processing risk factors, IRR calculations, and ESG assessments...
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader className="pb-2 pt-3 sm:pb-6 sm:pt-6">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold sm:text-2xl">
            <Brain className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
            AI Risk Simulation Results
          </CardTitle>
          <p className="text-xs leading-tight mt-1 sm:text-sm text-gray-600">
            Compare solar projects across {selectedCountries.join(', ')} with our advanced AI risk analysis
          </p>
        </CardHeader>
        <CardContent className="pt-2 pb-3 sm:pt-6 sm:pb-6">
          <div className="grid gap-2 grid-cols-1 sm:gap-4 md:grid-cols-3">
            <div className="flex justify-between items-center py-2 px-3 bg-green-50 rounded sm:text-center sm:block sm:bg-transparent sm:p-0">
              <div className="text-base font-bold sm:text-2xl text-green-600">
                {selectedCountries.length}
              </div>
              <div className="text-xs text-gray-600">
                Countries
              </div>
            </div>
            <div className="flex justify-between items-center py-2 px-3 bg-blue-50 rounded sm:text-center sm:block sm:bg-transparent sm:p-0">
              <div className="text-base font-bold sm:text-2xl text-blue-600">
                {filteredProjects.reduce((sum, p) => sum + p.capacity, 0)} MW
              </div>
              <div className="text-xs text-gray-600">
                Total Capacity
              </div>
            </div>
            <div className="flex justify-between items-center py-2 px-3 bg-purple-50 rounded sm:text-center sm:block sm:bg-transparent sm:p-0">
              <div className="text-base font-bold sm:text-2xl text-purple-600">
                {Math.round(filteredProjects.reduce((sum, p) => sum + p.aiConfidence, 0) / filteredProjects.length)}%
              </div>
              <div className="text-xs text-gray-600">
                AI Confidence
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Country Selector */}
      <Card className="border-2 border-blue-200">
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-base' : 'text-lg'}`}>
            <MapPin className="w-5 h-5 text-blue-600" />
            Select Countries to Compare
          </CardTitle>
          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600`}>
            Choose 2 or 3 countries for comparison. Minimum 2 countries required.
          </p>
        </CardHeader>
        <CardContent>
          <div className={`${isMobile ? 'grid grid-cols-1 gap-3' : 'flex flex-wrap gap-3'}`}>
            {availableCountries.map(country => {
              const isSelected = selectedCountries.includes(country);
              const isDisabled = !isSelected && selectedCountries.length >= 3;
              const canRemove = selectedCountries.length > 2;
              
              return (
                <button
                  key={country}
                  onClick={() => toggleCountry(country)}
                  disabled={isDisabled || (isSelected && !canRemove)}
                  className={`${isMobile ? 'w-full py-3 px-4' : 'px-4 py-2'} rounded-lg border-2 font-medium ${isMobile ? 'text-base' : 'text-sm'} transition-all ${
                    isSelected 
                      ? 'bg-blue-100 border-blue-500 text-blue-700' 
                      : isDisabled 
                        ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50'
                  }`}
                >
                  <div className={`flex items-center ${isMobile ? 'justify-between' : 'gap-2'}`}>
                    <span>{country}</span>
                    {isSelected && (
                      <span className="text-blue-600 font-bold">✓</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
          <div className={`mt-3 ${isMobile ? 'text-center text-sm' : 'text-xs'} text-gray-500`}>
            {selectedCountries.length}/3 countries selected
          </div>
        </CardContent>
      </Card>

      {/* Metric Selector */}
      <div className={`${isMobile ? 'grid grid-cols-1 gap-2' : 'flex gap-2 justify-center flex-wrap'}`}>
        <Button 
          variant={selectedMetric === 'risk' ? 'default' : 'outline'} 
          size={isMobile ? 'default' : 'sm'}
          className={isMobile ? 'w-full' : ''}
          onClick={() => setSelectedMetric('risk')}
        >
          Risk Analysis
        </Button>
        <Button 
          variant={selectedMetric === 'returns' ? 'default' : 'outline'} 
          size={isMobile ? 'default' : 'sm'}
          className={isMobile ? 'w-full' : ''}
          onClick={() => setSelectedMetric('returns')}
        >
          Financial Returns
        </Button>
        <Button 
          variant={selectedMetric === 'esg' ? 'default' : 'outline'} 
          size={isMobile ? 'default' : 'sm'}
          className={isMobile ? 'w-full' : ''}
          onClick={() => setSelectedMetric('esg')}
        >
          ESG Impact
        </Button>
      </div>

      {/* Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            {selectedMetric === 'risk' && 'Risk vs Success Probability'}
            {selectedMetric === 'returns' && 'IRR vs Investment Required'}
            {selectedMetric === 'esg' && 'ESG Score vs CO2 Reduction'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`${isMobile ? 'h-72' : 'h-64'}`}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={comparisonData}
                margin={isMobile ? { top: 20, right: 10, left: 10, bottom: 20 } : { top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="country" 
                  fontSize={isMobile ? 10 : 12}
                  tick={{ fontSize: isMobile ? 10 : 12 }}
                />
                <YAxis 
                  fontSize={isMobile ? 10 : 12}
                  tick={{ fontSize: isMobile ? 10 : 12 }}
                />
                <Tooltip />
                <Legend 
                  wrapperStyle={{ fontSize: isMobile ? '12px' : '14px' }}
                />
                {selectedMetric === 'risk' && (
                  <>
                    <Bar dataKey="Risk" name="Safety Score" fill="#22c55e" />
                    <Bar dataKey="Success" name="Success %" fill="#3b82f6" />
                  </>
                )}
                {selectedMetric === 'returns' && (
                  <>
                    <Bar dataKey="IRR" name="IRR %" fill="#8b5cf6" />
                    <Bar dataKey="Investment" name="Investment ($M)" fill="#f59e0b" />
                  </>
                )}
                {selectedMetric === 'esg' && (
                  <>
                    <Bar dataKey="ESG" name="ESG Score" fill="#10b981" />
                  </>
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Risk Factors Radar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Risk Factor Analysis
          </CardTitle>
          <p className="text-sm text-gray-600 mt-2">
            Comparative risk assessment across 6 key factors. Higher values indicate lower risk (better performance).
          </p>
        </CardHeader>
        <CardContent>
          <div className={`${isMobile ? 'h-80' : 'h-96'}`}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart 
                data={riskFactorData} 
                margin={isMobile ? { top: 20, right: 40, bottom: 20, left: 40 } : { top: 40, right: 80, bottom: 40, left: 80 }}
              >
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis 
                  dataKey="factor" 
                  tick={{ fontSize: 12, fill: '#374151' }}
                  className="text-xs font-medium"
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                  tickCount={5}
                />
                {selectedCountries.map((country, index) => {
                  const colors = ['#22c55e', '#f59e0b', '#3b82f6']; // Green, Orange, Blue
                  return (
                    <Radar 
                      key={country}
                      name={country} 
                      dataKey={country} 
                      stroke={colors[index % colors.length]} 
                      fill={colors[index % colors.length]} 
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  );
                })}
                <Tooltip 
                  formatter={(value, name) => [`${value}%`, name]}
                  labelFormatter={(label) => `${label} Risk Factor`}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Project Details */}
      <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : selectedCountries.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
        {filteredProjects.map((project) => (
          <Card key={project.id} className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className={isMobile ? 'pb-4' : ''}>
              <div className={`flex items-start justify-between ${isMobile ? 'flex-col gap-2' : ''}`}>
                <div>
                  <CardTitle className={`${isMobile ? 'text-base' : 'text-lg'}`}>{project.name}</CardTitle>
                  <div className={`flex items-center gap-1 ${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 mt-1`}>
                    <MapPin className="w-4 h-4" />
                    {project.location}, {project.country}
                  </div>
                </div>
                <Badge className={`border ${getRiskColor(project.riskCategory)} ${isMobile ? 'self-start' : ''}`}>
                  {project.riskCategory} Risk
                </Badge>
              </div>
            </CardHeader>
            <CardContent className={`${isMobile ? 'space-y-3 pt-0' : 'space-y-4'}`}>
              {/* Key Metrics */}
              <div className={`grid grid-cols-2 gap-3 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                <div>
                  <div className="text-gray-600">Capacity</div>
                  <div className="font-semibold">{project.capacity} MW</div>
                </div>
                <div>
                  <div className="text-gray-600">Investment</div>
                  <div className="font-semibold">{formatCurrency(project.investmentRequired)}</div>
                </div>
                <div>
                  <div className="text-gray-600">Predicted IRR</div>
                  <div className="font-semibold text-green-600">{project.predictedIRR}%</div>
                </div>
                <div>
                  <div className="text-gray-600">Payback</div>
                  <div className="font-semibold">{project.paybackPeriod} years</div>
                </div>
              </div>

              {/* Success Probability */}
              <div>
                <div className={`flex justify-between ${isMobile ? 'text-xs' : 'text-sm'} mb-1`}>
                  <span>Success Probability</span>
                  <span className="font-semibold">{project.successProbability}%</span>
                </div>
                <Progress value={project.successProbability} className={`${isMobile ? 'h-3' : 'h-2'}`} />
              </div>

              {/* ESG Score */}
              <div>
                <div className={`flex justify-between ${isMobile ? 'text-xs' : 'text-sm'} mb-1`}>
                  <span>ESG Score</span>
                  <span className="font-semibold">{project.esgScore}/100</span>
                </div>
                <Progress value={project.esgScore} className={`${isMobile ? 'h-3' : 'h-2'}`} />
              </div>

              {/* AI Confidence */}
              <div className={`flex items-center gap-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                <Brain className="w-4 h-4 text-blue-600" />
                <span>AI Confidence: {project.aiConfidence}%</span>
              </div>

              {/* Key Insights */}
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">Key Insights:</div>
                <ul className="text-xs text-gray-600 space-y-1">
                  {project.keyInsights.slice(0, 2).map((insight, index) => (
                    <li key={index} className="flex items-start gap-1">
                      <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Details Button */}
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => setShowDetails(showDetails === project.id ? null : project.id)}
              >
                {showDetails === project.id ? 'Hide Details' : 'View Details'}
              </Button>

              {/* Expanded Details */}
              {showDetails === project.id && (
                <div className="mt-4 pt-4 border-t space-y-3">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Technology:</div>
                    <div className="text-xs text-gray-600">{project.technology}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Projected Impact:</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <div className="text-gray-600">Jobs Created</div>
                        <div className="font-semibold">{project.projectedMetrics.totalJobs}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">CO2 Reduction</div>
                        <div className="font-semibold">{(project.projectedMetrics.co2Reduction / 1000).toFixed(0)}k tons/yr</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Recommendations:</div>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {project.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-1">
                          <TrendingUp className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Recommendations */}
      <Card className="border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            AI Investment Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {(() => {
              // Sort filtered projects by success probability and risk score
              const sortedProjects = [...filteredProjects].sort((a, b) => 
                (b.successProbability - a.successProbability) + ((100 - a.riskScore) - (100 - b.riskScore)) * 0.5
              );
              
              return sortedProjects.map((project, index) => {
                const isTop = index === 0;
                const isRisky = project.riskCategory === 'High' || project.riskCategory === 'Medium';
                
                return (
                  <div key={project.id} className={`flex items-start gap-3 p-3 rounded-lg border ${
                    isTop 
                      ? 'bg-green-50 border-green-200' 
                      : isRisky 
                        ? 'bg-yellow-50 border-yellow-200'
                        : 'bg-blue-50 border-blue-200'
                  }`}>
                    {isTop ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    ) : isRisky ? (
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    ) : (
                      <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                    )}
                    <div>
                      <div className={`font-semibold ${
                        isTop 
                          ? 'text-green-800' 
                          : isRisky 
                            ? 'text-yellow-800'
                            : 'text-blue-800'
                      }`}>
                        {isTop ? 'Recommended' : isRisky ? 'Caution' : 'Alternative'}: {project.name}
                      </div>
                      <div className={`text-sm ${
                        isTop 
                          ? 'text-green-700' 
                          : isRisky 
                            ? 'text-yellow-700'
                            : 'text-blue-700'
                      }`}>
                        {isTop 
                          ? `Best risk-adjusted returns with ${project.successProbability}% success probability and ${project.predictedIRR}% IRR`
                          : isRisky
                            ? `${project.riskCategory} risk profile requires careful due diligence and risk mitigation strategies`
                            : `Good alternative with ${project.successProbability}% success probability and strong ESG performance`
                        }
                      </div>
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}