<template>
  <div class="main-bg" role="main" aria-label="Main Application Background">
    <AuthenticatedMenu aria-label="Authenticated Navigation Menu" />
    <div class="sm:px-4 flex flex-col min-h-screen" role="region" aria-label="Main Content Layout">
      <div class="grid grid-cols-12">
        <div class="col-span-12 lg:col-span-3 xl:col-span-2">
          <SideBar class="h-full mt-20 lg:mt-34" aria-label="Side Navigation Menu" />
        </div>
        <div class="col-span-12 lg:col-span-9 xl:col-span-10">
          <RouterView v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </RouterView>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AuthenticatedMenu from '../AuthenticatedMenu.vue'
import SideBar from '../SideBar.vue'
</script>
<style scoped>
.main-bg {
  min-height: 100vh;
  background-image: url('/bg-02.webp');
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
