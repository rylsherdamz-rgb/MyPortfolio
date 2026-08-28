const { chromium } = require("playwright")
;(async () => {
  const b = await chromium.launch({ args: ["--use-gl=swiftshader"] })
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } })
  await p.goto("http://localhost:3999", { waitUntil: "networkidle" })
  // Scroll to connect and let animations fully settle.
  await p.evaluate(() => document.getElementById("connect")?.scrollIntoView())
  await p.waitForTimeout(2500)
  await p.screenshot({ path: "/tmp/port-shots/connect-settled.png" })
  // Also scroll slightly past and back to force settle.
  await p.evaluate(() => window.scrollBy(0, 200))
  await p.waitForTimeout(1500)
  await p.screenshot({ path: "/tmp/port-shots/connect-settled2.png" })
  await b.close()
  console.log("done")
})().catch((e) => { console.error(e); process.exit(1) })
