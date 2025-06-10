import CryptoJS from 'crypto-js'

// Use environment variable for encryption key in production
const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'codevamp-default-key-change-in-production'

/**
 * Encrypts a user ID using AES encryption
 * @param userId - The user ID to encrypt
 * @returns Encrypted user ID as string
 */
export function encryptUserId(userId: string): string {
  try {
    const encrypted = CryptoJS.AES.encrypt(userId, ENCRYPTION_KEY).toString()
    return encrypted
  } catch (error) {
    console.error('Error encrypting user ID:', error)
    throw new Error('Failed to encrypt user ID')
  }
}

/**
 * Decrypts an encrypted user ID
 * @param encryptedUserId - The encrypted user ID to decrypt
 * @returns Decrypted user ID as string
 */
export function decryptUserId(encryptedUserId: string): string {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedUserId, ENCRYPTION_KEY)
    return decrypted.toString(CryptoJS.enc.Utf8)
  } catch (error) {
    console.error('Error decrypting user ID:', error)
    throw new Error('Failed to decrypt user ID')
  }
}

/**
 * Generates a hash of the user ID for duplicate checking without storing plain text
 * @param userId - The user ID to hash
 * @returns SHA256 hash of the user ID
 */
export function hashUserId(userId: string): string {
  return CryptoJS.SHA256(userId).toString()
} 