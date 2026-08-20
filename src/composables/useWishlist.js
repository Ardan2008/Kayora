import { ref, computed } from 'vue'

// Singleton state — shared across all components that import useWishlist()
const wishlistItems = ref([])

export function useWishlist() {
  const isInWishlist = (id) => {
    return wishlistItems.value.some(item => item.id === id)
  }

  const addToWishlist = (product) => {
    // Normalize fields for consistency across the app (wishlist, cart, toast, etc.)
    const normalized = {
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img || product.image, // fallback from 'image' to 'img'
      category: product.category || product.desc || '',
    }

    if (!isInWishlist(normalized.id)) {
      wishlistItems.value.push(normalized)
    }
  }

  const toggleWishlist = (product) => {
    const idx = wishlistItems.value.findIndex(item => item.id === product.id)
    if (idx > -1) {
      wishlistItems.value.splice(idx, 1)
    } else {
      const normalized = {
        id: product.id,
        name: product.name,
        price: product.price,
        img: product.img || product.image,
        category: product.category || product.desc || '',
      }
      wishlistItems.value.push(normalized)
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
    addToWishlist,
    toggleWishlist,
    removeFromWishlist,
    clearWishlist,
    totalWishlistCount
  }
}