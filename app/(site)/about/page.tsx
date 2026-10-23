import Image from "next/image";
import JoinCta from "@/components/sections/home/join-cta";
import { PhotoStrip } from "@/components/sections/about/photo-strip";
import { OfficerCard } from "@/components/sections/about/officer-card";
import { ImpactStats } from "@/components/sections/about/impact-stats";
import FormerOfficersSection from "@/components/sections/about/former-officers-section";
import FormerMembersSection from "@/components/sections/about/former-members-section";
import { teamMembers } from "@/lib/constants/team-members";
import { technologies } from "@/lib/constants/technologies";

export const metadata = {
  title: "About | Programmers' Den",
  description: "The story, people and impact of Programmers' Den at TSU College of Computer Studies.",
};

const LOGOS = [
  { src: "/assets/about-pics/about-pd-logo-1.png", size: 160 },
  { src: "/assets/about-pics/about-pd-logo-2.png", size: 160 },
  { src: "/assets/about-pics/about-pd-logo-3.png", size: 235 },
];

export default function AboutPage() {
  const year = new Date().getFullYear();

  return (
    <div className="text-pd-bone">
      <header className="grid gap-12 px-page pb-24 pt-36 md:grid-cols-12 md:items-end md:pb-32 md:pt-48">
        <div className="md:col-span-7">
          <h1 className="text-[clamp(3.25rem,7vw,7rem)] font-black leading-[0.85] tracking-[-0.045em]">
            Only the best among the rest.
          </h1>
          <p className="mt-8 max-w-xl text-xl leading-snug text-pd-bone/70">
            We are the Programmers&apos; Den, an organization of Tarlac State University – College of
            Computer Studies founded in 2013, made up of programmers from BSIT, BSIS and BSCS.
          </p>
        </div>
        <Image
          src="/assets/about-pics/about-hero-img.png"
          alt="Den members with awards and a certificate for Outstanding College-Based Organization"
          width={503}
          height={460}
          priority
          className="w-full max-w-[503px] md:col-span-5 md:justify-self-end"
        />
      </header>

      <PhotoStrip />

      <section className="grid gap-12 px-page py-24 md:grid-cols-12 md:py-32">
        <h2 className="text-display md:col-span-5">It all started in 2013.</h2>
        <div className="max-w-[62ch] space-y-6 text-lg leading-snug text-pd-bone/70 md:col-span-6 md:col-start-7 md:text-xl">
          <p>
            The founding members of the Programmers&apos; Den saw the potential of a skill-focused
            student organization. Since then, we have been top performers and competitors for the
            College of Computer Studies and the University in IT and development.
          </p>
          <p>
            The organization has kept growing into what it is today, with the never-ending challenge of
            keeping up with the latest technologies and programming languages.
          </p>
          <div className="flex items-center gap-6 pt-4">
            {LOGOS.map((logo) => (
              <Image
                key={logo.src}
                src={logo.src}
                alt=""
                width={logo.size}
                height={logo.size}
                className="size-20 object-contain md:size-24"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-page py-24 md:py-32">
        <h2 className="max-w-2xl text-3xl font-bold leading-tight md:text-4xl">
          Using the latest technologies beyond the classroom.
        </h2>
        <ul className="mt-12 grid grid-cols-3 gap-8 sm:grid-cols-5 lg:grid-cols-9">
          {technologies.map((tech) => (
            <li key={tech.id} className="grid place-items-center">
              <Image src={tech.icon} alt={tech.alt} width={64} height={64} className="size-12 object-contain md:size-16" />
            </li>
          ))}
        </ul>
      </section>

      <section className="px-page py-24 md:py-32">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="text-display">Meet the team</h2>
          <p className="text-lg text-pd-bone/65">
            Officers {year}–{year + 1}
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6">
          {teamMembers.map((member) => (
            <OfficerCard key={member.id} officer={member} />
          ))}
        </ul>
      </section>

      <FormerOfficersSection />
      <FormerMembersSection />
      <ImpactStats />
      <JoinCta />
    </div>
  );
}
