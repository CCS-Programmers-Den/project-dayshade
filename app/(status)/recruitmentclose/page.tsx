import { PillLink } from "@/components/shared/pill-link";

export default function ClosedRecruitment() {
  return (
    <div className="flex min-h-screen flex-col justify-end px-page pb-20 pt-36 text-pd-bone md:pb-28">
      <h1 className="text-display-xl">Recruitment is closed.</h1>
      <p className="mt-8 max-w-lg text-xl leading-snug text-pd-bone/70">
        We&apos;re not looking for new members right now. Follow our Facebook page to hear when
        recruitment opens again.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <PillLink href="https://www.facebook.com/ccsprogrammersden">Follow on Facebook</PillLink>
        <PillLink href="/" variant="secondary">
          Back to home
        </PillLink>
      </div>
    </div>
  );
}
