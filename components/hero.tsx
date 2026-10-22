"use client";

import { ArrowDown, ArrowDownRight, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { portfolio } from "@/data/portfolio";
import { MagneticLink } from "./motion";
import { HeroObject } from "./hero-object";

export function Hero() {
  const reduced = useReducedMotion();
  return <section id="top" className="hero editorial-hero container" aria-labelledby="hero-heading">
    <div className="hero-topline"><span className="eyebrow"><span className="status-dot" /> {portfolio.role}</span><span className="hero-location">{portfolio.location}</span></div>
    <div className="hero-layout">
      <div className="hero-copy">
        <p className="hero-kicker">{portfolio.hero.eyebrow}</p>
        <h1 id="hero-heading" aria-label={portfolio.shortName}>
          {[portfolio.hero.line1, portfolio.hero.line2].map((line, i) => <span className="hero-line" key={line}><motion.span aria-hidden="true" className={i === 1 ? "serif accent" : ""} initial={reduced ? false : { y: "105%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: reduced ? 0 : 0.9, delay: 0.08 + i * 0.11, ease: [0.22, 1, 0.36, 1] }}>{line}</motion.span></span>)}
        </h1>
        <motion.p className="hero-description" initial={false} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>{portfolio.hero.intro}</motion.p>
        <div className="hero-ctas"><MagneticLink href="#work" className="button button-primary">{portfolio.hero.primaryCta}<ArrowDownRight size={19} /></MagneticLink><a className="text-link" href="#about">{portfolio.hero.secondaryCta}<ArrowUpRight size={16} /></a></div>
      </div>
      <div className="hero-art"><HeroObject /></div>
    </div>
    <div className="hero-bottom"><a href="#work" className="scroll-hint"><span className="scroll-icon"><ArrowDown size={15} /></span>{portfolio.hero.scroll}</a><span className="hero-status">{portfolio.hero.status}</span></div>
  </section>;
}
