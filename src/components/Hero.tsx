import React from 'react'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-transparent">
      <section className="relative flex-1 flex items-center justify-center">
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            className="text-6xl md:text-7xl font-pacifico text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Unimatch
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            The exclusive dating app for university students.
          </motion.p>
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <a
              href="https://apps.apple.com/hk/app/unimatch-student-networking/id6753971746"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center hover:-translate-y-0.5 transition-transform duration-200"
            >
              <img
                src="/Pre-order-on-the-App-Store/US-UK/Pre-order_on_App_Store/Black_badge/SVG/Pre-order_on_the_App_Store_Badge_US-UK_RGB_blk_121217.svg"
                alt="Download on the App Store"
                className="w-44 h-auto drop-shadow-lg"
              />
            </a>
          </motion.div>
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
          &copy; 2026 Unimatch. All rights reserved.
        </p>
      </motion.div>
    </div>
  )
}

export default Hero
