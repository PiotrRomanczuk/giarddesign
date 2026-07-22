# giarddesign

Rekonstrukcja projektu graficznego (Figma) landing page dla firmy ogrodniczej „giarddesign”, wykonana jako zadanie rekrutacyjne dla adRespect.

Stack: **Vue 3 + TypeScript + Vite + Tailwind CSS v4**, galeria realizacji oparta o **masonry-layout** + **imagesloaded**.

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

## Build produkcyjny

```bash
npm run build
npm run preview
```

## Zaimplementowane zachowania (z notatek projektowych)

- **Hero** — lewa kolumna trzyma się siatki strony, prawa kolumna (zdjęcie) wychodzi poza siatkę do krawędzi ekranu; cała sekcja jest sliderem (crossfade, autoplay, strzałki).
- **Nawigacja** — „Oferta” rozwija dropdown po kliknięciu; ikona lupy rozwija pole wyszukiwania; na mobile: menu hamburgerowe z akordeonem.
- **Oferta** — karty w pełni klikalne, z efektem hover (uniesienie + cień + zmiana koloru ikony).
- **O firmie** — odwrócony układ hero: zdjęcie wychodzi poza siatkę po lewej, treść trzyma się siatki po prawej.
- **Realizacje** — galeria masonry (masonry-layout), responsywna liczba kolumn (1/2/3), przycisk „Rozwiń” doładowujący kolejne realizacje, klik w zdjęcie otwiera lightbox z nawigacją prev/next i klawiszami strzałek/Escape.
- Animacje scroll-reveal (fade + slide-up) na wejściu sekcji w viewport.

## Prawa autorskie

Kod jest wynikiem własnej pracy w ramach procesu rekrutacyjnego. Projekt graficzny należy w całości do adRespect.pl.
