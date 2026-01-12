"use client"

import { useState } from "react"
import { Menu, ArrowRight, X } from "lucide-react"
import {useRouter} from "next/navigation"

export default function NavigationBar() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  return (
    <nav className="w-full px-6 md:px-20 py-5 flex flex-col">
      <div className="flex items-center justify-between">
        <p
          style={{ fontVariationSettings: '"wdth" 125, "wght" 700' }}
          className="font-[var(--font-roboto-slab)] text-black text-lg font-bold select-none"
        >
          rylsher<span className="text-gray-500">.dev</span>
        </p>

        <div className="hidden md:flex text-black  items-center gap-5">
        <p
          onClick={() => router.push("/projects")}
          style={{ fontVariationSettings: '"wdth" 125, "wght" 700' }}
          className="font-[var(--font-roboto-slab)] hover:text-gray-500 transition-300 ease-in-out text-black text-lg font-bold select-none"
        >
          Projects
        </p>
         <p

          onClick={() => router.push("/techstack")}
          style={{ fontVariationSettings: '"wdth" 125, "wght" 700' }}
          className="font-[var(--font-roboto-slab)] hover:text-gray-500 transition-300 ease-in-out  text-black text-lg font-bold select-none"
        >
          TechStack
        </p>
        <p

          onClick={() => router.push("/socials")}
          style={{ fontVariationSettings: '"wdth" 125, "wght" 700' }}
          className="font-[var(--font-roboto-slab)] hover:text-gray-500 transition-300 ease-in-out  text-black text-lg font-bold select-none"
        >
            Socials
        </p>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-black p-2 rounded-full transition 
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
        <p
          onClick={() => router.push("/projects")}
          style={{ fontVariationSettings: '"wdth" 125, "wght" 700' }}
          className="font-[var(--font-roboto-slab)] hover:text-gray-500 transition-300 ease-in-out text-black text-lg font-bold select-none"
        >
          Projects
        </p>
         <p

          onClick={() => router.push("/techstack")}
          style={{ fontVariationSettings: '"wdth" 125, "wght" 700' }}
          className="font-[var(--font-roboto-slab)] hover:text-gray-500 transition-300 ease-in-out  text-black text-lg font-bold select-none"
        >
          TechStack
        </p>
        <p

          onClick={() => router.push("/socials")}
          style={{ fontVariationSettings: '"wdth" 125, "wght" 700' }}
          className="font-[var(--font-roboto-slab)] hover:text-gray-500 transition-300 ease-in-out  text-black text-lg font-bold select-none"
        >
            Socials
        </p>
        </div>
      </div>
    </nav>
  )
}

