import React, { useState } from "react";
import { FaArrowRight, FaExternalLinkAlt } from "react-icons/fa";
import { usePortfolio } from "../contexts/PortfolioContext";
import MotionReveal from "./MotionReveal";

export const Credentials: React.FC = () => {
  const { data } = usePortfolio();
  const [showAllEducation, setShowAllEducation] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);

  const educationItems = showAllEducation ? data.education : data.education.slice(0, 3);
  const certificateItems = showAllCertificates
    ? data.certificates
    : data.certificates.slice(0, 5);

  return (
    <section id="experience" className="dn-section dn-credentials" aria-labelledby="experience-title">
      <div className="dn-container">
        <MotionReveal
          className="dn-section-heading dn-section-heading--compact"
        >
          <h2 id="experience-title">Learning through building.</h2>
          <p>Education and credentials that support the work shown above.</p>
        </MotionReveal>

        <div className="dn-credentials__grid">
          <MotionReveal className="dn-timeline" direction="left">
            <h3>Education and experience</h3>
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
              <p className="dn-muted">Education details are being updated.</p>
            )}
            {data.education.length > 3 && (
              <button
                className="dn-text-action"
                type="button"
                onClick={() => setShowAllEducation((current) => !current)}
              >
                {showAllEducation ? "Show selected entries" : "View full history"}
                <FaArrowRight aria-hidden="true" />
              </button>
            )}
          </MotionReveal>

          <MotionReveal className="dn-certificates" direction="right" delay={0.1}>
            <h3>Professional certificates</h3>
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
              <p className="dn-muted">Certificate details are being updated.</p>
            )}
            {data.certificates.length > 5 && (
              <button
                className="dn-text-action"
                type="button"
                onClick={() => setShowAllCertificates((current) => !current)}
              >
                {showAllCertificates ? "Show selected certificates" : "View all certificates"}
                <FaArrowRight aria-hidden="true" />
              </button>
            )}
          </MotionReveal>
        </div>
      </div>
    </section>
  );
};

export default Credentials;
