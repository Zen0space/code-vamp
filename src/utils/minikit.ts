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
 * Get the optimal verification level - always use Orb for maximum security
 */
export function getOptimalVerificationLevel(): VerificationLevel {
  // Always use Orb verification for maximum security and World ID Face Auth compatibility
  return VerificationLevel.Orb
}

/**
 * Trigger World ID verification using MiniKit with automatic verification level selection
 */
export async function triggerWorldIDVerification(
  action: string,
  signal?: string,
  verificationLevel?: VerificationLevel
): Promise<void> {
  if (!MiniKit.isInstalled()) {
    throw new Error('MiniKit is not installed. This app must be opened in World App.')
  }

  // Use provided verification level or automatically select the optimal one
  const selectedLevel = verificationLevel || getOptimalVerificationLevel()

  const verifyPayload: VerifyCommandInput = {
    action,
    signal: signal || '',
    verification_level: selectedLevel
  }

  try {
    console.log(`Triggering World ID verification with ${selectedLevel === VerificationLevel.Device ? 'Device (Face ID)' : 'Orb'} verification`)
    await MiniKit.commands.verify(verifyPayload)
  } catch (error) {
    console.error('Failed to trigger World ID verification:', error)
    throw error
  }
}

/**
 * Trigger World ID verification with Orb level (for World ID Face Auth compatibility)
 */
export async function triggerOrbVerification(
  action: string,
  signal?: string
): Promise<void> {
  return triggerWorldIDVerification(action, signal, VerificationLevel.Orb)
}

 