<script setup>
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import BackToTop from '@/components/layout/BackToTop.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <Header />
    <main class="flex-1">
      <RouterView />
    </main>
    <Footer />
    <BackToTop />
  </div>
</template>
