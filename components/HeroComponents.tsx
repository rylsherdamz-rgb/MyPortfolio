"use client"

import { MapPin, Download, ArrowUpRight } from "lucide-react"
import { stats } from "@/constants/achievements"

const roles = ["Full-Stack Developer", "Data Analyst", "Blockchain Developer"]

const resumePath = "/De_Guzman_Richie_Christian_Resume_Updated.pdf"

export default function HeroComponent() {
  const scrollToProjects = () => {
    const el = document.getElementById("projects")
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section className="relative w-full py-16 md:py-24">
      {/* Ambient glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 right-[-8%] h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-[-25%] left-[-15%] h-80 w-80 rounded-full bg-neutral-200/70 blur-3xl" />
      </div>

      <div className="relative flex w-full flex-col gap-10">
        <div className="flex flex-col gap-5">
          <p className="text-sm uppercase tracking-widest text-neutral-500 md:text-base">
            Hi, I&apos;m Richie Christian De Guzman
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-500 md:text-base">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Antipolo, Philippines</span>
            </div>

            <div className="hidden h-1 w-1 rounded-full bg-gray-300 sm:block" />

            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <span
                  key={role}
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 px-3 py-1 text-xs font-medium text-neutral-600 backdrop-blur transition-colors hover:border-accent/40 hover:text-neutral-900"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {role}
                </span>
              ))}
            </div>
          </div>

          <h1
            style={{ fontVariationSettings: '"wdth" 135, "wght" 800' }}
            className="mt-2 max-w-4xl font-[var(--font-roboto-flex)] text-4xl leading-tight text-black sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Crafting{" "}
            <span className="text-neutral-400">beautiful</span> and{" "}
            <span className="text-neutral-400">scalable</span> digital
            products — from the web to the blockchain.
          </h1>

          <p className="mt-2 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
            I build polished full-stack applications, analyze data for real
            insight, and ship smart contracts and decentralized apps. A
            hackathon champion, Google Cloud Arcade Facilitator, and lifelong
            learner who loves turning bold ideas into working products.
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <a
            href={resumePath}
            download="De_Guzman_Richie_Christian_Resume.pdf"
            className="group flex h-12 items-center gap-2 rounded-full border border-black bg-black px-6 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-transparent hover:text-black active:translate-y-0"
          >
            <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            Download CV
          </a>

          <button
            onClick={scrollToProjects}
            className="group flex h-12 items-center gap-2 rounded-full border border-neutral-200 px-6 text-neutral-700 transition-all duration-300 hover:-translate-y-1 hover:border-black hover:text-black active:translate-y-0"
          >
            View Work
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="mt-6 grid max-w-2xl grid-cols-2 gap-x-4 gap-y-6 border-t border-neutral-100 pt-8 sm:grid-cols-4 sm:gap-x-0">
          {stats.map((stat, i) => (
            <div key={stat.label} className={i > 0 ? "sm:border-l sm:border-neutral-100 sm:pl-6" : ""}>
              <p className="font-[var(--font-roboto-flex)] text-2xl font-bold tabular-nums text-black md:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wide text-gray-500 md:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}