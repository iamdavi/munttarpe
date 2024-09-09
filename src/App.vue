<template>
  <v-app>
    <Navbar />
    <v-main class="py-0">
      <v-container class="h-screen">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
</script>
