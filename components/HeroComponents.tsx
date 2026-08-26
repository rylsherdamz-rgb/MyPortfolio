"use client"

import { MapPin, Download, ArrowUpRight } from "lucide-react"
import { stats } from "@/constants/achievements"

const roles = ["Full-Stack Dev", "Data Analyst", "Blockchain Dev"]

const resumePath = "/De_Guzman_Richie_Christian_Resume_Updated.pdf"

export default function HeroComponent() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <div
        data-sc-cue="0.02"
        className="flex flex-wrap items-center gap-x-4 gap-y-3"
      >
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-neutral-600 md:text-sm">
          Hi, I&apos;m Richie Christian De Guzman
        </p>
        <span className="flex items-center gap-1.5 border-2 border-[var(--line)] bg-white px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-neutral-600">
          <MapPin className="h-3 w-3" />
          Antipolo, PH
        </span>
      </div>

      <h1
        data-sc-cue="0.1"
        className="font-display mt-2 max-w-4xl text-5xl uppercase leading-[0.95] text-black sm:text-6xl md:text-7xl lg:text-8xl"
      >
        Crafting{" "}
        <span className="text-accent">beautiful</span> &amp;{" "}
        <span className="bg-[var(--line)] px-2 text-[var(--background)]">
          scalable
        </span>{" "}
        digital products: from the web to the blockchain.
      </h1>

      <div data-sc-cue="0.22" className="flex flex-wrap gap-2">
        {roles.map((role, i) => (
          <span
            key={role}
            className={`inline-flex rotate-[-1deg] items-center gap-2 border-2 border-[var(--line)] bg-white px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-black shadow-[3px_3px_0_0_var(--shadow-hard)] ${
              i % 2 === 1 ? "rotate-[1.5deg]" : ""
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-accent" />
            {role}
          </span>
        ))}
      </div>

      <p
        data-sc-cue="0.32"
        className="mt-1 max-w-2xl border-l-4 border-accent pl-4 text-base leading-relaxed text-gray-600 md:text-lg"
      >
        Full-stack applications, data with real insight, smart contracts and
        decentralized apps. Hackathon champion. Google Cloud Arcade
        Facilitator. Builder of bold ideas into working products.
      </p>

      <div
        data-sc-cue="0.44"
        className="mt-2 flex flex-wrap items-center gap-4"
      >
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
          className="group flex h-12 items-center gap-2 border-2 border-[var(--line)] bg-white px-6 font-mono text-xs font-bold uppercase tracking-widest text-black shadow-[4px_4px_0_0_var(--shadow-hard)] transition-all hover:-translate-y-0.5 hover:bg-accent hover:text-white active:translate-y-0"
        >
          View Work
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>

      <div
        data-sc-cue="0.56"
        className="mt-4 grid max-w-2xl grid-cols-2 gap-x-4 gap-y-6 pt-6 sm:grid-cols-4 sm:gap-x-0"
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={
              i > 0 ? "sm:border-l-2 sm:border-[var(--line)] sm:pl-6" : ""
            }
          >
            <p className="font-display text-3xl tabular-nums text-black md:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-gray-500">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}