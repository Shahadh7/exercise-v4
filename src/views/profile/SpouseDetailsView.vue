<template>
  <div class="grid grid-cols-12 mt-5 sm:mt-28 mx-4">
    <div class="col-span-12 block lg:flex gap-4 items-baseline">
      <h2 class="text-3xl md:text-4xl mb-3 lg:mb-0 font-light">
        Spouse <span class="font-bold">Details</span>
      </h2>
      <button class="underline text-pink-800 hover:text-blue-900">
        <router-link to="/profile/spouse-details/edit">Edit Spouse Details</router-link>
      </button>
    </div>
    <div class="col-span-12 mt-5">
      <div class="backdrop-blur-md drop-shadow-2xl shadow-md rounded-lg p-6 mt-4">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 sm:col-span-10 ps-10">
            <div :class="spouseDetails.salutation ? 'mb-3' : 'mb-10'">
              <p class="mb-2 font-bold">Salutation</p>
              <p>{{ spouseDetails.salutation }}</p>
            </div>
            <div :class="spouseDetails.firstName ? 'mb-3' : 'mb-10'">
              <p class="mb-2 font-bold">First name</p>
              <p>{{ spouseDetails.firstName }}</p>
            </div>
            <div :class="spouseDetails.lastName ? 'mb-3' : 'mb-10'">
              <p class="mb-2 font-bold">Last name</p>
              <p>{{ spouseDetails.lastName }}</p>
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
      console.error('Spouse details not found: Please create a spouse first.')
    } else {
      console.error('Error fetching spouse details:', err)
    }
  }
}

onMounted(() => {
  fetchSpouseDetails()
})
</script>
<style scoped></style>
