<template>
  <section id="collection" class="bg-background py-20 overflow-hidden">
    <div class="mx-auto grid max-w-300 grid-cols-2 gap-12 px-6 items-center max-lg:grid-cols-1 max-lg:gap-12">

      <!-- Left: Text Content -->
      <div class="z-10">
        
        <!-- Subtitle Badge / Tag -->
        <span class="mb-3 inline-block text-[0.75rem] font-semibold uppercase tracking-widest text-primary">About Us</span>

        <!-- Modern Editorial Heading -->
        <h2 class="mb-6 font-display text-[2.25rem] sm:text-[2.75rem] leading-[1.12] tracking-tight text-text">
          Designing Spaces That <br />
          <span class="font-normal italic text-primary">Feel Like Home</span>
        </h2>

        <!-- Paragraph Typography -->
        <p class="mb-8 text-[0.9375rem] font-normal leading-[1.75] text-text-muted max-w-115 tracking-normal">
          At <strong class="font-semibold text-text">Kayora</strong>, we believe great design starts with comfort and ends with personal expression. From cozy corners to statement pieces, our interiors bring warmth, function, and timeless beauty to every room.
        </p>
        
        <!-- Clean Editorial Button: LEARN MORE -->
        <button
          type="button"
          @click="openModal"
          class="inline-flex items-center justify-center rounded-full bg-text px-7 py-3 text-[0.8125rem] font-medium tracking-wider text-white transition-all duration-300 hover:bg-primary active:scale-95 cursor-pointer border-none shadow-sm"
        >
          <span>LEARN MORE</span>
        </button>
      </div>

      <!-- Right: Overlapping Layout -->
      <div class="relative w-full h-115 sm:h-125 flex items-center justify-center">
        
        <!-- Main Large Image -->
        <div class="absolute left-0 top-0 h-95 sm:h-105 w-[62%] sm:w-[65%] overflow-hidden rounded-2xl shadow-xl z-10 bg-slate-100">
          <TransitionGroup name="fade">
            <img
              v-for="(img, idx) in mainImages"
              v-show="idx === mainIndex"
              :key="img.src"
              :src="img.src"
              :alt="img.alt"
              class="absolute inset-0 h-full w-full object-cover"
            />
          </TransitionGroup>
        </div>

        <!-- Secondary Accent Image -->
        <div class="absolute right-0 bottom-0 h-[260px] sm:h-[300px] w-[50%] sm:w-[52%] overflow-hidden rounded-2xl shadow-2xl z-20 bg-slate-100 border-4 border-background">
          <TransitionGroup name="fade">
            <img
              v-for="(img, idx) in sideImages"
              v-show="idx === sideIndex"
              :key="img.src"
              :src="img.src"
              :alt="img.alt"
              class="absolute inset-0 h-full w-full object-cover"
            />
          </TransitionGroup>
        </div>

      </div>

    </div>

    <!-- Premium Modal Section -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="isModalOpen"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-6"
          @click.self="closeModal"
          @keydown.esc="closeModal"
        >
          <div
            ref="modalPanel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-modal-title"
            tabindex="-1"
            class="relative flex max-h-[88vh] w-full max-w-[600px] flex-col overflow-hidden rounded-2xl bg-white shadow-xl transition-all border border-border/40"
          >
            <!-- Header Image Banner -->
            <div class="relative h-48 sm:h-56 w-full shrink-0 overflow-hidden bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80"
                alt="Interior Design Artistry"
                class="h-full w-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              <span class="absolute top-5 left-6 text-[0.7rem] font-semibold tracking-widest text-white/90 uppercase">
                Our Story
              </span>

              <button
                type="button"
                @click="closeModal"
                aria-label="Close"
                class="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black/30 text-white transition-colors duration-200 hover:bg-black/60 border-none"
              >
                <X class="h-4 w-4" />
              </button>

              <div class="absolute bottom-5 left-6 right-6">
                <h3 id="about-modal-title" class="font-display text-[1.5rem] sm:text-[1.75rem] font-semibold leading-tight text-white">
                  Crafting Timeless Comfort
                </h3>
              </div>
            </div>

            <!-- Content Area -->
            <div class="overflow-y-auto p-6 sm:p-8 space-y-4 text-[0.875rem] leading-relaxed text-text-muted">
              <p class="text-text font-medium text-[0.9375rem] leading-7">
                At Kayora, we believe great design starts with comfort and ends with personal expression. Every space tells a story — we simply provide the masterpiece pieces to write it with.
              </p>
              
              <hr class="border-border/60 my-2" />

              <p>
                It began with a simple frustration: furniture that looked good in a showroom but never quite fit real life. So we set out to design pieces that hold up to daily use without giving up on craft — solid joinery, natural materials, and finishes that age gracefully over time.
              </p>

              <div class="my-4 rounded-lg bg-slate-50 p-4 border-l-2 border-primary">
                <p class="italic text-text text-[0.8438rem] leading-6">
                  "Furniture shouldn't just fill a room — it should anchor your moments, support your routines, and inspire your daily living."
                </p>
              </div>

              <p>
                Every collection is developed with independent artisans who share that same high standard, from the hand-carved frame of a sofa to the rich grain of a dining table. We test every piece for living, not just for photographs.
              </p>
            </div>

            <!-- Modal Footer -->
            <div class="shrink-0 border-t border-border/60 bg-slate-50/50 px-6 py-4 flex items-center justify-between">
              <span class="text-[0.75rem] font-mono text-text-muted tracking-wider uppercase">Kayora Studio</span>
              
              <!-- Clean Secondary Button: Got It -->
              <button
                type="button"
                @click="closeModal"
                class="inline-flex items-center justify-center rounded-full bg-text px-6 py-2 text-[0.75rem] font-medium tracking-wider text-white transition-colors duration-200 hover:bg-primary active:scale-95 cursor-pointer border-none"
              >
                Got It
              </button>
            </div>

          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { X } from 'lucide-vue-next'

const mainImages = [
  { src: '/images/living-room.png', alt: 'Modern living room' },
  { src: '/images/dining-room.png', alt: 'Minimalist dining room' },
  { src: '/images/reading-nook.png', alt: 'Sunlit reading nook' },
]

const sideImages = [
  { src: '/images/bedroom/bedroom3.png', alt: 'Stylish bedroom' },
  { src: '/images/armchair.png', alt: 'Cozy armchair corner' },
  { src: '/images/warm-study.png', alt: 'Warm study space' },
]

const mainIndex = ref(0)
const sideIndex = ref(0)
let timer = null

function startAutoSlide() {
  timer = setInterval(() => {
    mainIndex.value = (mainIndex.value + 1) % mainImages.length
    sideIndex.value = (sideIndex.value + 1) % sideImages.length
  }, 4500)
}

onMounted(() => {
  startAutoSlide()
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

// Modal Logic
const isModalOpen = ref(false)
const modalPanel = ref(null)
let lastFocusedEl = null

function openModal() {
  lastFocusedEl = document.activeElement
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
  if (lastFocusedEl) lastFocusedEl.focus()
}

watch(isModalOpen, async (open) => {
  if (open) {
    await nextTick()
    modalPanel.value?.focus()
    document.addEventListener('keydown', handleKeydown)
  } else {
    document.removeEventListener('keydown', handleKeydown)
  }
})

function handleKeydown(e) {
  if (e.key === 'Escape') closeModal()
}
</script>

<style scoped>
/* Ultra-smooth Crossfade Animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Modal Simple Fade & Scale */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.97);
}
</style>