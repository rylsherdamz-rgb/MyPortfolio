"use client"

import { Icon } from "@iconify/react"
import { techStack } from "@/constants/techstack"
import SectionHeader from "@/components/SectionHeader"
import { Code2 } from "lucide-react"
import TiltCard from "@/components/three/TiltCard"

export default function TechStack() {
  const categories = Object.entries(techStack)

  const labelFor = (category: string) =>
    ({
      Web3: "Web3",
      "Data & AI": "Data & AI",
      "Cloud & DevOps": "Cloud & DevOps",
      VersionControl: "Version Control",
    })[category] ?? category

  return (
    <section className="w-full px-6 py-16 md:px-20 md:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeader
          icon={Code2}
          title={
            <>
              Tech <span className="text-accent">Stack</span>
            </>
          }
          description="The languages, frameworks, and platforms I reach for when building products end to end."
        />

        <div
          data-sc-in
          data-sc-stagger="60"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {categories.map(([category, items]) => (
            <TiltCard key={category} max={8}>
              <div className="card-hard rounded-none bg-white p-5">
                <p className="mb-4 inline-block bg-[var(--line)] px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--background)]">
                  {labelFor(category)}
                </p>

                <div className="flex flex-wrap gap-2">
                  {items.map(({ name, icon }) => (
                    <span
                      key={name}
                      className="inline-flex items-center gap-2 border-2 border-[var(--line)] bg-white px-2.5 py-1.5 text-xs font-semibold text-black transition-all duration-150 hover:-translate-y-0.5 hover:bg-accent hover:text-white"
                    >
                      <Icon icon={icon} className="h-4 w-4" />
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}