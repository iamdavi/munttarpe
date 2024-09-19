<template>
  {{ props.contador }}
  <v-btn @click="closeDialogLocal()">add</v-btn>
</template>

<script setup>
const props = defineProps({ contador: Number });
const emit = defineEmits(["closeDialogLocal"]);

// Función para cerrar el diálogo
const closeDialogLocal = () => {
  emit("addContador");
};
</script>
