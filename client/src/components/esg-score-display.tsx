import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { EsgMetrics } from "@shared/schema";

interface ESGScoreDisplayProps {
  metrics: EsgMetrics;
}

export default function ESGScoreDisplay({ metrics }: ESGScoreDisplayProps) {
  const CircularProgress = ({ value, label, color }: { value: number; label: string; color: string }) => {
    const circumference = 2 * Math.PI * 36;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (value / 10) * circumference;

    return (
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-4">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 80 80">
            <circle
              cx="40"
              cy="40"
              r="36"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-200"
            />
            <circle
              cx="40"
              cy="40"
              r="36"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className={color}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold text-gray-900">{value}</span>
          </div>
        </div>
        <h3 className="font-medium text-gray-900">{label}</h3>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>ESG Score Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6 mb-8">
            <CircularProgress 
              value={metrics.environmental} 
              label="Environmental" 
              color="text-secondary" 
            />
            <CircularProgress 
              value={metrics.social} 
              label="Social" 
              color="text-primary" 
            />
            <CircularProgress 
              value={metrics.governance} 
              label="Governance" 
              color="text-accent" 
            />
          </div>

          <div className="bg-gradient-to-r from-secondary/5 to-secondary/10 rounded-lg p-6 text-center border border-secondary/20">
            <div className="text-4xl font-bold text-secondary mb-2">{metrics.overall}</div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Overall ESG Score</h3>
            <p className="text-sm text-gray-600">Excellent sustainability rating</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Environmental Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">CO2 Reduction</span>
                <span className="font-medium text-success">{metrics.co2Reduction.toLocaleString()} tons/year</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Clean Energy Generated</span>
                <span className="font-medium text-primary">{metrics.cleanEnergyGenerated} GWh</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Water Saved</span>
                <span className="font-medium text-secondary">{metrics.waterSaved.toLocaleString()} liters</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Jobs Created</span>
                <span className="font-medium text-primary">{metrics.jobsCreated}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Communities Served</span>
                <span className="font-medium text-secondary">{metrics.communitiesServed}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Education Programs</span>
                <span className="font-medium text-accent">{metrics.educationPrograms}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
