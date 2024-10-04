<template>
  <v-row>
    <v-col cols="12" md="6">
      <h3 class="text-center mb-3">
        <v-icon icon="mdi-invoice-clock-outline" size="small"></v-icon>
        Multas pendientes
      </h3>
      <v-card
        v-for="jugadorMultas in multaStore.multasGroupedByJugador"
        :key="jugadorMultas.id"
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
        <v-card-text>
          <v-list lines="one" bg-color="transparent" nav class="pa-0">
            <v-list-item v-for="multa in jugadorMultas.multas" :key="multa.id">
              <template v-slot:prepend="{ isActive }">
                <v-list-item-action start>
                  <v-checkbox
                    v-model="formState.selectedEventIDs"
                    :value="multa.pagado"
                  ></v-checkbox>
                </v-list-item-action>
              </template>
              <v-list-item-title
                class="text-body-1 d-flex justify-space-between align-center pt-2 pb-1"
              >
                <div class="d-flex flex-column">
                  <span> {{ multa.concepto }} </span>
                  <span class="text-caption text-grey"> 00-00-0000 </span>
                </div>
                <span class="d-flex">
                  {{ multa.valor }}
                  <v-icon icon="mdi-currency-eur" size="x-small"></v-icon>
                </span>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <h3 class="text-center" mb-3>
        <v-icon icon="mdi-invoice-check-outline" size="small"></v-icon>
        Multas pagadas
      </h3>
    </v-col>
  </v-row>
</template>

<script setup>
import { reactive } from "vue";
import { useMultaStore } from "../../stores/multa";

const multaStore = useMultaStore();
multaStore.getMultasJugador();

const formState = reactive({
  selectedEventIDs: [],
});

const totalPagoJugador = (multasJugador) => {
  let result = 0;
  multasJugador.map((m) => (result += parseInt(m.valor)));
  return result;
};
</script>
