import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import ProfileDropdown from "./sections/dashboard/ProfileDropdown";

const GeneralLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider className="flex">
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 sticky top-0 right-0 z-50 bg-background">
          <div className="flex items-center justify-between gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1" />
            <ProfileDropdown />
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

export default GeneralLayout;
