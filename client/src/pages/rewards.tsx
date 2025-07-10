import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Trophy, 
  Star, 
  Target, 
  Gift, 
  Zap, 
  Leaf, 
  Award,
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock,
  Crown,
  Sparkles,
  Medal,
  Activity
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface RewardStats {
  sustainabilityPoints: number;
  level: number;
  xp: number;
  streak: number;
  totalCo2Saved: number;
  totalEnergyGenerated: number;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  category: string;
  difficulty: string;
  points: number;
  requirement: any;
  isActive: boolean;
  createdAt: string;
}

interface RewardActivity {
  id: number;
  userId: string;
  activityType: string;
  description: string;
  points: number;
  xpGained: number;
  metadata: any;
  createdAt: string;
}

interface Challenge {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  points: number;
  xpReward: number;
  requirement: any;
  isActive: boolean;
  startDate: string;
  endDate: string;
  userProgress?: {
    progress: number;
    completed: boolean;
    rewardClaimed: boolean;
  };
}

export default function RewardsPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedActivity, setSelectedActivity] = useState<RewardActivity | null>(null);

  const { data: rewardStats } = useQuery<RewardStats>({
    queryKey: ['/api/rewards/stats'],
  });

  const { data: achievements } = useQuery<Achievement[]>({
    queryKey: ['/api/rewards/achievements'],
  });

  const { data: activities } = useQuery<RewardActivity[]>({
    queryKey: ['/api/rewards/activities'],
  });

  const { data: challenges } = useQuery<Challenge[]>({
    queryKey: ['/api/rewards/challenges'],
  });

  const addActivityMutation = useMutation({
    mutationFn: async (activityData: any) => {
      const response = await apiRequest("POST", "/api/rewards/activity", activityData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/rewards/stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/rewards/activities'] });
      queryClient.invalidateQueries({ queryKey: ['/api/rewards/achievements'] });
      toast({
        title: "Activity Recorded",
        description: "Your sustainable action has been recorded!",
      });
    },
  });

  const claimChallengeMutation = useMutation({
    mutationFn: async (challengeId: number) => {
      const response = await apiRequest("POST", "/api/rewards/claim-challenge", { challengeId });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/rewards/challenges'] });
      toast({
        title: "Challenge Completed",
        description: "Congratulations! You've completed a sustainability challenge!",
      });
    },
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'environmental': return <Leaf className="h-4 w-4" />;
      case 'investment': return <TrendingUp className="h-4 w-4" />;
      case 'social': return <Award className="h-4 w-4" />;
      case 'engagement': return <Activity className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  const simulateActivity = (type: string) => {
    const activities = {
      'green_investment': {
        description: 'Invested in renewable energy project',
        points: 50,
        xpGained: 100,
        metadata: { projectType: 'solar', amount: 5000 }
      },
      'esg_analysis': {
        description: 'Completed ESG analysis for project',
        points: 25,
        xpGained: 50,
        metadata: { projectId: 1, score: 8.5 }
      },
      'daily_login': {
        description: 'Daily platform engagement',
        points: 10,
        xpGained: 20,
        metadata: { streak: (rewardStats?.streak || 0) + 1 }
      },
      'portfolio_review': {
        description: 'Reviewed portfolio performance',
        points: 15,
        xpGained: 30,
        metadata: { portfolioValue: 25000 }
      }
    };

    const activity = activities[type as keyof typeof activities];
    if (activity) {
      addActivityMutation.mutate({
        activityType: type,
        ...activity
      });
    }
  };

  const getXpToNextLevel = (currentXp: number, level: number) => {
    const xpNeededForNextLevel = level * 1000;
    return xpNeededForNextLevel - (currentXp % 1000);
  };

  const getXpProgress = (currentXp: number) => {
    const xpInCurrentLevel = currentXp % 1000;
    return (xpInCurrentLevel / 1000) * 100;
  };

  if (!rewardStats) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-3 md:p-4">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Sustainability Rewards
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Earn points and unlock achievements for your sustainable investment choices
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="pb-2 p-3 md:p-6">
              <CardTitle className="text-xs md:text-sm font-medium opacity-90">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="line-clamp-1">Sustainability Points</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{rewardStats.sustainabilityPoints.toLocaleString()}</div>
              <p className="text-xs opacity-90">Total earned</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">
                <div className="flex items-center gap-2">
                  <Crown className="h-4 w-4" />
                  Level
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{rewardStats.level}</div>
              <Progress 
                value={getXpProgress(rewardStats.xp)} 
                className="h-2 bg-blue-400"
              />
              <p className="text-xs opacity-90 mt-1">
                {getXpToNextLevel(rewardStats.xp, rewardStats.level)} XP to next level
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Streak
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{rewardStats.streak}</div>
              <p className="text-xs opacity-90">Days active</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">
                <div className="flex items-center gap-2">
                  <Leaf className="h-4 w-4" />
                  CO₂ Saved
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{rewardStats.totalCo2Saved.toLocaleString()}</div>
              <p className="text-xs opacity-90">Tons of CO₂</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="activities" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="activities">Recent Activities</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="activities" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={() => simulateActivity('green_investment')}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Record Green Investment (+50 pts)
                  </Button>
                  <Button 
                    onClick={() => simulateActivity('esg_analysis')}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Target className="h-4 w-4 mr-2" />
                    Complete ESG Analysis (+25 pts)
                  </Button>
                  <Button 
                    onClick={() => simulateActivity('daily_login')}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Daily Check-in (+10 pts)
                  </Button>
                  <Button 
                    onClick={() => simulateActivity('portfolio_review')}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Activity className="h-4 w-4 mr-2" />
                    Portfolio Review (+15 pts)
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Recent Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {activities?.slice(0, 5).map((activity) => (
                      <div 
                        key={activity.id} 
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                        onClick={() => setSelectedActivity(activity)}
                      >
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Star className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{activity.description}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(activity.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-green-600">+{activity.points}</p>
                          <p className="text-xs text-gray-500">{activity.xpGained} XP</p>
                        </div>
                      </div>
                    ))}
                    {!activities?.length && (
                      <p className="text-center text-gray-500 py-8">
                        No activities yet. Start by recording your first sustainable action!
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {challenges?.map((challenge) => (
                <Card key={challenge.id} className="relative">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{challenge.title}</CardTitle>
                      <Badge className={getDifficultyColor(challenge.difficulty)}>
                        {challenge.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">{challenge.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{Math.round((challenge.userProgress?.progress || 0) * 100)}%</span>
                      </div>
                      <Progress value={(challenge.userProgress?.progress || 0) * 100} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">{challenge.points} pts</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">{challenge.xpReward} XP</span>
                      </div>
                    </div>
                    
                    {challenge.userProgress?.completed && !challenge.userProgress?.rewardClaimed && (
                      <Button 
                        onClick={() => claimChallengeMutation.mutate(challenge.id)}
                        className="w-full"
                        disabled={claimChallengeMutation.isPending}
                      >
                        <Gift className="h-4 w-4 mr-2" />
                        Claim Reward
                      </Button>
                    )}
                    
                    {challenge.userProgress?.rewardClaimed && (
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">Completed</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
              
              {!challenges?.length && (
                <div className="col-span-full text-center py-12">
                  <Target className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-600">No active challenges</p>
                  <p className="text-sm text-gray-500">Check back soon for new sustainability challenges!</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements?.map((achievement) => (
                <Card key={achievement.id} className="relative">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <Medal className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{achievement.title}</CardTitle>
                        <Badge className={getDifficultyColor(achievement.difficulty)}>
                          {achievement.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{achievement.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(achievement.category)}
                        <span className="text-sm capitalize">{achievement.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">{achievement.points} pts</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {!achievements?.length && (
                <div className="col-span-full text-center py-12">
                  <Trophy className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-600">No achievements yet</p>
                  <p className="text-sm text-gray-500">Start completing activities to unlock achievements!</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}