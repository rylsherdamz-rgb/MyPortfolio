"use client"

import { useRef, useCallback, type ReactNode } from "react"
import { usePrefersReducedMotion } from "./use3D"

/**
 * A lightweight, GPU-friendly 3D tilt wrapper. Uses a CSS perspective transform
 * driven by pointer position instead of WebGL, so it stays cheap and works on
 * every card without spawning canvases. Adds a moving specular glare to sell
 * the depth. Honors reduced-motion by disabling the effect entirely.
 */
export default function TiltCard({
  children,
  className = "",
  max = 10,
  glare = true,
}: {
  children: ReactNode
  className?: string
  /** Maximum tilt in degrees on each axis. */
  max?: number
  /** Whether to render the moving glare highlight. */
  glare?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const frame = useRef<number | null>(null)

  const handleMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reducedMotion || !ref.current) return
      const el = ref.current
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width // 0..1
      const py = (e.clientY - rect.top) / rect.height // 0..1
      const rotY = (px - 0.5) * 2 * max
      const rotX = -(py - 0.5) * 2 * max

      if (frame.current) cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateX(${rotX.toFixed(
          2
        )}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(0)`
        if (glareRef.current) {
          glareRef.current.style.opacity = "1"
          glareRef.current.style.background = `radial-gradient(circle at ${
            px * 100
          }% ${py * 100}%, rgba(255,255,255,0.35), transparent 55%)`
        }
      })
    },
    [max, reducedMotion]
  )

  const reset = useCallback(() => {
    if (!ref.current) return
    if (frame.current) cancelAnimationFrame(frame.current)
    ref.current.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg)"
    if (glareRef.current) glareRef.current.style.opacity = "0"
  }, [])

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className={`relative transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
      {glare ? (
        <div
          ref={glareRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200"
          style={{ mixBlendMode: "overlay" }}
        />
      ) : null}
    </div>
  )
}
