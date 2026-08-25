<template>
  <footer class="relative overflow-hidden bg-primary text-white/90 font-['Inter',sans-serif] w-full">

    <div class="mx-auto max-w-300 px-4 sm:px-6 pt-10 sm:pt-16 pb-8 sm:pb-12">
      <!-- Grid System: Brand, Company, Contact Info, Newsletter -->
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

        <!-- Company Links -->
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

        <!-- Contact Info -->
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
          <form class="flex items-center rounded-full bg-white/10 p-1 border border-white/20 focus-within:border-white" @submit.prevent>
            <label for="newsletter-email" class="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              placeholder="Your email"
              autocomplete="email"
              required
              class="w-full bg-transparent px-3 py-1.5 text-[0.8125rem] text-white placeholder:text-white/40 outline-none border-none"
            />
            <button 
              type="submit" 
              class="cursor-pointer shrink-0 rounded-full bg-white px-4 py-1.5 text-[0.75rem] font-bold text-primary transition-all duration-200 hover:bg-text hover:text-white"
            >
              Join
            </button>
          </form>
        </div>

      </div>
    </div>

    <!-- Bottom bar -->
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
import { Instagram, Facebook, Twitter } from 'lucide-vue-next'

const socials = [
  { label: 'Instagram', icon: Instagram, href: '#' },
  { label: 'Facebook',  icon: Facebook,  href: '#' },
  { label: 'Twitter',   icon: Twitter,   href: '#' },
]

const quickLinks = [
  { label: 'About Us',    href: '#about' },
  { label: 'Blog',        href: '#blog' },
  { label: 'Shop', href: '#shop' },
  { label: 'Recommendations',     href: '#Recommendations' },
]
</script>