<template>
  <v-row class="mt-container">
    <v-col>
      <div class="d-flex justify-space-between align-center">
        <div class="d-flex align-center ga-2">
          <v-icon icon="mdi-invoice-text-outline" size="large"></v-icon>
          <h1>Multas</h1>
        </div>
        <v-btn
          class="float-right"
          color="green-darken-1"
          prepend-icon="mdi-plus"
          variant="outlined"
          @click="isDialogOpen = true"
        >
          Crear
        </v-btn>
      </div>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" lg="4" md="4">
      <MultaList />
    </v-col>
  </v-row>
</template>

<script setup>
import MultaList from "@/components/multa/MultaList.vue";
import { ref } from "vue";
import { useDatabaseStore } from "../stores/database";

const isDialogOpen = ref(false);
const databaseStore = useDatabaseStore();
</script>

<style scoped>
.text-field-price-width {
  max-width: 92px;
}
</style>
