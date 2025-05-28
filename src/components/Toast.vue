<template>
  <transition name="fade" mode="out-in">
    <div
      v-if="visible"
      :class="[
        'fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 px-4 py-3 rounded shadow-lg text-white transition-all duration-300',
        toastClass,
      ]"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const props = defineProps({
  message: String,
  type: {
    type: String,
    default: 'info', // 'success', 'error', 'warning'
  },
  duration: {
    type: Number,
    default: 3000, // milliseconds
  },
})

const visible = ref(true)
let timeoutId

const toastClass = computed(() => {
  switch (props.type) {
    case 'success':
      return 'bg-green-500'
    case 'error':
      return 'bg-red-500'
    case 'warning':
      return 'bg-yellow-500 text-black'
    default:
      return 'bg-blue-500'
  }
})

onMounted(() => {
  timeoutId = setTimeout(() => {
    visible.value = false
  }, props.duration)
})

onBeforeUnmount(() => {
  clearTimeout(timeoutId)
})
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
</style>
