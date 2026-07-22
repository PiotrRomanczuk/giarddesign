<script setup lang="ts">
import { ref } from 'vue'
import { unsplash } from '../data/unsplash'
import { useInViewFade } from '../composables/useInViewFade'

const sectionRef = ref<HTMLElement | null>(null)
useInViewFade(sectionRef)

const image = unsplash('1610238115511-81be15284155', 1200, 1000)
</script>

<template>
  <section id="o-firmie" ref="sectionRef" class="reveal grid grid-cols-1 overflow-hidden lg:grid-cols-2">
    <div class="relative h-[340px] sm:h-[440px] lg:h-auto">
      <img
        :src="image"
        alt="Ogród japoński z drewnianym pawilonem i ścieżką z kamieni"
        class="absolute inset-0 h-full w-full object-cover"
      />
    </div>

    <div class="about-text-pad flex items-center bg-(--color-green-deep) py-14 lg:py-24">
      <div class="max-w-xl">
        <p class="text-sm font-semibold uppercase tracking-[0.15em] text-white/60">O firmie</p>
        <h2 class="mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl">
          Tworzymy <span class="accent">z pasją</span>
        </h2>
        <p class="mt-5 text-[15px] leading-relaxed text-white/75">
          Każdy projekt to nowe wyzwanie. Dlatego nasz zespół tworzą wykwalifikowani projektanci oraz architekci,
          których zadaniem jest rozpoznanie i realizacja potrzeb każdego Klienta. Nasza specjalizacja to przestrzenie
          nowoczesne, które charakteryzuje minimalizm, geometria i elegancka prostota. Tworzymy ogrody
          małoobsługowe, dostosowane do współczesnego trybu życia.
        </p>
        <a
          href="#kontakt"
          class="btn-outline mt-8 border-white/40 text-white hover:border-white hover:bg-white/10"
        >
          Poznaj nas bliżej
          <svg viewBox="0 0 16 10" class="h-2.5 w-4" fill="none">
            <path d="M1 5h13.5M9.5 1 14 5l-4.5 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-text-pad {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
@media (min-width: 1024px) {
  .about-text-pad {
    padding-left: 3rem;
    padding-right: max(2.5rem, calc((100vw - 1240px) / 2 + 2.5rem));
  }
}
</style>
