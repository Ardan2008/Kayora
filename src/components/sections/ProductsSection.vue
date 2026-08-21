<template>
  <section id="shop" class="bg-background py-20 relative">
    <div class="mx-auto max-w-300 px-6">

      <!-- Header -->
      <div class="mb-7 text-center">
        <h2 class="font-display text-[2.25rem] leading-[1.15] text-text font-semibold">
          Our Best Quality Products
        </h2>
        <p v-if="hasQuery" class="mt-2 text-sm text-text-muted">
          Showing results for <span class="font-semibold text-primary">"{{ searchQuery }}"</span>
          <button
            class="ml-2 inline-flex cursor-pointer items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary transition-all duration-200 hover:gap-1.5 hover:bg-primary/15"
            @click="clearSearch"
          >
            Clear
            <X class="h-3 w-3" />
          </button>
        </p>
      </div>

      <!-- Filter Tabs -->
      <div class="mb-10 flex flex-wrap justify-center gap-2">
        <div class="relative">
          <!-- Decorative blurred blobs so the glass effect has something to refract -->
          <div class="pointer-events-none absolute -top-6 left-8 h-16 w-16 rounded-full bg-primary/25 blur-2xl"></div>
          <div class="pointer-events-none absolute -top-4 right-10 h-14 w-14 rounded-full bg-[#C89B3C]/20 blur-2xl"></div>

          <div
            ref="tabContainer"
            class="relative flex flex-wrap justify-center gap-1.5 rounded-full border border-white/50 bg-white/25 p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-xl backdrop-saturate-150"
          >
            <!-- Sliding glass indicator -->
            <div
              class="absolute left-0 top-1.5 bottom-1.5 rounded-full bg-white/95 shadow-[0_2px_10px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.34,1.15,0.64,1)]"
              :style="indicatorStyle"
            />

            <button
              v-for="tab in tabs"
              :key="tab"
              :ref="el => setTabRef(el, tab)"
              :class="[
                'relative z-10 rounded-full px-5 py-2 text-[0.8125rem] font-medium transition-colors duration-300 cursor-pointer',
                activeTab === tab ? 'text-text' : 'text-text-muted hover:text-text'
              ]"
              @click="selectTab(tab)"
            >
              {{ tab }}
            </button>
          </div>
        </div>
      </div>

      <!-- Product Grid -->
      <TransitionGroup
        v-if="filteredProducts.length"
        name="product-grid"
        tag="div"
        class="grid grid-cols-4 gap-5 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1"
      >
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="group cursor-pointer overflow-hidden rounded-2xl border border-border/60 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)]"
        >
          <!-- Product Image Container -->
          <div class="relative aspect-4/3 overflow-hidden bg-[#f0ede6]">
            <img
              :src="product.img"
              :alt="product.name"
              loading="lazy"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <!-- Wishlist Button (modernized: soft shadow + scale spring + like-pulse) -->
            <button
              :class="[
                'absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border-none backdrop-blur-md transition-all duration-300 ease-out shadow-[0_2px_8px_rgba(0,0,0,0.12)] cursor-pointer active:scale-90',
                isInWishlist(product.id)
                  ? 'bg-red-500 text-white opacity-100'
                  : 'bg-white/90 text-text opacity-0 group-hover:opacity-100 hover:scale-110 hover:bg-white hover:text-red-500'
              ]"
              :aria-label="isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'"
              @click.stop="handleWishlist(product)"
            >
              <span
                v-if="likedPulse.has(product.id)"
                class="absolute inset-0 rounded-full bg-red-500/50 animate-ping"
              />
              <Heart
                class="relative h-4 w-4 transition-transform duration-300"
                :class="isInWishlist(product.id) ? 'scale-125' : ''"
                :fill="isInWishlist(product.id) ? 'currentColor' : 'none'"
              />
            </button>
          </div>

          <!-- Product Details -->
          <div class="px-4 py-4">
            <span class="text-[0.625rem] font-bold uppercase tracking-[0.08em] text-primary">
              {{ product.category }}
            </span>
            <h3 class="mt-1 mb-1.5 text-[0.875rem] font-semibold leading-5 text-text line-clamp-1">
              {{ product.name }}
            </h3>

            <!-- Star Rating -->
            <div class="mb-3 flex items-center gap-1">
              <div class="flex gap-0.5">
                <Star
                  v-for="i in 5"
                  :key="i"
                  :size="11"
                  :fill="i <= Math.round(product.rating) ? '#C89B3C' : 'none'"
                  :color="i <= Math.round(product.rating) ? '#C89B3C' : '#d4d4d4'"
                />
              </div>
              <span class="text-[0.6875rem] text-text-muted">({{ product.reviews }})</span>
            </div>

            <div class="flex items-center justify-between pt-1">
              <span class="font-display text-[1.05rem] font-bold text-text">
                ${{ product.price.toFixed(2) }}
              </span>

              <!-- Add to Cart Button (modernized: expanding pill on hover + added confirmation) -->
              <button
                @click.stop="handleAddToCart(product)"
                :class="[
                  'group/btn relative flex h-9 items-center justify-center overflow-hidden rounded-full border cursor-pointer transition-all duration-300 ease-out active:scale-90',
                  addedIds.has(product.id)
                    ? 'w-9 border-primary bg-primary text-white shadow-[0_6px_16px_rgba(0,0,0,0.16)]'
                    : 'w-9 border-text/15 bg-transparent text-text shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:w-22 hover:border-primary hover:bg-primary hover:text-white hover:shadow-[0_6px_16px_rgba(0,0,0,0.16)]'
                ]"
                aria-label="Add to cart"
              >
                <Transition name="icon-swap" mode="out-in">
                  <Check v-if="addedIds.has(product.id)" key="check" class="h-4 w-4 shrink-0" />
                  <Plus v-else key="plus" class="h-4 w-4 shrink-0 transition-transform duration-300 group-hover/btn:rotate-90" />
                </Transition>
                <span
                  v-if="!addedIds.has(product.id)"
                  class="ml-0 max-w-0 overflow-hidden whitespace-nowrap text-[0.7rem] font-semibold opacity-0 transition-all duration-300 group-hover/btn:ml-1 group-hover/btn:max-w-14 group-hover/btn:opacity-100"
                >
                  Add
                </span>
              </button>
            </div>
          </div>
        </div>
      </TransitionGroup>

      <!-- Empty State -->
      <div
        v-else
        class="mx-auto flex max-w-105 flex-col items-center justify-center rounded-lg border border-dashed border-border/80 bg-white/60 px-8 py-16 text-center shadow-sm"
      >
        <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#f0ede6] text-text-muted">
          <Search class="h-6 w-6" />
        </div>
        <h3 class="font-display text-lg font-semibold text-text">Product Not Found</h3>
        <p class="mt-2 text-sm text-text-muted leading-relaxed">
          {{ hasQuery
            ? `We couldn't find any products matching "${searchQuery}".`
            : "We couldn't find any products in this category. Try selecting a different filter." }}
        </p>

        <!-- Clear Search Button (modernized: icon + lift on hover) -->
        <button
          v-if="hasQuery"
          class="mt-4 inline-flex cursor-pointer items-center gap-1.5 rounded-full border-none bg-primary px-5 py-2.5 text-xs font-semibold text-white shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95 hover:shadow-[0_8px_20px_rgba(0,0,0,0.18)] active:translate-y-0"
          @click="clearSearch"
        >
          <RotateCcw class="h-3.5 w-3.5" />
          Clear search
        </button>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed, nextTick, onMounted } from 'vue'
