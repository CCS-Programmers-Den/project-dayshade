import BackgroundSvg from "@/components/shared/red-boxes-bg-svg";
import CSCPromotion from "@/components/sections/leaderboard/csc-promotion";
import SubHeader from "@/components/sections/leaderboard/sub-header";
import LeaderboardView from "@/components/sections/leaderboard/leaderboard-view";

export default async function LeaderboardsPage() {
  
  return (
    <main className="relative min-h-screen z-30 text-white overflow-hidden pt-18 md:pt-24 pb-16 md:pb-32">
      <div className="absolute inset-0 -z-10 flex items-center justify-center overflow-x-clip">
        <BackgroundSvg className="h-full w-auto overflow-x-clip" />
      </div>

      <div className="z-40">
        <section className="space-y-12 md:space-y-20 lg:space-y-24">
          <SubHeader />
          <LeaderboardView />
          <CSCPromotion />
        </section>
      </div>
    </main>
  );
}
