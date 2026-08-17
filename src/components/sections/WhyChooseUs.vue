<template>
  <section id="categories" class="bg-background py-20">
    <div class="mx-auto grid max-w-[1200px] grid-cols-2 gap-16 px-6 items-start max-md:grid-cols-1 max-md:gap-10">

      <!-- Left: Accordion with Smooth Expand/Collapse -->
      <div>
        <h2 class="font-display text-[2.25rem] leading-[1.15] text-text">Why Choose Us</h2>
        <p class="mt-4 mb-8 text-[0.875rem] leading-7 text-text-muted">
          There are the hallmarks of our furniture identity that give us the <br>
          ultimate standing advantage.
        </p>

        <div class="flex flex-col">
          <div
            v-for="(item, i) in items"
            :key="i"
            class="border-b border-border first:border-t first:border-border"
          >
            <!-- Accordion Header -->
            <button
              :class="[
                'flex w-full cursor-pointer items-center justify-between gap-4 border-none bg-transparent py-[1.125rem] text-left transition-colors duration-300',
                openIndex === i ? 'text-primary font-semibold' : 'hover:text-primary'
              ]"
              @click="openIndex = openIndex === i ? -1 : i"
            >
              <span class="text-[0.9375rem] font-semibold">{{ item.title }}</span>
              <span 
                class="flex-shrink-0 text-[1.25rem] font-light leading-none text-primary transition-transform duration-300"
                :class="openIndex === i ? 'rotate-180' : ''"
              >
                {{ openIndex === i ? '−' : '+' }}
              </span>
            </button>

            <!-- Accordion Content with Smooth Transition -->
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
                <div class="pb-[1.125rem] text-[0.8375rem] leading-7 text-text-muted">
                  {{ item.body }}
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>

      <!-- Right: Video thumbnail with Smooth Hover & Pulse Effects -->
      <div>
        <div class="group relative overflow-hidden rounded-[20px] aspect-[4/3] cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80"
            alt="Living room showcase"
            class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div class="absolute inset-0 flex items-center justify-center bg-primary/35 transition-colors duration-500 group-hover:bg-primary/25">
            <button 
              class="flex h-16 w-16 items-center justify-center rounded-full border-none bg-white text-[1.25rem] cursor-pointer text-primary shadow-[0_4px_14px_rgba(0,0,0,0.14)] pl-1 transition-all duration-300 ease-out group-hover:scale-110 group-hover:shadow-[0_8px_25px_rgba(0,0,0,0.2)]" 
              aria-label="Play video"
            >
              ▶
            </button>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const openIndex = ref(0)

const items = [
  {
    title: 'Sustainability',
    body:  'We source only eco-certified materials and use responsible manufacturing processes to reduce our environmental footprint without compromising on beauty.',
  },
  {
    title: 'Unmatched Quality',
    body:  'Every Kayora piece is crafted by skilled artisans who pour decades of expertise into each joint, finish, and detail — built to last a lifetime.',
  },
  {
    title: 'Unmatched Variety',
    body:  'From compact studio essentials to statement centerpieces, our catalog spans hundreds of styles across every budget range.',
  },
  {
    title: 'Legacy Of Excellence',
    body:  'With over a decade of serving discerning homeowners, Kayora\'s reputation is built on trust, precision, and genuine care.',
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
  transition: height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
}
</style>