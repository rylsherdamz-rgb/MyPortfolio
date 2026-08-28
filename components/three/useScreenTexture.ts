"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { projects } from "@/constants/projects"
import { techStack } from "@/constants/techstack"
import { socials } from "@/constants/socials"
import { stats } from "@/constants/achievements"

export type RoomSection =
  | "home"
  | "tech-stack"
  | "projects"
  | "achievements"
  | "posts"
  | "connect"

// Screen canvas resolution. 16:10-ish to match a monitor; high enough for
// crisp text when the camera dives all the way in.
const W = 1280
const H = 800

const PALETTE = {
  bg: "#0b0e14",
  bgGrid: "rgba(255,255,255,0.03)",
  ink: "#e6e8ee",
  dim: "#8b93a3",
  green: "#27c93f",
  amber: "#ffbd2e",
  accent: "#eb4b27",
  panel: "#121722",
  panelBorder: "rgba(255,255,255,0.08)",
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

/** Paints the OS-like chrome shared by every section. Returns the content top Y. */
function paintChrome(ctx: CanvasRenderingContext2D, section: RoomSection) {
  // Background + faint grid so the display reads as a real screen.
  ctx.fillStyle = PALETTE.bg
  ctx.fillRect(0, 0, W, H)
  ctx.strokeStyle = PALETTE.bgGrid
  ctx.lineWidth = 1
  for (let x = 0; x <= W; x += 40) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, H)
    ctx.stroke()
  }
  for (let y = 0; y <= H; y += 40) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(W, y)
    ctx.stroke()
  }

  // Title bar.
  ctx.fillStyle = "#0d1119"
  ctx.fillRect(0, 0, W, 56)
  ctx.strokeStyle = PALETTE.panelBorder
  ctx.beginPath()
  ctx.moveTo(0, 56)
  ctx.lineTo(W, 56)
  ctx.stroke()
  const dots = ["#ff5f56", "#ffbd2e", "#27c93f"]
  dots.forEach((c, i) => {
    ctx.fillStyle = c
    ctx.beginPath()
    ctx.arc(80 + i * 26, 28, 8, 0, Math.PI * 2)
    ctx.fill()
  })
  ctx.fillStyle = PALETTE.dim
  ctx.font = "600 20px ui-monospace, monospace"
  ctx.textBaseline = "middle"
  ctx.fillText(`richie@portfolio  —  ~/${section}`, 180, 29)

  return 96
}

function paintLabel(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  text: string
) {
  ctx.fillStyle = PALETTE.green
  ctx.font = "600 24px ui-monospace, monospace"
  ctx.textBaseline = "top"
  ctx.fillText(text, x, y)
}

