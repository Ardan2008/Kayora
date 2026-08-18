<template>
  <!-- Hero -->
  <section id="home" class="grid grid-cols-2 overflow-hidden pt-16 max-md:grid-cols-1">
    <!-- Left: Content -->
    <div class="flex items-center bg-background py-16 pl-16 pr-12 max-md:p-12">
      <div class="max-w-110">
        <span class="mt-2 inline-block rounded-full py-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-primary-dark">Mega Sale Upto 75%</span>

        <h1 class="mb-5 font-display text-[clamp(2.75rem,4.5vw,4.25rem)] font-normal leading-[1.05] tracking-tight text-text">
          Find Your<br>
          Signature Seat
        </h1>

        <p class="mb-4 text-[0.875rem] leading-7 text-text-muted">
          Trending &amp; Best-Selling Furniture Home<br>
          Product Collection.
        </p>

        <a href="#shop" class="inline-flex mb-3 items-center gap-2 rounded-full bg-text px-7 py-3 text-[0.8125rem] font-semibold tracking-widest text-white no-underline transition-all duration-300 hover:bg-primary hover:-translate-y-0.5">
          SHOP NOW
        </a>

        <!-- Stats -->
        <div class="mt-10 flex items-center gap-4">
          <div class="flex flex-col gap-1 rounded-xl border border-text/60 px-5 py-3">
            <span class="font-display text-[1.875rem] leading-none text-text">567+</span>
            <span class="text-[0.6875rem] leading-5 text-text-muted">Furniture &amp;<br>Home Equipment</span>
          </div>
          <div class="flex flex-col gap-1 rounded-xl border border-text/60 px-5 py-3">
            <span class="font-display text-[1.875rem] leading-none text-text">7k+</span>
            <span class="text-[0.6875rem] leading-5 text-text-muted">Happy Clients<br>More of this</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Right: diagonal green/cream panel -->
    <div class="relative flex min-h-155 items-center justify-center overflow-hidden bg-background max-md:min-h-120">

        <!-- Dark green shape: rounded corners, big scoop bottom-left -->
        <div class="absolute inset-5 bg-primary-dark [border-radius:28px_28px_28px_260px] max-md:[border-radius:20px_20px_20px_150px]"></div>

        <!-- Leaf, positioned so pot hides behind chair, only leaves peek above -->
        <img src="/images/daun.png" alt="Decorative plant leaves"
        class="absolute left-1/3 top-[6%] z-10 w-[42%] max-w-50 translate-x-[-38%] drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)] max-md:w-[38%] max-md:top-[8%]" />

        <!-- Chair -->
        <img src="/images/kursi.png" alt="Signature Lounge Chair"
        class="relative z-20 w-[62%] max-w-90 drop-shadow-[0_18px_28px_rgba(0,0,0,0.28)] max-md:w-[56%]" />

        <!-- Product card -->
        <div class="absolute bottom-20 right-12 z-30 flex w-80 items-center gap-4 rounded-2xl bg-white p-4 shadow-[0_16px_36px_rgba(0,0,0,0.16)] max-md:right-1/2 max-md:bottom-8 max-md:translate-x-1/2">
            <!-- Gambar diperbesar dari h-12 w-12 menjadi h-16 w-16 -->
            <div class="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-background">
                <img src="/images/kursi.png" alt="Bright Lounge Armchair" class="h-full w-full object-cover" />
            </div>
            
            <!-- Informasi Teks -->
            <div class="min-w-0 flex-1">
                <div class="mb-1 flex gap-0.5">
                    <Star v-for="i in 5" :key="i" :size="11" fill="#CC9B78" color="#CC9B78" />
                </div>
                <p class="truncate text-[0.875rem] font-semibold leading-snug text-text">Bright Lounge Armchair</p>
                <p class="mt-0.5 text-[0.75rem] text-text-muted">Cozy accent chair</p>
            </div>
            
            <!-- Harga & Tombol -->
            <div class="flex shrink-0 flex-col items-end gap-2">
                <p class="text-[0.9375rem] font-bold text-text">$87.00</p>
                <!-- Tombol diperbesar dari h-7 w-7 menjadi h-8 w-8 -->
                <button class="flex h-8 w-8 items-center justify-center rounded-full border-0 bg-text text-white cursor-pointer outline-none transition-colors duration-200 hover:bg-primary" aria-label="Add to cart">
                    <Plus :size="16" />
                </button>
            </div>
        </div>
    </div>
  </section>
</template>

<script setup>
import { Star, Plus } from 'lucide-vue-next'
</script>

<style scoped>
    @keyframes spin-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    .animate-spin-slow {
        animation: spin-slow 14s linear infinite;
    }
</style>