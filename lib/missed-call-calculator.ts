export type MissedCallInputs = {
  missedCallsPerWeek: number;
  conversionPercentage: number;
  averageCustomerValue: number;
  workingWeeksPerYear: number;
};

export type RiskLevel = "Low" | "Moderate" | "High" | "Very High";

export type MissedCallEstimate = {
  potentialCustomersPerWeek: number;
  weeklyRevenueAtRisk: number;
  monthlyRevenueAtRisk: number;
  annualOpportunities: number;
  annualRevenueAtRisk: number;
  riskLevel: RiskLevel;
  riskDescription: string;
};

const riskDescriptions: Record<RiskLevel, string> = {
  Low: "This looks like a small possible loss.",
  Moderate: "Missed calls may be costing your business a noticeable amount.",
  High: "Missed calls may be costing your business a significant amount.",
  "Very High": "Answering more calls could make a major difference to your business.",
};

const nonNegative = (value: number) =>
  Number.isFinite(value) ? Math.max(0, value) : 0;

export function calculateMissedCallCost(
  inputs: MissedCallInputs,
): MissedCallEstimate {
  const missedCalls = nonNegative(inputs.missedCallsPerWeek);
  const conversionRate = Math.min(
    100,
    nonNegative(inputs.conversionPercentage),
  ) / 100;
  const averageValue = nonNegative(inputs.averageCustomerValue);
  const workingWeeks = nonNegative(inputs.workingWeeksPerYear);

  const potentialCustomersPerWeek = missedCalls * conversionRate;
  const weeklyRevenueAtRisk = potentialCustomersPerWeek * averageValue;
  const annualOpportunities = potentialCustomersPerWeek * workingWeeks;
  const annualRevenueAtRisk = weeklyRevenueAtRisk * workingWeeks;
  const monthlyRevenueAtRisk = annualRevenueAtRisk / 12;

  let riskLevel: RiskLevel = "Low";
  if (annualRevenueAtRisk >= 50000) riskLevel = "Very High";
  else if (annualRevenueAtRisk >= 15000) riskLevel = "High";
  else if (annualRevenueAtRisk >= 5000) riskLevel = "Moderate";

  return {
    potentialCustomersPerWeek,
    weeklyRevenueAtRisk,
    monthlyRevenueAtRisk,
    annualOpportunities,
    annualRevenueAtRisk,
    riskLevel,
    riskDescription: riskDescriptions[riskLevel],
  };
}
