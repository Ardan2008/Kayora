<template>
  <section class="bg-background pb-20">
    <div class="mx-auto grid max-w-[1200px] grid-cols-12 gap-6 px-6 max-md:grid-cols-1">

      <!-- Left: Big Sale Card (5 cols) -->
      <div class="col-span-5 relative flex flex-col items-center justify-between overflow-hidden rounded-[24px] bg-[#3B4D40] p-8 pt-10 text-center min-h-[440px] max-md:col-span-1">
        <!-- Text & Button Container -->
        <div class="z-10 flex flex-col items-center">
          <span class="mb-3 text-[0.8125rem] font-medium text-white/80">Big Sale</span>
          <h2 class="mb-6 font-serif text-[2.25rem] leading-[1.3] text-white">
            Get inspired<br>furniture now or<br>forever
          </h2>
          <a
            href="#shop"
            class="inline-flex items-center rounded-full bg-white px-7 py-3 text-[0.75rem] font-bold tracking-widest text-[#1F1F1F] uppercase no-underline transition-transform duration-300 hover:scale-105"
          >
            SHOP NOW
          </a>
        </div>

        <!-- Decorative Furniture Overlay at Bottom -->
        <div class="relative mt-auto w-full h-[160px] flex items-end justify-between pointer-events-none">
          <img
            src="/images/sofa.png"
            alt="Yellow Sofa"
            class="w-[52%] -ml-6 -mb-4 h-[160px] object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.3)] transition-transform duration-300"
          />
          <img
            src="/images/kursi.png"
            alt="Chair and Table"
            class="w-[52%] -mr-6 -mb-4 h-[160px] object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.3)] transition-transform duration-300"
          />
        </div>
      </div>

      <!-- Right: Product Cards (7 cols) -->
      <div class="col-span-7 grid grid-cols-2 gap-5 max-md:col-span-1">
        <div
          v-for="item in saleProducts"
          :key="item.id"
          class="flex flex-col justify-between overflow-hidden rounded-[20px] bg-[#F8F8F8] p-7 pb-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md min-h-[400px]"
        >
          <!-- Product Info (Ukuran Title & Price Diperbesar) -->
          <div>
            <h3 class="font-serif text-[1.45rem] font-medium leading-[1.25] text-[#222222] mb-2 tracking-tight">
              {{ item.name }}
            </h3>
            <p class="font-serif text-[1.35rem] font-semibold text-[#C85250]">
              ${{ item.price.toFixed(2) }}
            </p>
          </div>

          <!-- Product Image -->
          <div class="flex flex-1 items-end justify-center pt-2">
            <img
              :src="item.img"
              :alt="item.name"
              class="h-[230px] w-full object-contain filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.08)] transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
const saleProducts = [
  {
    id: 1,
    name:  'Natural Touch Side Table',
    price: 234.00,
    img:   '/images/kursi.png',
  },
  {
    id: 2,
    name:  'Velvet Classic Armchair',
    price: 234.00,
    img:   '/images/sofa.png',
  },
]
</script>