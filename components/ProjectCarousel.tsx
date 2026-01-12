"use client";

import { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { projects } from "@/constants/projects";
import {useRouter} from "next/navigation"

export default function ProjectCarousel() {
  const router = useRouter()
  const [emblaRef] = useEmblaCarousel({ loop: false, align: "start" });

  return (
    <section className="w-[90%] mx-[5%] rounded-2xl border border-neutral-200 bg-white p-6 text-black">
      <h2 className="mb-6 text-lg font-semibold tracking-tight">Projects</h2>

      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="flex-shrink-0 cursor-pointer"
              style={{ width: "450px" }} 
              onClick={() => router.push(project.link) }
            >
              <article className="h-[400px] rounded-xl border border-neutral-200
                overflow-hidden hover:scale-95 transition-transform duration-300 flex flex-col shadow-sm">
                <div className="relative h-64 w-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-contain" 
                  />
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-medium text-lg">{project.title}</h3>
                    <p className="text-sm text-neutral-600 mt-1 break-words line-clamp-3">
                      {project.description}
                    </p>
                  </div>

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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

