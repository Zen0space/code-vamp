import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { MiniKit } from '@worldcoin/minikit-js'

// Initialize MiniKit for World App integration
if (typeof window !== 'undefined') {
  MiniKit.install()
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
} 