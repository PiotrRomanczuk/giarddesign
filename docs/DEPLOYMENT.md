---
title: Wdrożenie — giarddesign
created: 2026-07-22
updated: 2026-07-22
---

# Wdrożenie

`giarddesign` to statyczna witryna front-endowa. `npm run build` generuje katalog `dist/` z gotowymi,
zoptymalizowanymi zasobami, które można wdrożyć na dowolnym hostingu stron statycznych / SPA.

## Build lokalny

```bash
npm ci            # deterministyczna instalacja z package-lock.json
npm run build     # typecheck (vue-tsc) + build → dist/
npm run preview   # podgląd builda: http://localhost:4173
```

Katalog `dist/` zawiera `index.html` oraz zasoby z hashami w nazwach (`assets/index-*.js`,
`assets/index-*.css`), więc jest bezpieczny do agresywnego cache'owania.

## Wymagania środowiska

- **Node.js ≥ 20.19** (zalecane 22 LTS) do zbudowania. Sam hosting serwuje statyczne pliki — środowisko
  uruchomieniowe Node **nie** jest wymagane w produkcji.

## Warianty wdrożenia

### Vercel (zalecane)

Framework wykrywany automatycznie (Vite).

- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm ci`

Wdrożenie: podłącz repozytorium w panelu Vercel **albo** z CLI:

```bash
npm i -g vercel
vercel            # preview
vercel --prod     # produkcja
```

### Netlify

`netlify.toml` (opcjonalnie, w korzeniu):

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

### GitHub Pages (aktywny — automatyczny)

Projekt jest wdrażany na GitHub Pages **automatycznie** przy każdym pushu na `master`:

- **URL:** <https://piotrromanczuk.github.io/giarddesign/>
- **Workflow:** [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) — buduje (`npm run build`),
  pakuje `dist/` jako artefakt Pages (`upload-pages-artifact`) i publikuje (`deploy-pages`).
- **Źródło Pages:** *GitHub Actions* (Settings → Pages → Build and deployment → Source).
- **`base`:** ustawione w `vite.config.ts` na `/giarddesign/` **tylko dla builda** (dev/preview pozostają
  na `/`), więc ścieżki do zasobów rozwiązują się poprawnie w podkatalogu.

Ręczne wyzwolenie: zakładka *Actions* → *Deploy to GitHub Pages* → *Run workflow* (`workflow_dispatch`).

> Przy zmianie nazwy repozytorium lub hostowaniu na domenie własnej — zaktualizuj `base`
> (dla domeny głównej: `base: '/'`).

### Dowolny hosting statyczny (S3, Cloudflare Pages, nginx…)

Wgraj zawartość `dist/`. Jako że aplikacja jest jednostronicowa bez routera po stronie klienta,
przekierowania SPA (fallback do `index.html`) nie są konieczne — wystarczy serwować pliki statycznie.

## Lista kontrolna przed wdrożeniem

- [ ] `npm run build` przechodzi bez błędów typów i buildu
- [ ] `npm run preview` wygląda poprawnie lokalnie (hero, galeria, lightbox, menu mobilne)
- [ ] `base` ustawione, jeśli hosting jest w podkatalogu
- [ ] dostęp do CDN Unsplash z docelowego środowiska (obrazy poglądowe)
