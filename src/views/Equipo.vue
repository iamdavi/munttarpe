<template>
  <v-row class="mt-container">
    <v-col>
      <div class="d-flex justify-space-between align-center">
        <div class="d-flex align-center ga-2">
          <v-icon icon="mdi-account-group" size="large"></v-icon>
          <h1>Equipos</h1>
        </div>
        <v-btn class="float-right" color="green-darken-1" prepend-icon="mdi-plus" variant="outlined"
          @click="createTeam">
          Crear
        </v-btn>
      </div>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-skeleton-loader v-if="databaseStore.loadingDoc" type="list-item, list-item, list-item">
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
            <v-btn color="green-darken-1" prepend-icon="mdi-plus" variant="outlined" @click="createTeam">
              Crear primer equipo
            </v-btn>
          </template>
        </v-empty-state>
        <EquipoList v-else />
      </div>
    </v-col>
  </v-row>
  <v-dialog v-model="createTeamDialog" width="auto" min-width="500">
    <v-card prepend-icon="mdi-account-multiple-plus-outline" title="Crear nuevo equipo">
      <v-card-text>
        <v-text-field label="Nombre" variant="underlined"></v-text-field>
        <p>Tipo de equipo</p>
        <v-radio-group inline v-model="radios" class="text-center">
          <v-radio value="Masculino" color="green-darken-1">
            <template v-slot:label>
              <div class="pe-3">
                <v-icon icon="mdi-gender-male"></v-icon>
                Masculino
              </div>
            </template>
          </v-radio>
          <v-radio value="Femenino" color="deep-purple-darken-1">
            <template v-slot:label>
              <div class="pe-3">
                <v-icon icon="mdi-gender-female"></v-icon>
                Femenino
              </div>
            </template>
          </v-radio>
        </v-radio-group>
      </v-card-text>
      <template v-slot:actions>
        <v-btn @click="createTeamDialog = false"> Cancelar </v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="createTeamDialog = false" variant="outlined" color="green-darken-1">
          Guardar
        </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useDatabaseStore } from "@/stores/database";
import EquipoList from "@/components/equipo/EquipoList.vue";

const createTeamDialog = ref(false);
const radios = ref("Masculino");
const databaseStore = useDatabaseStore();

databaseStore.getEquipos();

function createTeam() {
  createTeamDialog.value = true;
}
</script>
