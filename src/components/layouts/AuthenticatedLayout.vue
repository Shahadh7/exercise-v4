<template>
  <div class="main-bg">
    <AuthenticatedMenu />
    <div class="container mx-auto sm:px-4 flex flex-col min-h-screen">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </div>
  </div>
</template>

<script setup>
import AuthenticatedMenu from '../AuthenticatedMenu.vue'
</script>
<style scoped>
.main-bg {
  min-height: 100vh;
  background-image: url('/bg-02.png');
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
