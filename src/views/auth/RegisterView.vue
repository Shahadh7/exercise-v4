<template>
  <div class="min-h-screen flex items-center justify-center bg-cover bg-center">
    <div class="px-10 py-20 rounded-2xl backdrop-blur-md shadow-lg text-black">
      <h1 class="text-4xl sm:text-5xl font-light mb-14 text-center mx-4">
        Welcome to <span class="font-bold">myApp</span>
        <hr class="w-20 sm:w-40 my-5 mx-auto border-2" />
      </h1>

      <form @submit.prevent="handleRegister" class="space-y-5">
        <div class="grid grid-cols-3 items-center" :class="errors.user_id ? 'mb-2' : ''">
          <label for="userId" class="col-span-1 text-sm font-medium">User ID*</label>
          <input
            type="text"
            id="userId"
            v-model="formData.user_id"
            class="col-span-2 px-3 py-2 border border-gray-300 rounded text-sm bg-white/90 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <div class="grid grid-cols-3" v-if="errors.user_id">
          <div class="col-span-1"></div>
          <div class="col-span-2 text-sm">
            <p class="text-red-500 m-0">{{ errors.user_id }}</p>
          </div>
        </div>

        <div class="grid grid-cols-3 items-center relative" :class="errors.password ? 'mb-2' : ''">
          <label for="password" class="col-span-1 text-sm font-medium">Password*</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="formData.password"
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
        <div class="grid grid-cols-3" v-if="errors.password">
          <div class="col-span-1"></div>
          <div class="col-span-2 text-sm">
            <p class="text-red-500 m-0">{{ errors.password }}</p>
          </div>
        </div>

        <div
          class="grid grid-cols-3 items-center relative"
          :class="errors.password_confirmation ? 'mb-2' : ''"
        >
          <label for="confirm-password" class="col-span-1 text-sm font-medium"
            >Confirm Password*</label
          >
          <input
            :type="showConfirmPassword ? 'text' : 'password'"
            id="confirm-password"
            v-model="formData.password_confirmation"
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

        <div class="grid grid-cols-3" v-if="errors.password_confirmation">
          <div class="col-span-1"></div>
          <div class="col-span-2 text-sm">
            <p class="text-red-500 m-0">{{ errors.password_confirmation }}</p>
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
import { ref, reactive } from 'vue'
import { registerSchema } from '@/validations/validationSchemas'
import axios from '@/axios'
import { useRouter } from 'vue-router'
import { showToast } from '@/stores/toast.js'

const formData = ref({
  user_id: '',
  password: '',
  password_confirmation: '',
  remember_me: false,
})

const errors = reactive({})
const router = useRouter()
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}

const handleRegister = async () => {
  // Reset previous errors
  Object.keys(errors).forEach((key) => delete errors[key])

  try {
    await registerSchema.validate(formData.value, { abortEarly: false })

    await axios.get('/sanctum/csrf-cookie')

    await axios.post('/api/register', {
      user_id: formData.value.user_id,
      password: formData.value.password,
      password_confirmation: formData.value.password_confirmation,
    })
    showToast('Registration successful! You can now log in.', 'success')
    router.push('/login')
  } catch (err) {
    if (err.name === 'ValidationError') {
      err.inner.forEach((e) => {
        errors[e.path] = e.message
      })
    } else if (err.response?.data?.errors) {
      const serverErrors = err.response.data.errors
      for (const key in serverErrors) {
        errors[key] = serverErrors[key][0]
      }
    } else {
      errors.message = err.response?.data?.message || 'Registration failed.'
    }
  }
}
</script>
