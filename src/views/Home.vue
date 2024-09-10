<template>
  <v-row justify="center" align="center" class="h-screen align-content-center">
    <v-col class="text-center text-md-end" md="6" sm="12">
      <HomeIcon />
    </v-col>
    <v-col md="6" sm="12">
      <h3 class="text-center text-md-start text-h3 font-weight-black">
        Más que
        <br />
        <span class="text-green-munttarpe changingtext"></span>
      </h3>
    </v-col>
  </v-row>
  <!--
  <div>
    <h1>Home</h1>
    <p>{{ userStore.userData?.email }}</p>
  </div>
-->
</template>

<script setup>
import { useUserStore } from "../stores/user";
import HomeIcon from "@/components/icons/HomeIcon.vue";

const userStore = useUserStore();
</script>
