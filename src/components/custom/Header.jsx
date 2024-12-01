"use client";

import { Moon, Search, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useMemo } from "react";

export default function Header() {
  const { setTheme, theme } = useTheme();

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  const ThemeIcon = useMemo(() => {
    return theme === "dark" ? Sun : Moon;
  }, [theme]);

  return (
    <>
      <nav
        className={cn(
          "w-full flex items-center justify-start",
          "px-4 select-none mb-6"
        )}
      >
        {/* <ThemeIcon 
          className="md:w-[1.2rem] md:h-[1.2rem] md:mr-6 ml-auto mr-2 w-5 h-5 cursor-pointer hidden md:block"
          onClick={toggleTheme}
        />

        <div className="flex items-center justify-center mr-auto bg-white border-[1px] border-outline pr-80 rounded-xl ">
          <Search className="w-[1.2rem] h-[1.2rem] mr-4 ml-4" />
          <input
            type="text"
            placeholder="Search Dashboard ..."
            className={cn(
              "md:py-2 md:pl-2 pl-1 text-sm bg-transparent focus-visible:outline-none",
              "focus-visible:ring-2 focus-visible:ring-transparent"
            )}
          />
        </div> */}
      </nav>
    </>
  );
}
