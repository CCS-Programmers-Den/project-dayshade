import MonthlyProjectShowcase from "@/components/sections/projects/monthly-project-showcase";
import FeaturedProjectsView from "@/components/sections/projects/featured-project-view";

export default function Projects() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black">
      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative flex items-center justify-center overflow-hidden pt-12 md:pt-16">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
          <div className="relative z-10 text-center px-4">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-secondary">
                Our Projects
              </span>
            </h1>
            <p className="text-white/70 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto">
              Discover innovative solutions crafted by our talented community
            </p>
          </div>
        </section>
        <section>
          <MonthlyProjectShowcase />
        </section>
        <section className="relative z-20 -mt-32">
          <FeaturedProjectsView />
        </section>
      </div>
    </div>
  );
}
