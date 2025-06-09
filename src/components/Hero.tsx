import React from 'react';
import WorldIDVerification from './WorldIDVerification';

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-dark-gradient">
      {/* Modern background elements */}
      <div className="absolute inset-0 bg-dark-gradient-radial opacity-60"></div>
      <div className="absolute top-20 left-20 w-3 h-3 bg-red-500 rounded-full pulse-slow opacity-40"></div>
      <div className="absolute top-32 right-32 w-2 h-2 bg-red-400 rounded-full pulse-slow opacity-30"></div>
      <div className="absolute bottom-32 left-32 w-4 h-4 bg-red-600 rounded-full pulse-slow opacity-35"></div>
      <div className="absolute bottom-20 right-20 w-2 h-2 bg-red-500 rounded-full pulse-slow opacity-25"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10 fade-in">
        <div className="mb-8">
          <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium glass-effect text-navy-200 accent-dot">
            🚀 New: Interactive Coding Challenges
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold mb-6 slide-up">
          <span className="text-red-gradient">Master Code Like a</span>
          <br />
          <span className="text-navy-50">Vampire</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-navy-300 mb-8 max-w-3xl mx-auto slide-up leading-relaxed">
          Sink your teeth into programming with our immersive, bite-sized lessons. 
          Learn to code with the hunger of a vampire and the precision of a master.
        </p>
        
        <div className="mb-8 slide-up">
          <WorldIDVerification />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 slide-up">
          <button className="px-10 py-4 bg-red-gradient text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-red-500/25 glow-effect">
            Start Your Journey
          </button>
          <button className="px-10 py-4 glass-effect text-navy-200 font-semibold rounded-xl hover:bg-navy-700/50 transition-all duration-300 border border-navy-600">
            ▶ Watch Demo
          </button>
        </div>
        
        {/* Modern Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto slide-up">
          <div className="glass-effect rounded-2xl p-8 hover:bg-navy-700/30 transition-all duration-300 hover:scale-105 group">
            <div className="text-4xl font-bold text-red-gradient mb-3">10K+</div>
            <div className="text-navy-200 text-lg font-medium">Active Learners</div>
            <div className="text-sm text-navy-400 mt-1">Join the coven</div>
            <div className="mt-4 h-1 bg-red-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
          </div>
          <div className="glass-effect rounded-2xl p-8 hover:bg-navy-700/30 transition-all duration-300 hover:scale-105 group">
            <div className="text-4xl font-bold text-red-gradient mb-3">500+</div>
            <div className="text-navy-200 text-lg font-medium">Coding Challenges</div>
            <div className="text-sm text-navy-400 mt-1">Bite-sized lessons</div>
            <div className="mt-4 h-1 bg-red-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
          </div>
          <div className="glass-effect rounded-2xl p-8 hover:bg-navy-700/30 transition-all duration-300 hover:scale-105 group">
            <div className="text-4xl font-bold text-red-gradient mb-3">24/7</div>
            <div className="text-navy-200 text-lg font-medium">Learning Support</div>
            <div className="text-sm text-navy-400 mt-1">Never sleep</div>
            <div className="mt-4 h-1 bg-red-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
          </div>
        </div>
      </div>
      
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-600/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Hero; 