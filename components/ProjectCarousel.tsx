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
      <div data-sc-stage className="relative flex items-center">
        <header className="absolute inset-x-0 top-0 px-6 pt-24 md:px-20 md:pt-28">
          <SectionHeader
            icon={FolderOpen}
            title={
              <>
                Things I&apos;ve <span className="text-neutral-400">Built</span>
              </>
            }
            description="From on-chain messaging to AI-powered study apps: keep scrolling to travel the rail."
            action={
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400">
                {String(projects.length).padStart(2, "0")} builds
              </span>
            }
          />
        </header>

        {/* The rail. Vertical scroll becomes horizontal travel here. */}
        <div
          data-sc-pan="0.06"
          className="flex w-max items-stretch gap-6 pl-6 pr-[12vw] will-change-transform md:pl-[max(1.5rem,calc((100vw-72rem)/2))]"
        >
          {projects.map((project) => {
            const projectURL = project.projectURL

            return (
              <article
                key={project.title}
                className="group flex h-[430px] w-[85vw] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-neutral-300 hover:shadow-xl sm:w-[440px]"
              >
                <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-neutral-50 to-white">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                    sizes="440px"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {project.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-sm text-neutral-600">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.slice(0, 5).map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-neutral-100 px-2 py-1 text-xs text-neutral-600 transition-colors group-hover:bg-neutral-900 group-hover:text-white"
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
                          group/btn flex items-center justify-center gap-2
                          rounded-lg border border-neutral-300
                          px-4 py-2.5 text-xs font-medium text-neutral-800
                          transition hover:border-black hover:bg-neutral-100
                          active:scale-[0.98]
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black
                        "
                      >
                        <Github size={14} className="transition group-hover/btn:scale-110" />
                        <span>Repository</span>
                      </button>
                    ) : null}
                    <button
                      onClick={() => handleLink(project.link)}
                      className="
                        flex items-center justify-center gap-2
                        rounded-lg bg-black px-4 py-2.5
                        text-xs font-medium text-white
                        transition btn-accent-hover
                        active:scale-[0.98]
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black
                      "
                    >
                      <span>Live Site</span>
                      <ArrowUpRight
                        size={14}
                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
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
          className="absolute bottom-10 left-1/2 h-[3px] w-[min(60vw,28rem)] -translate-x-1/2 overflow-hidden rounded-full bg-neutral-100"
        >
          <div
            className="h-full w-full origin-left rounded-full bg-accent"
            style={{ transform: "scaleX(calc(var(--sc-p, 0) * 1))" }}
          />
        </div>
      </div>
    </section>
  )
}