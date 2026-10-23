import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import AppShell from "@/components/apps/AppShell"
import { developer, type PolicySection, type PublishedApp } from "@/constants/apps"

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function LegalPage({
  app,
  eyebrow,
  title,
  intro,
  sections,
}: {
  app: PublishedApp
  eyebrow: string
  title: string
  intro?: string
  sections: PolicySection[]
}) {
  return (
    <AppShell>
      <article className="mx-auto w-full max-w-3xl px-6 py-16 md:py-20">
        <Link
          href={`/apps/${app.slug}`}
          className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-neutral-500 hover:text-accent"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> {app.name}
        </Link>

        <header className="mt-8 flex flex-col gap-4 border-b-2 border-[var(--line)] pb-8">
          <div className="flex items-center gap-3">
            <Image
              src={app.icon}
              alt=""
              width={40}
              height={40}
              className="border-2 border-[var(--line)]"
            />
            <p className="border-2 border-[var(--line)] bg-white px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-black">
              {eyebrow}
            </p>
          </div>
          <h1 className="font-display text-4xl uppercase leading-none text-black sm:text-5xl">
            {title}
          </h1>
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
            Last updated {formatDate(app.policyUpdated)}
          </p>
          {intro ? <p className="leading-relaxed text-neutral-600">{intro}</p> : null}
        </header>

        <nav aria-label="Contents" className="mt-8 border-2 border-[var(--line)] bg-white p-5 shadow-[3px_3px_0_0_var(--shadow-hard)]">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-500">
            Contents
          </p>
          <ol className="mt-3 grid gap-1.5 text-sm sm:grid-cols-2">
            {sections.map((s, i) => (
              <li key={s.heading}>
                <a href={`#${slugify(s.heading)}`} className="text-neutral-700 hover:text-accent">
                  {String(i + 1).padStart(2, "0")}. {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-10 flex flex-col gap-10">
          {sections.map((s, i) => (
            <section key={s.heading} id={slugify(s.heading)} className="scroll-mt-24">
              <h2 className="font-display text-2xl uppercase text-black">
                <span className="text-accent">{String(i + 1).padStart(2, "0")}</span> {s.heading}
              </h2>
              {s.paragraphs?.map((p) => (
                <p key={p} className="mt-3 leading-relaxed text-neutral-700">
                  {p}
                </p>
              ))}
              {s.bullets ? (
                <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 leading-relaxed text-neutral-700 marker:text-accent">
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <section id="contact" className="scroll-mt-24 border-2 border-[var(--line)] bg-white p-6 shadow-[3px_3px_0_0_var(--shadow-hard)]">
            <h2 className="font-display text-2xl uppercase text-black">Contact</h2>
            <p className="mt-3 leading-relaxed text-neutral-700">
              {developer.name} · {developer.location}
              <br />
              <a
                href={`mailto:${developer.email}?subject=${encodeURIComponent(`${app.name}: ${title}`)}`}
                className="font-semibold text-accent underline underline-offset-4"
              >
                {developer.email}
              </a>
            </p>
          </section>
        </div>
      </article>
    </AppShell>
  )
}
