import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { usePortfolio } from "../contexts/PortfolioContext";

const Footer: React.FC = () => {
  const { data } = usePortfolio();
  const profileLinks = [
    {
      label: "Credly",
      url: "https://www.credly.com/users/muhammad-attan",
    },
    {
      label: "Dicoding",
      url: "https://www.dicoding.com/users/attmhd/academies",
    },
    {
      label: "GCSB",
      url: "https://www.skills.google/public_profiles/62eefc35-bccb-4fc5-924c-a0bf56db282d?locale=id",
    },
    {
      label: "Medium",
      url: "https://attmhd.medium.com/",
    },
  ];

  return (
    <footer className="bg-gray-50/80 dark:bg-black border-t border-gray-200/60 dark:border-white/[0.06]">
      {/* CTA Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-sm text-primary tracking-wide">
              &gt; contact
            </span>
            <span className="h-px flex-1 bg-gray-200 dark:bg-white/10 max-w-[120px]" />
          </div>

          <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            Let's Work Together
          </h2>
          <p className="text-gray-500 dark:text-gray-500 max-w-lg mb-8">
            Currently open for new opportunities in AI and Backend Engineering.
            Let's build something meaningful.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${data.userInfo.email}`}
              className="px-7 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold rounded-full hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors"
            >
              Say Hello
            </a>
            <span className="text-sm font-mono text-gray-400 dark:text-gray-600">
              {data.userInfo.email}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200/60 dark:border-white/[0.06]">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            {/* Left: Copyright + Social */}
            <div className="flex flex-col gap-4">
              <p className="text-sm text-gray-400 dark:text-gray-600">
                &copy; {new Date().getFullYear()} {data.userInfo.name}
              </p>
              <div className="flex items-center gap-5 text-base text-gray-400 dark:text-gray-700">
                <a
                  href="https://github.com/attmhd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://linkedin.com/in/attmhd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <FaLinkedin />
                </a>
                <a
                  href={`mailto:${data.userInfo.email}`}
                  className="hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <FaEnvelope />
                </a>
              </div>
            </div>

            {/* Right: Profile links */}
            <div className="flex flex-col items-start md:items-end gap-3">
              <span className="text-[11px] font-mono text-gray-400 dark:text-gray-700 uppercase tracking-wider">
                Profiles
              </span>
              <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                {profileLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-400 dark:text-gray-600 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
