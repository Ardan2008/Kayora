<template>
  <section class="relative bg-primary py-16 overflow-hidden">
    <!-- Main Container -->
    <div class="mx-auto max-w-[1200px] px-6">
      <div class="grid grid-cols-12 items-center">

        <!-- Left: Chair Image (3 cols) -->
        <div class="col-span-3 flex justify-center max-md:col-span-12">
          <img
            src="/images/chair/chair.png"
            alt="Featured chair"
            class="h-auto max-h-[290px] w-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)] max-md:max-h-[200px]"
          />
        </div>

        <!-- Center: Text + Timer + Button (6 cols with right padding for extra space) -->
        <div class="col-span-6 text-center pr-4 max-md:col-span-12 max-md:pr-0 z-10">
          <h2 class="mb-4 font-display text-[2.25rem] leading-tight tracking-tight text-white max-md:text-[1.75rem]">
            Countdown for biggest discount
          </h2>
          <p class="mx-auto mb-8 max-w-[400px] text-[0.875rem] leading-relaxed text-white/80">
            Don't miss your chance to win big on our best-selling furniture.
            Elegant, comfortable, and affordable just for a limited time!
          </p>

          <!-- Timer with Colon (:) Centered -->
          <div class="mb-8 flex items-center justify-center gap-2 sm:gap-3">
            <template v-for="(unit, index) in timer" :key="unit.label">
              <!-- Box Timer -->
              <div class="flex flex-col items-center justify-center rounded-2xl bg-white/15 px-4 py-3 min-w-[70px] backdrop-blur-sm sm:min-w-[76px]">
                <span class="font-display text-[2rem] font-bold leading-none text-white tabular-nums sm:text-[2.25rem]">
                  {{ unit.value }}
                </span>
                <span class="mt-1 text-[0.625rem] font-medium uppercase tracking-[0.12em] text-white/75">
                  {{ unit.label }}
                </span>
              </div>

              <!-- Separator Titik Dua -->
              <span
                v-if="index < timer.length - 1"
                class="text-[1.25rem] font-bold text-white/80 self-center -mt-2 px-0.5 select-none"
              >
                :
              </span>
            </template>
          </div>

          <!-- CTA Button -->
          <a
            href="#shop"
            class="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-[0.8125rem] font-bold uppercase tracking-widest text-text no-underline transition-all duration-300 hover:bg-black hover:text-white hover:shadow-lg"
          >
            SHOP NOW
          </a>
        </div>

        <!-- Right: Sofa Image (3 cols -> Shifted further right to stay away from timer) -->
        <div class="col-span-3 relative flex items-center justify-end max-md:col-span-12 max-md:justify-center max-md:mt-6">
          <img
            src="/images/sofa/sofa.png"
            alt="Featured sofa"
            class="w-[500px] max-w-none translate-x-[50%] object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.2)] max-md:w-[280px] max-md:translate-x-0"
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