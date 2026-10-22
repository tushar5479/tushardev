import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { Reveal } from "./motion";

export function Experience() {
  return <section id="experience" className="experience-section section container" aria-labelledby="experience-heading"><div className="experience-layout">
    <Reveal className="experience-intro"><p className="eyebrow">{portfolio.experience.eyebrow}</p><h2 id="experience-heading">{portfolio.experience.heading}<br /><span className="serif muted">{portfolio.experience.headingAccent}</span></h2><p>{portfolio.experience.description}</p><a className="text-link" href={portfolio.resume} download>{portfolio.about.resumeLabel}<ArrowDownToLine size={17} /></a><div className="journey-art" aria-hidden="true"><span /><span /><span /><ArrowUpRight size={45} /></div></Reveal>
    <div className="timeline">{portfolio.experience.entries.map((entry, i) => <Reveal className="timeline-entry" key={entry.company} delay={i * 0.05}><div className="timeline-dot" /><div className="timeline-top"><span className="card-number">{entry.date}</span><span className="timeline-type">{entry.type}</span></div><h3>{entry.role}</h3><p className="timeline-company">{entry.company}</p><p className="timeline-description">{entry.description}</p><div className="tag-row">{entry.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div></Reveal>)}</div>
  </div></section>;
}
