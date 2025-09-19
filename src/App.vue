<script setup>
import JSONLab from './components/JSONLab.vue'
import BHeader from './components/BHeader.vue'
import LibraryRegistrationForm from './views/HomeView.vue'
</script>

<template>
  <header>
    <BHeader />
  </header>

  <main class="main-box">
    <!-- <JSONLab /> -->
     <RouterView></RouterView>
  </main>
</template>

<style scoped>

</style>
