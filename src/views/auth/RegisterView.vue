<template>
  <div class="min-h-screen flex items-center justify-center bg-cover bg-center">
    <div class="px-10 py-20 rounded-2xl backdrop-blur-md shadow-lg text-black">
      <h1 class="text-4xl sm:text-5xl font-light mb-14 text-center mx-4">
        Welcome to <span class="font-bold">myApp</span>
        <hr class="w-20 sm:w-40 my-5 mx-auto border-2" />
      </h1>

      <form @submit.prevent="handleRegister" class="space-y-5">
        <div class="grid grid-cols-3 items-center">
          <label for="userId" class="col-span-1 text-sm font-medium">User ID*</label>
          <input
            type="text"
            id="userId"
            v-model="userId"
            class="col-span-2 px-3 py-2 border border-gray-300 rounded text-sm bg-white/90 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <div class="grid grid-cols-3 items-center relative">
          <label for="password" class="col-span-1 text-sm font-medium">Password*</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="password"
            class="col-span-2 px-3 py-2 border border-gray-300 rounded text-sm bg-white/90 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <button
            type="button"
            @click="togglePassword"
            class="absolute right-3 top-[10px] text-gray-600 text-sm"
          >
            <font-awesome-icon
              :icon="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"
              class="cursor-pointer"
            />
          </button>
        </div>

        <div class="grid grid-cols-3 items-center relative">
          <label for="confirm-password" class="col-span-1 text-sm font-medium"
            >Confirm Password*</label
          >
          <input
            :type="showConfirmPassword ? 'text' : 'password'"
            id="confirm-password"
            v-model="confirmPassword"
            class="col-span-2 px-3 py-2 border border-gray-300 rounded text-sm bg-white/90 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <button
            type="button"
            @click="toggleConfirmPassword"
            class="absolute right-3 top-[10px] text-gray-600 text-sm"
          >
            <font-awesome-icon
              :icon="showConfirmPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"
              class="cursor-pointer"
            />
          </button>
        </div>

        <div class="grid grid-cols-3 items-center">
          <div class="col-span-1"></div>
          <div class="col-span-2 flex items-center text-sm">
            <input
              type="checkbox"
              id="rememberMe"
              v-model="rememberMe"
              class="h-4 w-4 text-black border-gray-400 rounded mr-2"
            />
            <label for="rememberMe" class="text-black">Keep me logged in</label>
          </div>
        </div>

        <div class="grid grid-cols-3">
          <div class="col-span-1"></div>
          <div class="col-span-2">
            <button
              type="submit"
              class="w-2/5 bg-black text-white font-semibold py-2 rounded hover:bg-gray-800"
            >
              REGISTER
            </button>
          </div>
        </div>

        <div class="grid grid-cols-3">
          <div class="col-span-3 text-sm mt-2">
            Already have an account?
            <a @click="$router.push('/login')" class="underline hover:text-gray-800 cursor-pointer">
              Login here.
            </a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const userId = ref('')
const password = ref('')
const confirmPassword = ref('')

const rememberMe = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}

const handleRegister = () => {
  console.log('UserID:', userId.value)
  console.log('Password:', password.value)
  console.log('Keep me logged in:', rememberMe.value)
}
</script>
`
