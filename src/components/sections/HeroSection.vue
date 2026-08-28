<template>
  <!-- Hero -->
  <section id="home" class="grid grid-cols-2 overflow-hidden pt-16 max-md:grid-cols-1">
    <!-- Kiri: Konten -->
    <div class="flex items-center bg-background py-16 pl-16 pr-12 max-md:p-12">
      <div class="max-w-110">
        <span class="mt-2 inline-block rounded-full py-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-primary">Mega Sale Upto 75%</span>

        <h1 class="mb-5 font-display text-[clamp(2.75rem,4.5vw,4.25rem)] font-normal leading-[1.05] tracking-tight text-text">
          Find Your<br>
          Signature Seat
        </h1>

        <p class="mb-4 text-[0.875rem] leading-7 text-text-muted">
          Trending &amp; Best-Selling Furniture Home<br>
          Product Collection.
        </p>

        <a href="#shop" class="inline-flex mb-3 items-center gap-2 rounded-full bg-text px-7 py-3 text-[0.8125rem] font-semibold tracking-widest text-white no-underline transition-all duration-300 hover:bg-primary hover:-translate-y-0.5">
          SHOP NOW
        </a>

        <!-- Statistik -->
        <div class="mt-10 flex items-center gap-4">
          <div class="flex flex-col gap-1 rounded-xl border border-text/20 px-5 py-3">
            <span class="font-display text-[1.875rem] leading-none text-text">567+</span>
            <span class="text-[0.6875rem] leading-5 text-text-muted">Furniture &amp;<br>Home Equipment</span>
          </div>
          <div class="flex flex-col gap-1 rounded-xl border border-text/20 px-5 py-3">
            <span class="font-display text-[1.875rem] leading-none text-text">7k+</span>
            <span class="text-[0.6875rem] leading-5 text-text-muted">Happy Clients<br>More of this</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Kanan: panel diagonal hijau/krem -->
    <div class="relative flex min-h-155 items-center justify-center overflow-hidden bg-background max-md:min-h-120">

        <!-- Bentuk hijau tua -->
        <div class="absolute inset-5 bg-primary [border-radius:28px_28px_28px_260px] max-md:[border-radius:20px_20px_20px_150px]"></div>

        <!-- Daun -->
        <img
          src="/images/pot.webp"
          alt="Decorative plant leaves"
          loading="lazy"
          class="absolute left-1/3 top-[6%] z-10 w-[42%] max-w-50 translate-x-[-38%] drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)] max-md:w-[38%] max-md:top-[8%]"
        />

        <!-- Kursi (juga berganti mengikuti produk aktif agar terasa lebih hidup) -->
        <Transition name="chair-fade" mode="out-in">
          <img
            :key="currentProduct.id"
            :src="currentProduct.image"
            :alt="currentProduct.name"
            loading="lazy"
            class="relative z-20 w-[62%] max-w-90 drop-shadow-[0_18px_28px_rgba(0,0,0,0.28)] max-md:w-[56%]"
          />
        </Transition>

        <!-- Kartu produk (rotasi otomatis) -->
        <div
          class="absolute bottom-20 right-12 z-30 w-80 max-md:right-1/2 max-md:bottom-8 max-md:translate-x-1/2"
          @mouseenter="stopAutoRotate"
          @mouseleave="startAutoRotate"
        >
          <Transition name="product-fade" mode="out-in">
            <div
              :key="currentProduct.id"
              class="relative flex items-center gap-4 rounded-2xl bg-white p-4 shadow-[0_16px_36px_rgba(0,0,0,0.16)]"
            >
              <!-- Tombol Hati Wishlist -->
              <button
                :class="[
                  'absolute -top-2.5 -right-2.5 flex h-8 w-8 items-center justify-center rounded-full border-0 shadow-[0_4px_12px_rgba(0,0,0,0.15)] cursor-pointer outline-none transition-all duration-300 z-10',
                  isInWishlist(currentProduct.id)
                    ? 'bg-red-500 text-white'
                    : 'bg-white text-text-muted hover:bg-red-50 hover:text-red-500'
                ]"
                :aria-label="isInWishlist(currentProduct.id) ? 'Remove from wishlist' : 'Add to wishlist'"
                @click="handleToggleWishlist"
              >
                <Heart
                  :size="15"
                  :fill="isInWishlist(currentProduct.id) ? 'currentColor' : 'none'"
                  stroke-width="1.8"
                />
              </button>

              <div class="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-background">
                <img :src="currentProduct.image" :alt="currentProduct.name" loading="lazy" class="h-full w-full object-cover" />
              </div>

              <div class="min-w-0 flex-1">
                <!-- Rating Bintang via Lucide -->
                <div class="mb-1 flex items-center gap-0.5 text-amber-500">
                  <Star v-for="i in 5" :key="i" class="h-3 w-3 fill-amber-500 stroke-amber-500" />
                </div>
                <p class="truncate text-[0.875rem] font-semibold leading-snug text-text">{{ currentProduct.name }}</p>
                <p class="mt-0.5 truncate text-[0.75rem] text-text-muted">{{ currentProduct.desc }}</p>
              </div>

              <div class="flex shrink-0 flex-col items-end gap-2">
                <p class="text-[0.9375rem] font-bold text-text">${{ currentProduct.price.toFixed(2) }}</p>
                <button
                  class="flex h-8 w-8 items-center justify-center rounded-full border-0 text-white cursor-pointer outline-none transition-all duration-300 hover:bg-primary"
                  :class="isInCart(currentProduct.id) ? 'bg-primary' : 'bg-text'"
                  :aria-label="isInCart(currentProduct.id) ? 'Already in cart' : 'Add to cart'"
                  @click="handleAddToCart"
                >
                  <Transition name="icon-swap" mode="out-in">
                    <Check v-if="isInCart(currentProduct.id)" :key="'check'" :size="16" />
                    <Plus v-else :key="'plus'" :size="16" />
                  </Transition>
                </button>
              </div>
            </div>
          </Transition>

          <!-- Titik progres -->
          <div class="mt-3 flex justify-center gap-1.5">
            <button
              v-for="(product, index) in products"
              :key="product.id"
              class="h-1.5 rounded-full border-0 cursor-pointer p-0 transition-all duration-300"
              :class="index === currentIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/50'"
              :aria-label="`Show ${product.name}`"
              @click="goToIndex(index)"
            />
          </div>
        </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Star, Plus, Check, Heart } from 'lucide-vue-next'
