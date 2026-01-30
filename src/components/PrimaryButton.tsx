import React from 'react'
import { NavLink } from 'react-router-dom'

type PrimaryButtonBaseProps = {
  size?: 'sm' | 'md'
  className?: string
  children: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

type PrimaryButtonLinkProps = PrimaryButtonBaseProps & {
  to: string
  href?: never
  target?: never
  rel?: never
}

type PrimaryButtonAnchorProps = PrimaryButtonBaseProps & {
  href: string
  to?: never
  target?: string
  rel?: string
}

type PrimaryButtonProps = PrimaryButtonLinkProps | PrimaryButtonAnchorProps

function PrimaryButton({
  size = 'md',
  className = '',
  children,
  onClick,
  ...rest
}: PrimaryButtonProps) {
  const classes = `primary-button primary-button--${size} ${className}`.trim()

  if ('to' in rest) {
    return (
      <NavLink to={rest.to} className={classes} onClick={onClick}>
        {children}
      </NavLink>
    )
  }

  return (
    <a
      href={rest.href}
      target={rest.target}
      rel={rest.rel}
      className={classes}
      onClick={onClick}
    >
      {children}
    </a>
  )
}

export default PrimaryButton
