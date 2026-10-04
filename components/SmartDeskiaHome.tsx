"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import RequestCallModal from "./RequestCallModal";
import SofiaChat from "./SofiaChat";
import HeroSection from "../sections/HeroSection";
import AudioDemoSection from "../sections/AudioDemoSection";
import MissedCallCostCalculator from "./MissedCallCostCalculator";
import AdToJobSection from "../sections/AdToJobSection";
import { AdditionalServicesSection, FinalCTA, FoundingPilot, HowItWorksSection } from "../sections/PlatformSections";

export default function SmartDeskiaHome() {
  const [modalOpen, setModalOpen] = useState(false);
  useLayoutEffect(() => {
    const resetHomepagePosition = () => {
      if (window.location.pathname === "/" && !window.location.hash) window.scrollTo(0, 0);
    };
    if (window.location.pathname !== "/" || window.location.hash) return;
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    resetHomepagePosition();
    const frame = window.requestAnimationFrame(resetHomepagePosition);
    const afterRestore = window.setTimeout(resetHomepagePosition, 150);
    window.addEventListener("pageshow", resetHomepagePosition);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(afterRestore);
      window.removeEventListener("pageshow", resetHomepagePosition);
      window.history.scrollRestoration = previous;
    };
  }, []);
  useEffect(() => {
    const openRequestCall = () => setModalOpen(true);
    window.addEventListener("open-request-call", openRequestCall);
    return () => window.removeEventListener("open-request-call", openRequestCall);
  }, []);
  const requestCall = () => setModalOpen(true);
  return <main className="sd-site"><Header /><HeroSection /><HowItWorksSection /><MissedCallCostCalculator /><AdToJobSection /><AudioDemoSection /><AdditionalServicesSection /><FoundingPilot /><FinalCTA onRequestCall={requestCall} /><Footer onRequestCall={requestCall} /><SofiaChat />{modalOpen && <RequestCallModal onClose={() => setModalOpen(false)} />}</main>;
}
