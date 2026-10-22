import Image from "next/image";
import { ArrowDownToLine, ArrowUpRight, Asterisk, Code2, Globe2, GraduationCap, ShieldCheck, Workflow, ScanLine } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { CountUp, MagneticLink, Reveal } from "./motion";
import { TechTicker } from "./tech-ticker";

export function About() {
  return <section id="about" className="about-section section" aria-labelledby="about-heading"><div className="container">
    <Reveal><p className="eyebrow">{portfolio.about.eyebrow}</p><h2 id="about-heading" className="about-heading">{portfolio.about.heading}<br /><span className="serif muted">{portfolio.about.headingAccent}</span></h2></Reveal>
    <div className="about-grid">
      <Reveal className="bento-card bio-card"><span className="card-number">A LITTLE CONTEXT</span><p className="bio-large">{portfolio.about.bio}</p><p className="bio-small">{portfolio.about.secondaryBio}</p><MagneticLink href={portfolio.resume} className="text-link" download>{portfolio.about.resumeLabel}<ArrowDownToLine size={17} /></MagneticLink></Reveal>
      <Reveal className="bento-card portrait-card" delay={0.08}><Image src={portfolio.portrait} alt="Tanvir Rahman Tushar" width={640} height={640} sizes="(max-width: 767px) 100vw, 33vw" /><div className="portrait-overlay"><span>{portfolio.about.portraitCaption}</span><Asterisk size={29} /></div></Reveal>
      <Reveal className="bento-card current-card" delay={0.05}><div className="card-top"><span className="card-number">{portfolio.about.currentLabel}</span><Globe2 size={22} /></div><span className="small-status"><span className="status-dot" />{portfolio.location}</span><h3>{portfolio.about.currentTitle}</h3><p>{portfolio.about.currentDescription}</p><a href="#experience" className="card-arrow" aria-label="Explore my experience"><ArrowUpRight size={22} /></a></Reveal>
      <Reveal className="bento-card approach-card" delay={0.1}><span className="card-number">{portfolio.about.approachLabel}</span><div className="approach-list">{portfolio.about.approach.map((line, i) => <p key={line}><span>0{i + 1}</span>{line}</p>)}</div></Reveal>
    </div>
    <Reveal className="workspace-reveal">
      <article id="education" className="workspace-feature" aria-labelledby="education-heading">
        <div className="workspace-photo"><Image src={portfolio.about.workspace.image} alt={portfolio.about.workspace.imageAlt} fill sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) calc(100vw - 64px), (max-width: 1440px) 50vw, 700px" /></div>
        <div className="education-caption">
          <div className="education-eyebrow"><GraduationCap size={20} aria-hidden="true" /><span className="card-number">{portfolio.about.education.eyebrow}</span></div>
          <p className="education-qualification">{portfolio.about.education.qualification}</p>
          <h3 id="education-heading">{portfolio.about.education.degree}</h3>
          <a className="education-university" href={portfolio.about.education.universityUrl}><span>{portfolio.about.education.university}</span><ArrowUpRight size={16} aria-hidden="true" /></a>
          <dl className="education-major"><dt className="card-number">{portfolio.about.education.majorLabel}</dt><dd>{portfolio.about.education.major}</dd></dl>
          <div className="education-expertise"><ShieldCheck size={23} aria-hidden="true" /><div><span className="card-number">{portfolio.about.education.expertiseLabel}</span><p>{portfolio.about.education.expertise}</p></div></div>
        </div>
      </article>
    </Reveal>
    <div className="stats-row">{portfolio.about.stats.map(stat => <div className="stat" key={stat.label}><strong><CountUp value={stat.value} suffix={stat.suffix} /></strong><span>{stat.label}{"detail" in stat && <small>{stat.detail}</small>}</span></div>)}</div>
  </div></section>;
}

const stackIcons = [Code2, Workflow, ScanLine];

export function Skills() {
  return <section className="skills-section section" aria-labelledby="skills-heading">
    <div className="container"><Reveal><div className="section-heading"><div><p className="eyebrow">{portfolio.skills.eyebrow}</p><h2 id="skills-heading">{portfolio.skills.heading}</h2></div><p className="section-description">{portfolio.skills.description}</p></div></Reveal>
      <div className="skill-groups">{portfolio.skills.groups.map((group, i) => { const Icon = stackIcons[i]; return <Reveal className="skill-group" key={group.name} delay={i * 0.07}><div className="skill-title"><span className="skill-icon"><Icon size={23} /></span><span className="card-number">0{i + 1}</span></div><h3>{group.name}<span>{group.detail}</span></h3><div className="tag-row">{group.items.map(item => <span key={item} className="tag">{item}</span>)}</div></Reveal>; })}</div>
    </div>
    <TechTicker />
  </section>;
}
