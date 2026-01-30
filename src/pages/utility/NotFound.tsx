import React from 'react'
import PrimaryButton from '../../components/PrimaryButton'
import useNoScroll from '../../hooks/useNoScroll'

function NotFound() {
  useNoScroll()

  return (
    <main className="relative z-content flex min-h-screen items-center justify-center px-6 text-center">
      {/* Not found message */}
      <section className="w-full">
        <h1 className="mt-2 whitespace-nowrap text-h1 md:text-h1-md">
          Page not found.
        </h1>
        <PrimaryButton to="/" size="md" className="mt-4">
          Back home
        </PrimaryButton>
      </section>
    </main>
  )
}

export default NotFound
