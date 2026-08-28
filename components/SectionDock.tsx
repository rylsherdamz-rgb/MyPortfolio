"use client"

import { useState, type ReactNode } from "react"
import { ChevronRight } from "lucide-react"

/**
 * A full-height scroll region for one section. The room (with its on-object
 * content) is the star, so the section's HTML content is docked to one side in
 * a collapsible translucent panel: it stays accessible and readable, but the
 * center of the screen keeps the 3D object it maps to in view.
 *
 * `side` picks which edge the dock sits on so it doesn't cover the object the
 * camera is focusing (e.g. window is screen-right, so dock left).
 */
export default function SectionDock({
  id,
  eyebrow,
  side = "left",
  children,
}: {
  id: string
  eyebrow: string
  side?: "left" | "right"
  children: ReactNode
}) {
  const [open, setOpen] = useState(true)

  return (
    <section
      id={id}
      className="relative flex min-h-screen w-full items-center scroll-mt-16"
      aria-label={eyebrow}
    >
      <div
        className={`pointer-events-none flex w-full px-4 md:px-8 ${
          side === "right" ? "justify-end" : "justify-start"
        }`}
      >
        <div className="pointer-events-auto w-full max-w-md lg:max-w-lg">
          {/* Section tab: label + collapse toggle. */}
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-block bg-[var(--line)] px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--background)]">
              {eyebrow}
            </span>
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-1 border-2 border-[var(--line)] bg-[color-mix(in_oklab,var(--background)_80%,transparent)] px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-black backdrop-blur transition-colors hover:bg-accent hover:text-white"
              aria-expanded={open}
            >
              <ChevronRight
                className={`h-3 w-3 transition-transform ${
                  open ? "rotate-90" : ""
                }`}
              />
              {open ? "hide" : "details"}
            </button>
          </div>

          {/* Docked content panel — translucent so the room reads behind it. */}
          <div
            className={`origin-top overflow-hidden transition-all duration-300 ${
              open
                ? "max-h-[75vh] opacity-100"
                : "pointer-events-none max-h-0 opacity-0"
            }`}
          >
            <div className="room-glass max-h-[75vh] overflow-y-auto rounded-none border-2 border-[var(--line)] shadow-[6px_6px_0_0_var(--shadow-hard)]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
