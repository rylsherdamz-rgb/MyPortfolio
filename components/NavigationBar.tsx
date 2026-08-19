"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Home", target: "home" },
  { label: "Tech Stack", target: "tech-stack" },
  { label: "Projects", target: "projects" },
  { label: "Achievements", target: "achievements" },
  { label: "Connect", target: "connect" },
]

export default function NavigationBar() {
  const [open, setOpen] = useState(false)

  const scrollToSection = (target: string) => {
    setOpen(false)
    if (target === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }
    const el = document.getElementById(target)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const handleContact = () => {
    setOpen(false)
    window.location.href = "mailto:richiechristiandeguzman11@gmail.com"
  }

  return (
    <nav className="w-full px-6 md:px-20 py-5 flex flex-col">
      <div className="flex items-center justify-between">
        <button
          onClick={() => scrollToSection("home")}
          style={{ fontVariationSettings: '"wdth" 125, "wght" 700' }}
          className="font-[var(--font-roboto-slab)] text-black text-lg font-bold select-none cursor-pointer"
        >
          rylsher<span className="text-gray-500">.dev</span>
        </button>

        <div className="hidden md:flex text-black items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.target)}
              className="text-sm font-medium text-neutral-500 transition-colors hover:text-black cursor-pointer select-none"
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={handleContact}
            className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-neutral-800 hover:-translate-y-0.5 active:translate-y-0"
          >
            Let&apos;s Talk
          </button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-black p-2 rounded-full transition 
          focus:outline-none
          hover:bg-black/10 active:scale-95"
          aria-label="Toggle menu"
        >
          {open ? (
            <X className="w-6 h-6 rotate-90 transition-transform" />
          ) : (
            <Menu className="w-6 h-6 transition-transform" />
          )}
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4 border-t pt-4">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.target)}
              className="text-left text-lg font-medium text-neutral-500 hover:text-black cursor-pointer select-none transition-colors"
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={handleContact}
            className="mt-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition-all hover:bg-neutral-800 text-left"
          >
            Let&apos;s Talk
          </button>
        </div>
      </div>
    </nav>
  )
}