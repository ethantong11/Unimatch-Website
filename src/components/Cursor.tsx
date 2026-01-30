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

    const hoverSelector = 'button, a, [data-cursor="hover"]'
    const getHoverTarget = (target: EventTarget | null) =>
      target instanceof Element ? target.closest(hoverSelector) : null

    const handlePointerOver = (event: PointerEvent) => {
      if (getHoverTarget(event.target)) {
        cursor.classList.add('hover')
      }
    }

    const handlePointerOut = (event: PointerEvent) => {
      if (!getHoverTarget(event.target)) {
        return
      }
      if (!getHoverTarget(event.relatedTarget)) {
        cursor.classList.remove('hover')
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('pointerover', handlePointerOver)
    document.addEventListener('pointerout', handlePointerOut)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('pointerover', handlePointerOver)
      document.removeEventListener('pointerout', handlePointerOut)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  return <div id="cursor" />
}

export default Cursor
