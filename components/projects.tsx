"use client";

import Image from "next/image";
import { ArrowUpRight, Check, ChevronDown, Code2, ExternalLink, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { portfolio, type Project } from "@/data/portfolio";
import { Reveal } from "./motion";

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  const reduced = useReducedMotion();
  function tilt(event: PointerEvent<HTMLButtonElement>) {
    if (reduced || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--tilt-x", `${-(event.clientY - rect.top - rect.height / 2) / rect.height * 5}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${(event.clientX - rect.left - rect.width / 2) / rect.width * 5}deg`);
  }
  return <article className="project-card">
    <button className="project-visual" onClick={() => onOpen(project)} onPointerMove={tilt} onPointerLeave={e => { e.currentTarget.style.setProperty("--tilt-x", "0deg"); e.currentTarget.style.setProperty("--tilt-y", "0deg"); }} style={{ "--project-color": project.color, "--project-ink": project.imageInk ?? "#34412e" } as CSSProperties} aria-label={`${portfolio.work.detailLabel}: ${project.title}, ${project.number} / PROJECT`}>
      <Image src={project.image} alt={project.imageAlt} width={1200} height={820} sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1440px) 46vw, 600px" unoptimized={project.imageUnoptimized} style={{ objectFit: project.imageFit ?? "cover" }} />
      <span className="project-view"><ArrowUpRight size={22} /></span><span className="project-number">{project.number} / PROJECT</span>
    </button>
    <div className="project-meta"><div><span className="project-kind">{project.kind}</span><h3><button onClick={() => onOpen(project)}>{project.title}</button></h3><p>{project.summary}</p></div><span className="project-index">/{project.number}</span></div>
    <div className="tag-row">{project.tech.map(tech => <span className="tag" key={tech}>{tech}</span>)}{project.github && <a className="project-source-link text-link" href={project.github} target="_blank" rel="noopener noreferrer">{portfolio.work.githubLabel}<ArrowUpRight size={16} /></a>}</div>
  </article>;
}

export function Projects() {
  const [filter, setFilter] = useState("All work");
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const reduced = useReducedMotion();
  const filtered = portfolio.projects.filter(project => filter === "All work" || project.category === filter);
  const initialProjects = filtered.slice(0, portfolio.work.visibleCount);
  const moreProjects = filtered.slice(portfolio.work.visibleCount);
  useEffect(() => {
    if (selected) dialog.current?.showModal();
    else dialog.current?.close();
  }, [selected]);
  return <section id="work" className="section container" aria-labelledby="work-heading">
    <Reveal><div className="section-heading"><div><p className="eyebrow">{portfolio.work.eyebrow}</p><h2 id="work-heading">{portfolio.work.heading}</h2></div><p className="section-description">{portfolio.work.subheading}</p></div></Reveal>
    <div className="work-toolbar"><div className="filter-list" aria-label="Filter projects">{portfolio.work.filters.map(item => <button key={item} className={`filter-button ${filter === item ? "selected" : ""}`} aria-pressed={filter === item} onClick={() => { setFilter(item); setExpanded(false); }}>{item}<span>{(item === "All work" ? portfolio.projects : portfolio.projects.filter(p => p.category === item)).length.toString().padStart(2, "0")}</span></button>)}</div><span className="work-hint">A SELECTION, NOT THE WHOLE STORY <ArrowDownRightSmall /></span></div>
    <motion.div layout={!reduced} className="projects-grid">
      <AnimatePresence mode="popLayout" initial={false}>{initialProjects.map(project => <motion.div layout={!reduced} key={project.id} initial={{ opacity: 0, y: reduced ? 0 : 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.3 }}><ProjectCard project={project} onOpen={setSelected} /></motion.div>)}</AnimatePresence>
    </motion.div>
    {moreProjects.length > 0 && <>
      <div className="work-more">
        <p className="work-more-status" role="status">{String(expanded ? filtered.length : initialProjects.length).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")} {portfolio.work.projectsShownLabel}</p>
        <button type="button" className="work-more-button" aria-expanded={expanded} aria-controls="more-projects" onClick={() => setExpanded(value => !value)}>
          <span>{expanded ? portfolio.work.seeLessLabel : portfolio.work.seeMoreLabel}</span>
          <span className="work-more-count" aria-hidden="true">{expanded ? "−" : "+"}{String(moreProjects.length).padStart(2, "0")}</span>
          <span className="work-more-icon" aria-hidden="true"><ChevronDown size={18} /></span>
        </button>
      </div>
      <motion.div id="more-projects" role="region" aria-label={portfolio.work.moreRegionLabel} aria-hidden={!expanded} inert={!expanded} initial={false} animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }} className="projects-more-region">
        <div className="projects-grid projects-more-grid">{moreProjects.map(project => <div key={project.id}><ProjectCard project={project} onOpen={setSelected} /></div>)}</div>
      </motion.div>
    </>}
    <p className="project-disclosure">{portfolio.work.note}</p>
    <dialog ref={dialog} className="project-dialog" aria-labelledby="project-dialog-title" onClose={() => setSelected(null)} onClick={e => { if (e.target === e.currentTarget) dialog.current?.close(); }}>
      {selected && <div className="project-dialog-inner" data-lenis-prevent>
        <button className="dialog-close icon-button" aria-label="Close project details" onClick={() => dialog.current?.close()} autoFocus><X size={22} /></button>
        <Image src={selected.image} alt={selected.imageAlt} width={1200} height={820} sizes="(max-width: 767px) 100vw, 800px" unoptimized={selected.imageUnoptimized} className="dialog-image" style={{ objectFit: selected.imageFit ?? "cover", backgroundColor: selected.color }} />
        <div className="dialog-copy"><p className="eyebrow">{selected.kind}</p><h2 id="project-dialog-title">{selected.title}</h2>{selected.stage && <span className="project-stage tag">{selected.stage}</span>}<p>{selected.description}</p><h3>{portfolio.work.contributionLabel}</h3><p>{selected.contribution}</p><ul className="feature-list">{selected.features.map(feature => <li key={feature}><Check size={16} />{feature}</li>)}</ul><div className="tag-row">{selected.tech.map(tech => <span className="tag" key={tech}>{tech}</span>)}</div><p className="dialog-art-note">{selected.imageNote ?? portfolio.work.artNote}</p><div className="dialog-actions">{selected.live ? <a href={selected.live} target="_blank" rel="noopener noreferrer" className="button button-primary">{portfolio.work.liveLabel}<ExternalLink size={16} /></a> : selected.github ? <a href={selected.github} target="_blank" rel="noopener noreferrer" className="button button-primary">{portfolio.work.githubLabel}<Code2 size={17} /></a> : <a href={`mailto:${portfolio.email}?subject=${encodeURIComponent(selected.title)}`} className="button button-primary">{portfolio.work.inquiryLabel}<ArrowUpRight size={17} /></a>}{selected.live && selected.github && <a href={selected.github} target="_blank" rel="noopener noreferrer" className="button button-secondary">{portfolio.work.githubLabel}<Code2 size={17} /></a>}</div></div>
      </div>}
    </dialog>
  </section>;
}

function ArrowDownRightSmall() { return <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="m4 4 8 8M4 12h8V4" stroke="currentColor" /></svg>; }
