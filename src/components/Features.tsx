const Features = () => {
  const features = [
    {
      icon: "💻",
      title: "Interactive Coding",
      description: "Learn by doing with our hands-on coding environment. Write, test, and debug code in real-time.",
      accent: "from-blue-500 to-cyan-500"
    },
    {
      icon: "🎯",
      title: "Personalized Learning",
      description: "AI-powered curriculum that adapts to your learning style and pace for maximum efficiency.",
      accent: "from-purple-500 to-pink-500"
    },
    {
      icon: "🏆",
      title: "Gamified Progress",
      description: "Earn badges, level up, and compete with other vampires as you master new skills.",
      accent: "from-yellow-500 to-orange-500"
    },
    {
      icon: "👥",
      title: "Community Support",
      description: "Join a thriving community of developers ready to help you on your coding journey.",
      accent: "from-green-500 to-emerald-500"
    },
    {
      icon: "📱",
      title: "Mobile Learning",
      description: "Code anywhere, anytime with our mobile-optimized platform and offline capabilities.",
      accent: "from-indigo-500 to-blue-500"
    },
    {
      icon: "🚀",
      title: "Career Ready",
      description: "Build real projects and create a portfolio that showcases your skills to employers.",
      accent: "from-red-500 to-pink-500"
    }
  ]

  return (
    <section id="features" className="py-20 lg:py-32 bg-gradient-to-b from-gray-950 via-gray-900/50 to-gray-950 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-red-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Enhanced section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-900/30 border border-red-700/50 text-red-300 text-sm font-medium mb-6">
            <span className="mr-2">⚡</span>
            Features
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-purple-600">CodeVamp</span>?
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Transform your coding skills with our unique approach to programming education. 
            <br className="hidden sm:block" />
            Join thousands of developers who've already <span className="text-red-300">embraced their inner code vampire</span>.
          </p>
        </div>

        {/* Enhanced features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-red-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/10"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-red-100 transition-colors duration-300">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed text-lg group-hover:text-gray-200 transition-colors duration-300">{feature.description}</p>
              </div>
              
              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/0 via-red-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center">
          <div className="relative bg-gradient-to-r from-red-950/50 via-gray-900/50 to-purple-950/50 border border-red-800/30 rounded-3xl p-12 md:p-16 backdrop-blur-sm overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-900/40 border border-red-700/60 text-red-200 text-sm font-medium mb-6">
                <span className="mr-2">🩸</span>
                Join the Coven
              </div>
              
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
                Ready to Unleash Your 
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600">
                  Coding Potential?
                </span>
              </h3>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                Join CodeVamp today and start your transformation from coding novice to programming master. 
                <br className="hidden sm:block" />
                Your journey to becoming a <span className="text-red-300">code vampire</span> starts now.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-red-500/30 border border-red-500/50">
                  <span className="relative z-10">Start Free Trial</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </button>
                <button className="group border-2 border-gray-600 hover:border-red-500/50 text-gray-300 hover:text-white px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 hover:bg-red-900/20 backdrop-blur-sm">
                  <span className="flex items-center">
                    <span className="mr-2">💰</span>
                    View Pricing
                  </span>
                </button>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-red-500/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features 