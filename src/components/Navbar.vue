<template>
  <v-app-bar :flat="!drawer" :color="isTransparent ? 'transparent' : undefined">
    <!-- ICON & TEXT -->
    <router-link to="/" v-if="!userStore.userData">
      <v-img
        class="mx-2"
        to="/"
        :src="logo"
        height="30"
        width="30"
        contain
      ></v-img>
    </router-link>
    <v-app-bar-nav-icon
      v-else
      variant="text"
      @click="drawer = !drawer"
    ></v-app-bar-nav-icon>
    <!-- /ICON -->

    <!-- TITLE -->
    <v-app-bar-title to="/"> Munttarpe </v-app-bar-title>
    <!-- /TITLE -->
    <!--
      <v-select
      icon="mdi-translate"
      :max-width="125"
      v-model="current"
      :items="langs"
      variant="underlined"
    ></v-select> -->
    <v-menu location="bottom end">
      <template v-slot:activator="{ props }">
        <v-btn icon="mdi-translate" v-bind="props"></v-btn>
      </template>

      <v-list density="compact" nav>
        <v-list-subheader class="font-weight-black">IDIOMAS</v-list-subheader>
        <v-list-item
          v-for="item in langs"
          :key="item.value"
          :value="item"
          color="primary"
          :active="item.value == current"
          class="py-0"
          @click="changeLang(item.value)"
        >
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn
      :icon="
        theme.global.current.value.dark
          ? 'mdi-weather-night'
          : 'mdi-weather-sunny'
      "
      @click="changeTheme"
    ></v-btn>
    <v-btn v-if="!userStore.userData" icon="mdi-login" to="/login"></v-btn>
    <v-btn v-else icon="mdi-logout" @click="userStore.logoutUser"></v-btn>
  </v-app-bar>
  <!-- LOGGED IN SECTIONS -->
  <v-navigation-drawer
    v-if="userStore.userData"
    class="h-screen"
    v-model="drawer"
    temporary
    :width="300"
  >
    <v-list>
      <v-list-item :title="userStore.userData.email">
        <template v-slot:prepend>
          <v-avatar color="surface-variant">
            {{ userStore.userData.email.charAt(0).toUpperCase() }}
          </v-avatar>
        </template>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :value="item.value"
        color="green-darken-1"
        :to="item.link"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title v-text="item.title"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <!-- /LOGGED IN SECTIONS -->
</template>

<script setup>
import { ref, watch, onBeforeMount } from "vue";
import { useUserStore } from "@/stores/user";
import { useTheme, useLocale } from "vuetify";
import logo from "@/assets/munttarpe_logo.svg";

const userStore = useUserStore();
const theme = useTheme();

const isTransparent = ref(true);
const drawer = ref(false);
const group = ref(null);
const items = ref([
  {
    title: "Inicio",
    value: "inicio",
    link: "/",
    icon: "mdi-home",
  },
  {
    title: "Equipos",
    value: "equipos",
    link: "/equipos",
    icon: "mdi-account-group",
  },
  {
    title: "Jugadores",
    value: "jugadores",
    link: "/jugadores",
    icon: "mdi-handball",
  },
  {
    title: "Eventos",
    value: "eventos",
    link: "/eventos",
    icon: "mdi-calendar-multiselect",
  },
  {
    title: "Multas",
    value: "multas",
    link: "/multas",
    icon: "mdi-invoice-text-outline",
  },
  {
    title: "Noticias",
    value: "noticias",
    link: "/noticias",
    icon: "mdi-newspaper",
  },
]);

const { current } = useLocale();
const langs = [
  { title: "Español", value: "es" },
  { title: "Euskera", value: "eu" },
];

watch(group, () => {
  drawer.value = false;
});

function onScrollTrans(e) {
  isTransparent.value = !(e.target.documentElement.scrollTop > 50);
}

onBeforeMount(() => {
  window.addEventListener("scroll", onScrollTrans);
});

const changeLang = (newVal) => {
  current.value = newVal;
};

const changeTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
};
</script>
