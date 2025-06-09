import type { NextApiRequest, NextApiResponse } from 'next'
import { IVerifyResponse, verifyCloudProof } from '@worldcoin/idkit'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { proof, merkle_root, nullifier_hash, verification_level } = req.body

  try {
    const app_id = process.env.NEXT_PUBLIC_WLD_APP_ID!
    const action = process.env.NEXT_PUBLIC_WLD_ACTION!

    const verifyRes = await verifyCloudProof(
      proof,
      app_id as `app_${string}`,
      action
    )

    if (verifyRes.success) {
      // Verification successful
      res.status(200).json({ success: true, data: verifyRes })
    } else {
      // Verification failed
      res.status(400).json({ success: false, error: verifyRes.detail })
    }
  } catch (error) {
    console.error('Verification error:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
} 