<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import HeroSlider from './components/HeroSlider.vue'
import OfferSection from './components/OfferSection.vue'
import AboutSection from './components/AboutSection.vue'
import ProjectsGallery from './components/ProjectsGallery.vue'
import ContactBanner from './components/ContactBanner.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <div class="min-h-screen bg-(--color-cream)">
    <AppHeader />
    <main>
      <HeroSlider />
      <OfferSection />
      <AboutSection />
      <ProjectsGallery />
      <ContactBanner />
    </main>
    <AppFooter />
  </div>
</template>
