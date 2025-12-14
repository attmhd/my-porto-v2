import React from 'react';
import { USER_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-12 border-t border-gray-900">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-2xl font-display font-bold text-white mb-6">Let's Work Together</h2>
            <p className="text-gray-400 max-w-lg mx-auto mb-8">
                Currently open for new opportunities in AI Backend Development.
            </p>
            <a 
                href={`mailto:${USER_INFO.email}`}
                className="inline-block px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors"
            >
                Say Hello
            </a>
            
            <div className="mt-16 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
                <p>&copy; {new Date().getFullYear()} {USER_INFO.name}. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <span className="cursor-pointer hover:text-gray-400">Privacy</span>
                    <span className="cursor-pointer hover:text-gray-400">Terms</span>
                </div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
