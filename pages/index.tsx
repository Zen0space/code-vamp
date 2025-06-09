import React from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Footer from '../components/Footer'
import BottomNavigation from '../components/BottomNavigation'

export default function Home() {
  return (
    <>
      <Head>
        <title>CodeVamp - Master Programming with the Hunger of a Vampire</title>
        <meta name="description" content="Master programming with the hunger of a vampire. Interactive coding challenges, personalized learning, and gamified progress." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen bg-gray-950 text-white">
        <Header />
        <main className="pb-24 md:pb-0">
          <Hero />
          <Features />
        </main>
        <Footer />
        <BottomNavigation />
      </div>
    </>
  )
} 