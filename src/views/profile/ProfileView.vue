<template>
  <div class="grid grid-cols-12 mt-5 sm:mt-28 mx-4">
    <div class="col-span-12 flex gap-4 items-baseline">
      <h2 class="text-3xl md:text-4xl font-light">My <span class="font-bold">Profile</span></h2>
      <button class="underline text-pink-800 hover:text-blue-900">
        <router-link to="/profile/edit">Edit Profile</router-link>
      </button>
    </div>
    <div class="col-span-12 mt-5">
      <div class="backdrop-blur-md drop-shadow-2xl shadow-md rounded-lg p-6 mt-4">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 sm:col-span-2 flex flex-col items-center">
            <div class="w-28 h-28 overflow-hidden mb-4">
              <img
                v-if="imageAvailable"
                :src="imageFile"
                alt="Profile Image"
                class="w-full h-full object-cover"
              />
              <div v-else>
                <font-awesome-icon icon="fa-solid fa-user" class="text-gray-400 text-9xl" />
              </div>
            </div>
          </div>
          <div class="col-span-12 sm:col-span-10 ps-10">
            <div :class="basicProfileDetails.salutation ? 'mb-3' : 'mb-10'">
              <p class="mb-2 font-bold">Salutation <span class="text-red-600">*</span></p>
              <p>{{ basicProfileDetails.salutation }}</p>
            </div>
            <div :class="basicProfileDetails.firstName ? 'mb-3' : 'mb-10'">
              <p class="mb-2 font-bold">First name <span class="text-red-600">*</span></p>
              <p>{{ basicProfileDetails.firstName }}</p>
            </div>
            <div :class="basicProfileDetails.lastName ? 'mb-3' : 'mb-10'">
              <p class="mb-2 font-bold">Last name <span class="text-red-600">*</span></p>
              <p>{{ basicProfileDetails.lastName }}</p>
            </div>
            <div :class="basicProfileDetails.email ? 'mb-3' : 'mb-10'">
              <p class="mb-2 font-bold">Email address <span class="text-red-600">*</span></p>
              <p>{{ basicProfileDetails.email }}.</p>
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
      imageFile.value =
        `${import.meta.env.VITE_API_URL}/storage/${response.data.profile_image}` || null
      imageAvailable.value = !!imageFile.value
    }
  } catch (err) {
    if (err.response && err.response.status === 404) {
      console.error('Profile details not found: Please create a profile first.')
    } else {
      console.error('Error fetching profile details:', err)
    }
  }
}

onMounted(() => {
  fetchProfileDetails()
})
</script>
<style scoped></style>
