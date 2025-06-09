import { useVerification } from '../utils/VerificationContext'
import WorldIDVerification from './WorldIDVerification'

const Header = () => {
  const { isVerified, clearVerification } = useVerification()

  return (
    <header className="bg-gray-950/80 backdrop-blur-md border-b border-red-900/20 sticky top-0 z-50 shadow-lg shadow-red-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Enhanced Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 via-red-400 to-purple-600 bg-clip-text text-transparent">
                🧛‍♂️ Code<span className="text-white">Vamp</span>
              </h1>
            </div>
          </div>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#features" className="group relative text-gray-300 hover:text-red-300 px-4 py-2 rounded-lg text-lg font-medium transition-all duration-300 hover:bg-red-900/20">
                Features
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#about" className="group relative text-gray-300 hover:text-red-300 px-4 py-2 rounded-lg text-lg font-medium transition-all duration-300 hover:bg-red-900/20">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#contact" className="group relative text-gray-300 hover:text-red-300 px-4 py-2 rounded-lg text-lg font-medium transition-all duration-300 hover:bg-red-900/20">
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>
          </nav>

          {/* Enhanced Verification Status */}
          <div className="hidden md:block">
            {isVerified ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-green-900/30 border border-green-700/50 rounded-lg px-4 py-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-green-300 text-lg font-medium">Verified Human</span>
                </div>
                <button 
                  onClick={clearVerification}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg border border-gray-600"
                >
                  Clear
                </button>
              </div>
            ) : (
              <WorldIDVerification />
            )}
          </div>

          {/* Enhanced Mobile Verification */}
          <div className="md:hidden">
            {isVerified ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 bg-green-900/30 border border-green-700/50 rounded-lg px-3 py-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-green-300 text-sm font-medium">Verified</span>
                </div>
                <button 
                  onClick={clearVerification}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-lg font-medium transition-all duration-300 text-sm border border-gray-600"
                >
                  Clear
                </button>
              </div>
            ) : (
              <WorldIDVerification />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 