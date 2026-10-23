import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getProjectImageUrl } from "@/lib/project-utils";
import { cn } from "@/lib/utils";

export type Project = {
  id: string | number;
  title: string;
  description: string;
  devs: string[];
  tags: string[];
  embed_link?: string;
  image_url?: string;
  site_link?: string;
  is_featured?: boolean;
  published_date?: string;
};

export function ProjectCard({
  project,
  className,
  imageClassName,
  sizes = "(min-width: 768px) 50vw, 100vw",
}: {
  project: Project;
  className?: string;
  imageClassName?: string;
  sizes?: string;
}) {
  const href = project.site_link || project.embed_link;
  return (
    <article className={className}>
      <div className={cn("relative aspect-[16/10] overflow-hidden rounded-[24px] bg-pd-banner-mid", imageClassName)}>
        <Image
          src={getProjectImageUrl(project.embed_link, project.image_url)}
          alt=""
          fill
          sizes={sizes}
          className="object-cover"
        />
      </div>
      <div className="mt-5 flex items-start justify-between gap-6">
        <div className="min-w-0">
          <h3 className="text-2xl font-bold leading-tight text-pd-bone md:text-3xl">{project.title}</h3>
          <p className="mt-2 line-clamp-2 max-w-[60ch] text-base leading-snug text-pd-bone/65 md:text-lg">
            {project.description}
          </p>
          <p className="mt-3 text-sm text-[#d49cf0]">{project.devs.join(", ")}</p>
        </div>
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title}`}
            className="grid size-12 shrink-0 place-items-center rounded-full border border-white/25 text-pd-bone transition-colors duration-200 hover:border-pd-green hover:bg-pd-green hover:text-pd-black"
          >
            <ArrowUpRight className="size-5" />
          </a>
        )}
      </div>
    </article>
  );
}
