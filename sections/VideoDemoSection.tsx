"use client";

import { useEffect, useState } from "react";

export default function VideoDemoSection() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return <>
    <section className="video-demo sd-section" id="video-demo">
      <div className="video-demo-copy">
        <p className="mono coral">SEE SMARTDESKIA IN ACTION</p>
        <h2>One intelligent front desk.<br /><em>Every conversation handled.</em></h2>
        <p>Discover how SmartDeskia answers calls, manages conversations, books appointments and keeps your business moving—day and night.</p>
      </div>
      <button className="video-poster" type="button" onClick={() => setOpen(true)} aria-label="Play the Sofia demonstration video">
        <span className="video-brand">SMART<span>DESK</span>IA<b>.</b></span>
        <span className="video-call-state"><i /> CALL IN PROGRESS</span>
        <span className="video-wave" aria-hidden="true">{Array.from({ length: 18 }, (_, index) => <i key={index} />)}</span>
        <span className="video-play"><i /> <b>PLAY DEMO</b></span>
        <small>SMARTDESKIA · EXPLAINER VIDEO</small>
      </button>
    </section>
    {open && <div className="video-overlay" role="dialog" aria-modal="true" aria-labelledby="video-preview-title" onMouseDown={event => event.target === event.currentTarget && setOpen(false)}>
      <div className="video-modal">
        <button type="button" className="video-close" onClick={() => setOpen(false)} aria-label="Close video preview">×</button>
        <video className="video-player" controls autoPlay playsInline preload="metadata" aria-labelledby="video-preview-title">
          <source src="/smartdeskia-explainer.mp4" type="video/mp4" />
          Your browser does not support embedded video.
        </video>
        <p className="mono coral">HOW SMARTDESKIA WORKS</p>
        <h3 id="video-preview-title">Meet your intelligent front desk.</h3>
      </div>
    </div>}
  </>;
}
