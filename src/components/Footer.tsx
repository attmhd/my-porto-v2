import React from "react";
import {
  FaArrowRight,
  FaGithub,
  FaLinkedin,
  FaMedium,
  FaYoutube,
} from "react-icons/fa";
import { usePortfolio } from "../contexts/PortfolioContext";
import MotionReveal from "./MotionReveal";

const socialLinks = [
  { label: "GitHub", href: "https://github.com/attmhd", icon: FaGithub },
  { label: "LinkedIn", href: "https://linkedin.com/in/attmhd", icon: FaLinkedin },
  { label: "Medium", href: "https://attmhd.medium.com/", icon: FaMedium },
  { label: "YouTube", href: "https://www.youtube.com/@attmhd", icon: FaYoutube },
];

export const Footer: React.FC = () => {
  const { data } = usePortfolio();
  const email = data.userInfo.email || "hello@attmhd.me";

  return (
    <footer className="dn-footer">
      <div className="dn-container">
        <MotionReveal className="dn-footer__main">
          <div>
            <p>Have a system worth building?</p>
            <h2>Let&apos;s make it clear, useful, and durable.</h2>
          </div>
          <a className="dn-footer__contact" href={`mailto:${email}`}>
            Start a conversation
            <FaArrowRight aria-hidden="true" />
          </a>
        </MotionReveal>
        <MotionReveal className="dn-footer__base" delay={0.1}>
          <p>attmhd / software engineer</p>
          <nav aria-label="Social links">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <Icon aria-hidden="true" />
              </a>
            ))}
          </nav>
          <p>{new Date().getFullYear()} / Indonesia</p>
        </MotionReveal>
      </div>
    </footer>
  );
};

export default Footer;
