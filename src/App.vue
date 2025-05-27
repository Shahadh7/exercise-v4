<script setup>
import { RouterView } from 'vue-router'
import Toast from '@/components/Toast.vue'
import { toast } from '@/stores/toast.js'
</script>

<template>
  <RouterView v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </RouterView>
  <Toast v-if="toast.show" :message="toast.message" :type="toast.type" :duration="toast.duration" />
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
