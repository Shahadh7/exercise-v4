<template>
  <div class="grid grid-cols-12 mt-5 lg:mt-28 mx-4 mb-4">
    <div class="col-span-12 gap-4 items-baseline block lg:flex">
      <h2 class="text-3xl md:text-4xl mb-3 lg:mb-0 font-light">
        Additional <span class="font-bold">Details</span>
      </h2>
      <button class="underline text-pink-800 hover:text-blue-900">
        <router-link to="/profile/additional-details/edit">Edit Additional Details</router-link>
        <font-awesome-icon icon="fa-solid fa-pencil" class="ms-2" />
      </button>
    </div>
    <div class="col-span-12 mt-5">
      <div class="backdrop-blur-md drop-shadow-2xl shadow-md rounded-lg p-6 mt-4">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 sm:col-span-10 ps-10">
            <div class="mb-3">
              <p class="mb-2 font-bold">Home address <span class="text-red-600">*</span></p>
              <p>{{ additionalDetails.homeAddress || 'N/A' }}</p>
            </div>
            <div class="mb-3">
              <p class="mb-2 font-bold">Country <span class="text-red-600">*</span></p>
              <p>{{ additionalDetails.country || 'N/A' }}</p>
            </div>
            <div class="mb-3">
              <p class="mb-2 font-bold">Postal code <span class="text-red-600">*</span></p>
              <p>{{ additionalDetails.postalCode || 'N/A' }}</p>
            </div>
            <div class="mb-3">
              <p class="mb-2 font-bold">Date of birth</p>
              <p>{{ additionalDetails.dob || 'N/A' }}</p>
            </div>
            <div class="mb-3">
              <p class="mb-2 font-bold">Gender</p>
              <p>{{ additionalDetails.gender || 'N/A' }}</p>
            </div>
            <div class="mb-3">
              <p class="mb-2 font-bold">Marital status</p>
              <p>{{ additionalDetails.maritalStatus || 'N/A' }}</p>
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

const additionalDetails = ref({
  homeAddress: '',
  country: '',
  postalCode: '',
  dob: '',
  gender: '',
  maritalStatus: '',
})

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
      console.error('Additional details not found: Please add additional details.')
    } else {
      console.error('Error fetching additional details:', err)
    }
  }
}

onMounted(() => {
  fetchAdditionalDetails()
})
</script>
<style scoped></style>
