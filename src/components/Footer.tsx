import React from "react";
import {
  FaArrowRight,
  FaGithub,
  FaLinkedin,
  FaMedium,
  FaYoutube,
} from "react-icons/fa";
import { PORTFOLIO_CONTENT as data, UI_CONTENT, SOCIAL_CONTENT } from "../data/portfolioContent";
import Reveal from "./Reveal";

const socialIcons = { GitHub: FaGithub, LinkedIn: FaLinkedin, Medium: FaMedium, YouTube: FaYoutube };

export const Footer: React.FC = () => {
  const email = data.userInfo.email;

  return (
    <footer className="dn-footer">
      <div className="dn-container">
        <Reveal className="dn-footer__main">
          <div>
            <p>{UI_CONTENT.footer.availability}</p>
            <h2>{UI_CONTENT.footer.title}</h2>
          </div>
          <a className="dn-footer__contact" href={`mailto:${email}`}>
            {UI_CONTENT.footer.contact}
            <FaArrowRight aria-hidden="true" />
          </a>
        </Reveal>
        <Reveal className="dn-footer__base" delay={0.1}>
          <p>{UI_CONTENT.footer.signature}</p>
          <nav aria-label={UI_CONTENT.footer.socialsLabel}>
            {SOCIAL_CONTENT.map(({ label, href, icon }) => {
              const Icon = socialIcons[icon];
              return (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <Icon aria-hidden="true" />
                </a>
              );
            })}
          </nav>
          <p>{new Date().getFullYear()} / {UI_CONTENT.footer.country}</p>
        </Reveal>
      </div>
    </footer>
  );
};

export default Footer;
