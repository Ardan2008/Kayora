<template>
  <section id="categories" class="bg-background py-24 relative overflow-hidden">
    <div class="mx-auto grid max-w-[1200px] grid-cols-12 gap-12 px-6 items-center max-lg:gap-10">

      <!-- Left: Accordion (7 Columns) -->
      <div class="col-span-7 max-lg:col-span-12">
        <!-- Modern Editorial Heading -->
        <h2 class="font-display text-[2.25rem] sm:text-[2.75rem] leading-[1.12] tracking-tight text-text">
          Crafting Excellence <br />
          <span class="font-normal italic text-primary">In Every Detail.</span>
        </h2>

        <p class="mt-4 mb-10 text-[0.9375rem] leading-[1.75] text-text-muted max-w-[500px]">
          The core hallmarks that define our furniture identity and set us apart as industry leaders.
        </p>

        <!-- Fresh Modern Accordion -->
        <div class="space-y-4">
          <div
            v-for="(item, i) in items"
            :key="i"
            :class="[
              'group rounded-2xl border transition-all duration-300 overflow-hidden',
              openIndex === i 
                ? 'border-primary/30 bg-white/60 backdrop-blur-md shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)]' 
                : 'border-border/60 bg-transparent hover:border-primary/20'
            ]"
          >
            <!-- Accordion Header -->
            <button
              type="button"
              class="flex w-full cursor-pointer items-center justify-between gap-4 p-5 sm:p-6 text-left border-none bg-transparent"
              @click="openIndex = openIndex === i ? -1 : i"
            >
              <div class="flex items-center gap-4">
                <!-- Index Number -->
                <span 
                  :class="[
                    'font-mono text-[0.8125rem] font-bold transition-colors duration-300',
                    openIndex === i ? 'text-primary' : 'text-text-muted/60 group-hover:text-primary/70'
                  ]"
                >
                  0{{ i + 1 }}
                </span>
                
                <!-- Title -->
                <span 
                  :class="[
                    'text-[1rem] font-semibold tracking-wide transition-colors duration-300',
                    openIndex === i ? 'text-text' : 'text-text/80 group-hover:text-text'
                  ]"
                >
                  {{ item.title }}
                </span>
              </div>

              <!-- Animated Toggle Icon (Lucide Plus/Minus) -->
              <span 
                :class="[
                  'flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300',
                  openIndex === i 
                    ? 'bg-primary text-white shadow-sm rotate-180' 
                    : 'bg-primary/5 text-primary group-hover:bg-primary/10'
                ]"
              >
                <Minus v-if="openIndex === i" class="h-4 w-4 stroke-[2.5]" />
                <Plus v-else class="h-4 w-4 stroke-[2.5]" />
              </span>
            </button>

            <!-- Accordion Content -->
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
                <div class="px-6 pb-6 pt-0 text-[0.875rem] leading-7 text-text-muted pl-[3.25rem]">
                  {{ item.body }}
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>

      <!-- Right: Video Card (5 Columns) -->
      <div class="col-span-5 max-lg:col-span-12">
        <div class="relative group cursor-pointer overflow-hidden rounded-[28px] bg-slate-900 shadow-2xl">
          <!-- Thumbnail Image -->
          <img
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80"
            alt="Living room showcase"
            class="h-[480px] w-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-80"
          />
          
          <!-- Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

          <!-- Top Floating Tag -->
          <div class="absolute top-6 left-6">
            <span class="rounded-full bg-white/20 border border-white/30 px-3.5 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
              Watch Experience
            </span>
          </div>

          <!-- Center Play Button -->
          <div class="absolute inset-0 flex items-center justify-center">
            <button 
              type="button"
              class="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/40 bg-white/20 text-white backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:bg-white group-hover:text-black shadow-2xl cursor-pointer" 
              aria-label="Play Video"
            >
              <Play class="h-6 w-6 fill-current translate-x-0.5" />
            </button>
          </div>

          <!-- Bottom Text Overlay -->
          <div class="absolute bottom-6 left-6 right-6 text-white">
            <p class="text-[0.75rem] font-semibold tracking-widest uppercase text-white/70">Behind The Craft</p>
            <h3 class="text-[1.125rem] font-medium leading-snug mt-1">
              Inside Our Sustainable Design Workshop
            </h3>
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

// Smooth Height Transitions Hooks
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