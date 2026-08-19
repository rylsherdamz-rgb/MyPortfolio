"use client"

import { linkedinPosts } from "@/constants/posts"
import { Icon } from "@iconify/react"
import { MessageSquareQuote, ArrowUpRight } from "lucide-react"

export default function LinkedInPosts() {
  return (
    <section className="w-full px-6 md:px-20 py-16 md:py-24 bg-neutral-50">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-12 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-neutral-900 text-white">
              <MessageSquareQuote className="h-5 w-5" />
            </span>
            <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
              Build in public
            </p>
          </div>

          <h2 className="font-[var(--font-roboto-slab)] text-3xl font-bold tracking-tight text-black sm:text-4xl">
            Latest from{" "}
            <span className="text-neutral-400">LinkedIn</span>
          </h2>
          <p className="max-w-2xl text-neutral-600 leading-relaxed">
            Moments, milestones, and lessons from my journey — sharing what I
            build and learn, one post at a time.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {linkedinPosts.map((post) => (
            <a
              key={post.title}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-neutral-400 hover:shadow-lg"
            >
              <div className="flex items-center justify-between gap-3">
                <Icon
                  icon="mdi:linkedin"
                  className="h-6 w-6 text-neutral-300 transition-colors group-hover:text-[#0a66c2]"
                />
                <span className="text-xs font-medium text-neutral-400">
                  {post.date}
                </span>
              </div>

              <h3 className="mt-4 font-semibold leading-snug text-black">
                {post.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600 line-clamp-4">
                {post.excerpt}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-neutral-800 transition-colors group-hover:text-[#0a66c2]">
                <span>Read on LinkedIn</span>
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}