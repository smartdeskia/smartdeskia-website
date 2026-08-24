"use client";
import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import RequestCallModal from "./RequestCallModal";
import SofiaChat from "./SofiaChat";
import HeroSection from "../sections/HeroSection";
import IndustriesSection from "../sections/IndustriesSection";
import VideoDemoSection from "../sections/VideoDemoSection";
import AudioDemoSection from "../sections/AudioDemoSection";
import BookingWorkflowSection from "../sections/BookingWorkflowSection";
import { ComparisonSection, FinalCTA, HowItWorksSection, TryCallSection } from "../sections/PlatformSections";

export default function SmartDeskiaHome() {
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    const openRequestCall = () => setModalOpen(true);
    window.addEventListener("open-request-call", openRequestCall);
    return () => window.removeEventListener("open-request-call", openRequestCall);
  }, []);
  const requestCall = () => setModalOpen(true);
  const openChat = () => window.dispatchEvent(new Event("open-sofia-chat"));
  return <main className="sd-site"><Header onRequestCall={requestCall} /><HeroSection /><IndustriesSection /><VideoDemoSection /><AudioDemoSection /><BookingWorkflowSection /><TryCallSection /><ComparisonSection /><HowItWorksSection /><FinalCTA onRequestCall={requestCall} onChat={openChat} /><Footer onRequestCall={requestCall} /><SofiaChat />{modalOpen && <RequestCallModal onClose={() => setModalOpen(false)} />}</main>;
}
