/**
 * World ID Face Authentication utilities
 * 
 * Note: World ID Face Authentication is automatically enabled when users verify at an Orb.
 * This is not a separate API that developers can trigger, but rather an internal security
 * feature of World App that uses encrypted facial images stored on the user's device.
 */

export interface WorldIDFaceAuthStatus {
  isOrbVerified: boolean
  hasFaceAuth: boolean
  faceAuthEnabled: boolean
  lastVerificationLevel: string
}

/**
 * Check if the user likely has World ID Face Authentication enabled
 * This is inferred from their verification level and history
 */
export function checkFaceAuthStatus(verificationData: any): WorldIDFaceAuthStatus {
  if (!verificationData) {
    return {
      isOrbVerified: false,
      hasFaceAuth: false,
      faceAuthEnabled: false,
      lastVerificationLevel: 'none'
    }
  }

  // Check if user was verified at Orb level (which enables Face Auth)
  const isOrbVerified = verificationData.verification_level === 'orb'
  
  // Face Auth is automatically enabled for Orb-verified users
  const hasFaceAuth = isOrbVerified
  
  return {
    isOrbVerified,
    hasFaceAuth,
    faceAuthEnabled: hasFaceAuth,
    lastVerificationLevel: verificationData.verification_level || 'none'
  }
}

/**
 * Get user-friendly description of World ID Face Authentication status
 */
export function getFaceAuthDescription(status: WorldIDFaceAuthStatus): string {
  if (status.faceAuthEnabled) {
    return "Face Authentication is enabled. Your World ID is protected by encrypted facial recognition stored securely on your device."
  } else if (status.isOrbVerified) {
    return "You're Orb-verified! Face Authentication should be available for enhanced security."
  } else {
    return "Face Authentication requires Orb verification. Visit a World ID Orb location to enable this feature."
  }
}

/**
 * Get the appropriate icon for Face Authentication status
 */
export function getFaceAuthIcon(status: WorldIDFaceAuthStatus): string {
  if (status.faceAuthEnabled) {
    return "🔐" // Locked with key (secure)
  } else if (status.isOrbVerified) {
    return "👁️" // Eye (Orb verified)
  } else {
    return "🌐" // Globe (needs Orb verification)
  }
}

/**
 * Check if Face Authentication is likely available based on verification data
 */
export function isFaceAuthAvailable(verificationData: any): boolean {
  const status = checkFaceAuthStatus(verificationData)
  return status.faceAuthEnabled
}

/**
 * Get recommendations for enabling Face Authentication
 */
export function getFaceAuthRecommendations(status: WorldIDFaceAuthStatus): string[] {
  const recommendations: string[] = []
  
  if (!status.isOrbVerified) {
    recommendations.push("Visit a World ID Orb location to get verified and enable Face Authentication")
    recommendations.push("Orb verification provides the highest level of security and unlocks Face Authentication")
  }
  
  if (status.isOrbVerified && !status.faceAuthEnabled) {
    recommendations.push("Face Authentication should be automatically enabled after Orb verification")
    recommendations.push("Check your World App settings to ensure Face Authentication is active")
  }
  
  if (status.faceAuthEnabled) {
    recommendations.push("Your World ID is protected by Face Authentication")
    recommendations.push("Facial recognition data is encrypted and stored only on your device")
  }
  
  return recommendations
}

/**
 * Simulate checking if Face Authentication is working (for demo purposes)
 * In a real app, this would be handled internally by World App
 */
export function simulateFaceAuthCheck(): Promise<boolean> {
  return new Promise((resolve) => {
    // Simulate Face Authentication check delay
    setTimeout(() => {
      // Randomly succeed/fail for demo purposes
      const success = Math.random() > 0.2 // 80% success rate
      resolve(success)
    }, 1500)
  })
} 