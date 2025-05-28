<template>
  <div class="grid grid-cols-12 mt-5 lg:mt-28 mx-4">
    <div
      class="col-span-12 block lg:flex gap-4 items-baseline"
      role="region"
      aria-label="My profile header"
    >
      <h2 class="text-3xl md:text-4xl mb-3 lg:mb-0 font-light">
        My <span class="font-bold">Profile</span>
      </h2>
      <button
        class="underline text-pink-800 hover:text-blue-900"
        aria-label="Edit basic profile details"
      >
        <router-link to="/profile/basic-details/edit" role="link">Edit Profile</router-link>
        <font-awesome-icon
          icon="fa-solid fa-pencil"
          class="ms-2"
          aria-hidden="true"
          focusable="false"
        />
      </button>
    </div>
    <div class="col-span-12 mt-5">
      <div
        class="backdrop-blur-md drop-shadow-2xl shadow-md rounded-lg p-6 mt-4"
        role="region"
        aria-label="Profile details"
      >
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 sm:col-span-2 flex flex-col items-center">
            <div class="w-28 h-28 overflow-hidden mb-4" aria-label="Profile image">
              <img
                v-if="imageAvailable"
                :src="imageFile"
                alt="Profile Image"
                class="w-full h-full object-cover rounded-full"
              />
              <div v-else>
                <font-awesome-icon
                  icon="fa-solid fa-user"
                  class="text-gray-400 text-9xl"
                  aria-hidden="true"
                  focusable="false"
                />
              </div>
            </div>
          </div>
          <div class="col-span-12 sm:col-span-10 ps-10">
            <div class="mb-3">
              <p class="mb-2 font-bold">Salutation <span class="text-red-600">*</span></p>
              <p>{{ basicProfileDetails.salutation || 'N/A' }}</p>
            </div>
            <div class="mb-3">
              <p class="mb-2 font-bold">First name <span class="text-red-600">*</span></p>
              <p>{{ basicProfileDetails.firstName || 'N/A' }}</p>
            </div>
            <div class="mb-3">
              <p class="mb-2 font-bold">Last name <span class="text-red-600">*</span></p>
              <p>{{ basicProfileDetails.lastName || 'N/A' }}</p>
            </div>
            <div class="mb-3">
              <p class="mb-2 font-bold">Email address <span class="text-red-600">*</span></p>
              <p>{{ basicProfileDetails.email || 'N/A' }}.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import axios from '@/axios'
import { showToast } from '@/stores/toast'
import Spinner from '@/components/Spinner.vue'

const basicProfileDetails = ref({
  salutation: '',
  firstName: '',
  lastName: '',
  email: '',
})

const imageAvailable = ref(false)
const imageFile = ref(null)
const errors = ref({})

const fetchProfileDetails = async () => {
  try {
    await axios.get('/sanctum/csrf-cookie')

    const response = await axios.get('/api/profile/basic')
    if (response.data) {
      basicProfileDetails.value = {
        salutation: response.data.salutation,
        firstName: response.data.first_name,
        lastName: response.data.last_name,
        email: response.data.email_address,
      }
      if (response.data.profile_image !== null) {
        imageFile.value = `${import.meta.env.VITE_API_URL}/storage/${response.data.profile_image}`
        imageAvailable.value = true
      } else {
        imageAvailable.value = false
      }
    }
  } catch (err) {
    if (err.response && err.response.status === 404) {
      console.error('Profile details not found: Please add basic details.')
    } else {
      showToast(err.response?.data?.message || 'Failed to fetch profile details.', 'error')
    }
  }
}

onMounted(() => {
  fetchProfileDetails()
})
</script>
<style scoped></style>
