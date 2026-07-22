<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-(--color-ink) pb-8 pt-14 text-white/80">
    <div class="wrap">
      <div class="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <a href="#top" class="text-xl font-extrabold tracking-tight text-white">
          giard<span class="font-normal">design</span>
        </a>
        <div class="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
          <p class="text-sm text-white/60">Daj znać, co możemy dla Ciebie zrobić!</p>
          <a href="#kontakt" class="btn-solid">Skontaktuj się z nami</a>
        </div>
      </div>

      <hr class="my-10 border-white/10" />

      <div class="flex flex-col gap-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <nav class="flex flex-wrap gap-x-8 gap-y-3">
          <a href="#kontakt" class="transition-colors hover:text-white">Kontakt</a>
          <a href="https://instagram.com" target="_blank" rel="noopener" class="transition-colors hover:text-white">Instagram</a>
          <a href="https://facebook.com" target="_blank" rel="noopener" class="transition-colors hover:text-white">Facebook</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener" class="transition-colors hover:text-white">LinkedIn</a>
        </nav>
        <div class="flex flex-wrap gap-x-8 gap-y-3">
          <a href="tel:000000000" class="transition-colors hover:text-white">000-000-000</a>
          <a href="mailto:giarddesign@kontakt.pl" class="transition-colors hover:text-white">giarddesign@kontakt.pl</a>
        </div>
      </div>

      <div class="mt-10 flex flex-col-reverse gap-4 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
        <p>Prawa zastrzeżone © {{ year }}</p>
        <p class="flex items-center gap-1.5">
          Projekt graficzny: <span class="font-semibold text-white/70">adRespect.pl</span> — wykonano w ramach procesu rekrutacyjnego
        </p>
      </div>
    </div>
  </footer>
</template>
