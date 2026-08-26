"use client"

import { socials, email } from "@/constants/socials"
import { Icon } from "@iconify/react"

const pages = [
  { label: "Home", target: "home" },
  { label: "Projects", target: "projects" },
  { label: "Tech Stack", target: "tech-stack" },
  { label: "Connect", target: "connect" },
]

export default function Footer() {
  const year = new Date().getFullYear()

  const scrollToSection = (target: string) => {
    if (target === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }
    const el = document.getElementById(target)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <footer className="w-full bg-neutral-950 text-neutral-400 py-12">
      <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-start justify-between gap-8">
        <div className="flex flex-col gap-3">
          <p
            style={{ fontVariationSettings: '"wdth" 125, "wght" 700' }}
            className="font-[var(--font-roboto-slab)] text-[#f4f4f2] text-lg font-bold"
          >
            rylsher<span className="text-neutral-500">.dev</span>
          </p>
          <p className="text-sm leading-relaxed max-w-xs">
            Full-Stack Developer, Data Analyst & Blockchain Developer building
            for the web and beyond.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
            Pages
          </p>
          <div className="flex flex-col gap-2 text-sm">
            {pages.map((page) => (
              <button
                key={page.target}
                onClick={() => scrollToSection(page.target)}
                className="text-left hover:text-[#f4f4f2] transition-colors cursor-pointer"
              >
                {page.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
            Contact
          </p>
          <a
            href={`mailto:${email}`}
            className="text-sm hover:text-[#f4f4f2] transition-colors"
          >
            {email}
          </a>
          <div className="flex gap-3 mt-1">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="grid h-9 w-9 place-items-center rounded-lg bg-neutral-900 text-neutral-400 transition-all hover:bg-white hover:text-black"
              >
                <Icon icon={social.icon} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl px-6 border-t border-neutral-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm">
          &copy; {year} Richie Christian De Guzman. All rights reserved.
        </p>
        <p className="text-sm text-neutral-600">
          Built with Next.js, Tailwind & a little bit of chaos.
        </p>
      </div>
    </footer>
  )
}