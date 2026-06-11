"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type AnimatedCardProps = React.HTMLAttributes<HTMLDivElement> & {
  index?: number;
  hover?: boolean;
};

export function AnimatedCard({
  children,
  className,
  index = 0,
  hover = true,
  style,
  ...props
}: AnimatedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -32px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-visible={visible}
      style={{
        ...style,
        ["--card-delay" as string]: `${index * 90}ms`,
      }}
      className={cn(
        "landing-card",
        visible && "landing-card-visible",
        hover && "landing-card-hover",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
