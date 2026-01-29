import React from 'react'
import LightModeCircle from '../assets/lightmode-circle.svg'
import DarkModeCircle from '../assets/darkmode-circle.svg'

type HeaderThemeToggleProps = {
  onToggleTheme: () => void
}

function HeaderThemeToggle({ onToggleTheme }: HeaderThemeToggleProps) {
  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      className="mode-toggle h-full w-11 flex items-center justify-center flex-shrink-0"
      onClick={onToggleTheme}
    >
      <img
        className="mode-circle white"
        src={LightModeCircle}
        alt=""
        aria-hidden="true"
      />
      <img
        className="mode-circle black"
        src={DarkModeCircle}
        alt=""
        aria-hidden="true"
      />
    </button>
  )
}

export default HeaderThemeToggle
