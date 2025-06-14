import React, { createContext, useContext, useState, ReactNode } from 'react'

interface VerificationResult {
  merkle_root: string
  nullifier_hash: string
  proof: string
  verification_level: string | any
}

interface VerificationState {
  isVerified: boolean
  verificationData: VerificationResult | null
  setVerified: (data: VerificationResult) => void
  clearVerification: () => void
}

const VerificationContext = createContext<VerificationState | undefined>(undefined)

export function VerificationProvider({ children }: { children: ReactNode }) {
  const [isVerified, setIsVerified] = useState(false)
  const [verificationData, setVerificationData] = useState<VerificationResult | null>(null)

  const setVerified = (data: VerificationResult) => {
    setIsVerified(true)
    setVerificationData(data)
    // Store in localStorage for persistence across page reloads
    localStorage.setItem('worldid_verified', 'true')
    localStorage.setItem('worldid_data', JSON.stringify(data))
  }

  const clearVerification = () => {
    setIsVerified(false)
    setVerificationData(null)
    localStorage.removeItem('worldid_verified')
    localStorage.removeItem('worldid_data')
  }

  // Check localStorage on mount
  React.useEffect(() => {
    const stored = localStorage.getItem('worldid_verified')
    const storedData = localStorage.getItem('worldid_data')
    if (stored === 'true' && storedData) {
      try {
        const data = JSON.parse(storedData)
        setIsVerified(true)
        setVerificationData(data)
      } catch (error) {
        console.error('Error parsing stored verification data:', error)
        clearVerification()
      }
    }
  }, [])

  return (
    <VerificationContext.Provider value={{
      isVerified,
      verificationData,
      setVerified,
      clearVerification
    }}>
      {children}
    </VerificationContext.Provider>
  )
}

export function useVerification() {
  const context = useContext(VerificationContext)
  if (context === undefined) {
    throw new Error('useVerification must be used within a VerificationProvider')
  }
  return context
} 