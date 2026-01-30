import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { NavLink } from 'react-router-dom'
import PrimaryButton from './PrimaryButton'

function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const navItems = [
    { to: '/mission', label: 'Mission' },
    { to: '/legal', label: 'Legal' },
    { to: '/support', label: 'Support' },
  ]

  const joinUrl =
    'https://apps.apple.com/hk/app/unimatch-student-networking/id6753971746?l=en-GB'

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', isOpen)
    return () => {
      document.documentElement.classList.remove('menu-open')
    }
  }, [isOpen])

  useEffect(() => {
    const handleClose = () => setIsOpen(false)
    window.addEventListener('menu-close', handleClose)
    return () => window.removeEventListener('menu-close', handleClose)
  }, [])

  return (
    <nav className="relative px-0 sm:px-4">
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
        onClick={() => setIsOpen((prev) => !prev)}
        className="sm:hidden inline-flex h-10 w-10 items-center justify-center"
      >
        <span className="flex flex-col gap-1">
          <span className="menu-toggle-line h-0.5 w-5 rounded-full bg-primary" />
          <span className="menu-toggle-line h-0.5 w-5 rounded-full bg-primary" />
        </span>
      </button>
      <div className="hidden sm:flex h-11 items-center space-x-6 text-bodysmall bg-glass-subtle backdrop-blur-md border border-outline-subtle rounded-full p-1 pl-4">
        {navItems.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className="transition-colors duration-150"
          >
            {({ isActive }) => (
              <span className={
                isActive
                  ? 'text-primary'
                  : 'text-secondary hover:text-primary'
              }>
                {label}
              </span>
            )}
          </NavLink>
        ))}
        <PrimaryButton
          href={joinUrl}
          target="_blank"
          rel="noreferrer"
          size="sm"
        >
          Join Now
        </PrimaryButton>
      </div>
      {typeof document !== 'undefined' &&
        createPortal(
          <div
            id="mobile-nav"
            aria-hidden={!isOpen}
            className={`menu-overlay sm:hidden z-menu ${isOpen ? 'active' : ''}`}
          >
            <div className="flex h-full flex-col justify-center px-8">
              <div className="flex flex-col space-y-4 text-3xl text-menu-foreground">
                {navItems.map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={() => setIsOpen(false)}
                    className="text-menu-foreground/80 transition-colors duration-150 hover:text-menu-foreground"
                  >
                    {label}
                  </NavLink>
                ))}
                <a
                  href={joinUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="text-menu-foreground/80 transition-colors duration-150 hover:text-menu-foreground"
                >
                  Join Now
                </a>
              </div>
            </div>
          </div>,
          document.body
        )}
    </nav>
  )
}

export default Navigation
