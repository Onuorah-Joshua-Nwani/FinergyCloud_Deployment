import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MobileBreadcrumb, { commonBreadcrumbs } from "@/components/mobile-breadcrumb";
import { Trophy, Zap, Leaf, Target, Award, Star, TrendingUp, Users, Activity, Clock, Gift, CheckCircle } from "lucide-react";

// Mock data to avoid React Query
const mockRewardStats = {
  sustainabilityPoints: 2450,
  level: 7,
  xp: 1250,
  streak: 12,
  totalCo2Saved: 15.8,
  totalEnergyGenerated: 342.5
};

const mockAchievements = [
  {
    id: 1,
    name: "First Investment",
    description: "Make your first renewable energy investment",
    icon: "trophy",
    category: "milestone",
    points: 100,
    unlockedAt: new Date('2024-01-15')
  },
  {
    id: 2,
    name: "ESG Champion",
    description: "Achieve excellent ESG score on 5 projects",
    icon: "leaf",
    category: "esg",
    points: 250,
    unlockedAt: new Date('2024-02-10')
  },
  {
    id: 3,
    name: "Portfolio Builder",
    description: "Build a diversified portfolio with 10+ projects",
    icon: "target",
    category: "portfolio",
    points: 300,
    unlockedAt: null // Not unlocked yet
  }
];

const mockActivities = [
  {
    id: 1,
    type: "project_investment",
    description: "Invested in Solar Farm Kenya project",
    points: 150,
    createdAt: new Date('2024-03-10')
  },
  {
    id: 2,
    type: "esg_score",
    description: "Achieved 9.2/10 ESG score",
    points: 75,
    createdAt: new Date('2024-03-08')
  }
];

export default function Rewards() {
  const [selectedTab, setSelectedTab] = useState("overview");

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      trophy: Trophy,
      leaf: Leaf,
      target: Target,
      award: Award,
      star: Star
    };
    const IconComponent = icons[iconName] || Trophy;
    return <IconComponent className="h-5 w-5" />;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6 p-4 mobile-professional">
      {/* Mobile Breadcrumb Navigation */}
      <MobileBreadcrumb items={commonBreadcrumbs.rewards} />
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Sustainability Rewards</h1>
          <p className="text-gray-600 mt-1">Track your impact and earn rewards for sustainable investing</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Current Level</div>
          <div className="text-2xl font-bold text-green-600">{mockRewardStats.level}</div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <Card className="p-2 lg:p-6 mobile-card-professional">
          <CardContent className="p-0">
            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="p-1.5 lg:p-2 bg-green-100 rounded-lg">
                <Zap className="h-4 w-4 lg:h-5 lg:w-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs lg:text-sm text-gray-500">Points</p>
                <p className="text-lg lg:text-xl font-bold text-gray-900">{mockRewardStats.sustainabilityPoints.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-2 lg:p-6 mobile-card-professional">
          <CardContent className="p-0">
            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="p-1.5 lg:p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-4 w-4 lg:h-5 lg:w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs lg:text-sm text-gray-500">Experience</p>
                <p className="text-lg lg:text-xl font-bold text-gray-900">{mockRewardStats.xp.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-2 lg:p-6 mobile-card-professional">
          <CardContent className="p-0">
            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="p-1.5 lg:p-2 bg-orange-100 rounded-lg">
                <Activity className="h-4 w-4 lg:h-5 lg:w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-xs lg:text-sm text-gray-500">Streak</p>
                <p className="text-lg lg:text-xl font-bold text-gray-900">{mockRewardStats.streak} days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-2 lg:p-6 mobile-card-professional">
          <CardContent className="p-0">
            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="p-1.5 lg:p-2 bg-green-100 rounded-lg">
                <Leaf className="h-4 w-4 lg:h-5 lg:w-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs lg:text-sm text-gray-500">CO₂ Saved</p>
                <p className="text-lg lg:text-xl font-bold text-gray-900">{mockRewardStats.totalCo2Saved}t</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="text-xs lg:text-sm">Overview</TabsTrigger>
          <TabsTrigger value="achievements" className="text-xs lg:text-sm">Achievements</TabsTrigger>
          <TabsTrigger value="activities" className="text-xs lg:text-sm">Activities</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="mobile-card-professional">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-yellow-600" />
                <span>Recent Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockAchievements.filter(a => a.unlockedAt).slice(0, 3).map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      {getIconComponent(achievement.icon)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{achievement.name}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                    <Badge variant="secondary">+{achievement.points}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid gap-4">
            {mockAchievements.map((achievement) => (
              <Card key={achievement.id} className={`mobile-card-professional ${!achievement.unlockedAt ? 'opacity-60' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full ${achievement.unlockedAt ? 'bg-green-100' : 'bg-gray-100'}`}>
                      {getIconComponent(achievement.icon)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{achievement.name}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      <div className="mt-2 flex items-center space-x-4">
                        <Badge variant={achievement.unlockedAt ? "default" : "secondary"}>
                          {achievement.points} points
                        </Badge>
                        {achievement.unlockedAt && (
                          <span className="text-xs text-gray-500">
                            Unlocked {formatDate(achievement.unlockedAt)}
                          </span>
                        )}
                      </div>
                    </div>
                    {achievement.unlockedAt && (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activities" className="space-y-4">
          <Card className="mobile-card-professional">
            <CardHeader>
              <CardTitle className="text-lg">Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Activity className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                      <p className="text-xs text-gray-500">{formatDate(activity.createdAt)}</p>
                    </div>
                    <Badge variant="outline">+{activity.points}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}