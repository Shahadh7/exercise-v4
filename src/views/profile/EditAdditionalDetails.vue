<template>
  <div class="grid grid-cols-12 mt-5 lg:mt-28 mx-4 mb-4">
    <div
      class="col-span-12 gap-4 items-baseline block lg:flex"
      role="region"
      aria-label="Edit additional details header"
    >
      <h2 class="text-3xl md:text-4xl mb-3 lg:mb-0 font-light">
        Edit <span class="font-bold">Additional Details</span>
      </h2>
      <button
        class="underline text-pink-800 hover:text-blue-900"
        aria-label="Go back to Additional Details"
      >
        <font-awesome-icon
          icon="fa-solid fa-caret-left"
          class="me-2"
          aria-hidden="true"
          focusable="false"
        />
        <router-link to="/profile/additional-details" role="link"
          >Go back to Additional Details</router-link
        >
      </button>
    </div>
    <div class="col-span-12 mt-5">
      <div
        class="backdrop-blur-md drop-shadow-2xl shadow-md rounded-lg p-6 mt-4"
        role="form"
        aria-labelledby="form-title"
      >
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
                aria-required="true"
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
                aria-required="true"
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
                aria-required="true"
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
                aria-required="false"
              />
              <p class="text-red-500 m-0" v-if="formErrors.dob">{{ formErrors.dob }}</p>
            </div>
            <div class="mb-4">
              <fieldset>
                <legend class="mb-2 font-bold">Gender</legend>
                <div class="flex items-center" role="radiogroup" aria-label="Gender">
                  <input
                    type="radio"
                    v-model="additionalDetails.gender"
                    id="male"
                    name="gender"
                    value="Male"
                    class="h-5 w-5 me-2 appearance-none rounded-full border border-gray-400 checked:bg-black checked:border-transparent focus:outline-none focus:ring-2 focus:ring-white transition-all"
                  />
                  <label for="male" class="me-4">Male</label>

                  <input
                    type="radio"
                    v-model="additionalDetails.gender"
                    id="female"
                    name="gender"
                    value="Female"
                    class="h-5 w-5 me-2 appearance-none rounded-full border border-gray-400 checked:bg-black checked:border-transparent focus:outline-none focus:ring-2 focus:ring-white transition-all"
                  />
                  <label for="female">Female</label>
                </div>
              </fieldset>
              <p class="text-red-500 m-0" v-if="formErrors.gender">{{ formErrors.gender }}</p>
            </div>
            <div class="mb-4">
              <fieldset>
                <legend class="mb-2 font-bold">Marital status</legend>
                <div class="flex items-center" role="radiogroup" aria-label="Marital status">
                  <input
                    type="radio"
                    v-model="additionalDetails.maritalStatus"
                    id="single"
                    name="marital"
                    value="Single"
                    class="h-5 w-5 me-2 appearance-none rounded-full border border-gray-400 checked:bg-black checked:border-transparent focus:outline-none focus:ring-2 focus:ring-white transition-all"
                  />
                  <label for="single" class="me-4">Single</label>

                  <input
                    type="radio"
                    v-model="additionalDetails.maritalStatus"
                    id="married"
                    name="marital"
                    value="Married"
                    class="h-5 w-5 me-2 appearance-none rounded-full border border-gray-400 checked:bg-black checked:border-transparent focus:outline-none focus:ring-2 focus:ring-white transition-all"
                  />
                  <label for="married">Married</label>
                </div>
              </fieldset>
            </div>
            <div class="mt-8">
              <div class="w-full lg:w-3/6 flex gap-4">
                <button
                  @click="updateProfile"
                  class="w-1/2 flex gap-3 items-center justify-center bg-black text-white text-xs font-semibold py-2 rounded hover:cursor-pointer hover:bg-gray-800 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
                  aria-label="Save and update additional details"
                >
                  <Spinner class="inline" v-if="proccessing" />
                  SAVE & UPDATE
                </button>
                <button
                  class="w-1/2 bg-gray-200 text-black text-xs font-semibold hover:cursor-pointer py-2 rounded hover:bg-gray-300 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
                  @click="$router.push('/profile/additional-details')"
                  aria-label="Cancel and go back to additional details"
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
import Spinner from '@/components/Spinner.vue'

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
const proccessing = ref(false)

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
  proccessing.value = true
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
  proccessing.value = false
}

onMounted(() => {
  fetchAdditionalDetails()
})
</script>
<style scoped></style>
