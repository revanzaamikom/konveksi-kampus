# DEPLOY.md — KonveksiKampus deployment

Two funnels (decided with the client):

| Purpose                        | Tool                              | URL                                                |
| ------------------------------ | --------------------------------- | -------------------------------------------------- |
| **Client preview (permanent)** | **GitHub Pages** (GitHub Actions) | `https://revanzaamikom.github.io/konveksi-kampus/` |
| **Production**                 | **Netlify** (static export)       | client domain                                      |

GitHub Pages is the always-on preview: once deployed it keeps working without any laptop
running, so the client can be shown the site at any time.

---

## 1. Client preview — GitHub Pages (always live)

Deployment is automated by `.github/workflows/deploy-pages.yml` on every push to `main`.

### One-time setup (in the GitHub repo)

1. Go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.

That's it. Push to `main` and the workflow builds the static export and publishes it.

### How the subpath works

GitHub Pages serves a project site from `/<repo>/`, so the Pages build sets
`GITHUB_PAGES=true`, which makes `next.config.ts` apply:

```ts
basePath: "/konveksi-kampus";
assetPrefix: "/konveksi-kampus/";
```

Images are handled by `assetPath()` in `src/lib/site.ts` (because `next/image` does not
apply `basePath` when `unoptimized: true`). Local dev and Netlify are unaffected —
without the env var, everything serves from the root.

### Manual local test of the Pages build

```powershell
$env:GITHUB_PAGES="true"
npm run build
# serve out/ and check that /konveksi-kampus/... asset URLs resolve
```

---

## 2. Production — Netlify

Static export published from `out/`.

### One-time setup

```powershell
npx netlify-cli login
npx netlify-cli init      # link this folder; publish dir = out
```

### Deploy

```powershell
npm run build
npx netlify-cli deploy --prod --dir=out
```

Or connect the GitHub repo to a Netlify site for Git-based auto-deploys.
`netlify.toml` already sets `command = "npm run build"` and `publish = "out"`.

> Cost note: Netlify Free has a build-minutes quota. Day-to-day previews are covered by
> GitHub Pages, so Netlify builds can be reserved for real releases.

You can also run the helper: `powershell -ExecutionPolicy Bypass -File scripts/deploy.ps1`.

---

## (Optional) Instant local sharing — cloudflared

For quick live review of uncommitted work (tunnel dies when you stop it):

```powershell
powershell -ExecutionPolicy Bypass -File scripts/preview.ps1
```

This runs the dev server and opens a temporary `https://*.trycloudflare.com` URL.
Use only for short sessions — not a permanent preview (see GitHub Pages above for that).

---

## Checklist before a client-facing deploy

- [ ] Replace placeholders in `src/lib/site.ts` (WhatsApp number, email, address, domain).
- [ ] `npm run build` succeeds.
- [ ] `npm run typecheck` passes.
- [ ] Spot-check the exported `out/index.html` and a product page.
