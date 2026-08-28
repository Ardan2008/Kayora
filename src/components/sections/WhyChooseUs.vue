<template>
  <section id="categories" class="bg-background py-12 sm:py-24 relative overflow-hidden w-full">
    <div class="mx-auto max-w-300 px-4 sm:px-6 w-full flex flex-col lg:grid lg:grid-cols-12 gap-8 sm:gap-12 items-center">

      <!-- Kiri: Bagian Akordeon -->
      <div class="w-full lg:col-span-7">
        <!-- Label Eyebrow -->
        <div class="mb-3 sm:mb-4 flex items-center gap-2.5">
          <span class="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-1.5 text-[0.6875rem] sm:text-[0.75rem] font-extrabold uppercase tracking-[0.2em] text-primary">
            Why Choose Us
          </span>
        </div>

        <!-- Heading Editorial Modern -->
        <h2 class="font-display text-[1.875rem] sm:text-[2.75rem] leading-[1.15] tracking-tight text-text">
          Crafting Excellence <br class="hidden sm:inline" />
          <span class="font-normal italic text-primary">In Every Detail.</span>
        </h2>

        <p class="mt-3 sm:mt-4 mb-6 sm:mb-10 text-[0.875rem] sm:text-[0.9375rem] leading-[1.7] text-text-muted w-full max-w-lg">
          The core hallmarks that define our furniture identity and set us apart as industry leaders.
        </p>

        <!-- Akordeon Modern Segar -->
        <div class="space-y-3 sm:space-y-4 w-full">
          <div
            v-for="(item, i) in items"
            :key="i"
            :class="[
              'group rounded-xl sm:rounded-2xl border transition-all duration-300 overflow-hidden w-full',
              openIndex === i 
                ? 'border-primary/30 bg-white/60 backdrop-blur-md shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)]' 
                : 'border-border/60 bg-transparent hover:border-primary/20'
            ]"
          >
            <!-- Header Akordeon -->
            <button
              type="button"
              class="flex w-full cursor-pointer items-center justify-between gap-3 p-4 sm:p-6 text-left border-none bg-transparent"
              @click="openIndex = openIndex === i ? -1 : i"
            >
              <div class="flex items-center gap-3 sm:gap-4 pr-2">
                <!-- Nomor Indeks -->
                <span 
                  :class="[
                    'font-mono text-[0.75rem] sm:text-[0.8125rem] font-bold transition-colors duration-300 shrink-0',
                    openIndex === i ? 'text-primary' : 'text-text-muted/60 group-hover:text-primary/70'
                  ]"
                >
                  0{{ i + 1 }}
                </span>
                
                <!-- Judul -->
                <span 
                  :class="[
                    'text-[0.9375rem] sm:text-[1rem] font-semibold tracking-wide transition-colors duration-300 leading-snug',
                    openIndex === i ? 'text-text' : 'text-text/80 group-hover:text-text'
                  ]"
                >
                  {{ item.title }}
                </span>
              </div>

              <!-- Ikon Toggle Beranimasi -->
              <span 
                :class="[
                  'flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300',
                  openIndex === i 
                    ? 'bg-primary text-white shadow-sm rotate-180' 
                    : 'bg-primary/5 text-primary group-hover:bg-primary/10'
                ]"
              >
                <Minus v-if="openIndex === i" class="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.5]" />
                <Plus v-else class="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.5]" />
              </span>
            </button>

            <!-- Konten Akordeon -->
            <Transition
              name="accordion"
              @before-enter="beforeEnter"
              @enter="enter"
              @leave="leave"
            >
              <div
                v-show="openIndex === i"
                class="overflow-hidden transition-all duration-300 ease-out"
              >
                <div class="px-4 pb-4 pt-0 sm:px-6 sm:pb-6 text-[0.8125rem] sm:text-[0.875rem] leading-relaxed text-text-muted pl-10 sm:pl-13">
                  {{ item.body }}
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>

      <!-- Kanan: Kartu Video Reel -->
      <div class="w-full lg:col-span-5">
        <div class="relative mx-auto overflow-hidden rounded-lg sm:rounded-[28px] bg-slate-900 shadow-2xl w-full max-w-90 aspect-9/16">

          <!-- Reel Tertanam (ditampilkan saat diputar) -->
          <iframe
            v-if="isPlaying"
            class="absolute inset-0 h-full w-full"
            :src="`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`"
            title="Behind The Craft — Kayora"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>

          <!-- State Thumbnail / Sampul -->
          <div v-else class="group absolute inset-0 cursor-pointer" @click="isPlaying = true">
            <img
              :src="`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`"
              alt="Behind The Craft reel thumbnail"
              class="h-full w-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-80"
            />

            <!-- Overlay Gradien -->
            <div class="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>

            <!-- Tag Melayang di Atas -->
            <div class="absolute top-4 left-4 sm:top-6 sm:left-6">
              <span class="rounded-full bg-white/20 border border-white/30 px-3 py-1 sm:px-3.5 sm:py-1.5 text-[0.625rem] sm:text-[0.6875rem] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                Watch Reel
              </span>
            </div>

            <!-- Tombol Putar di Tengah -->
            <div class="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                class="relative flex h-14 w-14 sm:h-20 sm:w-20 items-center justify-center rounded-full border border-white/40 bg-white/20 text-white backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:bg-white group-hover:text-black shadow-2xl cursor-pointer"
                aria-label="Play Reel"
              >
                <Play class="h-5 w-5 sm:h-6 sm:w-6 fill-current translate-x-0.5" />
              </button>
            </div>

            <!-- Overlay Teks di Bawah -->
            <div class="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white">
              <p class="text-[0.6875rem] sm:text-[0.75rem] font-semibold tracking-widest uppercase text-white/70">Behind The Craft</p>
              <h3 class="text-[1rem] sm:text-[1.125rem] font-medium leading-snug mt-0.5 sm:mt-1">
                Inside Our Sustainable Design Workshop
              </h3>
            </div>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { Plus, Minus, Play } from 'lucide-vue-next'

const openIndex = ref(0)

// Status reel video
const videoId = 'UELVSZC06BE'
const isPlaying = ref(false)

const items = [
  {
    title: 'Sustainability First',
    body: 'We source only eco-certified materials and use responsible manufacturing processes to reduce our environmental footprint without compromising on beauty.',
  },
  {
    title: 'Unmatched Quality',
    body: 'Every Kayora piece is crafted by skilled artisans who pour decades of expertise into each joint, finish, and detail — built to last a lifetime.',
  },
  {
    title: 'Versatile Catalog',
    body: 'From compact studio essentials to statement centerpieces, our catalog spans hundreds of styles tailored across every budget range.',
  },
  {
    title: 'Legacy Of Excellence',
    body: 'With over a decade of serving discerning homeowners, Kayora\'s reputation is built on trust, precision, and genuine care.',
  },
]

// Hook Transisi Tinggi yang Halus
const beforeEnter = (el) => {
  el.style.height = '0'
  el.style.opacity = '0'
}

const enter = (el) => {
  el.style.height = el.scrollHeight + 'px'
  el.style.opacity = '1'
}

const leave = (el) => {
  el.style.height = '0'
  el.style.opacity = '0'
}
</script>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: height 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
}
</style>