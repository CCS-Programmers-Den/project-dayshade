"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/layout/footer";
import { NavbarDemo } from "@/components/layout/header";
import SmoothScroll from "@/components/providers/smooth-scroll";
import { SiteBackground } from "@/components/layout/site-background";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavAndFooter =
    pathname.startsWith("/admin") || pathname.startsWith("/login");

  if (hideNavAndFooter) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <SmoothScroll>
      {/* isolate keeps the fixed background layer (-z-10) above this color and below the content. */}
      <div className="relative isolate bg-pd-black">
        <SiteBackground />
        <NavbarDemo />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
