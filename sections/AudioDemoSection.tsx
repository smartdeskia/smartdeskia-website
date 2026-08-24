"use client";

import { useEffect, useRef, useState } from "react";

const conversation = [
  { speaker: "Caller", text: "Hi, I’d like to book an appointment for next Tuesday, preferably in the morning." },
  { speaker: "Sofia", text: "Of course. I can offer 9:30 or 11 o’clock next Tuesday. Which time would suit you best?" },
  { speaker: "Caller", text: "9:30 would be perfect." },
  { speaker: "Sofia", text: "Great. May I take your name and mobile number for the confirmation?" },
  { speaker: "Caller", text: "It’s Alex Morgan, and my number ends in 482." },
  { speaker: "Sofia", text: "Thank you, Alex. You’re booked for Tuesday at 9:30. I’ve sent your confirmation and everything is taken care of." },
];

export default function AudioDemoSection() {
  const [playing, setPlaying] = useState(false);
  const [activeLine, setActiveLine] = useState(-1);
  const timer = useRef<number | null>(null);

  const stop = () => {
    if (timer.current) window.clearTimeout(timer.current);
    window.speechSynthesis?.cancel();
    setPlaying(false);
  };

  const playLine = (index: number) => {
    if (index >= conversation.length) { setPlaying(false); setActiveLine(conversation.length); return; }
    setActiveLine(index);
    const line = conversation[index];
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(line.text);
      utterance.rate = line.speaker === "Sofia" ? .96 : 1.02;
      utterance.pitch = line.speaker === "Sofia" ? 1.08 : .94;
      const voices = window.speechSynthesis.getVoices();
      utterance.voice = voices.find(voice => line.speaker === "Sofia" ? /female|samantha|serena|karen/i.test(voice.name) : /male|daniel|alex|thomas/i.test(voice.name)) || voices[index % Math.max(voices.length, 1)] || null;
      utterance.onend = () => { timer.current = window.setTimeout(() => playLine(index + 1), 280); };
      utterance.onerror = () => { timer.current = window.setTimeout(() => playLine(index + 1), 900); };
      window.speechSynthesis.speak(utterance);
    } else timer.current = window.setTimeout(() => playLine(index + 1), 2600);
  };

  const toggle = () => {
    if (playing) { stop(); return; }
    stop(); setPlaying(true); setActiveLine(0);
    window.setTimeout(() => playLine(0), 30);
  };

  useEffect(() => () => stop(), []);

  const progress = activeLine < 0 ? 0 : Math.min(100, ((activeLine + 1) / conversation.length) * 100);

  return <section className="audio-demo sd-section" id="audio-demo">
    <div className="audio-demo-copy">
      <p className="mono coral">HEAR SOFIA IN ACTION</p>
      <h2>A natural conversation.<br /><em>A confirmed booking.</em></h2>
      <p>Listen to a short interactive example of Sofia understanding a request, finding a suitable time and completing the booking.</p>
      <small>This voice preview is simulated. A recorded SmartDeskia call can replace it later.</small>
    </div>
    <div className="call-player">
      <header><span><i /> SAMPLE CALL</span><small>{playing ? "PLAYING NOW" : activeLine >= conversation.length ? "CALL COMPLETE" : "READY · 00:42"}</small></header>
      <div className={`audio-waveform${playing ? " playing" : ""}`} aria-hidden="true">{Array.from({ length: 34 }, (_, index) => <i key={index} style={{ height: `${20 + ((index * 17) % 58)}%` }} />)}</div>
      <div className="audio-progress"><i style={{ width: `${progress}%` }} /></div>
      <div className="call-transcript" aria-live="polite">{conversation.map((line, index) => <p className={activeLine === index ? "active" : activeLine > index ? "heard" : ""} key={`${line.speaker}-${index}`}><b>{line.speaker}</b>{line.text}</p>)}</div>
      <footer><button type="button" onClick={toggle}><i>{playing ? "Ⅱ" : "▶"}</i>{playing ? "Pause call" : activeLine >= conversation.length ? "Play again" : "Play sample call"}</button><span><i /> BOOKING CONFIRMED</span></footer>
    </div>
  </section>;
}
