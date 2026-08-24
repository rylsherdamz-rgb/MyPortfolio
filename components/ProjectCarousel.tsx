"use client"

import { useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { Github, ArrowUpRight, ArrowLeft, ArrowRight, FolderOpen } from "lucide-react"
import Image from "next/image"
import { projects } from "@/constants/projects"
import SectionHeader from "@/components/SectionHeader"

export default function ProjectCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  })
  const [carouselState, setCarouselState] = useState<{
    index: number
    snaps: number[]
  }>({ index: 0, snaps: [] })

  useEffect(() => {
    if (!emblaApi) return

    const sync = () =>
      setCarouselState({
        index: emblaApi.selectedScrollSnap(),
        snaps: emblaApi.scrollSnapList(),
      })

    emblaApi.on("select", sync).on("reInit", sync)
    const raf = requestAnimationFrame(sync)

    return () => {
      cancelAnimationFrame(raf)
      emblaApi.off("select", sync).off("reInit", sync)
    }
  }, [emblaApi])

  const selectedIndex = carouselState.index
  const scrollSnaps = carouselState.snaps

  const handleLink = (url: string) => {
    if (url.startsWith("http")) {
      window.open(url, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <section className="w-full px-6 py-16 md:px-20 md:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeader
          icon={FolderOpen}
          eyebrow="Selected work"
          title={
            <>
              Things I&apos;ve <span className="text-neutral-400">Built</span>
            </>
          }
          description="From on-chain messaging to AI-powered study apps — a snapshot of the projects I've shipped."
          action={
            <div className="flex items-center gap-2">
              <button
                onClick={() => emblaApi?.scrollPrev()}
                disabled={!emblaApi?.canScrollPrev()}
                aria-label="Previous projects"
                className="grid h-10 w-10 place-items-center rounded-full border border-neutral-200 text-neutral-700 transition hover:border-black hover:text-black disabled:opacity-40 disabled:hover:border-neutral-200 disabled:hover:text-neutral-700"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => emblaApi?.scrollNext()}
                disabled={!emblaApi?.canScrollNext()}
                aria-label="Next projects"
                className="grid h-10 w-10 place-items-center rounded-full border border-neutral-200 text-neutral-700 transition hover:border-black hover:text-black disabled:opacity-40 disabled:hover:border-neutral-200 disabled:hover:text-neutral-700"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          }
        />

        <div
          ref={emblaRef}
          className="cursor-grab overflow-hidden active:cursor-grabbing"
        >
          <div className="flex gap-6">
            {projects.map((project) => {
              const projectURL = project.projectURL

              return (
                <div
                  key={project.title}
                  className="w-[90%] flex-shrink-0 sm:w-[60%] md:w-[45%] lg:w-[30%] xl:w-[25%]"
                >
                  <article className="group flex h-[420px] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-neutral-300 hover:shadow-xl">
                    <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-neutral-50 to-white">
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
                            transition hover:bg-accent
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

        {scrollSnaps.length > 1 ? (
          <div className="mt-8 flex items-center justify-center gap-2">
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === selectedIndex
                    ? "w-6 bg-accent"
                    : "w-2 bg-neutral-300 hover:bg-neutral-400"
                }`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}