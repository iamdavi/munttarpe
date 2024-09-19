<template>
  <v-row class="mt-container">
    <v-col>
      <div class="d-flex justify-space-between align-center">
        <div class="d-flex align-center ga-2">
          <v-icon icon="mdi-calendar-multiselect" size="large"></v-icon>
          <h1>Eventos</h1>
        </div>
      </div>
    </v-col>
  </v-row>
  <v-row>
    <v-col class="flex-grow-0 flex-shrink-0">
      <v-date-picker
        :weekdays="[1, 2, 3, 4, 5, 6, 0]"
        first-day-of-week="1"
        location="es eu"
        v-model="selectedDate"
        show-adjacent-months
        ref="datePicker"
        elevation="4"
      ></v-date-picker>
      <v-btn
        color="green-darken-1"
        prepend-icon="mdi-plus"
        class="mt-3"
        variant="outlined"
        block
        @click="
          eventType = 'period';
          isDialogOpen = true;
        "
      >
        Crear evento periodico
      </v-btn>
    </v-col>
    <v-col class="flex-grow-1 flex-shrink-0">
      <v-row>
        <v-col cols="12" class="d-flex justify-space-between align-center">
          <h3>Todos los eventos</h3>
          <v-btn
            variant="outlined"
            prepend-icon="mdi-plus"
            color="green-darken-1"
            @click="
              eventType = 'day';
              isDialogOpen = true;
            "
          >
            Crear evento para {{ formatedDate }}
          </v-btn>
        </v-col>
        <v-col
          lg="3"
          md="6"
          sm="12"
          v-for="(event, n) in databaseStore.eventos"
          :key="n"
        >
          <EventoCard
            :evento="event"
            :equipos="getEquipoDataById(event.equipos)"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  <EventoFormModal
    :isOpen="isDialogOpen"
    actionType="crear"
    :eventType="eventType"
    :eventDay="formatedDate"
    @closeDialog="isDialogOpen = false"
  />
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from "vue";
import { useDate } from "vuetify";
import EventoFormModal from "@/components/evento/EventoFormModal.vue";
import EventoCard from "@/components/evento/EventoCard.vue";
import { useDatabaseStore } from "@/stores/database";

const databaseStore = useDatabaseStore();
databaseStore.getEvents();

const date = useDate();
const eventType = ref(null);
const isDialogOpen = ref(false);
const datePicker = ref(null);
const selectedDate = ref(new Date());
const formatedDate = ref(date.format(selectedDate, "keyboardDate"));

const getEquipoDataById = (ids) => {
  const teamsIds = Object.values(ids);
  return databaseStore.equipos.filter((e) => {
    return teamsIds.includes(e.id);
  });
};

const updateEventMarkers = () => {
  // Usa un timeout para asegurar que el DOM esté renderizado
  nextTick(() => {
    const cells = datePicker.value.$el.querySelectorAll(
      ".v-date-picker-month__day"
    );
    cells.forEach((cell) => {
      const date = cell.getAttribute("data-v-date");
      const eventsToHandle = databaseStore.eventos.filter(
        (event) => event.date === date
      );

      if (eventsToHandle.length) {
        const eventDots = document.createElement("div");
        eventDots.classList.add("event-dots");
        eventsToHandle.forEach((event) => {
          const dot = document.createElement("div");
          dot.classList.add("event-dot");
          dot.style.backgroundColor = event.color;
          eventDots.appendChild(dot);
        });
        cell.appendChild(eventDots);
      }
    });
  });
};

onMounted(() => {
  updateEventMarkers();
  databaseStore.getEquipos();
});

watch(selectedDate, (newVal) => {
  formatedDate.value = date.format(newVal, "keyboardDate");
  updateEventMarkers();
});
</script>
