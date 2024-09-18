<template>
  <v-card
    class="player-card mx-auto h-100 d-flex flex-column"
    :color="
      jugador.tipo == 'entrenador'
        ? 'secondary'
        : jugador.genero == 'femenino'
        ? 'deep-purple-darken-1'
        : 'green-darken-1'
    "
    width="300"
    :variant="jugador.tipo == 'entrenador' ? 'outlined' : 'tonal'"
  >
    <v-chip
      v-if="jugador.posicion"
      class="payer-logo-position"
      label
      size="small"
      variant="outlined"
    >
      {{ jugador.posicion }}
    </v-chip>
    <div class="px-8 pt-8 player-logo-container">
      <HomeIcon iconType="player" :genderType="jugador.genero" />
      <span class="player-logo-name">{{ jugador.mote }}</span>
      <span class="player-logo-number">{{ jugador.dorsal }}</span>
      <span class="player-logo-image">
        <v-img :src="jugador.imageUrl" width="131" height="auto"></v-img>
      </span>
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
    </v-card-item>
    <!-- CARACTERÍSTICAS -->
    <v-divider v-if="jugador.mano"></v-divider>
    <div v-if="jugador.mano" class="d-flex justify-space-between px-4 py-2">
      <span>Mano</span>
      <strong>{{ jugador.mano }}</strong>
    </div>
    <v-divider v-if="jugador.especialidad"></v-divider>
    <div
      v-if="jugador.especialidad"
      class="d-flex justify-space-between px-4 py-2"
    >
      <span>Especialidad</span>
      <strong>{{ jugador.especialidad }}</strong>
    </div>
    <!-- /CARACTERÍSTICAS -->
    <v-spacer></v-spacer>
    <v-card-actions v-if="!isPreview">
      <v-btn
        variant="tonal"
        prepend-icon="mdi-pencil-outline"
        block
        @click="editJugador"
      >
        Editar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import HomeIcon from "@/components/icons/HomeIcon.vue";

const props = defineProps({ jugador: Object, isPreview: Boolean });
const emit = defineEmits(["editJugadorData"]);

const editJugador = () => {
  emit("editJugadorData");
};
</script>
