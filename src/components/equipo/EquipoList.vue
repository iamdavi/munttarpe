<template>
	<v-expansion-panels>
		<v-expansion-panel v-for="equipo in databaseStore.equipos" :key="equipo.id" :text="equipo.tipo"
			:title="equipo.nombre"></v-expansion-panel>
	</v-expansion-panels>
</template>

<script setup>
import { useDatabaseStore } from "@/stores/database";
const databaseStore = useDatabaseStore();
</script>