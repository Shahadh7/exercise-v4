<template>
  <div class="grid grid-cols-12 mt-5 lg:mt-28 mx-4">
    <div class="col-span-12 block lg:flex gap-4 items-baseline">
      <h2 class="text-3xl md:text-4xl mb-3 lg:mb-0 font-light">
        Personal <span class="font-bold">Preferences</span>
      </h2>
      <button class="underline text-pink-800 hover:text-blue-900">
        <router-link to="/profile/personal-preferences/edit">Edit Presonal Preferences</router-link>
        <font-awesome-icon icon="fa-solid fa-pencil" class="ms-2" />
      </button>
    </div>
    <div class="col-span-12 mt-5">
      <div class="backdrop-blur-md drop-shadow-2xl shadow-md rounded-lg p-6 mt-4">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 sm:col-span-10 ps-10">
            <div class="mb-3">
              <p class="mb-2 font-bold">Hobbies and interests</p>
              <template v-if="preferences.hobbies.length !== 0">
                <Chip
                  v-for="(hobby, index) in preferences.hobbies"
                  :key="index"
                  :label="hobby"
                  class="mb-2 me-2"
                  chipClass="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm"
                />
              </template>
              <template v-else>
                <p class="text-gray-500">No hobbies or interests added yet.</p>
              </template>
            </div>
            <div class="mb-3">
              <p class="mb-2 font-bold">Favourite sports</p>
              <template v-if="preferences.favorite_sports.length !== 0">
                <Chip
                  v-for="(sport, index) in preferences.favorite_sports"
                  :key="index"
                  :label="sport"
                  class="mb-2 me-2"
                  chipClass="bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm"
                />
              </template>
              <template v-else>
                <p class="text-gray-500">No favorite sports added yet.</p>
              </template>
            </div>
            <div class="mb-3">
              <p class="mb-2 font-bold">Preferred music genres</p>
              <template v-if="preferences.preferred_music_genre.length !== 0">
                <Chip
                  v-for="(genre, index) in preferences.preferred_music_genre"
                  :key="index"
                  :label="genre"
                  class="mb-2 me-2"
                  chipClass="bg-purple-100 text-purple-800 px-4 py-1 rounded-full text-sm"
                />
              </template>
              <template v-else>
                <p class="text-gray-500">No preferred music genres added yet.</p>
              </template>
            </div>
            <div class="mb-3">
              <p class="mb-2 font-bold">Preferred movie/TV shows</p>
              <template v-if="preferences.preferred_movie_tv_show.length !== 0">
                <Chip
                  v-for="(show, index) in preferences.preferred_movie_tv_show"
                  :key="index"
                  :label="show"
                  class="mb-2 me-2"
                  chipClass="bg-yellow-100 text-yellow-800 px-4 py-1 rounded-full text-sm"
                />
              </template>
              <template v-else>
                <p class="text-gray-500">No preferred movie/TV shows added yet.</p>
              </template>
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
import Chip from '@/components/Chip.vue'
import { showToast } from '@/stores/toast'

const preferences = ref({
  hobbies: [],
  favorite_sports: [],
  preferred_music_genre: [],
  preferred_movie_tv_show: [],
})

const fetchPreferences = async () => {
  try {
    await axios.get('/sanctum/csrf-cookie')

    const response = await axios.get('/api/preferences')
    if (response.data) {
      preferences.value = {
        hobbies: response.data.hobbies || [],
        favorite_sports: response.data.favorite_sports || [],
        preferred_music_genre: response.data.preferred_music_genre || [],
        preferred_movie_tv_show: response.data.preferred_movie_tv_show || [],
      }
    }
  } catch (err) {
    if (err.response && err.response.status === 404) {
      console.error('Preferences details not found: Please add preferences.')
    } else {
      showToast({
        message: 'Failed to fetch preferences. Please try again later.',
        type: 'error',
      })
    }
  }
}

onMounted(() => {
  fetchPreferences()
})
</script>
<style scoped></style>
