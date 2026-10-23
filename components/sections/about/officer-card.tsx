import Image from "next/image";
import { Github, Mail } from "lucide-react";

type Officer = {
  name: string;
  title: string;
  image: string;
  socials: { github?: string; email?: string };
};

// Some entries omit the leading slash or repeat "mailto:"; normalize both here.
const imageSrc = (src: string) => (src.startsWith("/") || src.startsWith("http") ? src : `/${src}`);
const mailHref = (email: string) => `mailto:${email.replace(/^(mailto:)+/, "")}`;

export function OfficerCard({ officer }: { officer: Officer }) {
  return (
    <li>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-pd-banner-mid">
        <Image
          src={imageSrc(officer.image)}
          alt={officer.name}
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-lg font-bold leading-tight text-pd-bone md:text-xl">{officer.name}</p>
          <p className="mt-1 text-pd-bone/60">{officer.title}</p>
        </div>
        <div className="flex shrink-0 gap-1">
          {officer.socials.github && (
            <a
              href={officer.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${officer.name} on GitHub`}
              className="grid size-9 place-items-center rounded-full text-pd-bone/70 transition-colors hover:text-pd-green"
            >
              <Github className="size-5" />
            </a>
          )}
          {officer.socials.email && (
            <a
              href={mailHref(officer.socials.email)}
              aria-label={`Email ${officer.name}`}
              className="grid size-9 place-items-center rounded-full text-pd-bone/70 transition-colors hover:text-pd-green"
            >
              <Mail className="size-5" />
            </a>
          )}
        </div>
      </div>
    </li>
  );
}
