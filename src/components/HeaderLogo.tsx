import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Logo from '../assets/Logo.svg'

function HeaderLogo() {
  const location = useLocation()
  const [isShaking, setIsShaking] = useState(false)

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const isMenuOpen = document.documentElement.classList.contains('menu-open')
    if (isMenuOpen && location.pathname === '/') {
      event.preventDefault()
      window.dispatchEvent(new Event('menu-close'))
      return
    }

    if (location.pathname === '/') {
      setIsShaking(true)
      window.setTimeout(() => setIsShaking(false), 450)
    }
  }

  return (
    <NavLink
      to="/"
      aria-label="Unimatch home"
      className="logo-link h-full w-11 flex items-center justify-center flex-shrink-0"
      onClick={handleClick}
    >
      <img
        src={Logo}
        alt="Unimatch"
        className={`h-9 w-9 ${isShaking ? 'logo-shake' : ''}`}
      />
    </NavLink>
  )
}

export default HeaderLogo
