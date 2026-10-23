import { mkdir, readdir } from "node:fs/promises"

// Render serves real files before applying routing rules. Publish an empty
// directory so every path reaches the existing server-side redirect handler.
// The original src/, public/ and dist/ remain intact for rollback.
const directory = new URL("../redirect-origin/", import.meta.url)
await mkdir(directory, { recursive: true })
if ((await readdir(directory)).length !== 0) {
  throw new Error("redirect-origin must remain empty; restore the original publish directory for rollback")
}
console.log("Prepared empty redirect-origin directory for server-side 301 routing (2026-10-23.2).")
