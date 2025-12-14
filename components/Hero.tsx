import React from 'react';
import { USER_INFO } from '../constants';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-screen filter blur-3xl animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-secondary/20 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-accent/20 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-block mb-4 px-3 py-1 rounded-full border border-gray-700 bg-gray-900/50 backdrop-blur-sm text-xs text-gray-400 uppercase tracking-widest">
          Available for Hire
        </div>
        
        <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
          Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">{USER_INFO.name}</span>
        </h1>
        
        <h2 className="text-2xl md:text-3xl text-gray-300 font-light mb-8 max-w-3xl mx-auto">
          {USER_INFO.role}
        </h2>
        
        <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
          {USER_INFO.tagline}
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <a href="#projects" className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors">
            View Projects
          </a>
          <a href={`mailto:${USER_INFO.email}`} className="px-8 py-3 border border-gray-700 text-white font-semibold rounded-full hover:border-white transition-colors">
            Contact Me
          </a>
        </div>

        <div className="mt-16 flex justify-center gap-8 text-2xl text-gray-500">
          <a href="https://github.com/attmhd" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-110 transition-all"><FaGithub /></a>
          <a href="https://linkedin.com/in/attmhd" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-110 transition-all"><FaLinkedin /></a>
          <a href={`mailto:${USER_INFO.email}`} className="hover:text-white hover:scale-110 transition-all"><FaEnvelope /></a>
        </div>
      </div>
    </section>
  );
};

export default Hero;