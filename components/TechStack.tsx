"use client"

import { Icon } from "@iconify/react"
import { techStack } from "@/constants/techstack"
import SectionHeader from "@/components/SectionHeader"
import { Code2 } from "lucide-react"

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
          eyebrow="Toolbox"
          title={
            <>
              Tech <span className="text-neutral-400">Stack</span>
            </>
          }
          description="The languages, frameworks, and platforms I reach for when building products end to end."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(([category, items]) => (
            <div
              key={category}
              className="rounded-2xl border border-neutral-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-lg"
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500">
                {labelFor(category)}
              </p>

              <div className="flex flex-wrap gap-2">
                {items.map(({ name, icon }) => (
                  <span
                    key={name}
                    className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 py-1.5 text-sm text-neutral-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent-soft"
                  >
                    <Icon icon={icon} className="h-4 w-4" />
                    {name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}