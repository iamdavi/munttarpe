<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-title>
        <v-icon
          icon="mdi-invoice-list-outline"
          size="small"
          class="me-3"
        ></v-icon>
        Conceptos de multas
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-list density="compact" nav class="pa-0">
          <v-list-item
            v-for="(multa, i) in multaStore.multas"
            :key="multa.id"
            :value="multa"
          >
            <template v-slot:prepend>
              <strong class="me-2">{{ i + 1 }}.</strong>
            </template>

            <v-list-item-title
              class="d-flex justify-space-between align-center"
            >
              <div class="text-body-1">
                {{ multa.concepto }}
              </div>
              <div class="d-flex align-center">
                <span>
                  {{ multa.valor }}
                  <v-icon icon="mdi-currency-eur" size="small"></v-icon>
                </span>
                <v-btn
                  class="ms-2"
                  density="compact"
                  variant="text"
                  color="error"
                  icon="mdi-close-circle-outline"
                  :disabled="multaStore.loadingDeleteDoc"
                  @click="multaStore.deleteMulta(multa.id)"
                ></v-btn>
              </div>
            </v-list-item-title>
          </v-list-item>
          <v-list-item v-if="multaStore.multas.length == 0" class="text-center">
            <v-list-item-title>
              <i>- No se han creado conceptos de multas -</i>
            </v-list-item-title>
          </v-list-item>
          <v-divider class="mb-3 mt-0"></v-divider>
          <v-list-item class="pa-0">
            <v-form @submit.prevent="handleModalForm">
              <v-card variant="outlined">
                <v-card-text class="d-flex align-center pa-1 pe-2 ps-0">
                  <v-text-field
                    v-model="form.concepto"
                    density="compact"
                    label="Concepto"
                    variant="solo"
                    hide-details
                    single-line
                    flat
                  ></v-text-field>
                  <v-divider vertical></v-divider>
                  <v-text-field
                    v-model="form.valor"
                    class="text-field-price-width"
                    density="compact"
                    label="00,00"
                    variant="solo"
                    hide-details
                    single-line
                    flat
                  >
                    <template v-slot:append-inner>
                      <v-icon icon="mdi-currency-eur" size="x-small"></v-icon>
                    </template>
                  </v-text-field>
                  <v-btn
                    :loading="multaStore.loadingDoc"
                    color="green-darken-4"
                    type="submit"
                  >
                    <v-icon icon="mdi-invoice-text-fast-outline"></v-icon>
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-form>
          </v-list-item>
        </v-list>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import { ref } from "vue";
import { useMultaStore } from "@/stores/multa";

const multaStore = useMultaStore();

const form = ref({
  concepto: null,
  valor: null,
});

const clearForm = () => {
  form.value.concepto = null;
  form.value.valor = null;
};

const handleModalForm = () => {
  multaStore.createMulta(form.value);
  clearForm();
};
</script>

<style scoped>
.text-field-price-width {
  max-width: 92px;
}
</style>
