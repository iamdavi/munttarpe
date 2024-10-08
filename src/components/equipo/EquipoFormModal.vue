<template>
  <v-dialog v-model="props.isOpen" width="auto" :width="500">
    <v-form @submit.prevent="handleModalForm">
      <v-card
        :prepend-icon="
          modalType == 'crear'
            ? 'mdi-account-multiple-plus-outline'
            : 'mdi-pencil-outline'
        "
        :title="dialogTitle"
      >
        <template v-slot:append>
          <v-btn icon="mdi-close" variant="text" @click="closeDialog"></v-btn>
        </template>
        <v-card-text class="pb-0">
          <v-text-field
            label="Nombre"
            variant="underlined"
            v-model="form.nombre"
            :rules="[rules.required]"
          ></v-text-field>
          <p>Género del equipo</p>
          <v-radio-group
            inline
            v-model="form.genero"
            class="text-center"
            @change="cambioGenero"
          >
            <v-radio value="Masculino" color="green-darken-1">
              <template v-slot:label>
                <div class="pe-3">
                  <v-icon icon="mdi-gender-male"></v-icon>
                  Masculino
                </div>
              </template>
            </v-radio>
            <v-radio value="Femenino" color="deep-purple-darken-1">
              <template v-slot:label>
                <div class="pe-3">
                  <v-icon icon="mdi-gender-female"></v-icon>
                  Femenino
                </div>
              </template>
            </v-radio>
          </v-radio-group>
        </v-card-text>
        <v-color-picker
          v-model="form.color"
          elevation="0"
          class="mx-auto mb-3"
          hide-inputs
          show-swatches
          swatches-max-height="250px"
        ></v-color-picker>
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
import { useDatabaseStore } from "@/stores/database";

const databaseStore = useDatabaseStore();
const props = defineProps({
  isOpen: Boolean,
  actionType: String,
  equipo: Object, // Prop para los datos del registro
});

const emit = defineEmits(["closeDialog"]);

// Estado local para el diálogo y formulario
const internalDialog = ref(props.isOpen);
const modalType = ref(props.actionType);
const form = ref({
  nombre: "",
  genero: "Masculino",
  color: "#03c03c",
});

const rules = {
  required: (value) => !!value || "Este campo es requerido",
};

const clearFormFields = () => {
  form.value.id = "";
  form.value.nombre = "";
  form.value.genero = "Masculino";
  form.value.color = "#03c03c";
};

// Sincronizar los datos del registro con el formulario
watch(
  () => props.equipo,
  (newVal) => {
    if (newVal) {
      form.value.id = newVal.id;
      form.value.nombre = newVal.nombre;
      form.value.genero = newVal.genero;
      form.value.color = newVal.color;
    } else {
      // Si no hay registro, limpiamos el formulario
      clearFormFields();
    }
  }
);

// Función para cerrar el diálogo
const closeDialog = () => {
  emit("closeDialog");
};

// Función para guardar los datos
const handleModalForm = () => {
  try {
    if (props.actionType == "crear") {
      databaseStore.createEquipo(
        form.value.nombre,
        form.value.genero,
        form.value.color
      );
    } else {
      databaseStore.editarEquipo(form.value);
    }
  } catch (error) {
    console.log(error);
  } finally {
    clearFormFields();
    closeDialog();
  }
};

const cambioGenero = () => {
  if (form.value.genero == "Masculino") {
    form.value.color = "#03c03c";
  } else {
    form.value.color = "#5e35b1";
  }
};

const dialogTitle = computed(() =>
  props.actionType === "crear" ? "Crear equipo" : "Editar equipo"
);
</script>
