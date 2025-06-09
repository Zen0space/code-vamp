const Hero = () => {
  return (
    <section className="relative py-16 lg:py-24 xl:py-32 overflow-hidden min-h-screen flex items-center">
      {/* Enhanced background with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-gray-950 to-purple-950/30"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent"></div>
      
      {/* Animated blood drops effect */}
      <div className="absolute top-20 left-1/4 w-2 h-2 bg-red-500 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute top-32 right-1/3 w-1 h-1 bg-red-400 rounded-full opacity-40 animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-1/3 w-1.5 h-1.5 bg-red-600 rounded-full opacity-50 animate-pulse delay-500"></div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center">
          {/* Enhanced badge with glow effect */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-red-900/40 border border-red-700/60 text-red-200 text-sm font-medium mb-8 shadow-lg shadow-red-900/25 backdrop-blur-sm">
            <span className="mr-2 text-lg">🩸</span>
            New: Interactive Coding Challenges
            <span className="ml-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </div>

          {/* Enhanced main headline with better responsive sizing */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-8 leading-tight">
            <span className="block">Master Code Like a</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-purple-600 drop-shadow-2xl">
              Vampire
            </span>
          </h1>

          {/* Enhanced subheadline with better typography */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            Sink your teeth into programming with our immersive, bite-sized lessons. 
            <br className="hidden sm:block" />
            <span className="text-red-300">Learn to code with the hunger of a vampire</span> and the precision of a master.
          </p>

          {/* Enhanced CTA section */}
          <div className="mb-16">
            <p className="text-gray-400 text-lg mb-6 font-medium">🔒 Verify your humanity to start learning</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-red-500/30 border border-red-500/50">
                <span className="relative z-10">Start Your Journey</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
              <button className="group border-2 border-gray-600 hover:border-red-500/50 text-gray-300 hover:text-white px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 hover:bg-red-900/20 backdrop-blur-sm">
                <span className="flex items-center">
                  <span className="mr-2">▶</span>
                  Watch Demo
                </span>
              </button>
            </div>
          </div>

          {/* Enhanced stats with better visual design */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="group text-center p-6 rounded-2xl bg-gray-900/30 border border-gray-800/50 hover:border-red-500/30 transition-all duration-300 backdrop-blur-sm">
              <div className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400 mb-3">10K+</div>
              <div className="text-gray-400 text-lg font-medium">Active Learners</div>
              <div className="text-sm text-gray-500 mt-1">Join the coven</div>
            </div>
            <div className="group text-center p-6 rounded-2xl bg-gray-900/30 border border-gray-800/50 hover:border-red-500/30 transition-all duration-300 backdrop-blur-sm">
              <div className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400 mb-3">500+</div>
              <div className="text-gray-400 text-lg font-medium">Coding Challenges</div>
              <div className="text-sm text-gray-500 mt-1">Bite-sized lessons</div>
            </div>
            <div className="group text-center p-6 rounded-2xl bg-gray-900/30 border border-gray-800/50 hover:border-red-500/30 transition-all duration-300 backdrop-blur-sm">
              <div className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400 mb-3">24/7</div>
              <div className="text-gray-400 text-lg font-medium">Learning Support</div>
              <div className="text-sm text-gray-500 mt-1">Never sleep</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced decorative elements with glow effects */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-red-600/15 rounded-full blur-2xl animate-pulse delay-500"></div>
      
      {/* Subtle animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/50 via-transparent to-transparent pointer-events-none"></div>
    </section>
  )
}

export default Hero 