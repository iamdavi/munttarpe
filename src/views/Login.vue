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
    <v-col lg="6" md="8" sm="12">
      <v-card variant="tonal">
        <v-row :no-gutters="true">
          <v-col cols="12">
            <v-img
              gradient="to top right, rgba(0,0,0,.33), rgba(62,171,54,.7)"
              :aspect-ratio="9 / 16"
              :src="login"
              min-width="200px"
              min-height="200px"
              max-height="350px"
              cover
            ></v-img>
          </v-col>
          <v-col cols="12">
            <v-form
              class="h-100 d-flex flex-column"
              @submit.prevent="handleSubmit"
            >
              <div>
                <v-card-title class="text-h5"> Inicia sesión </v-card-title>
                <v-card-subtitle class="white-space-unset">
                  Accede al panel desde el que podrás administrar el contenido
                  de la página
                </v-card-subtitle>
              </div>
              <v-card-text>
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
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>
