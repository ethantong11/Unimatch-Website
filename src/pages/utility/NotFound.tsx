import React from 'react'
import PrimaryButton from '../../components/PrimaryButton'
import useNoScroll from '../../hooks/useNoScroll'

function NotFound() {
  useNoScroll()

  return (
    <main className="relative z-content flex min-h-screen items-center justify-center px-lg text-center">
      {/* Not found message */}
      <section className="w-full">
        <h1 className="mt-xs whitespace-nowrap text-h1 md:text-h1-md">
          Page not found.
        </h1>
        <PrimaryButton to="/" size="md" className="mt-lg">
          Back to Home
        </PrimaryButton>
      </section>
    </main>
  )
}

export default NotFound
