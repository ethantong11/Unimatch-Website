import React from 'react'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-transparent">
      <section className="relative flex-1 flex items-center justify-center">
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            className="text-8xl md:text-9xl font-pacifico text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Unimatch
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            The exclusive dating app for university students.
          </motion.p>
        </div>
      </section>

      {/* Footer */}
      <motion.div
        className="relative z-10 pt-10 pb-8 text-center text-gray-200 bg-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-sm">
          &copy; 2025 unimatch. All rights reserved.
        </p>
      </motion.div>
    </div>
  )
}

export default Hero
