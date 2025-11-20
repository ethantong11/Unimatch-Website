import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Support from './pages/Support'
import BackgroundGradient from './components/BackgroundGradient'

function App() {
  return (
    <div className="App">
      <BackgroundGradient />
      <Navigation />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </div>
  )
}

export default App