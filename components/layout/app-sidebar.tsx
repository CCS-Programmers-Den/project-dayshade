"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { User } from "@supabase/supabase-js";

const navMain = [
  {
    title: "PD Admin Panel",
    url: "",
    items: [
      { title: "Dashboard", url: "/admin" },
      { title: "Recruitment", url: "/admin/recruitment" },
      { title: "Project", url: "/admin/project" },
      { title: "Leaderboard", url: "/admin/leaderboard" },
    ],
  },
];

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  user: User | null;
};

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <Image src="/assets/pd-logo.png" alt="logo" width={50} height={50} />
          <Image
            src="/assets/pd-banner.png"
            alt="banner"
            width={150}
            height={30}
          />
        </div>
      </SidebarHeader>

      <SidebarContent>
        {navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive =
                    item.url === "/admin"
                      ? pathname === item.url
                      : pathname === item.url ||
                        pathname.startsWith(item.url + "/");
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link href={item.url}>{item.title}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
