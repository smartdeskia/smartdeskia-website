"use client";

import { useMemo, useState } from "react";
import {
  calculateMissedCallCost,
  type MissedCallInputs,
  type RiskLevel,
} from "../lib/missed-call-calculator";

const defaults: MissedCallInputs = {
  missedCallsPerWeek: 10,
  conversionPercentage: 30,
  averageCustomerValue: 100,
  workingWeeksPerYear: 52,
};

const euro = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const quantity = new Intl.NumberFormat("en-IE", {
  maximumFractionDigits: 1,
});

const riskLevels: RiskLevel[] = ["Low", "Moderate", "High", "Very High"];

type InputKey = keyof MissedCallInputs;

type CalculatorInputProps = {
  id: string;
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  prefix?: string;
  onChange: (value: number) => void;
};

function CalculatorInput({
  id,
  label,
  hint,
  value,
  min,
  max,
  step,
  suffix,
  prefix,
  onChange,
}: CalculatorInputProps) {
  const update = (nextValue: string) => {
    const parsed = Number(nextValue);
    onChange(Number.isFinite(parsed) ? Math.min(max, Math.max(min, parsed)) : min);
  };

  return (
    <div className="cost-field">
      <div className="cost-field-heading">
        <div>
          <label htmlFor={`${id}-number`}>{label}</label>
          <small id={`${id}-hint`}>{hint}</small>
        </div>
        <div className="cost-number-wrap">
          {prefix && <span aria-hidden="true">{prefix}</span>}
          <input
            id={`${id}-number`}
            type="number"
            inputMode="decimal"
            min={min}
            max={max}
            step={step}
            value={value}
            aria-describedby={`${id}-hint`}
            onChange={(event) => update(event.target.value)}
          />
          {suffix && <span aria-hidden="true">{suffix}</span>}
        </div>
      </div>
      <input
        className="cost-range"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={`${label} slider`}
        onChange={(event) => update(event.target.value)}
      />
      <div className="cost-range-limits" aria-hidden="true">
        <span>{prefix}{min}{suffix}</span>
        <span>{prefix}{max.toLocaleString("en-IE")}{suffix}</span>
      </div>
    </div>
  );
}

export default function MissedCallCostCalculator() {
  const [inputs, setInputs] = useState(defaults);
  const result = useMemo(() => calculateMissedCallCost(inputs), [inputs]);

  const setValue = (key: InputKey, value: number) =>
    setInputs((current) => ({ ...current, [key]: value }));

  const riskIndex = riskLevels.indexOf(result.riskLevel);

  return (
    <section className="cost-calculator sd-section" id="missed-call-calculator">
      <div className="cost-intro">
        <p className="mono coral">MISSED CALL COST CALCULATOR</p>
        <h2>What could missed calls be costing <em>your business?</em></h2>
        <p>Answer four quick questions to get a rough estimate. A best guess is completely fine.</p>
      </div>

      <div className="cost-calculator-grid">
        <form className="cost-controls" onSubmit={(event) => event.preventDefault()}>
          <CalculatorInput id="missed-calls" label="How many calls do you miss in a week?" hint="Count calls you cannot answer while working, driving or closed." value={inputs.missedCallsPerWeek} min={0} max={100} step={1} onChange={(value) => setValue("missedCallsPerWeek", value)} />
          <CalculatorInput id="conversion" label="Out of 10 callers, how many might book?" hint="Choose a rough number. For example, 3 means 3 out of every 10 callers." value={inputs.conversionPercentage / 10} min={0} max={10} step={1} suffix=" of 10" onChange={(value) => setValue("conversionPercentage", value * 10)} />
          <CalculatorInput id="customer-value" label="What is one new job or booking worth?" hint="Enter roughly what one typical paying customer spends with you." value={inputs.averageCustomerValue} min={0} max={5000} step={10} prefix="€" onChange={(value) => setValue("averageCustomerValue", value)} />
          <CalculatorInput id="working-weeks" label="How many weeks are you open each year?" hint="Most businesses can leave this at 52." value={inputs.workingWeeksPerYear} min={0} max={52} step={1} onChange={(value) => setValue("workingWeeksPerYear", value)} />
        </form>

        <div className="cost-result" aria-live="polite">
          <p className="cost-result-lead">Here is what those missed calls could mean for your business:</p>
          <div className="cost-flow">
            <p><strong>{quantity.format(inputs.missedCallsPerWeek)}</strong> calls not answered each week</p>
            <span aria-hidden="true">↓</span>
            <p><strong>{quantity.format(result.potentialCustomersPerWeek)}</strong> possible jobs or bookings missed</p>
            <span aria-hidden="true">↓</span>
            <p><strong>{quantity.format(result.annualOpportunities)}</strong> possible jobs or bookings per year</p>
            <span aria-hidden="true">↓</span>
          </div>
          <div className="cost-total">
            <strong>{euro.format(result.annualRevenueAtRisk)}</strong>
            <span>that could be lost in one year</span>
          </div>

          <div className="cost-secondary-results">
            <p><span>Possible loss each month</span><strong>{euro.format(result.monthlyRevenueAtRisk)}</strong></p>
            <p><span>Possible jobs or bookings yearly</span><strong>{quantity.format(result.annualOpportunities)}</strong></p>
          </div>

          <div className="cost-risk">
            <div className="cost-risk-heading"><span>Size of possible loss</span><strong>{result.riskLevel}</strong></div>
            <div className="cost-risk-scale" aria-label={`Size of possible loss: ${result.riskLevel}`}>
              {riskLevels.map((level, index) => <i key={level} className={index <= riskIndex ? "active" : ""} />)}
            </div>
            <p>{result.riskDescription}</p>
          </div>
        </div>
      </div>

      <p className="cost-disclaimer">Estimates are illustrative only and depend on your actual call volume, conversion rate and customer value. SmartDeskia does not guarantee recovered revenue.</p>
    </section>
  );
}
