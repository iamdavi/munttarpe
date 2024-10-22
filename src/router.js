import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "./stores/user";

import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Equipo from "./views/Equipo.vue";
import Jugador from "./views/Jugador.vue";
import Calendario from "./views/Calendario.vue";
import Noticias from "./views/Noticias.vue";
import Multa from "./views/Multa.vue";
import MultaPagadas from "./views/MultaPagadas.vue";
import MultaEstadisticas from "./views/MultaEstadisticas.vue";

const requireAuth = async (to, from, next) => {
  const userStore = useUserStore();
  userStore.loadingSession = true;
  const user = await userStore.currentUser();
  if (user) {
    next();
  } else {
    next("/login");
  }
  userStore.loadingSession = false;
};

const routes = [
  { path: "/", component: Home },
  { path: "/equipos", component: Equipo, beforeEnter: requireAuth },
  { path: "/jugadores", component: Jugador, beforeEnter: requireAuth },
  { path: "/eventos", component: Calendario, beforeEnter: requireAuth },
  { path: "/noticias", component: Noticias, beforeEnter: requireAuth },
  { path: "/multas-pendientes", component: Multa, beforeEnter: requireAuth },
  { path: "/multas-pagadas", component: MultaPagadas, beforeEnter: requireAuth },
  { path: "/multas-estadisticas", component: MultaEstadisticas, beforeEnter: requireAuth },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
