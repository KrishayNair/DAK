"use client";

import React, { useState, createContext, useContext } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Home,
  Store,
  Stamp,
  BookImage,
  HeartHandshake,
  Computer,
  ChevronFirst,
  ChevronLast,
  MoreVertical,
} from "lucide-react";

const SidebarContext = createContext();

export default function Sidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(true);

  const sideBarRoutes = [
    { title: "HOME", url: "/home", icon: Home, regex: /^\/home$/ },
    {
      title: "DEPOSIT ACCOUNT",
      url: "/pda",
      icon: Stamp,
      regex: /^\/pda\/\d+$/,
    },
    { title: "SHOP", url: "/shop", icon: Store, regex: /^\/shop$/ },
    {
      title: "CATALOG",
      url: "/catalog",
      icon: BookImage,
      regex: /^\/catalog$/,
    },
    {
      title: "WORKSHOP",
      url: "/workshop",
      icon: Computer,
      regex: /^\/workshop(?:\/.*)?$/,
    },
    { title: "FORUM", url: "/forum", icon: HeartHandshake, regex: /^\/forum$/ },
  ];

  return (
    <aside
      className={cn(
        "border-r border-y border-outline py-8",
        "bg-white h-screen transition-all duration-300",
        expanded ? "w-64" : "w-20"
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between px-4 pb-2">
          <Image
            src="/logoNew.png"
            width={expanded ? 260 : 0}
            height={100}
            className={`transition-all ${expanded ? "block" : "hidden"}`}
            alt="Logo"
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-white"
          >
            {expanded ? <ChevronFirst size={20} /> : <ChevronLast size={20} />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <nav className="flex-1 px-3">
            {sideBarRoutes.map((route, i) => (
              <SidebarItem
                key={i}
                icon={route.icon}
                text={route.title}
                url={route.url}
                active={pathname.match(route.regex)}
              />
            ))}
          </nav>
        </SidebarContext.Provider>

        <div className="border-t flex p-3 items-center">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt="User"
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-[#674636]">
                john.doe@example.com
              </span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </div>
    </aside>
  );
}

function SidebarItem({ icon: Icon, text, url, active }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <Link href={url}>
      <li
        className={cn(
          "relative flex items-center py-3 px-3 my-1",
          "font-medium rounded-md cursor-pointer",
          "transition-colors group",
          active
            ? "bg-gradient-to-tr from-gray-200 to-gray-100 text-[#674636]"
            : "hover:bg-white text-gray-600"
        )}
      >
        <div
          className={cn(
            "w-8 h-8 flex items-center justify-center",
            "transition-all duration-300",
            expanded ? "" : "w-10 h-10"
          )}
        >
          <Icon size={expanded ? 24 : 28} />
        </div>
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>

        {!expanded && (
          <div
            className={cn(
              "absolute left-full rounded-md px-2 py-1 ml-6",
              "bg-white text-[#674636] text-sm",
              "invisible opacity-20 -translate-x-3 transition-all",
              "group-hover:visible group-hover:opacity-100 group-hover:translate-x-0"
            )}
          >
            {text}
          </div>
        )}
      </li>
    </Link>
  );
}
