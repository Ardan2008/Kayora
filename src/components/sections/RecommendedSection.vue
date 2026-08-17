<template>
  <section class="bg-background py-24">
    <div class="mx-auto max-w-300 px-6">

      <div class="mx-auto mb-14 max-w-155 text-center">
        <span class="mb-3 inline-block text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-primary">Curated For You</span>
        <h2 class="font-display text-[2.25rem] leading-[1.15] text-text">Most Recommend Product For You</h2>
        <p class="mt-3.5 text-[0.9375rem] leading-7 text-text-muted">
          Discover top-recommended furniture tailored to your style and needs. Elevate your home with
          pieces designed for comfort and elegance.
        </p>
      </div>

      <!-- Bento layout: hero category + product grid -->
      <div class="grid grid-cols-[0.85fr_2fr] gap-6 items-stretch max-md:grid-cols-1">

        <!-- Category tiles (left column, staggered bento) -->
        <div class="flex flex-col gap-6 h-full max-md:flex-row max-sm:flex-col">
          <div
            v-for="(cat, i) in categories"
            :key="cat.name"
            :class="[
              'relative cursor-pointer overflow-hidden rounded-[20px] bg-cover bg-center min-h-[180px] transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1',
              i === 0 ? 'flex-[1.3]' : 'flex-1'
            ]"
            :style="{ backgroundImage: `url(${cat.img})` }"
          >
            <div class="absolute inset-0 z-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-all duration-400 hover:from-black/70 hover:via-black/20"></div>
            <div class="absolute bottom-6 left-6 right-6 z-[1] flex flex-col items-start gap-2">
              <span class="rounded-full bg-white/92 px-2.5 py-0.5 font-display text-[0.75rem] font-bold tracking-[0.08em] text-primary">0{{ i + 1 }}</span>
              <span class="font-display text-[1.25rem] font-semibold leading-5 text-white">{{ cat.name }}</span>
              <a href="#shop" class="mt-1 inline-flex items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-wider text-white opacity-90 no-underline group/link">
                View all
                <span class="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Product cards (right columns) -->
        <div class="grid grid-cols-2 grid-rows-2 gap-6">
          <div
            v-for="p in recommended"
            :key="p.id"
            class="group flex cursor-pointer flex-col overflow-hidden rounded-[20px] border border-border/60 bg-white transition-all duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(0,0,0,0.06)]"
          >
            <div class="relative aspect-[5/4] overflow-hidden bg-background">
              <img :src="p.img" :alt="p.name" class="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110" />
            </div>
            <div class="flex flex-1 flex-col gap-1 px-[1.125rem] pt-4 pb-5">
              <span class="text-[0.625rem] font-bold uppercase tracking-[0.1em] text-primary">{{ p.category }}</span>
              <h4 class="text-[0.9375rem] font-semibold leading-5 text-text">{{ p.name }}</h4>
              <div class="mt-auto flex items-center justify-between pt-2.5">
                <span class="font-display text-[1.0625rem] font-bold text-text">${{ p.price.toFixed(2) }}</span>
                <button class="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full border-[1.5px] border-text bg-transparent text-text text-[1.15rem] leading-none cursor-pointer transition-all duration-300 hover:border-primary hover:bg-primary/15 hover:text-primary active:bg-primary/25" aria-label="Add to cart">+</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>


<script setup>
const categories = [
  { 
    name: 'Bedroom Furniture', 
    img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=500&q=80' 
  },
  { 
    name: 'Living Room Furniture', 
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80' 
  },
  { 
    name: 'Dining Room Furniture', 
    img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&q=80' 
  },
]

const recommended = [
  {
    id: 1,
    name: 'Bright Lounge Armchair',
    category: 'Chair',
    price: 87.00,
    img: '/images/kursi.png'
  },
  {
    id: 2,
    name: 'Cloud Comfort Sofa',
    category: 'Sofa',
    price: 278.00,
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80'
  },
  {
    id: 3,
    name: 'Walnut Coffee Table',
    category: 'Table',
    price: 145.00,
    img: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&q=80'
  },
  {
    id: 4,
    name: 'Sunshine Accent Chair',
    category: 'Chair',
    price: 189.00,
    img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&q=80'
  }
]
</script>