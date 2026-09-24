import React, { useEffect, useRef, useState } from "react";
import { FaArrowRight, FaTerminal, FaTimes } from "react-icons/fa";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { usePortfolio } from "../contexts/PortfolioContext";
import Terminal from "./hero/Terminal";

export const Hero: React.FC = () => {
  const { data } = usePortfolio();
  const [showTerminal, setShowTerminal] = useState(false);
  const terminalDialogRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 90, damping: 20 });
  const springY = useSpring(pointerY, { stiffness: 90, damping: 20 });
  const artX = useTransform(springX, [-1, 1], [-14, 14]);
  const artY = useTransform(springY, [-1, 1], [-10, 10]);
  const artRotate = useTransform(springX, [-1, 1], [-1.2, 1.2]);

  useEffect(() => {
    if (!showTerminal) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowTerminal(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    terminalDialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [showTerminal]);

  const name = data.userInfo.name || "Muhammad Attan";
  const role = data.userInfo.role || "Software Engineer";

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 2);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      id="home"
      className="dn-hero"
      aria-labelledby="hero-title"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="dn-hero__texture" aria-hidden="true" />
      <div className="dn-container dn-hero__grid">
        <motion.div
          className="dn-hero__copy"
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="dn-kicker">{role}</p>
          <h1 id="hero-title" className="dn-hero__title">
            I build systems
            <span>with rhythm.</span>
          </h1>
          <p className="dn-hero__intro">
            Backend, AI, and infrastructure shaped into reliable digital
            products.
          </p>
          <div className="dn-hero__actions">
            <a className="dn-button dn-button--primary" href="#projects">
              Explore work
              <FaArrowRight aria-hidden="true" />
            </a>
            <button
              className="dn-button dn-button--text"
              type="button"
              onClick={() => setShowTerminal(true)}
            >
              <FaTerminal aria-hidden="true" />
              Open console
            </button>
          </div>
          <dl className="dn-hero__meta" aria-label="Portfolio details">
            <div>
              <dt>Based in</dt>
              <dd>{data.userInfo.location || "Indonesia"}</dd>
            </div>
            <div>
              <dt>Working across</dt>
              <dd>Software, AI, systems</dd>
            </div>
          </dl>
        </motion.div>

        <motion.figure
          className="dn-hero__art"
          initial={{ opacity: 0, scale: 0.96, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.95, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          style={{ x: artX, y: artY, rotate: artRotate }}
        >
          <div className="dn-hero__disc" aria-hidden="true" />
          <img
            src="/art/digital-nusantara-hero.webp"
            alt="Abstract composition of flowing sound waves and connected software nodes"
            width="1122"
            height="1402"
            fetchPriority="high"
          />
          <figcaption>{name} / selected work</figcaption>
        </motion.figure>
      </div>

      <AnimatePresence>
        {showTerminal && (
          <motion.div
            className="dn-dialog-backdrop"
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setShowTerminal(false);
            }}
          >
            <motion.div
              ref={terminalDialogRef}
              className="dn-terminal-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="terminal-title"
              tabIndex={-1}
              initial={{ opacity: 0, y: 26, scale: 0.975 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
            >
              <div className="dn-dialog-header">
                <div>
                  <p className="dn-dialog-label">Interactive console</p>
                  <h2 id="terminal-title">Ask the portfolio</h2>
                </div>
                <button
                  type="button"
                  className="dn-icon-button"
                  onClick={() => setShowTerminal(false)}
                  aria-label="Close console"
                >
                  <FaTimes aria-hidden="true" />
                </button>
              </div>
              <Terminal />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
