<template>
  <v-dialog v-model="internalDialog" width="auto" persistent>
    <v-form @submit.prevent="handleModalForm">
      <v-card
        :prepend-icon="
          modalType == 'crear' ? 'mdi-calendar-plus' : 'mdi-calendar-edit'
        "
        :title="dialogTitle"
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
            variant="underlined"
          ></v-select>
          <v-select
            label="Tipo de evento *"
            :items="eventoTypes"
            v-model="form.tipo"
            variant="underlined"
          ></v-select>
          <v-select
            label="Equipo *"
            :items="databaseStore.equipos"
            item-value="id"
            item-title="nombre"
            multiple
            v-model="form.equipos"
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
                  v-if="timeModal"
                  v-model="form.eventTime"
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
          <v-btn type="submit" variant="outlined" color="green-darken-1">
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
const handleModalForm = () => {
  try {
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
    clearFormFields();
    closeDialog();
  }
};

const dialogTitle = computed(() => {
  if (props.actionType == "editar") return "Editar evento";
  let title = "Crear evento ";
  if (props.eventType == "day") {
    title += "para el " + props.eventDay;
  } else {
    title += "periodico";
  }
  return title;
});
</script>
