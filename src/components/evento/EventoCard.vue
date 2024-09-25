<template>
  <v-card
    height="100%"
    elevation="3"
    :prepend-icon="getPrependIcon()"
    :variant="getCardVariant()"
    :color="eventData.color"
    :title="$t(eventData.tipo)"
    :subtitle="getSubtitle()"
    class="d-flex flex-column justify-space-between"
  >
    <template v-slot:append v-if="!props.isPreview">
      <v-btn
        density="compact"
        variant="text"
        icon="mdi-close"
        @click="$emit('deleteEvent', eventData)"
      ></v-btn>
    </template>
    <v-card-text class="pb-0 mt-n2 px-1">
      <v-divider></v-divider>
      <v-chip
        v-for="equipo in props.equipos"
        :key="equipo.id"
        :variant="getCardVariant()"
        class="ma-1"
      >
        <div class="me-3 icon-dinamic-wrapper">
          <IconDinamic :color="equipo.color" />
        </div>
        {{ equipo.nombre }}
      </v-chip>
    </v-card-text>
    <div>
      <div v-if="!!eventData.descripcion">
        <p class="px-4 py-2">{{ eventData.descripcion }}</p>
      </div>
      <v-divider></v-divider>
      <v-card-actions v-if="!props.isPreview">
        <v-btn
          block
          variant="outlined"
          prepend-icon="mdi-pencil-outline"
          @click="$emit('editEvent')"
        >
          Editar
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>
  <v-tooltip
    text="Evento recurrente"
    location="top end"
    v-if="props.evento?.eventType == 'period'"
  >
    <template v-slot:activator="{ props }">
      <div v-bind="props" class="custom-badge-recursive-card elevation-5">
        <v-icon icon="mdi-calendar-refresh-outline" size="x-small"></v-icon>
      </div>
    </template>
  </v-tooltip>
</template>

<script setup>
import { ref } from "vue";
import { daysOfWeek } from "@/constData/data";
import IconDinamic from "@/components/icons/MunttarpeLogorDinamicSm.vue";

const props = defineProps({
  evento: Object,
  equipos: Array,
  isPreview: {
    type: Boolean,
    default: false,
  },
});
const eventData = ref(props.evento);

const emits = defineEmits(["deleteEvent", "editEvent"]);

const getSubtitle = () => {
  let result = eventData.value.eventTime ? eventData.value.eventTime : "??:??";
  result += " - ";
  if (eventData.value.eventType == "period") {
    const daysNames = getNameOfDaysByArray(eventData.value.weeksDay);
    result += daysNames.map((e) => e.slice(0, 2)).join(", ");
  } else {
    result += eventData.value.day;
  }
  return result;
};

const getNameOfDaysByArray = (days) => {
  const names = [];
  const daysSelectedValues = Object.values(days);
  daysOfWeek.forEach((d) => {
    if (daysSelectedValues.includes(d.value)) names.push(d.title);
  });
  return names;
};

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

.custom-badge-recursive-card {
  background-color: #43a047;
  position: absolute;
  right: 0px;
  top: 0px;
  border-radius: 50%;
  padding: 3px 7px;
}
</style>
