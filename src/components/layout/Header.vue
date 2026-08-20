<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 border-b border-black/6 bg-background/92 backdrop-blur-xl transition-shadow duration-300',
      isScrolled ? 'shadow-[0_1px_12px_rgba(0,0,0,0.06)]' : ''
    ]"
  >
    <div class="mx-auto flex items-center justify-between max-w-[1200px] px-6 py-4 max-sm:px-4 max-sm:py-3">

      <!-- Logo -->
      <router-link to="/" class="flex-shrink-0 font-display text-[1.375rem] font-bold tracking-tight text-text no-underline max-sm:text-[1.125rem]">
        Kayora
      </router-link>

      <!-- Desktop Navigation -->
      <nav class="flex flex-1 items-center justify-center gap-8 max-md:hidden">
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
      <div class="flex flex-shrink-0 items-center gap-2 max-sm:gap-1">
        <!-- Search Icon Button -->
        <button
          type="button"
          aria-label="Search"
          class="action-icon inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-text transition-all duration-200"
          @click="isSearchOpen = true"
        >
          <Search :size="18" stroke-width="1.8" />
        </button>

        <!-- Wishlist Icon Button -->
        <button
          type="button"
          aria-label="Wishlist"
          :class="[
            'action-icon relative inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-text transition-all duration-200',
            isWishlistBouncing ? 'animate-bounce-cart' : ''
          ]"
          @click="isWishlistOpen = true; isCartOpen = false"
        >
          <Heart :size="18" stroke-width="1.8" />
          <Transition name="badge-pop">
            <span
              v-if="totalWishlistCount > 0"
              class="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[0.625rem] font-bold text-white shadow-xs pointer-events-none"
            >
              {{ totalWishlistCount }}
            </span>
          </Transition>
        </button>

        <!-- Cart Icon Button -->
        <button
          type="button"
          aria-label="Cart"
          :class="[
            'action-icon relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-text transition-all duration-200',
            isCartBouncing ? 'animate-bounce-cart' : ''
          ]"
          @click="isCartOpen = true; isWishlistOpen = false"
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
          class="hidden cursor-pointer border-none bg-transparent p-1 text-text max-md:inline-flex relative h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 hover:bg-primary-soft hover:text-primary"
          aria-label="Toggle menu"
          @click="isMenuOpen = true"
        >
          <Menu :size="20" />
        </button>
      </div>

    </div>

    <!-- Modern Mobile Menu (slide-over panel) -->
    <Teleport to="body">
      <div v-if="isMenuOpen" class="fixed inset-0 z-[110] flex justify-end md:hidden">
        <Transition name="fade" appear>
          <div
            class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          ></div>
        </Transition>

        <Transition name="slide" appear>
          <div class="relative flex h-full w-full max-w-[320px] flex-col overflow-visible bg-white shadow-2xl z-10">

            <!-- Floating Close Button (straddles the panel's left edge, vertically centered) -->
            <button
              @click="isMenuOpen = false"
              aria-label="Close menu"
              class="absolute top-1/2 -left-5 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border/60 bg-white text-text shadow-[0_4px_16px_rgba(0,0,0,0.15)] transition-colors duration-200 hover:bg-primary hover:text-white hover:border-primary"
            >
              <X :size="18" />
            </button>

            <!-- Header panel -->
            <div class="relative border-b border-white/10 bg-text px-6 pt-5 pb-4">
              <div>
                <span class="font-display text-xl font-bold tracking-tight text-white">Kayora</span>
                <div class="mt-1.5 h-[2px] w-8 bg-primary"></div>
              </div>

              <p class="mt-3 text-[0.75rem] font-medium uppercase tracking-[0.12em] text-white/40">
                Furniture &amp; home essentials
              </p>
            </div>

            <!-- Nav Links -->
            <nav class="flex-1 overflow-y-auto px-4 py-5">
              <a
                v-for="(item, idx) in navItems"
                :key="item.label"
                :href="item.href"
                :class="[
                  'group mb-2 flex items-center gap-3.5 rounded-2xl px-3.5 py-3.5 no-underline transition-all duration-200',
                  activeLink === item.href
                    ? 'bg-primary/10 text-primary'
                    : 'text-text hover:bg-background'
                ]"
                :style="{ transitionDelay: isMenuOpen ? `${idx * 40}ms` : '0ms' }"
                @click="setActive(item.href); isMenuOpen = false"
              >
                <span
                  :class="[
                    'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl transition-colors duration-200',
                    activeLink === item.href ? 'bg-primary text-white' : 'bg-[#f0ede6] text-text-muted group-hover:text-primary'
                  ]"
                >
                  <component :is="item.icon" :size="15" stroke-width="1.8" />
                </span>
                <span class="flex-1 text-[0.9rem] font-semibold">{{ item.label }}</span>
                <ChevronRight
                  :size="15"
                  :class="activeLink === item.href ? 'text-primary' : 'text-text-muted/40'"
                />
              </a>
            </nav>

            <!-- Quick Actions Footer -->
            <div class="border-t border-border/70 bg-background/60 px-5 py-5 space-y-3">
              <button
                class="flex w-full cursor-pointer items-center gap-3 rounded-2xl border-none bg-white px-4 py-3 text-left shadow-sm"
                @click="isMenuOpen = false; isSearchOpen = true"
              >
                <span class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Search :size="15" />
                </span>
                <span class="text-[0.8125rem] font-medium text-text">Search products</span>
              </button>

              <div class="grid grid-cols-2 gap-3">
                <button
                  class="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-border/70 bg-white py-3 text-[0.8125rem] font-semibold text-text shadow-sm"
                  @click="isMenuOpen = false; isWishlistOpen = true"
                >
                  <Heart :size="15" />
                  Wishlist
                  <span
                    v-if="totalWishlistCount > 0"
                    class="flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-primary px-1 text-[0.625rem] font-bold text-white"
                  >
                    {{ totalWishlistCount }}
                  </span>
                </button>

                <button
                  class="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-none bg-text py-3 text-[0.8125rem] font-semibold text-white shadow-sm"
                  @click="isMenuOpen = false; isCartOpen = true"
                >
                  <ShoppingCart :size="15" />
                  Cart
                  <span
                    v-if="totalCartCount > 0"
                    class="flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-primary px-1 text-[0.625rem] font-bold text-white"
                  >
                    {{ totalCartCount }}
                  </span>
                </button>
              </div>
            </div>

          </div>
        </Transition>
      </div>
    </Teleport>

    <!-- Modern Slide-Over Cart Pop-up -->
    <Teleport to="body">
      <div v-if="isCartOpen" class="fixed inset-0 z-[100] flex justify-end">
        <!-- Glassmorphism Backdrop -->
        <Transition name="fade" appear>
          <div
            class="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
          ></div>
        </Transition>

        <!-- Drawer Content Container -->
        <Transition name="slide" appear>
          <div class="relative flex h-full w-full max-w-[420px] flex-col bg-white shadow-2xl z-10 border-l border-border/40">

            <!-- Header Cart -->
            <div class="flex items-center justify-between border-b border-border/80 px-6 py-5 bg-background/50 max-sm:px-4">
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
            <div class="flex-1 overflow-y-auto px-6 py-4 space-y-3 max-sm:px-4">
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

                <div class="flex flex-1 flex-col justify-between self-stretch py-0.5 min-w-0 pr-6">
                  <div class="min-w-0">
                    <TruncatedText
                      :text="item.category"
                      as="span"
                      className="block text-[0.625rem] font-bold uppercase tracking-wider text-primary"
                    />
                    <TruncatedText
                      :text="item.name"
                      as="h4"
                      className="text-xs font-semibold text-text leading-snug"
                    />
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
            <div v-if="cartItems.length > 0" class="border-t border-border/80 p-6 space-y-4 bg-background/50 max-sm:p-4">
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

    <!-- Wishlist Slide-Over Pop-up -->
    <Teleport to="body">
      <div v-if="isWishlistOpen" class="fixed inset-0 z-[100] flex justify-end">
        <Transition name="fade" appear>
          <div
            class="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
          ></div>
        </Transition>

        <Transition name="slide" appear>
          <div class="relative flex h-full w-full max-w-[420px] flex-col bg-white shadow-2xl z-10 border-l border-border/40">

            <!-- Header Wishlist -->
            <div class="flex items-center justify-between border-b border-border/80 px-6 py-5 bg-background/50 max-sm:px-4">
              <div class="flex items-center gap-2.5">
                <div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Heart :size="18" />
                </div>
                <h2 class="font-display text-lg font-bold text-text tracking-tight">Your Wishlist</h2>
                <span class="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                  {{ totalWishlistCount }} {{ totalWishlistCount === 1 ? 'item' : 'items' }}
                </span>
              </div>
              <button
                @click="isWishlistOpen = false"
                class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-text-muted hover:bg-black/5 hover:text-text transition-colors"
              >
                <X :size="18" />
              </button>
            </div>

            <!-- List Wishlist -->
            <div class="flex-1 overflow-y-auto px-6 py-4 space-y-3 max-sm:px-4">
              <div v-if="wishlistItems.length === 0" class="flex h-full flex-col items-center justify-center text-center py-12">
                <div class="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#F5F3EF] text-text-muted/60">
                  <Heart :size="36" stroke-width="1.5" />
                </div>
                <h3 class="font-display text-lg font-semibold text-text">Your wishlist is empty</h3>
                <p class="mt-1 text-xs text-text-muted leading-relaxed max-w-[220px]">
                  Tap the heart icon on any product to save it here.
                </p>
              </div>

              <div
                v-for="item in wishlistItems"
                :key="item.id"
                class="group relative flex items-center gap-4 rounded-2xl border border-border/50 bg-white p-3.5 transition-all duration-200 hover:border-border hover:shadow-sm"
              >
                <img :src="item.img" :alt="item.name" class="h-20 w-20 rounded-xl object-cover bg-[#f0ede6] flex-shrink-0" />

                <div class="flex flex-1 flex-col justify-between self-stretch py-0.5 min-w-0 pr-6">
                  <div class="min-w-0">
                    <TruncatedText
                      :text="item.category"
                      as="span"
                      className="block text-[0.625rem] font-bold uppercase tracking-wider text-primary"
                    />
                    <TruncatedText
                      :text="item.name"
                      as="h4"
                      className="text-xs font-semibold text-text leading-snug"
                    />
                  </div>

                  <div class="flex items-center justify-between mt-2">
                    <span class="font-display text-sm font-bold text-text">
                      ${{ item.price.toFixed(2) }}
                    </span>
                    <button
                      @click="addToCart(item)"
                      :disabled="isInCart(item.id)"
                      :class="[
                        'flex items-center gap-1 rounded-full border px-3 py-1.5 text-[0.6875rem] font-semibold transition-all duration-200',
                        isInCart(item.id)
                          ? 'border-primary bg-primary text-white cursor-default'
                          : 'border-text/20 bg-transparent text-text cursor-pointer hover:border-primary hover:bg-primary hover:text-white'
                      ]"
                    >
                      <Check v-if="isInCart(item.id)" :size="12" />
                      <ShoppingCart v-else :size="12" />
                      {{ isInCart(item.id) ? 'In cart' : 'Add to cart' }}
                    </button>
                  </div>
                </div>

                <button
                  @click="removeFromWishlist(item.id)"
                  class="absolute top-3 right-3 text-text-muted/50 hover:text-red-500 cursor-pointer p-1 transition-colors border-none bg-transparent"
                  aria-label="Remove item"
                >
                  <Trash2 :size="15" />
                </button>
              </div>
            </div>

          </div>
        </Transition>
      </div>
    </Teleport>

    <!-- Search Overlay (centered, transparent blurred backdrop) -->
    <Teleport to="body">
      <Transition name="fade" appear>
        <div
          v-if="isSearchOpen"
          class="fixed inset-0 z-[100] flex items-center justify-center bg-black/25 backdrop-blur-md px-6 max-sm:px-4"
        >
          <Transition name="search-pop" appear>
            <div
              v-if="isSearchOpen"
              class="relative w-full max-w-[560px] rounded-3xl bg-white/95 backdrop-blur-xl shadow-[0_25px_70px_rgba(0,0,0,0.3)] border border-white/60 overflow-hidden"
              @click.stop
            >
              <!-- Close Button -->
              <button
                class="absolute top-4 right-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-none bg-text text-white shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-primary"
                aria-label="Close search"
                @click="closeSearch"
              >
                <X :size="18" />
              </button>

              <div class="flex items-center gap-3 pl-6 pr-16 py-5 max-sm:pl-4 max-sm:pr-14">
                <div class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Search :size="18" stroke-width="2" />
                </div>
                <input
                  ref="searchInput"
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search products..."
                  class="flex-1 border-none bg-transparent text-[1rem] text-text placeholder:text-text-muted outline-none"
                  @keyup.enter="submitSearch"
                  @keyup.esc="closeSearch"
                />
                <button
                  v-if="searchQuery"
                  class="flex h-7 w-7 flex-shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-text-muted transition-colors duration-200 hover:bg-primary-soft hover:text-primary"
                  aria-label="Clear search"
                  @click="clearSearch"
                >
                  <X :size="14" />
                </button>
              </div>

              <!-- Quick result count / hint -->
              <div class="border-t border-border/60 bg-background/60 px-6 py-3 text-[0.75rem] text-text-muted max-sm:px-4">
                <template v-if="hasQuery">
                  Press <span class="font-semibold text-text">Enter</span> to view results for
                  <span class="font-semibold text-primary">"{{ searchQuery }}"</span> in Shop
                </template>
                <template v-else>
                  Try searching "chair", "sofa", or "table"
                </template>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>

    <!-- Cart Toast Notification -->
    <Teleport to="body">
      <Transition name="toast">
        <div
          v-if="isToastVisible"
          class="fixed bottom-6 right-6 z-[100] flex items-center gap-3 overflow-hidden rounded-2xl bg-text pl-3 pr-4 py-3 text-white shadow-[0_16px_40px_rgba(0,0,0,0.25)] backdrop-blur-md max-w-[340px] max-sm:left-4 max-sm:right-4 max-sm:bottom-4 max-sm:max-w-none"
        >
          <img
            v-if="toastProduct?.img"
            :src="toastProduct.img"
            :alt="toastProduct.name"
            class="h-10 w-10 flex-shrink-0 rounded-lg object-cover bg-white/10"
          />
          <div v-else class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary">
            <Check :size="16" />
          </div>

          <div class="flex-1 min-w-0">
            <p class="text-[0.75rem] font-semibold leading-tight truncate">{{ toastProduct?.name }}</p>
            <p class="text-[0.6875rem] text-white/60 leading-tight mt-0.5">Added to cart</p>
          </div>

          <button
            @click="isCartOpen = true; isWishlistOpen = false; dismissToast()"
            class="flex-shrink-0 rounded-full border border-white/20 px-3 py-1.5 text-[0.6875rem] font-semibold text-white cursor-pointer bg-transparent hover:bg-primary hover:border-primary transition-colors"
          >
            View
          </button>

          <button
            @click="dismissToast"
            aria-label="Dismiss"
            class="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full border-none bg-transparent text-white/40 cursor-pointer hover:text-white transition-colors"
          >
            <X :size="13" />
          </button>

          <!-- Auto-dismiss progress bar -->
          <div class="absolute bottom-0 left-0 h-[3px] bg-primary toast-progress"></div>
        </div>
      </Transition>
    </Teleport>

  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { ShoppingCart, Search, Heart, Menu, X, Plus, Minus, Trash2, Check, Home, ShoppingBag, LayoutGrid, Tag, BookOpen, ChevronRight } from 'lucide-vue-next'
