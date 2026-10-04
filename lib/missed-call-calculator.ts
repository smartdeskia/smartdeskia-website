export type QuoteFollowUpInputs = {
  quotationsPerMonth: number;
  averageQuotationValue: number;
  followUpPercentage: number;
};

export type QuoteFollowUpEstimate = {
  monthlyQuotedValue: number;
  quotationsNotConsistentlyFollowedUp: number;
  monthlyValueWithoutConsistentFollowUp: number;
  annualValueWithoutConsistentFollowUp: number;
  consistencyLabel: "Needs attention" | "Developing" | "Consistent";
};

const nonNegative = (value: number) => Number.isFinite(value) ? Math.max(0, value) : 0;

export function calculateQuoteFollowUp(inputs: QuoteFollowUpInputs): QuoteFollowUpEstimate {
  const quotations = nonNegative(inputs.quotationsPerMonth);
  const averageValue = nonNegative(inputs.averageQuotationValue);
  const followUpPercentage = Math.min(100, nonNegative(inputs.followUpPercentage));
  const monthlyQuotedValue = quotations * averageValue;
  const notFollowedRate = 1 - followUpPercentage / 100;
  const monthlyValueWithoutConsistentFollowUp = monthlyQuotedValue * notFollowedRate;
  return {
    monthlyQuotedValue,
    quotationsNotConsistentlyFollowedUp: quotations * notFollowedRate,
    monthlyValueWithoutConsistentFollowUp,
    annualValueWithoutConsistentFollowUp: monthlyValueWithoutConsistentFollowUp * 12,
    consistencyLabel: followUpPercentage >= 80 ? "Consistent" : followUpPercentage >= 50 ? "Developing" : "Needs attention",
  };
}
