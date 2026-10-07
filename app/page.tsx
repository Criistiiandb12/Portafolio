"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";

type IconName = "home" | "user" | "folder" | "github" | "mail" | "download" | "arrow" | "external" | "menu" | "close" | "lock" | "code" | "sun" | "moon";

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    home: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9" /><path d="M9 20v-6h6v6" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c.8-3.3 3.5-5 8-5s7.2 1.7 8 5" /></>,
    folder: <><path d="M3 7.5h6l2 2h10v8.8a1.7 1.7 0 0 1-1.7 1.7H4.7A1.7 1.7 0 0 1 3 18.3Z" /><path d="M3 7.5V5.7A1.7 1.7 0 0 1 4.7 4h4l2 2h5" /></>,
    github: <><path d="M15 22v-3.4a3.2 3.2 0 0 0-.9-2.5c3 0 6.1-1.5 6.1-6.6a5.1 5.1 0 0 0-1.4-3.6A4.7 4.7 0 0 0 20.7 3S19.6 2.6 16.8 4a13.6 13.6 0 0 0-9.6 0C4.4 2.6 3.3 3 3.3 3a4.7 4.7 0 0 0-.1 2.9 5.1 5.1 0 0 0-1.4 3.6c0 5.1 3.1 6.6 6.1 6.6a3.2 3.2 0 0 0-.9 2.5V22" /><path d="M7 18c-3 .9-3-1.6-4.2-2" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    download: <><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M4 20h16" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    external: <><path d="M14 4h6v6" /><path d="m20 4-9 9" /><path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    lock: <><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    code: <><path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></>,
    moon: <><path d="M20.5 14.7A8.5 8.5 0 0 1 9.3 3.5 8.5 8.5 0 1 0 20.5 14.7Z" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

const projects = [
  { slug: "img-convert", title: "Convertly", type: "Web · Conversor de imágenes", desc: "Aplicación web para convertir imágenes entre distintos formatos de forma sencilla y rápida.", tags: ["Web", "Imágenes", "Vercel"], color: "lavender", repo: "https://img-convert-tau.vercel.app/", image: "/projects/conver-img.png" },
];

type GithubRepo = { name: string; html_url: string; description: string | null; language: string | null; stargazers_count: number; updated_at: string };
type GithubData = { profile: { public_repos: number; followers: number; html_url: string }; repos: GithubRepo[]; languages: { name: string; count: number }[] };

type Skill = { name: string; icon?: string; href: string };

// Reemplaza cada "#" por la URL real de la documentación o página oficial.
const skillUrls: Record<string, string> = {
  JavaScript: "https://developer.mozilla.org/es/docs/Web/JavaScript",
  CSS: "https://developer.mozilla.org/es/docs/Web/CSS",
  HTML: "https://developer.mozilla.org/es/docs/Web/HTML",
  React: "https://es.react.dev/",
  "Next.js": "https://nextjs.org/",
  TypeScript: "https://www.typescriptlang.org/",
  Bootstrap: "https://getbootstrap.com/",
  Tailwind: "https://tailwindcss.com/",
  Vue: "https://vuejs.org/",
  Vite: "https://vitejs.dev/",
  Node: "https://nodejs.org/",
  Express: "https://expressjs.com/",
  Python: "https://www.python.org/",
  Java: "https://www.java.com/",
  PHP: "https://www.php.net/",
  Go: "https://golang.org/",
  NestJS: "https://nestjs.com/",
  MySQL: "https://www.mysql.com/",
  MongoDB: "https://www.mongodb.com/",
  AWS: "#",
  Figma: "#",
  Vercel: "#",
  Git: "",
  Linux: "#",
  GitHub: "#",
  "VS Code": "#",
  JWT: "#",
  Postman: "#",
  Docker: "#",
  Gemini: "#",
  Copilot: "#",
  ChatGPT: "#",
  Codex: "#",
  Claude: "#",
  "Claude Code": "#",
  OpenCode: "#",
  Cursor: "#"
};

const skill = (name: string, icon?: string): Skill => ({ name, icon: icon ? `/skills/${icon}` : undefined, href: skillUrls[name] ?? "#" });

