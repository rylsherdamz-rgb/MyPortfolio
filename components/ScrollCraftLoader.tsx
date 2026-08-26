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