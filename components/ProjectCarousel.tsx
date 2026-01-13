"use client"

import useEmblaCarousel from "embla-carousel-react"
import { Github, ArrowUpRight } from "lucide-react"
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

  return (
    <section
      className={`${
        isFullPage
          ? "w-full h-full p-8"
          : "w-[90%] mx-[5%] p-6 rounded-2xl border border-neutral-200"
      } bg-white text-black relative`}
    >
      <h2 className="mb-6 text-lg font-semibold tracking-tight">
        Projects
      </h2>

      <div
        ref={emblaRef}
        className="overflow-hidden cursor-grab active:cursor-grabbing"
      >
        <div className="flex gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="flex-shrink-0 w-[90%] sm:w-[60%] md:w-[45%] lg:w-[30%] xl:w-[25%]"
            >
              <article
                className="
                  flex h-[420px] flex-col overflow-hidden
                  rounded-xl border border-neutral-200
                  shadow-sm transition-transform
                "
              >
                <div className="relative h-64 w-full bg-neutral-50">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 90vw, 25vw"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <h3 className="text-lg font-medium">
                      {project.title}
                    </h3>
                    <p className="mt-1 line-clamp-3 text-sm text-neutral-600">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-neutral-100 px-2 py-1 text-xs text-neutral-600"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-3">
                    <button
                      className="
                        group flex w-full items-center justify-center gap-2
                        rounded-md border border-neutral-300
                        px-4 py-2 text-xs font-medium text-neutral-800
                        transition hover:border-black hover:bg-neutral-100
                        active:scale-[0.98]
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black
                        sm:w-auto
                      "
                    >
                      <Github size={14} className="transition group-hover:scale-110" />
                      <span>Repository</span>
                    </button>

                    <button
                      onClick={() => router.push(project.link)}
                      className="
                        group flex w-full items-center justify-center gap-2
                        rounded-md bg-black px-4 py-2
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
          ))}
        </div>
      </div>

      {!isFullPage && (
        <div className="absolute top-5 right-0">
          <button
            onClick={() => router.push("/projects")}
            className="
              group flex items-center gap-2
              rounded-md  
              px-5 py-2 text-sm font-medium text-neutral-800
              transition 
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
        </div>
      )}
    </section>
  )
}

