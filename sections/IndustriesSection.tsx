"use client";
import { useState } from "react";
import { industries, type IndustryName } from "../data/industries";
export default function IndustriesSection() {
  const [active, setActive] = useState<IndustryName>("Dental");
  const industry = industries[active];
  return <section className="industries sd-section" id="industries"><div className="tab-row">{Object.keys(industries).map(name => <button className={active === name ? "active" : ""} key={name} onClick={() => setActive(name as IndustryName)}>{name}</button>)}</div><div className="industry-panel" key={active}><div><p className="mono coral">{industry.tag}</p><h2>{industry.title}</h2><p className="body-copy">{industry.copy}</p>{active === "Dental" ? <a href="#dd-timeline" className="under-link">See a full example call <b>↓</b></a> : <a href={`/${active.toLowerCase()}`} className="under-link">Explore {active.toLowerCase()} <b>↗</b></a>}</div><div className="exchange"><p><b>CALLER</b>{industry.exchange[0]}</p><p className="sofia"><b>SOFIA</b>{industry.exchange[1]}</p></div><div className="mini-log"><header><i /> LIVE ACTIVITY</header>{industry.log.map((item, index) => <p key={item}><span>{item.slice(0, 5)}</span>{item.slice(6)}<b>{index === 0 ? "●" : "↗"}</b></p>)}</div></div></section>;
}
