---
title: Architektura — giarddesign
created: 2026-07-22
updated: 2026-07-22
---

# Architektura

Dokument techniczny opisujący budowę aplikacji `giarddesign`: drzewo komponentów, przepływ danych,
integrację bibliotek imperatywnych z Vue oraz niuanse implementacyjne warte odnotowania.

## Przegląd

Aplikacja to statyczny landing page zbudowany na **Vue 3 (`<script setup>`) + TypeScript + Vite**,
stylowany **Tailwind CSS v4**. Nie ma routera, backendu, ani globalnego store'a — cała strona to jedno
`App.vue`, które komponuje niezależne sekcje. Stan jest lokalny dla poszczególnych komponentów.

```
main.ts
 └─ createApp(App).mount('#app')
     └─ App.vue
         ├─ AppHeader        (fixed; nawigacja, dropdown, search, menu mobilne)
         ├─ main
         │   ├─ HeroSlider   (#top)        — slider z autoplay
         │   ├─ OfferSection (#oferta)     — karty oferty
         │   ├─ AboutSection (#o-firmie)   — sekcja „O firmie"
         │   ├─ ProjectsGallery (#realizacje) — galeria masonry
         │   │   └─ Lightbox            — modal (Teleport do body)
         │   └─ ContactBanner (#kontakt)  — baner Instagram
         └─ AppFooter                     — stopka
```

Kotwice (`#top`, `#oferta`, `#o-firmie`, `#realizacje`, `#kontakt`) spinają nawigację z sekcjami przez
płynne przewijanie (`scroll-behavior: smooth` + `scroll-padding-top: 88px` na `<html>`, kompensujące
przyklejony nagłówek).

## Przepływ danych

Jednokierunkowy, statyczny. Treść mieszka w `src/data/` jako typowane stałe i jest importowana bezpośrednio
przez komponenty — nie ma warstwy pobierania danych ani asynchroniczności poza ładowaniem obrazów.

| Plik danych | Typ | Konsument |
| --- | --- | --- |
| `heroSlides.ts` | `HeroSlide[]` | `HeroSlider.vue` |
| `offers.ts` | `OfferCard[]` | `OfferSection.vue`, `AppHeader.vue` (dropdown) |
| `gallery.ts` | `GalleryImage[]` | `ProjectsGallery.vue`, `Lightbox.vue` |
| `unsplash.ts` | funkcja `unsplash()` | `gallery.ts`, `heroSlides.ts`, `AboutSection.vue` |

Karty oferty (`offers.ts`) są współdzielone przez sekcję oferty i dropdown w nagłówku — jedno źródło prawdy
dla obu miejsc.

## Komponenty — kluczowe zachowania

### AppHeader.vue

Stan lokalny (`ref`): `scrolled`, `isOfferOpen`, `isSearchOpen`, `isMobileOpen`, `isMobileOfferOpen`,
`searchQuery`.

- **Sticky/blur po scrollu** — nasłuch `scroll` (passive) ustawia `scrolled` po przekroczeniu 12 px;
  tło nagłówka przełącza się na półprzezroczyste + `backdrop-blur`.
- **Dropdown „Oferta"** — otwierany klikiem, wzajemnie wyklucza się z polem wyszukiwania. Zamykany przez:
  klik poza obszarem (`onDocumentClick` porównuje `event.target` z `offerRef`), klawisz `Escape`, lub klik
  w pozycję menu.
- **Pole wyszukiwania** — rozwijane (animacja szerokości/opacity), po otwarciu ustawia focus przez
  `nextTick`; `Escape`/utrata focusu czyści zapytanie. To wyłącznie UI (brak logiki wyszukiwania) — zgodnie
  z zakresem makiety.
- **Menu mobilne** — oddzielny panel z akordeonem „Oferta"; wszystkie linki wołają `closeMobileMenu`.
- **Sprzątanie** — wszystkie nasłuchy (`scroll`, `click`, `keydown`) są zdejmowane w `onBeforeUnmount`.

### HeroSlider.vue

- **Autoplay** — `setInterval` co 6,5 s wywołuje `next()`; timer jest restartowany po każdej ręcznej
  interakcji (strzałki/kropki), aby nie „przeskoczyć" zaraz po kliknięciu.
- **Pauza na hover** — `@mouseenter` zatrzymuje, `@mouseleave` wznawia autoplay.
- **Dwie niezależne animacje** — tekst (`hero-text`, `mode="out-in"`, ~0,4 s) i obraz (`hero-image`,
  crossfade + lekki zoom, ~0,9 s) mają osobne przejścia `<Transition>` kluczowane po `slide.id`.
