<template>
  <v-app-bar flat :color="isTransparent ? 'transparent' : undefined">
    <router-link to="/">
      <v-img
        class="mx-2"
        to="/"
        :src="logo"
        height="30"
        width="30"
        contain
      ></v-img>
    </router-link>
    <v-app-bar-title to="/"> Munttarpe </v-app-bar-title>
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
    <!--<v-divider class="mx-3" vertical></v-divider>-->
    <v-btn icon="mdi-login" to="/login"></v-btn>
  </v-app-bar>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useUserStore } from "@/stores/user";
import { useTheme } from "vuetify";
import logo from "@/assets/munttarpe_logo.svg";

const userStore = useUserStore();
const theme = useTheme();
const isTransparent = ref(true);

function onScrollTrans(e) {
  isTransparent.value = !(e.target.documentElement.scrollTop > 200);
}

onBeforeMount(() => {
  window.addEventListener("scroll", onScrollTrans);
});

function onClick() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}
</script>
