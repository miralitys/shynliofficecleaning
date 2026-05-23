import fs from "node:fs/promises"
import path from "node:path"
import React from "react"
import { renderToString } from "react-dom/server"
import { createServer } from "vite"

const rootDir = process.cwd()
const distIndexPath = path.join(rootDir, "dist", "index.html")

globalThis.window = {
  location: {
    pathname: "/",
    hash: "",
  },
}

const server = await createServer({
  root: rootDir,
  logLevel: "error",
  optimizeDeps: {
    noDiscovery: true,
  },
  server: { middlewareMode: true },
  appType: "custom",
})

try {
  const { default: App } = await server.ssrLoadModule("/src/App.tsx")
  const appHtml = renderToString(React.createElement(App))
  const html = await fs.readFile(distIndexPath, "utf8")
  const staticHtml = html
    .replace(/<link rel="modulepreload" crossorigin href="[^"]+">\n\s*/g, "")
    .replace(/<script type="module" crossorigin src="[^"]+"><\/script>\n\s*/g, "")
    .replace(/<div id="root">[\s\S]*?<\/div>\s*<\/body>/, `<div id="root">${appHtml}</div>\n    ${industryTabsScript()}\n  </body>`)

  await fs.writeFile(distIndexPath, staticHtml)
  console.log("Static-rendered homepage without external JavaScript.")
} finally {
  await server.close()
}

function industryTabsScript() {
  const data = {
    offices: {
      title: "Office buildings and shared workspaces",
      copy: "Reception areas, conference rooms, kitchens, restrooms, private offices, shared desks, glass, and high-touch surfaces.",
      checklist: ["Nightly or weekly cleaning", "Restroom and breakroom standards", "Trash, floors, dusting, and glass", "Issue reporting after each visit"],
    },
    medical: {
      title: "Medical and dental offices",
      copy: "Waiting rooms, staff zones, exam rooms, restrooms, and the high-touch areas that make a facility feel safe and maintained.",
      checklist: ["High-touch surface focus", "Waiting room reset", "Staff area cleaning", "Patient-ready presentation"],
    },
    retail: {
      title: "Retail and customer-facing spaces",
      copy: "Storefronts, counters, fitting rooms, glass, public restrooms, back rooms, and floors that need to look ready every morning.",
      checklist: ["Storefront presentation", "Glass and counters", "Customer restroom cleaning", "Opening-ready schedule"],
    },
    managed: {
      title: "Common areas and managed properties",
      copy: "Lobbies, stairwells, hallways, elevators, leasing offices, shared restrooms, and building touchpoints.",
      checklist: ["Common area route", "Tenant-facing standards", "Supervisor walkthroughs", "Recurring service plan"],
    },
  }

  return `<script>
    (() => {
      const industryData = ${JSON.stringify(data)};
      const title = document.querySelector("[data-industry-title]");
      const copy = document.querySelector("[data-industry-copy]");
      const checklist = document.querySelector("[data-industry-checklist]");
      const tabs = document.querySelectorAll("[data-industry-tab]");
      if (!title || !copy || !checklist || !tabs.length) return;

      tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          const next = industryData[tab.dataset.industryTab];
          if (!next) return;
          tabs.forEach((item) => item.setAttribute("aria-selected", String(item === tab)));
          title.textContent = next.title;
          copy.textContent = next.copy;
          checklist.replaceChildren(...next.checklist.map((item) => {
            const node = document.createElement("div");
            node.className = "border-l-4 border-sky-400 bg-sky-50 p-4 font-black";
            node.textContent = item;
            return node;
          }));
        });
      });
    })();
  </script>`
}
