import { JoinForm } from "@/components/sections/join/join-form";
import { memberData } from "@/lib/constants/join-stats";

export const metadata = {
  title: "Join | Programmers' Den",
  description: "Apply to become a member of Programmers' Den.",
};

const PERKS = [
  { title: "More chances to join competitions", body: "Hackathons, coding challenges and more." },
  { title: "Exclusive sessions", body: "Den webinars and workshops." },
  { title: "Exclusive merchandise", body: "Eye-catching Den merch." },
  { title: "Real projects", body: "Build your portfolio with senior members." },
];

const STATS = [
  { value: memberData[0].ActiveMember, label: "Active members" },
  { value: memberData[0].Projects, label: "Projects" },
  { value: memberData[0].YearsOfExcellence, label: "Years running" },
];

export default function JoinPage() {
  return (
    <div className="px-page pb-24 pt-36 text-pd-bone md:pb-32 md:pt-48">
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:sticky lg:top-32 lg:col-span-6 lg:self-start">
          <h1 className="text-[clamp(3.25rem,7vw,7rem)] font-black leading-[0.85] tracking-[-0.045em]">
            Join the Den.
          </h1>
          <p className="mt-8 max-w-lg text-xl leading-snug text-pd-bone/70">
            We&apos;re a supportive community for programmers and multimedia enthusiasts. Join us to
            grow your skills, take on challenges and build a career together.
          </p>

          <h2 className="mt-14 text-lg text-pd-light-grey">What you&apos;ll get</h2>
          <ul className="mt-4">
            {PERKS.map((p) => (
              <li key={p.title} className="border-t border-white/10 py-4 last:border-b">
                <p className="text-xl font-bold">{p.title}</p>
                <p className="mt-1 text-pd-bone/65">{p.body}</p>
              </li>
            ))}
          </ul>

          <dl className="mt-12 grid grid-cols-3 gap-6">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="text-pd-light-grey">{s.label}</dt>
                <dd className="mt-1 text-5xl font-black tracking-tight md:text-6xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-6">
          <div className="rounded-[28px] bg-pd-banner-mid p-6 md:p-10">
            <h2 className="text-3xl font-bold">Application form</h2>
            <p className="mt-2 text-pd-bone/65">Fill out the form to become a member.</p>
            <div className="mt-8">
              <JoinForm />
            </div>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-pd-light-grey">
            By submitting this form, you agree that, in compliance with the Data Privacy Act of 2012,
            its implementing rules and regulations, and other issuances of the National Privacy
            Commission, you authorize Programmers&apos; Den to collect your data for this activity.
          </p>
        </div>
      </div>
    </div>
  );
}
