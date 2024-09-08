<template>
  <v-responsive>
    <v-app :theme="theme">
      <v-app-bar class="px-3" :absolute="true">
        <nav v-if="!userStore.loadingSession">
          <router-link to="/" v-if="userStore.userData">Home</router-link> |
          <router-link to="/login" v-if="!userStore.userData">Login</router-link> |
          <router-link to="/register" v-if="!userStore.userData">Register</router-link> |
          <button @click="userStore.logoutUser" v-if="userStore.userData">Logout</button>
        </nav>
        <v-spacer></v-spacer>

        <v-btn :prepend-icon="theme.global.current.value.dark ? 'mdi-weather-night' : 'mdi-weather-sunny'"
          text="Toggle Theme" slim @click="onClick"></v-btn>
      </v-app-bar>

      <v-main>
        <v-container>
          <router-view></router-view>
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<script setup>
import { useUserStore } from './stores/user'
import { useTheme } from 'vuetify'

const userStore = useUserStore()
const theme = useTheme()

function onClick() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>