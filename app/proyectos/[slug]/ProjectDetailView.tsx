"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export type ProjectDetailData = {
  title: string;
  type: string;
  color: string;
  summary: string;
  role: string;
  technologies: readonly string[];
  repo: string;
  image?: string;
  highlights: readonly string[];
};

export default function ProjectDetailView({ project }: { project: ProjectDetailData }) {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    setDarkMode(window.localStorage.getItem("portfolio-theme") !== "light");
  }, []);

  function toggleTheme() {
    setDarkMode((current) => {
      const next = !current;
      window.localStorage.setItem("portfolio-theme", next ? "dark" : "light");
      return next;
    });
  }

  return <main className={`project-detail-page ${darkMode ? "theme-dark" : ""}`}><header className="project-detail-header"><Link href="/#proyectos" className="detail-back">← Volver a proyectos</Link><span>CB<span className="detail-dot">.</span></span><button className="theme-toggle detail-theme-toggle" onClick={toggleTheme} aria-label="Cambiar tema">{darkMode ? "☼ Claro" : "☾ Oscuro"}</button></header><section className="project-detail-hero"><p className="eyebrow">PROYECTO / {project.type}</p><h1>{project.title}</h1><p className="project-detail-summary">{project.summary}</p><div className={`detail-art ${project.color}`}><div className="detail-art-window">{project.image ? <Image className="detail-screenshot" src={project.image} alt={`Captura de ${project.title}`} width={1098} height={593} sizes="(max-width: 680px) 100vw, 680px" /> : <><i /><i /><i /><strong>{project.title}</strong><small>Espacio reservado para una captura del proyecto</small></>}</div></div></section><section className="project-detail-content"><div><p className="eyebrow">SOBRE EL PROYECTO</p><h2>Construido para resolver<br /><em>un problema real.</em></h2></div><div className="detail-copy"><p>{project.role}</p>
  <p><strong>Convertly</strong> es una aplicación web para convertir imágenes entre diferentes formatos directamente desde el navegador, sin necesidad de instalar software adicional ni subir los archivos a un servidor. El procesamiento se realiza localmente mediante WebAssembly, utilizando un módulo desarrollado en Rust para realizar la conversión de las imágenes.<br />La interfaz fue desarrollada con SvelteKit y TypeScript, mientras que Rust + WebAssembly (WASM) se utilizan para el procesamiento de las imágenes. El proyecto se prepara para ser desplegado en Vercel, permitiendo que cualquier usuario pueda utilizar la aplicación desde un navegador moderno.</p><div className="detail-highlights">{project.highlights.map((highlight) => <div key={highlight}><span>✦</span>{highlight}</div>)}</div></div></section><section className="detail-tech-section"><p className="eyebrow">TECNOLOGÍAS UTILIZADAS</p><div className="detail-tech-list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div><div className="detail-actions"><a className="primary-button" href={project.repo} target="_blank" rel="noreferrer">Ver proyecto <span>↗</span></a><Link className="outline-button" href="/#proyectos">Ver otros proyectos</Link></div></section></main>;
}
