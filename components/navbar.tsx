"use client";

import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { portfolio } from "@/data/portfolio";

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState("");
  const menu = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    setMounted(true);
    let observer: IntersectionObserver;
    const observeSections = () => {
      observer?.disconnect();
      // IntersectionObserver percentages use viewport width, so use height-based pixels for the reading band.
      observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) setActive(`#${e.target.id}`); }), { rootMargin: `-${Math.round(window.innerHeight * 0.2)}px 0px -${Math.round(window.innerHeight * 0.6)}px 0px` });
      document.querySelectorAll("main section[id]").forEach(el => observer.observe(el));
    };
    observeSections();
    const onResize = () => { if (window.innerWidth >= 768) menu.current?.close(); observeSections(); };
    window.addEventListener("resize", onResize);
    return () => { observer.disconnect(); window.removeEventListener("resize", onResize); };
  }, []);
  return <header className="site-header">
    <nav className="nav-inner container" aria-label="Main navigation">
      <a className="wordmark" href="#top" aria-label={`${portfolio.shortName}, home`}>{portfolio.brand}<span>®</span><i /></a>
      <div className="desktop-nav">{portfolio.nav.map(link => <a key={link.href} className={`nav-link ${active === link.href ? "active" : ""}`} href={link.href}>{link.label}</a>)}</div>
      <div className="nav-actions">
        <button className="icon-button theme-button" aria-label={mounted && resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"} onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
          {mounted && resolvedTheme === "light" ? <Moon size={17} /> : <Sun size={18} />}
        </button>
        <a className="nav-contact" href="#contact">Let’s talk <ArrowUpRight size={15} /></a>
        <button className="icon-button mobile-toggle" aria-label="Open navigation menu" onClick={() => menu.current?.showModal()}><Menu size={22} /></button>
      </div>
    </nav>
    <dialog ref={menu} className="mobile-menu" aria-label="Navigation menu" onClick={e => { if (e.target === e.currentTarget) menu.current?.close(); }}>
      <div className="mobile-menu-content" data-lenis-prevent>
        <div className="mobile-menu-top"><span className="eyebrow">EXPLORE</span><button className="icon-button" aria-label="Close navigation menu" onClick={() => menu.current?.close()}><X /></button></div>
        {[...portfolio.nav, { label: "Contact", href: "#contact" }].map((link, i) => <a key={link.href} href={link.href} onClick={() => menu.current?.close()}><span>0{i + 1}</span>{link.label}<ArrowUpRight /></a>)}
        <p>{portfolio.location}</p>
      </div>
    </dialog>
  </header>;
}
