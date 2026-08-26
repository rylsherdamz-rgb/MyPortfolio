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
      className="grid h-9 w-9 place-items-center border-2 border-[var(--line)] bg-white text-black shadow-[2px_2px_0_0_var(--shadow-hard)] transition-transform hover:-translate-y-0.5"
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}