import { Search, Heart, Plus, Check, Star, X, RotateCcw } from 'lucide-vue-next'
import { useCart } from '@/composables/useCart.js'
import { useWishlist } from '@/composables/useWishlist.js'
import { useSearch } from '@/composables/useSearch.js'

const { addToCart, toastMessage, isToastVisible } = useCart()
const { isInWishlist, toggleWishlist } = useWishlist()
const { searchQuery, clearSearch, hasQuery } = useSearch()

const tabs = ['All', 'Chair', 'Table', 'Sofa', 'Bed']
const activeTab = ref('All')

// --- Sliding glass indicator logic ---
const tabContainer = ref(null)
const tabRefs = reactive({})
const indicatorStyle = reactive({ width: '0px', transform: 'translateX(0px)' })

function setTabRef(el, tab) {
  if (el) tabRefs[tab] = el
}

function updateIndicator() {
  const el = tabRefs[activeTab.value]
  if (!el) return
  indicatorStyle.width = `${el.offsetWidth}px`
  indicatorStyle.transform = `translateX(${el.offsetLeft}px)`
}

function selectTab(tab) {
  activeTab.value = tab
  clearSearch()
  nextTick(updateIndicator)
}

onMounted(() => {
  nextTick(updateIndicator)
  window.addEventListener('resize', updateIndicator)
})

