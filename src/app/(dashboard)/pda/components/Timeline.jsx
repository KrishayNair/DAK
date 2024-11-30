"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export const Timeline = ({ children }) => {
  const containerRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setContentHeight(containerRef.current.scrollHeight);
    }
  }, [children]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], [0, contentHeight]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div ref={containerRef} className="relative h-full">
      {/* Background line */}
      <div className="absolute left-10 top-0 h-full w-1.5 bg-gray-200 rounded-full" />

      {/* Animated progress line */}
      <motion.div
        className="absolute left-10 top-0 w-1.5 bg-[#B45309] origin-top rounded-full"
        style={{
          height: lineHeight,
          opacity: lineOpacity,
        }}
      />

      <div className="space-y-48">
        {" "}
        {/* Increased vertical spacing significantly */}
        {children}
      </div>
    </div>
  );
};

Timeline.Item = ({ children, active }) => {
  return (
    <motion.div
      className="relative flex gap-10" // Increased gap
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

Timeline.Point = ({ children }) => {
  return (
    <motion.div
      className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white border-3 border-[#B45309] shadow-xl" // Increased size further
      whileInView={{ scale: [0.8, 1] }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

Timeline.Content = ({ children }) => {
  return (
    <motion.div
      className="flex-1 pt-6" // Increased padding
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {children}
    </motion.div>
  );
};
