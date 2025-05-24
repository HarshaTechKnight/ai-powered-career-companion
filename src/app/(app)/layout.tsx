import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger, SidebarRail } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen">
        <AppSidebar />
        <SidebarRail />
        <SidebarInset className="flex flex-col">
          <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background/95 px-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6 md:hidden">
            {/* Mobile header content, if any additional needed besides trigger */}
            <SidebarTrigger className="md:hidden" />
            <h1 className="text-lg font-semibold">KarmaMatch</h1>
          </header>
          <ScrollArea className="flex-1">
            <main className="p-4 sm:p-6 md:p-8">
              {children}
            </main>
          </ScrollArea>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
