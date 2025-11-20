import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, FileText, Shield, MessageCircle } from 'lucide-react'

function Navigation() {
  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/terms', label: 'Terms', icon: FileText },
    { to: '/privacy', label: 'Privacy', icon: Shield },
    { to: '/support', label: 'Support', icon: MessageCircle },
  ]

  return (
    <div className="fixed md:top-4 bottom-3 md:bottom-auto left-3 right-3 md:mx-0 z-50 flex justify-center">
      <nav className="backdrop-blur-md rounded-2xl md:rounded-full px-2 md:px-4 w-full md:w-auto border border-white/10">
        <div className="flex justify-around md:justify-center md:space-x-8 h-12 md:h-16 items-center">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className="inline-flex flex-col md:flex-row items-center justify-center px-2 md:px-4 text-sm font-semibold transition-all duration-300"
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-5 h-5 md:hidden mt-1 ${
                    isActive ? 'text-primary' : 'text-gray-400'
                  }`} />
                  <span className={`hidden md:inline ${
                    isActive
                      ? 'text-primary'
                      : 'text-gray-400 hover:text-white'
                  }`}>{label}</span>
                  <span className={`md:hidden text-[10px] mt-0.5 ${
                    isActive
                      ? 'text-primary'
                      : 'text-gray-400'
                  }`}>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default Navigation
