"use client";

import { Pause, Play } from "lucide-react";
import { useState } from "react";
import { portfolio } from "@/data/portfolio";

export function TechTicker() {
  const [paused, setPaused] = useState(false);
  return <div className={`ticker ${paused ? "is-paused" : ""}`}>
    <div className="sr-only">Tech stack: {portfolio.skills.items.join(", ")}</div>
    <div className="ticker-track" aria-hidden="true">{[0, 1].map(copy => <div className="ticker-copy" key={copy}>{portfolio.skills.items.map((item, i) => <span key={item}><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d={i % 3 === 0 ? "m8 5-6 7 6 7m8-14 6 7-6 7m-3-16-2 18" : i % 3 === 1 ? "M12 2 22 8v8l-10 6-10-6V8L12 2Zm0 0v20M2 8l10 6 10-6" : "M4 4h16v16H4zM8 8h8v8H8z"} stroke="currentColor" strokeWidth="1.4" /></svg>{item}<span className="ticker-star">✳</span></span>)}</div>)}</div>
    <button className="ticker-control icon-button" onClick={() => setPaused(value => !value)} aria-label={paused ? portfolio.skills.resumeLabel : portfolio.skills.pauseLabel} aria-pressed={paused}>{paused ? <Play size={14} /> : <Pause size={14} />}</button>
  </div>;
}
