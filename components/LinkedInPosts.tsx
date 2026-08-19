"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { linkedinPosts } from "@/constants/posts"
import { Icon } from "@iconify/react"
import { MessageSquareQuote, ArrowUpRight, RefreshCw } from "lucide-react"

type FeedPost = {
  title: string
  excerpt: string
  image: string | null
  url: string
  live?: boolean
}

export default function LinkedInPosts() {
  const [posts, setPosts] = useState<FeedPost[]>(
    linkedinPosts.map((p) => ({
      title: p.title,
      excerpt: p.excerpt,
      image: null,
      url: p.url,
      live: false,
    }))
  )
  const [source, setSource] = useState<"static" | "live">("static")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch("/api/linkedin")
        if (!res.ok) throw new Error("fetch failed")
        const data = await res.json()
        if (!cancelled && Array.isArray(data.posts)) {
          setPosts(data.posts)
          setSource(data.live ? "live" : "static")
        }
      } catch {
        // fall back to static data
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

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

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-2">
              <h2 className="font-[var(--font-roboto-slab)] text-3xl font-bold tracking-tight text-black sm:text-4xl">
                Latest from <span className="text-neutral-400">LinkedIn</span>
              </h2>
              <p className="max-w-2xl text-neutral-600 leading-relaxed">
                Moments, milestones, and lessons from my journey — pulled live
                from my LinkedIn, one post at a time.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs text-neutral-500">
              <span
                className={`h-2 w-2 rounded-full ${
                  loading
                    ? "bg-amber-400"
                    : source === "live"
                      ? "bg-green-500"
                      : "bg-neutral-300"
                }`}
              />
              {loading
                ? "Syncing…"
                : source === "live"
                  ? "Synced with LinkedIn"
                  : "LinkedIn unreachable — showing saved posts"}
              {loading ? (
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              ) : null}
            </div>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <a
              key={post.url}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-neutral-400 hover:shadow-lg"
            >
              {post.image ? (
                <div className="relative mb-4 h-36 w-full overflow-hidden rounded-xl bg-neutral-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 90vw, 400px"
                    unoptimized
                  />
                </div>
              ) : null}

              <div className="flex items-center justify-between gap-3">
                <Icon
                  icon="mdi:linkedin"
                  className="h-6 w-6 text-neutral-300 transition-colors group-hover:text-[#0a66c2]"
                />
              </div>

              <h3 className="mt-3 font-semibold leading-snug text-black line-clamp-2">
                {post.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600 line-clamp-4">
                {post.excerpt}
              </p>

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