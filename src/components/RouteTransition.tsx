import { useEffect, useRef } from 'react'
import { motion, useAnimationControls } from 'framer-motion'

type RouteTransitionProps = {
  active: boolean
  onCover: () => void
  onDone: () => void
}

const RouteTransition = ({ active, onCover, onDone }: RouteTransitionProps) => {
  const controls = useAnimationControls()
  const hasPlayedIntro = useRef(false)

  useEffect(() => {
    if (!active) {
      if (hasPlayedIntro.current) {
        controls.set({ y: '100%' })
        return
      }

      const runIntro = async () => {
        hasPlayedIntro.current = true
        controls.set({ y: '0%' })
        await controls.start({
          y: '-100%',
          transition: { duration: 0.8, ease: [0.8, 0, 0.2, 1] },
        })
        onDone()
      }

      runIntro()
      return
    }

    const run = async () => {
      await controls.start({
        y: '0%',
        transition: { duration: 0.8, ease: [0.8, 0, 0.2, 1] },
      })
      onCover()
      await controls.start({
        y: '-100%',
        transition: { duration: 0.8, ease: [0.8, 0, 0.2, 1] },
      })
      onDone()
    }

    run()
  }, [active, controls, onCover, onDone])

  return (
    <>
      <svg
        className="absolute h-0 w-0"
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <clipPath id="route-transition-clip" clipPathUnits="objectBoundingBox">
            <path d="M0,0.06 C0.22,0 0.78,0 1,0.06 L1,0.94 C0.78,1 0.22,1 0,0.94 Z" />
          </clipPath>
        </defs>
      </svg>
      <motion.div
        className="pointer-events-none fixed -inset-y-24 inset-x-0 z-50 flex items-center justify-center bg-white"
        style={{
          height: 'calc(100% + 12rem)',
          clipPath: 'url(#route-transition-clip)',
          WebkitClipPath: 'url(#route-transition-clip)',
        }}
        initial={false}
        animate={controls}
      >
        <img src="/images/Logo.png" alt="Logo" className="h-16 w-auto" />
      </motion.div>
    </>
  )
}

export default RouteTransition
