import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Smartphone } from "lucide-react"
import SectionHeader from "@/components/SectionHeader"
import StoreButton from "@/components/apps/StoreButton"
import { apps, type PublishedApp } from "@/constants/apps"

export function AppCard({ app }: { app: PublishedApp }) {
  return (
    <article className="flex flex-col gap-5 border-2 border-[var(--line)] bg-white p-6 shadow-[5px_5px_0_0_var(--shadow-hard)]">
      <div className="flex items-start gap-4">
        <Image
          src={app.icon}
          alt={`${app.name} icon`}
          width={72}
          height={72}
          className="shrink-0 border-2 border-[var(--line)]"
        />
        <div className="flex min-w-0 flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-3xl uppercase leading-none text-black">{app.name}</h3>
            <span
              className={`border-2 border-[var(--line)] px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest ${
                app.status === "live" ? "bg-accent text-white" : "bg-white text-neutral-500"
              }`}
            >
              {app.status === "live" ? "Live" : "Coming soon"}
            </span>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
            {app.category} · {app.minAndroid}
          </p>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-neutral-600">{app.tagline}</p>

      <div className="mt-auto flex flex-wrap items-center gap-3">
        <StoreButton app={app} />
        <Link
          href={`/apps/${app.slug}`}
          className="inline-flex items-center gap-1.5 border-2 border-[var(--line)] bg-white px-4 py-3 font-mono text-xs font-bold uppercase tracking-widest text-black transition-transform hover:-translate-y-0.5"
        >
          Details <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1 border-t-2 border-[var(--line)] pt-4 font-mono text-[10px] font-semibold uppercase tracking-widest text-neutral-500">
        <Link href={`/apps/${app.slug}/privacy`} className="hover:text-accent">Privacy</Link>
        <Link href={`/apps/${app.slug}/terms`} className="hover:text-accent">Terms</Link>
        <Link href={`/apps/${app.slug}/delete-data`} className="hover:text-accent">Delete data</Link>
        <Link href={`/apps/${app.slug}#support`} className="hover:text-accent">Support</Link>
      </div>
    </article>
  )
}

export default function PublishedApps() {
  return (
    <section aria-label="Published apps" className="mx-auto w-full max-w-6xl px-6 py-20 md:px-12">
      <SectionHeader
        icon={Smartphone}
        eyebrow="On Google Play"
        title={
          <>
            Apps <span className="text-accent">I&apos;ve</span> Shipped
          </>
        }
        description="Mobile apps I publish, each with its own privacy policy, terms and support page."
        action={
          <Link
            href="/apps"
            className="inline-flex items-center gap-1.5 border-2 border-[var(--line)] bg-white px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-widest text-black shadow-[3px_3px_0_0_var(--shadow-hard)]"
          >
            All apps <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        }
      />

      <div className="grid gap-8 md:grid-cols-2">
        {apps.map((app) => (
          <AppCard key={app.slug} app={app} />
        ))}
      </div>
    </section>
  )
}
