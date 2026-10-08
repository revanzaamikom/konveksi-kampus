# DEPLOY.md — KonveksiKampus deployment

Two funnels (decided with the client):

| Purpose              | Tool                                         | Why                                                           |
| -------------------- | -------------------------------------------- | ------------------------------------------------------------- |
| **Preview → client** | `cloudflared` tunnel to the local dev server | Instant share, no deploy, ideal while design is still in flux |
| **Production**       | **Netlify** (static export)                  | Free tier, publishes the `out/` folder                        |

---

## 1. Preview to client (cloudflared)

The site is served locally and exposed through a temporary Cloudflare tunnel.

```powershell
# Terminal 1 — run the dev server
npm run dev

# Terminal 2 — expose it
cloudflared tunnel --url http://localhost:3000
```

`cloudflared` prints a public URL like `https://<random>.trycloudflare.com`. Share that
with the client. The tunnel only lives while the command runs.

> Alternatively, preview the _production build_ instead of the dev server:
> `npm run build` then `npm run preview` (serves `out/` on port 3000), then run the tunnel.

**Note:** quick tunnels are unauthenticated. Use only for short review sessions. Do not
share sensitive data through them.

---

## 2. Production (Netlify)

The site is a **static export** (`next.config.ts` → `output: "export"`), published from `out/`.

### One-time setup

```powershell
npx netlify-cli login          # authenticate
npx netlify-cli init           # link this folder to a Netlify site (publish dir: out)
```

### Deploy

```powershell
npm run build
npx netlify-cli deploy --prod --dir=out
```

`netlify.toml` already sets `build.command = "npm run build"` and `publish = "out"`, so a
Git-based deploy works without extra configuration.

### Option A — Git-based (recommended for production)

Connect the GitHub repo `revanzaamikom/konveksi-kampus` to a Netlify site. Netlify then
builds and deploys on every push to `main`.

> Cost note: Netlify Free has a build-minutes quota. Prefer Git auto-deploy for real
> releases; avoid pushing to `main` for every tiny preview (use the cloudflared tunnel instead).

### Option B — Manual

`npx netlify-cli deploy --prod --dir=out` as above.

---

## 3. GitHub Pages (optional third option)

Static export also publishes cleanly to GitHub Pages. This requires a repo base path:

```ts
// next.config.ts (only if deploying to https://<user>.github.io/<repo>/)
basePath: "/konveksi-kampus",
assetPrefix: "/konveksi-kampus/",
```

Then publish `out/` via a `gh-pages` branch or GitHub Actions. Not configured by default —
use only if the client wants a stable free front-end preview.

---

## Checklist before a client-facing deploy

- [ ] Replace placeholders in `src/lib/site.ts` (WhatsApp number, email, address, domain).
- [ ] `npm run build` succeeds.
- [ ] `npm run typecheck` passes.
- [ ] Spot-check the exported `out/index.html` and a product page in a browser.
