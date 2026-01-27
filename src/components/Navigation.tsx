import React from 'react'
import { NavLink } from 'react-router-dom'

function Navigation() {
  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/terms', label: 'Terms' },
    { to: '/privacy', label: 'Privacy' },
    { to: '/support', label: 'Support' },
  ]

  return (
    <div className="fixed top-4 left-0 right-0 z-30 flex justify-center">
      <nav className="px-4">
        <div className="flex space-x-6 text-base font-medium">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className="transition-colors duration-150"
            >
              {({ isActive }) => (
                <span className={
                  isActive
                    ? 'text-[#0c0c0c]'
                    : 'text-[#0c0c0c]/60 hover:text-[#0c0c0c]'
                }>
                  {label}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default Navigation
