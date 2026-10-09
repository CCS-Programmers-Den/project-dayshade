"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function NavbarDemo() {
  const navItems: {
    name: string;
    link: string;
    tone: "purple" | "green";
  }[] = [
    { name: "Home", link: "/", tone: "green" },
    { name: "About", link: "/about", tone: "green" },
    { name: "Events", link: "/events", tone: "green" },
    { name: "Perks", link: "/perks", tone: "green" },
    { name: "Projects", link: "/projects", tone: "green" },
    { name: "Leaderboard", link: "/leaderboard", tone: "green" },
    // { name: "Design System", link: "/design" },
    // { name: "Admin", link: "/admin" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="relative w-full z-50 ">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <NavbarButton variant="pill" href="/join">
            Join now
          </NavbarButton>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => {
              const active =
                item.link === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.link);
              return (
                <Link
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="pd-nav-pill h-10 w-full text-base"
                  data-active={active}
                  aria-current={active ? "page" : undefined}
                >
                  <span className="pd-nav-text" data-tone={item.tone}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                href="/join"
                variant="pill"
                className="w-full !h-10 !text-base"
              >
                Join now
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
