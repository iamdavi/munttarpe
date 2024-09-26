<template>
	<v-row class="mt-container">
		<v-col>
			<div class="d-flex justify-space-between align-center">
				<div class="d-flex align-center ga-2">
					<v-icon icon="mdi-invoice-text-outline" size="large"></v-icon>
					<h1>Multas</h1>
				</div>
				<v-btn class="float-right" color="green-darken-1" prepend-icon="mdi-plus" variant="outlined"
					@click="isDialogOpen = true">
					Crear
				</v-btn>
			</div>
		</v-col>
	</v-row>
	<v-row>
		<v-col cols="12" md="4">
			<v-row>
				<v-col cols="12">
					<MultaSelectorEquipo />
				</v-col>
				<v-col cols="12">
					<MultaList v-if="multaStore.multaEquipo" />
				</v-col>
			</v-row>
		</v-col>
		<v-col cols="12" md="8">
			<MultaListPagadasPendientes v-if="multaStore.multaEquipo" />
		</v-col>
	</v-row>
	<MultaFormModal actionType="crear" :isOpen="isDialogOpen" @closeDialog="isDialogOpen = false" />
</template>

<script setup>
import { ref } from "vue";
import { useDatabaseStore } from "@/stores/database";
import { useMultaStore } from "@/stores/multa";
import MultaFormModal from "@/components/multa/MultaFormModal.vue";
import MultaList from "@/components/multa/MultaList.vue";
import MultaSelectorEquipo from "@/components/multa/MultaSelectorEquipo.vue";
import MultaListPagadasPendientes from "@/components/multa/MultaListPagadasPendientes.vue";

const multaStore = useMultaStore();
const databaseStore = useDatabaseStore();
databaseStore.getJugadores();
const isDialogOpen = ref(false);
</script>

<style scoped>
.text-field-price-width {
	max-width: 92px;
}
</style>
