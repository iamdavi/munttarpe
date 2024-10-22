<template>
  <v-row class="mt-container">
    <v-col>
      <div class="d-flex justify-space-between align-center">
        <div class="d-flex align-center ga-2">
          <v-icon icon="mdi-invoice-text-check-outline" size="large"></v-icon>
          <h1>Multas pagadas</h1>
        </div>
      </div>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" md="4">
      <v-row>
        <v-col cols="12">
          <MultaSelectorEquipo />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" md="8">
      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="serverItems"
        :items-length="totalItems"
        :loading="loading"
        item-value="name"
        @update:options="loadItems"
      ></v-data-table-server>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, resolveComponent } from "vue";
import { useMultaStore } from "@/stores/multa";
import MultaSelectorEquipo from "@/components/multa/MultaSelectorEquipo.vue";

const multaStore = useMultaStore();

const itemsPerPage = ref(5);
const headers = ref([
  { title: "Concepto", align: "start", key: "name" },
  { title: "Calories", key: "calories", align: "end" },
  { title: "Fat (g)", key: "fat", align: "end" },
  { title: "Carbs (g)", key: "carbs", align: "end" },
  { title: "Protein (g)", key: "protein", align: "end" },
  { title: "Iron (%)", key: "iron", align: "end" },
]);
const serverItems = ref([]);
const loading = ref(false);
const totalItems = ref(0);

multaStore.getMultasJugador(true);
</script>

<style scoped>
.text-field-price-width {
  max-width: 92px;
}

#fab-create-multa {
  position: absolute;
  right: 140px;
  bottom: 60px;
  height: unset !important;
}
</style>
