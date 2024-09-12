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
        >
          Crear
        </v-btn>
      </div>
    </v-col>
  </v-row>

  <v-row>
    <v-col class="d-flex ga-8 overflow-x-auto pb-6">
      <div v-for="n in 15" :key="n">
        <v-card
          class="player-card"
          color="green-darken-1"
          :variant="n == 1 ? 'outlined' : 'tonal'"
          width="300"
        >
          <v-chip
            class="payer-logo-position"
            label
            size="small"
            variant="outlined"
          >
            {{ jugador.posicion }}
          </v-chip>
          <div class="px-8 pt-8 player-logo-container">
            <HomeIcon iconType="player" />
            <span class="player-logo-name">{{ jugador.mote }}</span>
            <span class="player-logo-number">{{ jugador.dorsal }}</span>
            <!--
            <span class="player-logo-image">
              <v-img src="../../public/player_2.png" width="150"></v-img>
            </span>
-->
          </div>
          <v-card-item>
            <div>
              <div class="text-button mb-1">
                {{ jugador.nombre }} {{ jugador.apellidos }}
              </div>
              <div class="text-caption">
                {{ jugador.descripcion }}
              </div>
            </div>
            <v-table density="compact" class="rounded-lg mt-5 border-thin">
              <tbody>
                <tr>
                  <td>
                    <strong> Genero </strong>
                  </td>
                  <td>{{ jugador.genero }}</td>
                </tr>
                <tr>
                  <td>
                    <strong> Mano </strong>
                  </td>
                  <td>{{ jugador.mano }}</td>
                </tr>
                <tr>
                  <td>
                    <strong> Especialidad </strong>
                  </td>
                  <td>{{ jugador.especialidad }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card-item>

          <v-card-actions>
            <v-btn variant="tonal" prepend-icon="mdi-pencil-outline" block>
              Editar
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
import HomeIcon from "@/components/icons/HomeIcon.vue";

const model = ref(null);

const jugador = {
  tipo: "Jugador",
  nombre: "David",
  apellidos: "Otero Mato",
  descripcion: "En un lugar de la mancha de cuyo nombre no quiero acordarme",
  mote: "Gallego",
  genero: "Masculino",
  posicion: "Portero",
  dorsal: 26,
  mano: "Diestro",
  especialidad: "Contra-ataques",
};
</script>
