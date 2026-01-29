import React from 'react'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent text-[#0c0c0c]">
      <div className="relative z-10 flex flex-col h-screen">
        <motion.div
          className="flex-1 flex items-end justify-center pb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="text-h1plus leading-none">
            Unimatch
          </h1>
        </motion.div>
      </div>
    </div>
  )
}

export default Hero
