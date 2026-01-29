import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navigation from './components/Navigation'
import RouteTransition from './components/RouteTransition'
import Hero from './pages/Hero'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Support from './pages/Support'
import Cursor from './components/Cursor'

function App() {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [pendingLocation, setPendingLocation] = useState(location)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setPendingLocation(location)
      setIsTransitioning(true)
    }
  }, [location, displayLocation])

  return (
    <div className="App relative min-h-screen bg-white text-[#0c0c0c] font-sans font-medium overflow-x-hidden cursor-none">
      <Cursor />
      <RouteTransition
        active={isTransitioning}
        onCover={() => setDisplayLocation(pendingLocation)}
        onDone={() => setIsTransitioning(false)}
      />
      <div
        className="pointer-events-none fixed -left-32 -right-32 -top-24 h-[85vh] z-0 bg-top-splotches"
      />
      <div className="relative z-10">
        <Navigation />
        <Routes location={displayLocation}>
          <Route path="/" element={<Hero />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
