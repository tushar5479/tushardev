import { ImageResponse } from "next/og";
import { portfolio } from "@/data/portfolio";
export const alt = `${portfolio.shortName} — Senior Web Developer & Team Lead`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", background: "#11130f", color: "#f2f1eb", padding: "65px 75px", display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "sans-serif" }}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 25 }}><span style={{ fontWeight: 700 }}>{portfolio.brand}®</span><span style={{ color: "#c2f970", fontSize: 19 }}>{portfolio.role}</span></div><div style={{ display: "flex", flexDirection: "column", fontSize: 115, letterSpacing: "-6px", lineHeight: 1.03 }}><span>{portfolio.hero.line1}</span><span style={{ color: "#c2f970", fontStyle: "italic" }}>{portfolio.hero.line2}</span></div><div style={{ display: "flex", justifyContent: "space-between", color: "#a5aa9e", fontSize: 19 }}><span>{portfolio.hero.status}</span><span>{portfolio.location} ↗</span></div></div>, size);
}
