<template>
  <span
    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
    :class="chipClass"
    :aria-label="label"
  >
    <slot>{{ label }}</slot>
    <button
      v-if="closable"
      @click="emitClose"
      class="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
      aria-label="Remove"
      :aria-label="`Remove ${label}`"
    >
      <font-awesome-icon icon="times" class="text-xs" role="img" aria-label="Close icon" />
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
