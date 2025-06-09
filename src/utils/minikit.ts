import { MiniKit, VerifyCommandInput, ResponseEvent, VerificationLevel } from '@worldcoin/minikit-js'

export interface MiniKitVerificationResult {
  merkle_root: string
  nullifier_hash: string
  proof: string
  verification_level: string
}

/**
 * Initialize MiniKit verification listener
 */
export function initializeMiniKitVerification(
  onSuccess: (result: MiniKitVerificationResult) => void,
  onError: (error: any) => void
) {
  if (!MiniKit.isInstalled()) {
    console.warn('MiniKit is not installed')
    return
  }

  MiniKit.subscribe(
    ResponseEvent.MiniAppVerifyAction,
    async (response) => {
      if (response.status === 'success') {
        console.log('MiniKit World ID verification successful:', response)
        onSuccess({
          merkle_root: response.merkle_root,
          nullifier_hash: response.nullifier_hash,
          proof: response.proof,
          verification_level: response.verification_level
        })
      } else {
        console.error('MiniKit World ID verification failed:', response)
        onError(response)
      }
    }
  )
}

/**
 * Trigger World ID verification using MiniKit
 */
export async function triggerWorldIDVerification(
  action: string,
  signal?: string,
  verificationLevel: VerificationLevel = VerificationLevel.Orb
): Promise<void> {
  if (!MiniKit.isInstalled()) {
    throw new Error('MiniKit is not installed. This app must be opened in World App.')
  }

  const verifyPayload: VerifyCommandInput = {
    action,
    signal: signal || '',
    verification_level: verificationLevel
  }

  try {
    await MiniKit.commands.verify(verifyPayload)
  } catch (error) {
    console.error('Failed to trigger World ID verification:', error)
    throw error
  }
}

/**
 * Check if the app is running inside World App
 */
export function isInWorldApp(): boolean {
  return MiniKit.isInstalled()
} 