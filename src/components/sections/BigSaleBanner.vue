<template>
  <section class="bg-background pb-20">
    <div class="mx-auto grid max-w-300 grid-cols-12 gap-6 px-6 max-md:grid-cols-1">

      <!-- Left: Big Sale Card -->
      <div class="col-span-5 relative flex flex-col items-center justify-between overflow-hidden rounded-3xl bg-[#3B4D40] p-8 pt-10 text-center min-h-110 max-md:col-span-1">

        <!-- Decorative ambient glow blobs (same green/white, just low opacity) -->
        <div class="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white/6 blur-3xl"></div>
        <div class="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/5 blur-3xl"></div>
        <div class="pointer-events-none absolute inset-0 bg-linear-to-b from-white/4 via-transparent to-black/10"></div>

        <!-- Text & Button Container -->
        <div class="z-10 flex flex-col items-center">
          <span class="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/8 px-3.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-white/80 backdrop-blur-sm">
            Big Sale
          </span>
          <h2 class="mb-7 font-serif text-[2.35rem] leading-tight text-white">
            Get inspired<br>furniture now or<br><span class="italic text-white/85">forever</span>
          </h2>
          <a
            href="#shop"
            class="group inline-flex items-center gap-2 rounded-full bg-white py-3 pl-7 pr-6 text-[0.75rem] font-bold tracking-widest text-[#1F1F1F] uppercase no-underline shadow-[0_8px_20px_rgba(0,0,0,0.25)] transition-all duration-300 hover:gap-3 hover:shadow-[0_10px_26px_rgba(0,0,0,0.32)] hover:brightness-[1.03]"
          >
            SHOP NOW
            <ArrowUpRight class="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <!-- Decorative Furniture Overlay at Bottom -->
        <div class="relative z-10 mt-auto w-full h-40 flex items-end justify-between pointer-events-none">
          <div class="pointer-events-none absolute bottom-2 left-1/2 h-8 w-[85%] -translate-x-1/2 rounded-full bg-black/20 blur-xl"></div>
          <img
            src="/images/sofa/sofa2.webp"
            alt="Yellow Sofa"
            loading="lazy"
            class="w-[52%] -ml-6 -mb-4 h-40 object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.3)] transition-transform duration-300"
          />
          <img
            src="/images/chair/chair.webp"
            alt="Chair and Table"
            loading="lazy"
            class="w-[52%] -mr-6 -mb-4 h-40 object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.3)] transition-transform duration-300"
          />
        </div>
      </div>

      <!-- Right: Product Cards (7 cols) -->
      <div class="col-span-7 grid grid-cols-2 gap-5 max-md:col-span-1">
        <div
          v-for="item in saleProducts"
          :key="item.id"
          class="group/card relative flex flex-col justify-between overflow-hidden rounded-lg border border-black/4 bg-[#F8F8F8] p-7 pb-4 transition-all duration-300 hover:-translate-y-1.5 hover:border-black/6 hover:shadow-[0_18px_36px_rgba(0,0,0,0.09)] min-h-100"
        >
          <!-- Product Info (Title & Price sizing enlarged) -->
          <div class="relative z-10">
            <h3 class="font-serif text-[1.45rem] font-medium leading-tight text-[#222222] mb-3 tracking-tight">
              {{ item.name }}
            </h3>
            <span class="inline-flex items-center rounded-full bg-[#C85250]/10 px-3 py-1 font-serif text-[1.05rem] font-semibold text-[#C85250]">
              ${{ item.price.toFixed(2) }}
            </span>
          </div>

          <!-- Product Image -->
          <div class="relative z-10 flex flex-1 items-end justify-center pt-2">
            <div class="pointer-events-none absolute bottom-2 h-6 w-[70%] rounded-full bg-black/10 blur-lg transition-opacity duration-500 group-hover/card:opacity-70"></div>
            <img
              :src="item.img"
              :alt="item.name"
              loading="lazy"
              class="h-57.5 w-full object-contain filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.08)] transition-transform duration-500 group-hover/card:-translate-y-1.5 group-hover/card:scale-105"
            />
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ArrowUpRight } from 'lucide-vue-next'

const saleProducts = [
  {
    id: 1,
    name:  'Natural Touch Side Table',
    price: 234.00,
    img:   '/images/chair/chair.webp',
  },
  {
    id: 2,
    name:  'Velvet Classic Armchair',
    price: 234.00,
    img:   '/images/sofa/sofa.webp',
  },
]
</script>