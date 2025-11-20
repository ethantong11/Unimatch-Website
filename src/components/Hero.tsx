import React from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Hero = () => {
  const [landingRef, landingInView] = useInView({
    threshold: 0.3,
  })

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.5])
  const z = useTransform(scrollYProgress, [0, 0.3], [0, -200])
  
  const screens = [
    { name: 'Match', image: '/images/shot.png' },
    { name: 'Main Feed', image: '/images/main-feed.png' },
    { name: 'Chat', image: '/images/chat.png' },
    { name: 'Profile', image: '/images/profile.png' },
  ]

  // Create infinite array for circular scrolling
  const infiniteScreens = [...screens, ...screens, ...screens, ...screens, ...screens]

  return (
    <div className="relative">
      {/* Landing Section with 3D Push Back Effect */}
      <motion.section 
        ref={landingRef}
        style={{ 
          opacity, 
          scale,
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-primary/10 to-purple-900/30" />
          
          {/* Animated gradient orbs */}
          <motion.div
            className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/30 to-primary/30 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.6, 0.3, 0.6],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <motion.div 
          className="relative z-10 text-center px-4"
          style={{
            z,
            transformStyle: 'preserve-3d'
          }}
        >
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
        </motion.div>
      </motion.section>

      {/* UI Screens Section - Infinite Horizontal Carousel */}
      <section className="relative min-h-screen py-20 overflow-hidden">
        {/* Same gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-primary/10 to-purple-900/30" />
          
          <motion.div
            className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/30 to-primary/30 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.6, 0.3, 0.6],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="w-full max-w-7xl overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="flex gap-8 px-8 pb-4 justify-center">
              {infiniteScreens.map((screen, index) => (
                <motion.div
                  key={`${screen.name}-${index}`}
                  className="flex-shrink-0 w-[280px] snap-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-xl">
                    <img
                      src={screen.image}
                      alt={screen.name}
                      className="w-full h-auto object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/90 to-transparent p-3">
                      <h3 className="text-sm font-bold text-white">{screen.name}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          className="border-t border-gray-800 pt-8 mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-gray-400 text-sm">
            &copy; 2025 UniMatch.
          </p>
        </motion.div>
      </section>
    </div>
  )
}

export default Hero
