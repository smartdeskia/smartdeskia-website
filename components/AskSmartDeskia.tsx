"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Message = { id: number; sender: "guide" | "visitor"; text: string };
type Option = { label: string; action?: string; href?: string; primary?: boolean };
type Answer = { text: string; options: Option[]; businessType?: string };

const welcome: Message = {
  id: 1,
  sender: "guide",
  text: "Hi! Tell me what you'd like to know about SmartDeskia. I can show you how it could work for your business.",
};

const homeOptions: Option[] = [
  { label: "Show me how it works", action: "how", primary: true },
  { label: "Would it work for my business?", action: "consult" },
  { label: "What does SmartDeskia handle?", action: "handles" },
  { label: "I want to talk to someone", action: "contact" },
];

const nextStepOptions: Option[] = [
  { label: "See the workflow", href: "/#how-it-works" },
  { label: "Would it work for my business?", action: "consult" },
  { label: "Talk to someone", action: "contact", primary: true },
];

const challengeOptions: Option[] = [
  { label: "Enquiries get forgotten", action: "challenge:forgotten enquiries" },
  { label: "Quotes or requests need follow-up", action: "challenge:quotes and requests that need follow-up" },
  { label: "Enquiries arrive in different places", action: "challenge:enquiries arriving through different channels" },
  { label: "I cannot see what needs attention", action: "challenge:not knowing what needs attention" },
  { label: "We miss phone enquiries", action: "challenge:missed phone enquiries" },
];

const businessExamples: Option[] = [
  "Trades & property services",
  "Salon, beauty & wellbeing",
  "Garage & automotive",
  "Professional/local services",
  "Something else",
].map(label => ({ label, action: `business:${label}` }));

const businessFitCopy: Record<string, string> = {
  "Trades & property services": "For trades and property services, SmartDeskia can keep new job enquiries, quotes and due follow-ups visible while the team is out working.",
  "Salon, beauty & wellbeing": "For salons, beauty and wellbeing businesses, SmartDeskia can keep enquiries, booking requests and agreed follow-ups visible. Any booking or phone setup would be scoped separately.",
  "Garage & automotive": "For garages and automotive businesses, SmartDeskia can keep service enquiries, quote requests and customer follow-ups visible from first contact to outcome.",
  "Professional/local services": "For professional and local services, SmartDeskia can keep each enquiry, requested response and next action clear without changing how the team delivers its service.",
  "Something else": "SmartDeskia can be adapted around service businesses that receive enquiries, requests, quotes, bookings or customer follow-ups, but the fit should be checked against how the business actually works.",
};

const contactIntent = /\b(contact(?: you)?|speak to (?:someone|a person)|talk to (?:someone|a person))\b/;

function suppliedBusiness(question: string): string | undefined {
  if (/garage|automotive|mechanic|vehicle/.test(question)) return "Garage & automotive";
  if (/salon|beauty|wellbeing|hair|barber|spa/.test(question)) return "Salon, beauty & wellbeing";
  if (/trade|contractor|plumb|electric|builder|construction|property/.test(question)) return "Trades & property services";
  if (/dental|dentist|clinic|account|legal|consult|professional|local service/.test(question)) return "Professional/local services";
  return undefined;
}

