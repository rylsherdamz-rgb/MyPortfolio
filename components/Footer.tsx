"use client"

import { socials, email } from "@/constants/socials"
import { Icon } from "@iconify/react"
import LogoMark from "@/components/LogoMark"
import { usePathname } from "next/navigation"

const pages = [
  { label: "Home", target: "home" },
  { label: "Stack", target: "tech-stack" },
  { label: "Work", target: "projects" },
  { label: "Apps", target: "apps" },
  { label: "Honors", target: "achievements" },
  { label: "Connect", target: "connect" },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const pathname = usePathname()

  const scrollToSection = (target: string) => {
    if (pathname !== "/") {
      window.location.assign(target === "home" ? "/" : `/#${target}`)
      return
    }
    if (target === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <footer className="w-full border-t-4 border-accent bg-[#111112] text-[#a8a8b0]">
      <div className="dots-bg pointer-events-none h-3 w-full opacity-30" />

      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-10 px-6 py-14 md:flex-row">
        <div className="flex flex-col gap-4">
          <p className="font-display flex items-center gap-3 text-2xl uppercase text-[#f4f4f2]">
            <LogoMark className="h-8 w-8 shrink-0" ink="#f4f4f2" />
            <span>
              rylsher<span className="text-accent">.dev</span>
            </span>
          </p>
          <p className="max-w-xs font-mono text-xs leading-relaxed uppercase tracking-wider">
            Full-Stack Dev, Data Analyst &amp; Blockchain Dev building for the
            web and beyond.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#6d6d76]">
            Pages
          </p>
          <div className="flex flex-col gap-2 font-mono text-xs font-semibold uppercase tracking-widest">
            {pages.map((page) => (
              <button
                key={page.target}
                onClick={() => scrollToSection(page.target)}
                className="text-left transition-colors hover:text-accent"
              >
                {page.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#6d6d76]">
            Contact
          </p>
          <a
            href={`mailto:${email}`}
            className="font-mono text-xs tracking-wide hover:text-accent"
          >
            {email}
          </a>
          <div className="mt-1 flex gap-2">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="grid h-9 w-9 place-items-center border-2 border-[#2c2c31] bg-[#17171a] text-[#a8a8b0] transition-all hover:border-accent hover:bg-accent hover:text-white"
              >
                <Icon icon={social.icon} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t-2 border-[#232327] px-6 py-6 sm:flex-row">
        <p className="font-mono text-[10px] uppercase tracking-widest">
          &copy; {year} Richie Christian De Guzman
        </p>
        <p className="font-mono text-[10px] uppercase tracking-widest text-[#5c5c64]">
          Next.js + Tailwind + a little chaos
        </p>
      </div>
    </footer>
  )
}