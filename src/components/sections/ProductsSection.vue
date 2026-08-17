<template>
  <section id="shop" class="bg-background py-20 relative">
    <div class="mx-auto max-w-300 px-6">

      <!-- Header -->
      <div class="mb-7 text-center">
        <h2 class="font-display text-[2.25rem] leading-[1.15] text-text font-semibold">
          Our Best Quality Products
        </h2>
      </div>

      <!-- Filter Tabs -->
      <div class="mb-10 flex flex-wrap justify-center gap-2.5">
        <button
          v-for="tab in tabs"
          :key="tab"
          :class="[
            'rounded-full border-[1.5px] px-5 py-2 text-[0.8125rem] font-medium transition-all duration-300 cursor-pointer',
            activeTab === tab
              ? 'bg-primary border-primary text-white shadow-sm'
              : 'border-border bg-transparent text-text-muted hover:border-primary hover:text-primary'
          ]"
          @click="activeTab = tab"
        >
          {{ tab }}
        </button>
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
          class="group cursor-pointer overflow-hidden rounded-[16px] border border-border/60 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)]"
        >
          <!-- Product Image Container -->
          <div class="relative aspect-[4/3] overflow-hidden bg-[#f0ede6]">
            <img
              :src="product.img"
              :alt="product.name"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <button
              class="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border-none bg-white/90 text-text backdrop-blur-sm opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-red-50 hover:text-red-500 shadow-sm cursor-pointer"
              aria-label="Add to wishlist"
            >
              <Heart class="h-4 w-4" />
            </button>
          </div>

          <!-- Product Details -->
          <div class="px-4 py-4">
            <span class="text-[0.625rem] font-bold uppercase tracking-[0.08em] text-primary">
              {{ product.category }}
            </span>
            <h3 class="mt-1 mb-3 text-[0.875rem] font-semibold leading-5 text-text line-clamp-1">
              {{ product.name }}
            </h3>
            <div class="flex items-center justify-between pt-1">
              <span class="font-display text-[1.05rem] font-bold text-text">
                ${{ product.price.toFixed(2) }}
              </span>
              
              <!-- Modern Add to Cart Button -->
              <button
                @click.stop="addToCart(product)"
                class="flex h-8 w-8 items-center justify-center rounded-full border border-text/20 bg-transparent text-text cursor-pointer transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white active:scale-90"
                aria-label="Add to cart"
              >
                <Plus class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </TransitionGroup>

      <!-- Empty State -->
      <div
        v-else
        class="mx-auto flex max-w-[420px] flex-col items-center justify-center rounded-[20px] border border-dashed border-border/80 bg-white/60 px-8 py-16 text-center shadow-sm"
      >
        <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#f0ede6] text-text-muted">
          <Search class="h-6 w-6" />
        </div>
        <h3 class="font-display text-lg font-semibold text-text">Product Not Found</h3>
        <p class="mt-2 text-sm text-text-muted leading-relaxed">
          We couldn't find any products in this category. Try selecting a different filter.
        </p>
      </div>

    </div>

    <!-- Floating Modern Notification Toast -->
    <Teleport to="body">
      <Transition name="toast">
        <div
          v-if="isToastVisible"
          class="fixed bottom-6 right-6 z-[100] flex items-center gap-3 rounded-full bg-text px-5 py-3 text-white shadow-xl backdrop-blur-md"
        >
          <div class="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
            <Check class="h-3.5 w-3.5" />
          </div>
          <span class="text-[0.8125rem] font-medium">{{ toastMessage }}</span>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Search, Heart, Plus, Check } from 'lucide-vue-next'
import { useCart } from '@/composables/useCart.js' 

const { addToCart, toastMessage, isToastVisible } = useCart()

const tabs = ['All', 'Chair', 'Table', 'Sofa', 'Bed']
const activeTab = ref('All')

const products = [
  {
    id: 1,
    name: 'Velvet Lou Armchair',
    category: 'Chair',
    price: 199.00,
    img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&q=80'
  },
  {
    id: 2,
    name: "Funct'il Shell Lounge Chair",
    category: 'Chair',
    price: 168.00,
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80'
  },
  {
    id: 3,
    name: 'Cascade Pendant Lamp',
    category: 'Table',
    price: 233.00,
    img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80'
  },
  {
    id: 4,
    name: 'Golden Column Side Table',
    category: 'Table',
    price: 89.00,
    img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&q=80'
  },
  {
    id: 5,
    name: 'Emerald Olive Lounge Chair',
    category: 'Chair',
    price: 319.00,
    img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80'
  },
  {
    id: 6,
    name: 'Cloud Comfort Sofa Chair',
    category: 'Sofa',
    price: 278.00,
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80'
  },
  {
    id: 7,
    name: 'Walnut Burl Coffee Table',
    category: 'Table',
    price: 299.00,
    img: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&q=80'
  },
  {
    id: 8,
    name: 'Sunshine Accent Chair',
    category: 'Chair',
    price: 189.00,
    img: '/images/kursi.png'
  },
  {
    id: 9,
    name: 'Aurora Velvet Sofa',
    category: 'Sofa',
    price: 349.00,
    img: 'https://images.unsplash.com/photo-1550254478-ead40cc54513?w=400&q=80'
  }
]

const filteredProducts = computed(() =>
  activeTab.value === 'All' ? products : products.filter(p => p.category === activeTab.value)
)
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