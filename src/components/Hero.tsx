import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { PORTFOLIO_CONTENT as data, UI_CONTENT } from "../data/portfolioContent";

export const Hero: React.FC = () => {

  const name = data.userInfo.name;
  const role = data.userInfo.role;

  return (
    <section
      id="home"
      className="dn-hero"
      aria-labelledby="hero-title"
    >
      <div className="dn-hero__texture" aria-hidden="true" />
      <div className="dn-container dn-hero__grid">
        <div className="dn-hero__copy">
          <p className="dn-kicker">{role}</p>
          <h1 id="hero-title" className="dn-hero__title">
            {UI_CONTENT.hero.title}
            <span>{UI_CONTENT.hero.emphasis}</span>
          </h1>
          <p className="dn-hero__intro">
            {UI_CONTENT.hero.introduction} {name}. {data.userInfo.tagline}
          </p>
          <div className="dn-hero__actions">
            <a className="dn-button dn-button--primary" href="#projects">
              {UI_CONTENT.hero.projects}
              <FaArrowRight aria-hidden="true" />
            </a>
            {data.userInfo.cvUrl && (
              <a
                className="dn-button dn-button--text"
                href={data.userInfo.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {UI_CONTENT.hero.cv}
                <FaArrowRight aria-hidden="true" />
              </a>
            )}
          </div>
          <dl className="dn-hero__meta" aria-label={UI_CONTENT.hero.detailsLabel}>
            <div>
              <dt>{UI_CONTENT.hero.locationLabel}</dt>
              <dd>{data.userInfo.location}</dd>
            </div>
            <div>
              <dt>{UI_CONTENT.hero.availabilityLabel}</dt>
              <dd>{UI_CONTENT.hero.availability}</dd>
            </div>
          </dl>
        </div>

        <figure className="dn-hero__art">
          <div className="dn-hero__disc" aria-hidden="true" />
          <img
            src={UI_CONTENT.hero.image}
            alt={UI_CONTENT.hero.imageAlt}
            width="1122"
            height="1402"
            fetchPriority="high"
          />
          <figcaption>{name} / {UI_CONTENT.hero.caption}</figcaption>
        </figure>
      </div>

    </section>
  );
};

export default Hero;
