import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, Plus, Minus, TrendingUp, DollarSign, AlertTriangle, CheckCircle, Sun, Wind, Droplets, Leaf, Mountain, Home, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { useCurrencyFormat } from "@/hooks/use-currency-format";
import { useCurrency } from "@/lib/currency-context";
import type { Currency } from "@shared/currency";
import { z } from "zod";

const irrCalculatorSchema = z.object({
  projectType: z.string().min(1, "Project type is required"),
  projectLocation: z.string().min(1, "Project location is required"),
  initialInvestment: z.number().positive("Initial investment must be positive"),
  projectYears: z.number().min(1).max(30, "Project duration must be between 1-30 years"),
});

// Project type configurations with regional currency mapping
const projectTypeConfigs = {
  solar: {
    name: "Solar",
    icon: Sun,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    baseIRR: 16.2,
    regions: {
      nigeria: { currency: "NGN" as Currency, multiplier: 1.0 },
      uk: { currency: "GBP" as Currency, multiplier: 0.8 },
      europe: { currency: "EUR" as Currency, multiplier: 0.9 }
    }
  },
  wind: {
    name: "Wind",
    icon: Wind,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    baseIRR: 14.8,
    regions: {
      nigeria: { currency: "NGN" as Currency, multiplier: 1.0 },
      uk: { currency: "GBP" as Currency, multiplier: 1.2 },
      europe: { currency: "EUR" as Currency, multiplier: 1.1 }
    }
  },
  hydro: {
    name: "Hydro",
    icon: Droplets,
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-200",
    baseIRR: 18.1,
    regions: {
      nigeria: { currency: "NGN" as Currency, multiplier: 1.0 },
      uk: { currency: "GBP" as Currency, multiplier: 0.9 },
      europe: { currency: "EUR" as Currency, multiplier: 1.0 }
    }
  },
  biomass: {
    name: "Biomass",
    icon: Leaf,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    baseIRR: 13.4,
    regions: {
      nigeria: { currency: "NGN" as Currency, multiplier: 1.0 },
      uk: { currency: "GBP" as Currency, multiplier: 1.1 },
      europe: { currency: "EUR" as Currency, multiplier: 1.2 }
    }
  },
  geothermal: {
    name: "Geothermal",
    icon: Mountain,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    baseIRR: 15.7,
    regions: {
      nigeria: { currency: "NGN" as Currency, multiplier: 1.0 },
      uk: { currency: "GBP" as Currency, multiplier: 0.7 },
      europe: { currency: "EUR" as Currency, multiplier: 1.3 }
    }
  }
};

// Regional mappings
const regionMappings = {
  nigeria: ["Lagos", "Abuja", "Kano", "Port Harcourt", "Ibadan", "Enugu", "Kaduna"],
  uk: ["London", "Manchester", "Birmingham", "Glasgow", "Edinburgh", "Cardiff", "Belfast"],
  europe: ["Berlin", "Paris", "Rome", "Madrid", "Amsterdam", "Brussels", "Vienna"]
};

interface CashFlow {
  year: number;
  amount: number;
}

