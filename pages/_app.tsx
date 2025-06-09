import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import { MiniKit } from '@worldcoin/minikit-js'
import { VerificationProvider } from '../utils/VerificationContext'

// Initialize MiniKit for World App integration
if (typeof window !== 'undefined') {
  MiniKit.install(process.env.NEXT_PUBLIC_MINIKIT_APP_ID || 'app_812ac0842eb746d6a8bbe07db8b7cc1e')
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <VerificationProvider>
      <Component {...pageProps} />
    </VerificationProvider>
  )
} 