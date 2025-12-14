import React from "react";
import { EDUCATION, CERTIFICATES } from "../constants";
import { FaGraduationCap, FaCertificate, FaBriefcase } from "react-icons/fa";

const Credentials: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-surface">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Experience & Education */}
          <div>
            <h2 className="text-2xl font-display font-bold text-white mb-8 flex items-center gap-3">
              <FaBriefcase className="text-primary" /> Experience & Education
            </h2>
            <div className="space-y-8 border-l border-gray-800 pl-8 relative">
              {EDUCATION.map((edu) => (
                <div key={edu.id} className="relative group">
                  <span className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-background border-2 border-gray-600 group-hover:border-primary transition-colors"></span>
                  <span className="text-sm text-primary font-mono mb-1 block">
                    {edu.year}
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                    {edu.institution}
                  </h3>
                  <p className="text-gray-300 font-medium">{edu.degree}</p>
                  <p className="text-gray-500 text-sm mt-2">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Certificates */}
          <div>
            <h2 className="text-2xl font-display font-bold text-white mb-8 flex items-center gap-3">
              <FaCertificate className="text-secondary" /> Certificates
            </h2>
            <div className="grid gap-4">
              {CERTIFICATES.map((cert) => (
                <div
                  key={cert.id}
                  className="flex items-center justify-between p-4 bg-background border border-gray-800 rounded-xl hover:border-gray-500 transition-all group"
                >
                  <div>
                    <h3 className="text-white font-semibold group-hover:text-secondary transition-colors">
                      {cert.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {cert.issuer} • {cert.date}
                    </p>
                  </div>
                  <span className="text-xs px-3 py-1 bg-gray-800 rounded-full text-gray-300 group-hover:bg-gray-700 transition-colors">
                    <a href={cert.url} target="_blank">
                      Verified
                    </a>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Credentials;
