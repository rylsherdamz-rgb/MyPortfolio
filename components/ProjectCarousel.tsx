"use client"

import useEmblaCarousel from "embla-carousel-react"
import { Github, ArrowUpRight, FolderOpen } from "lucide-react"
import Image from "next/image"
import { projects } from "@/constants/projects"
import { useRouter, usePathname } from "next/navigation"

export default function ProjectCarousel() {
  const router = useRouter()
  const pathname = usePathname()
  const isFullPage = pathname === "/projects"

  const [emblaRef] = useEmblaCarousel({
    loop: false,
    align: "start",
  })

  const handleLink = (url: string) => {
    if (url.startsWith("http")) {
      window.open(url, "_blank", "noopener,noreferrer")
    } else {
      router.push(url)
    }
  }

  return (
    <section
      className={`${
        isFullPage
          ? "w-full h-full p-8"
          : "w-[90%] mx-[5%] p-6 rounded-2xl border border-neutral-200"
      } bg-white text-black relative`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-neutral-100">
            <FolderOpen className="h-5 w-5 text-neutral-700" />
          </span>
          <h2 className="font-[var(--font-roboto-slab)] text-lg font-bold tracking-tight">
            Projects
          </h2>
        </div>

        {!isFullPage && (
          <button
            onClick={() => router.push("/projects")}
            className="
              group flex items-center gap-2
              rounded-md
              px-4 py-2 text-sm font-medium text-neutral-800
              transition hover:text-black
              active:scale-[0.98]
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black
            "
          >
            <span>See more projects</span>
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </button>
        )}
      </div>

      <div
        ref={emblaRef}
        className="overflow-hidden cursor-grab active:cursor-grabbing"
      >
        <div className="flex gap-6">
          {projects.map((project) => {
            const projectURL = project.projectURL

            return (
              <div
                key={project.title}
                className="flex-shrink-0 w-[90%] sm:w-[60%] md:w-[45%] lg:w-[30%] xl:w-[25%]"
              >
                <article className="group flex h-[420px] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-neutral-300 hover:shadow-xl">
                  <div className="relative h-64 w-full overflow-hidden bg-neutral-50">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 90vw, 25vw"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight">
                        {project.title}
                      </h3>
                      <p className="mt-1.5 line-clamp-3 text-sm text-neutral-600">
                        {project.description}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-neutral-100 px-2 py-1 text-xs text-neutral-600 transition-colors group-hover:bg-neutral-900 group-hover:text-white"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:gap-3">
                      {projectURL ? (
                        <button
                          onClick={() => handleLink(projectURL)}
                          className="
                            group flex w-full items-center justify-center gap-2
                            rounded-lg border border-neutral-300
                            px-4 py-2.5 text-xs font-medium text-neutral-800
                            transition hover:border-black hover:bg-neutral-100
                            active:scale-[0.98]
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black
                            sm:w-auto
                          "
                        >
                          <Github size={14} className="transition group-hover:scale-110" />
                          <span>Repository</span>
                        </button>
                      ) : null}
                      <button
                        onClick={() => handleLink(project.link)}
                        className="
                          group flex w-full items-center justify-center gap-2
                          rounded-lg bg-black px-4 py-2.5
                          text-xs font-medium text-white
                          transition hover:bg-neutral-800
                          active:scale-[0.98]
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black
                          sm:w-auto
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
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}