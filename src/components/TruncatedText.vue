<template>
  <div
    class="relative block max-w-full"
    @mouseenter="showTooltip = true"
    @mouseleave="showTooltip = false"
  >
    <component
      :is="as"
      ref="textRef"
      :class="[className, 'block truncate whitespace-nowrap overflow-hidden', isOverflowing ? 'cursor-pointer' : '']"
      @click="isOverflowing && (isPinned = !isPinned)"
    >
      {{ text }}
    </component>

    <Transition name="tooltip-fade">
      <div
        v-if="isOverflowing && (showTooltip || isPinned)"
        class="absolute left-0 top-full z-50 mt-1.5 max-w-55 rounded-lg bg-text px-3 py-2 text-[0.6875rem] font-medium leading-snug text-white shadow-lg"
      >
        {{ text }}
        <div class="absolute -top-1 left-4 h-2 w-2 rotate-45 bg-text"></div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'

const props = defineProps({
  text: { type: String, default: '' },
  as: { type: String, default: 'span' },
  className: { type: String, default: '' }
})

const textRef = ref(null)
const isOverflowing = ref(false)
const showTooltip = ref(false)
const isPinned = ref(false)

const checkOverflow = () => {
  const el = textRef.value?.$el || textRef.value
  if (el) isOverflowing.value = el.scrollWidth > el.clientWidth
}

let resizeObserver = null
onMounted(async () => {
  await nextTick()
  checkOverflow()
  const el = textRef.value?.$el || textRef.value
  if (el && window.ResizeObserver) {
    resizeObserver = new ResizeObserver(checkOverflow)
    resizeObserver.observe(el)
  }
  document.addEventListener('click', handleClickOutside)
})
onUnmounted(() => {
  resizeObserver?.disconnect()
  document.removeEventListener('click', handleClickOutside)
})

watch(() => props.text, () => nextTick(checkOverflow))

// klik di luar menutup tooltip yang "disematkan" via tap/klik
const handleClickOutside = (e) => {
  const el = textRef.value?.$el || textRef.value
  if (isPinned.value && el && !el.contains(e.target)) isPinned.value = false
}
</script>

<style scoped>
.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>