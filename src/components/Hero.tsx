import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Hero = () => {
  const [landingRef, landingInView] = useInView({
    threshold: 0.3,
  })

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  const screens = [
    { name: 'Main Feed', image: '/images/main-feed.png' },
    { name: 'Chat', image: '/images/chat.png' },
    { name: 'Profile', image: '/images/profile.png' },
    { name: 'Match', image: '/images/shot.png' },
    { name: 'Discover', image: '/images/main-feed.png' }, // Using main-feed as 5th screen
  ]

  return (
    <div className="relative">
      {/* Landing Section */}
      <motion.section 
        ref={landingRef}
        style={{ opacity, scale }}
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

        <div className="relative z-10 text-center px-4">
          <motion.h1 
            className="text-8xl md:text-9xl font-pacifico gradient-text mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            unimatch
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
      </motion.section>

      {/* UI Screens Section */}
      <section className="relative min-h-screen bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {screens.map((screen, index) => (
              <motion.div
                key={screen.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="relative overflow-hidden rounded-3xl bg-gray-800 shadow-2xl">
                  <img
                    src={screen.image}
                    alt={screen.name}
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-white">{screen.name}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
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
