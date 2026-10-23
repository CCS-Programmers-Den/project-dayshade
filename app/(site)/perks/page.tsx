import Image from "next/image";
import JoinCta from "@/components/sections/home/join-cta";
import { ClipReveal } from "@/components/shared/clip-reveal";
import { PillLink } from "@/components/shared/pill-link";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Perks | Programmers' Den",
  description: "What you get as a member of Programmers' Den.",
};

const PERKS = [
  {
    title: "Competitions and events",
    body: "Get more chances to join competitions and attend national and international events during your college life. As a member of the elite programmers, the College puts its faith in your skills.",
    image: { src: "/assets/perks-pics/perks-2.png", width: 511, height: 440, alt: "Members at the iRCITE 2023 conference" },
  },
  {
    title: "Exclusive merchandise",
    body: "Access to eye-catching Den merchandise, from shirts and hoodies to lanyards.",
    image: { src: "/assets/perks-pics/perks-4.png", width: 7416, height: 4500, alt: "Programmers' Den merchandise" },
    link: { href: "/shop", label: "Visit the shop" },
  },
  {
    title: "Build your portfolio",
    body: "Collaborate with senior members on real projects you can show in your portfolio.",
    image: { src: "/assets/perks-pics/perks-3.png", width: 531, height: 366, alt: "Members working on a project" },
  },
  {
    title: "Monthly team sessions",
    body: "Learn more about web and app development, game development and multimedia in our monthly team sessions.",
    image: { src: "/assets/perks-pics/perks-5.png", width: 529, height: 443, alt: "A Den team session" },
  },
];

const PLAY = [
  { src: "/assets/perks-pics/perks-6.png", width: 488, alt: "Virtual Dive" },
  { src: "/assets/perks-pics/perks-7.png", width: 489, alt: "Super Smash Bros. tournament" },
  { src: "/assets/perks-pics/perks-8.png", width: 460, alt: "Tekken tournament" },
];

export default function PerksPage() {
  return (
    <div className="text-pd-bone">
      <header className="grid gap-12 px-page pb-24 pt-36 md:grid-cols-12 md:items-end md:pb-32 md:pt-48">
        <div className="md:col-span-7">
          <h1 className="text-[clamp(3.25rem,7vw,7rem)] font-black leading-[0.85] tracking-[-0.045em]">
            Membership perks
          </h1>
          <p className="mt-8 max-w-lg text-xl leading-snug text-pd-bone/70">
            Join our community of passionate programmers and unlock these benefits.
          </p>
          <PillLink href="/join" className="mt-10">
            Become a member
          </PillLink>
        </div>
        <Image
          src="/assets/perks-pics/perks-1.png"
          alt="Den members at a campus event"
          width={596}
          height={353}
          priority
          className="w-full rounded-[28px] md:col-span-5"
        />
      </header>

      <section aria-label="Perks">
        {PERKS.map((perk, i) => (
          <article
            key={perk.title}
            className="grid items-center gap-10 px-page py-20 md:grid-cols-12 md:py-28"
          >
            <ClipReveal className={cn("md:col-span-5", i % 2 === 1 && "md:order-2 md:col-start-8")}>
              <Image
                src={perk.image.src}
                alt={perk.image.alt}
                width={perk.image.width}
                height={perk.image.height}
                sizes="(min-width: 768px) 720px, 100vw"
                className="aspect-[4/3] w-full rounded-[28px] object-cover"
              />
            </ClipReveal>
            <div className={cn("md:col-span-6", i % 2 === 0 ? "md:col-start-7" : "md:order-1")}>
              <h2 className="text-display">{perk.title}</h2>
              <p className="mt-6 max-w-[48ch] text-lg leading-snug text-pd-bone/70 md:text-xl">{perk.body}</p>
              {perk.link && (
                <PillLink href={perk.link.href} variant="secondary" className="mt-8">
                  {perk.link.label}
                </PillLink>
              )}
            </div>
          </article>
        ))}
      </section>

      <section className="py-24 md:py-32">
        <div className="px-page">
          <h2 className="text-display">Work hard. Play hard.</h2>
          <p className="mt-6 max-w-xl text-lg leading-snug text-pd-bone/70 md:text-xl">
            We celebrate gaming too. Team-building activities that grow teamwork and healthy competition.
          </p>
        </div>
        <ul className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-page pb-4 md:grid md:snap-none md:grid-cols-3 md:overflow-visible [scrollbar-color:rgb(255_255_255/0.25)_transparent] [scrollbar-width:thin]">
          {PLAY.map((img) => (
            <li key={img.src} className="shrink-0 snap-start md:shrink">
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={271}
                className="h-[220px] w-auto rounded-[20px] md:aspect-[9/5] md:h-auto md:w-full md:object-cover"
              />
            </li>
          ))}
        </ul>
      </section>

      <JoinCta />
    </div>
  );
}
