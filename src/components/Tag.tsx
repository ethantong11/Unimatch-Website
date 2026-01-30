import React from 'react'

type TagProps = {
  children: React.ReactNode
  className?: string
}

function Tag({ children, className }: TagProps) {
  return (
    <span
      className={[
        'inline-flex items-center justify-center rounded-full border border-primary px-4 py-1.5 text-bodysmall text-primary',
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
