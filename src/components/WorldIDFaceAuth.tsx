import React, { useState, useEffect } from 'react'
import { useVerification } from '../utils/VerificationContext'
import { 
  checkFaceAuthStatus, 
  getFaceAuthDescription, 
  getFaceAuthIcon, 
  getFaceAuthRecommendations,
  simulateFaceAuthCheck,
  WorldIDFaceAuthStatus 
} from '../utils/worldIdFaceAuth'

const WorldIDFaceAuth: React.FC = () => {
  const { verificationData, isVerified } = useVerification()
  const [faceAuthStatus, setFaceAuthStatus] = useState<WorldIDFaceAuthStatus>({
    isOrbVerified: false,
    hasFaceAuth: false,
    faceAuthEnabled: false,
    lastVerificationLevel: 'none'
  })
  const [isTestingFaceAuth, setIsTestingFaceAuth] = useState(false)
  const [faceAuthTestResult, setFaceAuthTestResult] = useState<boolean | null>(null)

  useEffect(() => {
    if (verificationData) {
      const status = checkFaceAuthStatus(verificationData)
      setFaceAuthStatus(status)
    }
  }, [verificationData])

  const handleTestFaceAuth = async () => {
    if (!faceAuthStatus.faceAuthEnabled) return
    
    setIsTestingFaceAuth(true)
    setFaceAuthTestResult(null)
    
    try {
      const result = await simulateFaceAuthCheck()
      setFaceAuthTestResult(result)
    } catch (error) {
      console.error('Face Auth test failed:', error)
      setFaceAuthTestResult(false)
    } finally {
      setIsTestingFaceAuth(false)
    }
  }

  if (!isVerified) {
    return (
      <div className="bg-navy-800/30 backdrop-blur-sm border border-navy-700/50 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">🌐</span>
          <div>
            <h4 className="text-white font-semibold">World ID Face Authentication</h4>
            <p className="text-navy-300 text-sm">Verify with World ID to check Face Authentication status</p>
          </div>
        </div>
      </div>
    )
  }

  const icon = getFaceAuthIcon(faceAuthStatus)
  const description = getFaceAuthDescription(faceAuthStatus)
  const recommendations = getFaceAuthRecommendations(faceAuthStatus)

  return (
    <div className="bg-navy-800/50 backdrop-blur-sm border border-navy-700/50 rounded-lg p-6 space-y-4">
      <div className="flex items-start space-x-4">
        <span className="text-3xl">{icon}</span>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-2">World ID Face Authentication</h3>
          <p className="text-navy-200 text-sm leading-relaxed mb-4">{description}</p>
          
          {/* Status Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div className="flex items-center justify-between bg-navy-700/30 rounded-lg p-3">
              <span className="text-navy-300 text-sm">Orb Verified:</span>
              <span className={`font-semibold text-sm ${faceAuthStatus.isOrbVerified ? 'text-green-400' : 'text-yellow-400'}`}>
                {faceAuthStatus.isOrbVerified ? '✓ Yes' : '⚠ No'}
              </span>
            </div>
            
            <div className="flex items-center justify-between bg-navy-700/30 rounded-lg p-3">
              <span className="text-navy-300 text-sm">Face Auth Enabled:</span>
              <span className={`font-semibold text-sm ${faceAuthStatus.faceAuthEnabled ? 'text-green-400' : 'text-red-400'}`}>
                {faceAuthStatus.faceAuthEnabled ? '✓ Enabled' : '✗ Disabled'}
              </span>
            </div>
            
            <div className="flex items-center justify-between bg-navy-700/30 rounded-lg p-3 md:col-span-2">
              <span className="text-navy-300 text-sm">Verification Level:</span>
              <span className="font-semibold text-purple-400 text-sm capitalize">
                {faceAuthStatus.lastVerificationLevel}
              </span>
            </div>
          </div>

          {/* Test Face Auth Button */}
          {faceAuthStatus.faceAuthEnabled && (
            <div className="mb-4">
              <button
                onClick={handleTestFaceAuth}
                disabled={isTestingFaceAuth}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:opacity-50"
              >
                {isTestingFaceAuth ? '🔄 Testing Face Auth...' : '🧪 Test Face Authentication'}
              </button>
              
              {faceAuthTestResult !== null && (
                <div className={`mt-2 p-3 rounded-lg ${faceAuthTestResult ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                  <p className={`text-sm ${faceAuthTestResult ? 'text-green-400' : 'text-red-400'}`}>
                    {faceAuthTestResult 
                      ? '✅ Face Authentication test successful!' 
                      : '❌ Face Authentication test failed. Please try again.'}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Recommendations */}
          <div className="space-y-2">
            <h4 className="text-white font-medium text-sm">Recommendations:</h4>
            <ul className="space-y-1">
              {recommendations.map((rec, index) => (
                <li key={index} className="flex items-start space-x-2 text-navy-300 text-sm">
                  <span className="text-blue-400 mt-0.5">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <span className="text-blue-400 text-lg">ℹ️</span>
          <div>
            <h5 className="text-blue-400 font-semibold text-sm mb-1">About World ID Face Authentication</h5>
            <p className="text-blue-300 text-xs leading-relaxed">
              Face Authentication is automatically enabled when you verify at a World ID Orb. 
              Your facial recognition data is encrypted and stored securely on your device only - 
              it's never shared with third parties or stored on external servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorldIDFaceAuth 