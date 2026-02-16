import React from "react";
import { EDUCATION, CERTIFICATES } from "../constants";

const Credentials: React.FC = () => {
  return (
    <section id="experience" className="py-24 bg-white dark:bg-surface-dark/50">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-sm text-primary tracking-wide">
              &gt; credentials
            </span>
            <span className="h-px flex-1 bg-gray-200 dark:bg-white/10 max-w-[120px]" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
            Experience &amp; Credentials
          </h2>
          <p className="text-gray-500 dark:text-gray-500 max-w-lg">
            My journey through education, industry experience, and professional
            certifications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Experience & Education */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-xs font-mono text-gray-400 dark:text-gray-600 uppercase tracking-wider">
                Timeline
              </span>
              <span className="h-px flex-1 bg-gray-200 dark:bg-white/[0.06]" />
            </div>

            <div className="relative pl-8">
              {/* Vertical line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gray-200 dark:bg-white/[0.06]" />

              <div className="space-y-10">
                {EDUCATION.map((edu, index) => (
                  <div key={edu.id} className="relative group">
                    {/* Dot */}
                    <span className="absolute -left-8 top-[6px] w-[15px] h-[15px] rounded-full bg-white dark:bg-surface-dark border-2 border-gray-300 dark:border-gray-700 group-hover:border-primary transition-colors z-10" />

                    {/* Year */}
                    <span className="text-xs font-mono text-primary tracking-wide mb-1.5 block">
                      {edu.year}
                    </span>

                    {/* Institution */}
                    <h3 className="text-lg font-display font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors leading-snug mb-1">
                      {edu.institution}
                    </h3>

                    {/* Degree */}
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                      {edu.degree}
                    </p>

                    {/* Description */}
                    {edu.description && (
                      <p className="text-sm text-gray-500 dark:text-gray-600 leading-relaxed">
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Certificates */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-xs font-mono text-gray-400 dark:text-gray-600 uppercase tracking-wider">
                Certificates
              </span>
              <span className="h-px flex-1 bg-gray-200 dark:bg-white/[0.06]" />
            </div>

            <div className="space-y-3">
              {CERTIFICATES.map((cert) => (
                <a
                  key={cert.id}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start justify-between gap-4 p-4 bg-gray-50/80 dark:bg-white/[0.02] border border-gray-200/60 dark:border-white/[0.06] rounded-xl hover:border-gray-300 dark:hover:border-white/[0.12] transition-all group cursor-pointer"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors leading-snug mb-1">
                      {cert.name}
                    </h3>
                    <p className="text-xs font-mono text-gray-400 dark:text-gray-600">
                      {cert.issuer} · {cert.date}
                    </p>
                  </div>
                  <span className="shrink-0 mt-0.5 text-[11px] font-mono text-gray-400 dark:text-gray-600 bg-gray-100 dark:bg-white/[0.04] border border-gray-200/60 dark:border-white/[0.06] px-2.5 py-1 rounded-full group-hover:text-primary group-hover:border-primary/30 transition-colors">
                    verified ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Credentials;
