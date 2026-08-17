<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 border-b border-black/6 bg-background/92 backdrop-blur-xl transition-shadow duration-300',
      isScrolled ? 'shadow-[0_1px_12px_rgba(0,0,0,0.06)]' : ''
    ]"
  >
    <div class="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">

      <!-- Logo -->
      <router-link to="/" class="flex-shrink-0 font-display text-[1.375rem] font-bold tracking-tight text-text no-underline">
        Kayora
      </router-link>

      <!-- Desktop Navigation -->
      <nav class="ml-10 flex flex-1 items-center gap-8 max-md:hidden">
        <a
          v-for="item in navItems"
          :key="item.label"
          :href="item.href"
          :class="[
            'nav-link relative whitespace-nowrap text-[0.8125rem] font-medium no-underline transition-colors duration-200',
            activeLink === item.href ? 'text-primary is-active' : 'text-text'
          ]"
          @click="setActive(item.href)"
        >
          {{ item.label }}
        </a>
      </nav>

      <!-- Actions -->
      <div class="flex flex-shrink-0 items-center gap-2">
        <button
          aria-label="Search"
          class="action-icon hidden md:inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-text transition-all duration-200"
          @click="isSearchOpen = true"
        >
          <Search :size="18" stroke-width="1.8" />
        </button>

        <button
          aria-label="Wishlist"
          class="action-icon hidden md:inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-text transition-all duration-200"
        >
          <Heart :size="18" stroke-width="1.8" />
        </button>

        <!-- Cart Icon Button -->
        <button
        type="button"
        aria-label="Cart"
        :class="[
            'action-icon relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-text transition-all duration-200',
            isCartBouncing ? 'animate-bounce-cart' : ''
        ]"
        @click="isCartOpen = true"
        >
        <ShoppingCart :size="18" stroke-width="1.8" />
        
        <!-- Badge Counter -->
        <Transition name="badge-pop">
            <span
            v-if="totalCartCount > 0"
            class="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[0.625rem] font-bold text-white shadow-xs pointer-events-none"
            >
            {{ totalCartCount }}
            </span>
        </Transition>
        </button>

        <!-- Mobile Menu Button -->
        <button
          class="hidden cursor-pointer border-none bg-transparent p-1 text-text max-md:inline-flex"
          aria-label="Toggle menu"
          @click="isMenuOpen = !isMenuOpen"
        >
          <component :is="isMenuOpen ? X : Menu" :size="20" />
        </button>
      </div>

    </div>

    <!-- Mobile Nav -->
    <nav v-if="isMenuOpen" class="flex flex-col border-t border-border bg-background/98 px-6 pt-2 pb-4">
      <a
        v-for="item in navItems"
        :key="item.label"
        :href="item.href"
        :class="[
          'border-b border-border py-3 text-[0.9rem] font-medium no-underline transition-colors duration-200 last:border-b-0',
          activeLink === item.href ? 'text-primary' : 'text-text'
        ]"
        @click="setActive(item.href); isMenuOpen = false"
      >
        {{ item.label }}
      </a>
    </nav>

    <!-- Modern Slide-Over Cart Pop-up -->
    <Teleport to="body">
      <div v-if="isCartOpen" class="fixed inset-0 z-[100] flex justify-end">
        <!-- Glassmorphism Backdrop -->
        <Transition name="fade" appear>
          <div
            class="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            @click="isCartOpen = false"
          ></div>
        </Transition>

        <!-- Drawer Content Container -->
        <Transition name="slide" appear>
          <div class="relative flex h-full w-full max-w-[420px] flex-col bg-white shadow-2xl z-10 border-l border-border/40">
            
            <!-- Header Cart -->
            <div class="flex items-center justify-between border-b border-border/80 px-6 py-5 bg-background/50">
              <div class="flex items-center gap-2.5">
                <div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ShoppingCart :size="18" />
                </div>
                <h2 class="font-display text-lg font-bold text-text tracking-tight">Your Cart</h2>
                <span class="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                  {{ totalCartCount }} {{ totalCartCount === 1 ? 'item' : 'items' }}
                </span>
              </div>
              <button
                @click="isCartOpen = false"
                class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-text-muted hover:bg-black/5 hover:text-text transition-colors"
              >
                <X :size="18" />
              </button>
            </div>

            <!-- List Product Keranjang -->
            <div class="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              <!-- Empty State Cart -->
              <div v-if="cartItems.length === 0" class="flex h-full flex-col items-center justify-center text-center py-12">
                <div class="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#F5F3EF] text-text-muted/60">
                  <ShoppingCart :size="36" stroke-width="1.5" />
                </div>
                <h3 class="font-display text-lg font-semibold text-text">Your cart is empty</h3>
                <p class="mt-1 text-xs text-text-muted leading-relaxed max-w-[220px]">
                  Explore our collection and add your favorite items to the cart.
                </p>
              </div>

              <!-- Product Item Card -->
              <div
                v-for="item in cartItems"
                :key="item.id"
                class="group relative flex items-center gap-4 rounded-2xl border border-border/50 bg-white p-3.5 transition-all duration-200 hover:border-border hover:shadow-sm"
              >
                <img :src="item.img" :alt="item.name" class="h-20 w-20 rounded-xl object-cover bg-[#f0ede6] flex-shrink-0" />
                
                <div class="flex flex-1 flex-col justify-between self-stretch py-0.5 min-w-0">
                  <div>
                    <span class="text-[0.625rem] font-bold uppercase tracking-wider text-primary">{{ item.category }}</span>
                    <h4 class="text-xs font-semibold text-text truncate leading-snug">{{ item.name }}</h4>
                  </div>
                  
                  <div class="flex items-center justify-between mt-2">
                    <span class="font-display text-sm font-bold text-text">
                      ${{ (item.price * item.quantity).toFixed(2) }}
                    </span>

                    <!-- Quantity Control Buttons -->
                    <div class="flex items-center gap-1.5 rounded-full border border-border/80 bg-background/60 p-0.5">
                      <button
                        @click="updateQuantity(item.id, -1)"
                        class="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-none bg-white text-text shadow-2xs hover:bg-primary hover:text-white transition-colors"
                      >
                        <Minus :size="12" />
                      </button>
                      <span class="text-xs font-semibold text-text w-5 text-center">{{ item.quantity }}</span>
                      <button
                        @click="updateQuantity(item.id, 1)"
                        class="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-none bg-white text-text shadow-2xs hover:bg-primary hover:text-white transition-colors"
                      >
                        <Plus :size="12" />
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Remove Item Button -->
                <button
                  @click="removeFromCart(item.id)"
                  class="absolute top-3 right-3 text-text-muted/50 hover:text-red-500 cursor-pointer p-1 transition-colors border-none bg-transparent"
                  aria-label="Remove item"
                >
                  <Trash2 :size="15" />
                </button>
              </div>
            </div>

            <!-- Footer & Checkout Info -->
            <div v-if="cartItems.length > 0" class="border-t border-border/80 p-6 space-y-4 bg-background/50">
              <div class="space-y-1.5">
                <div class="flex items-center justify-between text-xs text-text-muted">
                  <span>Shipping</span>
                  <span class="font-medium text-text">Calculated at checkout</span>
                </div>
                <div class="flex items-center justify-between text-sm font-semibold text-text">
                  <span>Subtotal</span>
                  <span class="font-display text-xl font-bold text-primary">${{ totalPrice.toFixed(2) }}</span>
                </div>
              </div>

              <button
                class="w-full rounded-full bg-text py-4 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-text/10 hover:bg-primary transition-all duration-300 cursor-pointer border-none active:scale-[0.98]"
              >
                Proceed to Checkout
              </button>
            </div>

          </div>
        </Transition>
      </div>
    </Teleport>

    <!-- Search Overlay -->
    <Teleport to="body">
      <div
        v-if="isSearchOpen"
        class="fixed inset-0 z-[100] flex items-start justify-center bg-black/20 backdrop-blur-xs pt-[15vh]"
        @click="isSearchOpen = false"
      >
        <div
          class="w-full max-w-[560px] mx-6 rounded-2xl bg-background/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.25)] p-2"
          @click.stop
        >
          <div class="flex items-center gap-3 px-4 py-3">
            <Search :size="18" stroke-width="1.8" class="flex-shrink-0 text-text-muted" />
            <input
              ref="searchInput"
              type="text"
              placeholder="Search products..."
              class="flex-1 border-none bg-transparent text-[0.9375rem] text-text placeholder:text-text-muted outline-none"
              @keyup.esc="isSearchOpen = false"
            />
            <button
              class="flex h-7 w-7 flex-shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-text-muted transition-colors duration-200 hover:bg-primary-soft hover:text-primary"
              aria-label="Close search"
              @click="isSearchOpen = false"
            >
              <X :size="16" />
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { ShoppingCart, Search, Heart, Menu, X, Plus, Minus, Trash2 } from 'lucide-vue-next'
import { useCart } from '@/composables/useCart.js'

