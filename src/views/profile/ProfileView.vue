<template>
  <div class="grid grid-cols-12 mt-5 sm:mt-28 mx-4">
    <div class="col-span-12 flex gap-4 items-baseline">
      <h2 class="text-3xl md:text-4xl font-light">My <span class="font-bold">Profile</span></h2>
      <button class="underline text-pink-800 hover:text-blue-900">
        <router-link to="/profile/edit">Edit Profile</router-link>
      </button>
    </div>
    <div class="col-span-12">
      <div class="backdrop-blur-md shadow-md rounded-lg p-6 mt-4">
        <div class="flex items-center mb-4">
          <img src="" alt="User Avatar" class="w-16 h-16 rounded-full mr-4" v-if="imageAvailable" />
          <font-awesome-icon icon="user" class="text-black-400 mr-4 text-9xl" v-else />
          <div>
            <h3 class="text-xl font-semibold">John Doe</h3>
            <p class="text-gray-600"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const imageAvailable = ref(false)
</script>
<style scoped></style>
