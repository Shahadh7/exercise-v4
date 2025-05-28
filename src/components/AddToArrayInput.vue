<template>
  <div class="w-full">
    <div class="relative">
      <input
        v-model="newItem"
        @keyup.enter="addItem"
        type="text"
        :placeholder="placeholder"
        class="px-3 py-2 pr-10 w-full rounded-xl bg-white/20 focus:outline-none focus:ring-2 focus:ring-gray-500"
        :name="name"
      />
      <button
        type="button"
        @click="addItem"
        class="absolute top-1/2 -translate-y-1/2 right-3 px-3 py-1 bg-black text-white rounded-lg hover:bg-gray-800 text-md"
      >
        +
      </button>
    </div>

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
