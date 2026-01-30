import React from 'react'
import { motion } from 'framer-motion'
import useNoScroll from '../hooks/useNoScroll'

const Hero = () => {
  useNoScroll()

  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent text-primary">
      {/* Hero layout */}
      <section className="relative z-content flex h-screen flex-col">
        <div className="flex flex-1 items-end justify-center pb-[max(2rem,env(safe-area-inset-bottom))] sm:pb-0">
          <h1 className="text-h1plus leading-none select-none text-appear">
            Unimatch
          </h1>
        </div>
      </section>
    </main>
  )
}

export default Hero
