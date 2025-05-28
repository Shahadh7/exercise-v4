<template>
  <div class="grid grid-cols-12 mt-5 sm:mt-28 mx-4">
    <div class="col-span-12 flex gap-4 items-baseline">
      <h2 class="text-3xl md:text-4xl font-light">
        Personal <span class="font-bold">Preferences</span>
      </h2>
      <button class="underline text-pink-800 hover:text-blue-900">
        <router-link to="/profile/personal-preferences/edit">Edit Spouse Details</router-link>
      </button>
    </div>
    <div class="col-span-12 mt-5">
      <div class="backdrop-blur-md drop-shadow-2xl shadow-md rounded-lg p-6 mt-4">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 sm:col-span-10 ps-10">
            <div :class="preferences.hobbies ? 'mb-3' : 'mb-10'">
              <p class="mb-2 font-bold">Hobbies and interests</p>
              <p>{{ preferences.hobbies }}</p>
            </div>
            <div :class="preferences.favorite_sports ? 'mb-3' : 'mb-10'">
              <p class="mb-2 font-bold">Favourite sports</p>
              <p>{{ preferences.favorite_sports }}</p>
            </div>
            <div :class="preferences.preferred_music_genre ? 'mb-3' : 'mb-10'">
              <p class="mb-2 font-bold">Preferred music genres</p>
              <p>{{ preferences.preferred_music_genre }}</p>
            </div>
            <div :class="preferences.preferred_movie_tv_show ? 'mb-3' : 'mb-10'">
              <p class="mb-2 font-bold">Preferred movie/TV shows</p>
              <p>{{ preferences.preferred_movie_tv_show }}</p>
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
        hobbies: response.data.hobbies,
        favoriteSports: response.data.favorite_sports,
        preferredMusicGenre: response.data.preferred_music_genre,
        preferredMovieTvShow: response.data.preferred_movie_tv_show,
      }
    }
  } catch (err) {
    if (err.response && err.response.status === 404) {
      console.error('Preferences details not found: Please create a preferences first.')
    } else {
      console.error('Error fetching preferences details:', err)
    }
  }
}

onMounted(() => {
  fetchPreferences()
})
</script>
<style scoped></style>
