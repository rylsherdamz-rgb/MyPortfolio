"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null)

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setDark(document.documentElement.dataset.theme === "dark")
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  const toggle = () => {
    const next = !(dark ?? false)
    setDark(next)
    if (next) {
      document.documentElement.dataset.theme = "dark"
    } else {
      delete document.documentElement.dataset.theme
    }
    try {
      localStorage.setItem("theme", next ? "dark" : "light")
    } catch {
      // private mode: theme just won't persist
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="grid h-9 w-9 place-items-center rounded-full border border-neutral-200 text-neutral-600 transition-all hover:border-black hover:text-black"
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}