import React from "react";
import { usePortfolio } from "../contexts/PortfolioContext";
import { getTechStackIcon } from "../data/portfolio";
import MotionReveal from "./MotionReveal";

export const TechStack: React.FC = () => {
  const { data } = usePortfolio();

  const renderTechnology = (technology: (typeof data.techStack)[number], index: number) => {
    const Icon = getTechStackIcon(technology.iconName);
    return (
      <li
        key={`${technology.category}-${technology.name}-${index}`}
        className={`dn-stack__item dn-stack__item--${index % 6}`}
      >
        <Icon aria-hidden="true" />
        <span>{technology.name}</span>
        <small>{technology.category}</small>
      </li>
    );
  };

  return (
    <section id="stack" className="dn-section dn-stack" aria-labelledby="stack-title">
      <div className="dn-container">
        <MotionReveal className="dn-stack__header">
          <h2 id="stack-title">A working stack, tuned for scale.</h2>
          <p>
            Languages, frameworks, and infrastructure used across production
            systems.
          </p>
        </MotionReveal>

        {data.techStack.length ? null : (
          <p className="dn-stack__empty">The technology list is being updated.</p>
        )}
      </div>

      {data.techStack.length > 0 && (
        <MotionReveal
          className="dn-stack__flow"
          direction="scale"
          amount={0.1}
        >
          <div className="dn-stack__track" role="region" aria-label="Technology stack in motion">
            <ul className="dn-stack__group">
              {data.techStack.map(renderTechnology)}
            </ul>
            <ul className="dn-stack__group" aria-hidden="true">
              {data.techStack.map(renderTechnology)}
            </ul>
          </div>
        </MotionReveal>
      )}
    </section>
  );
};

export default TechStack;
