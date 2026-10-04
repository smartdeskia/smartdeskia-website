"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Message = { id: number; sender: "sofia" | "visitor"; text: string };
type Option = { label: string; action?: string; href?: string; primary?: boolean };

const welcome: Message = { id: 1, sender: "sofia", text: "Hi, I’m Sofia. I can explain how SmartDeskia keeps enquiries, quotations and follow-ups moving — or tell you about optional call support." };

const homeOptions: Option[] = [
  { label: "Explore the core services", action: "services", primary: true },
  { label: "Recommend the right setup", action: "consult" },
  { label: "See the quote calculator", href: "/#quote-calculator" },
  { label: "How SmartDeskia works", action: "how" },
  { label: "Ask about Sofia call support", action: "calls" },
];

const serviceOptions: Option[] = [
  { label: "Enquiry & Quote Follow-Up", action: "followups" },
  { label: "Website / Landing Pages", action: "websites" },
  { label: "Missed-call recovery", action: "missedcalls" },
  { label: "Sofia AI receptionist", action: "calls" },
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
  if (/service|what.*do|capabilit|feature/.test(q)) return { text: "SmartDeskia helps keep enquiries, quotations, follow-ups and outcomes visible. Websites, missed-call recovery and Sofia call handling are optional services around that core workflow.", options: serviceOptions };
  if (/quote|quotation|follow.?up|enquir/.test(q)) return { text: "The core service gives each enquiry and quotation a clear status, next action and owner. It helps you see what needs a reply, what was quoted and which opportunities need following up.", options: [{ label: "See how it works", href: "/#how-it-works" }, { label: "Use the quote calculator", href: "/#quote-calculator" }, { label: "Show me for my business", action: "demo", primary: true }] };
  if (/invoice|payment|get paid|unpaid/.test(q)) return { text: "Payment and accounting automation are not part of the current SmartDeskia website offer. The current focus is keeping enquiries, quotations and follow-ups visible.", options: serviceOptions };
  if (/website|landing page/.test(q)) return { text: "Already have a good website? Keep it. SmartDeskia can connect its enquiry flow to the workflow. If you need a new one, the team can build a fast, search-ready website or landing page with enquiry capture and SEO foundations.", options: serviceOptions };
  if (/price|cost|pricing|how much/.test(q)) return { text: "Pricing depends on the workflow and optional services your business needs. The team can talk through an appropriate setup without assuming features you do not need.", options: [{ label: "Show me for my business", action: "demo", primary: true }, { label: "Explore services", action: "services" }] };
  if (/book|appointment|calendar|schedule/.test(q)) return { text: "The recorded demonstration shows how Sofia can handle a booking conversation. Any calendar or booking setup would need to be confirmed for your business rather than assumed to be universally available.", options: [{ label: "Hear the recorded demonstration", href: "/#sofia" }, { label: "Explore other services", action: "services" }] };
  if (/human|transfer|urgent|emergency/.test(q)) return { text: "Sofia can capture the caller’s request for follow-up. Any transfer or escalation arrangement would need to be agreed and tested for the individual business.", options: [{ label: "Hear the recorded demonstration", href: "/#sofia" }, { label: "Show me for my business", action: "demo", primary: true }] };
  if (/setup|install|start|connect|integrat/.test(q)) return { text: "The team first reviews how your business currently handles enquiries and quotes. Any connection or call-handling setup is then scoped and confirmed for that business; it is not assumed to be available automatically.", options: [{ label: "See the product preview", href: "/#how-it-works" }, { label: "Talk about your workflow", action: "demo", primary: true }] };
  return { text: "I can explain enquiry and quote follow-up, the calculator, websites, missed-call recovery and optional Sofia call handling. Choose a path below or ask a question.", options: homeOptions };
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
      reply(option.label, `Thanks. For a ${profile.industry.toLowerCase()} dealing with ${profile.challenge} and ${volume}, a sensible starting point is to make enquiries and follow-ups visible. Optional Sofia call handling can then be considered if capturing calls is part of the problem.`, [
        { label: "What would callers experience?", action: "consult-experience" },
        { label: "What would my team see?", action: "consult-dashboard" },
        { label: "What happens during setup?", action: "consult-setup" },
      ]);
      return;
    }
    if (option.action === "consult-experience") {
      reply(option.label, `The recorded demonstration shows a natural call in which Sofia listens, asks relevant questions and captures the request. The exact call flow and any actions would be agreed for your ${profile.industry.toLowerCase()} before use.`, [
        { label: "What would my team see?", action: "consult-dashboard" },
        { label: "How are unusual calls handled?", action: "consult-exceptions" },
        { label: "Hear the recorded demonstration", href: "/#sofia" },
      ]);
      return;
    }
    if (option.action === "consult-dashboard") {
      reply(option.label, "The current product preview shows enquiries, quotations, follow-ups and outcomes in one place, with priority items surfaced under Needs Attention.", [
        { label: "View the dashboard", href: "/#platform" },
        { label: "What happens during setup?", action: "consult-setup" },
        { label: "How are unusual calls handled?", action: "consult-exceptions" },
      ]);
      return;
    }
    if (option.action === "consult-exceptions") {
      reply(option.label, "Sofia can capture a structured message and the reason for the call. Any transfer, alert or escalation requirement would need to be scoped and tested for the individual business.", [
        { label: "What happens during setup?", action: "consult-setup" },
        { label: "Request my tailored demo", action: "demo", primary: true },
        { label: "Return to main menu", action: "home" },
      ]);
      return;
    }
    if (option.action === "consult-setup") {
      reply(option.label, `The team would review how your ${profile.industry.toLowerCase()} handles enquiries, preferred answers and follow-up today. Any optional call handling or connection would be scoped, agreed and tested before use.`, [
        { label: "View the setup process", href: "/#how-it-works" },
        { label: "Request my tailored demo", action: "demo", primary: true },
        { label: "Ask another question", action: "home" },
      ]);
      return;
    }
    if (option.action === "services") { reply(option.label, "SmartDeskia starts with enquiry and quote follow-up, then adds practical services around the way your business works. Choose one to learn more.", serviceOptions); return; }
    if (option.action === "industries") { reply(option.label, "Choose your type of business and I’ll show you a relevant example.", [...industryOptions, { label: "← Main menu", action: "home" }]); return; }
    if (option.action === "how") { reply(option.label, "SmartDeskia follows a simple lifecycle: enquiry, contact, quote, follow-up, then won or lost. Your team stays in control while the next action remains visible.", [{ label: "View how it works", href: "/#how-it-works" }, { label: "Explore services", action: "services" }, { label: "Show me for my business", action: "demo", primary: true }]); return; }
    if (option.action?.startsWith("industry:")) { const name = option.action.split(":")[1]; reply(option.label, industryCopy[name], [{ label: `View the ${option.label} page`, href: `/${name}` }, { label: "Choose another industry", action: "industries" }, { label: "Request a demo call", action: "demo", primary: true }]); return; }
    const service: Record<string, [string, string]> = {
      calls: ["Sofia AI receptionist", "As an optional service, I can answer calls in your business’s tone, capture the enquiry and help feed it into your SmartDeskia workflow."],
      followups: ["Enquiry & Quote Follow-Up", "SmartDeskia captures new enquiries, tracks each quote and creates clear follow-up actions so opportunities do not quietly disappear."],
      websites: ["Website / Landing Pages", "Keep a good existing website and connect its enquiry flow, or ask the team about a fast, search-ready website or landing page with enquiry capture and SEO foundations."],
      missedcalls: ["Missed-call recovery", "Capture missed calls and alert the business so someone can follow up quickly."],
    };
    if (option.action && service[option.action]) { const [label, text] = service[option.action]; reply(label, text, [{ label: "How would this fit my business?", action: "consult" }, { label: "View this on the website", href: option.action === "calls" ? "/#sofia" : option.action === "followups" ? "/#how-it-works" : "/#services" }, { label: "Explore another service", action: "services" }, { label: "Show me for my business", action: "demo", primary: true }]); }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const question = input.trim(); if (!question || typing) return; setInput(""); const result = naturalAnswer(question); reply(question, result.text, result.options); };
  const restart = () => { setMessages([welcome]); setOptions(homeOptions); setInput(""); setTyping(false); setProfile({ industry: "your business", challenge: "front-desk workload", volume: "your current call volume" }); };

  return <><button className="chat-fab" aria-label={open ? "Close Sofia chat" : "Chat with Sofia"} aria-expanded={open} onClick={() => setOpen(value => !value)}><i /><span>{open ? "Close chat" : "Chat with Sofia"}</span></button>{open && <aside className="chat-box" aria-label="Chat with Sofia"><header><div><i /><span><b>Sofia</b><small>SmartDeskia guide</small></span></div><div className="chat-header-actions"><button onClick={restart}>Restart</button><button aria-label="Close chat" onClick={() => setOpen(false)}>×</button></div></header><div className="chat-messages" aria-live="polite">{messages.map(message => <p key={message.id} className={message.sender === "sofia" ? "bot" : "user"}>{message.text}</p>)}{typing && <div className="chat-typing" aria-label="Sofia is typing"><i /><i /><i /></div>}<div ref={end} /></div>{options.length > 0 && <div className="chat-options">{options.map(option => option.href ? <a key={option.label} className={option.primary ? "primary" : ""} href={option.href} onClick={() => setOpen(false)}>{option.label}<span aria-hidden="true">↗</span></a> : <button key={option.label} className={option.primary ? "primary" : ""} onClick={() => choose(option)}>{option.label}<span aria-hidden="true">→</span></button>)}</div>}<form className="chat-input" onSubmit={submit}><label className="sr-only" htmlFor="sofia-message">Ask Sofia a question</label><input id="sofia-message" value={input} onChange={event => setInput(event.target.value)} placeholder="Ask about the workflow or services…" autoComplete="off" /><button type="submit" aria-label="Send message" disabled={!input.trim() || typing}>Send</button></form></aside>}</>;
}
