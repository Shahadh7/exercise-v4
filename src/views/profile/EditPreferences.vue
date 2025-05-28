<template>
  <div class="grid grid-cols-12 mt-5 lg:mt-28 mx-4">
    <div class="col-span-12 block lg:flex gap-4 items-baseline">
      <h2 class="text-3xl md:text-4xl mb-3 lg:mb-0 font-light">
        Edit <span class="font-bold">Personal Preference</span>
      </h2>
      <button class="underline text-pink-800 hover:text-blue-900">
        <font-awesome-icon icon="fa-solid fa-caret-left" class="me-2" />
        <router-link to="/profile/personal-preferences">Go back to Personal Preference</router-link>
      </button>
    </div>
    <div class="col-span-12 mt-5">
      <div class="backdrop-blur-md drop-shadow-2xl shadow-md rounded-lg p-6 mt-4">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 lg:col-span-10">
            <div class="mb-4">
              <label for="hobbies" class="block mb-2 font-bold">Hobbies and interests</label>
              <AddToArrayInput
                name="hobbies"
                v-model="preferences.hobbies"
                placeholder="Type and press enter or click + button"
                width="w-full lg:w-3/6"
                @update:model-value="preferences.hobbies = $event"
              />
              <p class="text-red-500 m-0" v-if="formErrors.hobbies">{{ formErrors.hobbies }}</p>
            </div>
            <div class="mb-4">
              <label for="sports" class="block mb-2 font-bold">Favourite sport(s)</label>
              <AddToArrayInput
                name="sports"
                v-model="preferences.favouriteSports"
                placeholder="Type and press enter or click + button"
                width="w-full lg:w-3/6"
                @update:model-value="preferences.favouriteSports = $event"
              />
              <p class="text-red-500 m-0" v-if="formErrors.favorite_sports">
                {{ formErrors.favorite_sports }}
              </p>
            </div>
            <div class="mb-4">
              <label for="music-pref" class="block mb-2 font-bold">Preferred music genre(s)</label>
              <AddToArrayInput
                name="music-pref"
                v-model="preferences.preferredMusicGenre"
                placeholder="Type and press enter or click + button"
                width="w-full lg:w-3/6"
                @update:model-value="preferences.preferredMusicGenre = $event"
              />
              <p class="text-red-500 m-0" v-if="formErrors.preferred_music_genre">
                {{ formErrors.preferred_music_genre }}
              </p>
            </div>
            <div class="mb-4">
              <label for="show-pref" class="block mb-2 font-bold">Preferred movie/TV show(s)</label>
              <AddToArrayInput
                name="show-pref"
                v-model="preferences.preferredMoviesTv"
                placeholder="Type and press enter or click + button"
                width="w-full lg:w-3/6"
                @update:model-value="preferences.preferredMoviesTv = $event"
              />
              <p class="text-red-500 m-0" v-if="formErrors.preferred_movie_tv_show">
                {{ formErrors.preferred_movie_tv_show }}
              </p>
            </div>
            <div class="mt-8">
              <div class="w-full lg:w-3/6 flex gap-4">
                <button
                  @click="updatePreferences"
                  class="w-1/2 flex gap-3 items-center justify-center bg-black text-xs text-white font-semibold py-2 rounded hover:cursor-pointer hover:bg-gray-800 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
                >
                  <Spinner class="inline" v-if="proccessing" />
                  SAVE & UPDATE
                </button>
                <button
                  class="w-1/2 bg-gray-200 text-black text-xs font-semibold hover:cursor-pointer py-2 rounded hover:bg-gray-300 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
                  @click="$router.push('/profile/personal-preferences')"
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
import { onMounted, ref } from 'vue'
import axios from '@/axios'
import { showToast } from '@/stores/toast'
import { useRouter } from 'vue-router'
import AddToArrayInput from '@/components/AddToArrayInput.vue'
import Spinner from '@/components/Spinner.vue'

const router = useRouter()

const preferences = ref({
  hobbies: [],
  favouriteSports: [],
  preferredMusicGenre: [],
  preferredMoviesTv: [],
})

const formErrors = ref({})
const proccessing = ref(false)

const fetchPreferences = async () => {
  try {
    await axios.get('/sanctum/csrf-cookie')

    const response = await axios.get('/api/preferences')
    if (response.data) {
      preferences.value = {
        hobbies: response.data.hobbies,
        favouriteSports: response.data.favorite_sports,
        preferredMusicGenre: response.data.preferred_music_genre,
        preferredMoviesTv: response.data.preferred_movie_tv_show,
      }
    }
  } catch (err) {
    if (err.response && err.response.status === 404) {
      console.error('Profile details not found: Please create a profile first.')
    } else {
      showToast(err.response?.data?.message || 'Failed to fetch preferences.', 'error')
    }
  }
}

const updatePreferences = async () => {
  formErrors.value = {}
  proccessing.value = true
  try {
    await axios.get('/sanctum/csrf-cookie')

    const response = await axios.put('/api/preferences', {
      hobbies: preferences.value.hobbies,
      favorite_sports: preferences.value.favouriteSports,
      preferred_music_genre: preferences.value.preferredMusicGenre,
      preferred_movie_tv_show: preferences.value.preferredMoviesTv,
    })
    showToast(response.data.message, 'success')
    router.push('/profile/personal-preferences')
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
  proccessing.value = false
}

onMounted(() => {
  fetchPreferences()
})
</script>
<style scoped></style>
