<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from 'vue'
import type { GalleryImage } from '../data/gallery'

const props = defineProps<{
  images: GalleryImage[]
  open: boolean
  index: number
}>()

const emit = defineEmits<{
  close: []
  prev: []
  next: []
}>()

function onKeydown(event: KeyboardEvent) {
  if (!props.open) return
  if (event.key === 'Escape') emit('close')
  if (event.key === 'ArrowLeft') emit('prev')
  if (event.key === 'ArrowRight') emit('next')
}

watch(
  () => props.open,
  (isOpen) => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  },
)

onMounted(() => document.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox-fade">
      <div
        v-if="open && images[index]"
        class="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
        @click.self="emit('close')"
      >
        <button
          type="button"
          aria-label="Zamknij galerię"
          class="absolute right-4 top-4 grid h-11 w-11 cursor-pointer place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:right-8 sm:top-8"
          @click="emit('close')"
        >
          <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none">
            <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
          </svg>
        </button>

        <button
          type="button"
          aria-label="Poprzednie zdjęcie"
          class="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:left-6"
          @click="emit('prev')"
        >
          <svg viewBox="0 0 16 16" class="h-5 w-5" fill="none">
            <path d="M10 2 4 8l6 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        <Transition name="lightbox-slide">
          <figure :key="images[index].id" class="flex max-w-[92vw] flex-col items-center">
            <img
              :src="images[index].full"
              :alt="images[index].alt"
              class="max-h-[75vh] max-w-full rounded-xl object-contain shadow-2xl"
            />
            <figcaption class="mt-4 text-center text-sm text-white/70">
              {{ images[index].alt }} — {{ index + 1 }} / {{ images.length }}
            </figcaption>
          </figure>
        </Transition>

        <button
          type="button"
          aria-label="Następne zdjęcie"
          class="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:right-6"
          @click="emit('next')"
        >
          <svg viewBox="0 0 16 16" class="h-5 w-5" fill="none">
            <path d="M6 2l6 6-6 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 0.25s ease;
}
.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}

.lightbox-slide-enter-active,
.lightbox-slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.lightbox-slide-enter-from,
.lightbox-slide-leave-to {
  opacity: 0;
  transform: scale(0.97);
}
</style>
