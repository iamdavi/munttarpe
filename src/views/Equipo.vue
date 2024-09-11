<template>
  <v-row class="mt-container">
    <v-col>
      <div class="d-flex justify-space-between align-center">
        <div class="d-flex align-center ga-2">
          <v-icon icon="mdi-account-group" size="large"></v-icon>
          <h1>Equipos</h1>
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
    <v-col>
      <v-skeleton-loader
        v-if="databaseStore.loadingDoc"
        type="list-item, list-item, list-item"
      >
      </v-skeleton-loader>
      <div v-else>
        <v-empty-state v-if="databaseStore.equipos.length == 0">
          <template v-slot:title>
            <div class="text-grey-lighten-2">
              - No se han creado equipos todavía -
            </div>
          </template>
          <template v-slot:text>
            <div class="text-grey-darken-1">
              Crea un equipo para añadir más adelante los jugadores y partidos
              jugados
            </div>
          </template>
          <template v-slot:actions>
            <v-btn
              color="green-darken-1"
              prepend-icon="mdi-plus"
              variant="outlined"
              @click="isDialogOpen = true"
            >
              Crear primer equipo
            </v-btn>
          </template>
        </v-empty-state>
        <EquipoList v-else />
      </div>
    </v-col>
  </v-row>
  <EquipoFormModal
    :isOpen="isDialogOpen"
    actionType="crear"
    @closeDialog="isDialogOpen = false"
  />
</template>

<script setup>
import { ref } from "vue";
import { useDatabaseStore } from "@/stores/database";
import EquipoList from "@/components/equipo/EquipoList.vue";
import EquipoFormModal from "@/components/equipo/EquipoFormModal.vue";

const databaseStore = useDatabaseStore();
databaseStore.getEquipos();

const isDialogOpen = ref(false);
</script>
