"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Tech Stack", target: "tech-stack" },
  { label: "Projects", target: "projects" },
  { label: "Achievements", target: "achievements" },
  { label: "LinkedIn", target: "posts" },
  { label: "Connect", target: "connect" },
]

export default function NavigationBar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("home")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const ids = ["home", ...navLinks.map((l) => l.target)]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: "-30% 0px -60% 0px" }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

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
    <nav
      className={`flex w-full flex-col px-6 transition-all duration-300 md:px-20 ${
        scrolled
          ? "border-b border-neutral-100 bg-white/85 py-3 backdrop-blur-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="flex items-center justify-between">
        <button
          onClick={() => scrollToSection("home")}
          style={{ fontVariationSettings: '"wdth" 125, "wght" 700' }}
          className="cursor-pointer select-none font-[var(--font-roboto-slab)] text-lg font-bold text-black"
        >
          rylsher<span className="text-gray-500">.dev</span>
        </button>

        <div className="hidden items-center gap-7 text-black md:flex">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.target)}
              className={`select-none cursor-pointer text-sm font-medium transition-colors ${
                active === link.target
                  ? "text-black underline decoration-accent decoration-2 underline-offset-8"
                  : "text-neutral-500 hover:text-black"
              }`}
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={handleContact}
            className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-accent active:translate-y-0"
          >
            Let&apos;s Talk
          </button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="p-2 text-black transition rounded-full focus:outline-none hover:bg-black/10 active:scale-95 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? (
            <X className="h-6 w-6 rotate-90 transition-transform" />
          ) : (
            <Menu className="h-6 w-6 transition-transform" />
          )}
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out md:hidden ${
          open ? "mt-4 max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4 border-t pt-4">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.target)}
              className={`select-none cursor-pointer text-left text-lg font-medium transition-colors ${
                active === link.target ? "text-black" : "text-neutral-500 hover:text-black"
              }`}
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={handleContact}
            className="mt-2 rounded-full bg-black px-5 py-3 text-left text-sm font-medium text-white transition-all hover:bg-accent"
          >
            Let&apos;s Talk
          </button>
        </div>
      </div>
    </nav>
  )
}