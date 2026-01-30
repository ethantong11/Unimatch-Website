import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

const Hero = () => {
  useEffect(() => {
    document.documentElement.classList.add('no-scroll')
    document.body.classList.add('no-scroll')

    return () => {
      document.documentElement.classList.remove('no-scroll')
      document.body.classList.remove('no-scroll')
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent text-[#0c0c0c] dark:text-[#f5f5f5]">
      <div className="relative z-content flex h-screen flex-col">
        <motion.div
          className="flex flex-1 items-end justify-center px-4 pb-[max(2rem,env(safe-area-inset-bottom))] sm:pb-0"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="text-h1plus leading-none -translate-x-3 select-none text-appear">
            Unimatch
          </h1>
        </motion.div>
      </div>
    </div>
  )
}

export default Hero
