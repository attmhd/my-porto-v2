import React, { useState } from "react";
import { FaArrowRight, FaExternalLinkAlt } from "react-icons/fa";
import { PORTFOLIO_CONTENT as data, UI_CONTENT } from "../data/portfolioContent";
import Reveal from "./Reveal";

export const Credentials: React.FC = () => {
  const [showAllEducation, setShowAllEducation] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);

  const educationItems = showAllEducation ? data.education : data.education.slice(0, 3);
  const certificateItems = showAllCertificates
    ? data.certificates
    : data.certificates.slice(0, 5);

  return (
    <section id="experience" className="dn-section dn-credentials" aria-labelledby="experience-title">
      <div className="dn-container">
        <Reveal
          className="dn-section-heading dn-section-heading--compact"
        >
          <h2 id="experience-title">{UI_CONTENT.credentials.title}</h2>
          <p>{data.userInfo.about}</p>
        </Reveal>

        <div className="dn-credentials__grid">
          <Reveal className="dn-timeline" direction="left">
            <h3>{UI_CONTENT.credentials.educationTitle}</h3>
            {educationItems.length ? (
              <ol>
                {educationItems.map((item) => (
                  <li key={item.id}>
                    <time>{item.year}</time>
                    <div>
                      <h4>{item.institution}</h4>
                      <p>{item.degree}</p>
                      {item.description && <small>{item.description}</small>}
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="dn-muted">{UI_CONTENT.credentials.educationEmpty}</p>
            )}
            {data.education.length > 3 && (
              <button
                className="dn-text-action"
                type="button"
                onClick={() => setShowAllEducation((current) => !current)}
              >
                {showAllEducation ? UI_CONTENT.credentials.showEducation : UI_CONTENT.credentials.allEducation}
                <FaArrowRight aria-hidden="true" />
              </button>
            )}
          </Reveal>

          <Reveal className="dn-certificates" direction="right" delay={0.1}>
            <h3>{UI_CONTENT.credentials.certificatesTitle}</h3>
            {certificateItems.length ? (
              <ul>
                {certificateItems.map((certificate) => (
                  <li key={certificate.id}>
                    <a href={certificate.url} target="_blank" rel="noopener noreferrer">
                      <span>
                        <strong>{certificate.name}</strong>
                        <small>{certificate.issuer} / {certificate.date}</small>
                      </span>
                      <FaExternalLinkAlt aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="dn-muted">{UI_CONTENT.credentials.certificatesEmpty}</p>
            )}
            {data.certificates.length > 5 && (
              <button
                className="dn-text-action"
                type="button"
                onClick={() => setShowAllCertificates((current) => !current)}
              >
                {showAllCertificates ? UI_CONTENT.credentials.showCertificates : UI_CONTENT.credentials.allCertificates}
                <FaArrowRight aria-hidden="true" />
              </button>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Credentials;
