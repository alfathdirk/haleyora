import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import Sidebar from "@/components/layout/sidebar";
import ThemeToggle from "@/components/layout/ThemeToggle/theme-toggle";
import { UserNav } from "@/components/layout/user-nav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || "Haleyora",
  description: "Elearning Haleyora Power",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        {/* Content */}
        <main className="relative w-full pt-24">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-20 px-4 py-4 border-b md:py-[30px] md:px-6 supports-backdrop-blur:bg-background/60 bg-background/95 backdrop-blur">
            <nav className="flex items-center justify-between px-0 md:px-4">

              <div className="flex text-lg font-semibold lg:flex-row lg:text-3xl">
                <p className="text-[#C2BB34] mr-2">E-LEARNING</p>
                <p className="text-[#05A5DE]"> HALEYORA POWER</p>
              </div>

              <div className={cn("block lg:!hidden")}>
                <MobileSidebar />
              </div>
              <div className="items-center !hidden gap-2 lg:!flex">
                <UserNav />
                <ThemeToggle />
              </div>
            </nav>
          </div>

          <ScrollArea className="h-full">
            <div className="p-4 md:p-10">
              {children}
            </div>
          </ScrollArea>
        </main>
      </div>
    </>
  );
}
