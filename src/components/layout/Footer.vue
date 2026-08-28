<template>
  <footer class="relative overflow-hidden bg-primary text-white/90 font-['Inter',sans-serif] w-full">

    <div class="mx-auto max-w-300 px-4 sm:px-6 pt-10 sm:pt-16 pb-8 sm:pb-12">
      <!-- Sistem Grid: Brand, Perusahaan, Info Kontak, Newsletter -->
      <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8">

        <!-- Brand -->
        <div class="col-span-2 sm:col-span-2 lg:col-span-4">
          <router-link to="/" class="mb-1 inline-block font-['Fraunces',serif] text-[1.5rem] sm:text-[1.75rem] font-semibold italic tracking-tight text-white no-underline">
            Kayora
          </router-link>
          <span class="mb-3 block h-px w-9 bg-text"></span>
          <p class="mb-4 text-[0.8125rem] leading-relaxed text-white/70 max-w-sm">
            We design furniture for the quiet, meaningful moments at home. Every piece is thoughtfully crafted to turn everyday spaces into places of warmth, comfort, and ease.
          </p>
          <div class="flex gap-2.5">
            <a
              v-for="s in socials"
              :key="s.label"
              :href="s.href"
              :aria-label="s.label"
              class="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white no-underline transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <component :is="s.icon" :size="14" stroke-width="1.8" />
            </a>
          </div>
        </div>

        <!-- Tautan Perusahaan -->
        <div class="col-span-1 lg:col-span-2">
          <h4 class="mb-3 sm:mb-4 text-[0.75rem] font-bold uppercase tracking-[0.08em] text-white">
            Company
          </h4>
          <ul class="flex list-none flex-col gap-2 p-0">
            <li v-for="l in quickLinks" :key="l.label">
              <a :href="l.href" class="relative text-[0.8125rem] text-white/70 no-underline transition-colors duration-200 hover:text-white">
                {{ l.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Info Kontak -->
        <div class="col-span-1 lg:col-span-2">
          <h4 class="mb-3 sm:mb-4 text-[0.75rem] font-bold uppercase tracking-[0.08em] text-white">
            Contact
          </h4>
          <div class="flex flex-col gap-2 text-[0.8125rem] leading-relaxed text-white/70">
            <p>kayora99@gmail.com</p>
            <p>+62 812 3456 7890</p>
            <p>Pasuruan, Indonesia</p>
          </div>
        </div>

        <!-- Newsletter -->
        <div class="col-span-2 sm:col-span-2 lg:col-span-4">
          <h4 class="mb-2 text-[0.75rem] font-bold uppercase tracking-[0.08em] text-white">
            Newsletter
          </h4>
          <p class="mb-3 text-[0.8125rem] leading-relaxed text-white/70">
            Subscribe to get the latest offers & design tips.
          </p>
          <form
            class="flex items-center rounded-full bg-white/10 p-1 border border-white/20 focus-within:border-white"
            @submit.prevent="handleNewsletterSubmit"
          >
            <label for="newsletter-email" class="sr-only">Email address</label>
            <input
              id="newsletter-email"
              v-model="newsletterEmail"
              type="email"
              name="email"
              placeholder="Your email"
              autocomplete="email"
              required
              :disabled="isSubmitting"
              class="w-full bg-transparent px-3 py-1.5 text-[0.8125rem] text-white placeholder:text-white/40 outline-none border-none disabled:opacity-60"
            />
            <button
              type="submit"
              :disabled="isSubmitting"
              class="cursor-pointer shrink-0 rounded-full bg-white px-4 py-1.5 text-[0.75rem] font-bold text-primary transition-all duration-200 hover:bg-text hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {{ isSubmitting ? '...' : 'Join' }}
            </button>
          </form>
        </div>

      </div>
    </div>

    <!-- Bar bawah -->
    <div class="border-t border-white/10">
      <div class="mx-auto flex max-w-300 flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-4 text-[0.75rem] text-white/50 text-center sm:text-left">
        <p>&copy; 2026 Kayora. All rights reserved.</p>
        <div class="flex flex-wrap justify-center gap-4 p-0">
          <a href="#" class="text-white/50 no-underline hover:text-white">Shipping & Delivery</a>
          <a href="#" class="text-white/50 no-underline hover:text-white">Privacy Policy</a>
          <a href="#" class="text-white/50 no-underline hover:text-white">Gift Cards</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import { Instagram, Facebook, Twitter } from 'lucide-vue-next'
import Swal from 'sweetalert2'

const socials = [
  { label: 'Instagram', icon: Instagram, href: '#' },
  { label: 'Facebook', icon: Facebook, href: '#' },
  { label: 'Twitter', icon: Twitter, href: '#' },
]

const quickLinks = [
  { label: 'About Us', href: '#about' },
  { label: 'Blog', href: '#blog' },
  { label: 'Shop', href: '#shop' },
  { label: 'Featured', href: '#featured' },
]

const newsletterEmail = ref('')
const isSubmitting = ref(false)

const handleNewsletterSubmit = async () => {
  if (isSubmitting.value) return
  isSubmitting.value = true

  try {
    // TODO: sambungkan ke API/newsletter service sungguhan di sini
    // await fetch('/api/newsletter', { method: 'POST', body: JSON.stringify({ email: newsletterEmail.value }) })

    const subscribedEmail = newsletterEmail.value
    newsletterEmail.value = ''

    await Swal.fire({
      html: `
        <style>
          @keyframes drawCheckNews {
            to { stroke-dashoffset: 0; }
          }
          @keyframes popInNews {
            0%   { transform: scale(0.6); opacity: 0; }
            60%  { transform: scale(1.08); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes ringPulseNews {
            0%   { transform: scale(0.9); opacity: 0.6; }
            100% { transform: scale(1.35); opacity: 0; }
          }
          #newsletter-icon-wrap { animation: popInNews 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
          #newsletter-ring { animation: ringPulseNews 1.6s cubic-bezier(0.2, 0.6, 0.4, 1) 0.3s infinite; }
          #newsletter-check { stroke-dasharray: 24; stroke-dashoffset: 24; animation: drawCheckNews 0.45s ease-out 0.35s forwards; }
        </style>
        <div class="flex flex-col items-center text-center px-1" style="font-family: var(--font-body, 'Inter', sans-serif);">
          <div style="position: relative; width: 64px; height: 64px; margin-bottom: 18px;">
            <div id="newsletter-ring" style="position: absolute; inset: 0; border-radius: 9999px; background: rgba(124,152,133,0.25);"></div>
            <div id="newsletter-icon-wrap" class="flex h-16 w-16 items-center justify-center rounded-full" style="position: relative;">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <polyline id="newsletter-check" points="20 6 9 17 4 12" stroke="#5F7A68" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          </div>
          <h2 class="text-[1.3rem] font-semibold mb-1.5" style="font-family: var(--font-display, 'DM Serif Display', serif); color: var(--color-text, #2E2E2A); letter-spacing: -0.01em;">
            You're subscribed!
          </h2>
          <p class="text-[0.8125rem] leading-relaxed" style="color: var(--color-text-muted, #85837B);">
            We've sent a confirmation to<br />${subscribedEmail}
          </p>
        </div>
      `,
      timer: 2700,
      timerProgressBar: true,
      showConfirmButton: false,
      allowOutsideClick: false,
      backdrop: 'rgba(46, 46, 42, 0.4)',
      customClass: {
        popup:
          'rounded-[28px] px-7 pt-9 pb-8 w-full max-w-90 shadow-[0_20px_60px_rgba(46,46,42,0.18),0_2px_8px_rgba(46,46,42,0.06)]',
        timerProgressBar: '!bg-[#7C9885] !h-[3px]',
      },
      didOpen: () => {
        const popup = Swal.getPopup()
        const iconWrap = document.getElementById('newsletter-icon-wrap')

        popup.style.background = 'rgba(255, 255, 255, 0.9)'
        popup.style.backdropFilter = 'blur(24px)'
        popup.style.webkitBackdropFilter = 'blur(24px)'
        popup.style.border = 'none'

        iconWrap.style.background = 'rgba(124, 152, 133, 0.14)'
        iconWrap.style.backdropFilter = 'blur(10px) saturate(140%)'
        iconWrap.style.webkitBackdropFilter = 'blur(10px) saturate(140%)'
        iconWrap.style.boxShadow =
          'inset 0 1px 1px rgba(255,255,255,0.6), inset 0 -6px 10px rgba(124,152,133,0.08), 0 4px 14px rgba(124,152,133,0.2)'
      },
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/* Cegah browser menimpa background input saat autofill (email tersimpan) */
#newsletter-email:-webkit-autofill,
#newsletter-email:-webkit-autofill:hover,
#newsletter-email:-webkit-autofill:focus,
#newsletter-email:-webkit-autofill:active {
  -webkit-text-fill-color: #ffffff;
  caret-color: #ffffff;
  transition: background-color 9999s ease-in-out 0s;
  box-shadow: 0 0 0px 1000px transparent inset;
}
</style>