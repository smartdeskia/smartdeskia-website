"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Message = { id: number; sender: "sofia" | "visitor"; text: string };
type Option = { label: string; action?: string; href?: string; primary?: boolean };

const welcome: Message = { id: 1, sender: "sofia", text: "Hi, I’m Sofia. How can I help you today? You can explore what I do, choose your industry, or ask me anything about SmartDeskia." };

const homeOptions: Option[] = [
  { label: "Recommend the right setup", action: "consult", primary: true },
  { label: "Explore Sofia’s services", action: "services" },
  { label: "Find my industry", action: "industries" },
  { label: "How SmartDeskia works", action: "how" },
  { label: "Request a demo call", action: "demo" },
];

const serviceOptions: Option[] = [
  { label: "24/7 call answering", action: "calls" },
  { label: "Booking automation", action: "bookings" },
  { label: "Leads & follow-ups", action: "followups" },
  { label: "Dashboard & analytics", action: "analytics" },
  { label: "← Main menu", action: "home" },
];

const industryOptions: Option[] = ["Dental", "Salons", "Trades", "Legal", "Restaurants"].map(label => ({ label, action: `industry:${label.toLowerCase().replace("salons", "salon").replace("restaurants", "restaurant")}` }));

const industryCopy: Record<string, string> = {
  dental: "For dental practices, I answer patient calls, book and move appointments, handle common enquiries and send confirmations while the clinical team stays focused.",
  salon: "For salons, I understand services, stylists and availability, then book or change appointments and keep the waitlist moving.",
  trades: "For trades, I answer while the team is on site, capture job details, identify urgent calls and arrange the right next step.",
  legal: "For legal firms, I provide a professional first response, gather enquiry details and book consultations without giving legal advice.",
  restaurant: "For restaurants, I handle reservations, changes, party sizes and dietary notes while the team looks after guests.",
};

function naturalAnswer(value: string): { text: string; options: Option[] } {
  const q = value.toLowerCase();
  const industry = Object.keys(industryCopy).find(name => q.includes(name) || (name === "salon" && /hair|beauty/.test(q)) || (name === "trades" && /plumb|electric|builder/.test(q)) || (name === "restaurant" && /table|reservation/.test(q)));
  if (industry) return { text: industryCopy[industry], options: [{ label: `Explore the ${industry} example`, href: `/${industry}` }, { label: "Request a demo call", action: "demo", primary: true }, { label: "Other industries", action: "industries" }] };
  if (/service|what.*do|capabilit|feature/.test(q)) return { text: "I can answer calls around the clock, manage bookings, capture and qualify leads, send follow-ups, transfer urgent calls and keep everything visible in one dashboard.", options: serviceOptions };
  if (/price|cost|pricing|how much/.test(q)) return { text: "Pricing depends on your call volume and workflow. The SmartDeskia team can recommend the right setup after a short, no-pressure demo call.", options: [{ label: "Request pricing & demo", action: "demo", primary: true }, { label: "Explore services", action: "services" }] };
  if (/book|appointment|calendar|schedule/.test(q)) return { text: "I can check availability, agree a suitable time, create or move a booking and send confirmation automatically.", options: [{ label: "See the booking workflow", href: "/#dd-timeline" }, { label: "Explore other services", action: "services" }] };
  if (/human|transfer|urgent|emergency/.test(q)) return { text: "Your business sets the rules. I can transfer priority calls, alert the right person or capture a detailed message for follow-up.", options: [{ label: "See how it works", href: "/#how-it-works" }, { label: "Request a demo call", action: "demo", primary: true }] };
  if (/setup|install|start|connect|integrat/.test(q)) return { text: "We learn your services, availability, rules and tone, connect your phone and calendar, test the experience with you, then go live when you’re ready.", options: [{ label: "See how it works", href: "/#how-it-works" }, { label: "Talk about setup", action: "demo", primary: true }] };
  return { text: "I can help with services, industries, bookings, setup, integrations and demo calls. Try asking, “Would Sofia work for a salon?” or choose a path below.", options: homeOptions };
}