const skillGroups = [
  { title: "Fundamentales", skills: [skill("JavaScript", "javascript.png"), skill("CSS", "css.png"), skill("HTML", "html.png")] },
  { title: "Frontend", skills: [skill("React", "react.png"), skill("Next.js", "nextjs.png"), skill("TypeScript", "typescript.png"), skill("Bootstrap", "bootstrap.png"), skill("Tailwind", "tailwind.png"), skill("Vue", "vue.png"), skill("Vite", "vite.png")] },
  { title: "Backend", skills: [skill("Node", "nodejs.png"), skill("Express", "express.png"), skill("Python", "python.png"), skill("Java", "java.png"), skill("PHP", "php.png"), skill("Go", "go.png"), skill("NestJS", "nestJS.png")] },
  { title: "Databases", skills: [skill("MySQL", "mysql.png"), skill("MongoDB", "mongoDB.png"), skill("AWS", "aws.png")] },
  { title: "Herramientas", skills: [skill("Figma"), skill("Vercel"), skill("Git", "git.png"), skill("Linux", "Linux.png"), skill("GitHub", "GitHub.png"), skill("VS Code"), skill("JWT"), skill("Postman", "postman.png"), skill("Docker", "Docker.png")] },
  { title: "IA", skills: [skill("Gemini", "gemini.png"), skill("Copilot", "Copilot.webp"), skill("ChatGPT", "ChatGPT.png"), skill("Codex", "codex.png"), skill("Claude", "claude.png"), skill("Claude Code", "claude_code.webp"), skill("OpenCode"), skill("Cursor", "cursor.png")] },
  { title: "Habilidades blandas", skills: [skill("Atención al detalle"), skill("Dedicación"), skill("Trabajo en equipo"), skill("Pensamiento analítico")] },
];

