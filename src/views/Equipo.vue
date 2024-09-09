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
          @click="createTeam"
        >
          Crear
        </v-btn>
      </div>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-empty-state>
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
            @click="createTeam"
          >
            Crear primer equipo
          </v-btn>
        </template>
      </v-empty-state>
    </v-col>
  </v-row>
</template>

<script setup>
function createTeam() {
  alert("crear equipo");
}
</script>
