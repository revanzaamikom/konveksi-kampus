# ADR-002 — Isolate all catalog data behind a content-layer adapter

**Status:** Accepted
**Date:** 2026-02-19
**Deciders:** Development agent

## Context

Standard stores catalog data in TypeScript content files (PRD §4). Business will move that data
into a database with admin CRUD. We must avoid a UI rewrite at that boundary (PRD §8,
`AGENTS.md` §11).

## Decision

All read access to catalog data goes through **one module**: `src/lib/content/*`, exposing a
small, stable interface:

```ts
getCategories()
getCategoryBySlug(slug)
getProducts({ category?, q?, featured? })
getProductBySlug(slug)
```

UI components and pages **must import only from `lib/content`**, never from `src/data` directly.
The `setup-ts-deep-modules` / `dependency-cruiser` tooling will enforce this boundary.

## Consequences

- Standard = files; Business = database. Only `lib/content` internals change.
- The interface is the test surface — testability and AI-navigability improve.
- Slight indirection cost for Standard (one extra layer), accepted as worthwhile for the migration.
