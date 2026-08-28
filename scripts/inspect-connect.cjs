const { chromium } = require("playwright")
;(async () => {
  const b = await chromium.launch({ args: ["--use-gl=swiftshader"] })
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } })
  await p.goto("http://localhost:3999", { waitUntil: "networkidle" })
  await p.evaluate(() => document.getElementById("connect")?.scrollIntoView())
  await p.waitForTimeout(2000)
  const info = await p.evaluate(() => {
    const sec = document.getElementById("connect")
    if (!sec) return { err: "no connect" }
    // find paragraphs containing "Reach out"
    const all = Array.from(sec.querySelectorAll("p, span, div")).filter((n) =>
      /Reach out on any platform/i.test(n.textContent || "") &&
      (n.children.length === 0 || n.tagName === "P")
    )
    const target = Array.from(sec.querySelectorAll("p")).find((n) =>
      /Reach out on any platform/i.test(n.textContent || "")
    )
    const cs = target ? getComputedStyle(target) : null
    return {
      matchCount: all.length,
      pTag: target ? target.outerHTML.slice(0, 200) : null,
      textShadow: cs && cs.textShadow,
      transform: cs && cs.transform,
      filter: cs && cs.filter,
      // check for data-sc attributes on ancestors
      scAttrs: target
        ? (() => {
            let el = target, out = []
            while (el && el !== document.body) {
              const at = Array.from(el.attributes || [])
                .filter((a) => a.name.startsWith("data-sc"))
                .map((a) => `${el.tagName}.${a.name}=${a.value}`)
              out.push(...at)
              el = el.parentElement
            }
            return out
          })()
        : [],
    }
  })
  console.log(JSON.stringify(info, null, 2))
  await b.close()
})().catch((e) => { console.error(e); process.exit(1) })
