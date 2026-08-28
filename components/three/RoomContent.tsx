"use client"

import { Html } from "@react-three/drei"
import { projects } from "@/constants/projects"
import { techStack } from "@/constants/techstack"
import { socials } from "@/constants/socials"
import { stats } from "@/constants/achievements"

/** Which room object is currently the focus, driven by scroll section. */
export type RoomSection =
  | "home"
  | "tech-stack"
  | "projects"
  | "achievements"
  | "posts"
  | "connect"

/**
 * Shared wrapper for a DOM panel that is printed ONTO a 3D object. drei's
 * `Html transform` renders the DOM in 3D space (so it scales/rotates with the
 * object) and `occlude` hides it behind room geometry. `distanceFactor`
 * controls apparent size.
 */
function OnObject({
  children,
  distanceFactor = 1.4,
  className = "",
  center = true,
}: {
  children: React.ReactNode
  distanceFactor?: number
  className?: string
  center?: boolean
}) {
  return (
    <Html
      transform
      occlude
      center={center}
      distanceFactor={distanceFactor}
      className={className}
      // Keep the projected DOM crisp and non-interactive by default so it
      // never steals scroll; individual links opt back in.
      style={{ pointerEvents: "none", userSelect: "none" }}
    >
      {children}
    </Html>
  )
}

/* ------------------------------------------------------------- SCREEN ---- */

/**
 * The monitor screen. Shows a live "desktop" whose content reflects the active
 * section — this is the primary content-on-object surface. Styled to read as a
 * small terminal/IDE window sitting on the display.
 */
