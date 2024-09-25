<template>
  <v-dialog v-model="internalDialog" persistent>
    <v-form @submit.prevent="handleModalForm">
      <v-card
        :prepend-icon="
          modalType == 'crear' ? 'mdi-handball' : 'mdi-pencil-outline'
        "
        :title="dialogTitle"
      >
        <template v-slot:append>
          <v-btn icon="mdi-close" variant="text" @click="closeDialog"></v-btn>
        </template>
        <v-container class="pt-0" fluid>
          <v-row>
            <v-col class="pt-0">
              <v-card-text class="p-0">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      label="Nombre *"
                      variant="underlined"
                      v-model="form.nombre"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      label="Apellidos *"
                      variant="underlined"
                      v-model="form.apellidos"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      label="Mote *"
                      hint="Mote del jugador o nombre de camiseta"
                      variant="underlined"
                      v-model="form.mote"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-file-input
                      prepend-icon="mdi-image"
                      variant="underlined"
                      accept="image/*"
                      label="Imagen del jugador"
                      v-model="form.image"
                      @click:clear="form.imageUrl = ''"
                      @change="getImageSrc"
                    ></v-file-input>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select
                      label="Tipo"
                      :items="jugadorTypes"
                      v-model="form.tipo"
                      variant="underlined"
                      @update:modelValue="tipoChange"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      label="Descripcion"
                      hint="Curiosidades o peculiaridades del jugador"
                      :persistent-hint="true"
                      variant="underlined"
                      v-model="form.descripcion"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" :class="{ 'd-none': isNotJugador }">
                    <v-select
                      label="Posicion"
                      :items="jugadorPositions"
                      v-model="form.posicion"
                      variant="underlined"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="6" :class="{ 'd-none': isNotJugador }">
                    <v-select
                      label="Mano"
                      :items="jugadorManos"
                      v-model="form.mano"
                      variant="underlined"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="6" :class="{ 'd-none': isNotJugador }">
                    <v-text-field
                      label="Dorsal"
                      type="number"
                      variant="underlined"
                      v-model="form.dorsal"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      label="Especialidad"
                      variant="underlined"
                      v-model="form.especialidad"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <p>Género del jugador/entrenador</p>
                    <v-radio-group
                      inline
                      v-model="form.genero"
                      class="text-center"
                    >
                      <v-radio value="masculino" color="green-darken-1">
                        <template v-slot:label>
                          <div class="pe-3">
                            <v-icon icon="mdi-gender-male"></v-icon>
                            Masculino
                          </div>
                        </template>
                      </v-radio>
                      <v-radio value="femenino" color="deep-purple-darken-1">
                        <template v-slot:label>
                          <div class="pe-3">
                            <v-icon icon="mdi-gender-female"></v-icon>
                            Femenino
                          </div>
                        </template>
                      </v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-col>
            <v-col class="pt-0 h-auto">
              <v-card
                variant="text"
                title="Previsualicación"
                prepend-icon="mdi-eye"
                class="h-100"
              >
                <v-card-text class="d-flex align-center">
                  <JugadorCard :jugador="form" :isPreview="true" />
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        <template v-slot:actions>
          <v-btn
            v-if="actionType == 'editar'"
            class="ms-5 mb-2"
            @click="
              databaseStore.eliminarJugador(jugador.id);
              closeDialog();
            "
            :loading="databaseStore.loadingDeleteDoc"
            prepend-icon="mdi-trash-can-outline"
            color="red"
            variant="outlined"
          >
            Eliminar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            class="me-5 mb-2"
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
import { useDatabaseStore } from "@/stores/database";
import JugadorCard from "@/components/jugador/JugadorCard.vue";
import { jugadorPositions, jugadorTypes, jugadorManos } from "@/constData/data";

const databaseStore = useDatabaseStore();
const props = defineProps({
  isOpen: Boolean,
  actionType: String,
  jugador: Object, // Prop para los datos del registro
});

const emit = defineEmits(["closeDialog"]);

// Estado local para el diálogo y formulario
const loadingData = ref(false);
const internalDialog = ref(props.isOpen);
const modalType = ref(props.actionType);
const form = ref({
  id: null,
  tipo: null,
  nombre: "",
  apellidos: "",
  descripcion: "",
  mote: "",
  genero: "masculino",
  posicion: null,
  dorsal: null,
  mano: null,
  especialidad: "",
  image: null,
});

const isNotJugador = ref(true);
const tipoChange = (e, c) => {
  isNotJugador.value = form.value.tipo !== "jugador";
};

const rules = {
  required: (value) => !!value || "Este campo es requerido",
};

const clearFormFields = () => {
  form.value.id = null;
  form.value.tipo = null;
  form.value.nombre = "";
  form.value.apellidos = "";
  form.value.descripcion = "";
  form.value.mote = "";
  form.value.genero = "";
  form.value.posicion = null;
  form.value.dorsal = null;
  form.value.mano = null;
  form.value.especialidad = "";
  form.value.image = null;
  isNotJugador.value = true;
};

// Sincronizar los datos del registro con el formulario
watch(
  () => props.jugador,
  (newVal) => {
    if (newVal) {
      form.value.id = newVal.id;
      form.value.tipo = newVal.tipo;
      form.value.nombre = newVal.nombre;
      form.value.apellidos = newVal.apellidos;
      form.value.descripcion = newVal.descripcion;
      form.value.mote = newVal.mote;
      form.value.genero = newVal.genero;
      form.value.posicion = newVal.posicion;
      form.value.dorsal = newVal.dorsal;
      form.value.mano = newVal.mano;
      form.value.especialidad = newVal.especialidad;
      form.value.image = newVal.image;
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

const getImageSrc = () => {
  if (form.value.image) {
    const reader = new FileReader();
    reader.onload = (e) => {
      form.value.imageUrl = e.target.result;
    };
    reader.readAsDataURL(form.value.image);
  } else {
    form.value.imageUrl = "";
  }
};

// Función para cerrar el diálogo
const closeDialog = () => {
  emit("closeDialog");
};

// Función para guardar los datos
const handleModalForm = async (event) => {
  loadingData.value = true;
  const results = await event;
  try {
    if (!results.valid) throw new Error("Formulario inválido");
    if (props.actionType == "crear") {
      databaseStore.createJugador(form.value);
    } else {
      databaseStore.editarJugador(form.value);
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

const dialogTitle = computed(() =>
  props.actionType === "crear" ? "Crear jugador" : "Editar jugador"
);
</script>
