<template>
  <v-responsive>
    <v-app>
      <Navbar />
      <v-main class="py-0">
        <v-container class="py-0 h-screen">
          <router-view></router-view>
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<script setup>
import { useTheme } from "vuetify";
import Navbar from "@/components/Navbar.vue";

const theme = useTheme();
</script>