export default function IRRCalculator() {

  const { convertAndFormat, convert } = useCurrencyFormat();
  const { selectedCurrency, setSelectedCurrency } = useCurrency();
  const [selectedProjectType, setSelectedProjectType] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [cashFlows, setCashFlows] = useState<CashFlow[]>([
    { year: 1, amount: 0 },
    { year: 2, amount: 0 },
    { year: 3, amount: 0 },
    { year: 4, amount: 0 },
    { year: 5, amount: 0 },
  ]);
  const [calculationResult, setCalculationResult] = useState<{
    irr: number;
    npv: number;
    paybackPeriod: number;
    roi: number;
    projectedIRR: number;
  } | null>(null);

  const form = useForm({
    resolver: zodResolver(irrCalculatorSchema),
    defaultValues: {
      projectType: "",
      projectLocation: "",
      initialInvestment: 0,
      projectYears: 5,
    },
  });

  // Helper function to detect region from location
  const getRegionFromLocation = (location: string): string => {
    for (const [region, cities] of Object.entries(regionMappings)) {
      if (cities.includes(location)) {
        return region;
      }
    }
    return "nigeria"; // Default to Nigeria
  };

  // Helper function to get project type adjusted IRR
  const getProjectTypeIRR = (projectType: string, region: string): number => {
    const config = projectTypeConfigs[projectType as keyof typeof projectTypeConfigs];
    if (!config) return 15.0;
    
    const regionData = config.regions[region as keyof typeof config.regions];
    return config.baseIRR * (regionData?.multiplier || 1.0);
  };

  const addCashFlow = () => {
    const nextYear = Math.max(...cashFlows.map(cf => cf.year)) + 1;
    setCashFlows([...cashFlows, { year: nextYear, amount: 0 }]);
  };

  const removeCashFlow = (year: number) => {
    if (cashFlows.length > 1) {
      setCashFlows(cashFlows.filter(cf => cf.year !== year));
    }
  };

  const updateCashFlow = (year: number, amount: number) => {
    setCashFlows(cashFlows.map(cf => 
      cf.year === year ? { ...cf, amount } : cf
    ));
  };

  // IRR calculation using Newton-Raphson method
  const calculateIRR = (initialInvestment: number, cashFlows: CashFlow[]): number => {
    let rate = 0.1; // Initial guess: 10%
    const precision = 0.000001;
    const maxIterations = 1000;

    for (let i = 0; i < maxIterations; i++) {
      let npv = -initialInvestment;
      let derivative = 0;

      cashFlows.forEach(cf => {
        const discountFactor = Math.pow(1 + rate, cf.year);
        npv += cf.amount / discountFactor;
        derivative -= (cf.year * cf.amount) / Math.pow(1 + rate, cf.year + 1);
      });

      if (Math.abs(npv) < precision) {
        return rate * 100; // Return as percentage
      }

      if (derivative === 0) break;
      rate = rate - npv / derivative;
    }

    return rate * 100;
  };

  // NPV calculation
  const calculateNPV = (initialInvestment: number, cashFlows: CashFlow[], discountRate: number = 0.1): number => {
    let npv = -initialInvestment;
    cashFlows.forEach(cf => {
      npv += cf.amount / Math.pow(1 + discountRate, cf.year);
    });
    return npv;
  };

  // Payback Period calculation
  const calculatePaybackPeriod = (initialInvestment: number, cashFlows: CashFlow[]): number => {
    let cumulativeCashFlow = -initialInvestment;
    for (let i = 0; i < cashFlows.length; i++) {
      cumulativeCashFlow += cashFlows[i].amount;
      if (cumulativeCashFlow >= 0) {
        return cashFlows[i].year;
      }
    }
    return -1; // No payback within the period
  };

  // ROI calculation
  const calculateROI = (initialInvestment: number, cashFlows: CashFlow[]): number => {
    const totalReturns = cashFlows.reduce((sum, cf) => sum + cf.amount, 0);
    return ((totalReturns - initialInvestment) / initialInvestment) * 100;
  };

  const onSubmit = (data: any) => {
    const { projectType, projectLocation, initialInvestment, projectYears } = data;
    const validCashFlows = cashFlows.filter(cf => cf.amount > 0).slice(0, projectYears);

    if (validCashFlows.length === 0) {
      return;
    }

    const region = getRegionFromLocation(projectLocation);
    const projectedIRR = getProjectTypeIRR(projectType, region);
    
    const irr = calculateIRR(initialInvestment, validCashFlows);
    const npv = calculateNPV(initialInvestment, validCashFlows);
    const paybackPeriod = calculatePaybackPeriod(initialInvestment, validCashFlows);
    const roi = calculateROI(initialInvestment, validCashFlows);

    setCalculationResult({
      irr: isFinite(irr) ? irr : 0,
      npv,
      paybackPeriod,
      roi,
      projectedIRR,
    });
  };

  const getIRRRating = (irr: number) => {
    if (irr >= 20) return { label: "Excellent", color: "bg-green-100 text-green-800", icon: CheckCircle };
    if (irr >= 15) return { label: "Good", color: "bg-blue-100 text-blue-800", icon: TrendingUp };
    if (irr >= 10) return { label: "Fair", color: "bg-yellow-100 text-yellow-800", icon: AlertTriangle };
    return { label: "Poor", color: "bg-red-100 text-red-800", icon: AlertTriangle };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Calculator className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">IRR Calculator</h1>
              <p className="text-gray-600">Calculate Internal Rate of Return for renewable energy projects</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                Project Investment Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="projectType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Type</FormLabel>
                          <Select 
                            onValueChange={(value) => {
                              field.onChange(value);
                              setSelectedProjectType(value);
                            }} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select project type..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.entries(projectTypeConfigs).map(([key, config]) => {
                                const IconComponent = config.icon;
                                return (
                                  <SelectItem key={key} value={key}>
                                    <div className="flex items-center gap-2">
                                      <IconComponent className={`w-4 h-4 ${config.color}`} />
                                      <span>{config.name}</span>
                                    </div>
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="projectLocation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Location</FormLabel>
                          <Select 
                            onValueChange={(value) => {
                              field.onChange(value);
                              const region = getRegionFromLocation(value);
                              setSelectedRegion(region);
                              
                              // Auto-set currency based on region
                              const projectType = form.getValues('projectType');
                              if (projectType) {
                                const config = projectTypeConfigs[projectType as keyof typeof projectTypeConfigs];
                                const regionData = config?.regions[region as keyof typeof config.regions];
                                if (regionData) {
                                  setSelectedCurrency(regionData.currency);
                                }
                              }
                            }} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select location..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <div className="space-y-2">
                                <div className="px-2 py-1 text-sm font-medium text-gray-500">Nigeria</div>
                                {regionMappings.nigeria.map((city) => (
                                  <SelectItem key={city} value={city}>{city}</SelectItem>
                                ))}
                                <div className="px-2 py-1 text-sm font-medium text-gray-500">United Kingdom</div>
                                {regionMappings.uk.map((city) => (
                                  <SelectItem key={city} value={city}>{city}</SelectItem>
                                ))}
                                <div className="px-2 py-1 text-sm font-medium text-gray-500">Europe</div>
                                {regionMappings.europe.map((city) => (
                                  <SelectItem key={city} value={city}>{city}</SelectItem>
                                ))}
                              </div>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="initialInvestment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Initial Investment ({selectedCurrency})</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="1000" 
                              min="0" 
                              placeholder="Enter initial investment amount"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="projectYears"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Duration (Years)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="1" 
                              max="30"
                              placeholder="Enter project duration"
                              {...field}
                              onChange={(e) => {
                                const years = parseInt(e.target.value) || 5;
                                field.onChange(years);
                                // Adjust cash flows to match project years
                                const newCashFlows = Array.from({ length: years }, (_, i) => ({
                                  year: i + 1,
                                  amount: cashFlows[i]?.amount || 0
                                }));
                                setCashFlows(newCashFlows);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Project Type Info Display */}
                  {selectedProjectType && (
                    <div className={`p-4 rounded-lg border ${projectTypeConfigs[selectedProjectType as keyof typeof projectTypeConfigs]?.bgColor} ${projectTypeConfigs[selectedProjectType as keyof typeof projectTypeConfigs]?.borderColor}`}>
                      <div className="flex items-center gap-2 mb-2">
                        {(() => {
                          const config = projectTypeConfigs[selectedProjectType as keyof typeof projectTypeConfigs];
                          const IconComponent = config?.icon;
                          return IconComponent ? <IconComponent className={`w-5 h-5 ${config.color}`} /> : null;
                        })()}
                        <h3 className="font-medium text-gray-900">
                          {projectTypeConfigs[selectedProjectType as keyof typeof projectTypeConfigs]?.name} Project Analysis
                        </h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Expected IRR Range:</span>
                          <span className="font-medium ml-2">
                            {selectedRegion ? `${getProjectTypeIRR(selectedProjectType, selectedRegion).toFixed(1)}%` : 'Select location'}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Currency:</span>
                          <span className="font-medium ml-2">{selectedCurrency}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Cash Flow Inputs */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">Annual Cash Flows</h3>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={addCashFlow}
                        disabled={cashFlows.length >= 30}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Year
                      </Button>
                    </div>

                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {cashFlows.map((cf) => (
                        <div key={cf.year} className="flex items-center gap-3">
                          <div className="w-16 text-sm text-gray-600">Year {cf.year}</div>
                          <Input
                            type="number"
                            step="1000"
                            min="0"
                            placeholder={`Cash flow amount (${selectedCurrency})`}
                            value={cf.amount || ''}
                            onChange={(e) => updateCashFlow(cf.year, parseFloat(e.target.value) || 0)}
                            className="flex-1"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeCashFlow(cf.year)}
                            disabled={cashFlows.length <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    <Calculator className="w-4 h-4 mr-2" />
                    Calculate IRR
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Calculation Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {calculationResult ? (
                <div className="space-y-6">
                  {/* IRR Result */}
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {(() => {
                        const rating = getIRRRating(calculationResult.irr);
                        const IconComponent = rating.icon;
                        return <IconComponent className="w-6 h-6 text-blue-600" />;
                      })()}
                      <h3 className="text-lg font-medium text-gray-900">Calculated IRR</h3>
                    </div>
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {calculationResult.irr.toFixed(2)}%
                    </div>
                    <Badge className={getIRRRating(calculationResult.irr).color}>
                      {getIRRRating(calculationResult.irr).label}
                    </Badge>
                    {calculationResult.projectedIRR && (
                      <div className="mt-3 text-sm text-gray-600">
                        Expected for project type: {calculationResult.projectedIRR.toFixed(1)}%
                      </div>
                    )}
                  </div>

                  {/* Other Metrics */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-medium text-gray-900 mb-1">Net Present Value (NPV)</h4>
                      <div className="text-2xl font-bold text-green-600">
                        {convertAndFormat(calculationResult.npv)}
                      </div>
                      <p className="text-sm text-gray-600">
                        {calculationResult.npv > 0 ? "Project creates value" : "Project destroys value"}
                      </p>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <h4 className="font-medium text-gray-900 mb-1">Return on Investment (ROI)</h4>
                      <div className="text-2xl font-bold text-purple-600">
                        {calculationResult.roi.toFixed(2)}%
                      </div>
                      <p className="text-sm text-gray-600">Total return over project lifetime</p>
                    </div>

                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <h4 className="font-medium text-gray-900 mb-1">Payback Period</h4>
                      <div className="text-2xl font-bold text-orange-600">
                        {calculationResult.paybackPeriod > 0 
                          ? `${calculationResult.paybackPeriod} years`
                          : "No payback"
                        }
                      </div>
                      <p className="text-sm text-gray-600">
                        Time to recover initial investment
                      </p>
                    </div>
                  </div>

                  {/* Investment Summary */}
                  <div className="p-4 bg-gray-50 rounded-lg border">
                    <h4 className="font-medium text-gray-900 mb-3">Investment Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Project Type:</span>
                        <span className="font-medium">{form.getValues('projectType') ? projectTypeConfigs[form.getValues('projectType') as keyof typeof projectTypeConfigs]?.name : 'Not selected'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location:</span>
                        <span className="font-medium">{form.getValues('projectLocation') || 'Not selected'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Currency:</span>
                        <span className="font-medium">{selectedCurrency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Initial Investment:</span>
                        <span className="font-medium">{convertAndFormat(form.getValues('initialInvestment'))}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Cash Inflows:</span>
                        <span className="font-medium">
                          {convertAndFormat(cashFlows.reduce((sum, cf) => sum + cf.amount, 0))}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Project Duration:</span>
                        <span className="font-medium">{form.getValues('projectYears')} years</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Calculate</h3>
                  <p className="text-gray-600">
                    Enter your investment details and cash flows to calculate the IRR
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* IRR Interpretation Guide */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>IRR Interpretation Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h4 className="font-medium text-green-800">Excellent (≥20%)</h4>
                </div>
                <p className="text-sm text-green-700">
                  Outstanding returns. Project significantly exceeds market expectations.
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <h4 className="font-medium text-blue-800">Good (15-20%)</h4>
                </div>
                <p className="text-sm text-blue-700">
                  Strong returns. Project meets renewable energy sector benchmarks.
                </p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <h4 className="font-medium text-yellow-800">Fair (10-15%)</h4>
                </div>
                <p className="text-sm text-yellow-700">
                  Acceptable returns. Consider optimizing project parameters.
                </p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <h4 className="font-medium text-red-800">Poor (&lt;10%)</h4>
                </div>
                <p className="text-sm text-red-700">
                  Low returns. Project may not be financially viable.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
      </section>
    </div>
  );
}