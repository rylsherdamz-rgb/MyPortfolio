import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Github, Mail, ShieldCheck, FileText, Trash2 } from "lucide-react"
import AppShell from "@/components/apps/AppShell"
import StoreButton from "@/components/apps/StoreButton"
import { apps, developer, getApp, pageMetadata } from "@/constants/apps"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return apps.map((a) => ({ slug: a.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const app = getApp((await params).slug)
  if (!app) return {}
  return pageMetadata(`${app.name} for Android`, app.tagline, `/apps/${app.slug}`)
}

const legalLinks = [
  { label: "Privacy policy", path: "privacy", icon: ShieldCheck },
  { label: "Terms of use", path: "terms", icon: FileText },
  { label: "Delete your data", path: "delete-data", icon: Trash2 },
]

export default async function AppPage({ params }: Props) {
  const app = getApp((await params).slug)
  if (!app) notFound()

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-12 md:py-20">
        <Link
          href="/apps"
          className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-neutral-500 hover:text-accent"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All apps
        </Link>

        {/* Hero */}
        <section className="mt-8 max-w-3xl">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <Image
                src={app.icon}
                alt={`${app.name} icon`}
                width={88}
                height={88}
                priority
                className="border-2 border-[var(--line)] shadow-[4px_4px_0_0_var(--shadow-hard)]"
              />
              <div className="min-w-0">
                <h1 className="font-display text-5xl uppercase leading-none text-black sm:text-6xl">
                  {app.name}
                </h1>
                <p className="mt-2 break-all font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                  {app.category} · {app.minAndroid} · {app.packageName}
                </p>
              </div>
            </div>
            <p className="text-lg font-semibold leading-snug text-black">{app.tagline}</p>
            <p className="leading-relaxed text-neutral-600">{app.description}</p>
            <div className="flex flex-wrap items-center gap-3">
              <StoreButton app={app} />
              {app.sourceUrl ? (
                <a
                  href={app.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-2 border-[var(--line)] bg-white px-4 py-3 font-mono text-xs font-bold uppercase tracking-widest text-black transition-transform hover:-translate-y-0.5"
                >
                  <Github className="h-4 w-4" /> Source
                </a>
              ) : null}
            </div>
          </div>
        </section>

        {/* Screenshots: scrolls sideways inside its own strip, never the page */}
        {app.screenshots.length > 0 ? (
          <section aria-label={`${app.name} screenshots`} className="mt-14">
            <ul className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 md:-mx-12 md:px-12">
              {app.screenshots.map((shot, i) => (
                <li key={shot.src} className="shrink-0 snap-start">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={1116}
                    height={2232}
                    priority={i < 2}
                    sizes="(min-width: 768px) 220px, 46vw"
                    className="h-auto w-[46vw] max-w-[220px] border-2 border-[var(--line)] bg-white shadow-[4px_4px_0_0_var(--shadow-hard)]"
                  />
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* Features */}
        <section className="mt-14">
          <h2 className="font-display text-3xl uppercase text-black">
            What it <span className="text-accent">does</span>
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {app.features.map((f) => (
              <div
                key={f.title}
                className="border-2 border-[var(--line)] bg-white p-5 shadow-[3px_3px_0_0_var(--shadow-hard)]"
              >
                <h3 className="font-semibold text-black">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Privacy at a glance + permissions */}
        <section className="mt-20 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl uppercase text-black">
              Privacy at a <span className="text-accent">glance</span>
            </h2>
            <dl className="mt-6 border-2 border-[var(--line)] bg-white">
              {app.dataSafety.map((d, i) => (
                <div
                  key={d.label}
                  className={`flex justify-between gap-4 px-5 py-3 text-sm ${
                    i > 0 ? "border-t-2 border-[var(--line)]" : ""
                  }`}
                >
                  <dt className="text-neutral-600">{d.label}</dt>
                  <dd className="text-right font-semibold text-black">{d.value}</dd>
                </div>
              ))}
            </dl>
            <Link
              href={`/apps/${app.slug}/privacy`}
              className="mt-4 inline-block font-mono text-xs font-bold uppercase tracking-widest text-accent underline underline-offset-4"
            >
              Read the full privacy policy
            </Link>
          </div>

          <div>
            <h2 className="font-display text-3xl uppercase text-black">
              Why each <span className="text-accent">permission</span>
            </h2>
            <ul className="mt-6 flex flex-col gap-3">
              {app.permissions.map((p) => (
                <li key={p.name} className="border-l-4 border-accent pl-4">
                  <p className="font-semibold text-black">{p.name}</p>
                  <p className="text-sm leading-relaxed text-neutral-600">{p.why}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Legal + support */}
        <section id="support" className="mt-20 grid scroll-mt-24 gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="flex flex-col gap-3">
            <h2 className="font-display text-3xl uppercase text-black">
              Legal &amp; <span className="text-accent">data</span>
            </h2>
            {legalLinks.map(({ label, path, icon: Icon }) => (
              <Link
                key={path}
                href={`/apps/${app.slug}/${path}`}
                className="flex items-center gap-3 border-2 border-[var(--line)] bg-white px-5 py-4 font-semibold text-black shadow-[3px_3px_0_0_var(--shadow-hard)] transition-transform hover:-translate-y-0.5"
              >
                <Icon className="h-5 w-5 text-accent" /> {label}
              </Link>
            ))}
          </div>

          <div className="border-2 border-[var(--line)] bg-white p-6 shadow-[5px_5px_0_0_var(--shadow-hard)]">
            <h2 className="font-display text-3xl uppercase text-black">
              Need <span className="text-accent">help?</span>
            </h2>
            <p className="mt-3 leading-relaxed text-neutral-600">
              Found a bug, have a feature idea or a question about your data? Email me and include
              your phone model, Android version and the app version from Settings. I usually reply
              within a few days.
            </p>
            <a
              href={`mailto:${developer.email}?subject=${encodeURIComponent(`${app.name} support`)}`}
              className="btn-accent-hover mt-5 inline-flex max-w-full items-center gap-2 break-all border-2 border-[var(--line)] bg-accent px-5 py-3 font-mono text-xs font-bold uppercase tracking-widest text-white shadow-[3px_3px_0_0_var(--shadow-hard)]"
            >
              <Mail className="h-4 w-4 shrink-0" /> Email support
            </a>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
              {developer.email}
              <br />
              Developer: {developer.name} · {developer.location}
            </p>
          </div>
        </section>
      </div>
    </AppShell>
  )
}
