"use client";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Image from "next/image";
import logo from "@/assets/icon.png";
import Link from "next/link";
import { NavMain } from "./NavMain";
import { navMain } from "@/data/nav.data";
import { Separator } from "../ui/separator";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link
          href={"/dashboard"}
          className="flex items-center justify-between gap-6 p-2"
        >
          <Image src={logo} alt="logo" width={28} height={28} />
        </Link>
      </SidebarHeader>
      <Separator />
      <SidebarContent className="mt-3">
        <NavMain items={navMain as any} />
      </SidebarContent>
    </Sidebar>
  );
}
