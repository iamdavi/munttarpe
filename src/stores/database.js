import { defineStore } from "pinia";
import { db } from "../firebaseConfig";
import { collection, query, getDocs, addDoc, doc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";

export const useDatabaseStore = defineStore("database", {
  state: () => ({
    equipos: [],
    jugadores: [],
    eventos: [],
    multas: [],
    multaEquipo: null,
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
    async createEquipo(nombre, genero, color) {
      try {
        const newEquipo = { nombre: nombre, genero: genero, color: color }
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
          color: equipo.color,
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
    async deleteEvent(id) {
      this.loadingDeleteDoc = true
      try {
        const docRef = doc(db, 'eventos', id)
        await deleteDoc(docRef)
        this.eventos = this.eventos.filter(item => item.id !== id)
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingDeleteDoc = false
      }
    },
    async editEvent(event) {
      const eventId = event.id
      try {
        const docRef = doc(db, 'eventos', eventId)
        const changedFields = {
          ...event
        }
        delete changedFields.id
        await updateDoc(docRef, changedFields)
        this.eventos = this.eventos.map(item => {
          if (item.id === eventId) {
            return { ...item, ...changedFields }
          }
          return item
        })
      } catch (error) {
        console.log(error)
      } finally {
      }
    },
    // Multas
    async getMultas() {
      if (this.multas.length !== 0) return;
      this.loadingDoc = true;
      try {
        const q = query(collection(db, "multas"));
        const qs = await getDocs(q);
        qs.forEach((d) => {
          this.multas.push({
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
    async createMulta(data) {
      let payload = { ...data };
      this.loadingDoc = true;
      try {
        const docRef = await addDoc(collection(db, 'multas'), payload)
        this.multas.push({
          id: docRef.id,
          ...payload
        })
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async deleteMulta(id) {
      this.loadingDeleteDoc = true
      try {
        const docRef = doc(db, 'multas', id)
        await deleteDoc(docRef)
        this.multas = this.multas.filter(item => item.id !== id)
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingDeleteDoc = false
      }
    },
    async editMulta(multa) {
      const multaId = multa.id
      try {
        const docRef = doc(db, 'multas', multaId)
        const changedFields = {
          ...multa
        }
        delete changedFields.id
        await updateDoc(docRef, changedFields)
        this.multas = this.multas.map(item => {
          if (item.id === multaId) {
            return { ...item, ...changedFields }
          }
          return item
        })
      } catch (error) {
        console.log(error)
      } finally {
      }
    },
  },
});
