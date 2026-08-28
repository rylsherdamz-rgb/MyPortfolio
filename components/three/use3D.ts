"use client"

import { useEffect, useState, useSyncExternalStore } from "react"

/**
 * Respects the user's OS-level "reduce motion" preference.
 * When true, 3D scenes should render static or heavily damped motion.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  return reduced
}

/**
 * Palette tokens the 3D layers consume so WebGL colors stay in sync with the
 * CSS brand tokens. Tracks the `data-theme` attribute on <html> which the site
 * toggles for dark mode.
 */
export type ThreePalette = {
  theme: "light" | "dark"
  /** Vermillion accent. */
  accent: string
  /** Ink line color (near-black in light, near-white in dark). */
  line: string
  /** Page background. */
  background: string
}

const LIGHT: ThreePalette = {
  theme: "light",
  accent: "#eb4b27",
  line: "#141414",
  background: "#f7f5f0",
}

const DARK: ThreePalette = {
  theme: "dark",
  accent: "#ff5c33",
  line: "#f2f1ec",
  background: "#101013",
}

export function useThreePalette(): ThreePalette {
  const [palette, setPalette] = useState<ThreePalette>(LIGHT)

  useEffect(() => {
    const read = () => {
      const isDark = document.documentElement.dataset.theme === "dark"
      setPalette(isDark ? DARK : LIGHT)
    }
    read()

    const observer = new MutationObserver(read)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    })
    return () => observer.disconnect()
  }, [])

  return palette
}

/**
 * True once running on the client. Uses useSyncExternalStore so the server
 * snapshot is always `false` and the client snapshot is `true`, avoiding
 * setState-in-effect while still gating Canvas rendering to the client.
 */
const emptySubscribe = () => () => {}
export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true, // client snapshot
    () => false // server snapshot
  )
}

/**
 * Lightweight check for low-power / small touch devices where a heavy WebGL
 * layer should be skipped in favor of the existing CSS manga-ink atmosphere.
 * Computed via useSyncExternalStore so it reads real device capabilities on
 * the client and safely returns `false` during SSR.
 */
function computeLowPower(): boolean {
  const coarse = window.matchMedia("(pointer: coarse)").matches
  const narrow = window.innerWidth < 768
  const cores =
    typeof navigator !== "undefined" &&
    typeof navigator.hardwareConcurrency === "number"
      ? navigator.hardwareConcurrency
      : 8
  const fewCores = cores > 0 && cores <= 4
  return coarse && (narrow || fewCores)
}

export function useIsLowPower(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    computeLowPower, // client snapshot
    () => false // server snapshot
  )
}
