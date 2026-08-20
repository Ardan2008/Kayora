<template>
  <section class="bg-[#FAF8F5] py-12 sm:py-20 overflow-hidden w-full">
    <div class="mx-auto max-w-[1140px] px-4 sm:px-6 w-full">

      <!-- Subtitle & Title: Asymmetric Left-Aligned -->
      <div class="mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
        <div>
          <span class="mb-2 block text-[0.75rem] font-semibold uppercase tracking-widest text-primary">
            Testimonials
          </span>
          <h2 class="font-display text-[1.875rem] sm:text-[2.75rem] leading-[1.12] tracking-tight text-text">
            Loved by Spaces <br class="hidden sm:inline" />
            <span class="font-normal italic text-primary">Designed for Living.</span>
          </h2>
        </div>
        <p class="font-serif italic text-[0.875rem] sm:text-[0.9375rem] text-text-muted max-w-sm font-normal leading-relaxed tracking-wide">
          Real homes, real stories. Discover how Kayora transforms everyday living into extraordinary experiences.
        </p>
      </div>

      <!-- Testimonials Grid (1 Card on Mobile, 2 Cards on Desktop) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full">
        <div
          v-for="(t, index) in visibleTestimonials"
          :key="index"
          class="flex flex-col md:flex-row overflow-hidden rounded-[20px] sm:rounded-[24px] bg-white shadow-sm border border-black/5 min-h-auto md:min-h-[340px] w-full"
        >
          <!-- Image Container (Top on Mobile, Right on Desktop) -->
          <div class="relative w-full md:w-[50%] md:min-w-[200px] h-56 md:h-auto overflow-hidden shrink-0 order-first md:order-last">
            <img
              :src="t.avatar"
              :alt="t.name"
              loading="lazy"
              class="h-full w-full object-cover object-center"
            />
            <!-- Dark Gradient Overlay for text readability -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 md:p-6 text-white">
              <h4 class="font-bold text-[1rem] md:text-[1.125rem] leading-snug">{{ t.name }}</h4>
              <p class="text-[0.75rem] md:text-[0.8125rem] text-white/80 mt-0.5">{{ t.role }}</p>
            </div>
          </div>

          <!-- Text Content Box (Bottom on Mobile, Left on Desktop) -->
          <div class="flex-1 p-6 md:p-8 flex flex-col justify-between bg-[#FDFBF7] order-last md:order-first">
            <div>
              <!-- Quote Icon (Brownish/Terracotta) -->
              <div class="mb-3 md:mb-4 text-[#B85C38]">
                <svg width="32" height="24" class="md:w-[36px] md:h-[28px]" viewBox="0 0 36 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 28V16.3333C0 7.31111 5.4 1.86667 16.2 0L18 3.5C12.6 4.97778 9.9 8.24444 9.9 13.3H16.2V28H0ZM19.8 28V16.3333C19.8 7.31111 25.2 1.86667 36 0L37.8 3.5C32.4 4.97778 29.7 8.24444 29.7 13.3H36V28H19.8Z"/>
                </svg>
              </div>

              <!-- Star Rating + Number -->
              <div class="flex items-center gap-2 mb-3 md:mb-4">
                <div class="flex items-center gap-1 text-amber-500">
                  <Star v-for="n in 5" :key="n" class="h-3.5 w-3.5 md:h-4 md:w-4 fill-amber-500 stroke-amber-500" />
                </div>
                <span class="font-bold text-xs md:text-sm text-black ml-1">5.0</span>
              </div>

              <!-- Testimonial Text -->
              <p class="text-[0.8125rem] md:text-[0.875rem] leading-relaxed text-[#555555]">
                "{{ t.text }}"
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Controls: Arrows on Left, Slide Counter on Right -->
      <div class="mt-8 sm:mt-10 flex items-center justify-between w-full">
        <!-- Prev/Next Navigation Buttons -->
        <div class="flex items-center gap-3">
          <button
            @click="prevSlide"
            class="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black text-white transition-all hover:bg-primary active:scale-95 cursor-pointer"
            aria-label="Previous Testimonial"
          >
            <ArrowLeft class="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            @click="nextSlide"
            class="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black text-white transition-all hover:bg-primary active:scale-95 cursor-pointer"
            aria-label="Next Testimonial"
          >
            <ArrowRight class="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        <!-- Slide Indicator Line / Number -->
        <div class="flex items-center gap-2 text-[0.75rem] sm:text-[0.8125rem] font-medium text-[#777]">
          <span>0{{ currentIndex + 1 }}</span>
          <div class="h-0.5 w-8 sm:w-12 bg-black/10 relative overflow-hidden rounded-full">
            <div
              class="absolute top-0 bottom-0 bg-black transition-all duration-300"
              :style="{
                left: `${(currentIndex / (testimonials.length - 1)) * 100}%`,
                width: `${100 / testimonials.length}%`
              }"
            ></div>
          </div>
          <span>0{{ testimonials.length }}</span>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Star, ArrowLeft, ArrowRight } from 'lucide-vue-next'

const currentIndex = ref(0)
const isMobile = ref(false)

const testimonials = [
  {
    text: 'Absolutely love the quality and design! The chair is not only stylish but also incredibly comfortable. The entire shopping experience was smooth and pleasant.',
    name: 'Alyssa Nguyen',
    role: 'Interior Designer',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
  },
  {
    text: 'Excellent service and stunning design. The product looks even better in person and adds so much character to my space. Delivery was fast and the quality is impressive!',
    name: 'Marco Antonio',
    role: 'Product Designer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80',
  },
  {
    text: 'Kayora\'s furniture transformed my entire living space. The materials feel premium and durable. Will definitely purchase again for future projects!',
    name: 'Sofia Reyes',
    role: 'Architect',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80',
  },
]

// Monitor window size to show 1 item on mobile and 2 on desktop
const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})

// Dynamic slide calculation based on device screen
const visibleTestimonials = computed(() => {
  if (isMobile.value) {
    return [testimonials[currentIndex.value]]
  }
  const first = testimonials[currentIndex.value]
  const second = testimonials[(currentIndex.value + 1) % testimonials.length]
  return [first, second]
})

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % testimonials.length
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + testimonials.length) % testimonials.length
}
</script>