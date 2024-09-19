import { defineStore } from "pinia";
import { db } from "../firebaseConfig";
import { collection, query, getDocs, addDoc, doc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";

export const useDatabaseStore = defineStore("database", {
  state: () => ({
    equipos: [],
    jugadores: [],
    eventos: [],
    loadingDoc: false,
    loadingDeleteDoc: false,
  }),
  actions: {
    // EQUIPOS
    async getEquipos() {
      if (this.equipos.length !== 0) return;
      this.loadingDoc = true;
      try {
        const q = query(collection(db, "equipos"));
        const qs = await getDocs(q);
        qs.forEach((d) => {
          this.equipos.push({
            id: d.id,
            ...d.data(),
          });
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async createEquipo(nombre, genero) {
      try {
        const newEquipo = { nombre: nombre, genero: genero }
        const docRef = await addDoc(collection(db, 'equipos'), newEquipo)
        this.equipos.push({
          id: docRef.id,
          ...newEquipo
        })
      } catch (error) {
        console.log(error);
      } finally {

      }
    },
    async editarEquipo(equipo) {
      const equipoId = equipo.id
      try {
        const docRef = doc(db, 'equipos', equipoId)
        const changedFields = {
          nombre: equipo.nombre,
          genero: equipo.genero,
        }
        await updateDoc(docRef, changedFields)
        this.equipos = this.equipos.map(item => {
          if (item.id === equipoId) {
            return { ...item, ...changedFields }
          }
          return item
        })
      } catch (error) {
        console.log(error)
      } finally {
      }
    },
    async eliminarEquipo(id) {
      this.loadingDeleteDoc = true
      try {
        const docRef = doc(db, 'equipos', id)
        await deleteDoc(docRef)
        this.equipos = this.equipos.filter(item => item.id !== id)
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingDeleteDoc = false
      }
    },
    // JUGADORES
    async getJugadores() {
      if (this.jugadores.length !== 0) return;
      this.loadingDoc = true;
      try {
        const q = query(collection(db, "jugadores"));
        const qs = await getDocs(q);
        qs.forEach((d) => {
          this.jugadores.push({
            id: d.id,
            ...d.data(),
          });
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async createJugador(jugador) {
      const newJugador = { ...jugador }
      delete newJugador.id
      try {
        const docRef = await addDoc(collection(db, 'jugadores'), newJugador)
        this.jugadores.push({
          id: docRef.id,
          ...newJugador
        })
      } catch (error) {
        console.log(error);
      } finally {

      }
    },
    async editarJugador(jugador) {
      const jugadorId = jugador.id
      try {
        const docRef = doc(db, 'jugadores', jugadorId)
        const changedFields = {
          ...jugador
        }
        delete changedFields.id
        await updateDoc(docRef, changedFields)
        this.jugadores = this.jugadores.map(item => {
          if (item.id === jugadorId) {
            return { ...item, ...changedFields }
          }
          return item
        })
        console.log(this.jugadores);

      } catch (error) {
        console.log(error)
      } finally {
      }
    },
    async eliminarJugador(id) {
      this.loadingDeleteDoc = true
      try {
        const docRef = doc(db, 'jugadores', id)
        await deleteDoc(docRef)
        this.jugadores = this.jugadores.filter(item => item.id !== id)
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingDeleteDoc = false
      }
    },
    // EVENTOS
    async getEvents() {
      if (this.eventos.length !== 0) return;
      this.loadingDoc = true;
      try {
        const q = query(collection(db, "eventos"));
        const qs = await getDocs(q);
        qs.forEach((d) => {
          this.eventos.push({
            id: d.id,
            ...d.data(),
          });
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async createEvent(data, eventType) {
      let payload = { ...data, eventType: eventType };
      console.log(payload);

      if (eventType == 'day') {
        delete payload.weeksday
      }
      try {
        const docRef = await addDoc(collection(db, 'eventos'), payload)
        this.eventos.push({
          id: docRef.id,
          ...payload
        })
      } catch (error) {
        console.log(error);
      } finally {

      }
    },
  },
});
