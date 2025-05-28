<template>
  <div class="w-full">
    <input
      v-model="newItem"
      @keyup.enter="addItem"
      type="text"
      :placeholder="placeholder"
      class="px-3 py-2 rounded-xl bg-white/20 focus:outline-none focus:ring-2 focus:ring-gray-500"
      :class="width"
      :name="name"
    />

    <div v-if="items.length" class="mt-3 flex flex-wrap gap-2">
      <span
        v-for="(item, index) in items"
        :key="index"
        class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
      >
        {{ item }}
        <button @click="removeItem(index)" class="ml-2 text-red-500 hover:text-red-700">
          &times;
        </button>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: Array,
  placeholder: {
    type: String,
    default: 'Type something and press Enter',
  },
  width: {
    type: String,
    default: '100%',
  },
  name: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const newItem = ref('')
const items = ref([...props.modelValue])

const addItem = () => {
  const value = newItem.value.trim()
  if (value && !items.value.includes(value)) {
    items.value.push(value)
    emit('update:modelValue', items.value)
  }
  newItem.value = ''
}

const removeItem = (index) => {
  items.value.splice(index, 1)
  emit('update:modelValue', items.value)
}

watch(
  () => props.modelValue,
  (newVal) => {
    items.value = [...newVal]
  },
)
</script>
