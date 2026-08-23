"use client";
import { useEffect, useState } from "react";

const questions = ["What can you do?", "How does setup work?", "Can I try it?"];
const answers = ["I answer calls, handle bookings, capture leads and send follow-ups—24/7.", "We learn your services, rules and tone, then connect Sofia to your calendar and phone.", "Absolutely. Request a demo call and experience it for yourself."];

export default function SofiaChat() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  useEffect(() => { const show = () => setOpen(true); window.addEventListener("open-sofia-chat", show); return () => window.removeEventListener("open-sofia-chat", show); }, []);
  return <><button className="chat-fab" aria-label={open ? "Close Sofia chat" : "Chat with Sofia"} onClick={() => setOpen(value => !value)}><i /><span>{open ? "Close chat" : "Chat with Sofia"}</span></button>{open && <aside className="chat-box" aria-label="Chat with Sofia"><header><div><i /><span><b>Sofia</b><small>AI receptionist · Online</small></span></div><button aria-label="Close chat" onClick={() => setOpen(false)}>×</button></header><div className="chat-messages"><p className="bot">Hi, I’m Sofia. What would you like to know?</p>{step > 0 && <p className="user">{questions[step - 1]}</p>}{step > 0 && <p className="bot">{answers[step - 1]}</p>}</div><div className="chat-options">{step === 0 && questions.map((question, index) => <button key={question} onClick={() => setStep(index + 1)}>{question}</button>)}{step > 0 && <button onClick={() => setStep(0)}>Ask something else</button>}</div></aside>}</>;
}
