import Link from "next/link";
import { notFound } from "next/navigation";

const projectDetails = {
  "nomina-rrhh": {
    title: "Nómina & RRHH", type: "Java · Spring Boot", color: "lavender", summary: "Una API pensada para organizar empleados, contratos y procesos de nómina con una arquitectura clara y fácil de mantener.",
    role: "Diseño de API, modelado de datos y desarrollo de servicios.", technologies: ["Java", "Spring Boot", "PostgreSQL", "JWT"], repo: "#",
    highlights: ["Gestión de empleados y contratos", "Procesos de nómina", "API organizada por responsabilidades"],
  },
  "panel-cobranzas": {
    title: "Panel de cobranzas", type: "PHP · Laravel", color: "mint", summary: "Herramienta administrativa para consultar estados, asignar gestiones y generar reportes de seguimiento.",
    role: "Desarrollo de módulos, vistas administrativas e integración con base de datos.", technologies: ["PHP", "Laravel", "MySQL", "Bootstrap"], repo: "#",
    highlights: ["Seguimiento de gestiones", "Asignación de responsables", "Reportes para toma de decisiones"],
  },
  "portafolio-personal": {
    title: "Portafolio personal", type: "Next.js · TypeScript", color: "peach", summary: "Una experiencia digital para presentar mi recorrido, mis proyectos y las herramientas que uso para construir.",
    role: "Diseño de interfaz, arquitectura frontend y despliegue.", technologies: ["Next.js", "TypeScript", "React", "Vercel"], repo: "#",
    highlights: ["Tema claro y oscuro", "Navegación responsive", "Integración con GitHub"],
  },
  "img-convert": {
    title: "Img Convert", type: "Web · Conversor de imágenes", color: "lavender", summary: "Una aplicación web para convertir formatos de imágenes de manera sencilla, rápida y accesible desde el navegador.",
    role: "Construcción de la experiencia web, flujo de conversión y publicación del proyecto.", technologies: ["Web", "Conversión de imágenes", "Vercel"], repo: "https://img-convert-tau.vercel.app/",
    highlights: ["Conversión de imágenes desde el navegador", "Interfaz simple y directa", "Aplicación desplegada en Vercel"],
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectDetails[slug as keyof typeof projectDetails];
  return { title: project ? `${project.title} — Cristian Builes` : "Proyecto — Cristian Builes" };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectDetails[slug as keyof typeof projectDetails];
  if (!project) notFound();

  return <main className="project-detail-page"><header className="project-detail-header"><Link href="/#proyectos" className="detail-back">← Volver a proyectos</Link><span>CB<span className="detail-dot">.</span></span></header><section className="project-detail-hero"><p className="eyebrow">PROYECTO / {project.type}</p><h1>{project.title}</h1><p className="project-detail-summary">{project.summary}</p><div className={`detail-art ${project.color}`}><span>CAPTURA PRINCIPAL</span><div className="detail-art-window"><i /><i /><i /><strong>{project.title}</strong><small>Espacio reservado para una captura del proyecto</small></div></div></section><section className="project-detail-content"><div><p className="eyebrow">SOBRE EL PROYECTO</p><h2>Construido para resolver<br /><em>un problema real.</em></h2></div><div className="detail-copy"><p>{project.role}</p><p>En esta sección puedes explicar el contexto, las decisiones técnicas y el resultado obtenido. El contenido está preparado para que agregues información específica de tu proyecto.</p><div className="detail-highlights">{project.highlights.map((highlight) => <div key={highlight}><span>✦</span>{highlight}</div>)}</div></div></section><section className="detail-tech-section"><p className="eyebrow">TECNOLOGÍAS UTILIZADAS</p><div className="detail-tech-list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div><div className="detail-actions"><a className="primary-button" href={project.repo} target="_blank" rel="noreferrer">Ver proyecto <span>↗</span></a><Link className="outline-button" href="/#proyectos">Ver otros proyectos</Link></div></section></main>;
}
