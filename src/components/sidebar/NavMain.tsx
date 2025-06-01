"use client";
import { Icon } from "@tabler/icons-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { LayoutDashboard, LogOut } from "lucide-react";
import { Separator } from "../ui/separator";
export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  return (
    <SidebarGroup className="mainNav">
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="bg-primary text-[15px] py-6 px-4 cursor-pointer text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
            >
              <LayoutDashboard />
              <span>Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                className="text-[15px] py-6 px-4 cursor-pointer"
                tooltip={item.title}
              >
                {item.icon && (item?.icon as any)}
                <span> {item.title} </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <Separator />
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Logout"
              className="text-[15px] py-6 px-4 cursor-pointer hover:bg-transparent active:bg-transparent"
            >
              <button className="flex items-center gap-2 text-destructive cursor-pointer">
                <LogOut size={19} />
                <span>Logout</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <button className="flex items-center py-3 px-4 gap-2 text-destructive text-[15px] cursor-pointer"></button>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
