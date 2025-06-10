import { MiniKit } from '@worldcoin/minikit-js'
import { VerificationProvider, useVerification } from './utils/VerificationContext'
// Lazy load database utilities
const loadDatabaseUtils = () => import('./utils/database')
import { useState, useEffect, lazy, Suspense } from 'react'

// Lazy load the WorldIDVerification component
const WorldIDVerification = lazy(() => import('./components/WorldIDVerification'))

// Initialize MiniKit for World App integration
if (typeof window !== 'undefined') {
  MiniKit.install(import.meta.env.VITE_PUBLIC_MINIKIT_APP_ID || 'app_812ac0842eb746d6a8bbe07db8b7cc1e')
}



function App() {
  return (
    <VerificationProvider>
      <AppContent />
    </VerificationProvider>
  )
}

function AppContent() {
  const { isVerified, verificationData } = useVerification()
  const [isJoiningWaitlist, setIsJoiningWaitlist] = useState(false)
  const [hasJoinedWaitlist, setHasJoinedWaitlist] = useState(false)
  const [waitlistCount, setWaitlistCount] = useState(500) // Default count
  const [joinError, setJoinError] = useState<string | null>(null)

  // Load waitlist count on component mount
  useEffect(() => {
    const loadWaitlistCount = async () => {
      try {
        const { getWaitlistCount } = await loadDatabaseUtils()
        const count = await getWaitlistCount()
        setWaitlistCount(count > 0 ? count : 500) // Use actual count or fallback
      } catch (error) {
        console.error('Error loading waitlist count:', error)
      }
    }
    
    loadWaitlistCount()
  }, [])

  const handleJoinWaitlist = async () => {
    if (!isVerified || !verificationData) return

    setIsJoiningWaitlist(true)
    setJoinError(null)
    
    try {
      // Load database utilities dynamically
      const { addUserToWaitlist, getWaitlistCount } = await loadDatabaseUtils()
      
      // Store user in database with encrypted user ID
      const success = await addUserToWaitlist(
        verificationData.nullifier_hash, // Use nullifier hash as user ID
        verificationData.verification_level,
        verificationData.nullifier_hash
      )
      
      if (success) {
        setHasJoinedWaitlist(true)
        // Update waitlist count
        const newCount = await getWaitlistCount()
        setWaitlistCount(newCount)
      } else {
        setJoinError('You are already on the waitlist!')
      }
    } catch (error) {
      console.error('Error joining waitlist:', error)
      setJoinError('Failed to join waitlist. Please try again.')
    } finally {
      setIsJoiningWaitlist(false)
    }
  }

  const getWaitlistButtonText = () => {
    if (isJoiningWaitlist) return '🔄 Joining Waitlist...'
    if (hasJoinedWaitlist) return '✅ Joined Waitlist'
    return '🧛‍♂️ Join Waitlist with World ID'
  }

  return (
    <div className="min-h-screen bg-navy-950 text-white flex items-center justify-center relative overflow-hidden">
      {/* Enhanced Background elements with modern blur effects */}
      <div className="absolute inset-0 bg-dark-gradient-radial opacity-60"></div>
      
      {/* Large floating blur orbs */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-red-500/20 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute top-20 right-16 w-24 h-24 bg-red-400/15 rounded-full blur-2xl opacity-30"></div>
      <div className="absolute bottom-20 left-16 w-40 h-40 bg-red-600/25 rounded-full blur-3xl opacity-35"></div>
      <div className="absolute bottom-32 right-12 w-28 h-28 bg-red-500/20 rounded-full blur-2xl opacity-25"></div>
      
      {/* Medium floating orbs */}
      <div className="absolute top-1/3 left-1/4 w-20 h-20 bg-red-300/10 rounded-full blur-xl opacity-20"></div>
      <div className="absolute top-2/3 right-1/3 w-16 h-16 bg-red-400/15 rounded-full blur-lg opacity-25"></div>
      <div className="absolute top-1/2 left-1/6 w-12 h-12 bg-red-500/20 rounded-full blur-md opacity-30"></div>
      
      {/* Backdrop blur layers for glassmorphism */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-red-500/5 to-transparent backdrop-blur-sm"></div>
      <div className="absolute bottom-0 right-0 w-full h-1/3 bg-gradient-to-t from-red-600/5 to-transparent backdrop-blur-sm"></div>
      
      {/* Ambient lighting with enhanced blur */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/8 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-600/10 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-400/6 rounded-full blur-2xl opacity-30"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10 max-w-sm">

          {/* Title */}
          <h1 className="text-3xl font-bold mb-4">
            <span className="text-red-gradient">Master Code Like a</span>
            <br />
            <span className="text-navy-50">Vampire</span>
          </h1>
          
          {/* Description */}
          <p className="text-sm text-navy-300 mb-4 leading-relaxed">
            Sink your teeth into programming with our immersive, bite-sized lessons. 
            Learn to code with the hunger of a vampire and the precision of a master.
          </p>

          <p className="text-xs text-navy-400 mb-6">
            🚀 Coming Soon: Interactive coding challenges, AI-powered mentorship, and a community of coding vampires.
          </p>

          {/* World ID Verification */}
          <div className="mb-6">
            <Suspense fallback={
              <div className="flex items-center justify-center p-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500"></div>
              </div>
            }>
              <WorldIDVerification />
            </Suspense>
          </div>

          {/* Waitlist Section */}
          <div className="mb-6">
            {hasJoinedWaitlist ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="text-green-400 text-xl mb-2">✅</div>
                <h3 className="text-green-400 font-semibold mb-1">Welcome to the Coven!</h3>
                <p className="text-green-300 text-xs">
                  You're on our waitlist with World ID verification. We'll notify you when CodeVamp launches.
                </p>
                {verificationData && (
                  <p className="text-green-400 text-xs mt-2">
                    Verification Level: {verificationData.verification_level}
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {!isVerified && (
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <div className="text-blue-400 text-lg mb-1">🔐</div>
                    <h3 className="text-blue-400 font-semibold mb-1">Verify with World ID</h3>
                    <p className="text-blue-300 text-xs">
                      Join our exclusive waitlist by verifying your World ID above. No email required!
                    </p>
                  </div>
                )}
                
                {isVerified && (
                  <button
                    onClick={handleJoinWaitlist}
                    disabled={isJoiningWaitlist}
                    className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white font-semibold rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 glow-effect disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed text-sm"
                  >
                    {getWaitlistButtonText()}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Error message */}
          {joinError && (
            <div className="mb-4 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <p className="text-red-400 text-xs">{joinError}</p>
            </div>
          )}

          {/* Compact Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="glass-effect rounded-lg p-3 hover:bg-navy-700/30 transition-all duration-300">
              <div className="text-lg font-bold text-red-gradient mb-1">{waitlistCount}+</div>
              <div className="text-navy-200 text-xs font-medium">Early Adopters</div>
            </div>
            <div className="glass-effect rounded-lg p-3 hover:bg-navy-700/30 transition-all duration-300">
              <div className="text-lg font-bold text-red-gradient mb-1">100+</div>
              <div className="text-navy-200 text-xs font-medium">Challenges</div>
            </div>
            <div className="glass-effect rounded-lg p-3 hover:bg-navy-700/30 transition-all duration-300">
              <div className="text-lg font-bold text-red-gradient mb-1">24/7</div>
              <div className="text-navy-200 text-xs font-medium">AI Mentor</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

export default App 