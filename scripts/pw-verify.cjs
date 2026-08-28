// Playwright verification harness for the 3D room / monitor dive.
// Loads the site, captures console + page errors, and screenshots the WebGL
// canvas at several scroll positions so we can SEE the dive-into-the-monitor.
const { chromium } = require("playwright")
const fs = require("fs")

const BASE = process.env.BASE_URL || "http://localhost:3999"
const OUT = "/tmp/pw-shots"

;(async () => {
  fs.mkdirSync(OUT, { recursive: true })
  const browser = await chromium.launch({
    args: ["--use-gl=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"],
  })
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

  const consoleErrors = []
  const pageErrors = []
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(m.text())
  })
  page.on("pageerror", (e) => pageErrors.push(e.message))

  const resp = await page.goto(BASE, { waitUntil: "networkidle", timeout: 30000 })
  console.log("HTTP", resp.status())

  // Give WebGL + GLB + texture time to render.
  await page.waitForTimeout(3500)

  // Read the screen mesh debug info exposed by CameraRig.
  const screenDebug = await page.evaluate(() => window.__screenDebug || null)
  console.log("=== SCREEN DEBUG ===")
  console.log(JSON.stringify(screenDebug, null, 2))

  // Is there a canvas mounted (the room)?
  const canvasCount = await page.locator("canvas").count()
  console.log("canvas elements:", canvasCount)

  // Scroll positions across the whole document to exercise the camera dive.
  const height = await page.evaluate(
    () => document.documentElement.scrollHeight - window.innerHeight
  )
  console.log("scrollable height:", height)

  const stops = [0, 0.15, 0.35, 0.55, 0.75, 1.0]
  for (let i = 0; i < stops.length; i++) {
    const y = Math.round(stops[i] * height)
    await page.evaluate((yy) => window.scrollTo(0, yy), y)
    await page.waitForTimeout(1600) // let the camera ease + texture repaint
    const file = `${OUT}/stop-${i}-${Math.round(stops[i] * 100)}pct.png`
    await page.screenshot({ path: file })
    console.log("shot", file, "@scrollY", y)
  }

  console.log("=== CONSOLE ERRORS ===")
  console.log(consoleErrors.length ? consoleErrors.join("\n") : "(none)")
  console.log("=== PAGE ERRORS ===")
  console.log(pageErrors.length ? pageErrors.join("\n") : "(none)")

  await browser.close()
})().catch((e) => {
  console.error("PW SCRIPT FAILED:", e)
  process.exit(1)
})
