"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Component, useCallback, useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { portfolio } from "@/data/portfolio";

const Scene = dynamic(() => import("./scene"), { ssr: false, loading: () => null });

class SceneBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export function HeroObject() {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const motionAllowed = useRef(false);
  const markReady = useCallback(() => setReady(true), []);
  const restoreStatic = useCallback(() => setReady(false), []);
  const resetPointer = useCallback(() => {
    ref.current?.style.setProperty("--portrait-x", "0deg");
    ref.current?.style.setProperty("--portrait-y", "0deg");
  }, []);
  function followPointer(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !motionAllowed.current) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--portrait-x", `${(event.clientX - bounds.left - bounds.width / 2) / bounds.width * 2.8}deg`);
    event.currentTarget.style.setProperty("--portrait-y", `${-(event.clientY - bounds.top - bounds.height / 2) / bounds.height * 2}deg`);
  }
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let timer: ReturnType<typeof setTimeout>;
    let inView = true;
    const update = () => {
      clearTimeout(timer);
      motionAllowed.current = media.matches;
      resetPointer();
      if (media.matches) timer = setTimeout(() => setEnabled(true), 1800);
      else { setEnabled(false); setReady(false); }
    };
    const updateVisibility = () => setVisible(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; updateVisibility(); }, { rootMargin: "100px" });
    if (ref.current) observer.observe(ref.current);
    update();
    media.addEventListener("change", update);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => { clearTimeout(timer); observer.disconnect(); media.removeEventListener("change", update); document.removeEventListener("visibilitychange", updateVisibility); };
  }, [resetPointer]);
  const visual = portfolio.hero.visual;
  return <div ref={ref} className="editorial-stage" data-active={visible} onPointerMove={followPointer} onPointerLeave={resetPointer}>
    <div className="editorial-assembly">
      <div className="editorial-orbit" aria-hidden="true">
        <svg className="editorial-static-orbit" style={{ opacity: ready ? 0 : 0.35 }} viewBox="0 0 560 600" fill="none"><ellipse cx="294" cy="292" rx="226" ry="178" transform="rotate(-25 294 292)" stroke="currentColor" strokeWidth="1.5" /></svg>
        {enabled && <SceneBoundary onFailure={restoreStatic}><div className="editorial-canvas"><Scene active={visible} onReady={markReady} onUnavailable={restoreStatic} /></div></SceneBoundary>}
      </div>
      <div className="editorial-baseline" aria-hidden="true" />
      <div className="editorial-portrait"><Image src={visual.image} alt={visual.imageAlt} fill sizes="(max-width: 575px) 320px, (max-width: 767px) 340px, (max-width: 1023px) 300px, (max-width: 1440px) 34vw, 462px" preload unoptimized /></div>
      <figure className="editorial-desk">
        <div className="editorial-desk-photo"><Image src={visual.deskImage} alt={visual.deskImageAlt} fill sizes="180px" /></div>
        <figcaption>{visual.deskCaption}</figcaption>
      </figure>
    </div>
  </div>;
}
