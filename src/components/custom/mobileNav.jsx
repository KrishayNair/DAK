"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Bell,
  ShoppingCart
} from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function MobileNav() {
  const [isClick, setisClick] = useState(false);

  const toggleNavbar = () => {
    setisClick(!isClick);
  };

  function getGreeting() {
    const now = new Date();
    const hours = now.getHours();

    if (hours >= 5 && hours < 12) {
      return "Good morning";
    } else if (hours >= 12 && hours < 15) {
      return "Good afternoon";
    } else if (hours >= 15 && hours < 21) {
      return "Good evening";
    } else {
      return "Good night";
    }
  }

  const pathname = usePathname();

  const sideBarRoutes = [
    { 
      title: "Home", 
      url: "/", 
      regex: /^\/$/ 
    },
    { 
      title: "Philatelist Deposit Account", 
      url: "/pda", 
      regex: /^\/pda/ 
    },
    {
      title: "Shop",
      url: "/shop",
      regex: /^\/shop/
    },
    {
      title: "Catalog",
      url: "/catalog",
      regex: /^\/catalog/
    },
    {
      title: "Blog",
      url: "/blog",
      regex: /^\/blog/
    },
    {
      title: "Forum",
      url: "/forum",
      regex: /^\/forum/
    },
    {
      title: "Auctions",
      url: "/auction",
      regex: /^\/auction/
    }
  ];

  return (
    <aside
      className={cn(
        "border-r border-y border-outline",
        "bg-foreground h-auto transition-all duration-300",
        "flex flex-col"
      )}
    >
      <div className="h-14 flex items-center justify-between py-3 px-3">
        <Image
          src="/logo.png"
          width={130}
          height={50}
        />
        <div className="ml-auto cursor-pointer flex items-center space-x-3">
          <Bell className="w-6 h-6" />
          <ShoppingCart className="w-6 h-6 "/>

          {isClick ? (
            <X className="w-6 h-6" onClick={toggleNavbar} />
          ) : (
            <Menu className="w-6 h-6" onClick={toggleNavbar} />
          )}
        </div>
      </div>

      {isClick && (
        <>
          <div className="flex items-center px-6 ">
            <h2 className="text-lg block md:hidden text-muted font-bold py-3">
              {getGreeting()},
              <br />
              <span className="text-xl text-black dark:text-white ">User</span>
            </h2>
            <Avatar className="w-12 h-12 ml-auto mr-2">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>DL</AvatarFallback>
            </Avatar>
          </div>
          <nav className="flex flex-col items-start min-h-screen text-lg font-medium mt-4 pl-5">
            {sideBarRoutes.map((route, i) => (
              <Link
                key={i}
                href={route.url}
                className={cn(
                  "relative",
                  pathname.match(route.regex) &&
                  "w-full flex items-center gap-3 font-semibold rounded-md py-3 transition-all hover:text-primary",
                  pathname.match(route.regex)
                    ? "text-secondary"
                    : "text-slate-400"
                )}
              >
                <route.icon className="h-6 w-6" />
                {route.title}
              </Link>
            ))}
          </nav>
        </>
      )}
    </aside>
  );
}
