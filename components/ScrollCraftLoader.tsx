"use client"

import Script from "next/script"

export default function ScrollCraftLoader() {
  const onReady = () => {
    const w = window as unknown as {
      ScrollCraft?: { mount: (root: HTMLElement | string) => void }
      __scMounted?: boolean
    }
    if (!w.ScrollCraft || w.__scMounted) return
    w.__scMounted = true
    w.ScrollCraft.mount(document.body)

    // The browser jumps to /#section before ScrollCraft lays the page out
    // (pins, spacers) and before images above the target load, so arriving from
    // another page lands short. Redo the jump once fonts settle and again on
    // load, until the reader scrolls themselves. Only for a fresh navigation to
    // the home page: on reload or back/forward the browser's restored position wins.
    const nav = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined
    if (location.pathname !== "/" || (nav && nav.type !== "navigate")) return
    let id = ""
    try {
      id = decodeURIComponent(location.hash.slice(1))
    } catch {
      return // malformed hash like /#100%
    }
    const target = id ? document.getElementById(id) : null
    if (!target) return

    let userMoved = false
    const stop = () => {
      userMoved = true
    }
    const events = ["wheel", "touchstart", "keydown", "pointerdown"]
    events.forEach((e) => addEventListener(e, stop, { once: true, passive: true }))
    const jump = () => {
      if (!userMoved) requestAnimationFrame(() => target.scrollIntoView({ behavior: "instant" }))
    }
    document.fonts.ready.then(jump)
    if (document.readyState === "complete") jump()
    else addEventListener("load", jump, { once: true })
  }

  return (
    <Script
      src="/scrollcraft.js"
      strategy="afterInteractive"
      onLoad={onReady}
      onError={() => {}}
    />
  )
}