<template>
  <v-app-bar class="px-3" :absolute="true">
    <v-img
      class="mx-2"
      :src="logo"
      max-height="30"
      max-width="30"
      contain
    ></v-img>
    <v-app-bar-title> Munttarpe </v-app-bar-title>
    <!--
    <nav v-if="!userStore.loadingSession">
      <router-link to="/" v-if="userStore.userData">Home</router-link> |
      <router-link to="/login" v-if="!userStore.userData">Login</router-link> |
      <router-link to="/register" v-if="!userStore.userData"
        >Register</router-link
      >
      |
      <button @click="userStore.logoutUser" v-if="userStore.userData">
        Logout
      </button>
    </nav>
-->
    <v-spacer></v-spacer>

    <v-btn
      :icon="
        theme.global.current.value.dark
          ? 'mdi-weather-night'
          : 'mdi-weather-sunny'
      "
      @click="onClick"
    ></v-btn>
    <v-divider class="mx-3" vertical></v-divider>
    <v-btn icon="mdi-login" to="/login"></v-btn>
  </v-app-bar>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { useTheme } from "vuetify";
import logo from "@/assets/munttarpe_logo.svg";

const userStore = useUserStore();
const theme = useTheme();

function onClick() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}
</script>
