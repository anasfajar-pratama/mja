import type { CSSProperties } from 'react'

interface IconProps {
  name: string
  className?: string
  style?: CSSProperties
}

export default function Icon({ name, className = 'ic', style }: IconProps) {
  return (
    <svg className={className} style={style} aria-hidden="true">
      <use href={`#${name}`} />
    </svg>
  )
}
