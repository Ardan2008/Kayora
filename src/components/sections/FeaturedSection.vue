<template>
  <section id="featured" class="bg-background py-24">
    <div class="mx-auto max-w-300 px-6">

      <div class="mx-auto mb-14 max-w-155 text-center">
        <span class="mb-3 inline-block text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-primary">Curated For You</span>
        <h2 class="font-display text-[2.25rem] leading-[1.15] text-text">Featured Furniture</h2>
        <p class="mt-3.5 text-[0.9375rem] leading-7 text-text-muted">
          Discover our handpicked furniture pieces, thoughtfully selected <br />
          to bring comfort, style, and elegance to your home.
        </p>
      </div>

      <!-- Tata letak Bento: hero kategori + grid produk -->
      <div class="grid grid-cols-[0.85fr_2fr] gap-6 items-stretch max-md:grid-cols-1">

        <!-- Ubin kategori (kolom kiri, bento berselang-seling) -->
        <div class="flex flex-col gap-6 h-full max-md:flex-row max-sm:flex-col">
          <div
            v-for="(cat, i) in categories"
            :key="cat.name"
            :class="[
              'relative cursor-pointer overflow-hidden rounded-lg bg-cover bg-center min-h-45 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1',
              i === 0 ? 'flex-[1.3]' : 'flex-1'
            ]"
            :style="{ backgroundImage: `url(${cat.img})` }"
            @click="openCategoryModal(cat.name)"
          >
            <div class="absolute inset-0 z-0 bg-linear-to-t from-black/60 via-black/10 to-transparent transition-all duration-400 hover:from-black/70 hover:via-black/20"></div>
            <div class="absolute bottom-6 left-6 right-6 z-1 flex flex-col items-start gap-2">
              <span class="rounded-full bg-white/92 px-2.5 py-0.5 font-display text-[0.75rem] font-bold tracking-[0.08em] text-primary">0{{ i + 1 }}</span>
              <span class="font-display text-[1.25rem] font-semibold leading-5 text-white">{{ cat.name }}</span>
              <button
                type="button"
                class="mt-1 inline-flex items-center gap-1.5 border-none bg-transparent p-0 text-[0.6875rem] font-semibold uppercase tracking-wider text-white opacity-90 cursor-pointer group/link"
                @click.stop="openCategoryModal(cat.name)"
              >
                View all
                <span class="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Kartu produk (kolom kanan) -->
        <div class="grid grid-cols-2 grid-rows-2 gap-6">
          <div
            v-for="p in recommended"
            :key="p.id"
            class="group flex cursor-pointer flex-col overflow-hidden rounded-lg border border-border/60 bg-white transition-all duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(0,0,0,0.06)]"
          >
            <div class="relative aspect-5/4 overflow-hidden bg-background">
              <img :src="p.img" :alt="p.name" loading="lazy" class="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110" />

              <!-- Tombol Wishlist (konsisten dengan bagian Shop) -->
              <button
                :class="[
                  'absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border-none backdrop-blur-sm transition-all duration-300 shadow-sm cursor-pointer',
                  isInWishlist(p.id)
                    ? 'bg-red-500 text-white opacity-100'
                    : 'bg-white/90 text-text opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-500'
                ]"
                :aria-label="isInWishlist(p.id) ? 'Remove from wishlist' : 'Add to wishlist'"
                @click.stop="toggleWishlist(p)"
              >
                <Heart class="h-4 w-4" :fill="isInWishlist(p.id) ? 'currentColor' : 'none'" />
              </button>
            </div>
            <div class="flex flex-1 flex-col gap-1 px-4.5 pt-4 pb-5">
              <span class="text-[0.625rem] font-bold uppercase tracking-widest text-primary">{{ p.category }}</span>
              <h4 class="text-[0.9375rem] font-semibold leading-5 text-text">{{ p.name }}</h4>
              <div class="mt-auto flex items-center justify-between pt-2.5">
                <span class="font-display text-[1.0625rem] font-bold text-text">${{ p.price.toFixed(2) }}</span>

                <!-- Tombol Tambah ke Keranjang (sama dengan bagian Shop: pill melebar + konfirmasi centang) -->
                <button
                  @click.stop="handleAddToCart(p)"
                  :class="[
                    'group/btn relative flex h-9 items-center justify-center overflow-hidden rounded-full border cursor-pointer transition-all duration-300 ease-out active:scale-90',
                    addedIds.has(p.id)
                      ? 'w-9 border-primary bg-primary text-white shadow-[0_6px_16px_rgba(0,0,0,0.16)]'
                      : 'w-9 border-text/15 bg-transparent text-text shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:w-22 hover:border-primary hover:bg-primary hover:text-white hover:shadow-[0_6px_16px_rgba(0,0,0,0.16)]'
                  ]"
                  aria-label="Add to cart"
                >
                  <Transition name="icon-swap" mode="out-in">
                    <Check v-if="addedIds.has(p.id)" key="check" class="h-4 w-4 shrink-0" />
                    <Plus v-else key="plus" class="h-4 w-4 shrink-0 transition-transform duration-300 group-hover/btn:rotate-90" />
                  </Transition>
                  <span
                    v-if="!addedIds.has(p.id)"
                    class="ml-0 max-w-0 overflow-hidden whitespace-nowrap text-[0.7rem] font-semibold opacity-0 transition-all duration-300 group-hover/btn:ml-1 group-hover/btn:max-w-14 group-hover/btn:opacity-100"
                  >
                    Add
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Modal "Lihat Semua" Kategori -->
    <Teleport to="body">
      <Transition name="fade" appear>
        <div
          v-if="activeCategoryModal"
          class="fixed inset-0 z-110 flex items-center justify-center bg-black/45 backdrop-blur-md px-6 max-sm:px-4"
        >
          <Transition name="modal-pop" appear>
            <div
              v-if="activeCategoryModal"
              class="relative flex w-full max-w-190 max-h-[85vh] flex-col overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
            >
              <!-- Header Modal -->
              <div class="flex items-center justify-between border-b border-border/70 px-6 py-5 max-sm:px-4">
                <div>
                  <span class="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-primary">Category</span>
                  <h3 class="font-display text-xl font-bold text-text leading-tight">{{ activeCategoryModal }}</h3>
                </div>
                <button
                  @click="closeCategoryModal"
                  aria-label="Close"
                  class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-none bg-background text-text-muted hover:bg-primary hover:text-white transition-colors"
                >
                  <X :size="18" />
                </button>
              </div>

              <!-- Grid Produk Modal -->
              <div class="flex-1 overflow-y-auto px-6 py-6 max-sm:px-4">
                <div
                  v-if="activeCategoryProducts.length"
                  class="grid grid-cols-3 gap-4 max-sm:grid-cols-2"
                >
                  <div
                    v-for="p in activeCategoryProducts"
                    :key="p.id"
                    class="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(0,0,0,0.08)]"
                  >
                    <div class="relative aspect-square overflow-hidden bg-background">
                      <img :src="p.img" :alt="p.name" loading="lazy" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <button
                        :class="[
                          'absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full border-none backdrop-blur-sm transition-all duration-300 shadow-sm cursor-pointer',
                          isInWishlist(p.id)
                            ? 'bg-red-500 text-white opacity-100'
                            : 'bg-white/90 text-text opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-500'
                        ]"
                        :aria-label="isInWishlist(p.id) ? 'Remove from wishlist' : 'Add to wishlist'"
                        @click.stop="toggleWishlist(p)"
                      >
                        <Heart class="h-3.5 w-3.5" :fill="isInWishlist(p.id) ? 'currentColor' : 'none'" />
                      </button>
                    </div>
                    <div class="flex flex-1 flex-col gap-1 px-3.5 pt-3 pb-4">
                      <span class="text-[0.5625rem] font-bold uppercase tracking-[0.08em] text-primary">{{ p.category }}</span>
                      <h4 class="text-[0.8125rem] font-semibold leading-4.5 text-text line-clamp-1">{{ p.name }}</h4>
                      <div class="mt-auto flex items-center justify-between pt-2">
                        <span class="font-display text-sm font-bold text-text">${{ p.price.toFixed(2) }}</span>

                        <!-- Tombol Tambah ke Keranjang (sama dengan Shop, ukuran kompak untuk grid modal) -->
                        <button
                          @click.stop="handleAddToCart(p)"
                          :class="[
                            'group/btn relative flex h-7 items-center justify-center overflow-hidden rounded-full border cursor-pointer transition-all duration-300 ease-out active:scale-90',
                            addedIds.has(p.id)
                              ? 'w-7 border-primary bg-primary text-white shadow-[0_4px_12px_rgba(0,0,0,0.14)]'
                              : 'w-7 border-text/20 bg-transparent text-text hover:w-19 hover:border-primary hover:bg-primary hover:text-white hover:shadow-[0_4px_12px_rgba(0,0,0,0.14)]'
                          ]"
                          aria-label="Add to cart"
                        >
                          <Transition name="icon-swap" mode="out-in">
                            <Check v-if="addedIds.has(p.id)" key="check" class="h-3.5 w-3.5 shrink-0" />
                            <Plus v-else key="plus" class="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover/btn:rotate-90" />
                          </Transition>
                          <span
                            v-if="!addedIds.has(p.id)"
                            class="ml-0 max-w-0 overflow-hidden whitespace-nowrap text-[0.65rem] font-semibold opacity-0 transition-all duration-300 group-hover/btn:ml-1 group-hover/btn:max-w-12 group-hover/btn:opacity-100"
                          >
                            Add
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- State kosong saat kategori belum punya produk -->
                <div v-else class="flex flex-col items-center justify-center py-14 text-center">
                  <p class="text-sm text-text-muted">No products available for this category yet.</p>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>

  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Heart, Plus, Check, X } from 'lucide-vue-next'
