import React from "react";
import { motion } from "motion/react";

type RevealDirection = "up" | "left" | "right" | "scale";

interface MotionRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: RevealDirection;
  delay?: number;
  amount?: number;
}

const hiddenState: Record<
  RevealDirection,
  { opacity: number; x?: number; y?: number; scale?: number }
> = {
  up: { opacity: 0, y: 38 },
  left: { opacity: 0, x: -46, y: 12 },
  right: { opacity: 0, x: 46, y: 12 },
  scale: { opacity: 0, y: 24, scale: 0.965 },
};

export const MotionReveal: React.FC<MotionRevealProps> = ({
  children,
  className,
  direction = "up",
  delay = 0,
  amount = 0.18,
}) => (
  <motion.div
    className={className}
    initial={hiddenState[direction]}
    whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
    viewport={{ once: true, amount }}
    transition={{ duration: 0.78, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

export default MotionReveal;
