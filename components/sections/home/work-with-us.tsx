const REASONS = [
  {
    title: "Industry practice",
    body: "Programmers' Den runs under industry standards, so you learn how professional teams actually work.",
  },
  {
    title: "Senior mentors",
    body: "Get trained by your mentors and learn to manage projects with other skilled members.",
  },
  {
    title: "AI as a tool",
    body: "We see AI as a tool to improve and innovate. Learn to use modern technology to become a better programmer.",
  },
];

export default function WhyJoin() {
  return (
    <section className="grid gap-12 px-page py-24 md:grid-cols-12 md:py-40">
      <h2 className="text-display text-pd-bone md:col-span-7">
        Learn the way the industry works.
      </h2>
      <dl className="space-y-10 md:col-span-6 md:col-start-7">
        {REASONS.map((r) => (
          <div key={r.title} className="border-t border-white/10 pt-6">
            <dt className="text-2xl font-bold text-pd-bone md:text-3xl">{r.title}</dt>
            <dd className="mt-3 max-w-[52ch] text-lg leading-snug text-pd-bone/65">{r.body}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
