<template>
  <div class="grid grid-cols-12 mt-5 lg:mt-28 mx-4 mb-4">
    <div class="col-span-12 gap-4 items-baseline block lg:flex">
      <h2 class="text-3xl md:text-4xl mb-3 lg:mb-0 font-light">
        Edit <span class="font-bold">Additional Details</span>
      </h2>
      <button class="underline text-pink-800 hover:text-blue-900">
        <font-awesome-icon icon="fa-solid fa-caret-left" class="me-2" />
        <router-link to="/profile/additional-details">Go back to Additional Details</router-link>
      </button>
    </div>
    <div class="col-span-12 mt-5">
      <div class="backdrop-blur-md drop-shadow-2xl shadow-md rounded-lg p-6 mt-4">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 sm:col-span-10">
            <div class="mb-4">
              <label for="homeAddress" class="block mb-2 font-bold"
                >Home address <span class="text-red-600">*</span></label
              >
              <input
                type="text"
                v-model="additionalDetails.homeAddress"
                class="w-full lg:w-3/6 px-3 py-2 rounded-xl bg-white/20 focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Enter Home Address"
                id="homeAddress"
                name="homeAddress"
              />
              <p class="text-red-500 m-0" v-if="formErrors.homeAddress">
                {{ formErrors.homeAddress }}
              </p>
            </div>
            <div class="mb-4">
              <label for="country" class="block mb-2 font-bold"
                >Country <span class="text-red-600">*</span></label
              >
              <input
                type="text"
                v-model="additionalDetails.country"
                class="w-full lg:w-3/6 px-3 py-2 rounded-xl bg-white/20 focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Enter Country"
                id="country"
                name="country"
              />
              <p class="text-red-500 m-0" v-if="formErrors.country">{{ formErrors.country }}</p>
            </div>
            <div class="mb-4">
              <label for="postal-code" class="block mb-2 font-bold"
                >Postal Code <span class="text-red-600">*</span></label
              >
              <input
                type="text"
                v-model="additionalDetails.postalCode"
                class="w-full lg:w-3/6 px-3 py-2 rounded-xl bg-white/20 focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Enter Postal Code"
                id="postal-code"
                name="postal-code"
              />
              <p class="text-red-500 m-0" v-if="formErrors.postalCode">
                {{ formErrors.postalCode }}
              </p>
            </div>
            <div class="mb-4">
              <label for="dob" class="block mb-2 font-bold">Date of birth</label>
              <input
                type="date"
                v-model="additionalDetails.dob"
                class="w-full lg:w-3/6 px-3 py-2 rounded-xl bg-white/20 focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Enter Date of Birth"
                id="dob"
                name="dob"
              />
              <p class="text-red-500 m-0" v-if="formErrors.dob">{{ formErrors.dob }}</p>
            </div>
            <div class="mb-4">
              <p class="mb-2 font-bold">Gender</p>
              <div class="flex items-center">
                <input
                  type="radio"
                  v-model="additionalDetails.gender"
                  class="h-5 w-5 me-2 appearance-none rounded-full border border-gray-400 checked:bg-black checked:border-transparent focus:outline-none focus:ring-2 focus:ring-white transition-all"
                  id="male"
                  name="gender"
                  value="Male"
                />
                <label for="male" class="me-4">Male</label>
                <input
                  type="radio"
                  v-model="additionalDetails.gender"
                  class="h-5 w-5 me-2 appearance-none rounded-full border border-gray-400 checked:bg-black checked:border-transparent focus:outline-none focus:ring-2 focus:ring-white transition-all"
                  id="gender"
                  name="female"
                  value="Female"
                />
                <label for="female">Female</label>
              </div>
              <p class="text-red-500 m-0" v-if="formErrors.gender">{{ formErrors.gender }}</p>
            </div>
            <div class="mb-4">
              <p class="mb-2 font-bold">Marital status</p>
              <div class="flex items-center">
                <input
                  type="radio"
                  v-model="additionalDetails.maritalStatus"
                  class="h-5 w-5 me-2 appearance-none rounded-full border border-gray-400 checked:bg-black checked:border-transparent focus:outline-none focus:ring-2 focus:ring-white transition-all"
                  id="single"
                  name="marital"
                  value="Single"
                />
                <label for="single" class="me-4">Single</label>
                <input
                  type="radio"
                  v-model="additionalDetails.maritalStatus"
                  class="h-5 w-5 me-2 appearance-none rounded-full border border-gray-400 checked:bg-black checked:border-transparent focus:outline-none focus:ring-2 focus:ring-white transition-all"
                  id="married"
                  name="marital"
                  value="Married"
                />
                <label for="married">Married</label>
              </div>
            </div>
            <div class="mt-8">
              <div class="w-full lg:w-3/6 flex gap-4">
                <button
                  @click="updateProfile"
                  class="w-1/2 bg-black text-white text-xs font-semibold py-2 rounded hover:cursor-pointer hover:bg-gray-800 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
                >
                  SAVE & UPDATE
                </button>
                <button
                  class="w-1/2 bg-gray-200 text-black text-xs font-semibold hover:cursor-pointer py-2 rounded hover:bg-gray-300 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
                  @click="$router.push('/profile/additional-details')"
                >
                  CANCEL
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
import { additionalDetailsSchema } from '@/validations/validationSchemas'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const additionalDetails = ref({
  homeAddress: null,
  country: null,
  postalCode: null,
  dob: null,
  gender: null,
  maritalStatus: null,
})

const maritalStatusOptions = computed(() => [
  { value: 'single', label: 'Single' },
  { value: 'married', label: 'Married' },
])

const formErrors = ref({})

const fetchAdditionalDetails = async () => {
  try {
    await axios.get('/sanctum/csrf-cookie')

    const response = await axios.get('/api/profile/additional')
    if (response.data) {
      additionalDetails.value = {
        homeAddress: response.data.home_address,
        country: response.data.country,
        postalCode: response.data.postal_code,
        dob: response.data.dob,
        gender: response.data.gender,
        maritalStatus: response.data.marital_status,
      }
    }
  } catch (err) {
    if (err.response && err.response.status === 404) {
      console.error('Additional details not found: Please create a additional first.')
    } else {
      showToast(err.response?.data?.message || 'Failed to fetch additional details.', 'error')
    }
  }
}

const updateProfile = async () => {
  formErrors.value = {}
  try {
    await additionalDetailsSchema.validate(additionalDetails.value, { abortEarly: false })

    await axios.get('/sanctum/csrf-cookie')

    const response = await axios.put('/api/profile/additional', {
      home_address: additionalDetails.value.homeAddress,
      country: additionalDetails.value.country,
      postal_code: additionalDetails.value.postalCode,
      dob: additionalDetails.value.dob,
      gender: additionalDetails.value.gender,
      marital_status: additionalDetails.value.maritalStatus,
    })
    showToast(response.data.message, 'success')
    if (additionalDetails.value.maritalStatus === 'Married') {
      userStore.isMarried = true
    } else {
      userStore.isMarried = false
    }
    router.push('/profile/additional-details')
  } catch (err) {
    if (err.name === 'ValidationError') {
      err.inner.forEach((e) => {
        formErrors.value[e.path] = e.message
      })
    } else if (err.response?.data?.errors) {
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
  fetchAdditionalDetails()
})
</script>
<style scoped></style>
