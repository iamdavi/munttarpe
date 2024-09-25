<template>
  <v-row>
    <v-col cols="12" md="5">
      <h3 class="text-center">
        <v-icon icon="mdi-invoice-clock-outline" size="small"></v-icon>
        Multas pendientes
      </h3>
      <pre>
      {{ databaseStore.multasJugador }}
      </pre>
    </v-col>
    <v-col cols="12" md="2" class="text-center">
      <v-divider class="h-100 border-opacity-100" vertical></v-divider>
    </v-col>
    <v-col cols="12" md="5">
      <h3 class="text-center">
        <v-icon icon="mdi-invoice-check-outline" size="small"></v-icon>
        Multas pagadas
      </h3>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useDatabaseStore } from "@/stores/database";

const databaseStore = useDatabaseStore();
const multasJugador = ref(null)
const getMultasGroupedByJugadores = async () => {
  await databaseStore.getMultasJugador();
  await databaseStore.getMultas();
  let result = [];
  let resultJugador;
  for (const mt of databaseStore.multasJugador) {
    if (!Object.keys(result).includes(mt.jugador)) {
      const jugadorData = databaseStore.jugadores.find((j) => j.id == mt.jugador)
      result[mt.jugador] = { ...jugadorData }
      result[mt.jugador]['multas'] = []
      console.log(result);
    }
    console.log(databaseStore.multas);

    const multaData = databaseStore.multas.find((m) => m.id == mt.concepto)
    result[mt.jugador]['multas'].push(multaData)
  }
  // console.log(result)
}

onMounted(() => {
  getMultasGroupedByJugadores();
});
</script>
