import React from 'react';
import WorldIDVerification from './WorldIDVerification';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-navy-700/50">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Compact Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-red-gradient rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">CV</span>
            </div>
            <span className="text-xl font-bold text-red-gradient">CodeVamp</span>
          </div>

          {/* Compact Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-navy-300 hover:text-red-400 transition-colors duration-300 relative group text-sm font-medium">
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#challenges" className="text-navy-300 hover:text-red-400 transition-colors duration-300 relative group text-sm font-medium">
              Challenges
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#community" className="text-navy-300 hover:text-red-400 transition-colors duration-300 relative group text-sm font-medium">
              Community
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </nav>

          {/* Compact World ID Verification */}
          <div className="flex items-center">
            <WorldIDVerification />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 