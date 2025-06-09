import { MiniKit } from '@worldcoin/minikit-js'
import { VerificationProvider } from './utils/VerificationContext'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import BottomNavigation from './components/BottomNavigation'

// Initialize MiniKit for World App integration
if (typeof window !== 'undefined') {
  MiniKit.install(import.meta.env.VITE_PUBLIC_MINIKIT_APP_ID || 'app_812ac0842eb746d6a8bbe07db8b7cc1e')
}

function App() {
  return (
    <VerificationProvider>
      <div className="min-h-screen bg-navy-950 text-white">
        <Header />
        <main className="pb-20">
          <Hero />
          <Features />
        </main>
        <BottomNavigation />
      </div>
    </VerificationProvider>
  )
}

export default App 