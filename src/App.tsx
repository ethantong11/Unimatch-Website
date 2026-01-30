import React, { useEffect, useRef, useState } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Navigation from './components/Navigation'
import RouteTransition from './components/RouteTransition'
import HeaderLogo from './components/HeaderLogo'
import HeaderThemeToggle from './components/HeaderThemeToggle'
import Hero from './pages/Hero'
import Legal from './pages/Legal'
import Mission from './pages/Mission'
import Support from './pages/Support'
import NotFound from './pages/NotFound'
import Cursor from './components/Cursor'

function App() {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [pendingLocation, setPendingLocation] = useState(location)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const gradientRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setPendingLocation(location)
      setIsTransitioning(true)
      return
    }

    if (location.search !== displayLocation.search) {
      setDisplayLocation(location)
    }
  }, [location, displayLocation])

  useEffect(() => {
    const stored = window.localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const nextIsDark = stored ? stored === 'dark' : prefersDark
    setIsDark(nextIsDark)
    document.documentElement.classList.toggle('dark', nextIsDark)
  }, [])

  useEffect(() => {
    const node = gradientRef.current
    if (!node) {
      return
    }

    const maxShiftX = 70
    const maxShiftY = 40
    const idleShiftX = 8
    const idleShiftY = 6
    const idleSpeedX = 5200
    const idleSpeedY = 4300
    node.style.setProperty('--splotch-x', '0px')
    node.style.setProperty('--splotch-y', '0px')

    let pointerX = 0
    let pointerY = 0

    const handleMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2
      const y = (event.clientY / window.innerHeight - 0.5) * 2

      pointerX = x * maxShiftX
      pointerY = y * maxShiftY
    }

    const handleLeave = () => {
      pointerX = 0
      pointerY = 0
    }

    const animate = () => {
      const now = performance.now()
      const idleX = Math.sin(now / idleSpeedX) * idleShiftX
      const idleY = Math.cos(now / idleSpeedY) * idleShiftY
      node.style.setProperty('--splotch-x', `${pointerX + idleX}px`)
      node.style.setProperty('--splotch-y', `${pointerY + idleY}px`)
      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    window.addEventListener('pointerleave', handleLeave)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerleave', handleLeave)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  const handleThemeToggle = () => {
    setIsDark((prev) => {
      const next = !prev
      document.documentElement.classList.toggle('dark', next)
      window.localStorage.setItem('theme', next ? 'dark' : 'light')
      return next
    })
  }

  return (
    <div className="App relative min-h-screen bg-white text-[#0c0c0c] font-sans font-medium overflow-x-hidden cursor-none dark:bg-[#0c0c0c] dark:text-[#f5f5f5]">
      <Cursor />
      <RouteTransition
        active={isTransitioning}
        onCover={() => setDisplayLocation(pendingLocation)}
        onDone={() => setIsTransitioning(false)}
      />
      <div className="app-header fixed top-4 left-2 right-2 z-header rounded-full">
        <div className="flex h-full items-center justify-between px-2 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:px-3">
          <div className="order-2 sm:order-none sm:justify-self-start">
            <div className="flex flex-col items-center sm:flex-row sm:items-center sm:gap-2">
              <HeaderLogo />
              {displayLocation.pathname === '/support' ? (
                <span className="mt-1 text-[10px] leading-none uppercase tracking-[0.2em] text-[#0c0c0c]/80 dark:text-white/80 sm:mt-0 sm:text-xs">
                  Support Center
                </span>
              ) : null}
            </div>
          </div>
          <div className="order-1 sm:order-none sm:justify-self-center">
            <Navigation />
          </div>
          <div className="order-3 sm:order-none sm:justify-self-end">
            <HeaderThemeToggle onToggleTheme={handleThemeToggle} />
          </div>
        </div>
      </div>
      <div
        ref={gradientRef}
        className="pointer-events-none fixed -left-32 -right-32 -top-24 h-[110vh] z-background bg-top-splotches transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform:
            'translate3d(var(--splotch-x, 0px), var(--splotch-y, 0px), 0)',
        }}
      />
      <div className="relative z-content">
        <Routes location={displayLocation}>
          <Route path="/" element={<Hero />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/terms" element={<Navigate to="/legal?policy=terms" replace />} />
          <Route path="/privacy" element={<Navigate to="/legal?policy=privacy" replace />} />
          <Route path="/support" element={<Support />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
