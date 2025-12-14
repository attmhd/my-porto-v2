import React from 'react';
import { TECH_STACK } from '../constants';
import { TechStackItem } from '../types';

const TechStack: React.FC = () => {
  const categories = Array.from(new Set(TECH_STACK.map(item => item.category)));

  return (
    <section className="py-24 bg-surface/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            Tech Stack
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
             Tools and technologies I use to build intelligent and scalable systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {categories.map((category) => (
            <div 
              key={category} 
              className="bg-background/80 backdrop-blur-sm border border-white/5 p-8 rounded-3xl hover:border-white/10 transition-all hover:shadow-2xl hover:shadow-primary/5 group"
            >
              <h3 className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-6 flex items-center gap-3 after:content-[''] after:h-px after:flex-1 after:bg-gray-800">
                {category}
              </h3>
              
              <div className="flex flex-wrap gap-4">
                {TECH_STACK.filter(t => t.category === category).map((tech: TechStackItem) => (
                  <div 
                    key={tech.name} 
                    className="flex items-center gap-3 bg-surface border border-gray-800 px-4 py-3 rounded-xl transition-all hover:border-primary/50 hover:bg-gray-900 cursor-default"
                  >
                    <tech.icon className="text-xl text-gray-400 group-hover:text-white transition-colors" />
                    <span className="text-sm font-medium text-gray-300">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;