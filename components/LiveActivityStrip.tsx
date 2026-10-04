"use client";
import { useEffect, useState } from "react";
const activity = [
  { status: "NEW ENQUIRY", job: "Kitchen renovation", detail: "Instagram" },
  { status: "QUOTE SENT", job: "€4,800", detail: "Sarah M." },
  { status: "FOLLOW-UP DUE", job: "€2,800", detail: "4 days" },
  { status: "JOB WON", job: "€6,400", detail: "Today" },
  { status: "NEW ENQUIRY", job: "Aluminium windows", detail: "Website" },
  { status: "CONTACTED", job: "Robert M.", detail: "12 min ago" },
];

export default function LiveActivityStrip() {
  const [offset, setOffset] = useState(0);
  useEffect(() => { const timer = setInterval(() => setOffset(value => (value + 1) % activity.length), 3600); return () => clearInterval(timer); }, []);
  const events = activity.map((_, index) => activity[(index + offset) % activity.length]);
  return <section className="event-strip" aria-label="Example SmartDeskia workflow activity"><span className="event-demo-label">Example data</span><div className="event-track">{[0, 1].map(group => <div className="event-group" aria-hidden={group === 1} key={group}>{events.map((event, index) => <span className={index === 0 ? "incoming" : ""} key={`${event.status}-${event.job}`}><i /><b>{event.status}</b> · {event.job} · {event.detail}</span>)}</div>)}</div></section>;
}
