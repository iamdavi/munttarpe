<template>
  <v-row class="mt-container">
    <v-col>
      <div class="d-flex justify-space-between align-center">
        <div class="d-flex align-center ga-2">
          <v-icon icon="mdi-calendar-multiselect" size="large"></v-icon>
          <h1>Calendario</h1>
        </div>
        <v-btn
          class="float-right"
          color="green-darken-1"
          prepend-icon="mdi-plus"
          variant="outlined"
        >
          Crear
        </v-btn>
      </div>
    </v-col>
  </v-row>
  <v-row>
    <v-col class="flex-grow-0 flex-shrink-0">
      <v-date-picker
        :landscape="true"
        title="Calendario de entrenamientos y partidos"
        locale="es"
        v-model="selectedDate"
        show-adjacent-months
        ref="datePicker"
      ></v-date-picker>
    </v-col>
    <v-col class="flex-grow-1 flex-shrink-0">
      <h3>Todos los eventos</h3>
      <v-row>
        <v-col lg="3" md="6" sm="12" v-for="(event, n) in events" :key="n">
          <v-card
            prepend-icon="mdi-strategy"
            :variant="event.type == 'Partido' ? 'outlined' : 'tonal'"
            :color="event.color"
            :title="event.type"
            :subtitle="event.equipo"
          ></v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      selectedDate: null,
      events: [
        {
          date: "2024-09-12",
          color: "#FF0000",
          type: "Entrenamiento",
          hora: "19:00",
          equipo: "Senior Masculino",
        },
        {
          date: "2024-09-12",
          color: "#00FF00",
          type: "Entrenamiento",
          hora: "19:00",
          equipo: "Senior Masculino",
        },
        {
          date: "2024-09-13",
          color: "#0000FF",
          type: "Entrenamiento",
          hora: "19:00",
          equipo: "Senior Masculino",
        },
      ],
    };
  },
  watch: {
    selectedDate: "updateEventMarkers",
  },
  mounted() {
    this.updateEventMarkers();
  },
  methods: {
    updateEventMarkers() {
      // Usa un timeout para asegurar que el DOM esté renderizado
      this.$nextTick(() => {
        const datePicker = this.$refs.datePicker.$el;
        const cells = datePicker.querySelectorAll(".v-date-picker-month__day");

        cells.forEach((cell) => {
          const date = cell.getAttribute("data-v-date");
          const events = this.events.filter((event) => event.date === date);

          if (events.length) {
            const eventDots = document.createElement("div");
            eventDots.classList.add("event-dots");
            events.forEach((event) => {
              const dot = document.createElement("div");
              dot.classList.add("event-dot");
              dot.style.backgroundColor = event.color;
              eventDots.appendChild(dot);
            });
            cell.appendChild(eventDots);
          }
        });
      });
    },
  },
};
</script>
