import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectDetailView, { type ProjectDetailData } from "./ProjectDetailView";

const projectDetails: Record<string, ProjectDetailData> = {
  "img-convert": {
    title: "Convertly", type: "Web · Conversor de imágenes", color: "lavender", summary: "Una aplicación web para convertir formatos de imágenes de manera sencilla, rápida y accesible desde el navegador.",
    role: "Construcción de la experiencia web, flujo de conversión y publicación del proyecto.", technologies: ["SvelteKit", "TypeScript", "Vercel", "Rust", "WebAssembly (WASM)", "Vite", "GitHub"], repo: "https://img-convert-tau.vercel.app/", image: "/projects/conver-img.png",
    highlights: ["Conversión de imágenes desde el navegador", "Interfaz simple y directa", "Aplicación desplegada en Vercel"],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectDetails[slug as keyof typeof projectDetails];
  return { title: project ? `${project.title} — Cristian Builes` : "Proyecto — Cristian Builes" };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectDetails[slug as keyof typeof projectDetails];
  if (!project) notFound();

  return <ProjectDetailView project={project} />;
}
