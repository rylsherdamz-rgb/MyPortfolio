"use client"

import { useState } from "react"
import { Menu, ArrowRight, X } from "lucide-react"

export default function NavigationBar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="w-full px-6 md:px-20 py-5 flex flex-col">
      <div className="flex items-center justify-between">
        <p
          style={{ fontVariationSettings: '"wdth" 125, "wght" 700' }}
          className="font-[var(--font-roboto-slab)] text-black text-lg font-bold select-none"
        >
          rylsher<span className="text-gray-300">.dev</span>
        </p>

        <div className="hidden md:flex items-center gap-5">
          <button className="group border border-black rounded-2xl px-5 py-2 h-10 flex items-center gap-2 transition-all duration-300 hover:bg-black hover:text-white hover:-translate-y-0.5 active:translate-y-0">
            Let&apos;s Talk
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <button
            aria-label="Menu"
            className="p-2 rounded-full focus:outline-none transition hover:bg-black/10 active:scale-95"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-full transition 
          focus:outline-none
          hover:bg-black/10 active:scale-95"
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
          open ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4 border-t pt-4">
          <button className="group focus-outline-none w-full border border-black rounded-2xl px-5 py-3 flex items-center justify-center gap-2 transition-all hover:bg-black hover:text-white">
            Let&apos;s Talk
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </nav>
  )
}

