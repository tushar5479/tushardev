"use client";

import { ThemeProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import { useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dispose: (() => void) | undefined;
    let cancelled = false;
    async function setup() {
      dispose?.();
      dispose = undefined;
      if (media.matches || !window.matchMedia("(pointer: fine)").matches) return;
      const { default: Lenis } = await import("lenis");
      if (cancelled || media.matches) return;
      const lenis = new Lenis({ autoRaf: true, duration: 1.05, anchors: { offset: -96 } });
      dispose = () => lenis.destroy();
    }
    void setup();
    media.addEventListener("change", setup);
    return () => { cancelled = true; dispose?.(); media.removeEventListener("change", setup); };
  }, []);
  return <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
  </ThemeProvider>;
}
