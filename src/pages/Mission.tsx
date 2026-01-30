import React, { useEffect } from 'react'
import Tag from '../components/Tag'

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
        <Tag>OUR MISSION</Tag>
        <h1 className="mt-6 text-h1 md:text-h1-md">
          Our mission to create a one-for-all platform that encapsulates all university social life needs.
        </h1>
      </div>
    </div>
  )
}

export default Mission
