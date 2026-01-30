import React, { useEffect } from 'react'

function Mission() {
  useEffect(() => {
    document.documentElement.classList.add('no-scroll')
    document.body.classList.add('no-scroll')

    return () => {
      document.documentElement.classList.remove('no-scroll')
      document.body.classList.remove('no-scroll')
    }
  }, [])

  return (
    <div className="relative z-content flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-7xl text-left">
        <span className="inline-flex items-center justify-center rounded-full border border-black/40 px-4 py-1.5 text-bodysmall text-[#0c0c0c] dark:border-white/50 dark:text-white">
          OUR MISSION
        </span>
        <h1 className="mt-6 text-h1 md:text-h1-md">
          Our mission to create a one-for-all platform that encapsulates all university social life needs.
        </h1>
      </div>
    </div>
  )
}

export default Mission
