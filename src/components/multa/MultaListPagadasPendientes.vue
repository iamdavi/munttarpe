<template>
  <v-row>
    <v-col cols="12" md="5">
      <h3 class="text-center">
        <v-icon icon="mdi-invoice-clock-outline" size="small"></v-icon>
        Multas pendientes
      </h3>
      <pre>
      {{ databaseStore.multasJugador }}
      </pre>
    </v-col>
    <v-col cols="12" md="2" class="text-center">
      <v-divider class="h-100 border-opacity-100" vertical></v-divider>
    </v-col>
    <v-col cols="12" md="5">
      <h3 class="text-center">
        <v-icon icon="mdi-invoice-check-outline" size="small"></v-icon>
        Multas pagadas
      </h3>
    </v-col>
  </v-row>
</template>

<script setup>
import { onMounted } from "vue";
import { useDatabaseStore } from "@/stores/database";

const databaseStore = useDatabaseStore();

onMounted(() => {
  databaseStore.getMultasJugador();
});
</script>