import { useCart } from '@/composables/useCart.js'
import { useWishlist } from '@/composables/useWishlist.js'

const { addToCart } = useCart()
const { isInWishlist, toggleWishlist } = useWishlist()

const categories = [
  {
    name: 'Bedroom Furniture',
    img: '/images/bedroom/bedroom2.webp'
  },
  {
    name: 'Living Room Furniture',
    img: '/images/living-room.webp'
  },
  {
    name: 'Dining Room Furniture',
    img: '/images/dining-room.webp'
  },
]

const recommended = [
  {
    id: 1,
    name: 'Bright Lounge Armchair',
    category: 'Chair',
    price: 87.00,
    img: '/images/chair/chair.webp'
  },
  {
    id: 2,
    name: 'Cloud Comfort Sofa',
    category: 'Sofa',
    price: 278.00,
    img: '/images/sofa/sofa2.webp'
  },
  {
    id: 3,
    name: 'Walnut Coffee Table',
    category: 'Table',
    price: 145.00,
    img: '/images/table/table4.webp'
  },
  {
    id: 4,
    name: 'Sunshine Accent Chair',
    category: 'Chair',
    price: 189.00,
    img: '/images/chair/chair2.webp'
  }
]

// Data produk per kategori untuk popup "Lihat semua"
const categoryProducts = {
  'Bedroom Furniture': [
    { id: 101, name: 'Nordic Oak Bed Frame', category: 'Bed', price: 420.00, img: '/images/bedroom/bedroom3.webp' },
    { id: 102, name: 'Linen Upholstered Headboard', category: 'Bed', price: 210.00, img: '/images/bedroom/bedroom4.webp' },
    { id: 103, name: 'Bedside Table Duo', category: 'Table', price: 95.00, img: '/images/table/table3.webp' },
  ],
  'Living Room Furniture': [
    { id: 201, name: 'Cloud Comfort Sofa', category: 'Sofa', price: 278.00, img: '/images/sofa/sofa3.webp' },
    { id: 202, name: 'Aurora Velvet Sofa', category: 'Sofa', price: 349.00, img: '/images/sofa/sofa2.webp' },
    { id: 203, name: 'Bright Lounge Armchair', category: 'Chair', price: 87.00, img: '/images/chair/chair.webp' },
    { id: 204, name: 'Walnut Coffee Table', category: 'Table', price: 145.00, img: '/images/table/table2.webp' },
  ],
  'Dining Room Furniture': [
    { id: 301, name: 'Golden Column Side Table', category: 'Table', price: 89.00, img: '/images/table/table4.webp' },
    { id: 302, name: "Funct'il Shell Dining Chair", category: 'Chair', price: 168.00, img: '/images/chair/chair2.webp' },
    { id: 303, name: 'Cascade Pendant Lamp', category: 'Table', price: 233.00, img: '/images/table/table5.webp' },
  ],
}

const activeCategoryModal = ref(null)

const activeCategoryProducts = computed(() =>
  activeCategoryModal.value ? (categoryProducts[activeCategoryModal.value] || []) : []
)

const openCategoryModal = (name) => {
  activeCategoryModal.value = name
}
const closeCategoryModal = () => {
  activeCategoryModal.value = null
}

// --- Umpan balik tombol Tambah ke Keranjang (sesuai perilaku bagian Shop) ---
const addedIds = ref(new Set())

function handleAddToCart(product) {
  addToCart(product)
  addedIds.value = new Set(addedIds.value).add(product.id)
  setTimeout(() => {
    const next = new Set(addedIds.value)
    next.delete(product.id)
    addedIds.value = next
  }, 1200)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-pop-enter-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-pop-leave-active {
  transition: all 0.2s ease-in;
}
.modal-pop-enter-from,
.modal-pop-leave-to {
  opacity: 0;
  transform: scale(0.94) translateY(12px);
}

/* Pergantian ikon Tambah ke Keranjang (sesuai bagian Shop) */
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
</style>