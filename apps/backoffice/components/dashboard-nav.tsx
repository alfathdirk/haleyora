"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import { Dispatch, SetStateAction, useContext } from "react";
import { AuthContext } from "@/provider/Auth";

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export function DashboardNav({ items, setOpen }: DashboardNavProps) {
  const { logout } = useContext(AuthContext);
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  const LogoutIcon: any = Icons["login"];

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const Icon = Icons[item.icon || "arrowRight"];
        const isActive = item.path
          ? item.path === "/"
            ? path === item.path
            : path.startsWith(item.path)
          : false;

        if (item?.groupLabel) {
          return (
            item.path && (
              <h2 key={index} className="px-4 my-4 text-lg font-bold">
                {item?.groupLabel}
              </h2>
            )
          );
        }

        return (
          item.path && (
            <div key={index}>
              <Link
                key={index}
                href={item.disabled ? "/" : item.path}
                onClick={() => {
                  if (setOpen) setOpen(false);
                }}
              >
                <span
                  className={cn(
                    "group flex items-center px-6 py-2 text-[16px] transition-all ease-in duration-50 font-normal hover:bg-accent hover:text-accent-foreground hover:border-r-4 hover:border-[#00A9E3]",
                    isActive
                      ? "bg-accent border-r-4 text-accent-foreground border-[#00A9E3]"
                      : "transparent",
                    item.disabled && "cursor-not-allowed opacity-80",
                  )}
                >
                  <Icon className="w-6 h-6 mr-4" />
                  <span>{item.title}</span>
                </span>
              </Link>
              {items[index + 1]?.groupLabel && (
                <div className="w-full pb-4 border-b"></div>
              )}
            </div>
          )
        );
      })}
      {/* Logout */}
      <div
        key={"logout-sidebar"}
        onClick={() => logout()}
        className="absolute bottom-0 w-full pl-9 right-3"
      >
        <div className="w-full border-t"></div>
        <span
          className={cn(
            "group flex w-full items-center rounded-md py-5 text-[16px] transition-all ease-in duration-50 font-normal hover:text-primary",
            "bg-transparent cursor-pointer",
          )}
        >
          <LogoutIcon className="w-4 h-4 mr-2" />
          <span>Logout</span>
        </span>
      </div>
    </nav>
  );
}
