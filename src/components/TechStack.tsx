import React from "react";
import { PORTFOLIO_CONTENT as data, UI_CONTENT } from "../data/portfolioContent";
import { getTechStackIcon } from "../data/techStackIcons";
import Reveal from "./Reveal";

export const TechStack: React.FC = () => {

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
        <Reveal className="dn-stack__header">
          <h2 id="stack-title">{UI_CONTENT.stack.title}</h2>
          <p>
            {UI_CONTENT.stack.description}
          </p>
        </Reveal>

        {data.techStack.length ? null : (
          <p className="dn-stack__empty">{UI_CONTENT.stack.empty}</p>
        )}
      </div>

      {data.techStack.length > 0 && (
        <Reveal
          className="dn-stack__flow"
          direction="scale"
          amount={0.1}
        >
          <div className="dn-stack__track" role="region" aria-label={UI_CONTENT.stack.regionLabel}>
            <ul className="dn-stack__group">
              {data.techStack.map(renderTechnology)}
            </ul>
            <ul className="dn-stack__group" aria-hidden="true">
              {data.techStack.map(renderTechnology)}
            </ul>
          </div>
        </Reveal>
      )}
    </section>
  );
};

export default TechStack;
