import React from 'react'

type TagProps = {
  children: React.ReactNode
  className?: string
}

function Tag({ children, className }: TagProps) {
  return (
    <span
      className={[
        'inline-flex items-center justify-center rounded-full border border-black/40 px-4 py-1.5 text-bodysmall text-[#0c0c0c] dark:border-white/50 dark:text-white',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  )
}

export default Tag
