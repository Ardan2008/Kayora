<template>
  <section id="collection" class="bg-background py-20">
    <div class="mx-auto grid max-w-[1200px] grid-cols-2 gap-16 px-6 items-center max-md:grid-cols-1 max-md:gap-8">

      <!-- Left: Text -->
      <div>
        <span class="mb-3 inline-block text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-primary">About Us</span>
        <h2 class="mb-5 font-display text-[2rem] leading-[1.2] text-text">
          Designing Spaces That<br>
          Feel Like Home
        </h2>
        <p class="mb-8 text-[0.875rem] leading-7 text-text-muted">
          At Kayora, we believe great design starts with comfort and ends
          with personal expression. From cozy corners to statement pieces,
          our interiors bring warmth, function, and timeless beauty to every
          room. Let us help you create a space that's truly yours.
        </p>
        <button
          type="button"
          @click="openModal"
          class="inline-flex items-center gap-2 rounded-full bg-text px-7 py-3 text-[0.8125rem] font-semibold text-white no-underline transition-all duration-300 hover:bg-primary hover:-translate-y-0.5 cursor-pointer border-none shadow-sm"
        >
          LEARN MORE
        </button>
      </div>

      <!-- Right: Images -->
      <div class="grid grid-cols-2 gap-4 max-md:grid-cols-1">
        <div class="col-start-1 row-span-2 max-md:row-auto">
          <img
            :src="mainImages[mainIndex].src"
            :alt="mainImages[mainIndex].alt"
            class="h-full min-h-[280px] w-full rounded-[20px] object-cover transition-opacity duration-300"
          />
        </div>
        <div class="relative max-md:col-start-1">
          <img
            :src="sideImages[sideIndex].src"
            :alt="sideImages[sideIndex].alt"
            class="h-[200px] w-full rounded-[20px] object-cover transition-opacity duration-300"
          />
          <!-- Carousel arrows -->
          <div class="mt-4 flex justify-end gap-2.5">
            <button
              type="button"
              @click="prevSlide"
              class="flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] border-border bg-white text-text cursor-pointer transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white"
              aria-label="Previous image"
            >
              <ArrowLeft class="h-4 w-4" />
            </button>
            <button
              type="button"
              @click="nextSlide"
              class="flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] border-border bg-white text-text cursor-pointer transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white"
              aria-label="Next image"
            >
              <ArrowRight class="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

    </div>

    <!-- Premium Redesigned Modal -->
    <Teleport to="body">
      <Transition name="modal-bounce">
        <div
          v-if="isModalOpen"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 sm:p-6"
          @click.self="closeModal"
          @keydown.esc="closeModal"
        >
          <div
            ref="modalPanel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-modal-title"
            tabindex="-1"
            class="relative flex max-h-[88vh] w-full max-w-[620px] flex-col overflow-hidden rounded-[28px] bg-white shadow-2xl transition-all"
          >
            <!-- Header Image Banner dengan Overlay Gradient -->
            <div class="relative h-48 sm:h-56 w-full shrink-0 overflow-hidden bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80"
                alt="Interior Design Artistry"
                class="h-full w-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <!-- Badge Kategori -->
              <span class="absolute top-6 left-6 rounded-full bg-white/20 px-3.5 py-1 text-[0.7rem] font-medium tracking-widest text-white backdrop-blur-md uppercase border border-white/30">
                Our Story
              </span>

              <!-- Close Button Modern Glassmorphism -->
              <button
                type="button"
                @click="closeModal"
                aria-label="Close"
                class="absolute right-5 top-5 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-md transition-all duration-300 hover:rotate-90 hover:bg-white hover:text-black"
              >
                <X class="h-4 w-4" />
              </button>

              <!-- Judul Modal di atas Banner Gambar -->
              <div class="absolute bottom-5 left-6 right-6">
                <h3 id="about-modal-title" class="font-display text-[1.65rem] sm:text-[1.85rem] font-semibold leading-tight text-white">
                  Crafting Timeless Comfort
                </h3>
              </div>
            </div>

            <!-- Content Area dengan Custom Scrollbar -->
            <div class="overflow-y-auto p-6 sm:p-8 space-y-4 text-[0.9rem] leading-relaxed text-text-muted">
              <p class="text-text font-medium text-[0.95rem] leading-7">
                At Kayora, we believe great design starts with comfort and ends with personal expression. Every space tells a story — we simply provide the masterpiece pieces to write it with.
              </p>
              
              <hr class="border-border/60 my-2" />

              <p>
                It began with a simple frustration: furniture that looked good in a showroom but never quite fit real life. So we set out to design pieces that hold up to daily use without giving up on craft — solid joinery, natural materials, and finishes that age gracefully over time.
              </p>

              <!-- Highlight Quote Card -->
              <div class="my-4 rounded-2xl bg-[#F8F6F2] p-4 sm:p-5 border-l-4 border-primary">
                <p class="italic text-text text-[0.875rem] leading-6">
                  "Furniture shouldn't just fill a room — it should anchor your moments, support your routines, and inspire your daily living."
                </p>
              </div>

              <p>
                Every collection is developed with independent artisans who share that same high standard, from the hand-carved frame of a sofa to the rich grain of a dining table. We test every piece for living, not just for photographs.
              </p>
            </div>

            <!-- Modal Footer -->
            <div class="shrink-0 border-t border-border bg-[#FAFAFA] px-6 py-4 flex items-center justify-between">
              <span class="text-[0.75rem] font-medium text-text-muted tracking-wider uppercase">Kayora Design Studio</span>
              <button
                type="button"
                @click="closeModal"
                class="rounded-full bg-text px-6 py-2.5 text-[0.75rem] font-semibold text-white transition-all duration-300 hover:bg-primary cursor-pointer border-none"
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
import { ref, nextTick, onBeforeUnmount, watch } from 'vue'
import { ArrowLeft, ArrowRight, X } from 'lucide-vue-next'

const mainImages = [
  { src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80', alt: 'Modern living room' },
  { src: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80', alt: 'Minimalist dining room' },
  { src: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80', alt: 'Sunlit reading nook' },
]

const sideImages = [
  { src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80', alt: 'Stylish bedroom' },
  { src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&q=80', alt: 'Cozy armchair corner' },
  { src: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=400&q=80', alt: 'Warm study space' },
]

const mainIndex = ref(0)
const sideIndex = ref(0)

function nextSlide() {
  mainIndex.value = (mainIndex.value + 1) % mainImages.length
  sideIndex.value = (sideIndex.value + 1) % sideImages.length
}

function prevSlide() {
  mainIndex.value = (mainIndex.value - 1 + mainImages.length) % mainImages.length
  sideIndex.value = (sideIndex.value - 1 + sideImages.length) % sideImages.length
}

// Modal
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

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
/* Animasi Scale Bounce Modal */
.modal-bounce-enter-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-bounce-leave-active {
  transition: all 0.2s cubic-bezier(0.7, 0, 0.84, 0);
}

.modal-bounce-enter-from {
  opacity: 0;
  transform: scale(0.92) translateY(12px);
}
.modal-bounce-leave-to {
  opacity: 0;
  transform: scale(0.96) translateY(8px);
}
</style>