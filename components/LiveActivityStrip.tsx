"use client";
import { useEffect, useState } from "react";
import { liveConversation } from "../data/industries";

export default function LiveActivityStrip() {
  const [offset, setOffset] = useState(0);
  useEffect(() => { const timer = setInterval(() => setOffset(value => (value + 1) % liveConversation.length), 3600); return () => clearInterval(timer); }, []);
  const events = liveConversation.map((_, index) => liveConversation[(index + offset) % liveConversation.length]);
  return <section className="event-strip" aria-label="Simulated live conversation"><div className="event-track">{[0, 1].map(group => <div className="event-group" aria-hidden={group === 1} key={group}>{events.map((event, index) => <span className={index === 0 ? "incoming" : ""} key={event}><i />{index === 0 ? "JUST NOW" : `${index * 4} MIN AGO`} · {event}</span>)}</div>)}</div></section>;
}
