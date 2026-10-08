# ADR-001 — Use Next.js + Tailwind + Content-layer for the Standard MVP

**Status:** Accepted
**Date:** 2026-02-19
**Deciders:** Client + development agent

## Context

KonveksiKampus must ship a **Standard** catalog website now, but must be able to grow into
**Business** (admin CMS, database) and **Pro** without a full rewrite (PRD §8).

The build machine has Node.js 24 and npm; no Docker, no PHP.

## Decision

Use:

- **Next.js 15 (App Router) + TypeScript** — SSG for a fast, SEO-friendly catalog; natural path
  to server actions + admin routes later.
- **Tailwind CSS v4 + shadcn/ui** — CSS-first design tokens; accessible copy-in components.
- **TypeScript content files behind a `lib/content` adapter** for Standard data.

## Alternatives considered

- **Astro** — excellent for a static catalog, but less natural once interactive admin CRUD is added.
- **Laravel + MySQL** — full-featured, but requires PHP/Composer/MySQL not installed here and adds
  a second language for the team.
- **SQLite + Prisma from the start** — rejected for Standard as premature (AGENTS.md §5).

## Consequences

- One codebase serves Standard → Business → Pro; the migration point is isolated in `lib/content`.
- Hosting can start free (static) and scale to a server-backed app without changing routes/UI.
- We take on the Next.js/Tailwind ecosystem as a dependency (mainstream, well-maintained).
