<template>
  <v-row>
    <v-col
      cols="12"
      md="6"
      lg="4"
      v-for="jugadorMultas in multaStore.multasGroupedByJugador"
      :key="jugadorMultas.id"
    >
      <v-card
        v-if="algunaPorPagar(jugadorMultas.multas)"
        :title="`${jugadorMultas.mote} (${jugadorMultas.dorsal})`"
        :subtitle="`${jugadorMultas.nombre} ${jugadorMultas.apellidos}`"
        variant="outlined"
      >
        <template v-slot:append>
          <div class="d-flex flex-column align-center pe-n2">
            <span> Total </span>
            <v-sheet rounded class="px-2 py-1">
              <span class="d-flex align-center">
                {{ totalPagoJugador(jugadorMultas.multas) }}
                <v-icon icon="mdi-currency-eur" size="x-small"></v-icon>
              </span>
            </v-sheet>
          </div>
        </template>
        <v-card-text class="pb-0">
          <v-list lines="one" bg-color="transparent" nav class="pa-0">
            <v-list-item v-for="multa in jugadorMultas.multas" :key="multa.id">
              <template v-slot:prepend="{ isActive }">
                <v-list-item-action start>
                  <v-checkbox
                    v-model="selectedMultas"
                    :multiple="true"
                    :value="multa.id"
                    density="compact"
                    :hide-details="true"
                  ></v-checkbox>
                </v-list-item-action>
              </template>
              <v-list-item-title
                class="text-body-1 d-flex justify-space-between align-center pt-2 pb-1"
              >
                <div class="d-flex flex-column">
                  <span> {{ multa.concepto.concepto }} </span>
                  <span class="text-caption text-grey">{{
                    formatUnixTimestamp(multa.fecha)
                  }}</span>
                </div>
                <span class="d-flex">
                  {{ multa.cantidad }}
                  <v-icon icon="mdi-currency-eur" size="x-small"></v-icon>
                </span>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-expand-transition>
        <v-row v-if="selectedMultas.length != 0">
          <v-col>
            <v-btn
              @click="eliminarMultasHandler"
              variant="outlined"
              color="red-darken-4"
              prepend-icon="mdi-trash-can-outline"
              block
              :loading="multaStore.loadingDeleteDoc"
              >Eliminar</v-btn
            >
          </v-col>
          <v-col>
            <v-btn
              @click="pagarMultasHandler"
              color="green-darken-4"
              prepend-icon="mdi-hand-coin-outline"
              :loading="multaStore.loadingUpdateDoc"
              block
            >
              Pagar
            </v-btn>
          </v-col>
        </v-row>
      </v-expand-transition>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
import { useMultaStore } from "../../stores/multa";
import { formatUnixTimestamp } from "../../helpers/fechas";

const multaStore = useMultaStore();
multaStore.getMultasJugador();

const selectedMultas = ref([]);

const eliminarMultasHandler = () => {
  multaStore.deleteMultasById(selectedMultas.value);
  selectedMultas.value = [];
};

const pagarMultasHandler = () => {
  multaStore.pagarMultasById(selectedMultas.value);
  selectedMultas.value = [];
};

const totalPagoJugador = (multasJugador) => {
  let result = 0;
  multasJugador.map((m) => {
    return (result += parseInt(m.cantidad));
  });
  return result;
};

const algunaPorPagar = (multasJugador) => {
  return !!multasJugador.find((m) => m.pagado == false);
};
</script>