function paintSection(ctx: CanvasRenderingContext2D, section: RoomSection) {
  const top = paintChrome(ctx, section)
  // Left safe margin: the screen mesh's UVs clip a sliver at the edges, so keep
  // content well inside (verified via Playwright screenshots — 48 clipped the
  // first glyph of every line).
  const x = 96
  ctx.textBaseline = "top"

  if (section === "home") {
    paintLabel(ctx, x, top, "$ whoami")
    ctx.fillStyle = PALETTE.ink
    ctx.font = "800 64px Anton, system-ui, sans-serif"
    ctx.fillText("RICHIE CHRISTIAN", x, top + 44)
    ctx.fillText("DE GUZMAN", x, top + 116)
    ctx.fillStyle = PALETTE.accent
    ctx.font = "600 26px ui-monospace, monospace"
    ctx.fillText("Full-Stack · Data · Blockchain Developer", x, top + 196)

    paintLabel(ctx, x, top + 260, "$ cat stats.txt")
    ctx.font = "700 40px Anton, system-ui, sans-serif"
    stats.forEach((s, i) => {
      const cx = x + (i % 2) * 560
      const cy = top + 306 + Math.floor(i / 2) * 96
      ctx.fillStyle = PALETTE.accent
      ctx.fillText(s.value, cx, cy)
      ctx.fillStyle = PALETTE.dim
      ctx.font = "500 22px ui-monospace, monospace"
      ctx.fillText(s.label, cx + 90, cy + 12)
      ctx.font = "700 40px Anton, system-ui, sans-serif"
    })
  }

  if (section === "tech-stack") {
    paintLabel(ctx, x, top, "$ ls ~/stack")
    let y = top + 56
    Object.entries(techStack)
      .slice(0, 6)
      .forEach(([cat, items]) => {
        ctx.fillStyle = PALETTE.amber
        ctx.font = "700 26px ui-monospace, monospace"
        ctx.fillText(`${cat}/`, x, y)
        ctx.fillStyle = PALETTE.ink
        ctx.font = "400 22px ui-monospace, monospace"
        const names = (items as { name: string }[]).map((i) => i.name).join("  ·  ")
        ctx.fillText(names, x + 250, y + 2)
        y += 46
      })
  }

  if (section === "projects") {
    paintLabel(ctx, x, top, "$ git log --oneline ~/projects")
    let y = top + 56
    projects.slice(0, 7).forEach((p) => {
      ctx.fillStyle = PALETTE.accent
      ctx.font = "700 24px ui-monospace, monospace"
      const slug = p.title.toLowerCase().replace(/\s+/g, "-")
      ctx.fillText(slug, x, y)
      ctx.fillStyle = PALETTE.dim
      ctx.font = "400 20px ui-monospace, monospace"
      ctx.fillText(p.tech.slice(0, 4).join(" · "), x + 300, y + 2)
      y += 44
    })
  }

  if (section === "achievements") {
    paintLabel(ctx, x, top, "$ cat achievements.log")
    ctx.font = "700 40px Anton, system-ui, sans-serif"
    stats.forEach((s, i) => {
      const cx = x + (i % 2) * 560
      const cy = top + 56 + Math.floor(i / 2) * 96
      ctx.fillStyle = PALETTE.accent
      ctx.fillText(s.value, cx, cy)
      ctx.fillStyle = PALETTE.dim
      ctx.font = "500 22px ui-monospace, monospace"
      ctx.fillText(s.label, cx + 90, cy + 12)
      ctx.font = "700 40px Anton, system-ui, sans-serif"
    })
    ctx.fillStyle = PALETTE.ink
    ctx.font = "500 24px ui-monospace, monospace"
    ctx.fillText("Hackathon champion · Google Cloud Arcade Facilitator", x, top + 280)
  }

  if (section === "posts") {
    paintLabel(ctx, x, top, "$ curl linkedin/feed --latest")
    let y = top + 60
    projects.slice(0, 3).forEach((p) => {
      ctx.fillStyle = PALETTE.panel
      roundRect(ctx, x, y, W - x * 2, 120, 12)
      ctx.fill()
      ctx.strokeStyle = PALETTE.panelBorder
      ctx.stroke()
      ctx.fillStyle = PALETTE.ink
      ctx.font = "700 24px ui-monospace, monospace"
      ctx.fillText(p.title, x + 22, y + 18)
      ctx.fillStyle = PALETTE.dim
      ctx.font = "400 19px ui-monospace, monospace"
      const desc = p.description.slice(0, 78) + "…"
      ctx.fillText(desc, x + 22, y + 56)
      y += 140
    })
  }

  if (section === "connect") {
    paintLabel(ctx, x, top, "$ ./connect.sh")
    ctx.fillStyle = PALETTE.ink
    ctx.font = "800 56px Anton, system-ui, sans-serif"
    ctx.fillText("LET'S CONNECT", x, top + 50)
    let y = top + 150
    socials.forEach((s) => {
      ctx.fillStyle = PALETTE.accent
      ctx.font = "700 28px ui-monospace, monospace"
      ctx.fillText("›", x, y)
      ctx.fillStyle = PALETTE.ink
      ctx.fillText(s.name, x + 40, y)
      ctx.fillStyle = PALETTE.dim
      ctx.font = "400 20px ui-monospace, monospace"
      ctx.fillText(s.url.replace("https://", ""), x + 260, y + 4)
      y += 52
    })
  }

  // Blinking-cursor-style footer prompt (static frame).
  ctx.fillStyle = PALETTE.dim
  ctx.font = "500 20px ui-monospace, monospace"
  ctx.fillText("▌", x, H - 48)
}

/**
 * Paints the given section onto an offscreen canvas and returns a
 * THREE.CanvasTexture suitable for use as a mesh's map + emissiveMap. The
 * texture is repainted (and flagged for upload) whenever `section` changes, so
 * the monitor's actual display surface shows live content.
 */
export function useScreenTexture(section: RoomSection): THREE.CanvasTexture | null {
  // Lazy state initializer creates the canvas + texture exactly once, on the
  // client, without writing refs during render. THREE objects are mutable by
  // design; we perform the (necessary) imperative repaint through a ref that is
  // only ever assigned/mutated inside effects, satisfying the React 19 rules.
  const [gfx] = useState<{
    canvas: HTMLCanvasElement
    texture: THREE.CanvasTexture
  } | null>(() => {
    if (typeof document === "undefined") return null
    const canvas = document.createElement("canvas")
    canvas.width = W
    canvas.height = H
    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 8
    texture.flipY = true
    return { canvas, texture }
  })

  const dirtyRef = useRef<THREE.CanvasTexture | null>(null)

  // Repaint whenever the section changes. The texture is retrieved via a ref
  // (assigned here inside the effect), and its needsUpdate flag is toggled
  // through that ref rather than on the state value directly.
  useEffect(() => {
    if (!gfx) return
    const ctx = gfx.canvas.getContext("2d")
    if (!ctx) return
    paintSection(ctx, section)
    dirtyRef.current = gfx.texture
    dirtyRef.current.needsUpdate = true
  }, [section, gfx])

  // Dispose on unmount.
  useEffect(() => {
    const tex = gfx?.texture
    return () => {
      tex?.dispose()
    }
  }, [gfx])

  return gfx?.texture ?? null
}
