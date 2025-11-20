import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Hero = () => {
  const [landingRef, landingInView] = useInView({
    threshold: 0.3,
  })
  
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollPositions, setScrollPositions] = useState<Record<number, number>>({})
  const isScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()
  const scrollDeltaRef = useRef(0)
  const currentIndexRef = useRef(0)

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
  
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect()
      const containerCenter = containerRect.left + containerRect.width / 2
      const positions: Record<number, number> = {}
      
      Array.from(container.children[0]?.children || []).forEach((child, index) => {
        const screenRect = child.getBoundingClientRect()
        const screenCenter = screenRect.left + screenRect.width / 2
        const distance = (screenCenter - containerCenter) / containerRect.width
        positions[index] = distance
      })
      
      setScrollPositions(positions)
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      
      if (isScrollingRef.current) {
        return
      }

      // Trigger a single page scroll based only on direction
      isScrollingRef.current = true

      const direction = (e.deltaY > 0 || e.deltaX > 0) ? 1 : -1
      const screenWidth = 280 + 32 // width + gap (must match CSS)

      const maxIndex = infiniteScreens.length - 1
      const nextIndex = Math.max(0, Math.min(maxIndex, currentIndexRef.current + direction))
      currentIndexRef.current = nextIndex

      const targetLeft = nextIndex * screenWidth

      container.scrollTo({
        left: targetLeft,
        behavior: 'smooth'
      })

      // Lock scrolling during the animation so only one page moves per gesture
      setTimeout(() => {
        isScrollingRef.current = false
      }, 400)
    }


    handleScroll()
    container.addEventListener('scroll', handleScroll)
    container.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('resize', handleScroll)
    
    return () => {
      container.removeEventListener('scroll', handleScroll)
      container.removeEventListener('wheel', handleWheel)
      window.removeEventListener('resize', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [infiniteScreens.length])
  
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
          <div 
            ref={containerRef}
            className="w-full max-w-7xl overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-mandatory scroll-smooth" 
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              perspective: '2000px',
              perspectiveOrigin: 'center center'
            }}
          >
            <div 
              className="flex gap-8 px-[calc(50vw-140px)] pb-4"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {infiniteScreens.map((screen, index) => {
                const distance = scrollPositions[index] || 0
                const absDistance = Math.abs(distance)
                
                return (
                  <motion.div
                    key={`${screen.name}-${index}`}
                    className="flex-shrink-0 w-[280px] snap-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: 1 - absDistance * 0.5,
                      scale: 1 - absDistance * 0.4,
                      rotateY: distance * 35,
                      translateZ: -absDistance * 250,
                    }}
                    style={{ 
                      transformStyle: 'preserve-3d',
                      transformOrigin: 'center center',
                    }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl">
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
                )
              })}
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
