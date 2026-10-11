import React, { useEffect, useRef } from "react";

type RevealDirection = "up" | "left" | "right" | "scale";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: RevealDirection;
  delay?: number;
  amount?: number;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  className = "",
  direction = "up",
  delay = 0,
  amount = 0.18,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!window.IntersectionObserver) {
      element.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add("is-visible");
        observer.disconnect();
      }
    }, { threshold: amount });

    observer.observe(element);
    return () => observer.disconnect();
  }, [amount]);

  return (
    <div
      ref={ref}
      className={`dn-reveal dn-reveal--${direction} ${className}`.trim()}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

export default Reveal;
