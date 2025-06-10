import React from 'react'
import { isFaceIDAvailable, isTouchIDAvailable, getPreferredBiometricMethod, isInWorldApp } from '../utils/deviceDetection'
import { getOptimalVerificationLevel } from '../utils/minikit'
import { VerificationLevel } from '@worldcoin/minikit-js'

const BiometricInfo: React.FC = () => {
  const faceIDAvailable = isFaceIDAvailable()
  const touchIDAvailable = isTouchIDAvailable()
  const preferredMethod = getPreferredBiometricMethod()
  const inWorldApp = isInWorldApp()
  const verificationLevel = getOptimalVerificationLevel()

  return (
    <div className="bg-navy-800/50 backdrop-blur-sm border border-navy-700/50 rounded-lg p-4 space-y-3">
      <h3 className="text-lg font-semibold text-white mb-3">Device Capabilities</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-navy-300">Face ID Available:</span>
          <span className={`font-semibold ${faceIDAvailable ? 'text-green-400' : 'text-red-400'}`}>
            {faceIDAvailable ? '✓ Yes' : '✗ No'}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-navy-300">Touch ID Available:</span>
          <span className={`font-semibold ${touchIDAvailable ? 'text-green-400' : 'text-red-400'}`}>
            {touchIDAvailable ? '✓ Yes' : '✗ No'}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-navy-300">Preferred Method:</span>
          <span className="font-semibold text-blue-400 capitalize">
            {preferredMethod === 'none' ? 'None Available' : `${preferredMethod} ID`}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-navy-300">In World App:</span>
          <span className={`font-semibold ${inWorldApp ? 'text-green-400' : 'text-yellow-400'}`}>
            {inWorldApp ? '✓ Yes' : '⚠ No'}
          </span>
        </div>
        
        <div className="flex items-center justify-between md:col-span-2">
          <span className="text-navy-300">Verification Level:</span>
          <span className="font-semibold text-purple-400">
            {verificationLevel === VerificationLevel.Device ? 'Device (Biometric)' : 'Orb (Physical)'}
          </span>
        </div>
      </div>
      
      {!inWorldApp && (
        <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-yellow-400 text-sm">
            <strong>Note:</strong> This app should be opened in World App for full functionality.
          </p>
        </div>
      )}
      
      {faceIDAvailable && (
        <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
          <p className="text-green-400 text-sm">
            <strong>Face ID Detected:</strong> World ID verification will use your device's Face ID for a seamless experience.
          </p>
        </div>
      )}
    </div>
  )
}

export default BiometricInfo 