import { useCart } from '@/composables/useCart.js'
import { useWishlist } from '@/composables/useWishlist.js'

const { addToCart, isInCart } = useCart()
const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

const products = ref([
  {
    id: 1,
    name: 'Bright Lounge Armchair',
    desc: 'Cozy and comfortable accent chair',
    price: 87,
    image: '/images/chair/chair.webp'
  },
  {
    id: 2,
    name: 'Modern Living Sofa',
    desc: 'Comfortable contemporary sofa for the living room',
    price: 245,
    image: '/images/sofa/sofa2.webp'
  },
  {
    id: 3,
    name: 'Modern Wooden Coffee Table',
    desc: 'Minimalist coffee table with a warm wooden finish',
    price: 120,
    image: '/images/table/table.webp'
  },
  {
    id: 4,
    name: 'Modern Upholstered Bed',
    desc: 'Elegant upholstered bed with soft neutral bedding',
    price: 420,
    image: '/images/bedroom/bedroom.webp'
  },
])

const currentIndex = ref(0)
const currentProduct = computed(() => products.value[currentIndex.value])

const AUTO_INTERVAL = 3500
let intervalId = null

const startAutoRotate = () => {
  stopAutoRotate()
  intervalId = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % products.value.length
  }, AUTO_INTERVAL)
}

const stopAutoRotate = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

const goToIndex = (index) => {
  currentIndex.value = index
  startAutoRotate()
}

const handleAddToCart = () => {
  addToCart(currentProduct.value)
}

const handleToggleWishlist = () => {
  const product = currentProduct.value

  if (isInWishlist(product.id)) {
    removeFromWishlist(product.id)
  } else {
    addToWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.image,
      category: product.desc || '',
    })
  }
}

onMounted(startAutoRotate)
onUnmounted(stopAutoRotate)
</script>

<style scoped>
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 14s linear infinite;
}

/* Transisi kartu produk */
.product-fade-enter-active,
.product-fade-leave-active {
  transition: opacity 0.45s cubic-bezier(0.4, 0, 0.2, 1), transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
}
.product-fade-enter-from {
  opacity: 0;
  transform: translateY(14px) scale(0.96);
}
.product-fade-leave-to {
  opacity: 0;
  transform: translateY(-14px) scale(0.96);
}

/* Pergantian gambar kursi */
.chair-fade-enter-active,
.chair-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.chair-fade-enter-from {
  opacity: 0;
  transform: scale(0.9);
}
.chair-fade-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

/* Pergantian ikon pada tombol tambah-ke-keranjang */
.icon-swap-enter-active,
.icon-swap-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.icon-swap-enter-from,
.icon-swap-leave-to {
  opacity: 0;
  transform: scale(0.5) rotate(-45deg);
}
</style>