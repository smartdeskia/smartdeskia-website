"use client";
import { useState } from "react";
import DashboardPreview from "../components/DashboardPreview";

export function HowItWorksSection() {
  return <section className="how sd-section" id="how-it-works"><div className="section-label"><span>01</span><p>SMARTDESKIA / TODAY</p></div><div className="how-head"><h2>Know what needs your attention.</h2><p>New enquiries, quotations and follow-ups in one clear view.</p></div><DashboardPreview /></section>;
}

const workflowEvents = [
  ["09:14", "NEW ENQUIRY", "Daniel asks for a kitchen renovation quotation through Instagram."],
  ["09:16", "OWNER ALERTED", "SmartDeskia records the enquiry and alerts the business."],
  ["11:40", "QUOTE SENT", "€4,800 quotation sent."],
  ["4 DAYS LATER", "FOLLOW-UP DUE", "No response yet. SmartDeskia surfaces it for follow-up."],
  ["RESULT", "WON", "Daniel accepts the quotation."],
];

export function WorkflowExampleSection() {
  return <section className="workflow-example sd-section" id="workflow-example"><div className="workflow-example-intro"><p className="mono coral">ONE REAL WORKFLOW</p><h2>One enquiry.<br />A clear next action.</h2><p>SmartDeskia does not replace the owner. It keeps the next action visible from first contact to a clear outcome.</p></div><div className="workflow-stream">{workflowEvents.map(([time, status, copy], index) => <article className={status === "FOLLOW-UP DUE" ? "due" : ""} key={status}><div><span>{time}</span><i aria-hidden="true" /></div><div><strong>{status}</strong><p>{copy}</p></div><b aria-hidden="true">{String(index + 1).padStart(2, "0")}</b></article>)}</div></section>;
}

export function CoreServicesSection() {
  const services = [
    { number: "01", title: "Enquiry & Quote Follow-Up", copy: "Know what came in, what needs a reply and which quotations need chasing.", items: ["Enquiry capture and owner alerts", "Acknowledgement and clear status tracking", "Follow-up reminders", "Simple monthly visibility"] },
    { number: "02", title: "Fast Quotes", copy: "Turn job notes into a professional quote draft faster.", items: ["Structured quote drafts", "Clear scope and job details", "Owner reviews pricing and content", "Nothing is sent without approval"] },
    { number: "03", title: "Get Paid", copy: "Keep track of unpaid invoices and know who needs a reminder.", items: ["Outstanding-payment view", "Scheduled polite reminders", "Clear next actions", "A simple record of follow-up"] },
  ];
  return <section className="core-services sd-section" id="services"><div className="services-heading"><p className="mono coral">PRACTICAL BACK-OFFICE SUPPORT</p><h2>Less chasing.<br /><em>More work moving.</em></h2></div><div className="service-grid">{services.map(service => <article key={service.title}><span>{service.number}</span><h3>{service.title}</h3><p>{service.copy}</p><ul>{service.items.map(item => <li key={item}>{item}</li>)}</ul></article>)}</div></section>;
}

export function ComparisonSection() {
  const without = ["Enquiry arrives", "Owner is busy", "Quote gets sent", "No one remembers to follow up", "Opportunity quietly goes cold"];
  const withSystem = ["Enquiry captured", "Owner alerted", "Customer contacted", "Quote tracked", "Follow-up surfaced", "Won / Lost recorded"];
  return <section className="contrast"><div className="contrast-title"><p className="mono">THE DIFFERENCE</p><h2>A simple system for<br /><em>the work between jobs.</em></h2></div><div className="versus"><article><span>WITHOUT A SYSTEM</span>{without.map(item => <p key={item}><i>×</i>{item}</p>)}</article><article><span>WITH SMARTDESKIA</span>{withSystem.map(item => <p key={item}><i>✓</i>{item}</p>)}</article></div></section>;
}

export function SofiaIntroSection() {
  return <section className="sofia-intro sd-section" id="sofia"><p className="mono coral">NEED HELP WITH CALLS TOO?</p><div><h2>Sofia can capture the enquiry before it reaches SmartDeskia.</h2><p>Sofia answers calls, captures the customer&apos;s request and can feed the enquiry into the same SmartDeskia workflow.</p></div></section>;
}

export function TryCallSection() {
  const [sent, setSent] = useState(false);
  return <section className="try-call" id="dd-try"><div><p className="mono coral">TRY SOFIA YOURSELF</p><h2>Hear how Sofia<br /><em>handles a call.</em></h2><p>Enter your number and experience the conversation from a customer&apos;s point of view. This demo is simulated.</p></div><form className="try-phone" onSubmit={event => { event.preventDefault(); setSent(true); }}>{sent ? <div className="demo-success" role="status"><i>✓</i><h3>Demo requested.</h3><p>Sofia is preparing your simulated call experience.</p><button type="button" className="coral-button" onClick={() => setSent(false)}>Try another number</button></div> : <><div className="try-status"><i /> SOFIA IS READY</div><label>Your name<input name="name" required autoComplete="name" placeholder="e.g. Alex" /></label><label>Phone number<input name="phone" required autoComplete="tel" placeholder="+356 99 000 000" inputMode="tel" /></label><button className="coral-button" type="submit">Get a demo call</button><small>No sales pressure. Just a quick demonstration.</small></>}</form></section>;
}

export function AdditionalServicesSection() {
  const items = [["Website / Landing Page", <><span>Already have a good website? Keep it. SmartDeskia can connect your enquiry flow to it.</span><span>Need a new one? We can build a fast, search-ready business website or landing page with enquiry capture and SEO foundations built in.</span></>], ["Missed-call recovery", <>Capture missed calls and alert the business so someone can follow up quickly.</>], ["Sofia AI receptionist", <>Optional AI call handling for businesses that want help answering and capturing enquiries.</>]];
  return <section className="additional-services sd-section" id="services"><div className="additional-services-label"><p className="mono coral">ALSO AVAILABLE</p><h2>Practical support around the main workflow.</h2></div><div className="additional-services-list">{items.map(([title, copy], index) => <article key={String(title)}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>;
}

export function FinalCTA({ onRequestCall }: { onRequestCall: () => void }) {
  return <section className="closing"><h2>See how SmartDeskia could work for your business.</h2><p>We&apos;ll show you how it could fit around the way you already handle enquiries and quotes.</p><div><button className="coral-button" onClick={onRequestCall}>Show me how it would work</button></div></section>;
}
