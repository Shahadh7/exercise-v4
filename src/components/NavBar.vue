<template>
  <nav class="fixed w-full z-10 backdrop-blur-md rounded shadow">
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

        <div class="hidden sm:flex sm:space-x-8 sm:items-center">
          <a
            class="font-medium hover:cursor-pointer hover:font-extrabold hover:underline underline-offset-4"
            :class="isActiveClass('/login')"
            @click="navigateTo('/login')"
            >Login</a
          >
          <a
            class="font-medium hover:cursor-pointer hover:font-extrabold hover:underline underline-offset-4"
            :class="isActiveClass('/register')"
            @click="navigateTo('/register')"
            >Register</a
          >
        </div>

        <div class="flex items-center sm:hidden">
          <button
            @click="toggleMenu"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-600 focus:outline-none"
          >
            <font-awesome-icon :icon="openMenu ? 'times' : 'bars'" class="text-2xl" />
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="openMenu"
      class="backdrop-blur-3xl sm:hidden px-2 pt-2 pb-3 space-y-1 h-52 mx-2 rounded-2xl"
    >
      <a
        class="block font-medium hover:cursor-pointer hover:font-extrabold underline-offset-4 my-3"
        :class="isActiveClass('/register')"
        @click="navigateTo('/register')"
        >Register</a
      >

      <a
        class="block font-medium hover:cursor-pointer hover:font-extrabold underline-offset-4"
        :class="isActiveClass('/login')"
        @click="navigateTo('/login')"
        >Login</a
      >
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
  return isActive(path) ? 'text-pink-000 font-bolder' : 'text-gray-700'
}

const navigateTo = (path) => {
  router.push(path)
  openMenu.value = false
}
</script>
