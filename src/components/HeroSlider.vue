<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { heroSlides } from '../data/heroSlides'

const activeIndex = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

function startAutoplay() {
  stopAutoplay()
  timer = setInterval(next, 6500)
}
function stopAutoplay() {
  if (timer) clearInterval(timer)
}

function next() {
  activeIndex.value = (activeIndex.value + 1) % heroSlides.length
}
function prev() {
  activeIndex.value = (activeIndex.value - 1 + heroSlides.length) % heroSlides.length
}
function goTo(i: number) {
  activeIndex.value = i
  startAutoplay()
}
function handleNext() {
  next()
  startAutoplay()
}
function handlePrev() {
  prev()
  startAutoplay()
}

onMounted(startAutoplay)
onBeforeUnmount(stopAutoplay)
</script>

<template>
  <section
    id="top"
    class="relative grid grid-cols-1 overflow-hidden pt-20 lg:grid-cols-2 lg:pt-24"
    @mouseenter="stopAutoplay"
    @mouseleave="startAutoplay"
  >
    <div class="hero-text-pad relative flex items-center bg-(--color-tan) py-14 lg:py-24">
      <div class="max-w-xl">
        <Transition name="hero-text" mode="out-in">
          <div :key="heroSlides[activeIndex].id">
            <h1 class="text-[2.5rem] font-semibold leading-[1.08] tracking-tight text-(--color-ink) sm:text-5xl lg:text-[3.4rem]">
              {{ heroSlides[activeIndex].heading }}
            </h1>
            <p class="mt-6 max-w-md text-[15px] leading-relaxed text-(--color-ink)/75">
              {{ heroSlides[activeIndex].description }}
            </p>
          </div>
        </Transition>

        <div class="mt-8 flex flex-wrap items-center gap-4">
          <a href="#kontakt" class="btn-solid">Skontaktuj się z nami</a>
          <a href="#realizacje" class="btn-outline">
            Zobacz nasze realizacje
            <svg viewBox="0 0 16 16" class="h-3.5 w-3.5" fill="none">
              <path d="M8 2v11M3 9l5 5 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <div class="relative h-[320px] sm:h-[420px] lg:h-auto">
      <Transition name="hero-image">
        <img
          :key="heroSlides[activeIndex].id"
          :src="heroSlides[activeIndex].image"
          :alt="heroSlides[activeIndex].imageAlt"
          class="absolute inset-0 h-full w-full object-cover"
        />
      </Transition>

      <div class="absolute bottom-6 right-6 flex gap-3 lg:bottom-10 lg:right-10">
        <button
          type="button"
          aria-label="Poprzedni slajd"
          class="grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-white/90 text-(--color-ink) shadow-md transition-transform hover:scale-105 active:scale-95"
          @click="handlePrev"
        >
          <svg viewBox="0 0 16 16" class="h-4 w-4" fill="none">
            <path d="M10 2 4 8l6 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Następny slajd"
          class="grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-white/90 text-(--color-ink) shadow-md transition-transform hover:scale-105 active:scale-95"
          @click="handleNext"
        >
          <svg viewBox="0 0 16 16" class="h-4 w-4" fill="none">
            <path d="M6 2l6 6-6 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>

      <div class="absolute bottom-6 left-6 flex gap-2 lg:hidden">
        <button
          v-for="(slide, i) in heroSlides"
          :key="slide.id"
          type="button"
          :aria-label="`Przejdź do slajdu ${i + 1}`"
          class="h-1.5 rounded-full bg-white/70 transition-all"
          :class="i === activeIndex ? 'w-6 bg-white' : 'w-1.5'"
          @click="goTo(i)"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-text-pad {
  padding-left: max(1.5rem, calc((100vw - 1240px) / 2 + 1.5rem));
  padding-right: 1.5rem;
}
@media (min-width: 1024px) {
  .hero-text-pad {
    padding-left: max(2.5rem, calc((100vw - 1240px) / 2 + 2.5rem));
    padding-right: 3rem;
  }
}

.hero-text-enter-active,
.hero-text-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.hero-text-enter-from {
  opacity: 0;
  transform: translateY(14px);
}
.hero-text-leave-to {
  opacity: 0;
  transform: translateY(-14px);
}

.hero-image-enter-active,
.hero-image-leave-active {
  transition: opacity 0.9s ease, transform 0.9s ease;
}
.hero-image-enter-from {
  opacity: 0;
  transform: scale(1.06);
}
.hero-image-leave-to {
  opacity: 0;
  transform: scale(1);
}
</style>
