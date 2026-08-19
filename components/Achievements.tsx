"use client"

import { Icon } from "@iconify/react"
import { Award, Sparkles } from "lucide-react"
import { certifications, honors } from "@/constants/achievements"

function Section({
  title,
  items,
  icon,
  showSubtitle = true,
}: {
  title: string
  items: typeof honors
  icon: string
  showSubtitle?: boolean
}) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-neutral-900 text-white">
          <Icon icon={icon} className="h-5 w-5" />
        </span>
        <h3 className="font-[var(--font-roboto-slab)] text-xl font-bold tracking-tight">
          {title}
        </h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.title}
            className={[
              "group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1",
              item.highlight
                ? "border-neutral-900 bg-neutral-900 text-white shadow-lg hover:shadow-xl"
                : "border-neutral-200 bg-white text-black hover:border-neutral-400 hover:shadow-md",
            ].join(" ")}
          >
            {item.highlight && (
              <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-xl" />
            )}

            <div className="flex items-start justify-between gap-3">
              <Icon
                icon={item.icon}
                className={[
                  "h-7 w-7 shrink-0",
                  item.highlight ? "text-white/80" : "text-neutral-400",
                ].join(" ")}
              />
              <span
                className={[
                  "rounded-full px-2.5 py-1 text-xs font-medium tracking-wide",
                  item.highlight
                    ? "bg-white/15 text-white"
                    : "bg-neutral-100 text-neutral-500",
                ].join(" ")}
              >
                {item.year}
              </span>
            </div>

            <div className="mt-5">
              <h4 className="font-medium leading-snug">{item.title}</h4>
              {showSubtitle ? (
                <p
                  className={[
                    "mt-1.5 text-sm leading-relaxed",
                    item.highlight ? "text-white/60" : "text-neutral-500",
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
    <section className="w-full px-6 md:px-20 py-16 md:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-12 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-neutral-100">
              <Award className="h-5 w-5 text-neutral-700" />
            </span>
            <p className="text-sm font-medium uppercase tracking-widest text-neutral-400">
              Recognition & Growth
            </p>
          </div>

          <h2 className="font-[var(--font-roboto-slab)] text-3xl font-bold tracking-tight text-black sm:text-4xl">
            Honors, Hackathons &{" "}
            <span className="text-neutral-400">Certifications</span>
          </h2>
          <p className="max-w-2xl text-neutral-600 leading-relaxed">
            From winning my first hackathon to being selected as a Google Cloud
            Arcade Facilitator — here&apos;s the journey that&apos;s shaped me as
            a builder and learner.
          </p>
        </div>

        <div className="space-y-12">
          <Section title="Hackathons & Honors" items={honors} icon="mdi:trophy" showSubtitle={false} />
          <Section title="Professional Certifications" items={certifications} icon="mdi:certificate" />
        </div>

        <div className="mt-14 flex items-center justify-center gap-2 text-sm text-neutral-500">
          <Sparkles className="h-4 w-4" />
          <span>Always learning, always shipping.</span>
        </div>
      </div>
    </section>
  )
}