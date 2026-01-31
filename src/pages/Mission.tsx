import React from 'react'
import Tag from '../components/Tag'
import useNoScroll from '../hooks/useNoScroll'

function Mission() {
  useNoScroll()

  return (
    <main className="relative z-content flex min-h-screen items-center justify-center px-lg">
      {/* Mission statement */}
      <section className="w-full max-w-7xl text-left">
        <header>
          <Tag>Our Mission</Tag>
          <h1 className="mt-lg text-h1 md:text-h1-md">
            Our mission is to create a one-for-all platform that encapsulates all university social life needs.
          </h1>
        </header>
      </section>
    </main>
  )
}

export default Mission
