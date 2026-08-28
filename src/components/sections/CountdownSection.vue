<template>
  <section class="relative bg-primary py-12 lg:py-16 overflow-hidden w-full">
    <!-- Kontainer Utama -->
    <div class="mx-auto max-w-[1200px] px-4 sm:px-6 w-full">
      <div class="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-0 items-center">

        <!-- Atas/Kiri: Gambar Kursi -->
        <div class="w-full lg:col-span-3 flex justify-center order-2 lg:order-1">
          <img
            src="/images/chair/chair.webp"
            alt="Featured chair"
            loading="lazy"
            class="h-auto max-h-[180px] sm:max-h-[220px] lg:max-h-[290px] w-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)]"
          />
        </div>

        <!-- Tengah: Teks + Timer + Tombol -->
        <div class="w-full lg:col-span-6 text-center lg:pr-4 z-10 order-1 lg:order-2">
          <h2 class="mb-3 sm:mb-4 font-display text-[1.75rem] sm:text-[2.25rem] leading-tight tracking-tight text-white">
            Countdown for biggest discount
          </h2>
          <p class="mx-auto mb-6 sm:mb-8 max-w-[440px] text-[0.8125rem] sm:text-[0.875rem] leading-relaxed text-white/80 px-2">
            Don't miss your chance to win big on our best-selling furniture.
            Elegant, comfortable, and affordable just for a limited time!
          </p>

          <!-- Timer dengan Titik Dua (:) di Tengah -->
          <div class="mb-6 sm:mb-8 flex items-center justify-center gap-1.5 sm:gap-3">
            <template v-for="(unit, index) in timer" :key="unit.label">
              <!-- Kotak Timer -->
              <div class="flex flex-col items-center justify-center rounded-xl sm:rounded-2xl bg-white/15 px-2.5 py-2 sm:px-4 sm:py-3 min-w-[60px] sm:min-w-[76px] backdrop-blur-sm">
                <span class="font-display text-[1.5rem] sm:text-[2.25rem] font-bold leading-none text-white tabular-nums">
                  {{ unit.value }}
                </span>
                <span class="mt-1 text-[0.5625rem] sm:text-[0.625rem] font-medium uppercase tracking-[0.12em] text-white/75">
                  {{ unit.label }}
                </span>
              </div>

              <!-- Pemisah Titik Dua -->
              <span
                v-if="index < timer.length - 1"
                class="text-[1rem] sm:text-[1.25rem] font-bold text-white/80 self-center -mt-2 px-0.5 select-none"
              >
                :
              </span>
            </template>
          </div>

          <!-- Tombol CTA -->
          <a
            href="#shop"
            class="inline-flex items-center justify-center rounded-full bg-white px-7 sm:px-8 py-3 sm:py-3.5 text-[0.75rem] sm:text-[0.8125rem] font-bold uppercase tracking-widest text-text no-underline transition-all duration-300 hover:bg-black hover:text-white hover:shadow-lg"
          >
            SHOP NOW
          </a>
        </div>

        <!-- Bawah/Kanan: Gambar Sofa -->
        <div class="w-full lg:col-span-3 relative flex items-center justify-center lg:justify-end order-3">
          <img
            src="/images/sofa/sofa.webp"
            alt="Featured sofa"
            loading="lazy"
            class="w-full max-w-[280px] sm:max-w-[360px] lg:max-w-none lg:w-[500px] lg:translate-x-[50%] object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.2)]"
          />
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const target = new Date()
target.setDate(target.getDate() + 18)
target.setHours(target.getHours() + 10)
target.setMinutes(target.getMinutes() + 5)

const timer = ref([
  { value: '18', label: 'Days'    },
  { value: '10', label: 'Hours'   },
  { value: '03', label: 'Minutes' },
  { value: '05', label: 'Seconds' },
])

const pad = n => String(n).padStart(2, '0')

let interval = null

const tick = () => {
  const now  = new Date()
  const diff = Math.max(0, target - now)
  const days    = Math.floor(diff / 86400000)
  const hours   = Math.floor((diff % 86400000) / 3600000)
  const minutes = Math.floor((diff % 3600000)  / 60000)
  const seconds = Math.floor((diff % 60000)    / 1000)
  timer.value = [
    { value: pad(days),    label: 'Days'    },
    { value: pad(hours),   label: 'Hours'   },
    { value: pad(minutes), label: 'Minutes' },
    { value: pad(seconds), label: 'Seconds' },
  ]
}

onMounted(()  => { tick(); interval = setInterval(tick, 1000) })
onUnmounted(() => clearInterval(interval))
</script>