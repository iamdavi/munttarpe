import { defineStore } from "pinia";
import { db } from "../firebaseConfig";
import { collection, query, getDocs, addDoc, doc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";

export const useDatabaseStore = defineStore("database", {
  state: () => ({
    equipos: [],
    jugadores: [],
    loadingDoc: false,
    loadingDeleteDoc: false,
  }),
  actions: {
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
    async getJugadores() {
    }
  },
});
