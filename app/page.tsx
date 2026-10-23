import HomeHero from "@/components/sections/home/home-hero";
import Teams from "@/components/sections/home/teams";
import { MonthlyShowcase } from "@/components/sections/home/monthly-showcase";
import { FeaturedProjects } from "@/components/sections/home/featured-projects";
import WhyJoin from "@/components/sections/home/work-with-us";
import JoinCta from "@/components/sections/home/join-cta";
import { getCurrentShowcase } from "@/lib/actions/projects/get-current-showcase";
import { getFeatured } from "@/lib/actions/projects/get-featured";

export default async function Page() {
  // A failed fetch hides that section instead of breaking the home page.
  const [showcase, featured] = await Promise.all([
    getCurrentShowcase().catch(() => null),
    getFeatured().catch(() => null),
  ]);

  return (
    <div className="text-pd-bone">
      <HomeHero />
      <Teams />
      {showcase && <MonthlyShowcase project={showcase} />}
      <FeaturedProjects projects={featured ?? []} />
      <WhyJoin />
      <JoinCta />
    </div>
  );
}
