<script setup>
import { useRoute } from 'vue-router'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import BackToTop from '@/components/layout/BackToTop.vue'

const route = useRoute()
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <Header v-if="!route.meta.hideLayout" />
    <main class="flex-1">
      <RouterView />
    </main>
    <template v-if="!route.meta.hideLayout">
      <Footer />
      <BackToTop />
    </template>
  </div>
</template>