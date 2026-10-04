"use client";
/* eslint-disable jsx-a11y/media-has-caption, jsx-a11y/no-noninteractive-element-interactions -- Existing supplied video has no caption sidecar; backdrop click-to-close is retained. */

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
        <p className="mono coral">SOFIA · OPTIONAL CALL SUPPORT</p>
        <h2>See how Sofia<br /><em>handles an enquiry.</em></h2>
        <p>Watch the existing demonstration of Sofia answering a call, managing the conversation and completing a booking.</p>
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
        <p className="mono coral">SOFIA AI RECEPTIONIST</p>
        <h3 id="video-preview-title">See the call experience.</h3>
      </div>
    </div>}
  </>;
}
