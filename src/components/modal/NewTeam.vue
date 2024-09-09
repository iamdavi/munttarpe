<template>
  <v-dialog v-model="newTeamDialog" width="auto">
    <v-card
      max-width="400"
      prepend-icon="mdi-account-group-outline"
      text="Your application will relaunch automatically after the update is complete."
      title="Crear equipo"
    >
      <template v-slot:actions>
        <v-btn class="ms-auto" text="Ok" @click="dialog = false"></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";

const newTeamDialog = ref(false);
</script>
