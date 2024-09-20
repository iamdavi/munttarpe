<template>
  <v-dialog v-model="internalDialog" width="auto" persistent>
    <v-form @submit.prevent="handleModalForm">
      <v-card
        :prepend-icon="dialogIcon()"
        title="Crear evento"
        :subtitle="dialogSubtitle"
      >
        <template v-slot:append>
          <v-btn icon="mdi-close" variant="text" @click="closeDialog"></v-btn>
        </template>
        <v-card-text class="pb-0">
          <v-select
            v-if="eventType == 'period'"
            label="Días de la semana *"
            :items="daysOfWeek"
            multiple
            v-model="form.weeksDay"
            :rules="[(v) => !!v || 'Debes seleccionar un día']"
            variant="underlined"
          ></v-select>
          <v-select
            label="Tipo de evento *"
            :items="eventoTypes"
            v-model="form.tipo"
            :rules="[(v) => !!v || 'Debes seleccionar el tipo de evento']"
            variant="underlined"
          ></v-select>
          <v-select
            label="Equipo *"
            :items="databaseStore.equipos"
            item-value="id"
            item-title="nombre"
            multiple
            v-model="form.equipos"
            :rules="[(v) => !!v || 'Debes seleccionar al menos 1 equipo']"
            variant="underlined"
          ></v-select>
          <v-text-field
            v-model="form.eventTime"
            :active="timeModal"
            :focused="timeModal"
            variant="underlined"
            label="Hora del evento"
            prepend-icon="mdi-clock-time-four-outline"
            readonly
          >
            <v-dialog v-model="timeModal" activator="parent" width="auto">
              <v-card>
                <v-time-picker
                  class="px-1 py-3 pa-sm-4"
                  v-if="timeModal"
                  v-model="form.eventTime"
                  width="auto"
                ></v-time-picker>
                <v-card-actions>
                  <v-btn block variant="outlined" @click="timeModal = false">
                    Establecer hora
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-text-field>
          <v-textarea
            label="Descripción del evento"
            variant="outlined"
            v-model="form.descripcion"
          ></v-textarea>
        </v-card-text>
        <template v-slot:actions>
          <v-btn @click="closeDialog"> Cancelar </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            type="submit"
            variant="outlined"
            color="green-darken-1"
            :loading="loadingData"
          >
            Guardar
          </v-btn>
        </template>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { eventoTypes } from "@/constData/data";
import { useDatabaseStore } from "@/stores/database";
import { daysOfWeek } from "@/constData/data";

const databaseStore = useDatabaseStore();

const props = defineProps({
  isOpen: Boolean,
  actionType: String,
  eventType: String,
  eventDay: String,
  evento: Object, // Prop para los datos del registro
});

const emit = defineEmits(["closeDialog"]);

// Estado local para el diálogo y formulario
const loadingData = ref(false);
const timeModal = ref(false);
const internalDialog = ref(props.isOpen);
const modalType = ref(props.actionType);
const form = ref({
  tipo: null,
  equipos: null,
  eventTime: null,
  weeksDay: null,
  descripcion: null,
});

const rules = {
  required: (value) => !!value || "Este campo es requerido",
};

const clearFormFields = () => {
  form.value.tipo = null;
  form.value.equipos = null;
  form.value.eventTime = null;
  form.value.weeksDay = null;
  form.value.descripcion = null;
};

// Sincronizar los datos del registro con el formulario
watch(
  () => props.evento,
  (newVal) => {
    if (newVal) {
      form.value.tipo = newVal.tipo;
      form.value.equipos = newVal.equipos;
      form.value.eventTime = newVal.eventTime;
      form.value.weeksDay = newVal.weekdays;
      form.value.descripcion = newVal.weekdays;
    } else {
      // Si no hay registro, limpiamos el formulario
      clearFormFields();
    }
  }
);

// Sincronizar el diálogo con el prop
watch(
  () => props.isOpen,
  (newVal) => {
    internalDialog.value = newVal;
  }
);

// Función para cerrar el diálogo
const closeDialog = () => {
  clearFormFields();
  emit("closeDialog");
};

// Función para guardar los datos
const handleModalForm = async () => {
  loadingData.value = true;
  const results = await event;
  try {
    if (!results.valid) throw new Error("Formulario inválido");
    if (props.actionType == "crear") {
      if (props.eventType == "day") {
        form.value.day = props.eventDay;
      }
      databaseStore.createEvent(form.value, props.eventType);
    } else {
      databaseStore.editarEvent(form.value);
    }
  } catch (error) {
    console.log(error);
  } finally {
    loadingData.value = false;
    if (results.valid) {
      clearFormFields();
      closeDialog();
    }
  }
};

const dialogIcon = () => {
  if (props.eventType == "period") return "mdi-calendar-refresh";
  if (props.eventType == "day") return "mdi-calendar-plus";
};

const dialogSubtitle = computed(() => {
  if (props.eventType == "day") {
    return "Para el día " + props.eventDay;
  } else {
    return "Periódico";
  }
});
</script>
