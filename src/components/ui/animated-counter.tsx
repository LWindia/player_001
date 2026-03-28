import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({ value, prefix = "", suffix = "", className = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  // Track highest value ever seen — never animate downward
  const maxValue = useRef(0);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    // Only animate upward — ignore values lower than current max
    if (value > maxValue.current) {
      maxValue.current = value;
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Intl.NumberFormat("en-IN").format(Math.floor(latest))}${suffix}`;
      }
    });
  }, [springValue, prefix, suffix]);

  return <span ref={ref} className={className}>{prefix}0{suffix}</span>;
}
