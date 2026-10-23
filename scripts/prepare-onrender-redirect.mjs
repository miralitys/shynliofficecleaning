import { mkdir, readdir, writeFile } from "node:fs/promises"

// Render requires a nonempty publication directory and serves real files
// before routing rules. Publish only a deployment marker, never old pages.
// Original src/, public/ and dist/ remain intact for rollback.
const directory = new URL("../redirect-origin/", import.meta.url)
const marker = "__shynli_redirect_version.txt"
await mkdir(directory, { recursive: true })
if ((await readdir(directory)).some((name) => name !== marker)) {
  throw new Error("redirect-origin may contain only the deployment marker")
}
await writeFile(new URL(marker, directory), "Shynli onrender server redirects 2026-10-23.2\n")
console.log("Prepared redirect-origin with deployment marker only (2026-10-23.2).")
