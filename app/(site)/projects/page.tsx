import { MonthlyShowcase } from "@/components/sections/home/monthly-showcase";
import { ProjectsGrid } from "@/components/sections/projects/projects-grid";
import type { Project } from "@/components/sections/projects/project-card";
import { getCurrentShowcase } from "@/lib/actions/projects/get-current-showcase";
import { getProjects } from "@/lib/actions/projects/get-projects";

export const metadata = {
  title: "Projects | Programmers' Den",
  description: "Apps, games and multimedia work built by Programmers' Den members.",
};

// Dedupe by id (keep the newest), then the first 3 featured, then the rest by date.
function orderProjects(projects: Project[]): Project[] {
  const unique = Object.values(
    projects.reduce<Record<string, Project>>((acc, p) => {
      const key = String(p.id || `${p.title}-${p.published_date}`);
      const existing = acc[key];
      if (!existing || new Date(p.published_date ?? 0) > new Date(existing.published_date ?? 0)) {
        acc[key] = p;
      }
      return acc;
    }, {})
  );
  const featured = unique.filter((p) => p.is_featured).slice(0, 3);
  const featuredIds = new Set(featured.map((p) => p.id));
  const rest = unique
    .filter((p) => !featuredIds.has(p.id))
    .sort((a, b) => new Date(b.published_date ?? 0).getTime() - new Date(a.published_date ?? 0).getTime());
  return [...featured, ...rest];
}

export default async function ProjectsPage() {
  const [showcase, projects] = await Promise.all([
    getCurrentShowcase().catch(() => null),
    getProjects().catch(() => null),
  ]);

  return (
    <div className="text-pd-bone">
      <header className="px-page pb-16 pt-36 md:pb-24 md:pt-48">
        <h1 className="text-display-xl">Projects</h1>
        <p className="mt-8 max-w-xl text-xl leading-snug text-pd-bone/70">
          Apps, games and multimedia work built by Den members, newest first.
        </p>
      </header>
      {showcase && <MonthlyShowcase project={showcase} />}
      <ProjectsGrid projects={orderProjects(projects ?? [])} />
    </div>
  );
}
