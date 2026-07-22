<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { offerCards } from '../data/offers'

const scrolled = ref(false)
const isOfferOpen = ref(false)
const isSearchOpen = ref(false)
const isMobileOpen = ref(false)
const isMobileOfferOpen = ref(false)
const searchQuery = ref('')

const offerRef = ref<HTMLElement | null>(null)
const searchRef = ref<HTMLElement | null>(null)
const searchInput = ref<HTMLInputElement | null>(null)

function onScroll() {
  scrolled.value = window.scrollY > 12
}

function closeAll() {
  isOfferOpen.value = false
  isSearchOpen.value = false
}

async function toggleSearch() {
  isSearchOpen.value = !isSearchOpen.value
  isOfferOpen.value = false
  if (isSearchOpen.value) {
    await nextTick()
    searchInput.value?.focus()
  } else {
    searchQuery.value = ''
  }
}

function toggleOffer() {
  isOfferOpen.value = !isOfferOpen.value
  isSearchOpen.value = false
}

function onDocumentClick(event: MouseEvent) {
  const target = event.target as Node
  if (offerRef.value && !offerRef.value.contains(target)) isOfferOpen.value = false
  if (searchRef.value && !searchRef.value.contains(target)) {
    isSearchOpen.value = false
    searchQuery.value = ''
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeAll()
    isMobileOpen.value = false
  }
}

function closeMobileMenu() {
  isMobileOpen.value = false
  isMobileOfferOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('click', onDocumentClick)
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('click', onDocumentClick)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-300"
    :class="scrolled || isMobileOpen ? 'bg-(--color-cream)/90 shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur-md' : 'bg-transparent'"
  >
    <div class="wrap flex h-20 items-center justify-between lg:h-24">
      <a href="#top" class="shrink-0 text-xl font-extrabold tracking-tight text-(--color-ink)">
        giard<span class="font-normal">design</span>
      </a>

      <nav class="hidden items-center gap-8 text-[15px] font-medium text-(--color-ink) lg:flex">
        <div ref="offerRef" class="relative">
          <button
            type="button"
            class="flex cursor-pointer items-center gap-1.5 py-2 transition-colors hover:text-(--color-green-deep)"
            :aria-expanded="isOfferOpen"
            aria-haspopup="true"
            @click="toggleOffer"
          >
            Oferta
            <svg
              viewBox="0 0 12 8"
              class="h-2.5 w-2.5 transition-transform duration-300"
              :class="isOfferOpen ? '-rotate-180' : ''"
              fill="none"
            >
              <path d="M1 1.5 6 6.5 11 1.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>

          <Transition name="pop">
            <div
              v-if="isOfferOpen"
              class="absolute left-1/2 top-full z-10 mt-2 w-64 -translate-x-1/2 rounded-2xl border border-black/5 bg-white p-2 shadow-xl shadow-black/10"
            >
              <a
                v-for="card in offerCards"
                :key="card.id"
                :href="`#${card.targetId}`"
                class="flex flex-col rounded-xl px-4 py-3 transition-colors hover:bg-(--color-cream)"
                @click="isOfferOpen = false"
              >
                <span class="font-semibold text-(--color-ink)">{{ card.title }}</span>
                <span class="text-sm text-(--color-muted)">{{ card.description }}</span>
              </a>
            </div>
          </Transition>
        </div>

        <a href="#o-firmie" class="py-2 transition-colors hover:text-(--color-green-deep)">O firmie</a>
        <a href="#realizacje" class="py-2 transition-colors hover:text-(--color-green-deep)">Realizacje</a>
        <a href="#kontakt" class="py-2 transition-colors hover:text-(--color-green-deep)">Kontakt</a>
      </nav>

      <div class="flex items-center gap-2">
        <div ref="searchRef" class="hidden items-center lg:flex">
          <input
            ref="searchInput"
            v-model="searchQuery"
            type="text"
            placeholder="Czego szukasz?"
            class="overflow-hidden rounded-full border bg-white text-sm text-(--color-ink) outline-none transition-all duration-300 ease-out"
            :class="isSearchOpen ? 'mr-2 w-56 border-black/15 px-4 py-2 opacity-100' : 'w-0 border-transparent px-0 py-2 opacity-0'"
            @keydown.escape="toggleSearch"
          />
          <button
            type="button"
            aria-label="Szukaj"
            class="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full transition-colors hover:bg-black/5"
            @click="toggleSearch"
          >
            <svg viewBox="0 0 20 20" class="h-5 w-5" fill="none">
              <circle cx="9" cy="9" r="6.5" stroke="currentColor" stroke-width="1.6" />
              <path d="m18 18-4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
            </svg>
          </button>
        </div>

        <button
          type="button"
          aria-label="Menu"
          class="grid h-10 w-10 cursor-pointer place-items-center rounded-full transition-colors hover:bg-black/5 lg:hidden"
          @click="isMobileOpen = !isMobileOpen"
        >
          <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none">
            <path
              v-if="!isMobileOpen"
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
            />
            <path v-else d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
          </svg>
        </button>
      </div>
    </div>

    <Transition name="mobile-panel">
      <div v-if="isMobileOpen" class="border-t border-black/5 bg-(--color-cream) px-6 pb-6 pt-2 lg:hidden">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Czego szukasz?"
          class="mb-4 w-full rounded-full border border-black/15 bg-white px-4 py-2.5 text-sm outline-none"
        />
        <nav class="flex flex-col text-base font-medium text-(--color-ink)">
          <button
            type="button"
            class="flex cursor-pointer items-center justify-between border-b border-black/5 py-3.5 text-left"
            @click="isMobileOfferOpen = !isMobileOfferOpen"
          >
            Oferta
            <svg
              viewBox="0 0 12 8"
              class="h-2.5 w-2.5 transition-transform duration-300"
              :class="isMobileOfferOpen ? '-rotate-180' : ''"
              fill="none"
            >
              <path d="M1 1.5 6 6.5 11 1.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <Transition name="accordion">
            <div v-if="isMobileOfferOpen" class="overflow-hidden border-b border-black/5">
              <a
                v-for="card in offerCards"
                :key="card.id"
                :href="`#${card.targetId}`"
                class="block py-2.5 pl-4 text-(--color-muted)"
                @click="closeMobileMenu"
              >
                {{ card.title }}
              </a>
            </div>
          </Transition>
          <a href="#o-firmie" class="border-b border-black/5 py-3.5" @click="closeMobileMenu">O firmie</a>
          <a href="#realizacje" class="border-b border-black/5 py-3.5" @click="closeMobileMenu">Realizacje</a>
          <a href="#kontakt" class="py-3.5" @click="closeMobileMenu">Kontakt</a>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.pop-enter-active,
.pop-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translate(-50%, -6px);
}

.mobile-panel-enter-active,
.mobile-panel-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.mobile-panel-enter-from,
.mobile-panel-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.accordion-enter-active,
.accordion-leave-active {
  transition: grid-template-rows 0.25s ease;
}
</style>
