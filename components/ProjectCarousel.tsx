"use client"

import { Github, ArrowUpRight, FolderOpen } from "lucide-react"
import Image from "next/image"
import { projects } from "@/constants/projects"
import SectionHeader from "@/components/SectionHeader"

export default function ProjectCarousel() {
  const handleLink = (url: string) => {
    if (url.startsWith("http")) {
      window.open(url, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <section
      id="projects"
      data-sc-act="pan"
      data-sc-span="2.8"
      aria-label="Projects"
    >
      <div data-sc-stage className="relative flex h-full flex-col">
        <header className="shrink-0 px-6 pt-20 md:px-20 md:pt-24">
          <SectionHeader
            icon={FolderOpen}
            eyebrow="Selected work"
            title={
              <>
                Things <span className="text-accent">I&apos;ve</span> Built
              </>
            }
            description="From on-chain messaging to AI-powered study apps: keep scrolling to travel the rail."
            action={
              <span className="border-2 border-[var(--line)] bg-white px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-widest text-black shadow-[3px_3px_0_0_var(--shadow-hard)]">
                {String(projects.length).padStart(2, "0")} builds
              </span>
            }
          />
        </header>

        {/* The rail. Vertical scroll becomes horizontal travel here.
            Extra bottom padding separates the cards from the progress bar. */}
        <div className="relative flex min-h-0 flex-1 items-center pb-28 md:pb-32">
          <div
            data-sc-pan="0.06"
            className="flex w-max items-stretch gap-8 pl-6 pr-[12vw] will-change-transform md:pl-[max(1.5rem,calc((100vw-72rem)/2))]"
          >
            {projects.map((project) => {
              const projectURL = project.projectURL

              return (
                <article
                  key={project.title}
                  className="group flex h-[420px] w-[85vw] flex-col rounded-none border-2 border-[var(--line)] bg-white shadow-[5px_5px_0_0_var(--shadow-hard)] transition-transform duration-200 hover:-translate-y-1 sm:w-[450px]"
                >
                  <div className="relative h-56 w-full overflow-hidden border-b-2 border-[var(--line)] bg-white">
                    <div className="dots-bg absolute inset-0 opacity-40" />
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                      sizes="450px"
                    />
                    <span className="absolute left-3 top-3 rotate-[-3deg] border-2 border-[var(--line)] bg-accent px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-white">
                      {project.tech[0]}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <h3 className="font-display text-2xl uppercase leading-tight text-black">
                        {project.title}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 text-sm text-neutral-600">
                        {project.description}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 5).map((t) => (
                        <span
                          key={t}
                          className="border border-[var(--line)] bg-neutral-100 px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase text-neutral-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex gap-3">
                      {projectURL ? (
                        <button
                          onClick={() => handleLink(projectURL)}
                          className="
                          flex items-center justify-center gap-2
                          border-2 border-[var(--line)] bg-white
                          px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-black
                          shadow-[3px_3px_0_0_var(--shadow-hard)]
                          transition-transform hover:-translate-y-0.5 hover:bg-neutral-100
                          active:translate-y-0
                        "
                        >
                          <Github size={14} />
                          <span>Code</span>
                        </button>
                      ) : null}
                      <button
                        onClick={() => handleLink(project.link)}
                        className="
                        btn-accent-hover flex items-center justify-center gap-2
                        border-2 border-[var(--line)] bg-accent
                        px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white
                        shadow-[3px_3px_0_0_var(--shadow-hard)]
                        transition-transform hover:-translate-y-0.5 active:translate-y-0
                      "
                      >
                        <span>Live</span>
                        <ArrowUpRight size={14} />
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          {/* Rail progress, driven by the act's published --sc-p */}
          <div
            aria-hidden
            data-sc-pan-progress
            className="absolute bottom-6 left-1/2 h-3 w-[min(60vw,28rem)] -translate-x-1/2 border-2 border-[var(--line)] bg-white shadow-[3px_3px_0_0_var(--shadow-hard)]"
          >
            <div
              className="h-full w-full origin-left bg-accent"
              style={{ transform: "scaleX(calc(var(--sc-p, 0) * 1))" }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
