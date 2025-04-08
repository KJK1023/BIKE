<script setup>
import { RouterLink, RouterView } from "vue-router";
import Header from "./components/Header.vue";
</script>

<template>
  <Header />
  <main class="main-content">
    <div style="margin-top: 10px">
      <router-view />
    </div>
  </main>
</template>

<style scoped>
.main-content {
  padding-top: 80px;
  width: 100vw;
  min-height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  background-color: #f9fafb;
}
</style>
