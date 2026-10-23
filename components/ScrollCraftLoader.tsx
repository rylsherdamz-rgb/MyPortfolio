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
    // (pins, spacers), so arriving from another page lands short. Redo the jump
    // once layout and fonts have settled.
    const id = decodeURIComponent(location.hash.slice(1))
    if (id) {
      document.fonts.ready.then(() =>
        requestAnimationFrame(() =>
          document.getElementById(id)?.scrollIntoView({ behavior: "instant" })
        )
      )
    }
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