"use client";
import { useEffect, useState } from "react";

export default function Header({ onRequestCall }: { onRequestCall: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", close);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", close); };
  }, [menuOpen]);
  const closeMenu = () => setMenuOpen(false);
  return <header className="sd-nav"><a className="sd-logo" href="#top">SMART<span>DESK</span>IA<i /></a><nav className={menuOpen ? "open" : ""} aria-label="Primary navigation"><div className="nav-dropdown"><a href="#platform" onClick={closeMenu}>Platform</a><div className="nav-drop-panel"><a href="#dd-timeline"><b>Sofia AI</b><small>AI receptionist and conversations</small></a><a href="#dd-try"><b>Booking Automation</b><small>Appointments and scheduling</small></a><a href="#how-it-works"><b>Calls &amp; Follow-ups</b><small>History, outcomes and actions</small></a><a href="#platform"><b>Analytics</b><small>Front-desk performance</small></a></div></div><div className="nav-dropdown"><a href="#industries" onClick={closeMenu}>Industries</a><div className="nav-drop-panel industry-drop"><a className="dental-link" href="/dental"><b>Dental</b><small>AI reception for dental practices</small></a><a href="/salon">Salons</a><a href="/trades">Trades</a><a href="/legal">Legal</a><a href="/restaurant">Restaurants</a></div></div><a href="#how-it-works" onClick={closeMenu}>How It Works</a><a className="mobile-login" href="/login" onClick={closeMenu}>Log In</a><button className="mobile-call coral-button" onClick={() => { closeMenu(); onRequestCall(); }}>Request a Call <b>↗</b></button></nav><div className="nav-actions"><a className="login-link" href="/login">Log In</a><button className="nav-menu" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen(value => !value)}><i /><i /></button><button className="coral-button desktop-call" onClick={onRequestCall}>Request a Call <b>↗</b></button></div></header>;
}
