"use client"

import { MapPin, Download, ArrowUpRight } from "lucide-react"

const roles = ["Full-Stack", "Data", "Blockchain"]
const resumePath = "/De_Guzman_Richie_Christian_Resume_Updated.pdf"

/**
 * The hero overlay. Real, designed page typography that frames the 3D room:
 * the monitor shows the live terminal, while this establishes who/what at a
 * glance with a strong Anton headline, role chips, a tagline, and clear CTAs.
 *
 * Anchored bottom-left over a soft edge scrim so it never veils the room; the
 * scrim only sits behind the text for legibility.
 */
export default function HeroOverlay({
  onOpenDetails,
}: {
  onOpenDetails?: () => void
}) {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
      {/* Legibility scrim: bottom-anchored gradient, only behind the copy. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[70vh] bg-gradient-to-t from-[color-mix(in_oklab,var(--background)_88%,transparent)] via-[color-mix(in_oklab,var(--background)_40%,transparent)] to-transparent"
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-5 px-6 pb-14 md:px-12 md:pb-20">
        <div className="pointer-events-auto flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1.5 border-2 border-[var(--line)] bg-[color-mix(in_oklab,var(--background)_85%,transparent)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-600 backdrop-blur">
            <MapPin className="h-3 w-3" />
            Antipolo, PH
          </span>
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-neutral-500">
            Available for work
          </span>
        </div>

        <h1 className="font-display max-w-4xl text-5xl uppercase leading-[0.9] text-[var(--foreground)] drop-shadow-sm sm:text-6xl md:text-7xl lg:text-8xl">
          Richie Christian
          <br />
          <span className="text-accent">De Guzman</span>
        </h1>

        <div className="pointer-events-auto flex flex-wrap items-center gap-2">
          {roles.map((r, i) => (
            <span
              key={r}
              className={`inline-flex items-center gap-2 border-2 border-[var(--line)] bg-[color-mix(in_oklab,var(--background)_85%,transparent)] px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[var(--foreground)] shadow-[3px_3px_0_0_var(--shadow-hard)] backdrop-blur ${
                i % 2 ? "rotate-[1.5deg]" : "rotate-[-1deg]"
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-accent" />
              {r}
            </span>
          ))}
        </div>

        <p className="max-w-xl border-l-4 border-accent pl-4 text-sm leading-relaxed text-neutral-600 md:text-base">
          I build beautiful, scalable products — from the web to the blockchain.
          Hackathon champion · Google Cloud Arcade Facilitator. Everything you
          see runs on the machine to the right. →
        </p>

        <div className="pointer-events-auto mt-1 flex flex-wrap items-center gap-3">
          <a
            href={resumePath}
            download="De_Guzman_Richie_Christian_Resume.pdf"
            className="btn-accent-hover flex h-12 items-center gap-2 border-2 border-[var(--line)] bg-accent px-6 font-mono text-xs font-bold uppercase tracking-widest text-white shadow-[4px_4px_0_0_var(--shadow-hard)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Download className="h-4 w-4" />
            Download CV
          </a>
          <button
            onClick={scrollToProjects}
            className="group flex h-12 items-center gap-2 border-2 border-[var(--line)] bg-[color-mix(in_oklab,var(--background)_85%,transparent)] px-6 font-mono text-xs font-bold uppercase tracking-widest text-[var(--foreground)] shadow-[4px_4px_0_0_var(--shadow-hard)] backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-accent hover:text-white active:translate-y-0"
          >
            View Work
            <ArrowUpRight className="h-4 w-4" />
          </button>
          {onOpenDetails ? (
            <button
              onClick={onOpenDetails}
              className="flex h-12 items-center gap-2 px-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-neutral-500 underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              Full details
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
