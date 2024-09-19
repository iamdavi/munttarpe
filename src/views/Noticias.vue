<template>
  <div class="mt-8">Noticioas</div>
  <v-btn @click="contador++"></v-btn>
  <Prueba :contador="contador" @addContador="contador++" />
</template>

<script setup>
import Prueba from "@/components/noticia/Prueba.vue";
import { ref } from "vue";

const contador = ref(0);
</script>
