import { useEffect } from 'react'
import { motion, useAnimationControls } from 'framer-motion'

type RouteTransitionProps = {
  active: boolean
  onCover: () => void
  onDone: () => void
}

const RouteTransition = ({ active, onCover, onDone }: RouteTransitionProps) => {
  const controls = useAnimationControls()

  useEffect(() => {
    if (!active) {
      controls.set({ y: '100%' })
      return
    }

    const run = async () => {
      await controls.start({
        y: '0%',
        transition: { duration: 0.55, ease: [0.8, 0, 0.2, 1] },
      })
      onCover()
      await controls.start({
        y: '-100%',
        transition: { duration: 0.55, ease: [0.8, 0, 0.2, 1] },
      })
      onDone()
    }

    run()
  }, [active, controls, onCover, onDone])

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-white"
      initial={false}
      animate={controls}
    >
      <img src="/images/Logo.png" alt="Logo" className="h-16 w-auto" />
    </motion.div>
  )
}

export default RouteTransition
