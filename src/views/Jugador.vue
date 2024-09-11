<template>
	<v-row class="mt-container">
		<v-col>
			<div class="d-flex justify-space-between align-center">
				<div class="d-flex align-center ga-2">
					<v-icon icon="mdi-handball" size="large"></v-icon>
					<h1>Jugadores</h1>
				</div>
				<v-btn class="float-right" color="green-darken-1" prepend-icon="mdi-plus" variant="outlined">
					Crear
				</v-btn>
			</div>
		</v-col>
	</v-row>
	<v-row>
		<v-col class="d-flex ga-8 overflow-x-auto">
			<div v-for="n in 15" :key="n">
				<v-card color="green-darken-1" variant="tonal" min-height="200" width="300">
					<IconPlayer />
					<v-card-item>
						<div>
							<div class="text-overline mb-1">
								{{ jugador.nombre }}
							</div>
							<div class="text-h6 mb-1">
								Headline
							</div>
							<div class="text-caption">Greyhound divisely hello coldly fonwderfully</div>
						</div>
					</v-card-item>

					<v-card-actions>
						<v-btn>
							Button
						</v-btn>
					</v-card-actions>
				</v-card>
			</div>
		</v-col>
	</v-row>
</template>

<script setup>
import { ref } from 'vue'
import IconPlayer from "@/components/icons/MunttarpeLogoPlayer.vue";

const model = ref(null)

const jugador =
{
	nombre: 'David',
	apellidos: 'Otero Mato',
	mote: 'Gallego',
	genero: 'Masculino',
	posicion: 'Portero',
	dorsal: 26
}


</script>