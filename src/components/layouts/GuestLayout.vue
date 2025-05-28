<template id="GuestLayout">
  <div class="main-bg">
    <NavBar />
    <div class="mx-auto sm:px-4flex flex-col items-center justify-center">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </div>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import { RouterView } from 'vue-router'
</script>

<style scoped>
.main-bg {
  min-height: 100vh;
  background-image: url('/bg-01.webp');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