export default function SofiaChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [options, setOptions] = useState<Option[]>(homeOptions);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [profile, setProfile] = useState({ industry: "your business", challenge: "front-desk workload", volume: "your current call volume" });
  const nextId = useRef(2);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => { const show = () => setOpen(true); window.addEventListener("open-sofia-chat", show); return () => window.removeEventListener("open-sofia-chat", show); }, []);
  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }); }, [messages, typing, open]);

  const reply = (question: string, text: string, next: Option[]) => {
    setMessages(current => [...current, { id: nextId.current++, sender: "visitor", text: question }]);
    setOptions([]); setTyping(true);
    window.setTimeout(() => { setMessages(current => [...current, { id: nextId.current++, sender: "sofia", text }]); setTyping(false); setOptions(next); }, 550);
  };

  const choose = (option: Option) => {
    if (option.action === "demo") { setOpen(false); window.dispatchEvent(new Event("open-request-call")); return; }
    if (option.action === "home") { reply(option.label, "Of course. What would you like help with?", homeOptions); return; }
    if (option.action === "consult") {
      reply(option.label, "I’ll ask three quick questions, then suggest a practical SmartDeskia setup. First, what type of business do you run?", [
        ...["Dental practice", "Salon or beauty", "Trade or home service", "Legal firm", "Restaurant", "Another local business"].map(label => ({ label, action: `consult-industry:${label}` })),
      ]);
      return;
    }
    if (option.action?.startsWith("consult-industry:")) {
      const industry = option.action.split(":")[1];
      setProfile(current => ({ ...current, industry }));
      reply(option.label, `Great—I'll tailor this for a ${industry.toLowerCase()}. What creates the most pressure for your team right now?`, [
        { label: "Missed or after-hours calls", action: "consult-challenge:missed calls" },
        { label: "Booking and rescheduling", action: "consult-challenge:booking administration" },
        { label: "New enquiries and leads", action: "consult-challenge:new enquiries" },
        { label: "Repetitive caller questions", action: "consult-challenge:repetitive enquiries" },
      ]);
      return;
    }
    if (option.action?.startsWith("consult-challenge:")) {
      const challenge = option.action.split(":")[1];
      setProfile(current => ({ ...current, challenge }));
      reply(option.label, "Understood. Roughly how many calls does the business receive on a normal working day? An estimate is fine.", [
        { label: "Fewer than 10", action: "consult-volume:fewer than 10 daily calls" },
        { label: "10–30 calls", action: "consult-volume:10–30 daily calls" },
        { label: "More than 30", action: "consult-volume:more than 30 daily calls" },
        { label: "I’m not sure", action: "consult-volume:variable call volume" },
      ]);
      return;
    }
    if (option.action?.startsWith("consult-volume:")) {
      const volume = option.action.split(":")[1];
      setProfile(current => ({ ...current, volume }));
      reply(option.label, `Thanks. For a ${profile.industry.toLowerCase()} dealing with ${profile.challenge} and ${volume}, I’d recommend starting with intelligent call answering plus outcome-based routing. Sofia can resolve routine requests, manage bookings where appropriate, and send anything requiring a person to the right team member.`, [
        { label: "What would callers experience?", action: "consult-experience" },
        { label: "What would my team see?", action: "consult-dashboard" },
        { label: "What happens during setup?", action: "consult-setup" },
      ]);
      return;
    }
    if (option.action === "consult-experience") {
      reply(option.label, `Callers hear a natural welcome tailored to ${profile.industry.toLowerCase()}. Sofia listens, asks only relevant questions, completes the request when possible and clearly confirms what happens next—without forcing callers through a rigid menu.`, [
        { label: "What would my team see?", action: "consult-dashboard" },
        { label: "How are unusual calls handled?", action: "consult-exceptions" },
        { label: "See an example conversation", href: "/#dd-timeline" },
      ]);
      return;
    }
    if (option.action === "consult-dashboard") {
      reply(option.label, "Your team sees the caller, reason for calling, conversation outcome, booking or follow-up status and any action that needs attention. Nothing important is hidden inside a voicemail inbox.", [
        { label: "View the dashboard", href: "/#platform" },
        { label: "What happens during setup?", action: "consult-setup" },
        { label: "How are unusual calls handled?", action: "consult-exceptions" },
      ]);
      return;
    }
    if (option.action === "consult-exceptions") {
      reply(option.label, "You define escalation rules before launch. Sofia can transfer urgent calls, alert a named person, take a structured message or explain the correct next step. If she is uncertain, she does not invent an answer.", [
        { label: "What happens during setup?", action: "consult-setup" },
        { label: "Request my tailored demo", action: "demo", primary: true },
        { label: "Return to main menu", action: "home" },
      ]);
      return;
    }
    if (option.action === "consult-setup") {
      reply(option.label, `The team maps the calls your ${profile.industry.toLowerCase()} receives, your preferred answers, opening hours, booking rules and escalation contacts. Then Sofia is connected, tested with realistic calls and refined before launch.`, [
        { label: "View the setup process", href: "/#how-it-works" },
        { label: "Request my tailored demo", action: "demo", primary: true },
        { label: "Ask another question", action: "home" },
      ]);
      return;
    }
    if (option.action === "services") { reply(option.label, "I work as part of your front desk—not just as an answering service. Choose a service to see what it can do.", serviceOptions); return; }
    if (option.action === "industries") { reply(option.label, "Choose your type of business and I’ll show you a relevant example.", [...industryOptions, { label: "← Main menu", action: "home" }]); return; }
    if (option.action === "how") { reply(option.label, "SmartDeskia learns your business rules, connects with your phone and calendar, then lets me handle real conversations while your team remains in control.", [{ label: "View how it works", href: "/#how-it-works" }, { label: "Explore services", action: "services" }, { label: "Request a demo call", action: "demo", primary: true }]); return; }
    if (option.action?.startsWith("industry:")) { const name = option.action.split(":")[1]; reply(option.label, industryCopy[name], [{ label: `View the ${option.label} page`, href: `/${name}` }, { label: "Choose another industry", action: "industries" }, { label: "Request a demo call", action: "demo", primary: true }]); return; }
    const service: Record<string, [string, string]> = {
      calls: ["24/7 call answering", "I answer every call in your business’s tone, understand the reason for calling, resolve routine requests and follow your rules for transfers or messages."],
      bookings: ["Booking automation", "I check availability, create or move appointments, collect the right details and send confirmations—during one natural conversation."],
      followups: ["Leads & follow-ups", "I capture new enquiries, qualify them using your questions and create clear follow-up actions so opportunities do not disappear into voicemail."],
      analytics: ["Dashboard & analytics", "Every call, outcome, booking and follow-up is recorded in one front-desk dashboard, giving your team a clear view of activity and performance."],
    };
    if (option.action && service[option.action]) { const [label, text] = service[option.action]; reply(label, text, [{ label: "How would this fit my business?", action: "consult" }, { label: "View this on the website", href: option.action === "bookings" ? "/#dd-timeline" : "/#platform" }, { label: "Explore another service", action: "services" }, { label: "Request a demo call", action: "demo", primary: true }]); }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const question = input.trim(); if (!question || typing) return; setInput(""); const result = naturalAnswer(question); reply(question, result.text, result.options); };
  const restart = () => { setMessages([welcome]); setOptions(homeOptions); setInput(""); setTyping(false); setProfile({ industry: "your business", challenge: "front-desk workload", volume: "your current call volume" }); };

  return <><button className="chat-fab" aria-label={open ? "Close Sofia chat" : "Chat with Sofia"} aria-expanded={open} onClick={() => setOpen(value => !value)}><i /><span>{open ? "Close chat" : "Chat with Sofia"}</span></button>{open && <aside className="chat-box" aria-label="Chat with Sofia"><header><div><i /><span><b>Sofia</b><small>AI receptionist · Online</small></span></div><div className="chat-header-actions"><button onClick={restart}>Restart</button><button aria-label="Close chat" onClick={() => setOpen(false)}>×</button></div></header><div className="chat-messages" aria-live="polite">{messages.map(message => <p key={message.id} className={message.sender === "sofia" ? "bot" : "user"}>{message.text}</p>)}{typing && <div className="chat-typing" aria-label="Sofia is typing"><i /><i /><i /></div>}<div ref={end} /></div>{options.length > 0 && <div className="chat-options">{options.map(option => option.href ? <a key={option.label} className={option.primary ? "primary" : ""} href={option.href} onClick={() => setOpen(false)}>{option.label}<span aria-hidden="true">↗</span></a> : <button key={option.label} className={option.primary ? "primary" : ""} onClick={() => choose(option)}>{option.label}<span aria-hidden="true">→</span></button>)}</div>}<form className="chat-input" onSubmit={submit}><label className="sr-only" htmlFor="sofia-message">Ask Sofia a question</label><input id="sofia-message" value={input} onChange={event => setInput(event.target.value)} placeholder="Ask about services, industries or setup…" autoComplete="off" /><button type="submit" aria-label="Send message" disabled={!input.trim() || typing}>Send</button></form></aside>}</>;
}
