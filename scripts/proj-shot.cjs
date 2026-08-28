const { chromium } = require("playwright")
;(async () => {
  const b = await chromium.launch({ args: ["--use-gl=swiftshader"] })
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } })
  await p.goto("http://localhost:3999", { waitUntil: "networkidle" })
  await p.waitForTimeout(1200)
  // Find projects section top and its pinned height, sample a few points inside.
  const info = await p.evaluate(() => {
    const el = document.getElementById("projects")
    const r = el.getBoundingClientRect()
    return { top: r.top + window.scrollY, height: r.height }
  })
  const pts = [0.15, 0.4, 0.7, 0.95]
  for (let i = 0; i < pts.length; i++) {
    const y = Math.round(info.top + info.height * pts[i] - 200)
    await p.evaluate((yy) => window.scrollTo(0, yy), y)
    await p.waitForTimeout(900)
    await p.screenshot({ path: `/tmp/ov-shots/proj-${i}.png` })
  }
  console.log("projects top", info.top, "height", info.height)
  await b.close()
})().catch((e) => { console.error(e); process.exit(1) })
