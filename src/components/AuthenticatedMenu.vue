<template>
  <nav class="fixed z-10 w-full backdrop-blur-md rounded shadow">
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <img
            src="/logo.png"
            alt="logo"
            class="h-3/5 hover:cursor-pointer"
            @click="$router.push('/login')"
          />
        </div>

        <div class="flex items-center">
          <button
            @click="toggleMenu"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-600 focus:outline-none"
          >
            <font-awesome-icon :icon="openMenu ? 'times' : 'bars'" class="text-2xl" />
          </button>
        </div>
      </div>
    </div>

    <div v-if="openMenu" class="px-2 py-6 space-y-1 h-64 mx-2 rounded-2xl">
      <hr />
      <a
        class="block font-medium hover:cursor-pointer my-3 mx-3"
        :class="isActiveClass('/home')"
        @click="navigateTo('/home')"
        >Home</a
      >
      <hr />
      <a
        class="block font-medium hover:cursor-pointer my-3 mx-3"
        :class="isActiveClass('/profile/basic-details')"
        @click="navigateTo('/profile/basic-details')"
        >My Profile</a
      >
      <hr />
      <a
        class="block font-medium hover:cursor-pointer my-3 mx-3"
        :class="isActiveClass('/profile/edit')"
        @click="navigateTo('/profile/edit')"
        >Edit Profile</a
      >
      <hr />
      <a class="block font-medium hover:cursor-pointer my-3 mx-3" @click="navigateTo('/login')"
        >Logout</a
      >
      <hr />
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const openMenu = ref(false)
const route = useRoute()
const router = useRouter()

const toggleMenu = () => {
  openMenu.value = !openMenu.value
}

const isActive = (path) => {
  return route.path === path
}
const isActiveClass = (path) => {
  return isActive(path) ? 'text-pink-900 font-bolder' : 'text-black-700'
}

const navigateTo = (path) => {
  router.push(path)
  openMenu.value = false
}
</script>