const navItems: { label: string; id: string; icon: IconName }[] = [
  { label: "Inicio", id: "inicio", icon: "home" },
  { label: "Sobre mí", id: "sobre-mi", icon: "user" },
  { label: "Proyectos", id: "proyectos", icon: "folder" },
  { label: "GitHub", id: "github", icon: "github" },
  { label: "Contacto", id: "contacto", icon: "mail" },
];

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [cvOpen, setCvOpen] = useState(false);
  const [activeProject, setActiveProject] = useState("Todos");
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState("inicio");
  const [githubData, setGithubData] = useState<GithubData | null>(null);
  const [githubLoading, setGithubLoading] = useState(false);

  useEffect(() => {
    const savedSession = window.localStorage.getItem("portfolio-session");
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    setLoggedIn(savedSession === "active");
    setDarkMode(savedTheme !== "light");
    setSessionReady(true);
  }, []);

  useEffect(() => {
    if (!sessionReady || !loggedIn || window.location.hash !== "#proyectos") return;
    requestAnimationFrame(() => document.getElementById("proyectos")?.scrollIntoView({ behavior: "smooth" }));
  }, [sessionReady, loggedIn]);

  function toggleTheme() {
    setDarkMode((current) => {
      const next = !current;
      window.localStorage.setItem("portfolio-theme", next ? "dark" : "light");
      return next;
    });
  }

  useEffect(() => {
    const sections = navItems.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: "-25% 0px -55%", threshold: [0.05, 0.25, 0.6] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [loggedIn]);

  useEffect(() => {
    if (!loggedIn || githubData) return;
    setGithubLoading(true);
    fetch("/api/github")
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("GitHub API unavailable")))
      .then((data: GithubData) => setGithubData(data))
      .catch(() => setGithubData(null))
      .finally(() => setGithubLoading(false));
  }, [loggedIn, githubData]);

  function handleLogin(event: FormEvent<HTMLFormElement>) { event.preventDefault(); window.localStorage.setItem("portfolio-session", "active"); setLoggedIn(true); }

  if (!sessionReady) return null;
  if (!loggedIn) return <main className={`login-page ${darkMode ? "theme-dark" : ""}`}><button className="theme-toggle login-theme-toggle" onClick={toggleTheme} aria-label="Cambiar tema"> <Icon name={darkMode ? "sun" : "moon"} size={16} /> {darkMode ? "Claro" : "Oscuro"}</button><div className="login-decoration decoration-one" /><div className="login-decoration decoration-two" /><section className="login-card"><div className="login-mark">CB<span>.</span></div><p className="eyebrow">PORTAFOLIO PERSONAL</p><h1>Bienvenido a mi<br /><em>espacio digital.</em></h1><p className="login-copy">Un lugar para conocer mi recorrido, mis proyectos y las ideas que estoy construyendo.</p><form onSubmit={handleLogin} className="login-form"><label>Usuario<input required name="username" placeholder="Tu usuario" /></label><label>Contraseña<input required name="password" type="password" placeholder="Cualquier contraseña" /></label><button className="primary-button login-button" type="submit">Entrar al portafolio <Icon name="arrow" /></button></form><p className="demo-note"><Icon name="lock" size={14} /> Acceso demo · puedes usar cualquier usuario</p></section><p className="login-footer">Diseñado y desarrollado por <strong>Cristian Builes ★</strong></p></main>;

  const filters = ["Todos", "Java", "PHP", "Next.js"];
  const filteredProjects = activeProject === "Todos" ? projects : projects.filter((project) => project.tags.includes(activeProject));
  return <div className={`site-shell ${darkMode ? "theme-dark" : ""} ${sidebarOpen ? "sidebar-visible" : "sidebar-hidden"}`}>
    <header className="topbar"><button className="brand" onClick={() => document.getElementById("inicio")?.scrollIntoView({ behavior: "smooth" })} aria-label="Ir al inicio"><span>CB</span><i>.</i></button><div className="topbar-right"><span className="availability"><b /> Disponible para oportunidades</span><button className="theme-toggle" onClick={toggleTheme} aria-label="Cambiar tema"><Icon name={darkMode ? "sun" : "moon"} size={15} /> {darkMode ? "Claro" : "Oscuro"}</button><button className="logout-button" onClick={() => { window.localStorage.removeItem("portfolio-session"); setLoggedIn(false); }}>Salir</button></div></header>
    <aside className="sidebar"><div className="sidebar-inner"><div className="profile-mini"><div className="avatar"><Image src="/me/profile.png" alt="Cristian Builes" width={38} height={38} className="avatar-img" /></div><div><strong>Cristian Builes ★</strong><span>Desarrollador de software</span></div></div><p className="nav-label">NAVEGACIÓN</p><nav>{navItems.map((item) => <a className={activeSection === item.id ? "nav-active" : ""} href={`#${item.id}`} key={item.id}><Icon name={item.icon} /><span>{item.label}</span>{activeSection === item.id && <b className="active-dot" />}</a>)}</nav><div className="sidebar-bottom"><div className="side-line" /><p>Construyendo soluciones<br />con intención y código.</p><a className="side-github" href="https://github.com/Criistiiandb12" target="_blank" rel="noreferrer"><Icon name="github" size={16} /> @Criistiiandb12</a></div></div></aside>
    <main className="main-content"><button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Mostrar u ocultar menú"><Icon name={sidebarOpen ? "close" : "menu"} size={19} /></button>
      <section id="inicio" className="hero-section section-pad"><div className="hero-copy"><p className="eyebrow">HOLA, SOY CRISTIAN DANIEL BUILES VERONA<span className="wave">✦</span></p><h1>Mi talento y <em>Trabajo,</em> enfocados en <em>crecer.</em></h1><p className="hero-description">Soy un programador de software enfocado en construir productos digitales útiles, sencillos y bien pensados.</p><div className="hero-actions"><a href="#proyectos" className="primary-button">Ver mis proyectos <Icon name="arrow" /></a><a href="#sobre-mi" className="text-link">Conóceme mejor <Icon name="arrow" size={16} /></a></div></div><div className="hero-art"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="hero-card"><Image className="hero-profile-image" src="/me/profile.png" alt="Cristian Builes" width={142} height={142} quality={100} sizes="142px" /><strong>Transformar<br /><em>complejidad</em><br />en claridad.</strong><div className="card-code"><span>const</span> passion = <b>true</b>;</div></div><span className="float-dot dot-one" /><span className="float-dot dot-two" /><span className="float-plus">＋</span></div><div className="scroll-cue"><span /> Desplázate para explorar</div></section>
      <section id="sobre-mi" className="about-section section-pad section-divider"><div className="section-heading"><p className="eyebrow">01 / SOBRE MÍ</p><h2>Un poco sobre<br /><em>mi camino.</em></h2></div><div className="about-grid"><div className="about-intro"><p>Inicié mi vida universitaria en la <strong>Universidad de Córdoba</strong>, donde estudié entre 2019 y 2025. Me gradué gracias a un proyecto investigativo que analizaba el impacto de una herramienta de gestión de proyectos en los docentes, tomando como caso de estudio <strong>Trello</strong>. Este trabajo me permitió socializar mis hallazgos en un <strong>simposio internacional</strong>, lo que enriqueció mi experiencia académica y profesional.</p><br />
      <p>Antes de culminar mis estudios, tuve la necesidad de ingresar al mundo laboral. En mi primer empleo se me pidió aprovechar mis conocimientos en programación, adquiridos en la universidad, donde aprendí <strong>JavaScript, HTML, CSS, SQL, MongoDB y Vue.js</strong>. Allí inicié el desarrollo de un aplicativo de gestión empresarial, considerando las regulaciones comerciales de Colombia y el cálculo de impuestos nacionales, departamentales y municipales. Durante este proceso amplié mis habilidades con <strong>Express, React, Tailwind, JWT y NestJS.</strong><br />
      </p>
      <p>Motivado por seguir creciendo en el área, cursé un <strong>técnico en programación de software en el SENA</strong>, reforzando mis conocimientos en <strong>JavaScript, HTML, CSS y SQL.</strong><br></br><br></br> Gracias a esta formación realicé prácticas en <strong>EMTELCO,</strong> una empresa de <strong>Medellín</strong>, donde aprendí <strong>PHP y Bootstrap.</strong> Durante seis meses participé en la creación de alrededor de <strong>15 aplicaciones</strong> y en el <strong>soporte y actualización de unas 35 soluciones empresariales</strong>, lo que me permitió enfrentar retos reales, trabajar en equipo y fortalecer mi capacidad para resolver problemas desde una perspectiva empresarial. </p>
      <p>Actualmente sigo aprendiendo, estudiando virtualmente en la <strong>UIDIGITAL</strong> y además construyendo proyectos y buscando nuevos retos donde pueda aportar valor.</p> <button className="outline-button" onClick={() => setCvOpen(true)}>Ver mi CV <Icon name="download" size={16} /></button></div>
      <div className="timeline-card"><div className="timeline-block"><Image className="timeline-logo" src="/unicordoba.png" alt="Logo de la Universidad de Córdoba" width={56} height={56} /><div><span className="timeline-year">2019 — 2025</span><strong>Licenciatura en informática</strong><p>Universidad de Córdoba</p></div></div>
      <div className="timeline-block"><Image className="timeline-logo" src="/sena.png" alt="Logo del SENA" width={56} height={56} /><div><span className="timeline-year">2025 — 2026</span><strong>Técnico en programación de software</strong><p>SENA</p></div></div>
      <div className="timeline-block"><Image className="timeline-logo" src="/uidigital.png" alt="Logo de U Digital" width={56} height={56} /><div><span className="timeline-year">2026 — ACTUALMENTE</span><strong>Ingeniería de Software y Datos</strong><p>U Digital</p></div></div></div></div>
      <div className="skills-section"><div className="skills-intro"><p className="eyebrow">HABILIDADES</p><h3>Lo que sé hacer<br /><em>y sigo aprendiendo.</em></h3><p>Una selección de tecnologías y capacidades que uso para transformar ideas en soluciones.</p></div>


      <div className="skills-groups">{skillGroups.map((group) => <div className="skill-group" key={group.title}><h4>{group.title}</h4><div className="skill-chips">{group.skills.map((item) => <a className="skill-chip" href={item.href} key={item.name} aria-label={`Abrir documentación de ${item.name}`}><span>{item.icon ? <Image src={item.icon} alt="" width={18} height={18} /> : <span className="skill-placeholder" aria-hidden="true" />}</span>{item.name}</a>)}</div></div>)}</div></div></section>
      <section id="proyectos" className="projects-section section-pad section-divider"><div className="section-heading project-heading"><div>
        <p className="eyebrow">02 / PROYECTOS SELECCIONADOS</p><h2>Trabajo que habla<br /><em>por sí solo.</em></h2></div>
      <p className="section-side-copy">Una selección de proyectos personales y profesionales. Cada uno es una oportunidad para aprender algo nuevo.</p></div>
      <div className="filter-row">{filters.map((filter) => <button key={filter} className={activeProject === filter ? "filter-active" : ""} onClick={() => setActiveProject(filter)}>{filter}</button>)}</div>
      <div className="projects-grid">{filteredProjects.map((project, index) =>   <a className="project-card" href={`/proyectos/${project.slug}`} key={project.title}>
        <div className={`project-visual ${project.color}`}><span>{String(index + 1).padStart(2, "0")}</span>{project.image ? <Image className="project-preview-image" src={project.image} alt={`Captura de ${project.title}`} width={1098} height={593} sizes="(max-width: 680px) 100vw, 33vw" /> : <Icon name="code" size={46} />}</div >
        <div className="project-body"><div className="project-meta"><span>{project.type}</span><span className="project-card-arrow"><Icon name="arrow" size={16} /></span></div>
        <h3>{project.title}</h3><p>{project.desc}</p><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><span className="project-detail-link">Ver detalle <Icon name="arrow" size={15} /></span></div></a>)}</div></section>

      <section id="github" className="github-section section-pad section-divider"><div className="github-panel"><div className="github-icon"><Icon name="github" size={34} /></div><div><p className="eyebrow">03 / CÓDIGO ABIERTO</p><h2>Más código,<br /><em>más historias.</em></h2><p>Datos reales de mi perfil público: repositorios, lenguajes principales y proyectos actualizados recientemente.</p><a className="primary-button" href="https://github.com/Criistiiandb12" target="_blank" rel="noreferrer">Visitar mi GitHub <Icon name="external" size={16} /></a></div><div className="github-stats"><div><strong>{githubLoading ? "…" : githubData?.profile.public_repos ?? "—"}</strong><span>Repositorios</span></div><div><strong>{githubLoading ? "…" : githubData?.languages.length ?? "—"}</strong><span>Lenguajes</span></div><div><strong>{githubLoading ? "…" : githubData?.profile.followers ?? "—"}</strong><span>Seguidores</span></div></div><div className="github-live-data">{githubData?.languages.slice(0, 6).map((language) => <span key={language.name}>{language.name}</span>)}</div></div>{githubData?.repos.length ? <div className="github-repos"><div className="github-repos-heading"><p className="eyebrow">REPOSITORIOS RECIENTES</p><span>{githubData.repos.length} públicos consultados</span></div>{githubData.repos.slice(0, 6).map((repo) => <a className="github-repo" href={repo.html_url} target="_blank" rel="noreferrer" key={repo.name}><div><strong>{repo.name}</strong><p>{repo.description || "Sin descripción todavía."}</p></div><span>{repo.language || "Código"} <Icon name="external" size={14} /></span></a>)}</div> : null}</section>
      <section id="contacto" className="contact-section section-pad"><p className="eyebrow">04 / HABLEMOS</p><h2>¿Necesitas a alguien con <em>iniciativa</em> <br />en tu <em>equipo?</em></h2><a className="contact-email" href="mailto:cristiianbuiles@gmail.com">cristiianbuiles@gmail.com <Icon name="arrow" />   </a>  <a className="contact-phone">TEL: 3106921279 <Icon name="arrow" /></a><footer><span>© 2025 Cristian Builes ★</span><span>Hecho con intención y café.</span></footer></section>
    </main>
    {cvOpen && <div className="modal-backdrop" onClick={() => setCvOpen(false)}><div className="cv-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setCvOpen(false)} aria-label="Cerrar"><Icon name="close" /></button><p className="eyebrow">CURRÍCULUM VITAE</p><h2>Cristian <em>Builes ★</em></h2><p className="modal-role">Vista previa de mi hoja de vida</p><iframe className="cv-preview" src="/HDV_Cristian_Daniel_Builes_Verona.pdf" title="Hoja de vida de Cristian Builes" /><a className="primary-button" href="/HDV_Cristian_Daniel_Builes_Verona.pdf" download="HDV_Cristian_Daniel_Builes_Verona.pdf"><Icon name="download" size={16} /> Descargar CV</a></div></div>}
  </div>;
}