function answerQuestion(value: string): Answer {
  const question = value.toLowerCase();
  const identifiedBusiness = suppliedBusiness(question);

  if (/what is smartdeskia|what's smartdeskia|explain smartdeskia/.test(question)) {
    return {
      text: "SmartDeskia helps service businesses keep enquiries, quotes or requests, follow-ups and outcomes organised in one simple workflow — so it's clear what needs attention next.",
      options: [{ label: "Show me how it works", action: "how" }, { label: "Would it work for my business?", action: "consult" }, { label: "I want to talk to someone", action: "contact", primary: true }],
    };
  }

  if (/how.*work|workflow|process/.test(question)) {
    return {
      text: "An enquiry arrives from an ad, website, WhatsApp or phone. SmartDeskia captures it; the owner sends the quote or response; SmartDeskia keeps the next follow-up visible; the owner follows up; and the outcome is tracked. SmartDeskia manages what happens after an enquiry arrives—it does not generate the enquiry itself.",
      options: nextStepOptions,
    };
  }
  if (/\b(can|could|would|will|does|is)\b.*\b(work|suitable|fit)\b|my business|industry|type of business/.test(question)) {
    if (identifiedBusiness) {
      return {
        text: `${businessFitCopy[identifiedBusiness]} SmartDeskia can be adapted around businesses that receive enquiries, requests, quotes, bookings or customer follow-ups; the next step is to check that workflow against how your business operates. What is the main problem you would like to improve?`,
        options: challengeOptions,
        businessType: identifiedBusiness,
      };
    }
    return {
      text: "SmartDeskia can be adapted around businesses that receive enquiries, requests, quotes, bookings or customer follow-ups, but it is not automatically suitable for every business. What kind of business do you run?",
      options: businessExamples,
    };
  }
  if (/what.*handle|feature|capabilit|what.*do/.test(question)) {
    return {
      text: "SmartDeskia keeps incoming enquiries, their source, quote or request status, due follow-ups, won or lost outcomes and what needs attention visible. Optional support can include landing or quote pages, ad creative or setup support, and Sofia for phone enquiries.",
      options: [{ label: "See the workflow", href: "/#how-it-works" }, { label: "Ask about optional services", action: "optional" }, { label: "Talk to someone", action: "contact", primary: true }],
    };
  }
  if (/enquir|lead/.test(question)) {
    return {
      text: "Enquiries can come from Facebook or Instagram ads, a website or landing page, WhatsApp or phone. SmartDeskia records where each one came from and keeps the next action visible; it does not claim to generate the enquiry itself.",
      options: nextStepOptions,
    };
  }
  if (/quote|quotation|follow.?up|request status/.test(question)) {
    return {
      text: "After the owner sends a quote or response, SmartDeskia keeps its status and next follow-up visible. The owner remains in control of the response, follow-up and outcome.",
      options: [{ label: "See the workflow", href: "/#how-it-works" }, { label: "Use the quote calculator", href: "/#quote-calculator" }, { label: "Talk to someone", action: "contact", primary: true }],
    };
  }
  if (/dashboard|attention|overview|track/.test(question)) {
    return {
      text: "The product view brings enquiries, quote or request status, follow-ups and outcomes together, with items that need attention surfaced clearly.",
      options: [{ label: "View the product", href: "/#platform" }, { label: "Would it work for my business?", action: "consult" }, { label: "Talk to someone", action: "contact" }],
    };
  }
  if (/website|landing page/.test(question)) {
    return {
      text: "A website or landing page can feed enquiries into the same workflow. If you already have a good website, it can stay; setup support is optional and would be scoped for your business.",
      options: [{ label: "See optional services", href: "/#services" }, { label: "How does the workflow work?", action: "how" }, { label: "Talk to someone", action: "contact" }],
    };
  }
  if (/facebook|instagram|\bads?\b|creative/.test(question)) {
    return {
      text: "Ad creative and setup support can be an optional way to bring enquiries into the workflow. The ad generates the enquiry; SmartDeskia keeps the response and follow-up visible afterwards.",
      options: [{ label: "See optional services", href: "/#services" }, { label: "See the workflow", href: "/#how-it-works" }, { label: "Talk to someone", action: "contact" }],
    };
  }
  if (/whats.?app/.test(question)) {
    return {
      text: "WhatsApp can be one source of enquiries. SmartDeskia's role is to keep the enquiry and its next action visible alongside enquiries from your other channels; the exact setup would be confirmed for your business.",
      options: nextStepOptions,
    };
  }
  if (/sofia|phone|call|receptionist/.test(question)) {
    return {
      text: "SmartDeskia can also include Sofia, an optional AI phone receptionist that answers calls and captures phone enquiries. Sofia is separate from this website guide, and any phone workflow would be scoped and tested for the business.",
      options: [{ label: "Hear the Sofia sample", href: "/#sofia" }, { label: "See the core workflow", href: "/#how-it-works" }, { label: "Talk to someone", action: "contact" }],
    };
  }
  if (/price|cost|pricing|how much/.test(question)) {
    return {
      text: "Pricing depends on the core workflow and any optional support your business needs. The team can talk through a suitable setup without assuming features you do not need.",
      options: [{ label: "I want to talk to someone", action: "contact", primary: true }, { label: "What does SmartDeskia handle?", action: "handles" }],
    };
  }
  if (/setup|start|connect|integrat|pilot/.test(question)) {
    return {
      text: "The team first reviews how your business receives enquiries, responds and follows up today. The SmartDeskia workflow and any optional services are then scoped around that process.",
      options: [{ label: "See how it works", href: "/#how-it-works" }, { label: "Ask about the founding pilot", action: "contact", primary: true }, { label: "What does SmartDeskia handle?", action: "handles" }],
    };
  }
  if (contactIntent.test(question)) {
    return {
      text: "You can ask the SmartDeskia team about your current enquiry and follow-up process.",
      options: [{ label: "I want to talk to someone", action: "contact", primary: true }, { label: "Return to the main options", action: "home" }],
    };
  }

  return {
    text: "I can help with how SmartDeskia works, enquiries, follow-ups, setup and optional services. You can also choose one of the options below.",
    options: homeOptions,
  };
}

