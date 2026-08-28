const { chromium } = require("playwright")
const fs = require("fs")
const BASE = process.env.BASE_URL || "http://localhost:3999"
const OUT = "/tmp/port-shots"
;(async () => {
  fs.mkdirSync(OUT, { recursive: true })
  const browser = await chromium.launch({
    args: ["--use-gl=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"],
  })
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  const errs = []
  page.on("console", (m) => m.type() === "error" && errs.push(m.text()))
  page.on("pageerror", (e) => errs.push("PAGEERROR: " + e.message))
  const r = await page.goto(BASE, { waitUntil: "networkidle", timeout: 30000 })
  console.log("HTTP", r.status())
  await page.waitForTimeout(3000)
  const h = await page.evaluate(
    () => document.documentElement.scrollHeight - window.innerHeight
  )
  const stops = [0, 0.12, 0.3, 0.5, 0.7, 0.88, 1.0]
  for (let i = 0; i < stops.length; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), Math.round(stops[i] * h))
    await page.waitForTimeout(900)
    await page.screenshot({ path: `${OUT}/s${i}-${Math.round(stops[i] * 100)}.png` })
  }
  console.log("scrollHeight extra:", h)
  console.log("ERRORS:", errs.length ? errs.join("\n") : "(none)")
  await browser.close()
})().catch((e) => { console.error("FAIL", e); process.exit(1) })
