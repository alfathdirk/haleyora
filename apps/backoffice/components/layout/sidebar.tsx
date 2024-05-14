import { DashboardNav } from "@/components/dashboard-nav";
import { navItems } from "@/constants/data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  return (
    <nav
      className={cn(
        `relative hidden h-screen border-r lg:block w-80 text-[#787486]`,
      )}
    >
      <div className="hidden px-6 py-[24px] border-b lg:block">
        <Link href="/">
          <Image
            src="/assets/img/general/haleyora-logo.png"
            width={190}
            height={0}
            alt="haleyora-logo"
            className="h-auto"
          />
        </Link>
      </div>
      <div className="py-4 space-y-4">
        <div className="px-3">
          <div className="h-[60%] space-y-1">
            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>
    </nav>
  );
}
