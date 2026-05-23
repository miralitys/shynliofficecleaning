import fs from "node:fs/promises"
import path from "node:path"

const distDir = path.join(process.cwd(), "dist")

async function htmlFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) return htmlFiles(fullPath)
      if (entry.isFile() && entry.name.endsWith(".html")) return [fullPath]
      return []
    }),
  )

  return files.flat()
}

function optimizeStylesheetLinks(html) {
  return html.replace(
    /<link rel="stylesheet" crossorigin href="([^"]+\.css)">/g,
    (_match, href) =>
      `<link rel="preload" as="style" crossorigin href="${href}" onload="this.onload=null;this.rel='stylesheet'">` +
      `<noscript><link rel="stylesheet" crossorigin href="${href}"></noscript>`,
  )
}

const files = await htmlFiles(distDir)
let optimizedCount = 0

for (const file of files) {
  const html = await fs.readFile(file, "utf8")
  const optimized = optimizeStylesheetLinks(html)

  if (optimized !== html) {
    optimizedCount += 1
    await fs.writeFile(file, optimized)
  }
}

console.log(`Optimized CSS loading in ${optimizedCount} HTML files.`)
