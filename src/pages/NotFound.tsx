import React from 'react'
import PrimaryButton from '../components/PrimaryButton'

function NotFound() {
  return (
    <div className="relative z-content flex min-h-screen items-center justify-center px-6 text-center">
      <div className="w-full">
        <h1 className="mt-2 whitespace-nowrap text-[clamp(2.75rem,8vw,7rem)] font-semibold tracking-tight text-[#0c0c0c] dark:text-white">
          Page not found.
        </h1>
        <PrimaryButton to="/" size="md" className="mt-3">
          Back home
        </PrimaryButton>
      </div>
    </div>
  )
}

export default NotFound
