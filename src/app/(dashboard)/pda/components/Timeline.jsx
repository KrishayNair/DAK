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
      <div className="absolute left-8 top-0 h-full w-1.5 bg-gray-200 rounded-full" />

      {/* Animated progress line */}
      <motion.div
        className="absolute left-8 top-0 w-1.5 bg-[#B45309] origin-top rounded-full"
        style={{
          height: lineHeight,
          opacity: lineOpacity,
        }}
      />

      <div className="space-y-12 md:space-y-48">
        {children}
      </div>
    </div>
  );
};

const TimelineItem = ({ children, active }) => {
  return (
    <motion.div
      className="relative flex flex-col gap-4 md:gap-10"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-250px" }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {children}
    </motion.div>
  );
};
TimelineItem.displayName = 'Timeline.Item';
Timeline.Item = TimelineItem;

const TimelinePoint = ({ children }) => {
  return (
    <motion.div
      className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white border-3 border-[#B45309] shadow-xl"
      whileInView={{ scale: [0.8, 1] }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};
TimelinePoint.displayName = 'Timeline.Point';
Timeline.Point = TimelinePoint;

const TimelineContent = ({ children }) => {
  return (
    <motion.div
      className="flex-1 pt-4 md:pt-6"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {children}
    </motion.div>
  );
};
TimelineContent.displayName = 'Timeline.Content';
Timeline.Content = TimelineContent;
