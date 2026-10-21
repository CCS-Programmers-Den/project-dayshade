"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/layout/footer";
import { NavbarDemo } from "@/components/layout/header";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavAndFooter =
    pathname.startsWith("/admin") || pathname.startsWith("/login");

  return (
    <>
      {!hideNavAndFooter && <NavbarDemo />}
      <main className="min-h-screen">{children}</main>
      {!hideNavAndFooter && <Footer />}
    </>
  );
}
