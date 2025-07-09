import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Leaf, 
  Trophy, 
  Target, 
  Zap,
  TreePine,
  Car,
  Home,
  Factory,
  Award,
  Sparkles,
  TrendingUp,
  Users,
  Globe
} from 'lucide-react';

interface EcoImpact {
  co2Reduced: number; // tons per year
  treesEquivalent: number;
  carsOffRoad: number;
  homesEnergyEquivalent: number;
  energyGenerated: number; // MWh per year
  waterSaved: number; // liters per year
  jobsCreated: number;
  communitiesImpacted: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  requirement: number;
  current: number;
  category: 'environment' | 'social' | 'governance';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
  points: number;
}

interface UserProgress {
  level: number;
  xp: number;
  xpToNext: number;
  totalPoints: number;
  rank: string;
  achievements: Achievement[];
}

export default function EcoImpactCalculator() {
  const [projectCapacity, setProjectCapacity] = useState<number>(50); // MW
  const [projectType, setProjectType] = useState<'solar' | 'wind' | 'hydro' | 'biomass'>('solar');
  const [operatingYears, setOperatingYears] = useState<number>(25);
  const [impact, setImpact] = useState<EcoImpact | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    level: 5,
    xp: 2350,
    xpToNext: 500,
    totalPoints: 12450,
    rank: 'Climate Champion',
    achievements: []
  });
  const [showCelebration, setShowCelebration] = useState(false);
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);

  // Impact calculation factors by project type
  const impactFactors = {
    solar: {
      co2PerMWh: 0.82, // tons CO2 saved per MWh
      capacityFactor: 0.25,
      waterSavedPerMWh: 780, // liters
      jobsPerMW: 3.8,
      communitiesPerMW: 0.15
    },
    wind: {
      co2PerMWh: 0.85,
      capacityFactor: 0.35,
      waterSavedPerMWh: 950,
      jobsPerMW: 2.2,
      communitiesPerMW: 0.12
    },
    hydro: {
      co2PerMWh: 0.92,
      capacityFactor: 0.45,
      waterSavedPerMWh: 320,
      jobsPerMW: 1.8,
      communitiesPerMW: 0.25
    },
    biomass: {
      co2PerMWh: 0.75,
      capacityFactor: 0.80,
      waterSavedPerMWh: 450,
      jobsPerMW: 4.5,
      communitiesPerMW: 0.30
    }
  };

  // Achievement definitions
  const achievementTemplates: Omit<Achievement, 'current' | 'unlocked'>[] = [
    {
      id: 'co2-hero',
      title: 'CO₂ Hero',
      description: 'Reduce 1,000 tons of CO₂ emissions',
      icon: <Leaf className="w-6 h-6" />,
      requirement: 1000,
      category: 'environment',
      rarity: 'common',
      points: 100
    },
    {
      id: 'forest-guardian',
      title: 'Forest Guardian',
      description: 'Equivalent to planting 10,000 trees',
      icon: <TreePine className="w-6 h-6" />,
      requirement: 10000,
      category: 'environment',
      rarity: 'rare',
      points: 250
    },
    {
      id: 'clean-commuter',
      title: 'Clean Commuter',
      description: 'Take 500 cars off the road equivalent',
      icon: <Car className="w-6 h-6" />,
      requirement: 500,
      category: 'environment',
      rarity: 'epic',
      points: 500
    },
    {
      id: 'power-provider',
      title: 'Power Provider',
      description: 'Generate energy for 1,000 homes',
      icon: <Home className="w-6 h-6" />,
      requirement: 1000,
      category: 'social',
      rarity: 'common',
      points: 150
    },
    {
      id: 'job-creator',
      title: 'Job Creator',
      description: 'Create 100 green jobs',
      icon: <Users className="w-6 h-6" />,
      requirement: 100,
      category: 'social',
      rarity: 'rare',
      points: 300
    },
    {
      id: 'climate-legend',
      title: 'Climate Legend',
      description: 'Reduce 50,000 tons of CO₂',
      icon: <Globe className="w-6 h-6" />,
      requirement: 50000,
      category: 'environment',
      rarity: 'legendary',
      points: 1000
    }
  ];

  const calculateImpact = () => {
    const factors = impactFactors[projectType];
    const annualEnergyMWh = projectCapacity * 8760 * factors.capacityFactor; // MW * hours/year * capacity factor
    const lifetimeEnergyMWh = annualEnergyMWh * operatingYears;

    const newImpact: EcoImpact = {
      co2Reduced: lifetimeEnergyMWh * factors.co2PerMWh,
      treesEquivalent: Math.round(lifetimeEnergyMWh * factors.co2PerMWh * 16.5), // 1 ton CO2 = ~16.5 trees
      carsOffRoad: Math.round(lifetimeEnergyMWh * factors.co2PerMWh * 0.22), // 1 ton CO2 = ~0.22 cars/year
      homesEnergyEquivalent: Math.round(annualEnergyMWh / 11), // Average home uses ~11 MWh/year
      energyGenerated: Math.round(lifetimeEnergyMWh),
      waterSaved: Math.round(lifetimeEnergyMWh * factors.waterSavedPerMWh),
      jobsCreated: Math.round(projectCapacity * factors.jobsPerMW),
      communitiesImpacted: Math.round(projectCapacity * factors.communitiesPerMW)
    };

    setImpact(newImpact);
    checkAchievements(newImpact);
  };

  const checkAchievements = (newImpact: EcoImpact) => {
    const updatedAchievements = achievementTemplates.map(template => {
      let current = 0;
      
      switch (template.id) {
        case 'co2-hero':
        case 'climate-legend':
          current = newImpact.co2Reduced;
          break;
        case 'forest-guardian':
          current = newImpact.treesEquivalent;
          break;
        case 'clean-commuter':
          current = newImpact.carsOffRoad;
          break;
        case 'power-provider':
          current = newImpact.homesEnergyEquivalent;
          break;
        case 'job-creator':
          current = newImpact.jobsCreated;
          break;
      }

      const wasUnlocked = userProgress.achievements.find(a => a.id === template.id)?.unlocked || false;
      const isNowUnlocked = current >= template.requirement;

      if (!wasUnlocked && isNowUnlocked) {
        setNewAchievements(prev => [...prev, { ...template, current, unlocked: true }]);
        setShowCelebration(true);
      }

      return {
        ...template,
        current,
        unlocked: isNowUnlocked
      };
    });

    setUserProgress(prev => ({
      ...prev,
      achievements: updatedAchievements,
      xp: prev.xp + newAchievements.reduce((sum, ach) => sum + ach.points, 0)
    }));
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'rare': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'epic': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'legendary': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'environment': return <Leaf className="w-4 h-4" />;
      case 'social': return <Users className="w-4 h-4" />;
      case 'governance': return <Factory className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  useEffect(() => {
    calculateImpact();
  }, [projectCapacity, projectType, operatingYears]);

  useEffect(() => {
    if (showCelebration) {
      const timer = setTimeout(() => {
        setShowCelebration(false);
        setNewAchievements([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showCelebration]);

  return (
    <div className="space-y-6">
      {/* Achievement Celebration */}
      {showCelebration && newAchievements.length > 0 && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="max-w-md w-full mx-4 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-300">
            <CardContent className="pt-6 text-center">
              <div className="mb-4">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Trophy className="w-8 h-8 text-yellow-800" />
                </div>
                <h3 className="text-xl font-bold text-yellow-800 mb-2">Achievement Unlocked!</h3>
                {newAchievements.map(achievement => (
                  <div key={achievement.id} className="mb-2">
                    <Badge className={getRarityColor(achievement.rarity)}>{achievement.title}</Badge>
                    <p className="text-sm text-yellow-700 mt-1">{achievement.description}</p>
                  </div>
                ))}
              </div>
              <Button onClick={() => setShowCelebration(false)}>
                Awesome!
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* User Progress Header */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Level {userProgress.level} • {userProgress.rank}</h3>
                <p className="text-sm text-gray-600">{userProgress.totalPoints.toLocaleString()} impact points</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-white">
              <Sparkles className="w-3 h-3 mr-1" />
              {userProgress.achievements.filter(a => a.unlocked).length} achievements
            </Badge>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Progress to Level {userProgress.level + 1}</span>
              <span>{userProgress.xp} / {userProgress.xp + userProgress.xpToNext} XP</span>
            </div>
            <Progress value={(userProgress.xp / (userProgress.xp + userProgress.xpToNext)) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calculator Input */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-green-600" />
                Eco-Impact Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="project-type">Project Type</Label>
                <select
                  id="project-type"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value as any)}
                  className="w-full mt-1 p-2 border rounded-md"
                >
                  <option value="solar">Solar</option>
                  <option value="wind">Wind</option>
                  <option value="hydro">Hydro</option>
                  <option value="biomass">Biomass</option>
                </select>
              </div>

              <div>
                <Label htmlFor="capacity">Capacity (MW)</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={projectCapacity}
                  onChange={(e) => setProjectCapacity(Number(e.target.value))}
                  min="1"
                  max="1000"
                />
              </div>

              <div>
                <Label htmlFor="years">Operating Years</Label>
                <Input
                  id="years"
                  type="number"
                  value={operatingYears}
                  onChange={(e) => setOperatingYears(Number(e.target.value))}
                  min="5"
                  max="50"
                />
              </div>

              <Button onClick={calculateImpact} className="w-full">
                <TrendingUp className="w-4 h-4 mr-2" />
                Calculate Impact
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Impact Results */}
        <div className="lg:col-span-2">
          {impact && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Environmental Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Leaf className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-700">
                        {impact.co2Reduced.toLocaleString()}
                      </div>
                      <div className="text-sm text-green-600">Tons CO₂ Reduced</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <TreePine className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-700">
                        {impact.treesEquivalent.toLocaleString()}
                      </div>
                      <div className="text-sm text-blue-600">Trees Equivalent</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Car className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-purple-700">
                        {impact.carsOffRoad.toLocaleString()}
                      </div>
                      <div className="text-sm text-purple-600">Cars Off Road</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <Zap className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-orange-700">
                        {impact.energyGenerated.toLocaleString()}
                      </div>
                      <div className="text-sm text-orange-600">MWh Generated</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Social Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-cyan-50 rounded-lg">
                      <Home className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-cyan-700">
                        {impact.homesEnergyEquivalent.toLocaleString()}
                      </div>
                      <div className="text-sm text-cyan-600">Homes Powered</div>
                    </div>
                    <div className="text-center p-4 bg-indigo-50 rounded-lg">
                      <Users className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-indigo-700">
                        {impact.jobsCreated.toLocaleString()}
                      </div>
                      <div className="text-sm text-indigo-600">Jobs Created</div>
                    </div>
                    <div className="text-center p-4 bg-pink-50 rounded-lg">
                      <Globe className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-pink-700">
                        {impact.communitiesImpacted}
                      </div>
                      <div className="text-sm text-pink-600">Communities</div>
                    </div>
                    <div className="text-center p-4 bg-teal-50 rounded-lg">
                      <Factory className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-teal-700">
                        {(impact.waterSaved / 1000000).toFixed(1)}M
                      </div>
                      <div className="text-sm text-teal-600">Liters Water Saved</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            Impact Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userProgress.achievements.map(achievement => (
              <div 
                key={achievement.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  achievement.unlocked 
                    ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-300' 
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className={`p-2 rounded-lg ${achievement.unlocked ? 'bg-yellow-200' : 'bg-gray-200'}`}>
                    {achievement.icon}
                  </div>
                  <Badge className={getRarityColor(achievement.rarity)}>
                    {achievement.rarity}
                  </Badge>
                </div>
                <h4 className="font-semibold mb-1">{achievement.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{achievement.current.toLocaleString()} / {achievement.requirement.toLocaleString()}</span>
                  </div>
                  <Progress 
                    value={Math.min(100, (achievement.current / achievement.requirement) * 100)} 
                    className="h-2"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {getCategoryIcon(achievement.category)}
                      <span className="text-xs text-gray-500 capitalize">{achievement.category}</span>
                    </div>
                    {achievement.unlocked && (
                      <Badge variant="outline" className="text-xs">
                        +{achievement.points} XP
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}