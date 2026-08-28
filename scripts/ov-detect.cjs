const { chromium } = require("playwright")
const fs = require("fs")
const BASE = "http://localhost:3999"
const OUT = "/tmp/ov-shots"
;(async () => {
  fs.mkdirSync(OUT, { recursive: true })
  const b = await chromium.launch({ args: ["--use-gl=swiftshader"] })
  for (const vp of [{ w: 1440, h: 900, tag: "desk" }, { w: 390, h: 844, tag: "mob" }]) {
    const p = await b.newPage({ viewport: { width: vp.w, height: vp.h } })
    await p.goto(BASE, { waitUntil: "networkidle" })
    await p.waitForTimeout(1500)
    const H = await p.evaluate(() => document.documentElement.scrollHeight)
    const vh = vp.h
    let i = 0
    for (let y = 0; y < H; y += Math.round(vh * 0.85)) {
      await p.evaluate((yy) => window.scrollTo(0, yy), y)
      await p.waitForTimeout(700)
      await p.screenshot({ path: `${OUT}/${vp.tag}-${String(i).padStart(2, "0")}.png` })
      i++
    }
    // Programmatic overlap detection between major blocks.
    const overlaps = await p.evaluate(() => {
      const sel = "section, header, nav, footer, [id]"
      const els = Array.from(document.querySelectorAll(sel)).filter((e) => {
        const r = e.getBoundingClientRect()
        return r.width > 200 && r.height > 40
      })
      // Use document coords
      const boxes = els.map((e) => {
        const r = e.getBoundingClientRect()
        return {
          id: e.id || e.tagName.toLowerCase() + "." + (e.className || "").toString().slice(0, 20),
          top: r.top + window.scrollY,
          bottom: r.bottom + window.scrollY,
          left: r.left,
          right: r.right,
          pos: getComputedStyle(e).position,
        }
      })
      const hits = []
      for (let a = 0; a < boxes.length; a++) {
        for (let b2 = a + 1; b2 < boxes.length; b2++) {
          const A = boxes[a], B = boxes[b2]
          // skip fixed/sticky (nav) and skip nesting (contained)
          if (A.pos === "fixed" || B.pos === "fixed" || A.pos === "sticky" || B.pos === "sticky") continue
          const vOverlap = Math.min(A.bottom, B.bottom) - Math.max(A.top, B.top)
          const hOverlap = Math.min(A.right, B.right) - Math.max(A.left, B.left)
          const contained =
            (A.top <= B.top && A.bottom >= B.bottom) ||
            (B.top <= A.top && B.bottom >= A.bottom)
          if (vOverlap > 8 && hOverlap > 100 && !contained) {
            hits.push({ a: A.id, b: B.id, vOverlap: Math.round(vOverlap) })
          }
        }
      }
      return hits.slice(0, 30)
    })
    console.log(`\n[${vp.tag}] shots: ${i}, overlaps:`, JSON.stringify(overlaps, null, 2))
    await p.close()
  }
  await b.close()
})().catch((e) => { console.error(e); process.exit(1) })
