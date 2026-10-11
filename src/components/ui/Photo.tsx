import { useState } from 'react'

type Props = {
  src: string
  alt: string
  className?: string
  priority?: boolean
}

export function Photo({ src, alt, className = '', priority = false }: Props) {
  const [failed, setFailed] = useState(!src)

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`bg-[radial-gradient(circle_at_30%_20%,#ffffff,#d5eaf3_45%,#9fd0e2)] ${className}`}
      />
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}
