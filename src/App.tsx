import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Hero from './pages/Hero'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Support from './pages/Support'

function App() {
  return (
    <div className="App relative min-h-screen bg-white text-[#0c0c0c] font-sans font-medium overflow-x-hidden">
      <div
        className="pointer-events-none fixed -left-32 -right-32 -top-24 h-[85vh] z-0 bg-top-splotches"
      />
      <div className="relative z-10">
        <Navigation />
        <Routes>
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
