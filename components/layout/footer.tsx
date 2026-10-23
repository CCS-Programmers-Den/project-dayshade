import Image from "next/image";
import Link from "next/link";

const COLUMNS = [
  {
    label: "Browse",
    links: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Events", href: "/events" },
      { name: "Projects", href: "/projects" },
      { name: "Shop", href: "/shop" },
    ],
  },
  {
    label: "Apply",
    links: [
      { name: "Perks", href: "/perks" },
      { name: "Register", href: "/join" },
    ],
  },
  {
    label: "Contact",
    links: [
      { name: "Facebook", href: "https://www.facebook.com/ccsprogrammersden" },
      { name: "YouTube", href: "https://www.youtube.com/@ccsprogrammersden3712" },
      { name: "Discord", href: "https://discord.gg/bTXvdggz4g" },
      { name: "Email", href: "mailto:progdenofficial@gmail.com" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-pd-black text-pd-bone">
      <div className="grid gap-12 px-page pb-10 pt-16 md:grid-cols-12 md:pt-24">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2">
            <Image src="/assets/pd-logo-sm.png" alt="" width={40} height={40} className="size-10" />
            <Image
              src="/assets/pd-banner.png"
              alt="Programmers' Den"
              width={200}
              height={30}
              className="h-auto w-48"
            />
          </div>
          <p className="mt-6 max-w-sm text-lg leading-snug text-pd-bone/65">
            The computer technology-focused college organization preparing students for industry
            practices in design and development.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.label} aria-label={col.label} className="md:col-span-2 last:md:col-span-3">
            <p className="mb-4 text-pd-light-grey">{col.label}</p>
            <ul className="space-y-2 text-lg">
              {col.links.map((l) => {
                const external = l.href.startsWith("http");
                return (
                  <li key={l.name}>
                    <Link
                      href={l.href}
                      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                      className="transition-colors duration-200 hover:text-pd-green"
                    >
                      {l.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        ))}
      </div>

      <div className="flex flex-col gap-2 px-page py-6 text-pd-light-grey md:flex-row md:justify-between">
        <span>Tarlac State University, College of Computer Studies</span>
        <span>Programmers&apos; Den &copy; {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
