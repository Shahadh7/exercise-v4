<template>
  <div>
    <span class="loader"></span>
  </div>
</template>
<script setup></script>
<style scoped>
.loader {
  width: 14px;
  height: 14px;
  border: 5px solid #fff;
  border-bottom-color: #ffed48;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
