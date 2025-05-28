<template>
  <span
    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
    :class="chipClass"
  >
    <slot>{{ label }}</slot>
    <button
      v-if="closable"
      @click="emitClose"
      class="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
      aria-label="Remove"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </span>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  closable: {
    type: Boolean,
    default: false,
  },
  chipClass: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['close'])

const emitClose = () => {
  emit('close')
}
</script>
