"use client";
import { useMemo, useState } from "react";
import { calculateQuoteFollowUp, type QuoteFollowUpInputs } from "../lib/missed-call-calculator";

const defaults: QuoteFollowUpInputs = { quotationsPerMonth: 15, averageQuotationValue: 2000, followUpPercentage: 50 };
const currencies = { EUR: { symbol: "€", locale: "en-IE", label: "€ EUR — Euro" }, GBP: { symbol: "£", locale: "en-GB", label: "£ GBP — British Pound" }, USD: { symbol: "$", locale: "en-US", label: "$ USD — US Dollar" } } as const;
const followUpChoices = [{ label: "Always", value: 100 }, { label: "Most", value: 75 }, { label: "About half", value: 50 }, { label: "Rarely", value: 25 }] as const;
type CurrencyCode = keyof typeof currencies;
type InputKey = keyof QuoteFollowUpInputs;

function CalculatorInput({ id, label, value, min, max, step, prefix, onChange }: { id: string; label: string; value: number; min: number; max: number; step: number; prefix?: string; onChange: (value: number) => void }) {
  const update = (nextValue: string) => { const parsed = Number(nextValue); onChange(Number.isFinite(parsed) ? Math.min(max, Math.max(min, parsed)) : min); };
  return <div className="cost-field"><div className="cost-field-heading"><label htmlFor={`${id}-number`}>{label}</label><div className="cost-number-wrap">{prefix && <span aria-hidden="true">{prefix}</span>}<input id={`${id}-number`} type="number" inputMode="decimal" min={min} max={max} step={step} value={value} onChange={event => update(event.target.value)} /></div></div><input className="cost-range" type="range" min={min} max={max} step={step} value={value} aria-label={`${label} slider`} onChange={event => update(event.target.value)} /><div className="cost-range-limits" aria-hidden="true"><span>{prefix}{min}</span><span>{prefix}{max.toLocaleString("en-IE")}</span></div></div>;
}

export default function MissedCallCostCalculator() {
  const [inputs, setInputs] = useState(defaults);
  const [currency, setCurrency] = useState<CurrencyCode>("EUR");
  const result = useMemo(() => calculateQuoteFollowUp(inputs), [inputs]);
  const money = useMemo(() => new Intl.NumberFormat(currencies[currency].locale, { style: "currency", currency, maximumFractionDigits: 0 }), [currency]);
  const setValue = (key: InputKey, value: number) => setInputs(current => ({ ...current, [key]: value }));

  return <section className="cost-calculator sd-section" id="quote-calculator"><div className="cost-intro"><p className="mono coral">QUOTE FOLLOW-UP CALCULATOR</p><h2>How much quoted work could be sitting unfollowed?</h2><p>Use rough numbers. This takes a few seconds.</p></div><div className="cost-calculator-grid"><form className="cost-controls" onSubmit={event => event.preventDefault()}><div className="cost-currency"><label htmlFor="calculator-currency">Currency</label><select id="calculator-currency" value={currency} onChange={event => setCurrency(event.target.value as CurrencyCode)}>{Object.entries(currencies).map(([code, details]) => <option key={code} value={code}>{details.label}</option>)}</select></div><CalculatorInput id="quotations" label="Quotes you send each month" value={inputs.quotationsPerMonth} min={0} max={100} step={1} onChange={value => setValue("quotationsPerMonth", value)} /><CalculatorInput id="quotation-value" label="Average quote value" value={inputs.averageQuotationValue} min={0} max={50000} step={100} prefix={currencies[currency].symbol} onChange={value => setValue("averageQuotationValue", value)} /><fieldset className="follow-up-choice"><legend>Do you follow up every quote?</legend><div>{followUpChoices.map(choice => <button key={choice.value} type="button" className={inputs.followUpPercentage === choice.value ? "selected" : ""} aria-pressed={inputs.followUpPercentage === choice.value} onClick={() => setValue("followUpPercentage", choice.value)}>{choice.label}</button>)}</div></fieldset></form><div className="cost-result" aria-live="polite"><div className="cost-total"><strong>{money.format(result.monthlyValueWithoutConsistentFollowUp)}</strong><p>could be sitting in quotes that haven&apos;t been followed up this month.</p></div><p className="cost-attention">SmartDeskia shows you which ones need attention.</p><p className="cost-yearly">That&apos;s about <strong>{money.format(result.annualValueWithoutConsistentFollowUp)}</strong> over a year.</p><p className="cost-context">Rough estimate — not guaranteed revenue.</p></div></div></section>;
}
