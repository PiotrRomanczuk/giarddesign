<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import Masonry from 'masonry-layout'
import imagesLoaded from 'imagesloaded'
import { galleryImages } from '../data/gallery'
import { useInViewFade } from '../composables/useInViewFade'
import Lightbox from './Lightbox.vue'

const sectionRef = ref<HTMLElement | null>(null)
useInViewFade(sectionRef)

const gridRef = ref<HTMLElement | null>(null)
let masonryInstance: Masonry | null = null

const expanded = ref(false)
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

function openLightbox(i: number) {
  lightboxIndex.value = i
  lightboxOpen.value = true
}
function closeLightbox() {
  lightboxOpen.value = false
}
function prevImage() {
  lightboxIndex.value = (lightboxIndex.value - 1 + galleryImages.length) % galleryImages.length
}
function nextImage() {
  lightboxIndex.value = (lightboxIndex.value + 1) % galleryImages.length
}

function expandGallery() {
  expanded.value = true
  nextTick(() => masonryInstance?.layout?.())
}

let resizeTimer: ReturnType<typeof setTimeout> | null = null
function onResize() {
  if (resizeTimer) clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => masonryInstance?.layout?.(), 150)
}

function raf(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()))
}

onMounted(async () => {
  await nextTick()
  // Wait a couple of frames so Tailwind's responsive width classes on
  // .grid-sizer/.grid-item are fully painted before Masonry measures them —
  // measuring too early locks in a single-column layout.
  await raf()
  await raf()
  if (!gridRef.value) return
  masonryInstance = new Masonry(gridRef.value, {
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true,
    transitionDuration: '0.4s',
  })
  imagesLoaded(gridRef.value).on('progress', () => masonryInstance?.layout?.())
  imagesLoaded(gridRef.value).on('always', () => masonryInstance?.layout?.())
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
  if (resizeTimer) clearTimeout(resizeTimer)
  masonryInstance?.destroy?.()
})
</script>

<template>
  <section id="realizacje" ref="sectionRef" class="reveal bg-(--color-tan) py-24 lg:py-32">
    <div class="wrap">
      <p class="eyebrow">Realizacje</p>
      <h2 class="mt-3 text-3xl font-semibold leading-tight text-(--color-ink) sm:text-4xl">
        Nasze <span class="accent">projekty</span>
      </h2>
    </div>

    <div class="wrap relative mt-12">
      <div
        class="relative overflow-hidden transition-[max-height] duration-700 ease-in-out"
        :style="{ maxHeight: expanded ? '10000px' : '860px' }"
      >
        <div ref="gridRef" class="relative -mx-3">
          <div class="grid-sizer w-full sm:w-1/2 lg:w-1/3"></div>
          <div
            v-for="(image, i) in galleryImages"
            :key="image.id"
            class="grid-item w-full box-border p-3 sm:w-1/2 lg:w-1/3"
          >
            <button
              type="button"
              class="group block w-full cursor-pointer overflow-hidden rounded-xl bg-black/5"
              :style="{ aspectRatio: String(1 / image.ratio) }"
              @click="openLightbox(i)"
            >
              <img
                :src="image.src"
                :alt="image.alt"
                loading="lazy"
                class="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
              />
            </button>
          </div>
        </div>

        <div
          v-if="!expanded"
          class="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-(--color-tan) to-transparent"
        ></div>
      </div>

      <div v-if="!expanded" class="mt-2 flex justify-center">
        <button type="button" class="btn-outline relative bg-(--color-tan) cursor-pointer" @click="expandGallery">
          Rozwiń
          <svg viewBox="0 0 16 16" class="h-3.5 w-3.5" fill="none">
            <path d="M8 2v11M3 9l5 5 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>

    <Lightbox
      :images="galleryImages"
      :open="lightboxOpen"
      :index="lightboxIndex"
      @close="closeLightbox"
      @prev="prevImage"
      @next="nextImage"
    />
  </section>
</template>
