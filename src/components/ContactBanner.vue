<script setup lang="ts">
import { ref } from 'vue'
import { useInViewFade } from '../composables/useInViewFade'

const sectionRef = ref<HTMLElement | null>(null)
useInViewFade(sectionRef)
</script>

<template>
  <section id="kontakt" ref="sectionRef" class="reveal bg-(--color-cream) py-16 lg:py-20">
    <div class="wrap">
      <div
        class="flex flex-col items-start justify-between gap-8 rounded-3xl bg-(--color-green-deep) px-8 py-12 sm:px-12 sm:py-14 lg:flex-row lg:items-center"
      >
        <div class="text-2xl font-semibold leading-snug text-white sm:text-3xl">
          Zostańmy w kontakcie!<br />
          Znajdziesz nas na <span class="accent font-semibold">Instagramie</span>.
        </div>

        <div class="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <p class="text-sm leading-snug text-white/70">
            Śledź nasze<br />
            najnowsze realizacje!
          </p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener"
            class="btn-cream"
          >
            Instagram
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
