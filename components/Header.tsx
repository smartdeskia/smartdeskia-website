"use client";
import { useEffect, useState } from "react";

export default function Header() {
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
  return <header className="sd-nav"><a className="sd-logo" href="#top" aria-label="SmartDeskia — back to top">SMART<span>DESK</span>IA<i /></a><nav className={menuOpen ? "open" : ""} aria-label="Primary navigation"><a href="#how-it-works" onClick={closeMenu}>How it works</a><a href="#services" onClick={closeMenu}>Services</a><a href="#quote-calculator" onClick={closeMenu}>Calculator</a><a href="#sofia" onClick={closeMenu}>Sofia</a><a className="mobile-call coral-button" href="#how-it-works" onClick={closeMenu}>See how it works</a></nav><div className="nav-actions"><button className="nav-menu" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen(value => !value)}><i /><i /></button><a className="coral-button desktop-call" href="#how-it-works">See how it works</a></div></header>;
}
