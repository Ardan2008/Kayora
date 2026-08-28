<template>
  <Transition name="fade-up">
    <button
      v-if="isVisible"
      @click="scrollToTop"
      aria-label="Back to top"
      class="group fixed bottom-6 right-6 z-40 flex h-13 w-13 cursor-pointer items-center justify-center rounded-full border-none bg-transparent p-0 transition-transform duration-300 hover:scale-105 active:scale-95 max-sm:bottom-4 max-sm:right-4 max-sm:h-12 max-sm:w-12"
    >
      <!-- Halo glow di belakang -->
      <span
        class="absolute inset-0 rounded-full bg-primary/30 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
      ></span>

      <!-- Cincin Progres SVG -->
      <svg
        class="absolute inset-0 h-full w-full -rotate-90 pointer-events-none"
        viewBox="0 0 52 52"
      >
        <!-- Cincin Lintasan: gelap dan transparan untuk kontras pada latar terang -->
        <circle
          cx="26"
          cy="26"
          r="23.5"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          class="text-black/15 dark:text-white/20"
        />

        <!-- Cincin Indikator Progres -->
        <circle
          cx="26"
          cy="26"
          r="23.5"
          fill="none"
          stroke="var(--color-primary, #10b981)"
          stroke-width="2.5"
          stroke-linecap="round"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="dashOffset"
          class="transition-[stroke-dashoffset] duration-150 ease-out"
        />
      </svg>

      <!-- Tombol Kaca Inti (Estetika Apple + Kontras Otomatis) -->
      <span
        class="glass-core relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full max-sm:h-9 max-sm:w-9"
      >
        <!-- Lapisan Isi Cair -->
        <span class="liquid-fill absolute bg-primary"></span>

        <!-- Gelembung -->
        <span class="bubble bubble-1 absolute rounded-full bg-white/80"></span>
        <span class="bubble bubble-2 absolute rounded-full bg-white/70"></span>
        <span class="bubble bubble-3 absolute rounded-full bg-white/60"></span>

        <!-- Ikon Panah dengan Warna Ter-balik Otomatis berdasarkan Latar -->
        <span class="relative z-10 flex items-center justify-center blend-icon">
          <ArrowUp
            :size="16"
            stroke-width="2.8"
            class="transition-transform duration-300 group-hover:-translate-y-0.5"
          />
        </span>
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
  const docHeight = document.documentElement.scrollHeight - window.innerHeight

  isVisible.value = scrollTop > 400

  scrollProgress.value =
    docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0
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
/* Glassmorphism Apple Adaptif */
.glass-core {
  /* Menggunakan campuran warna agar tetap terbaca pada latar terang dan gelap */
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.08),
    0 1px 2px rgba(0, 0, 0, 0.1),
    inset 0 1px 1px rgba(255, 255, 255, 0.6);
  transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

/* Mode Gelap Siap Pakai (beradaptasi otomatis jika HTML root punya kelas dark) */
:global(.dark) .glass-core {
  background: rgba(30, 30, 30, 0.55);
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 
    0 8px 24px rgba(0, 0, 0, 0.4),
    inset 0 1px 1px rgba(255, 255, 255, 0.2);
}

/* Warna Ikon Ter-balik Otomatis: Panah hitam di latar terang, putih di kaca/gelap */
.blend-icon {
  color: #1c1c1e; /* Warna panah default pada latar terang */
  transition: color 0.3s ease;
}

:global(.dark) .blend-icon {
  color: #ffffff;
}

/* Saat hover & isi cair, warna panah dipaksa putih */
.group:hover .blend-icon {
  color: #ffffff !important;
}

/* Transisi Vue (Fade Up) */
.fade-up-enter-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-up-leave-active {
  transition: all 0.25s cubic-bezier(0.7, 0, 0.84, 0);
}

.fade-up-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.6) rotate(-8deg);
}

.fade-up-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.8);
}

/* Efek Isi Cair */
.liquid-fill {
  left: 50%;
  bottom: -20%;
  width: 140%;
  height: 140%;
  border-radius: 42%;
  opacity: 0;
  transform: translate(-50%, 40%) scale(0.4) rotate(0deg);
  transform-origin: center center;
  transition: 
    transform 0.7s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.4s ease,
    border-radius 0.7s ease;
}

.group:hover .liquid-fill {
  opacity: 1;
  transform: translate(-50%, 0%) scale(1.1) rotate(180deg);
  border-radius: 38%;
}

/* Efek Gelembung */
.bubble {
  bottom: 0%;
  opacity: 0;
  pointer-events: none;
}

.bubble-1 {
  left: 30%;
  width: 4px;
  height: 4px;
}

.bubble-2 {
  left: 52%;
  width: 3px;
  height: 3px;
}

.bubble-3 {
  left: 42%;
  width: 2.5px;
  height: 2.5px;
}

.group:hover .bubble-1 {
  animation: rise 1.2s ease-in-out infinite;
  animation-delay: 0.1s;
}

.group:hover .bubble-2 {
  animation: rise 1.4s ease-in-out infinite;
  animation-delay: 0.3s;
}

.group:hover .bubble-3 {
  animation: rise 1s ease-in-out infinite;
  animation-delay: 0.5s;
}

@keyframes rise {
  0% {
    transform: translateY(0) scale(0.5);
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  80% {
    opacity: 0.5;
  }
  100% {
    transform: translateY(-24px) scale(1.2);
    opacity: 0;
  }
}
</style>