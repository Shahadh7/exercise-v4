<template>
  <div class="grid grid-cols-12 mt-5 sm:mt-28 mx-4">
    <div class="col-span-12 block lg:flex gap-4 items-baseline">
      <h2 class="text-3xl md:text-4xl mb-3 lg:mb-0 font-light">
        Edit <span class="font-bold">Profile</span>
      </h2>
      <button class="underline text-pink-800 hover:text-blue-900">
        <font-awesome-icon icon="fa-solid fa-caret-left" class="me-2" />
        <router-link to="/profile/basic">Go back to My Profile</router-link>
      </button>
    </div>
    <div class="col-span-12 mt-5">
      <div class="backdrop-blur-md drop-shadow-2xl shadow-md rounded-lg p-6 mt-4">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 sm:col-span-2 flex flex-col items-center">
            <div
              class="w-28 h-28 overflow-hidden mb-4 hover:cursor-pointer"
              @click="triggerFileInput"
            >
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
            <button
              class="underline underline-offset-4 hover:cursor-pointer"
              role="button"
              @click="triggerFileInput"
            >
              Upload image
            </button>
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              ref="fileInput"
              @change="handleImageUpload"
              class="hidden"
            />
          </div>
          <div class="col-span-12 sm:col-span-10 ps-10">
            <div class="mb-4">
              <label for="salutation" class="block mb-2 font-bold"
                >Salutation <span class="text-red-600">*</span></label
              >
              <select
                class="w-3/6 px-3 py-2 rounded-xl bg-white/20 focus:outline-none focus:ring-2 focus:ring-gray-500"
                v-model="basicProfileDetails.salutation"
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
              <label for="first-name" class="block mb-2 font-bold"
                >First name <span class="text-red-600">*</span></label
              >
              <input
                type="text"
                v-model="basicProfileDetails.firstName"
                class="w-3/6 px-3 py-2 rounded-xl bg-white/20 focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Enter First Name"
                id="first-name"
                name="first-name"
              />
              <p class="text-red-500 m-0" v-if="formErrors.firstName">{{ formErrors.firstName }}</p>
            </div>
            <div class="mb-4">
              <label for="last-name" class="block mb-2 font-bold"
                >Last name <span class="text-red-600">*</span></label
              >
              <input
                type="text"
                v-model="basicProfileDetails.lastName"
                class="w-3/6 px-3 py-2 rounded-xl bg-white/20 focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Enter Last Name"
                id="last-name"
                name="last-name"
              />
              <p class="text-red-500 m-0" v-if="formErrors.lastName">{{ formErrors.lastName }}</p>
            </div>
            <div class="mb-4">
              <label for="email" class="block mb-2 font-bold"
                >Email address <span class="text-red-600">*</span></label
              >
              <input
                type="email"
                v-model="basicProfileDetails.email"
                class="w-3/6 px-3 py-2 rounded-xl bg-white/20 focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Enter Email Address"
                id="email"
                name="email"
              />
              <p class="text-red-500 m-0" v-if="formErrors.email">{{ formErrors.email }}</p>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 sm:col-span-2"></div>
          <div class="col-span-12 sm:col-span-10 ps-10 mt-4">
            <div class="w-3/6 flex gap-4">
              <button
                @click="updateProfile"
                class="w-1/2 bg-black text-white font-semibold py-2 rounded hover:cursor-pointer hover:bg-gray-800 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
              >
                SAVE & UPDATE
              </button>
              <button
                class="w-1/2 bg-gray-200 text-black font-semibold hover:cursor-pointer py-2 rounded hover:bg-gray-300 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
                @click="$router.push('/profile/basic')"
              >
                Cancel
              </button>
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
import { basicDetailsSchema } from '@/validations/validationSchemas'

const basicProfileDetails = ref({
  salutation: '',
  firstName: '',
  lastName: '',
  email: '',
})

const salutationOptions = ref([
  { value: 'Mr.', text: 'Mr.' },
  { value: 'Ms.', text: 'Ms.' },
  { value: 'Mrs.', text: 'Mrs.' },
  { value: 'Dr.', text: 'Dr.' },
])

const imageAvailable = ref(false)
const imageFile = ref(null)
const formErrors = ref({})
const fileInput = ref(null)

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

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]

  if (file && file.size > 1024 * 1024) {
    imageAvailable.value = false
    showToast('File size should not exceed 1MB.', 'error')
    return
  } else {
    formErrors.value.profileImage = ''
  }

  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      imageFile.value = e.target.result
      imageAvailable.value = true
    }
    reader.readAsDataURL(file)
  }

  console.log('Selected file:', file)
  formErrors.value.profileImage = ''
}

const updateProfile = async () => {
  try {
    await basicDetailsSchema.validate(basicProfileDetails.value, { abortEarly: false })

    await axios.get('/sanctum/csrf-cookie')

    const response = await axios.put('/api/profile/basic', {
      salutation: basicProfileDetails.value.salutation,
      first_name: basicProfileDetails.value.firstName,
      last_name: basicProfileDetails.value.lastName,
      email_address: basicProfileDetails.value.email,
    })
    if (response.data.message) {
      if (fileInput.value.files[0]) {
        await uploadProfileImage()
      }
    }
    showToast(response.data.message, 'success')
  } catch (err) {
    console.error('Error updating profile:', err)
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
      formErrors.value.message = err.response?.data?.message || 'Login failed.'
    }
  }
}

const uploadProfileImage = async () => {
  const imageFormData = new FormData()
  imageFormData.append('profile_image', fileInput.value.files[0])

  try {
    await axios.post('/api/profile/upload', imageFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  } catch (error) {
    console.error('Error uploading image:', error)
  }
}

onMounted(() => {
  fetchProfileDetails()
})
</script>
<style scoped></style>
