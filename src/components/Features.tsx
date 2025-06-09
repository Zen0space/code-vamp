import React from 'react';

const Features: React.FC = () => {
  const features = [
    {
      icon: '🧛‍♂️',
      title: 'Immersive Learning',
      description: 'Dive deep into code with our vampire-themed interactive lessons that make learning addictive.',
      accent: 'red-500'
    },
    {
      icon: '🩸',
      title: 'Bite-sized Challenges',
      description: 'Master programming concepts through small, digestible challenges that build your skills progressively.',
      accent: 'red-600'
    },
    {
      icon: '🌙',
      title: 'Night Mode Learning',
      description: 'Perfect for night owls and vampires alike. Learn coding in a dark, comfortable environment.',
      accent: 'red-700'
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Get instant feedback and see your progress in real-time as you complete each challenge.',
      accent: 'red-400'
    },
    {
      icon: '🏆',
      title: 'Achievement System',
      description: 'Unlock badges and achievements as you progress through your coding journey.',
      accent: 'red-500'
    },
    {
      icon: '👥',
      title: 'Community Coven',
      description: 'Join a community of fellow learners and share your coding victories and struggles.',
      accent: 'red-600'
    }
  ];

  return (
    <section className="py-24 bg-dark-gradient-radial relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 fade-in">
          <div className="inline-flex items-center px-6 py-3 rounded-full glass-effect text-navy-300 text-sm font-medium mb-8 accent-dot">
            ✨ Features
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-red-gradient">Why Choose</span>
            <br />
            <span className="text-navy-50">CodeVamp?</span>
          </h2>
          <p className="text-xl text-navy-300 max-w-3xl mx-auto leading-relaxed">
            Experience coding education like never before with our vampire-themed learning platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 slide-up">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group glass-effect rounded-2xl p-8 hover:bg-navy-700/30 transition-all duration-500 hover:scale-105 hover:border-red-500/30 relative overflow-hidden"
            >
              <div className="text-4xl mb-6 pulse-slow">{feature.icon}</div>
              <h3 className="text-xl font-bold text-navy-50 mb-4 group-hover:text-red-gradient transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-navy-300 leading-relaxed mb-6">
                {feature.description}
              </p>
              <div className={`h-1 bg-${feature.accent} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
              
              {/* Subtle glow effect on hover */}
              <div className="absolute inset-0 bg-red-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* Modern CTA Section */}
        <div className="text-center mt-24 fade-in">
          <div className="glass-effect rounded-3xl p-12 max-w-4xl mx-auto relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl md:text-5xl font-bold mb-6">
                <span className="text-red-gradient">Ready to Join the Coven?</span>
              </h3>
              <p className="text-xl text-navy-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                Start your journey into the dark arts of programming. Embrace the night and become a coding vampire.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="px-10 py-4 bg-red-gradient text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-red-500/25 glow-effect">
                  Begin Your Transformation
                </button>
                <button className="px-10 py-4 glass-effect text-navy-200 font-bold rounded-xl hover:bg-navy-700/50 transition-all duration-300 border border-navy-600">
                  View Curriculum
                </button>
              </div>
            </div>
            
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-600/10 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Ambient lighting effects */}
        <div className="absolute top-32 left-16 w-4 h-4 bg-red-500 rounded-full pulse-slow opacity-20"></div>
        <div className="absolute bottom-32 right-16 w-3 h-3 bg-red-400 rounded-full pulse-slow opacity-25"></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-red-600 rounded-full pulse-slow opacity-15"></div>
      </div>
    </section>
  );
};

export default Features; 