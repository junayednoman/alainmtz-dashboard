"use client";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import Image from "next/image";
import avatarImg from "@/assets/avatar.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import Link from "next/link";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center justify-between gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1" />
            <DropdownMenu>
              <DropdownMenuTrigger>
                {" "}
                <button className="">
                  <Image src={avatarImg} alt="logo" width={40} height={40} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card text-primary-foreground">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="flex flex-col px-2 gap-3 py-2">
                  <Link className="hover:text-foreground" href={"/"}>
                    Profile
                  </Link>
                  <Link className="hover:text-foreground" href={"/"}>
                    Notifications
                  </Link>
                  <Link className="hover:text-foreground" href={"/"}>
                    Settings
                  </Link>{" "}
                </div>
                <DropdownMenuSeparator />
                <button className="flex items-center gap-2 text-destructive cursor-pointer p-[6px] px-3">
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main>
          {children}
          <Toaster position="top-right" duration={3000} />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Providers;
