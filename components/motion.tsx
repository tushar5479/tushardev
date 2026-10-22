"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useRef, useState, type AnchorHTMLAttributes } from "react";

export function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.08 });
  const [armed, setArmed] = useState(false);
  useEffect(() => { if (ref.current && ref.current.getBoundingClientRect().top > window.innerHeight && !reduced) setArmed(true); }, [reduced]);
  return <motion.div ref={ref} className={className} initial={false}
    animate={armed && !visible && !reduced ? { opacity: 0, y: 24 } : { opacity: 1, y: 0 }}
    transition={{ duration: reduced ? 0 : 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
    <div className={reduced ? "" : "reveal-content"}>{children}</div>
  </motion.div>;
}

export function MagneticLink({ children, className = "", ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 20 });
  const sy = useSpring(y, { stiffness: 220, damping: 20 });
  const reduced = useReducedMotion();
  return <motion.span className="magnetic" style={{ x: sx, y: sy }} onPointerMove={event => {
    if (reduced || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.16);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.2);
  }} onPointerLeave={() => { x.set(0); y.set(0); }}>
    <a className={className} {...props}>{children}</a>
  </motion.span>;
}

export function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    if (!visible || reduced) return;
    const controls = animate(0, value, { duration: 1.2, ease: "easeOut", onUpdate: n => setDisplay(Math.round(n)) });
    return controls.stop;
  }, [visible, reduced, value]);
  return <span ref={ref}><span className="sr-only">{value}{suffix}</span><span aria-hidden="true">{display}{suffix}</span></span>;
}

export function ClientEnhancements() {
  const progress = useMotionValue(0);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 32, stiffness: 450, mass: 0.5 });
  const sy = useSpring(y, { damping: 32, stiffness: 450, mass: 0.5 });
  const [hovered, setHovered] = useState(false);
  const [project, setProject] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      progress.set(height > 0 ? window.scrollY / height : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const onPointer = (event: PointerEvent) => {
      x.set(event.clientX); y.set(event.clientY);
      const target = event.target instanceof Element ? event.target : null;
      setHovered(!!target?.closest("a,button"));
      setProject(!!target?.closest(".project-visual"));
    };
    if (!reduced) window.addEventListener("pointermove", onPointer, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); window.removeEventListener("pointermove", onPointer); };
  }, [progress, x, y, reduced]);
  return <>
    <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />
    {!reduced && <motion.div aria-hidden="true" className={`cursor-ring ${hovered ? "is-hovered" : ""} ${project ? "is-project" : ""}`} style={{ x: sx, y: sy }}>{project ? "VIEW ↗" : ""}</motion.div>}
  </>;
}