- **Łamanie siatki** — kolumna tekstu używa `padding-left: max(1.5rem, calc((100vw - 1240px)/2 + 1.5rem))`,
  dzięki czemu tekst trzyma się środkowej siatki (max 1240 px), a obraz w drugiej kolumnie sięga krawędzi
  ekranu. `AboutSection.vue` stosuje ten sam trik odbity w poziomie.
- **Sprzątanie** — `clearInterval` w `onBeforeUnmount`.

### ProjectsGallery.vue + Lightbox.vue

Najbardziej złożona część — integracja imperatywnej biblioteki `masonry-layout` z reaktywnym Vue.

**Inicjalizacja masonry (istotny niuans):**

```
onMounted → nextTick → requestAnimationFrame ×2 → new Masonry(...)
```

Podwójny `requestAnimationFrame` jest celowy: responsywne klasy szerokości Tailwinda na `.grid-sizer`
i `.grid-item` (`w-full sm:w-1/2 lg:w-1/3`) muszą zostać w pełni namalowane, zanim Masonry zmierzy kolumny.
Pomiar zbyt wcześnie „zablokowałby" układ jednokolumnowy. Po starcie `imagesLoaded` przelicza układ na
zdarzeniach `progress` i `always`, a `resize` (debounce 150 ms) — przy zmianie rozmiaru okna.

**Rozwijanie galerii** — kontener ma `max-height: 860px` z gradientową maską na dole i przyciskiem „Rozwiń";
klik ustawia `expanded = true` (→ `max-height: 10000px`, animacja 0,7 s) i wywołuje `masonryInstance.layout()`
po `nextTick`.

**Lightbox** — renderowany przez `<Teleport to="body">`, sterowany propsami `open` / `index` z rodzica.
Nawigacja to zdarzenia (`close` / `prev` / `next`) obsługiwane w galerii (indeks modulo długości tablicy).
Obsługa klawiatury (`←` / `→` / `Escape`) jest w samym lightboxie; `watch` na `open` blokuje przewijanie
tła (`document.body.style.overflow`). Miniatury ładują wersję `src`, lightbox — wersję `full`.

### Pozostałe sekcje

- **OfferSection / AboutSection / ContactBanner** — statyczne, każda podpięta pod `useInViewFade`.
- **AppFooter** — rok liczony dynamicznie (`new Date().getFullYear()`), linki społecznościowe + kontakt.

## Composable: useInViewFade

Jeden `IntersectionObserver` na element. Po pierwszym wejściu w viewport (threshold 0.15, `rootMargin`
`0px 0px -60px 0px`) dodaje klasę `.in-view`, uruchamiając przejście zdefiniowane w `style.css`
(`.reveal` → `.reveal.in-view`: fade + slide-up), po czym przestaje obserwować element. Observer jest
rozłączany w `onBeforeUnmount`. Wzorzec jest współdzielony przez wszystkie animowane sekcje — brak
duplikacji logiki scroll-reveal.

## Stylowanie (Tailwind v4, CSS-first)

- **Tokeny motywu** w `@theme` (`style.css`) — kolory i fonty jako zmienne CSS, używane w szablonach
  składnią `bg-(--color-green-deep)` / `text-(--color-ink)`.
- **Klasy komponentowe** w `@layer components`: `.wrap` (kontener max 1240 px), `.accent` (Fraunces italic),
  `.eyebrow` (nagłówek nadrzędny), `.btn-solid` / `.btn-outline` / `.btn-cream` (przyciski).
- **Animacje** — proste przejścia CSS + komponent `<Transition>` Vue; brak zewnętrznej biblioteki animacji.

## Uwagi i drobny martwy kod

Warto wiedzieć przy dalszym rozwoju (nie wpływa na działanie):

- `INITIAL_VISIBLE_COUNT` w `gallery.ts` jest wyeksportowany, ale nieużywany — obecnie galerię ogranicza
  maska `max-height`, nie liczba kafelków. Do usunięcia lub do podpięcia, gdyby zmienić mechanizm „Rozwiń".
- `accentWord?` w interfejsie `HeroSlide` jest zdefiniowany, ale nigdy nie ustawiany ani nie renderowany.
- Pole wyszukiwania w nagłówku jest czysto wizualne (brak filtrowania) — zgodnie z zakresem makiety.

## Ograniczenia świadome

- Brak testów automatycznych — zakres zadania rekrutacyjnego obejmował wierność UI, nie pokrycie testami.
- Brak i18n — treść wyłącznie po polsku (zgodnie z makietą).
- Zależność od zewnętrznego CDN Unsplash dla obrazów (materiały poglądowe).
