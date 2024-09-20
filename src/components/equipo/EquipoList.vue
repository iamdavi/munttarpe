<template>
  <v-expansion-panels>
    <v-expansion-panel
      v-for="equipo in databaseStore.equipos"
      :key="equipo.id"
      class="pa-0"
    >
      <v-expansion-panel-title class="py-1">
        <v-avatar color="transparent border-0 me-3" rounded="0" size="x-small">
          <IconDinamic :color="equipo?.color" />
          <!--
          <iconFemenino v-if="equipo.genero == 'Femenino'" />
          <IconMasculino v-else />
        -->
        </v-avatar>
        {{ equipo.nombre }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <div class="d-flex justify-space-between">
          <v-btn
            @click="databaseStore.eliminarEquipo(equipo.id)"
            :loading="databaseStore.loadingDeleteDoc"
            prepend-icon="mdi-trash-can-outline"
            color="red"
            variant="outlined"
          >
            Eliminar
          </v-btn>
          <v-btn
            @click="openDialog(equipo)"
            prepend-icon="mdi-pencil-outline"
            color="primary"
            variant="outlined"
          >
            Editar
          </v-btn>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
    <EquipoFormModal
      :isOpen="isDialogOpen"
      actionType="editar"
      :equipo="equipo"
      @closeDialog="isDialogOpen = false"
    />
  </v-expansion-panels>
</template>

<script setup>
import { ref } from "vue";
import { useDatabaseStore } from "@/stores/database";
import IconFemenino from "@/components/icons/MunttarpeLogorPlayeFemeninoSm.vue";
import IconMasculino from "@/components/icons/MunttarpeLogorPlayeMasculinoSm.vue";
import IconDinamic from "@/components/icons/MunttarpeLogorDinamicSm.vue";
import EquipoFormModal from "@/components/equipo/EquipoFormModal.vue";

const databaseStore = useDatabaseStore();

const isDialogOpen = ref(false);
const equipo = ref(null);

const openDialog = (equipoData) => {
  equipo.value = equipoData;
  isDialogOpen.value = true;
};
</script>
