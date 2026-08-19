"use client"

import { Icon } from "@iconify/react"
import { techStack } from "@/constants/techstack"
import { Code2 } from "lucide-react"

export default function TechStack() {
  const categories = Object.entries(techStack)

  return (
    <section className="w-[90%] mx-[5%] p-6 rounded-2xl border border-neutral-200 bg-white text-black flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-neutral-100">
          <Code2 className="h-5 w-5 text-neutral-700" />
        </span>
        <h2 className="font-[var(--font-roboto-slab)] text-lg font-bold tracking-tight">
          Tech Stack
        </h2>
      </div>

      <div className="space-y-6">
        {categories.map(([category, items]) => (
          <div key={category}>
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-neutral-500">
              {category.replace(/([A-Z])/g, " $1")}
            </p>

            <div className="flex flex-wrap gap-3">
              {items.map(({ name, icon }) => (
                <div
                  key={name}
                  className="flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-700 transition hover:border-neutral-400 hover:-translate-y-0.5"
                >
                  <Icon icon={icon} className="h-4 w-4" />
                  {name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}