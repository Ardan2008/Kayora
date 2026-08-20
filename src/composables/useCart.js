import { ref, computed } from 'vue'

const cartItems = ref([])
const isCartOpen = ref(false)
const isCartBouncing = ref(false)
const toastMessage = ref('')
const toastProduct = ref(null)
const isToastVisible = ref(false)
let toastTimer = null

export function useCart() {
  const addToCart = (product) => {
    // Normalize fields for consistency across the app (cart, wishlist, toast, etc.)
    const normalized = {
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img || product.image, // fallback from 'image' to 'img'
      category: product.category || product.desc || '',
    }

    const existing = cartItems.value.find(item => item.id === normalized.id)
    if (existing) {
      existing.quantity++
    } else {
      cartItems.value.push({ ...normalized, quantity: 1 })
    }

    isCartBouncing.value = true
    setTimeout(() => { isCartBouncing.value = false }, 400)

    toastMessage.value = `${normalized.name} added to cart`
    toastProduct.value = normalized

    isToastVisible.value = false
    requestAnimationFrame(() => {
      isToastVisible.value = true
    })

    clearTimeout(toastTimer)
    toastTimer = setTimeout(() => { isToastVisible.value = false }, 3000)
  }

  const dismissToast = () => {
    clearTimeout(toastTimer)
    isToastVisible.value = false
  }

  const updateQuantity = (id, delta) => {
    const item = cartItems.value.find(i => i.id === id)
    if (item) {
      item.quantity += delta
      if (item.quantity <= 0) {
        removeFromCart(id)
      }
    }
  }

  const removeFromCart = (id) => {
    cartItems.value = cartItems.value.filter(i => i.id !== id)
  }

  const isInCart = (id) => {
    return cartItems.value.some(item => item.id === id)
  }

  const totalCartCount = computed(() => {
    return cartItems.value.reduce((acc, item) => acc + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return cartItems.value.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  })

  return {
    cartItems,
    isCartOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    isInCart,
    totalCartCount,
    totalPrice,
    isCartBouncing,
    toastMessage,
    toastProduct,
    isToastVisible,
    dismissToast
  }
}