export function ScreenContent({ section }: { section: RoomSection }) {
  const featured = projects[0]
  return (
    <OnObject distanceFactor={1.15}>
      <div className="w-[520px] select-none rounded-md border border-white/10 bg-[#0b0e14] p-4 font-mono text-[12px] leading-relaxed text-neutral-200 shadow-2xl">
        {/* window chrome */}
        <div className="mb-3 flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          <span className="ml-3 text-[10px] uppercase tracking-widest text-neutral-500">
            richie@portfolio ~ {section}
          </span>
        </div>

        {section === "home" && (
          <div>
            <p className="text-[#27c93f]">$ whoami</p>
            <p className="mt-1 text-neutral-100">
              Richie Christian De Guzman
            </p>
            <p className="text-neutral-400">
              Full-Stack · Data · Blockchain Developer
            </p>
            <p className="mt-3 text-[#27c93f]">$ cat stats.txt</p>
            <div className="mt-1 grid grid-cols-2 gap-x-6 gap-y-1">
              {stats.map((s) => (
                <p key={s.label} className="text-neutral-300">
                  <span className="text-[#eb4b27]">{s.value}</span> {s.label}
                </p>
              ))}
            </div>
            <p className="mt-3 animate-pulse text-neutral-500">▌</p>
          </div>
        )}

        {section === "tech-stack" && (
          <div>
            <p className="text-[#27c93f]">$ ls ~/stack</p>
            <div className="mt-2 space-y-2">
              {Object.entries(techStack)
                .slice(0, 5)
                .map(([cat, items]) => (
                  <div key={cat}>
                    <span className="text-[#ffbd2e]">{cat}/</span>{" "}
                    <span className="text-neutral-300">
                      {(items as { name: string }[])
                        .map((i) => i.name)
                        .join(", ")}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {section === "projects" && (
          <div>
            <p className="text-[#27c93f]">$ git log --oneline ~/projects</p>
            <div className="mt-2 space-y-1.5">
              {projects.slice(0, 6).map((p) => (
                <p key={p.title} className="text-neutral-300">
                  <span className="text-[#eb4b27]">
                    {p.title.toLowerCase().replace(/\s+/g, "-")}
                  </span>{" "}
                  <span className="text-neutral-500">
                    {p.tech.slice(0, 3).join(" · ")}
                  </span>
                </p>
              ))}
            </div>
          </div>
        )}

        {section === "achievements" && (
          <div>
            <p className="text-[#27c93f]">$ cat achievements.log</p>
            <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1.5">
              {stats.map((s) => (
                <p key={s.label} className="text-neutral-300">
                  <span className="text-[#eb4b27]">{s.value}</span> {s.label}
                </p>
              ))}
            </div>
            <p className="mt-2 text-neutral-400">
              Hackathon champion · Google Cloud Arcade Facilitator
            </p>
          </div>
        )}

        {section === "posts" && (
          <div>
            <p className="text-[#27c93f]">$ curl linkedin/feed --latest</p>
            <p className="mt-2 text-neutral-300">
              Building in public. Latest posts stream to the window →
            </p>
          </div>
        )}

        {section === "connect" && (
          <div>
            <p className="text-[#27c93f]">$ ./connect.sh</p>
            <p className="mt-1 text-neutral-300">
              Opening channels… see the lamp glow →
            </p>
          </div>
        )}

        {/* subtle footer showing this is a live surface */}
        <div className="mt-3 border-t border-white/10 pt-2 text-[10px] text-neutral-600">
          featured: {featured.title}
        </div>
      </div>
    </OnObject>
  )
}

/* ------------------------------------------------------------- POSTER ---- */

/** The wall poster prints the featured project as a real poster. */
export function PosterContent({ index = 0 }: { index?: number }) {
  const p = projects[index] ?? projects[0]
  return (
    <OnObject distanceFactor={1.1}>
      <div className="w-[300px] select-none border-2 border-[var(--line)] bg-white p-2 shadow-[6px_6px_0_0_rgba(0,0,0,0.6)]">
        <div
          className="h-[300px] w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${p.image})` }}
        />
        <div className="mt-2 flex items-center justify-between">
          <p className="font-display text-lg uppercase leading-none text-black">
            {p.title}
          </p>
          <span className="bg-[#eb4b27] px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-white">
            featured
          </span>
        </div>
        <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-neutral-500">
          {p.tech.slice(0, 4).join(" · ")}
        </p>
      </div>
    </OnObject>
  )
}

/* ------------------------------------------------------------- WINDOW ---- */

/** The window shows the live "feed" — posts scrolling like a view outside. */
export function WindowContent() {
  const items = projects.slice(0, 3)
  return (
    <OnObject distanceFactor={1.2}>
      <div className="w-[280px] select-none space-y-2">
        <p className="mb-1 inline-block bg-[#eb4b27] px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-white">
          Feed
        </p>
        {items.map((p) => (
          <div
            key={p.title}
            className="border-2 border-[var(--line)] bg-white/90 p-2 backdrop-blur"
          >
            <p className="font-mono text-[11px] font-bold text-black">
              {p.title}
            </p>
            <p className="line-clamp-2 text-[10px] leading-snug text-neutral-600">
              {p.description}
            </p>
          </div>
        ))}
      </div>
    </OnObject>
  )
}

/* --------------------------------------------------------------- DESK ---- */

/** Tech chips scattered on the desk surface. */
export function DeskContent() {
  const chips = Object.values(techStack)
    .flat()
    .slice(0, 10) as { name: string }[]
  return (
    <OnObject distanceFactor={1.0}>
      <div className="flex w-[260px] flex-wrap gap-1.5 select-none">
        {chips.map((c) => (
          <span
            key={c.name}
            className="border-2 border-[var(--line)] bg-white px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wide text-black"
          >
            {c.name}
          </span>
        ))}
      </div>
    </OnObject>
  )
}

/* --------------------------------------------------------------- LAMP ---- */

/** Connect CTA glowing by the lamp; links are clickable. */
export function LampContent() {
  return (
    <OnObject distanceFactor={1.0}>
      <div className="w-[210px] select-none border-2 border-[var(--line)] bg-white p-3 text-center shadow-[5px_5px_0_0_rgba(0,0,0,0.5)]">
        <p className="font-display text-base uppercase leading-none text-black">
          Let&apos;s connect
        </p>
        <div
          className="mt-2 flex flex-wrap justify-center gap-1.5"
          style={{ pointerEvents: "auto" }}
        >
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-[var(--line)] bg-white px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wide text-black transition-colors hover:bg-[#eb4b27] hover:text-white"
            >
              {s.name}
            </a>
          ))}
        </div>
      </div>
    </OnObject>
  )
}
