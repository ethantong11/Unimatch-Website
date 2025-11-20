import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PhoneMockup = () => {
  const [currentScreen, setCurrentScreen] = useState(0)
  
  // Your actual app screenshots
  const screens = [
    {
      name: "Main Feed",
      image: "/images/main-feed.png",
      fallback: "main-feed"
    },
    {
      name: "Shots",
      image: "/images/shot.png",
      fallback: "shots"
    },
    {
      name: "Profile",
      image: "/images/profile.png",
      fallback: "profile"
    },
    {
      name: "Chat",
      image: "/images/chat.png",
      fallback: "chat"
    }
  ]

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % screens.length)
    }, 4000) // Change screen every 4 seconds

    return () => clearInterval(interval)
  }, [screens.length])

  const getFallbackContent = (screen) => {
    switch(screen.fallback) {
      case "main-feed":
        return (
          <div className="h-full bg-gradient-to-b from-gray-900 to-black p-4">
            <div className="text-center py-4">
              <h3 className="text-xl font-bold gradient-text">UniMatch</h3>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="glass-card p-6 rounded-2xl w-full max-w-sm">
                <div className="w-full h-48 bg-gradient-to-br from-primary to-purple-600 rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-6xl">👩‍💻</span>
                </div>
                <div className="text-white text-center">
                  <h4 className="text-xl font-semibold mb-1">Sarah, 20</h4>
                  <p className="text-gray-300 text-sm">Computer Science</p>
                  <p className="text-gray-400 text-xs mt-2">85% Match</p>
                </div>
              </div>
            </div>
          </div>
        )
      case "profile":
        return (
          <div className="h-full bg-gradient-to-b from-gray-900 to-black p-4">
            <div className="text-center py-4">
              <h3 className="text-lg font-bold text-white">Your Profile</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-purple-600 rounded-full mb-4 flex items-center justify-center">
                <span className="text-3xl">😊</span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">You, 21</h4>
              <p className="text-gray-300 text-sm mb-4">Engineering</p>
              <div className="glass-card p-4 rounded-xl w-full">
                <p className="text-gray-300 text-xs">Interests: Music, Sports, Tech</p>
                <p className="text-gray-300 text-xs mt-1">MBTI: ENFP</p>
              </div>
            </div>
          </div>
        )
      case "shots":
        return (
          <div className="h-full bg-gradient-to-b from-gray-900 to-black p-4">
            <div className="text-center py-4">
              <h3 className="text-xl font-bold gradient-text">Shots</h3>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="glass-card p-6 rounded-2xl w-full">
                <div className="w-full h-64 bg-gradient-to-br from-purple-600 to-primary rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-7xl">📸</span>
                </div>
                <div className="text-white text-center">
                  <h4 className="text-lg font-semibold mb-2">Capture the Moment</h4>
                  <p className="text-gray-400 text-sm">Share your daily shots with matches</p>
                </div>
              </div>
            </div>
          </div>
        )
      case "chat":
        return (
          <div className="h-full bg-gradient-to-b from-gray-900 to-black flex flex-col">
            <div className="text-center py-4 border-b border-gray-700">
              <h3 className="text-lg font-bold text-white">Chat with Sarah</h3>
            </div>
            <div className="flex-1 p-4 space-y-3">
              <div className="glass-card p-3 rounded-2xl rounded-bl-sm self-start max-w-xs">
                <p className="text-white text-sm">Hey! How's your day going? 😊</p>
              </div>
              <div className="bg-primary/20 p-3 rounded-2xl rounded-br-sm self-end max-w-xs ml-auto">
                <p className="text-white text-sm">Great! Just finished my CS assignment</p>
              </div>
              <div className="glass-card p-3 rounded-2xl rounded-bl-sm self-start max-w-xs">
                <p className="text-white text-sm">Nice! Which class? 🤓</p>
              </div>
            </div>
          </div>
        )
      default:
        return <div className="h-full bg-gray-900"></div>
    }
  }

  return (
    <motion.div
      className="relative"
      animate={{ 
        y: [0, -10, 0],
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* Phone Frame - Adjusted to match screenshot aspect ratio */}
      <div className="relative w-64 h-[520px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-2xl glow-effect">
        {/* Screen - No status bar, full screen content */}
        <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
          {/* Screen Content fills entire screen */}
          <div className="w-full h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScreen}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                {/* Display actual screenshots - show full content */}
                <div className="w-full h-full bg-black flex items-center justify-center rounded-[2.5rem] overflow-hidden">
                  <img 
                    src={screens[currentScreen].image}
                    alt={screens[currentScreen].name}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      console.log('Image failed to load, showing fallback')
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'block'
                    }}
                    onLoad={() => {
                      console.log('Image loaded successfully:', screens[currentScreen].image)
                    }}
                  />
                  <div className="w-full h-full" style={{ display: 'none' }}>
                    {getFallbackContent(screens[currentScreen])}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Screen Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
            {screens.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentScreen(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentScreen ? 'bg-primary' : 'bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Screen Labels */}
      <motion.div
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center"
        key={currentScreen}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-sm text-gray-400">{screens[currentScreen].name}</span>
      </motion.div>
    </motion.div>
  )
}

export default PhoneMockup