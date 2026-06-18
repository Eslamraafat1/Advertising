"use client";

import React, { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  style?: React.CSSProperties;
  className?: string;
}

export default function Reveal({ children, delay = 0, direction = "up", style, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px", // triggers slightly before entering fully
      }
    );

    observer.observe(element);
    return () => {
      if (element) observer.unobserve(element);
      observer.disconnect();
    };
  }, []);

  const getTransform = () => {
    if (isVisible) return "translate(0, 0) scale(1)";
    switch (direction) {
      case "up":
        return "translateY(30px) scale(0.98)";
      case "down":
        return "translateY(-30px) scale(0.98)";
      case "left":
        return "translateX(30px) scale(0.98)";
      case "right":
        return "translateX(-30px) scale(0.98)";
      case "none":
        return "none";
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)`,
        transitionDelay: `${delay}ms`,
        willChange: "transform, opacity",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
