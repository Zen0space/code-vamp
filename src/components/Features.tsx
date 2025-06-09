const Features = () => {
  const features = [
    {
      icon: "💻",
      title: "Interactive Coding",
      description: "Learn by doing with our hands-on coding environment. Write, test, and debug code in real-time."
    },
    {
      icon: "🎯",
      title: "Personalized Learning",
      description: "AI-powered curriculum that adapts to your learning style and pace for maximum efficiency."
    },
    {
      icon: "🏆",
      title: "Gamified Progress",
      description: "Earn badges, level up, and compete with other vampires as you master new skills."
    },
    {
      icon: "👥",
      title: "Community Support",
      description: "Join a thriving community of developers ready to help you on your coding journey."
    },
    {
      icon: "📱",
      title: "Mobile Learning",
      description: "Code anywhere, anytime with our mobile-optimized platform and offline capabilities."
    },
    {
      icon: "🚀",
      title: "Career Ready",
      description: "Build real projects and create a portfolio that showcases your skills to employers."
    }
  ]

  return (
    <section id="features" className="py-20 lg:py-32 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Why Choose <span className="text-red-500">CodeVamp</span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transform your coding skills with our unique approach to programming education. 
            Join thousands of developers who've already embraced their inner code vampire.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-red-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-red-900/30 to-purple-900/30 border border-red-800/50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Unleash Your Coding Potential?
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join CodeVamp today and start your transformation from coding novice to programming master. 
              Your journey to becoming a code vampire starts now.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                Start Free Trial
              </button>
              <button className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
                View Pricing
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features 