const { 
  cartItems, 
  isCartOpen, 
  totalCartCount, 
  totalPrice, 
  updateQuantity, 
  removeFromCart, 
  isCartBouncing 
} = useCart()

const isMenuOpen   = ref(false)
const isScrolled   = ref(false)
const isSearchOpen = ref(false)
const activeLink   = ref('#home')
const searchInput  = ref(null)

const navItems = [
  { label: 'Home',       href: '#home' },
  { label: 'Shop',       href: '#shop' },
  { label: 'Collection', href: '#collection' },
  { label: 'Categories', href: '#categories' },
  { label: 'Blog',       href: '#blog' },
]

let manualOverride = false
const setActive = (href) => {
  activeLink.value = href
  manualOverride = true
  window.clearTimeout(setActive._t)
  setActive._t = window.setTimeout(() => { manualOverride = false }, 700)
}

const handleScroll = () => { isScrolled.value = window.scrollY > 40 }

let observer = null
const setupScrollSpy = () => {
  const sections = navItems
    .map(item => document.querySelector(item.href))
    .filter(Boolean)

  if (!sections.length) return

  observer = new IntersectionObserver(
    (entries) => {
      if (manualOverride) return

      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

      if (visible) {
        activeLink.value = `#${visible.target.id}`
      }
    },
    {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1],
    }
  )

  sections.forEach(section => observer.observe(section))
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  nextTick(() => setupScrollSpy())
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  observer?.disconnect()
})

watch(isSearchOpen, async (open) => {
  if (open) {
    await nextTick()
    searchInput.value?.focus()
  }
})
</script>

<style scoped>
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-primary);
  transform: scaleX(0);
  transition: transform 0.25s ease;
  border-radius: 1px;
}
.nav-link:hover,
.nav-link.is-active {
  color: var(--color-primary);
}
.nav-link:hover::after,
.nav-link.is-active::after {
  transform: scaleX(1);
}

.action-icon:hover {
  background: var(--color-primary-soft);
  color: var(--color-primary);
}

/* Dynamic Keyframe Animations */
@keyframes cartBounce {
  0% { transform: scale(1); }
  50% { transform: scale(1.25) rotate(-6deg); }
  75% { transform: scale(0.95) rotate(3deg); }
  100% { transform: scale(1); }
}

.animate-bounce-cart {
  animation: cartBounce 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.badge-pop-enter-active {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.badge-pop-enter-from {
  opacity: 0;
  transform: scale(0);
}

/* Slide Transition Panel */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>