import { createClient } from '@libsql/client'
import { encryptUserId } from './encryption'

// Turso database configuration
const TURSO_DATABASE_URL = 'libsql://code-vamp-tartnenas.aws-ap-northeast-1.turso.io'
const TURSO_AUTH_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NDk1MTMyNTIsImlkIjoiOGM4M2RmMmEtYWFlOS00NmVjLTg4NDAtNjNiM2JmZmE1NTdmIiwicmlkIjoiYmVkNzQ0NTYtNjk0NC00NDg1LTgzMDktOGNhYjFhNmRmNWRmIn0.vqERFfg95F8xUg5Fd-3BwauUpQvC74L_T5ojrsOsV36_ORbzz8znaTFI1zOogQM925N6-UUGqWK19A7OnDdoDQ'

// Create Turso client
const client = createClient({
  url: TURSO_DATABASE_URL,
  authToken: TURSO_AUTH_TOKEN,
})

export interface WaitlistUser {
  id?: number
  encrypted_user_id: string
  verification_level: string
  nullifier_hash?: string
  created_at?: string
  updated_at?: string
}

/**
 * Adds a user to the waitlist with encrypted user ID
 * @param userId - The World ID user identifier
 * @param verificationLevel - The verification level (device, orb, etc.)
 * @param nullifierHash - Optional nullifier hash for additional verification
 * @returns Promise<boolean> - Success status
 */
export async function addUserToWaitlist(
  userId: string,
  verificationLevel: string,
  nullifierHash?: string
): Promise<boolean> {
  try {
    // Encrypt the user ID for secure storage
    const encryptedUserId = encryptUserId(userId)
    
    // Check if user already exists (using hash to avoid storing plain text)
    const existingUser = await client.execute({
      sql: 'SELECT id FROM waitlist_users WHERE encrypted_user_id = ?',
      args: [encryptedUserId]
    })
    
    if (existingUser.rows.length > 0) {
      console.log('User already exists in waitlist')
      return false
    }
    
    // Insert new user
    const result = await client.execute({
      sql: `INSERT INTO waitlist_users (encrypted_user_id, verification_level, nullifier_hash) 
            VALUES (?, ?, ?)`,
      args: [encryptedUserId, verificationLevel, nullifierHash || null]
    })
    
    console.log('User added to waitlist successfully:', result.rowsAffected)
    return result.rowsAffected > 0
    
  } catch (error) {
    console.error('Error adding user to waitlist:', error)
    return false
  }
}

/**
 * Gets the total number of users in the waitlist
 * @returns Promise<number> - Total count of waitlist users
 */
export async function getWaitlistCount(): Promise<number> {
  try {
    const result = await client.execute('SELECT COUNT(*) as count FROM waitlist_users')
    return Number(result.rows[0]?.count) || 0
  } catch (error) {
    console.error('Error getting waitlist count:', error)
    return 0
  }
}

/**
 * Checks if a user is already in the waitlist
 * @param userId - The World ID user identifier
 * @returns Promise<boolean> - Whether user exists in waitlist
 */
export async function isUserInWaitlist(userId: string): Promise<boolean> {
  try {
    const encryptedUserId = encryptUserId(userId)
    const result = await client.execute({
      sql: 'SELECT id FROM waitlist_users WHERE encrypted_user_id = ?',
      args: [encryptedUserId]
    })
    
    return result.rows.length > 0
  } catch (error) {
    console.error('Error checking if user in waitlist:', error)
    return false
  }
} 