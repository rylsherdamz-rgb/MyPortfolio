import type { Metadata } from "next"
import AppShell from "@/components/apps/AppShell"
import { AppCard } from "@/components/PublishedApps"
import { apps, pageMetadata } from "@/constants/apps"

export const metadata: Metadata = pageMetadata(
  "Apps",
  "Mobile apps by Richie Christian De Guzman on Google Play, with their privacy policies, terms and support.",
  "/apps"
)

export default function AppsPage() {
  return (
    <AppShell>
      <section className="mx-auto w-full max-w-6xl px-6 py-16 md:px-12 md:py-20">
        <p className="w-fit border-2 border-[var(--line)] bg-white px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-black">
          Google Play
        </p>
        <h1 className="mt-4 font-display text-5xl uppercase leading-none text-black sm:text-6xl">
          Published <span className="text-accent">apps</span>
        </h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-neutral-600">
          Everything for the apps I ship lives here: store links, privacy policies, terms, data
          deletion and support.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {apps.map((app) => (
            <AppCard key={app.slug} app={app} />
          ))}
        </div>
      </section>
    </AppShell>
  )
}
