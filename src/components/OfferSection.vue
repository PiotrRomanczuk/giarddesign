<script setup lang="ts">
import { ref } from 'vue'
import { offerCards } from '../data/offers'
import { useInViewFade } from '../composables/useInViewFade'

const sectionRef = ref<HTMLElement | null>(null)
useInViewFade(sectionRef)
</script>

<template>
  <section id="oferta" ref="sectionRef" class="reveal bg-(--color-cream) py-24 lg:py-32">
    <div class="wrap">
      <p class="eyebrow">Oferta</p>
      <h2 class="mt-3 max-w-xl text-3xl font-semibold leading-tight text-(--color-ink) sm:text-4xl">
        Działamy <span class="accent">kompleksowo</span>
      </h2>
      <p class="mt-5 max-w-2xl text-[15px] leading-relaxed text-(--color-ink)/70">
        Oferujemy kompletną obsługę inwestycji terenów zielonych. Projektujemy nowoczesne ogrody przydomowe oraz
        rezydencjonalne. Stworzymy dla Ciebie projekt, zwizualizujemy go i wcielimy w życie, a na każdym etapie
        posłużymy radą i wieloletnim doświadczeniem.
      </p>

      <div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <a
          v-for="(card, i) in offerCards"
          :key="card.id"
          :href="`#${card.targetId}`"
          class="group flex flex-col rounded-2xl border border-black/5 bg-white p-8 shadow-sm shadow-black/[0.03] transition-all duration-300 hover:-translate-y-2 hover:border-(--color-green-deep)/25 hover:shadow-xl hover:shadow-black/[0.08]"
          :style="{ transitionDelay: `${i * 60}ms` }"
        >
          <span
            class="grid h-11 w-11 place-items-center rounded-full bg-(--color-cream) text-(--color-green-deep) transition-colors duration-300 group-hover:bg-(--color-green-deep) group-hover:text-white"
          >
            <svg v-if="card.icon === 'projekty'" viewBox="0 0 24 24" class="h-5 w-5" fill="none">
              <path
                d="M15.5 3.5 20 8l-9.5 9.5-5.5 1 1-5.5L15.5 3.5Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path d="m13.5 5.5 4.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
            <svg v-else-if="card.icon === 'wizualizacje'" viewBox="0 0 24 24" class="h-5 w-5" fill="none">
              <path
                d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
              <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5" />
            </svg>
            <svg v-else viewBox="0 0 24 24" class="h-5 w-5" fill="none">
              <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.5 5.5l2.8 2.8M15.7 15.7l2.8 2.8M18.5 5.5l-2.8 2.8M8.3 15.7l-2.8 2.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </span>

          <h3 class="mt-6 text-xl font-semibold text-(--color-ink)">{{ card.title }}</h3>
          <p class="mt-2.5 text-sm leading-relaxed text-(--color-ink)/65">{{ card.description }}</p>

          <span class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-(--color-green-deep)">
            {{ card.linkLabel }}
            <svg
              viewBox="0 0 16 10"
              class="h-2.5 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
            >
              <path d="M1 5h13.5M9.5 1 14 5l-4.5 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </a>
      </div>
    </div>
  </section>
</template>
