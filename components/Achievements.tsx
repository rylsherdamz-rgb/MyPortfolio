"use client"

import { Icon } from "@iconify/react"
import { Award, Sparkles } from "lucide-react"
import { certifications, honors } from "@/constants/achievements"
import SectionHeader from "@/components/SectionHeader"

function Section({
  title,
  items,
  icon,
  showSubtitle = true,
  stagger = false,
}: {
  title: string
  items: typeof honors
  icon: string
  showSubtitle?: boolean
  stagger?: boolean
}) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center border-2 border-[var(--line)] bg-white shadow-[3px_3px_0_0_var(--shadow-hard)]">
          <Icon icon={icon} className="h-5 w-5 text-black" />
        </span>
        <h3 className="font-display text-2xl uppercase tracking-tight">
          {title}
        </h3>
      </div>

      <div
        {...(stagger ? { "data-sc-in": "", "data-sc-stagger": "70" } : {})}
        className="grid gap-5 sm:grid-cols-2"
      >
        {items.map((item) => (
          <div
            key={item.title}
            className={[
              "card-hard relative flex flex-col justify-between overflow-hidden rounded-none p-5",
              item.highlight
                ? "bg-accent text-white"
                : "bg-white text-black",
            ].join(" ")}
          >
            <div className="flex items-start justify-between gap-3">
              <Icon
                icon={item.icon}
                className={[
                  "h-7 w-7 shrink-0",
                  item.highlight ? "text-white" : "text-neutral-400",
                ].join(" ")}
              />
              <span
                className={[
                  "border px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest",
                  item.highlight
                    ? "border-white/60 bg-white/15 text-white"
                    : "border-[var(--line)] bg-neutral-100 text-neutral-600",
                ].join(" ")}
              >
                {item.year}
              </span>
            </div>

            <div className="mt-5">
              <h4
                className={`font-display text-lg uppercase leading-snug ${
                  item.highlight ? "" : ""
                }`}
              >
                {item.title}
              </h4>
              {showSubtitle ? (
                <p
                  className={[
                    "mt-1.5 text-sm leading-relaxed",
                    item.highlight ? "text-white/85" : "text-neutral-500",
                  ].join(" ")}
                >
                  {item.subtitle}
                </p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Achievements() {
  return (
    <section className="w-full px-6 py-16 md:px-20 md:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeader
          icon={Award}
          title={
            <>
              Honors, Hackathons &{" "}
              <span className="text-neutral-400">Certifications</span>
            </>
          }
          description="From winning my first hackathon to being selected as a Google Cloud Arcade Facilitator, here's the journey that's shaped me as a builder and learner."
        />

        <div className="space-y-12">
          <Section
            title="Hackathons & Honors"
            items={honors}
            icon="mdi:trophy"
            showSubtitle={false}
            stagger
          />
          <Section
            title="Professional Certifications"
            items={certifications}
            icon="mdi:certificate"
            stagger
          />
        </div>

        <div className="mt-14 flex items-center justify-center gap-2 border-t-2 border-[var(--line)] pt-8 font-mono text-xs uppercase tracking-[0.25em] text-neutral-500">
          <Sparkles className="h-4 w-4" />
          <span>Always learning, always shipping</span>
        </div>
      </div>
    </section>
  )
}