// --- Button click feedback ---
const addedIds = ref(new Set())
const likedPulse = ref(new Set())

function handleAddToCart(product) {
  addToCart(product)
  addedIds.value = new Set(addedIds.value).add(product.id)
  setTimeout(() => {
    const next = new Set(addedIds.value)
    next.delete(product.id)
    addedIds.value = next
  }, 1200)
}

function handleWishlist(product) {
  const wasLiked = isInWishlist(product.id)
  toggleWishlist(product)
  if (!wasLiked) {
    likedPulse.value = new Set(likedPulse.value).add(product.id)
    setTimeout(() => {
      const next = new Set(likedPulse.value)
      next.delete(product.id)
      likedPulse.value = next
    }, 600)
  }
}

const products = [
  {
    id: 1,
    name: 'Velvet Lou Armchair',
    category: 'Chair',
    price: 199.00,
    rating: 4.5,
    reviews: 128,
    img: '/images/chair/chair.webp'
  },
  {
    id: 2,
    name: "Funct'il Shell Lounge Chair",
    category: 'Chair',
    price: 168.00,
    rating: 4,
    reviews: 76,
    img: '/images/chair/chair2.webp'
  },
  {
    id: 3,
    name: 'Cascade Wood Coffee Table',
    category: 'Table',
    price: 233.00,
    rating: 5,
    reviews: 203,
    img: '/images/table/table3.webp'
  },
  {
    id: 4,
    name: 'Golden Column Side Table',
    category: 'Table',
    price: 89.00,
    rating: 3.5,
    reviews: 42,
    img: '/images/table/table4.webp'
  },
  {
    id: 5,
    name: 'Emerald Olive Lounge Chair',
    category: 'Chair',
    price: 319.00,
    rating: 4.5,
    reviews: 156,
    img: '/images/chair/chair.webp'
  },
  {
    id: 6,
    name: 'Cloud Comfort Sofa Chair',
    category: 'Sofa',
    price: 278.00,
    rating: 4,
    reviews: 89,
    img: '/images/sofa/sofa3.webp'
  },
  {
    id: 7,
    name: 'Walnut Burl Coffee Table',
    category: 'Table',
    price: 299.00,
    rating: 5,
    reviews: 174,
    img: '/images/table/table2.webp'
  },
  {
    id: 8,
    name: 'Sunshine Accent Chair',
    category: 'Chair',
    price: 189.00,
    rating: 3.5,
    reviews: 31,
    img: '/images/chair/chair.webp'
  },
  {
    id: 9,
    name: 'Aurora Velvet Sofa',
    category: 'Sofa',
    price: 349.00,
    rating: 4.5,
    reviews: 211,
    img: '/images/sofa/sofa3.webp'
  }
]

const filteredProducts = computed(() => {
  let list = activeTab.value === 'All'
    ? products
    : products.filter(p => p.category === activeTab.value)

  if (hasQuery.value) {
    const q = searchQuery.value.trim().toLowerCase()
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    )
  }

  return list
})
</script>

<style scoped>
.product-grid-enter-active,
.product-grid-leave-active {
  transition: all 0.4s ease;
}
.product-grid-enter-from,
.product-grid-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
.product-grid-leave-active {
  position: absolute;
}

/* Add to Cart icon swap */
.icon-swap-enter-active,
.icon-swap-leave-active {
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.icon-swap-enter-from {
  opacity: 0;
  transform: scale(0.4) rotate(-45deg);
}
.icon-swap-leave-to {
  opacity: 0;
  transform: scale(0.4) rotate(45deg);
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
</style>