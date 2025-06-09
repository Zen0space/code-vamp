import { useVerification } from '../utils/VerificationContext'
import { useEffect } from 'react'
import { initializeMiniKitVerification, triggerWorldIDVerification, isInWorldApp } from '../utils/minikit'

const WorldIDVerification = () => {
  const { setVerified, isVerified } = useVerification()

  useEffect(() => {
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

  const handleVerify = async () => {
    try {
      await triggerWorldIDVerification(
        import.meta.env.VITE_PUBLIC_WLD_ACTION!, // Your action identifier
        '', // Optional signal for verification
      )
    } catch (error) {
      console.error('Failed to trigger World ID verification:', error)
      // Show user-friendly error if not in World App
      if (!isInWorldApp()) {
        alert('This app must be opened in World App to verify your World ID.')
      }
    }
  }

  if (isVerified) {
    return (
      <button 
        className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 cursor-default"
        disabled
      >
        ✓ Verified
      </button>
    )
  }

  return (
    <button 
      onClick={handleVerify}
      className="bg-red-gradient text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-md hover:shadow-red-500/25"
    >
      Sign in with World ID
    </button>
  )
}

export default WorldIDVerification 