import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { EsgMetrics } from "@shared/schema";

interface ESGScoreDisplayProps {
  metrics: EsgMetrics;
}

export default function ESGScoreDisplay({ metrics }: ESGScoreDisplayProps) {
  const CircularProgress = ({ value, label, color }: { value: number; label: string; color: string }) => {
    const circumference = 2 * Math.PI * 30; // Reduced radius for better mobile fit
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (value / 10) * circumference;

    return (
      <div className="text-center flex flex-col items-center">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-2 sm:mb-3 md:mb-4">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 68 68">
            <circle
              cx="34"
              cy="34"
              r="30"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              className="text-gray-200"
            />
            <circle
              cx="34"
              cy="34"
              r="30"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className={color}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm sm:text-lg md:text-xl font-bold text-gray-900">{value}</span>
          </div>
        </div>
        <h3 className="text-xs sm:text-sm md:text-base font-medium text-gray-900 text-center leading-tight">
          {label}
        </h3>
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
          <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 mb-6 sm:mb-8 px-2 sm:px-0">
            <CircularProgress 
              value={metrics.environmental} 
              label="Environmental" 
              color="text-green-500" 
            />
            <CircularProgress 
              value={metrics.social} 
              label="Social" 
              color="text-blue-500" 
            />
            <CircularProgress 
              value={metrics.governance} 
              label="Governance" 
              color="text-orange-500" 
            />
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 sm:p-6 text-center border border-green-200">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600 mb-2">{metrics.overall}</div>
            <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-900 mb-1">Overall ESG Score</h3>
            <p className="text-xs sm:text-sm text-gray-600">Excellent sustainability rating</p>
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
