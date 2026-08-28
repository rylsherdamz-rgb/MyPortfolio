"use client"

import { useEffect, useState, type ReactNode } from "react"
import { X, PanelRightOpen } from "lucide-react"

export type HudSection = {
  id: string
  label: string
  content: ReactNode
}

/**
 * The fixed heads-up display for the room experience. It does three jobs:
 *  1. A right-edge progress rail that shows every section and highlights the
 *     active one as you scroll (the camera dives to the matching object).
 *  2. Clicking a rail item scrolls to that section.
 *  3. A "Details" control that opens a designed slide-in drawer holding the
 *     full HTML content for the active section (accessible, deep reading),
 *     without ever veiling the 3D room when closed.
 *
 * This replaces the old floating tab + stray commit rail with one coherent,
 * intentional UI layer.
 */
export default function RoomHUD({ sections }: { sections: HudSection[] }) {
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)

  // Track active section from scroll progress (same mapping the camera uses).
  useEffect(() => {
    const onScroll = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight || 1
      const p = Math.min(Math.max(window.scrollY / max, 0), 1)
      const idx = Math.round(p * (sections.length - 1))
      setActive(idx)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [sections.length])

  // Close drawer on Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const go = (i: number) => {
    const el = document.getElementById(sections[i].id)
    el?.scrollIntoView({ behavior: "smooth" })
  }

  const activeSection = sections[active]

  return (
    <>
      {/* Progress rail — fixed right edge, vertically centered. */}
      <div className="pointer-events-none fixed right-4 top-1/2 z-30 -translate-y-1/2 md:right-6">
        <div className="pointer-events-auto flex flex-col items-end gap-3">
          {sections.map((s, i) => {
            const isActive = i === active
            return (
              <button
                key={s.id}
                onClick={() => go(i)}
                className="group flex items-center gap-2"
                aria-label={`Go to ${s.label}`}
                aria-current={isActive}
              >
                <span
                  className={`font-mono text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                    isActive
                      ? "translate-x-0 text-accent opacity-100"
                      : "translate-x-1 text-neutral-500 opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {s.label}
                </span>
                <span
                  className={`block border-2 border-[var(--line)] transition-all duration-300 ${
                    isActive
                      ? "h-3 w-3 rotate-45 bg-accent"
                      : "h-2 w-2 bg-[color-mix(in_oklab,var(--background)_70%,transparent)] group-hover:bg-accent"
                  }`}
                />
              </button>
            )
          })}
        </div>
      </div>

      {/* Details trigger — fixed bottom-right, clearly a control. */}
      <button
        onClick={() => setOpen(true)}
        className="btn-accent-hover fixed bottom-5 right-4 z-30 flex items-center gap-2 border-2 border-[var(--line)] bg-[color-mix(in_oklab,var(--background)_88%,transparent)] px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-widest text-[var(--foreground)] shadow-[4px_4px_0_0_var(--shadow-hard)] backdrop-blur transition-transform hover:-translate-y-0.5 md:right-6"
      >
        <PanelRightOpen className="h-4 w-4" />
        {activeSection?.label} details
      </button>

      {/* Slide-in drawer. */}
      <div
        className={`fixed inset-0 z-40 transition-[visibility] ${
          open ? "visible" : "invisible"
        }`}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Panel */}
        <aside
          className={`absolute right-0 top-0 flex h-full w-full max-w-xl flex-col border-l-2 border-[var(--line)] bg-[var(--sc-surface,#fff)] shadow-[-8px_0_0_0_var(--shadow-hard)] transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <header className="flex items-center justify-between border-b-2 border-[var(--line)] px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="bg-[var(--line)] px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--background)]">
                {activeSection?.label}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                {active + 1}/{sections.length}
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="grid h-9 w-9 place-items-center border-2 border-[var(--line)] bg-[var(--background)] text-[var(--foreground)] transition-colors hover:bg-accent hover:text-white"
              aria-label="Close details"
            >
              <X className="h-4 w-4" />
            </button>
          </header>
          <div className="flex-1 overflow-y-auto">{activeSection?.content}</div>
        </aside>
      </div>
    </>
  )
}
