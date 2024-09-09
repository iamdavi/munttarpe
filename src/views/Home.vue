<template>
  <v-row justify="center" align="center" class="h-screen">
    <v-col md="6" sm="12">
      <HomeIcon />
    </v-col>
    <v-col md="6" sm="12"> </v-col>
  </v-row>
  <div>
    <h1>Home</h1>
    <p>{{ userStore.userData?.email }}</p>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script setup>
import { useUserStore } from "../stores/user";
import HomeIcon from "@/components/icons/HomeIcon.vue";

const userStore = useUserStore();
</script>
