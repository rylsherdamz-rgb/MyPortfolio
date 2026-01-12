
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import Link from "next/link"
import { projects } from "@/constants/projects"

export default function ProjectCarousel() {
  const [emblaRef] = useEmblaCarousel({
    loop: false,
    align: "start",
  })

  return (
    <section className="w-[90%] mx-[5%] rounded-2xl border border-neutral-200 bg-white p-6 text-black">
      <h2 className="mb-6 text-lg font-semibold tracking-tight">
        Projects
      </h2>

      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-6">
          {projects.map((project) => (
            <Link
              key={project.title}
              href={project.link}
              className="min-w-[85%] sm:min-w-[60%] md:min-w-[45%] lg:min-w-[30%] flex-shrink-0 cursor-grab"
            >
              <article className="h-full rounded-xl border border-neutral-200 overflow-hidden hover:border-neutral-400 transition">
                <div className="relative h-48 w-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-medium">{project.title}</h3>
                  <p className="text-sm text-neutral-600 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-neutral-100 px-2 py-1 text-xs text-neutral-600"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

