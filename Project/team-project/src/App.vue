<script setup>
import { RouterLink, RouterView } from "vue-router";
import Header from "@/components/Header.vue";
</script>

<template>
  <Header />
  <main class="main-content">
    <div style="margin-top: 10px; width: 90%">
      <router-view />
    </div>
  </main>
</template>

<style scoped>
.main-content {
  padding-top: 6%;
  padding-bottom: 6%;
  width: 100%;
  min-height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  background-color: #f9fafb;
}
</style>
