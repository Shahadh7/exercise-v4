<template>
  <div class="grid grid-cols-12 mt-5 lg:mt-28 mx-4">
    <div class="col-span-12 block lg:flex gap-4 items-baseline">
      <h2 class="text-3xl md:text-4xl mb-3 lg:mb-0 font-light">
        Spouse <span class="font-bold">Details</span>
      </h2>
      <button class="underline text-pink-800 hover:text-blue-900">
        <router-link to="/profile/spouse-details/edit">Edit Spouse Details</router-link>
        <font-awesome-icon icon="fa-solid fa-pencil" class="ms-2" />
      </button>
    </div>
    <div class="col-span-12 mt-5">
      <div class="backdrop-blur-md drop-shadow-2xl shadow-md rounded-lg p-6 mt-4">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 sm:col-span-10 ps-10">
            <div class="mb-3">
              <p class="mb-2 font-bold">Salutation</p>
              <p>{{ spouseDetails.salutation || 'N/A' }}</p>
            </div>
            <div class="mb-3">
              <p class="mb-2 font-bold">First name</p>
              <p>{{ spouseDetails.firstName || 'N/A' }}</p>
            </div>
            <div class="mb-3">
              <p class="mb-2 font-bold">Last name</p>
              <p>{{ spouseDetails.lastName || 'N/A' }}</p>
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

const spouseDetails = ref({
  salutation: '',
  firstName: '',
  lastName: '',
})

const fetchSpouseDetails = async () => {
  try {
    await axios.get('/sanctum/csrf-cookie')

    const response = await axios.get('/api/spouse')
    if (response.data) {
      spouseDetails.value = {
        salutation: response.data.salutation,
        firstName: response.data.first_name,
        lastName: response.data.last_name,
      }
    }
  } catch (err) {
    if (err.response && err.response.status === 404) {
      console.error('Spouse details not found: Please add spouse details.')
    } else {
      showToast({
        type: 'error',
        message: 'Failed to fetch spouse details. Please try again later.',
      })
    }
  }
}

onMounted(() => {
  fetchSpouseDetails()
})
</script>
<style scoped></style>
