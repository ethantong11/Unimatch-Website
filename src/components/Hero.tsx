import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Send } from 'lucide-react'
import PhoneMockup from './PhoneMockup'

const Hero = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const [email, setEmail] = React.useState('')
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email.includes('@connect.ust.hk')) {
      setIsSubmitted(true)
      setEmail('')
      setTimeout(() => setIsSubmitted(false), 3000)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-3 lg:justify-start justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-3xl font-bold gradient-text">unimatch</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight lg:text-left text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="block text-white">Find Your</span>
              <span className="block gradient-text">Perfect Match</span>
              <span className="block text-white">at UNIVERSITIES</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-lg md:text-xl text-gray-300 lg:text-left text-center max-w-xl lg:max-w-none"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              The exclusive dating app for university students. 
              Connect with like-minded people through intelligent matching and real-time chat.
            </motion.p>
          </div>

          {/* Right Column - Larger Phone Mockup */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="transform scale-100 lg:scale-125">
              <PhoneMockup />
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="border-t border-gray-800 pt-8 mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <p className="text-gray-400 text-sm">
            &copy; 2025 UniMatch.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero