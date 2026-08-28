"use client"

import { useEffect, useRef, useState } from "react"

const stops = [
  { id: "home", label: "start" },
  { id: "tech-stack", label: "stack" },
  { id: "projects", label: "work" },
  { id: "achievements", label: "honors" },
  { id: "posts", label: "feed" },
  { id: "connect", label: "connect" },
]

export default function CommitRail() {
  const fillRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState("home")

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        const p = Math.min(Math.max(window.scrollY / Math.max(max, 1), 0), 1)
        if (fillRef.current) {
          fillRef.current.style.transform = `scaleY(${p.toFixed(4)})`
        }
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: "-30% 0px -60% 0px" }
    )
    stops.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const jump = (id: string) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav
      aria-label="Section rail"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <div className="relative flex flex-col items-center">
        <div className="absolute bottom-3 left-1/2 top-3 w-[2px] -translate-x-1/2 bg-neutral-200" />
        <div
          ref={fillRef}
          className="absolute bottom-3 left-1/2 top-3 w-[2px] origin-top -translate-x-1/2 bg-accent"
          style={{ transform: "scaleY(0)" }}
        />

        <ul className="relative flex flex-col gap-4">
          {stops.map((stop) => {
            const isActive = active === stop.id
            return (
              <li key={stop.id} className="group relative flex items-center">
                <button
                  onClick={() => jump(stop.id)}
                  aria-label={stop.label}
                  aria-current={isActive ? "true" : undefined}
                  className="grid h-7 w-7 place-items-center"
                >
                  <span
                    className={`block h-3 w-3 border-2 transition-all duration-200 ${
                      isActive
                        ? "-rotate-45 border-[var(--line)] bg-accent shadow-[2px_2px_0_0_var(--shadow-hard)]"
                        : "border-[var(--line)] bg-white group-hover:bg-accent/40 group-hover:-rotate-45"
                    }`}
                  />
                </button>
                <span className="pointer-events-none absolute right-8 whitespace-nowrap border-2 border-[var(--line)] bg-white px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-black opacity-0 shadow-[3px_3px_0_0_var(--shadow-hard)] transition-opacity duration-150 group-hover:opacity-100">
                  {stop.label}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}