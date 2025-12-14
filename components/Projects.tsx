import React from 'react';
import { PROJECTS } from '../constants';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
           <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                Featured Projects
              </h2>
              <p className="text-gray-400">Selected works demonstrating AI & Backend capabilities.</p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {PROJECTS.map((project) => (
            <div key={project.id} className="group relative bg-surface border border-gray-800 rounded-3xl overflow-hidden hover:border-gray-600 transition-all duration-300">
              {/* Image Area */}
              <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent z-10 opacity-80" />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-black/50 backdrop-blur-md border border-gray-700 rounded-full text-xs font-medium text-white">
                        {project.category}
                    </span>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-8 relative z-20 -mt-10">
                 <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                 </h3>
                 <p className="text-gray-400 mb-6 leading-relaxed text-sm">
                    {project.description}
                 </p>
                 
                 <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                        <span key={tech} className="text-xs font-mono text-gray-500 bg-gray-900 px-2 py-1 rounded">
                            {tech}
                        </span>
                    ))}
                 </div>

                 <div className="flex gap-4">
                     <button className="text-sm font-semibold text-white border-b border-transparent hover:border-primary hover:text-primary transition-all">
                        View Code
                     </button>
                     <button className="text-sm font-semibold text-white border-b border-transparent hover:border-primary hover:text-primary transition-all">
                        Live Demo
                     </button>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
