import React from 'react'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent text-[#0c0c0c]">
      <div
        className="absolute inset-0"
        style={{
          background: [
            'radial-gradient(130% 120% at 20% 10%, #f537b5 0%, rgba(245, 55, 181, 0) 50%)',
            'radial-gradient(120% 110% at 70% 8%, #f78a3a 0%, rgba(247, 138, 58, 0) 55%)',
            'radial-gradient(140% 120% at 50% 0%, #b54bff 0%, rgba(181, 75, 255, 0) 52%)',
            'linear-gradient(180deg, #f9f8fb 45%, #fdfdfd 100%)',
          ].join(', '),
        }}
      />

      <div className="relative z-10 flex flex-col h-screen">
        <motion.div
          className="flex justify-end items-start px-6 pt-6 text-lg font-semibold"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          2026
        </motion.div>

        <motion.div
          className="flex-1 flex items-end justify-center pb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="text-[clamp(96px,22vw,320px)] font-medium leading-none tracking-[-0.04em]">
            Unimatch
          </h1>
        </motion.div>
      </div>
    </div>
  )
}

export default Hero
