<template>
	<v-row class="mt-container">
		<v-col>
			<div class="d-flex justify-space-between align-center">
				<div class="d-flex align-center ga-2">
					<v-icon icon="mdi-invoice-text-outline" size="large"></v-icon>
					<h1>Multas</h1>
				</div>
				<v-btn class="float-right" color="green-darken-1" prepend-icon="mdi-plus" variant="outlined"
					@click="isDialogOpen = true;">
					Crear
				</v-btn>
			</div>
		</v-col>
	</v-row>
	<v-row>
		<v-col cols="12" lg="3" md="5">
			<v-card title="Lista de multas y precios" prepend-icon="mdi-format-list-numbered" variant="tonal">
				<v-card-text>
					<v-table density="compact">
						<thead>
							<tr></tr>
							<tr>
								<th class="text-left">
									<strong>
										Concepto
									</strong>
								</th>
								<th class="text-right">
									<v-icon icon="mdi-currency-eur" size="small"></v-icon>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(multa, n) in multas" :key="multa.id">
								<td> {{ n }}</td>
								<td>{{ multa.concepto }}</td>
								<td>{{ multa.valor }}</td>
							</tr>
							<tr v-if="multas.length == 0">
								<td colspan="3" class="text-center">
									<i>- Todavía no se han creado multas -</i>
								</td>
							</tr>
						</tbody>
					</v-table>
					<v-card class="mt-3" variant="text" color="transparent">
						<v-form @submit.prevent="handleModalForm">
							<v-row dense>
								<v-col cols="7" class="pe-0">
									<v-text-field :loading="loading" :rounded="false" density="compact" label="Concepto" flat
										variant="solo-filled" hide-details single-line></v-text-field>
								</v-col>
								<v-col cols="3" class="ps-0">
									<v-text-field :loading="loading" :rounded="false" density="compact" label="00,00" flat
										variant="solo-filled" hide-details single-line>
										<template v-slot:append-inner>
											<v-fade-transition leave-absolute>
												<v-icon icon="mdi-currency-eur" size="x-small"></v-icon>
											</v-fade-transition>
										</template>
									</v-text-field>
								</v-col>
								<v-col cols="2" class="d-flex justify-center align-center">
									<v-btn block color="success" type="submit">
										<v-icon icon="mdi-plus"></v-icon>
									</v-btn>
								</v-col>
							</v-row>
						</v-form>
					</v-card>
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
</template>

<script setup>
import { ref } from 'vue'

const isDialogOpen = ref(true)
// Loading del form
const loading = ref(false)
const loaded = ref(false)
const multas = ref([])

const onClick = () => {
	loading.value = true

	setTimeout(() => {
		loading.value = false
		loaded.value = true
	}, 2000)
}

const handleModalForm = () => {
	console.log('crear multa')
}
</script>