"use client";

import { useEffect, useRef, useState } from "react";

const conversation = [
  { start: 0, end: 5.74, speaker: "Sofia", text: "Hi, thanks for calling. This is Sofia, an AI assistant for the clinic. How can I help you today?" },
  { start: 6.68, end: 8.2, speaker: "Caller", text: "Hi, I’d like to book a check-up, please." },
  { start: 9.6, end: 14.62, speaker: "Sofia", text: "Of course. Are you an existing patient with us, or would this be your first visit?" },
  { start: 15.34, end: 16.84, speaker: "Caller", text: "First visit, actually." },
  { start: 18.08, end: 24.62, speaker: "Sofia", text: "Welcome. I have Wednesday at 10 a.m. or Thursday at 2 p.m. available this week. Which works better for you?" },
  { start: 25.3, end: 26.86, speaker: "Caller", text: "Thursday at 2 would be great." },
  { start: 27.88, end: 33.18, speaker: "Sofia", text: "Perfect. You’re booked for Thursday at 2 p.m. Can I get your name and a phone number for the confirmation?" },
  { start: 34.18, end: 41.08, speaker: "Caller", text: "Nick Allen, and my number ends in 456." },
  { start: 42.42, end: 49.78, speaker: "Sofia", text: "Thank you, Nick. I’ve got that down. You will receive a confirmation text shortly. Is there anything else I can help with?" },
  { start: 50.58, end: 53.92, speaker: "Caller", text: "Actually, quick question. Do you take walk-ins for emergencies?" },
  { start: 55.22, end: 63, speaker: "Sofia", text: "We do. If it’s urgent, just call this same number and I’ll get you seen as quickly as possible, even outside a scheduled slot." },
  { start: 63.58, end: 66.02, speaker: "Caller", text: "Great. Good to know. That’s everything. Thank you." },
  { start: 66.66, end: 70.36, speaker: "Sofia", text: "You’re welcome, Nick. We’ll see you Thursday at 2. Have a great day." },
];

const duration = 74.257;

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}

export default function AudioDemoSection() {
  const audio = useRef<HTMLAudioElement>(null);
  const activeElement = useRef<HTMLParagraphElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const activeLine = conversation.findIndex(line => currentTime >= line.start && currentTime < line.end);
  const visibleCount = conversation.filter(line => currentTime >= line.start).length;
  const bookingConfirmed = currentTime >= 33.18;

  useEffect(() => { activeElement.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }); }, [activeLine]);

  const toggle = async () => {
    if (!audio.current) return;
    if (audio.current.ended) { audio.current.currentTime = 0; setCurrentTime(0); }
    if (audio.current.paused) await audio.current.play();
    else audio.current.pause();
  };

  const typedText = (line: typeof conversation[number], index: number) => {
    if (currentTime >= line.end || index < activeLine || activeLine === -1 && currentTime > line.end) return line.text;
    if (currentTime < line.start) return "";
    const progress = Math.min(1, (currentTime - line.start) / Math.max(.2, line.end - line.start));
    return line.text.slice(0, Math.max(1, Math.floor(line.text.length * progress)));
  };

  return <section className="audio-demo sd-section" id="audio-demo">
    <div className="audio-demo-copy">
      <p className="mono coral">HEAR SOFIA IN ACTION</p>
      <h2>A real conversation.<br /><em>A confirmed booking.</em></h2>
      <p>Listen as Sofia welcomes a caller, books a first appointment, captures the details and answers a follow-up question.</p>
      <small>Recorded demonstration call. Personal contact details are shortened in the transcript.</small>
    </div>
    <div className="call-player">
      <header><span><i /> RECORDED CALL</span><small>{playing ? "PLAYING NOW" : currentTime >= duration - .5 ? "CALL COMPLETE" : `READY · ${formatTime(duration)}`}</small></header>
      <audio ref={audio} preload="metadata" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onTimeUpdate={event => setCurrentTime(event.currentTarget.currentTime)}>
        <source src="/smartdeskia-sample-call.mp4" type="audio/mp4" />
      </audio>
      <div className={`audio-waveform${playing ? " playing" : ""}`} aria-hidden="true">{Array.from({ length: 34 }, (_, index) => <i key={index} style={{ height: `${20 + ((index * 17) % 58)}%` }} />)}</div>
      <div className="audio-progress"><i style={{ width: `${Math.min(100, currentTime / duration * 100)}%` }} /></div>
      <div className="call-transcript" aria-live="polite">
        {visibleCount === 0 && <p className="transcript-ready">Press play to follow the conversation as it happens.</p>}
        {conversation.map((line, index) => currentTime >= line.start && <p ref={activeLine === index ? activeElement : undefined} className={activeLine === index ? "active typing" : "heard"} key={`${line.speaker}-${index}`}><b>{line.speaker}</b>{typedText(line, index)}{activeLine === index && <i className="type-cursor" aria-hidden="true" />}</p>)}
      </div>
      <footer><button type="button" onClick={toggle}><i>{playing ? "Ⅱ" : "▶"}</i>{playing ? "Pause call" : currentTime >= duration - .5 ? "Play again" : "Play recorded call"}</button><span className={bookingConfirmed ? "confirmed" : "pending"}><i /> {bookingConfirmed ? "BOOKING CONFIRMED" : "LISTENING"}</span></footer>
    </div>
  </section>;
}
