import { useVerification } from '../utils/VerificationContext'
import { useEffect, useState } from 'react'
import { initializeMiniKitVerification, triggerWorldIDVerification } from '../utils/minikit'
import { isFaceAuthAvailable, simulateFaceAuthCheck } from '../utils/worldIdFaceAuth'

const WorldIDVerification = () => {
  const { setVerified, isVerified, verificationData } = useVerification()
  const [worldIdFaceAuth, setWorldIdFaceAuth] = useState(false)
  const [isFaceAuthLoading, setIsFaceAuthLoading] = useState(false)

  useEffect(() => {
    // Initialize MiniKit verification

    initializeMiniKitVerification(
      (result) => {
        // Convert MiniKit result to ISuccessResult format
        setVerified({
          merkle_root: result.merkle_root,
          nullifier_hash: result.nullifier_hash,
          proof: result.proof,
          verification_level: result.verification_level
        })
      },
      (error) => {
        console.error('World ID verification failed:', error)
      }
    )
  }, [setVerified])

  useEffect(() => {
    // Check World ID Face Authentication status
    if (verificationData) {
      const faceAuthAvailable = isFaceAuthAvailable(verificationData)
      setWorldIdFaceAuth(faceAuthAvailable)
    }
  }, [verificationData])

  const handleVerify = async () => {
    try {
      await triggerWorldIDVerification(
        import.meta.env.VITE_PUBLIC_WLD_ACTION!, // Your action identifier
        '', // Optional signal for verification
      )
    } catch (error) {
      console.error('Failed to trigger World ID verification:', error)
      // Show user-friendly error
      alert('Failed to verify World ID. Please make sure you are using World App.')
    }
  }

  const handleVerifiedClick = async () => {
    if (!isVerified || isFaceAuthLoading) return
    
    // Trigger World ID Face Authentication when verified button is clicked
    if (worldIdFaceAuth) {
      setIsFaceAuthLoading(true)
      try {
        console.log('Triggering World ID Face Authentication...')
        const result = await simulateFaceAuthCheck()
        
        if (result) {
          alert('✅ World ID Face Authentication successful! You are now authenticated.')
        } else {
          alert('❌ Face Authentication failed. Please try again or use alternative verification.')
        }
      } catch (error) {
        console.error('Face Authentication failed:', error)
        alert('❌ Face Authentication error. Please try again.')
      } finally {
        setIsFaceAuthLoading(false)
      }
    } else {
      // Show info about Face Authentication
      alert('ℹ️ Face Authentication requires Orb verification. Visit a World ID Orb location to enable this feature.')
    }
  }

  if (isVerified) {
    return (
      <div className="flex flex-col items-center space-y-1">
        <button 
          onClick={handleVerifiedClick}
          disabled={isFaceAuthLoading}
          className={`${
            isFaceAuthLoading 
              ? 'bg-blue-600 cursor-wait' 
              : worldIdFaceAuth 
                ? 'bg-purple-600 hover:bg-purple-700' 
                : 'bg-green-600 hover:bg-green-700'
          } text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 cursor-pointer disabled:scale-100`}
        >
          {isFaceAuthLoading 
            ? '🔄 Authenticating...' 
            : worldIdFaceAuth 
              ? '🔐 Face Auth' 
              : '✓ Verified'
          }
        </button>
        <span className="text-xs text-green-400 opacity-75">
          {isFaceAuthLoading 
            ? 'Processing Face Authentication...' 
            : worldIdFaceAuth 
              ? 'Click to use Face Auth' 
              : 'Orb Verification'
          }
        </span>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center space-y-1">
      <button 
        onClick={handleVerify}
        className="bg-red-gradient text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-md hover:shadow-red-500/25"
      >
        Sign in with World ID
      </button>
      <span className="text-xs text-navy-400 opacity-75">
        Face Auth available after Orb verification
      </span>
    </div>
  )
}

export default WorldIDVerification 