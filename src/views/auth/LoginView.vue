<template>
  <div class="min-h-screen flex items-center justify-center bg-cover bg-center">
    <div class="backdrop-blur-xl px-10 py-20 rounded-2xl shadow-lg text-black bg-white/20">
      <h1 class="text-4xl sm:text-5xl font-light mb-14 text-center mx-4">
        Welcome to <span class="font-bold">myApp</span>
        <hr class="w-20 sm:w-40 my-5 mx-auto border-2" />
      </h1>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <!-- User ID Field -->
        <div class="grid grid-cols-3 items-center" :class="formErrors.user_id ? 'mb-2' : ''">
          <label for="userId" class="col-span-1 text-sm font-medium">User ID*</label>
          <input
            type="text"
            id="userId"
            v-model="formData.user_id"
            :disabled="loading"
            class="col-span-2 px-3 py-2 border border-gray-300 rounded text-sm bg-white/90 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:bg-gray-100"
          />
        </div>
        <div class="grid grid-cols-3" v-if="formErrors.user_id">
          <div class="col-span-1"></div>
          <div class="col-span-2 text-sm">
            <p class="text-red-500 m-0">{{ formErrors.user_id }}</p>
          </div>
        </div>

        <div
          class="grid grid-cols-3 items-center relative"
          :class="formErrors.password ? 'mb-2' : ''"
        >
          <label for="password" class="col-span-1 text-sm font-medium">Password*</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="formData.password"
            :disabled="loading"
            class="col-span-2 px-3 py-2 border border-gray-300 rounded text-sm bg-white/90 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:bg-gray-100"
          />
          <button
            type="button"
            @click="togglePassword"
            :disabled="loading"
            class="absolute right-3 top-[10px] text-gray-600 text-sm disabled:text-gray-400"
          >
            <font-awesome-icon
              :icon="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"
              class="cursor-pointer"
            />
          </button>
        </div>

        <div class="grid grid-cols-3" v-if="formErrors.password">
          <div class="col-span-1"></div>
          <div class="col-span-2 text-sm">
            <p class="text-red-500 m-0">{{ formErrors.password }}</p>
          </div>
        </div>

        <!-- Remember Me Checkbox -->
        <div class="grid grid-cols-3 items-center">
          <div class="col-span-1"></div>
          <div class="col-span-2 flex items-center text-sm">
            <input
              type="checkbox"
              id="rememberMe"
              v-model="formData.remember_me"
              :disabled="loading"
              class="h-4 w-4 text-black border-gray-400 rounded mr-2 disabled:bg-gray-100"
            />
            <label for="rememberMe" class="text-black">Keep me logged in</label>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="grid grid-cols-3">
          <div class="col-span-1"></div>
          <div class="col-span-2">
            <div class="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
              {{ error }}
            </div>
          </div>
        </div>

        <div class="grid grid-cols-3">
          <div class="col-span-1"></div>
          <div class="col-span-2">
            <button
              @click="handleLogin"
              :disabled="loading"
              class="w-2/5 bg-black text-white font-semibold py-2 rounded hover:bg-gray-800 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
            >
              {{ loading ? 'LOGGING IN...' : 'LOGIN' }}
            </button>
          </div>
        </div>

        <div class="grid grid-cols-3">
          <div class="col-span-3 text-sm mt-2">
            No account?
            <a
              @click="$router.push('/register')"
              class="underline hover:text-gray-800 cursor-pointer"
            >
              Register here.
            </a>
          </div>
        </div>
      </form>
      <div class="grid grid-cols-3 mt-5" v-if="formErrors.message">
        <div class="col-span-1"></div>
        <div class="col-span-2 text-sm">
          <p class="text-red-500 m-0">{{ formErrors.message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/axios'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'
import { loginSchema } from '@/validations/validationSchemas'

const router = useRouter()

const formData = ref({
  user_id: '',
  password: '',
  remember_me: false,
})

const showPassword = ref(false)

const loading = ref(false)
const error = ref(null)

const formErrors = ref({})

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const getCsrfToken = async () => {
  try {
    await axios.get('/sanctum/csrf-cookie')
  } catch (error) {
    console.error('Failed to get CSRF token:', error)
  }
}

const checkExistingAuth = () => {
  const token = Cookies.get('auth_token')
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    verifyToken()
  }
}

const verifyToken = async () => {
  try {
    const response = await axios.get('/api/user')
    if (response.data) {
      router.push('/profile')
    }
  } catch (error) {
    removeAuthToken()
  }
}

const removeAuthToken = () => {
  Cookies.remove('auth_token')
  Cookies.remove('user_data')
  delete axios.defaults.headers.common['Authorization']
}

const handleLogin = async () => {
  loading.value = true

  Object.keys(formErrors).forEach((key) => delete formErrors[key])

  try {
    await loginSchema.validate(formData.value, { abortEarly: false })

    await axios.get('/sanctum/csrf-cookie')

    const response = await axios.post('/api/login', formData.value)

    if (response.data.token) {
      Cookies.set('auth_token', response.data.token, {
        expires: rememberMe.value ? 365 : 1, // 1 year or 1 day
        secure: import.meta.env.PROD,
        sameSite: 'Strict',
      })

      router.push('/profile')
    }
  } catch (err) {
    console.error('Login error:', err)
    if (err.name === 'ValidationError') {
      err.inner.forEach((e) => {
        formErrors[e.path] = e.message
      })
    } else if (err.response?.data?.errors) {
      const serverErrors = err.response.data.errors
      for (const key in serverErrors) {
        formErrors[key] = serverErrors[key][0]
      }
    } else {
      formErrors.message = err.response?.data?.message || 'Login failed.'
    }
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await getCsrfToken()
  checkExistingAuth()
})
</script>
