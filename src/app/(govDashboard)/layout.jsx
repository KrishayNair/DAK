"use client";
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import Navbar from "@/components/custom/navbar";
import Header from "../../components/custom/Header";
import Govnavbar from "@/components/custom/govnavbar";

export default function DashboardLayout({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
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
    <div className="flex flex-col min-h-screen bg-[#FFF8E8]">
      <Govnavbar className="sticky top-0 z-50" />
      <div className="flex-1">
        <Header />
        <main className="p-8 mt-4">
          {children}
        </main>
      </div>
    </div>
  );
}
