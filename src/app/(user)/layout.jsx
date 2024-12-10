"use client";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Navbar from "@/components/custom/navbar";
import Footer from "../../components/custom/Footer";
import { cn } from "@/lib/utils";
import Header from "../../components/custom/Header";

export default function DashboardLayout({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
      wheelMultiplier: 1,
      normalizeWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="flex flex-col min-h-screen bg-primary">
      <Navbar className="sticky top-2 z-50" />
      <div className={cn("relative w-full flex-1  px-10")}>
        <Header />
        <div className="w-full min-h-screen">{children}</div>
      </div>
      <Footer />
    </main>
  );
}
