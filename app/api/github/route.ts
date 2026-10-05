import { NextResponse } from "next/server";

const username = "Criistiiandb12";

export async function GET() {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
      headers: { Accept: "application/vnd.github+json", "User-Agent": "cristian-portfolio" },
      next: { revalidate: 3600 },
    });

    if (!response.ok) return NextResponse.json({ error: "No fue posible consultar GitHub." }, { status: response.status });

    const repositories = await response.json();
    const repos = repositories.filter((repo: { fork: boolean }) => !repo.fork).map((repo: { name: string; html_url: string; description: string | null; language: string | null; stargazers_count: number; updated_at: string }) => ({
      name: repo.name,
      html_url: repo.html_url,
      description: repo.description,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      updated_at: repo.updated_at,
    }));
    const languageCounts = repos.reduce((counts: Record<string, number>, repo: { language: string | null }) => {
      if (repo.language) counts[repo.language] = (counts[repo.language] || 0) + 1;
      return counts;
    }, {});
    const languages = (Object.entries(languageCounts) as [string, number][]).sort(([, a], [, b]) => b - a).map(([name, count]) => ({ name, count }));
    const userResponse = await fetch(`https://api.github.com/users/${username}`, { headers: { Accept: "application/vnd.github+json", "User-Agent": "cristian-portfolio" }, next: { revalidate: 3600 } });
    const profile = await userResponse.json();

    return NextResponse.json({ profile: { public_repos: profile.public_repos, followers: profile.followers, html_url: profile.html_url }, repos, languages });
  } catch {
    return NextResponse.json({ error: "GitHub no está disponible en este momento." }, { status: 500 });
  }
}
