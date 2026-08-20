<template>
  <section class="bg-background py-12 pb-16">
    <div class="mx-auto grid max-w-[1200px] grid-cols-3 gap-5 px-6 max-md:grid-cols-1">
      <div
        v-for="(feat, i) in features"
        :key="i"
        class="group relative flex items-center gap-5 overflow-hidden rounded-[18px] border border-primary-dark/10 bg-primary p-8 py-8 px-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(0,0,0,0.08)]"
      >
        <!-- Top highlight — thin light line at the top edge, characteristic of Apple glass -->
        <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>

        <!-- Radial glow on hover, simulating light reflection on glass surface -->
        <div
          class="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style="background: radial-gradient(200px circle at 15% 15%, rgba(255,255,255,0.15), transparent 70%)"
        ></div>

        <!-- Icon circle — real glass: blur + translucent border -->
        <div class="relative flex h-[54px] w-[54px] flex-shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] backdrop-blur-md transition-transform duration-500 group-hover:scale-105">
          <component :is="feat.icon" :size="26" stroke-width="1.5" color="#fff" />
        </div>

        <div class="relative min-w-0">
          <h3 class="mb-1 whitespace-nowrap text-[0.9375rem] font-bold text-white">{{ feat.title }}</h3>
          <p class="text-[0.75rem] leading-5 text-white/72">{{ feat.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Package, Truck, RefreshCw } from 'lucide-vue-next'

const features = [
  {
    icon:  Package,
    title: 'Make Your Order',
    desc:  'All pieces made to order for you',
  },
  {
    icon:  Truck,
    title: 'Free Delivery',
    desc:  'Free delivery for order worldwide',
  },
  {
    icon:  RefreshCw,
    title: 'Free Exchange',
    desc:  'Free exchange on all products',
  },
]
</script>