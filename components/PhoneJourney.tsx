"use client";
import { useEffect, useState } from "react";

function TypingText({ text, delay }: { text: string; delay: number }) {
  const [typed, setTyped] = useState("");
  useEffect(() => { const started = Date.now(), cycle = 8500; const interval = setInterval(() => { const elapsed = (Date.now() - started) % cycle - delay; const count = elapsed < 0 ? 0 : Math.min(text.length, Math.floor(elapsed / 24)); setTyped(text.slice(0, count)); }, 32); return () => clearInterval(interval); }, [text, delay]);
  return <span className="typed-text" aria-hidden="true">{typed}<i /></span>;
}
function Phone({ type }: { type: "incoming" | "call" | "sms" }) {
  return <div className="phone-shell"><div className="phone-island" /><div className={`phone-screen ${type}`}><span className="phone-time">9:41</span>{type === "incoming" && <><small className="mock-logo">SMART<span>DESK</span>IA<b>.</b></small><div className="caller-avatar"><span>NC</span></div><h3>New customer</h3><p className="ringing-copy">Incoming call<span>…</span></p><div className="call-actions"><i>✕</i><i>●</i></div></>}{type === "call" && <><small>CALL IN PROGRESS · 02:14</small><div className="wave"><i /><i /><i /><i /><i /></div><div className="transcript"><p aria-label="Caller: Hi, I would like to book an appointment for next week."><b>CALLER</b><TypingText delay={500} text="Hi, I’d like to book an appointment for next week." /></p><p aria-label="Sofia: Of course. I have Tuesday at 10:30 or Thursday at 3pm available."><b>SOFIA</b><TypingText delay={2100} text="Of course. I have Tuesday at 10:30 or Thursday at 3pm." /></p><p aria-label="Caller: Tuesday at 10:30 works for me."><b>CALLER</b><TypingText delay={4500} text="Tuesday at 10:30 works for me." /></p><p aria-label="Sofia: Perfect. You are booked and your confirmation is on its way."><b>SOFIA</b><TypingText delay={5700} text="Perfect. You’re booked — confirmation is on its way." /></p></div></>}{type === "sms" && <><small>MESSAGES</small><h3>SmartDeskia Booking</h3><div className="message sms-pop sms-one">Your appointment is confirmed for Tuesday at 10:30. You’re all set — we look forward to seeing you!</div></>}</div></div>;
}
export default function PhoneJourney() {
  return <div className="phones-scroll"><div><span className="phone-label">09:14 — CALL ANSWERED</span><Phone type="incoming" /></div><div><span className="phone-label">09:15 — APPOINTMENT BOOKED</span><Phone type="call" /></div><div><span className="phone-label">09:17 — CONFIRMATION SENT</span><Phone type="sms" /></div></div>;
}
