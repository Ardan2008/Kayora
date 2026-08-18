<template>
  <Transition name="fade-up">
    <button
      v-if="isVisible"
      @click="scrollToTop"
      aria-label="Back to top"
      class="group fixed bottom-6 right-6 z-40 flex h-13 w-13 cursor-pointer items-center justify-center rounded-full border-none bg-transparent p-0 transition-transform duration-300 hover:scale-105 active:scale-90 max-sm:bottom-4 max-sm:right-4 max-sm:h-12 max-sm:w-12"
    >
      <!-- Glow halo di belakang, muncul saat hover -->
      <span
        class="absolute inset-0 rounded-full bg-primary opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-40"
      ></span>

      <!-- Progress Ring -->
      <svg
        class="absolute inset-0 h-full w-full -rotate-90"
        viewBox="0 0 52 52"
      >
        <circle
          cx="26"
          cy="26"
          r="23.5"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          stroke-width="2.5"
        />

        <circle
          cx="26"
          cy="26"
          r="23.5"
          fill="none"
          stroke="var(--color-primary)"
          stroke-width="2.5"
          stroke-linecap="round"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="dashOffset"
          class="transition-[stroke-dashoffset] duration-150 ease-out"
        />
      </svg>

      <!-- Core button -->
      <span
        class="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-text text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] max-sm:h-9 max-sm:w-9"
      >
        <!-- Liquid fill -->
        <span
          class="liquid-fill absolute left-1/2 bottom-[-10%] h-[130%] w-[130%] -translate-x-1/2 rounded-[45%] bg-primary"
        ></span>

        <!-- Gelembung -->
        <span
          class="bubble bubble-1 absolute rounded-full bg-primary/80"
        ></span>

        <span
          class="bubble bubble-2 absolute rounded-full bg-primary/70"
        ></span>

        <span
          class="bubble bubble-3 absolute rounded-full bg-primary/60"
        ></span>

        <!-- Arrow -->
        <ArrowUp
          :size="16"
          stroke-width="2.4"
          class="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5"
        />
      </span>
    </button>
  </Transition>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ArrowUp } from 'lucide-vue-next'

const isVisible = ref(false)
const scrollProgress = ref(0)

const radius = 23.5
const circumference = 2 * Math.PI * radius

const dashOffset = computed(() => {
  return circumference - (scrollProgress.value / 100) * circumference
})

const handleScroll = () => {
  const scrollTop = window.scrollY
  const docHeight =
    document.documentElement.scrollHeight - window.innerHeight

  isVisible.value = scrollTop > 400

  scrollProgress.value =
    docHeight > 0
      ? Math.min((scrollTop / docHeight) * 100, 100)
      : 0
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Fade up */
.fade-up-enter-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-up-leave-active {
  transition: all 0.25s ease-in;
}

.fade-up-enter-from {
  opacity: 0;
  transform: translateY(16px) scale(0.7) rotate(-10deg);
}

.fade-up-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.8);
}

/* liquid fill */
.liquid-fill {
  opacity: 0;
  transform: scale(0.3);
  transform-origin: bottom center;
  transition:
    transform 0.6s cubic-bezier(0.22, 1, 0.36, 1),
    border-radius 0.6s ease,
    opacity 0.3s ease;
}

/* liquid */
.group:hover .liquid-fill {
  opacity: 1;
  transform: scale(1.15);
  border-radius: 40%;
}


/* bubbles */
.bubble {
  bottom: 6%;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  animation: none;
}

/* Ukuran bubble */
.bubble-1 {
  left: 32%;
  width: 5px;
  height: 5px;
}

.bubble-2 {
  left: 55%;
  width: 4px;
  height: 4px;
}

.bubble-3 {
  left: 45%;
  width: 3px;
  height: 3px;
}

/* bubble */
.group:hover .bubble {
  opacity: 1;
  visibility: visible;
}

/* bubble 1 */
.group:hover .bubble-1 {
  animation: rise 1.1s ease-in-out infinite;
  animation-delay: 0s;
}

/* bubble 2 */
.group:hover .bubble-2 {
  animation: rise 1.3s ease-in-out infinite;
  animation-delay: 0.25s;
}

/* bubble 3 */
.group:hover .bubble-3 {
  animation: rise 0.9s ease-in-out infinite;
  animation-delay: 0.5s;
}


/* bubble animation */

@keyframes rise {
  0% {
    transform: translateY(0) scale(0.6);
    opacity: 0;
  }

  25% {
    opacity: 1;
  }

  80% {
    opacity: 0.6;
  }

  100% {
    transform: translateY(-22px) scale(1);
    opacity: 0;
  }
}
</style>