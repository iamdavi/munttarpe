<template>
  <v-row class="mt-container">
    <v-col>
      <div class="d-flex justify-space-between align-center">
        <div class="d-flex align-center ga-2">
          <v-icon icon="mdi-handball" size="large"></v-icon>
          <h1>Jugadores</h1>
        </div>
        <v-btn
          class="float-right"
          color="green-darken-1"
          prepend-icon="mdi-plus"
          variant="outlined"
          @click="
            jugador = { tipo: null };
            actionType = 'crear';
            isDialogOpen = true;
          "
        >
          Crear
        </v-btn>
      </div>
    </v-col>
  </v-row>

  <v-row>
    <v-col class="d-flex ga-8 overflow-x-auto pb-6">
      <div v-if="databaseStore.loadingDoc" v-for="n in 3">
        <v-skeleton-loader
          :key="n"
          width="300px"
          type="card,article,actions"
        ></v-skeleton-loader>
      </div>
      <v-empty-state v-if="databaseStore.jugadores.length == 0" class="mx-auto">
        <template v-slot:title>
          <div class="text-grey-lighten-2">
            - No se han creado jugadores todavía -
          </div>
        </template>
        <template v-slot:text>
          <div class="text-grey-darken-1">
            Crea jugadores y asocialos a los equipos que ya has creado para
            conformar tu equipo.
          </div>
        </template>
        <template v-slot:actions>
          <v-btn
            color="green-darken-1"
            prepend-icon="mdi-plus"
            variant="outlined"
            @click="isDialogOpen = true"
          >
            Crear primer jugador
          </v-btn>
        </template>
      </v-empty-state>
      <div v-else v-for="jugador in databaseStore.jugadores" :key="jugador.id">
        <JugadorCard
          :jugador="jugador"
          @editJugadorData="changeJugadorData(jugador)"
        />
      </div>
    </v-col>
  </v-row>
  <JugadorFormModal
    :isOpen="isDialogOpen"
    :actionType="actionType"
    :jugador="jugador"
    @closeDialog="isDialogOpen = false"
  />
</template>

<script setup>
import { ref } from "vue";
import { useDatabaseStore } from "@/stores/database";
import JugadorCard from "@/components/jugador/JugadorCard.vue";
import JugadorFormModal from "@/components/jugador/JugadorFormModal.vue";

const databaseStore = useDatabaseStore();
databaseStore.getJugadores();

const jugador = ref(null);
const actionType = ref("crear");
const isDialogOpen = ref(false);

const changeJugadorData = (jugadorData) => {
  jugador.value = jugadorData;
  actionType.value = "editar";
  isDialogOpen.value = true;
};
</script>
