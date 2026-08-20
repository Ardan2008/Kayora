<template>
  <footer class="relative overflow-hidden bg-primary text-white/90 font-['Inter',sans-serif]">

    <div class="mx-auto grid max-w-300 grid-cols-[2fr_1fr_1fr_1fr_2fr] gap-10 px-6 pt-16 pb-12 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">

      <!-- Brand -->
      <div class="max-md:col-span-full">
        <!-- Wordmark: Uses serif font, italic -->
        <router-link to="/" class="mb-1 inline-block font-['Fraunces',serif] text-[1.75rem] font-semibold italic tracking-tight text-white no-underline">
          Kayora
        </router-link>
        <span class="mb-4 block h-px w-9 bg-text"></span>
        <p class="mb-5 max-w-55 text-[0.8125rem] leading-7 text-white/70">
          Premium furniture crafted to bring warmth, function,
          and timeless beauty to every space you call home.
        </p>
        <div class="flex gap-2.5">
          <a
            v-for="s in socials"
            :key="s.label"
            :href="s.href"
            :aria-label="s.label"
            class="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-white/10 text-white no-underline transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <component :is="s.icon" :size="15" stroke-width="1.8" />
          </a>
        </div>
      </div>

      <!-- Shop Highlights -->
      <div>
        <h4 class="mb-5 flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.08em] text-white">
          Shop Highlights
        </h4>
        <ul class="flex list-none flex-col gap-2.5 p-0">
          <li v-for="l in shopLinks" :key="l.label">
            <!-- Link style: animated underline using bg-text color -->
            <a :href="l.href" class="relative text-[0.8125rem] text-white/70 no-underline transition-colors duration-200 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-text after:transition-all after:duration-300 hover:text-white hover:after:w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              {{ l.label }}
            </a>
          </li>
        </ul>
      </div>

      <!-- Quick Links -->
      <div>
        <h4 class="mb-5 flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.08em] text-white">
            Quick Links
        </h4>
        <ul class="flex list-none flex-col gap-2.5 p-0">
          <li v-for="l in quickLinks" :key="l.label">
            <a :href="l.href" class="relative text-[0.8125rem] text-white/70 no-underline transition-colors duration-200 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-text after:transition-all after:duration-300 hover:text-white hover:after:w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              {{ l.label }}
            </a>
          </li>
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h4 class="mb-5 flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.08em] text-white">
          Contact Info
        </h4>
        <div class="flex flex-col gap-2.5 text-[0.8125rem] leading-6 text-white/70">
          <p>kayora99@gmail.com</p>
          <p>+62 812 3456 7890</p>
          <p>Jl. Protong Timur<br>Pasuruan, Indonesia</p>
        </div>
      </div>

      <!-- Newsletter -->
      <div class="max-lg:col-span-full">
        <h4 class="mb-5 flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.08em] text-white">
          Newsletter
        </h4>
        <p class="mb-4 text-[0.8125rem] leading-6 text-white/70">
          Subscribe to get the latest offers, collections &amp; design tips.
        </p>
        <form class="flex flex-col gap-2.5" @submit.prevent>
          <label for="newsletter-email" class="sr-only">Email address</label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            placeholder="Your email address"
            autocomplete="email"
            required
            class="rounded-full border border-white/20 bg-white/10 px-[1.125rem] py-2.5 text-[0.8125rem] text-white placeholder:text-white/40 outline-none transition-all duration-200 focus:border-white focus:ring-2 focus:ring-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          />
          <button 
            type="submit" 
            class="cursor-pointer rounded-full bg-text/90 px-5 py-2.5 text-[0.8125rem] font-bold text-white/80 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/70 hover:text-primary hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Subscribe
          </button>
        </form>
      </div>

    </div>

    <!-- Bottom bar -->
    <div class="border-t border-white/10">
      <div class="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-6 py-5 text-[0.75rem] text-white/50 max-sm:flex-col max-sm:text-center">
        <p>&copy; 2026 Kayora. All rights reserved.</p>
        <div class="flex flex-wrap gap-6 p-0">
          <a href="#" class="relative text-white/50 no-underline transition-colors duration-200 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-text after:transition-all after:duration-300 hover:text-white hover:after:w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Shipping &amp; Delivery</a>
          <a href="#" class="relative text-white/50 no-underline transition-colors duration-200 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-text after:transition-all after:duration-300 hover:text-white hover:after:w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Privacy Policy</a>
          <a href="#" class="relative text-white/50 no-underline transition-colors duration-200 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-text after:transition-all after:duration-300 hover:text-white hover:after:w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Gift Cards</a>
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

const shopLinks = [
  { label: 'New Arrivals',  href: '#' },
  { label: 'Best Sellers',  href: '#' },
  { label: 'Chairs',        href: '#' },
  { label: 'Sofas',         href: '#' },
  { label: 'Tables',        href: '#' },
  { label: 'Beds',          href: '#' },
]

const quickLinks = [
  { label: 'About Us',    href: '#collection' },
  { label: 'Blog',        href: '#blog' },
  { label: 'Collections', href: '#collection' },
  { label: 'Contact',     href: '#' },
  { label: 'FAQs',        href: '#' },
]
</script>