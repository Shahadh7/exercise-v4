<template>
  <nav class="text-black p-4 h-auto">
    <ul class="flex lg:flex-col lg:space-y-4 space-y-0 lg:w-56 w-full">
      <li
        v-for="(tab, index) in tabs"
        :key="index"
        @click="navigateTo(tab)"
        class="cursor-pointer border-b-2 pb-2 sm:pb-4 mx-2"
        :class="[isActiveClass(tab.path)]"
      >
        <font-awesome-icon :icon="tab.icon" class="me-2 text-2xl" />
        {{ tab.name }}
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from '@/axios'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const route = useRoute()
const isMarried = ref(false)
const userStore = useUserStore()

const isActiveClass = (path) => {
  return route.path.startsWith(path)
    ? 'font-bold md:border-b-4 md:border-black-300'
    : 'text-gray-600'
}

const tabs = computed(() => {
  const baseTabs = [
    {
      name: 'Basic Details',
      icon: 'fa-solid fa-user',
      path: '/profile/basic-details',
    },
    {
      name: 'Additional Details',
      icon: 'fa-solid fa-info-circle',
      path: '/profile/additional-details',
    },
    {
      name: 'Personal Preferences',
      icon: 'fa-solid fa-cog',
      path: '/profile/personal-preferences',
    },
  ]

  if (userStore.isMarried) {
    baseTabs.splice(2, 0, {
      name: 'Spouse Details',
      icon: 'fa-solid fa-heart',
      path: '/profile/spouse-details',
    })
  }

  return baseTabs
})

const fetchMaritalStatus = async () => {
  try {
    const response = await axios.get('/api/user/is-married')
    userStore.isMarried = response.data.is_married
  } catch (error) {
    console.error('Error fetching marital status:', error)
  }
}

onMounted(() => {
  fetchMaritalStatus()
})

const navigateTo = (tab) => {
  router.push(tab.path)
}
</script>
