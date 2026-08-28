"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import ThemeToggle from "@/components/ThemeToggle"

const navLinks = [
  { label: "Stack", target: "tech-stack" },
  { label: "Work", target: "projects" },
  { label: "Honors", target: "achievements" },
  { label: "Feed", target: "posts" },
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
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth" })
  }

  const handleContact = () => {
    setOpen(false)
    window.location.href = "mailto:richiechristiandeguzman11@gmail.com"
  }

  return (
    <nav
      className={`flex w-full flex-col px-6 transition-all duration-300 md:px-20 ${
        scrolled
          ? "border-b-2 border-[var(--line)] bg-[color-mix(in_oklab,var(--background)_95%,transparent)] py-3 backdrop-blur-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="flex items-center justify-between">
        <button
          onClick={() => scrollToSection("home")}
          className="font-display cursor-pointer select-none text-xl uppercase text-black"
        >
          rylsher<span className="text-accent">.dev</span>
        </button>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.target)}
              className={`select-none cursor-pointer font-mono text-xs font-semibold uppercase tracking-widest transition-colors ${
                active === link.target
                  ? "bg-accent px-2 py-1 text-white"
                  : "text-neutral-500 hover:text-black"
              }`}
            >
              {link.label}
            </button>
          ))}

          <ThemeToggle />

          <button
            onClick={handleContact}
            className="btn-accent-hover border-2 border-[var(--line)] bg-accent px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-white shadow-[3px_3px_0_0_var(--shadow-hard)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Let&apos;s Talk
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="border-2 border-[var(--line)] p-2 text-black transition active:scale-95"
            aria-label="Toggle menu"
          >
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out md:hidden ${
          open ? "mt-4 max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 border-t-2 border-[var(--line)] pt-4">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.target)}
              className={`select-none cursor-pointer text-left font-mono text-sm font-semibold uppercase tracking-widest transition-colors ${
                active === link.target
                  ? "bg-accent px-2 py-1 text-white"
                  : "text-neutral-600 hover:text-black"
              }`}
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={handleContact}
            className="btn-accent-hover mt-3 border-2 border-[var(--line)] bg-accent px-5 py-3 text-left font-mono text-xs font-bold uppercase tracking-widest text-white shadow-[3px_3px_0_0_var(--shadow-hard)]"
          >
            Let&apos;s Talk
          </button>
        </div>
      </div>
    </nav>
  )
}