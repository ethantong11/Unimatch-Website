import React from 'react'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent text-[#0c0c0c] dark:text-[#f5f5f5]">
      <div className="relative z-10 flex flex-col h-screen">
        <motion.div
          className="flex-1 flex items-end justify-center"
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
