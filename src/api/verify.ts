import { ISuccessResult } from '@worldcoin/idkit'

export async function verify(proof: ISuccessResult) {
  try {
    // In a real application, you would send this to your backend API
    // For now, we'll simulate a successful verification
    console.log('World ID proof received:', proof)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock successful response
    return { 
      success: true, 
      data: {
        verified: true,
        nullifier_hash: proof.nullifier_hash,
        merkle_root: proof.merkle_root,
        verification_level: proof.verification_level
      }
    }
  } catch (error) {
    console.error('Verification failed:', error)
    return { success: false, error }
  }
} 