export default function AskSmartDeskia() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [options, setOptions] = useState<Option[]>(homeOptions);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [businessType, setBusinessType] = useState("your business");
  const nextId = useRef(2);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener("open-smartdeskia-chat", show);
    return () => window.removeEventListener("open-smartdeskia-chat", show);
  }, []);
  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }); }, [messages, typing, open]);

  const reply = (question: string, text: string, next: Option[]) => {
    setMessages(current => [...current, { id: nextId.current++, sender: "visitor", text: question }]);
    setOptions([]);
    setTyping(true);
    window.setTimeout(() => {
      setMessages(current => [...current, { id: nextId.current++, sender: "guide", text }]);
      setTyping(false);
      setOptions(next);
    }, 550);
  };

  const choose = (option: Option) => {
    if (option.action === "contact") {
      setOpen(false);
      window.dispatchEvent(new Event("open-request-call"));
      return;
    }
    if (option.action === "home") {
      reply(option.label, "Of course. What would you like to know about SmartDeskia?", homeOptions);
      return;
    }
    if (option.action === "how") {
      reply(option.label, "An enquiry arrives from an ad, website, WhatsApp or phone. SmartDeskia captures it; the owner sends the quote or response; SmartDeskia keeps the follow-up visible; the owner follows up; and the outcome is tracked. SmartDeskia manages what happens after an enquiry arrives—it does not generate the enquiry itself.", nextStepOptions);
      return;
    }
    if (option.action === "handles") {
      reply(option.label, "SmartDeskia keeps incoming enquiries, their source, quote or request status, due follow-ups, won or lost outcomes and what needs attention visible. Optional support can include landing or quote pages, ad creative or setup support, and Sofia for phone enquiries.", [
        { label: "See the workflow", href: "/#how-it-works" },
        { label: "Ask about optional services", action: "optional" },
        { label: "Talk to someone", action: "contact", primary: true },
      ]);
      return;
    }
    if (option.action === "optional") {
      reply(option.label, "Optional services can help enquiries enter or support the core workflow: landing or quote pages, ad creative or setup support, and Sofia as an optional AI phone receptionist. The core SmartDeskia workflow remains the central service.", [
        { label: "See optional services", href: "/#services" },
        { label: "How does the core workflow work?", action: "how" },
        { label: "Talk to someone", action: "contact" },
      ]);
      return;
    }
    if (option.action === "consult") {
      reply(option.label, "What kind of business do you run?", businessExamples);
      return;
    }
    if (option.action?.startsWith("business:")) {
      const selectedBusiness = option.action.slice("business:".length);
      setBusinessType(selectedBusiness);
      reply(option.label, `${businessFitCopy[selectedBusiness]} What is the main problem you would like to improve?`, challengeOptions);
      return;
    }
    if (option.action?.startsWith("challenge:")) {
      const challenge = option.action.slice("challenge:".length);
      const phoneRelevant = challenge === "missed phone enquiries";
      reply(option.label, `For ${businessType.toLowerCase()}, the sensible first step is to make enquiries, responses and due follow-ups visible so the owner can act and track the outcome. ${phoneRelevant ? "Because phone enquiries matter here, Sofia could also be considered as an optional way to capture calls." : "Optional entry-point services can be considered separately only if they are useful."}`, [
        { label: "See the workflow", href: "/#how-it-works" },
        ...(phoneRelevant ? [{ label: "Hear the Sofia sample", href: "/#sofia" }] : []),
        { label: "Talk about my business", action: "contact", primary: true },
      ]);
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const question = input.trim();
    if (!question || typing) return;
    setInput("");
    if (contactIntent.test(question.toLowerCase())) {
      setOpen(false);
      window.dispatchEvent(new Event("open-request-call"));
      return;
    }
    const result = answerQuestion(question);
    if (result.businessType) setBusinessType(result.businessType);
    reply(question, result.text, result.options);
  };

  const restart = () => {
    setMessages([welcome]);
    setOptions(homeOptions);
    setInput("");
    setTyping(false);
    setBusinessType("your business");
  };

  return <>
    <button className="chat-fab" aria-label={open ? "Close Ask SmartDeskia" : "Ask SmartDeskia"} aria-expanded={open} onClick={() => setOpen(value => !value)}><i /><span>{open ? "Close chat" : "Ask SmartDeskia"}</span></button>
    {open && <aside className="chat-box" aria-label="Ask SmartDeskia">
      <header><div><i /><span><b>Ask SmartDeskia</b><small>SmartDeskia guide</small></span></div><div className="chat-header-actions"><button onClick={restart}>Restart</button><button aria-label="Close chat" onClick={() => setOpen(false)}>×</button></div></header>
      <div className="chat-messages" aria-live="polite">{messages.map(message => <p key={message.id} className={message.sender === "guide" ? "bot" : "user"}>{message.text}</p>)}{typing && <div className="chat-typing" aria-label="SmartDeskia guide is typing"><i /><i /><i /></div>}<div ref={end} /></div>
      {options.length > 0 && <div className="chat-options">{options.map(option => option.href ? <a key={option.label} className={option.primary ? "primary" : ""} href={option.href} onClick={() => setOpen(false)}>{option.label}<span aria-hidden="true">↗</span></a> : <button key={option.label} className={option.primary ? "primary" : ""} onClick={() => choose(option)}>{option.label}<span aria-hidden="true">→</span></button>)}</div>}
      <form className="chat-input" onSubmit={submit}><label className="sr-only" htmlFor="smartdeskia-message">Ask SmartDeskia a question</label><input id="smartdeskia-message" value={input} onChange={event => setInput(event.target.value)} placeholder="Ask about SmartDeskia…" autoComplete="off" /><button type="submit" aria-label="Send message" disabled={!input.trim() || typing}>Send</button></form>
    </aside>}
  </>;
}
