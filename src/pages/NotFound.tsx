import React from 'react'
import PrimaryButton from '../components/PrimaryButton'

function NotFound() {
  return (
    <div className="relative z-content flex min-h-screen items-center justify-center px-6 text-center">
      <div className="w-full">
        <h1 className="mt-2 whitespace-nowrap text-h1 md:text-h1-md">
          Page not found.
        </h1>
        <PrimaryButton to="/" size="md" className="mt-4">
          Back home
        </PrimaryButton>
      </div>
    </div>
  )
}

export default NotFound
