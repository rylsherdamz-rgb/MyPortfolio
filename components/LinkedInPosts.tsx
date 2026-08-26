"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { linkedinPosts } from "@/constants/posts"
import { Icon } from "@iconify/react"
import { MessageSquareQuote, ArrowUpRight } from "lucide-react"
import SectionHeader from "@/components/SectionHeader"

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
    <section className="w-full px-6 py-16 md:px-20 md:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeader
          icon={MessageSquareQuote}
          eyebrow="Build in public"
          title={
            <>
              Latest from <span className="text-neutral-400">LinkedIn</span>
            </>
          }
          description="Moments, milestones, and lessons from my journey, pulled live from my LinkedIn, one post at a time."
          action={
            <span className="border-2 border-[var(--line)] bg-white px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-600 shadow-[3px_3px_0_0_var(--shadow-hard)]">
              <span
                className={`mr-1.5 inline-block h-2 w-2 ${
                  loading
                    ? "bg-amber-400"
                    : source === "live"
                      ? "bg-green-500"
                      : "bg-neutral-300"
                }`}
              />
              {loading
                ? "Syncing"
                : source === "live"
                  ? "Live sync"
                  : "Saved posts"}
            </span>
          }
        />

        <div
          data-sc-in
          data-sc-stagger="70"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {posts.map((post) => (
            <a
              key={post.url}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card-hard group flex flex-col rounded-none bg-white p-5"
            >
              {post.image ? (
                <div className="relative mb-4 h-36 w-full overflow-hidden border-b-2 border-[var(--line)]">
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
                  className="h-6 w-6 text-neutral-300 transition-colors group-hover:text-accent"
                />
                <ArrowUpRight className="h-4 w-4 text-neutral-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>

              <h3 className="mt-3 line-clamp-2 font-display text-xl uppercase leading-tight text-black">
                {post.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600 line-clamp-4">
                {post.excerpt}
              </p>

              <div className="mt-5 inline-flex items-center gap-1.5 border-t-2 border-[var(--line)] pt-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                Read on LinkedIn
                <ArrowUpRight size={14} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}