import { ArrowUp } from "lucide-react";
import { portfolio } from "@/data/portfolio";

export function Footer() {
  return <footer className="site-footer container"><div className="footer-top"><a className="wordmark" href="#top" aria-label={`${portfolio.shortName}, back to top`}>{portfolio.brand}<span>®</span><i /></a><p>{portfolio.footer.note}</p><a className="back-top" href="#top">{portfolio.footer.top}<span><ArrowUp size={18} /></span></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {portfolio.shortName}. {portfolio.footer.rights}</span><span>{portfolio.footer.location} <span className="status-dot" /></span></div></footer>;
}
