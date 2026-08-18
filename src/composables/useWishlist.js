import { ref, computed } from 'vue'

// Singleton state — dishare ke semua komponen yang import useWishlist()
const wishlistItems = ref([])

export function useWishlist() {
  const isInWishlist = (id) => {
    return wishlistItems.value.some(item => item.id === id)
  }

  const toggleWishlist = (product) => {
    const idx = wishlistItems.value.findIndex(item => item.id === product.id)
    if (idx > -1) {
      wishlistItems.value.splice(idx, 1)
    } else {
      wishlistItems.value.push({ ...product })
    }
  }

  const removeFromWishlist = (id) => {
    wishlistItems.value = wishlistItems.value.filter(item => item.id !== id)
  }

  const clearWishlist = () => {
    wishlistItems.value = []
  }

  const totalWishlistCount = computed(() => wishlistItems.value.length)

  return {
    wishlistItems,
    isInWishlist,
    toggleWishlist,
    removeFromWishlist,
    clearWishlist,
    totalWishlistCount
  }
}