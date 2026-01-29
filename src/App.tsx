import React, { useEffect, useRef, useState } from 'react'
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
  const gradientRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setPendingLocation(location)
      setIsTransitioning(true)
    }
  }, [location, displayLocation])

  useEffect(() => {
    const node = gradientRef.current
    if (!node) {
      return
    }

    const maxShiftX = 70
    const maxShiftY = 40
    node.style.setProperty('--splotch-x', '0px')
    node.style.setProperty('--splotch-y', '0px')

    const handleMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2
      const y = (event.clientY / window.innerHeight - 0.5) * 2

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      rafRef.current = requestAnimationFrame(() => {
        node.style.setProperty('--splotch-x', `${x * maxShiftX}px`)
        node.style.setProperty('--splotch-y', `${y * maxShiftY}px`)
      })
    }

    const handleLeave = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      rafRef.current = requestAnimationFrame(() => {
        node.style.setProperty('--splotch-x', '0px')
        node.style.setProperty('--splotch-y', '0px')
      })
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    window.addEventListener('pointerleave', handleLeave)

    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerleave', handleLeave)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return (
    <div className="App relative min-h-screen bg-white text-[#0c0c0c] font-sans font-medium overflow-x-hidden cursor-none">
      <Cursor />
      <RouteTransition
        active={isTransitioning}
        onCover={() => setDisplayLocation(pendingLocation)}
        onDone={() => setIsTransitioning(false)}
      />
      <div
        ref={gradientRef}
        className="pointer-events-none fixed -left-32 -right-32 -top-24 h-[85vh] z-0 bg-top-splotches transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform:
            'translate3d(var(--splotch-x, 0px), var(--splotch-y, 0px), 0)',
        }}
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
