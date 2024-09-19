<template>
  <v-card :prepend-icon="getPrependIcon()" :variant="getCardVariant()" :color="eventData.color"
    :title="$t(eventData.tipo)" :subtitle="eventData.eventTime + ' - ' + eventData.day">
    <template v-slot:append>
      <v-btn density="compact" variant="text" icon="mdi-close" @click="$emit('deleteEvent', eventData)"></v-btn>
    </template>
    <v-card-text>
      <v-chip-group>
        <v-chip v-for="equipo in props.equipos" :key="equipo.id">
          {{ equipo.nombre }}
        </v-chip>
      </v-chip-group>
      <div v-if="!!eventData.descripcion">
        <v-divider></v-divider>
        <p class="mt-3">{{ eventData.descripcion }}</p>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({ evento: Object, equipos: Array });
const eventData = ref(props.evento);

const getPrependIcon = () => {
  if (eventData.value.tipo == "partido") return "mdi-tournament";
  if (eventData.value.tipo == "entrenamiento") return "mdi-strategy";
  if (eventData.value.tipo == "evento") return "mdi-account-group-outline";
  return "";
};

const getCardVariant = () => {
  if (eventData.value.tipo == "partido") return "tonal";
  if (eventData.value.tipo == "entrenamiento") return "outlined";
  if (eventData.value.tipo == "evento") return "flat";
  return "";
};
</script>

<style scoped>
.v-overlay__content {
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  padding: 12px !important;
}
</style>