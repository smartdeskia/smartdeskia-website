"use client";
import { useState } from "react";
import DashboardPreview from "../components/DashboardPreview";

export function TryCallSection() {
  const [sent, setSent] = useState(false);
  return <section className="try-call" id="dd-try"><div><p className="mono coral">TRY IT YOURSELF</p><h2>Let Sofia<br /><em>call you.</em></h2><p>Enter your number and experience the conversation from a customer’s point of view. This demo is simulated.</p></div><form className="try-phone" onSubmit={event => { event.preventDefault(); setSent(true); }}>{sent ? <div className="demo-success" role="status"><i>✓</i><h3>Demo requested.</h3><p>Sofia is preparing your simulated call experience.</p><button type="button" className="coral-button" onClick={() => setSent(false)}>Try another number <b>↗</b></button></div> : <><div className="try-status"><i /> SOFIA IS READY</div><label>Your name<input name="name" required autoComplete="name" placeholder="e.g. Alex" /></label><label>Phone number<input name="phone" required autoComplete="tel" placeholder="+356 99 000 000" inputMode="tel" /></label><button className="coral-button" type="submit">Get a demo call <b>↗</b></button><small>No sales pressure. Just a quick demonstration.</small></>}</form></section>;
}
export function ComparisonSection() {
  return <section className="contrast"><div className="contrast-title"><p className="mono">THE DIFFERENCE</p><h2>Missed calls cost more<br />than you think.</h2></div><div className="versus"><article><span>WITHOUT SOFIA</span>{["Calls go to voicemail", "Staff interrupted mid-task", "Bookings lost after hours", "Follow-ups get forgotten"].map(item => <p key={item}><i>×</i>{item}</p>)}</article><article><span>WITH SOFIA</span>{["Every call answered, 24/7", "Bookings handled instantly", "Your team stays focused", "Every detail logged automatically"].map(item => <p key={item}><i>✓</i>{item}</p>)}</article></div></section>;
}
export function HowItWorksSection() {
  const capabilities = [["09:14", "Answers naturally", "Real conversations, interruptions and all."], ["09:15", "Takes action", "Books, moves, cancels and captures leads."], ["09:16", "Follows up", "Texts confirmations and next steps instantly."], ["09:17", "Keeps you informed", "Every outcome is logged in one clear view."]];
  return <section className="how sd-section" id="how-it-works"><div className="section-label"><span>02</span><p>HOW IT WORKS</p></div><div className="how-head"><h2>Sounds human.<br /><em>Works like software.</em></h2><p>Sofia connects with the tools you already use and follows the exact rules of your business.</p></div><div className="cap-grid">{capabilities.map(item => <article key={item[0]}><span>{item[0]}</span><h3>{item[1]}</h3><p>{item[2]}</p></article>)}</div><DashboardPreview /></section>;
}
export function FinalCTA({ onRequestCall, onChat }: { onRequestCall: () => void; onChat: () => void }) {
  return <section className="closing"><p className="mono coral">YOUR NEXT CALL COULD BE A NEW CUSTOMER</p><h2>Never miss the<br /><em>opportunity.</em></h2><p>See what Sofia could do for your business. Start with a quick, no-pressure conversation.</p><div><button className="coral-button" onClick={onRequestCall}>Request a call <b>↗</b></button><button className="ghost-button" onClick={onChat}>Chat with Sofia <b>↗</b></button></div></section>;
}
