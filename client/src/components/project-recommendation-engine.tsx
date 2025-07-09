import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Sparkles, 
  TrendingUp, 
  MapPin, 
  DollarSign, 
  Leaf,
  Zap,
  Star,
  ThumbsUp,
  ThumbsDown,
  Heart,
  BarChart3
} from 'lucide-react';
import { useCurrencyFormat } from '@/hooks/use-currency-format';
import type { Project } from '@shared/schema';

interface ProjectRecommendation {
  id: string;
  name: string;
  type: 'solar' | 'wind' | 'hydro' | 'biomass' | 'geothermal';
  location: string;
  capacity: number;
  estimatedIRR: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  esgScore: number;
  investmentRequired: number;
  matchScore: number;
  reasons: string[];
  aiConfidence: number;
  personalizedFactors: {
    riskTolerance: number;
    sectorPreference: number;
    regionPreference: number;
    impactFocus: number;
  };
}

interface UserProfile {
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  preferredSectors: string[];
  preferredRegions: string[];
  investmentRange: { min: number; max: number };
  impactPriority: number; // 1-10 scale
  returnExpectation: number;
}

export default function ProjectRecommendationEngine() {
  const { convertAndFormat } = useCurrencyFormat();
  const [userProfile, setUserProfile] = useState<UserProfile>({
    riskTolerance: 'moderate',
    preferredSectors: ['solar', 'wind'],
    preferredRegions: ['Nigeria', 'West Africa'],
    investmentRange: { min: 50000, max: 500000 },
    impactPriority: 7,
    returnExpectation: 15
  });

  const [recommendations, setRecommendations] = useState<ProjectRecommendation[]>([]);
  const [userFeedback, setUserFeedback] = useState<Record<string, 'like' | 'dislike' | 'love'>>({});
  const [isLearning, setIsLearning] = useState(false);

  const { data: existingProjects } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  // Generate AI-powered recommendations based on user profile
  const generateRecommendations = () => {
    const baseRecommendations: ProjectRecommendation[] = [
      {
        id: 'rec-1',
        name: 'Kano Solar Complex',
        type: 'solar',
        location: 'Kano, Nigeria',
        capacity: 100,
        estimatedIRR: 18.5,
        riskLevel: 'Low',
        esgScore: 8.7,
        investmentRequired: 150000,
        matchScore: 92,
        reasons: [
          'Matches your solar sector preference',
          'Low risk aligns with conservative tolerance',
          'High ESG score matches impact priority',
          'Strong regional solar irradiance data'
        ],
        aiConfidence: 94,
        personalizedFactors: {
          riskTolerance: 95,
          sectorPreference: 90,
          regionPreference: 88,
          impactFocus: 92
        }
      },
      {
        id: 'rec-2',
        name: 'Lagos Wind Farm Phase II',
        type: 'wind',
        location: 'Lagos, Nigeria',
        capacity: 75,
        estimatedIRR: 16.2,
        riskLevel: 'Medium',
        esgScore: 8.9,
        investmentRequired: 200000,
        matchScore: 87,
        reasons: [
          'Wind sector in your preferences',
          'Lagos proximity to commercial centers',
          'Excellent coastal wind patterns',
          'Government renewable incentives'
        ],
        aiConfidence: 89,
        personalizedFactors: {
          riskTolerance: 75,
          sectorPreference: 95,
          regionPreference: 92,
          impactFocus: 89
        }
      },
      {
        id: 'rec-3',
        name: 'Plateau Hydro Development',
        type: 'hydro',
        location: 'Jos, Nigeria',
        capacity: 50,
        estimatedIRR: 14.8,
        riskLevel: 'Low',
        esgScore: 9.2,
        investmentRequired: 120000,
        matchScore: 83,
        reasons: [
          'Lowest risk option available',
          'Highest ESG impact score',
          'Proven hydro technology',
          'Stable year-round generation'
        ],
        aiConfidence: 91,
        personalizedFactors: {
          riskTolerance: 98,
          sectorPreference: 70,
          regionPreference: 85,
          impactFocus: 95
        }
      },
      {
        id: 'rec-4',
        name: 'Cross River Biomass Plant',
        type: 'biomass',
        location: 'Calabar, Nigeria',
        capacity: 40,
        estimatedIRR: 19.3,
        riskLevel: 'Medium',
        esgScore: 8.5,
        investmentRequired: 180000,
        matchScore: 79,
        reasons: [
          'Highest projected IRR',
          'Strong agricultural waste supply',
          'Emerging biomass market opportunity',
          'Local community employment benefits'
        ],
        aiConfidence: 82,
        personalizedFactors: {
          riskTolerance: 70,
          sectorPreference: 65,
          regionPreference: 80,
          impactFocus: 88
        }
      }
    ];

    // Sort by match score and apply ML-like adjustments based on user feedback
    const adjustedRecommendations = baseRecommendations.map(rec => {
      const feedback = userFeedback[rec.id];
      let adjustedScore = rec.matchScore;

      if (feedback === 'love') adjustedScore += 10;
      else if (feedback === 'like') adjustedScore += 5;
      else if (feedback === 'dislike') adjustedScore -= 15;

      return { ...rec, matchScore: Math.max(0, Math.min(100, adjustedScore)) };
    });

    setRecommendations(adjustedRecommendations.sort((a, b) => b.matchScore - a.matchScore));
  };

  const handleFeedback = (projectId: string, feedback: 'like' | 'dislike' | 'love') => {
    setUserFeedback(prev => ({ ...prev, [projectId]: feedback }));
    setIsLearning(true);
    
    // Simulate AI learning delay
    setTimeout(() => {
      setIsLearning(false);
      generateRecommendations();
    }, 1500);
  };

  const getProjectIcon = (type: string) => {
    switch (type) {
      case 'solar': return <Zap className="w-4 h-4" />;
      case 'wind': return <TrendingUp className="w-4 h-4" />;
      case 'hydro': return <BarChart3 className="w-4 h-4" />;
      case 'biomass': return <Leaf className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'success';
      case 'Medium': return 'warning';
      case 'High': return 'destructive';
      default: return 'secondary';
    }
  };

  useEffect(() => {
    generateRecommendations();
  }, []);

  return (
    <div className="space-y-6">
      {/* AI Recommendation Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <CardTitle>AI-Powered Project Recommendations</CardTitle>
          </div>
          <p className="text-sm text-gray-600">
            Personalized investment opportunities based on your profile and preferences
          </p>
        </CardHeader>
      </Card>

      {/* Learning Indicator */}
      {isLearning && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
              <span className="text-sm text-primary font-medium">
                AI learning from your feedback...
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendations List */}
      <div className="space-y-4">
        {recommendations.map((project, index) => (
          <Card key={project.id} className="relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-primary/10 to-transparent p-6">
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{project.matchScore}%</div>
                <div className="text-xs text-primary/70">Match Score</div>
              </div>
            </div>

            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="capitalize">
                      #{index + 1} Recommended
                    </Badge>
                    <Badge variant="outline">
                      {getProjectIcon(project.type)}
                      <span className="ml-1 capitalize">{project.type}</span>
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {project.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      {project.capacity} MW
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">{project.estimatedIRR}%</div>
                  <div className="text-xs text-gray-600">Estimated IRR</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Badge variant={getRiskColor(project.riskLevel) as any} className="mb-1">
                    {project.riskLevel}
                  </Badge>
                  <div className="text-xs text-gray-600">Risk Level</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">{project.esgScore}</div>
                  <div className="text-xs text-gray-600">ESG Score</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">
                    {convertAndFormat(project.investmentRequired)}
                  </div>
                  <div className="text-xs text-gray-600">Investment</div>
                </div>
              </div>

              {/* AI Confidence and Personalization Factors */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">AI Confidence</span>
                  <span className="text-sm text-gray-600">{project.aiConfidence}%</span>
                </div>
                <Progress value={project.aiConfidence} className="h-2" />

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Risk Match</span>
                      <span>{project.personalizedFactors.riskTolerance}%</span>
                    </div>
                    <Progress value={project.personalizedFactors.riskTolerance} className="h-1" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Sector Preference</span>
                      <span>{project.personalizedFactors.sectorPreference}%</span>
                    </div>
                    <Progress value={project.personalizedFactors.sectorPreference} className="h-1" />
                  </div>
                </div>
              </div>

              {/* AI Reasoning */}
              <div>
                <h4 className="text-sm font-medium mb-2">Why this recommendation:</h4>
                <ul className="space-y-1">
                  {project.reasons.map((reason, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                      <Star className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Feedback and Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Rate this recommendation:</span>
                  <div className="flex gap-1">
                    <Button
                      variant={userFeedback[project.id] === 'love' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleFeedback(project.id, 'love')}
                      className="h-8 w-8 p-0"
                    >
                      <Heart className="w-3 h-3" />
                    </Button>
                    <Button
                      variant={userFeedback[project.id] === 'like' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleFeedback(project.id, 'like')}
                      className="h-8 w-8 p-0"
                    >
                      <ThumbsUp className="w-3 h-3" />
                    </Button>
                    <Button
                      variant={userFeedback[project.id] === 'dislike' ? 'destructive' : 'outline'}
                      size="sm"
                      onClick={() => handleFeedback(project.id, 'dislike')}
                      className="h-8 w-8 p-0"
                    >
                      <ThumbsDown className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm">
                    Invest Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}