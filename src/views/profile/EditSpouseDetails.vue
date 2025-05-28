<template>
  <div class="grid grid-cols-12 mt-5 lg:mt-28 mx-4">
    <div class="col-span-12 block lg:flex gap-4 items-baseline">
      <h2 class="text-3xl md:text-4xl mb-3 lg:mb-0 font-light">
        Edit <span class="font-bold">Spouse Details</span>
      </h2>
      <button class="underline text-pink-800 hover:text-blue-900">
        <font-awesome-icon icon="fa-solid fa-caret-left" class="me-2" />
        <router-link to="/profile/additional-details">Go back to Spouse Details</router-link>
      </button>
    </div>
    <div class="col-span-12 mt-5">
      <div class="backdrop-blur-md drop-shadow-2xl shadow-md rounded-lg p-6 mt-4">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 sm:col-span-10 ps-10">
            <div class="mb-4">
              <label for="salutation" class="block mb-2 font-bold">Salutation</label>
              <select
                class="w-full lg:w-3/6 px-3 py-2 rounded-xl bg-white/20 focus:outline-none focus:ring-2 focus:ring-gray-500"
                v-model="spouseDetails.salutation"
                id="salutation"
                name="salutation"
              >
                <option value="" selected hidden disabled>Select Salutation</option>
                <option v-for="(item, index) in salutationOptions" :key="index" :value="item.value">
                  {{ item.text }}
                </option>
              </select>
            </div>
            <div class="mb-4">
              <label for="firstName" class="block mb-2 font-bold">First name</label>
              <input
                type="text"
                v-model="spouseDetails.firstName"
                class="w-full lg:w-3/6 px-3 py-2 rounded-xl bg-white/20 focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Enter First Name"
                id="firstName"
                name="firstName"
              />
              <p class="text-red-500 m-0" v-if="formErrors.first_name">
                {{ formErrors.first_name }}
              </p>
            </div>
            <div class="mb-4">
              <label for="lastName" class="block mb-2 font-bold">Last name</label>
              <input
                type="text"
                v-model="spouseDetails.lastName"
                class="w-full lg:w-3/6 px-3 py-2 rounded-xl bg-white/20 focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Enter last Name"
                id="lastName"
                name="lastName"
              />
              <p class="text-red-500 m-0" v-if="formErrors.first_name">
                {{ formErrors.last_name }}
              </p>
            </div>
            <div class="mt-8">
              <div class="w-full lg:w-3/6 flex gap-4">
                <button
                  @click="updateSpouseDetails"
                  class="w-1/2 bg-black text-white text-sm font-semibold py-2 rounded hover:cursor-pointer hover:bg-gray-800 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
                >
                  SAVE & UPDATE
                </button>
                <button
                  class="w-1/2 bg-gray-200 text-black text-sm font-semibold hover:cursor-pointer py-2 rounded hover:bg-gray-300 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
                  @click="$router.push('/profile/spouse-details')"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, computed } from 'vue'
import axios from '@/axios'
import { showToast } from '@/stores/toast'
import { useRouter } from 'vue-router'

const router = useRouter()

const spouseDetails = ref({
  firstName: '',
  lastName: '',
  salutation: '',
})

const salutationOptions = ref([
  { value: 'Mr.', text: 'Mr.' },
  { value: 'Ms.', text: 'Ms.' },
  { value: 'Mrs.', text: 'Mrs.' },
])

const formErrors = ref({})

const fetchSpouseDetails = async () => {
  try {
    await axios.get('/sanctum/csrf-cookie')

    const response = await axios.get('/api/spouse')
    if (response.data) {
      spouseDetails.value = {
        firstName: response.data.first_name,
        lastName: response.data.last_name,
        salutation: response.data.salutation,
      }
    }
  } catch (err) {
    if (err.response && err.response.status === 404) {
      console.error('Spouse details not found: Please create a spouse first.')
    } else {
      showToast(err.response?.data?.message || 'Failed to fetch spouse details.', 'error')
    }
  }
}

const updateSpouseDetails = async () => {
  formErrors.value = {}
  try {
    await axios.get('/sanctum/csrf-cookie')

    const response = await axios.put('/api/spouse', {
      first_name: spouseDetails.value.firstName,
      last_name: spouseDetails.value.lastName,
      salutation: spouseDetails.value.salutation,
    })
    showToast(response.data.message, 'success')
    router.push('/profile/spouse-details')
  } catch (err) {
    if (err.response?.data?.errors) {
      const serverErrors = err.response.data.errors
      for (const key in serverErrors) {
        formErrors.value[key] = serverErrors[key][0]
      }
    } else {
      showToast(err.response?.data?.message || 'Update failed.', 'error')
    }
  }
}

onMounted(() => {
  fetchSpouseDetails()
})
</script>
<style scoped></style>
