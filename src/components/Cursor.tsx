import React, { useEffect } from 'react'

const Cursor = () => {
  useEffect(() => {
    const cursor = document.getElementById('cursor')
    if (!cursor) return

    let hasMoved = false
    let lastClientX = 0
    let lastClientY = 0
    let rafId: number | null = null

    const updateCursor = () => {
      cursor.style.top = `${lastClientY}px`
      cursor.style.left = `${lastClientX}px`
      rafId = null
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!hasMoved) {
        cursor.classList.add('active')
        hasMoved = true
      }
      lastClientX = e.clientX
      lastClientY = e.clientY
      if (rafId === null) {
        rafId = requestAnimationFrame(updateCursor)
      }
    }

    const handleEnter = () => cursor.classList.add('hover')
    const handleLeave = () => cursor.classList.remove('hover')

    document.addEventListener('mousemove', handleMouseMove)

    const targets = Array.from(
      document.querySelectorAll('button, a, [data-cursor="hover"]')
    )
    targets.forEach((el) => {
      el.addEventListener('mouseenter', handleEnter)
      el.addEventListener('mouseleave', handleLeave)
    })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      targets.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter)
        el.removeEventListener('mouseleave', handleLeave)
      })
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  return <div id="cursor" />
}

export default Cursor
