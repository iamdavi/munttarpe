<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import login from "@/assets/img/login.jpg";

const userStore = useUserStore();

const email = ref("bluuweb1@test.com");
const password = ref("123123");

const handleSubmit = async () => {
  if (!email.value || password.value.length < 6) {
    return alert("llena los campos correctamente");
  }
  await userStore.loginUser(email.value, password.value);
};
</script>

<template>
  <v-row class="h-100" align="center" justify="center">
    <v-col lg="4" md="6" sm="12">
      <v-card variant="tonal">
        <v-img
          class="align-end text-white"
          position="top"
          height="200"
          :src="login"
          gradient="to right top, rgb(9,73,4), rgba(9,73,4,50%)"
          cover
        >
          <v-card-title class="text-h5 pb-0"> Inicia sesión </v-card-title>
          <v-card-subtitle class="white-space-unset mb-2">
            Accede al panel desde el que podrás administrar el contenido de la
            página
          </v-card-subtitle>
        </v-img>
        <v-form class="h-100 d-flex flex-column" @submit.prevent="handleSubmit">
          <v-card-text class="pb-1">
            <v-text-field
              type="email"
              label="Email"
              placeholder="Ingrese email"
              variant="underlined"
              v-model.trim="email"
            ></v-text-field>
            <v-text-field
              type="password"
              label="Contraseña"
              placeholder="********"
              variant="underlined"
              v-model.trim="password"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn
              type="submit"
              variant="tonal"
              block
              :loading="userStore.loadingUser"
            >
              Acceder
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>
