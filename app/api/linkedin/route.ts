import { NextResponse } from "next/server"
import { linkedinPosts, type LinkedInPost } from "@/constants/posts"

export const dynamic = "force-dynamic"
export const revalidate = 0

type ParsedPost = {
  title: string
  excerpt: string
  image: string | null
  url: string
  live: boolean
}

const CACHE_TTL = 10 * 60 * 1000

let cache: { at: number; data: ParsedPost[] } | null = null

function decodeEntities(html: string): string {
  return html
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
}

function extractMeta(html: string, property: string): string | null {
  const re = new RegExp(`<meta[^>]+(?:property|name)="${property}"[^>]*content="([^"]*)"`, "i")
  const m = html.match(re)
  return m ? decodeEntities(m[1]).trim() : null
}

function stripHashtags(title: string): string {
  return title
    .split("|")[0]
    .replace(/#\w+/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[\u0000-\u001f]/g, "")
}

function titleFromDescription(desc: string): string {
  const firstLine = desc
    .split("\n")
    .map((s) => s.trim())
    .find((s) => s.length > 10)
  if (!firstLine) return "LinkedIn Post"
  const clean = firstLine.replace(/#\w+/g, "").replace(/\s+/g, " ").trim()
  if (clean.length <= 80) return clean
  const cut = clean.slice(0, 80)
  return cut.slice(0, cut.lastIndexOf(" ")) + "…"
}

function excerptFromDescription(desc: string): string {
  const parts = desc
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean)
  return parts.slice(0, 3).join(" ").slice(0, 260)
}

async function fetchPost(
  post: LinkedInPost
): Promise<ParsedPost> {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(post.url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
          "Accept-Language": "en-US,en;q=0.9",
        },
        cache: "no-store",
        redirect: "follow",
      })

      if (!res.ok) throw new Error(`LinkedIn returned ${res.status}`)

      const html = await res.text()

      const rawTitle = extractMeta(html, "og:title")
      const desc = extractMeta(html, "description")
      const stripped = rawTitle ? stripHashtags(rawTitle) : ""
      const title = stripped && stripped.length > 5 ? stripped : (desc ? titleFromDescription(desc) : post.title)
      const excerpt = desc ? excerptFromDescription(desc) : post.excerpt
      const image = extractMeta(html, "og:image")

      return { title, excerpt, image, url: post.url, live: true }
    } catch {
      if (attempt < 3) {
        await new Promise((r) => setTimeout(r, 1500 * attempt))
      }
    }
  }
  return {
    title: post.title,
    excerpt: post.excerpt,
    image: null,
    url: post.url,
    live: false,
  }
}

async function fetchAllSequential(posts: LinkedInPost[]): Promise<ParsedPost[]> {
  const results: ParsedPost[] = []
  for (const post of posts) {
    results.push(await fetchPost(post))
    await new Promise((r) => setTimeout(r, 800))
  }
  return results
}

export async function GET() {
  if (cache && Date.now() - cache.at < CACHE_TTL) {
    return NextResponse.json({
      posts: cache.data,
      cached: true,
      live: cache.data.some((p) => p.live),
      at: cache.at,
    })
  }

  const posts = await fetchAllSequential(linkedinPosts)
  cache = { at: Date.now(), data: posts }

  return NextResponse.json({
    posts,
    cached: false,
    live: posts.some((p) => p.live),
    at: Date.now(),
  })
}