
import React from 'react'
import { useVerification } from '../utils/VerificationContext'
import WorldIDVerification from './WorldIDVerification'

const Header = () => {
  const { isVerified, clearVerification } = useVerification()

  return (
    <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-red-500">
                🧛‍♂️ Code<span className="text-white">Vamp</span>
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Features
              </a>
              <a href="#about" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                About
              </a>
              <a href="#contact" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Contact
              </a>
            </div>
          </nav>

          {/* Verification Status */}
          <div className="hidden md:block">
            {isVerified ? (
              <div className="flex items-center space-x-4">
                <span className="text-green-400 text-sm font-medium">✓ Verified Human</span>
                <button 
                  onClick={clearVerification}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                >
                  Clear
                </button>
              </div>
            ) : (
              <WorldIDVerification />
            )}
          </div>

          {/* Mobile Verification */}
          <div className="md:hidden">
            {isVerified ? (
              <div className="flex items-center space-x-2">
                <span className="text-green-400 text-xs">✓ Verified</span>
                <button 
                  onClick={clearVerification}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-lg font-medium transition-colors text-xs"
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