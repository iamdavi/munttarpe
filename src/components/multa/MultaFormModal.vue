<template>
  <v-dialog v-model="internalDialog" persistent max-width="500">
    <v-form @submit.prevent="handleModalForm">
      <v-card
        :prepend-icon="
          action == 'crear' ? 'mdi-invoice-plus-outline' : 'mdi-pencil-outline'
        "
        title="Añadir multa a jugador"
      >
        <template v-slot:append>
          <v-btn icon="mdi-close" variant="text" @click="closeDialog"></v-btn>
        </template>
        <v-card-text class="pb-1">
          <v-select
            v-model="form.jugador"
            label="Jugador *"
            variant="underlined"
            :items="getJugadoresOfTeam()"
            color="blue-grey-lighten-2"
            item-title="nombre"
            item-value="id"
          >
            <template v-slot:selection="{ props, item }">
              {{ item.raw.mote }}
              ({{ item.raw.dorsal ? item.raw.dorsal : "--" }})
            </template>
            <template v-slot:item="{ props, item }">
              <v-list-item
                v-bind="props"
                :title="
                  item.raw.dorsal
                    ? item.raw.mote + ' (' + item.raw.dorsal + ')'
                    : item.raw.mote + '(--)'
                "
              >
              </v-list-item>
            </template>
          </v-select>
          <v-select
            v-model="form.concepto"
            label="Concepto *"
            variant="underlined"
            :items="getConceptosMultasByTeam()"
            color="blue-grey-lighten-2"
            item-title="concepto"
            item-value="id"
          >
            <template v-slot:selection="{ props, item }">
              {{ item.raw.concepto }} ({{ item.raw.valor }} &euro;)
            </template>
            <template v-slot:item="{ props, item }">
              <v-list-item
                v-bind="props"
                :title="`${item.raw.concepto} (${item.raw.valor} &euro;)`"
              >
              </v-list-item>
            </template>
          </v-select>
          <v-text-field
            v-model="formattedDate"
            @click="timeModal = true"
            variant="underlined"
            label="Día de la multa"
            prepend-icon="mdi-calendar-month-outline"
            readonly
          >
            <v-dialog v-model="timeModal" activator="parent" width="auto">
              <v-card>
                <v-date-picker
                  v-model="form.fecha"
                  @update:modelValue="formatDate"
                ></v-date-picker>
                <v-card-actions>
                  <v-btn block variant="outlined" @click="timeModal = false">
                    Establecer fecha
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-text-field>
          <v-textarea
            v-model="form.descripcion"
            label="Descripción de la multa"
            variant="outlined"
            hint="Opcional"
            persistent-hint
          ></v-textarea>
          <v-switch
            label="Multa pagada"
            v-model="form.pagado"
            color="green-darken-4"
            hide-details
          ></v-switch>
          <v-text-field
            v-if="form.pagado"
            label="Cantidad pagada"
            v-model="form.cantidad"
            variant="underlined"
            hint="En caso de decimales, usa coma (,), p.e.: 1,50"
            persistent-hint
          >
            <template v-slot:append-inner>
              <v-icon icon="mdi-currency-eur" size="x-small"></v-icon>
            </template>
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeDialog"> Cancelar </v-btn>
          <v-spacer></v-spacer>
          <v-btn type="submit" variant="outlined" color="green-darken-1">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useDatabaseStore } from "@/stores/database";

const props = defineProps({
  isOpen: Boolean,
  actionType: String,
  multa: Object,
});
const internalDialog = ref(props.isOpen);
const action = ref(props.actionType);
const timeModal = ref(false);
const databaseStore = useDatabaseStore();

const form = ref({
  jugador: null,
  concepto: null,
  fecha: new Date(),
  descripcion: null,
  pagado: false,
  cantidad: null,
});
const formattedDate = ref(null);

const getJugadoresOfTeam = () => {
  const allJugadores = databaseStore.jugadores;
  // @TODO -> filtrar jugadores
  return allJugadores;
};

const getConceptosMultasByTeam = () => {
  const allMultas = databaseStore.multas;
  // @TODO -> filtrar multas
  return allMultas;
};

const emit = defineEmits(["closeDialog"]);

const formatDate = () => {
  if (form.value.fecha) {
    const date = new Date(form.value.fecha);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    formattedDate.value = `${day}-${month}-${year}`;
  }
};

const closeDialog = () => {
  emit("closeDialog");
};

watch(
  () => props.isOpen,
  (nv) => (internalDialog.value = nv)
);

const handleModalForm = () => {
  console.log(form.value);
};

onMounted(() => {
  databaseStore.getJugadores();
  databaseStore.getMultas();
  formatDate();
});
</script>
