import { ref, computed } from 'vue'

const cartItems = ref([])
const isCartOpen = ref(false)
const isCartBouncing = ref(false)
const toastMessage = ref('')
const isToastVisible = ref(false)

export function useCart() {
  const addToCart = (product) => {
    const existing = cartItems.value.find(item => item.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      cartItems.value.push({ ...product, quantity: 1 })
    }

    isCartBouncing.value = true
    setTimeout(() => { isCartBouncing.value = false }, 400)

    toastMessage.value = `${product.name} added to cart!`
    isToastVisible.value = true
    setTimeout(() => { isToastVisible.value = false }, 2500)
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
    totalCartCount,
    totalPrice,
    isCartBouncing,
    toastMessage,
    isToastVisible
  }
}