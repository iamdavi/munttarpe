<template>
  <v-select
    v-model="multaStore.multaEquipo"
    @update:modelValue="equipoChangeEvent()"
    :items="databaseStore.equipos"
    hint="Selecciona un equipo para ver las multas y los pagos"
    persistent-hint
    color="blue-grey-lighten-2"
    item-title="nombre"
    item-value="id"
    label="Equipo *"
    :rules="[(v) => !!v || 'Debes seleccionar al menos 1 equipo']"
    variant="underlined"
  >
    <template v-slot:selection="{ props, item }">
      <div class="me-3 icon-dinamic-wrapper">
        <IconDinamic :color="item.raw.color" />
      </div>
      {{ item.raw.nombre }}
    </template>
    <template v-slot:item="{ props, item }">
      <v-list-item v-bind="props" :title="item.raw.nombre">
        <template v-slot:prepend>
          <div class="me-3 icon-dinamic-wrapper">
            <IconDinamic :color="item.raw.color" />
          </div>
        </template>
      </v-list-item>
    </template>
  </v-select>
</template>

<script setup>
import { useDatabaseStore } from "@/stores/database";
import { useMultaStore } from "@/stores/multa";
import IconDinamic from "@/components/icons/MunttarpeLogorDinamicSm.vue";

const multaStore = useMultaStore();
const databaseStore = useDatabaseStore();
databaseStore.getEquipos();

const equipoChangeEvent = () => {
  databaseStore.getJugadores();
  multaStore.getMultasEquipo();
  multaStore.getJugadoresEquipo();
};
</script>