import { useCart } from '@/composables/useCart.js'
import { useWishlist } from '@/composables/useWishlist.js'
import { useSearch } from '@/composables/useSearch.js'
import TruncatedText from '@/components/TruncatedText.vue'

const {
  cartItems,
  isCartOpen,
  totalCartCount,
  totalPrice,
  addToCart,
  updateQuantity,
  removeFromCart,
  isCartBouncing,
  isInCart,
  toastMessage,
  toastProduct,
  isToastVisible,
  dismissToast
} = useCart()

const {
  wishlistItems,
  removeFromWishlist,
  totalWishlistCount
} = useWishlist()

const { searchQuery, clearSearch: resetSearch, hasQuery } = useSearch()

const isMenuOpen        = ref(false)
const isScrolled        = ref(false)
const isSearchOpen      = ref(false)
const isWishlistOpen    = ref(false)
const isWishlistBouncing = ref(false)
const activeLink        = ref('#home')
const searchInput       = ref(null)

const navItems = [
  { label: 'Home',       href: '#home',       icon: Home },
  { label: 'Shop',       href: '#shop',       icon: ShoppingBag },
  { label: 'Collection', href: '#collection', icon: LayoutGrid },
  { label: 'Categories', href: '#categories', icon: Tag },
  { label: 'Blog',       href: '#blog',       icon: BookOpen },
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

const clearSearch = () => {
  resetSearch()
  searchInput.value?.focus()
}

const closeSearch = () => {
  isSearchOpen.value = false
}

const submitSearch = () => {
  isSearchOpen.value = false
  const shopSection = document.querySelector('#shop')
  if (shopSection) {
    shopSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActive('#shop')
  }
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

// Cute little bounce on the heart icon whenever the wishlist count changes
watch(totalWishlistCount, () => {
  isWishlistBouncing.value = true
  window.setTimeout(() => { isWishlistBouncing.value = false }, 400)
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

/* Search Modal Pop Transition */
.search-pop-enter-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.search-pop-leave-active {
  transition: all 0.2s ease-in;
}
.search-pop-enter-from,
.search-pop-leave-to {
  opacity: 0;
  transform: scale(0.92) translateY(8px);
}

/* Toast Animation */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}

.toast-enter-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-leave-active {
  transition: all 0.25s ease-in;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(16px) scale(0.96);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(8px);
}

.toast-progress {
  width: 100%;
  animation: toastCountdown 3s linear forwards;
}
@keyframes toastCountdown {
  from { width: 100%; }
  to { width: 0%; }
}
</style>