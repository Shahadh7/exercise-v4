<template>
  <nav class="text-black p-4">
    <ul class="flex sm:flex-col sm:space-y-4 space-y-0 sm:space-x-8 sm:space-x-0 sm:w-56 w-full">
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
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const isActiveClass = (path) => {
  return route.path === path ? 'font-bold md:border-b-4 md:border-black-300' : 'text-gray-600'
}

const tabs = [
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
    name: 'Spouse Details',
    icon: 'fa-solid fa-heart',
    path: '/profile/spouse-details',
  },
  {
    name: 'Personal Preferences',
    icon: 'fa-solid fa-cog',
    path: '/profile/personal-preferences',
  },
]

const navigateTo = (tab) => {
  router.push(tab.path)
}
</script>
