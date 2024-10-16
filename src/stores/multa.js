import { defineStore } from "pinia";
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { groupMultasByPlayer } from "@/helpers/multa.js";

export const useMultaStore = defineStore("multa", {
  state: () => ({
    multas: [],
    multasJugador: [],
    multasGroupedByJugador: [],
    jugadoresEquipo: [],
    multaEquipo: null,
    loadingDoc: false,
    loadingDeleteDoc: false,
  }),
  actions: {
    // Multas
    async getMultasEquipo() {
      this.loadingDoc = true;
      try {
        const q = query(
          collection(db, "multas"),
          where("equipo", "==", this.multaEquipo)
        );
        const qs = await getDocs(q);
        this.multas = [];
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
      let payload = { ...data, equipo: this.multaEquipo };
      this.loadingDoc = true;
      try {
        const docRef = await addDoc(collection(db, "multas"), payload);
        this.multas.push({
          id: docRef.id,
          ...payload,
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async deleteMulta(id) {
      this.loadingDeleteDoc = true;
      try {
        const docRef = doc(db, "multas", id);
        await deleteDoc(docRef);
        this.multas = this.multas.filter((item) => item.id !== id);
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDeleteDoc = false;
      }
    },
    async editMulta(multa) {
      const multaId = multa.id;
      try {
        const docRef = doc(db, "multas", multaId);
        const changedFields = {
          ...multa,
        };
        delete changedFields.id;
        await updateDoc(docRef, changedFields);
        this.multas = this.multas.map((item) => {
          if (item.id === multaId) {
            return { ...item, ...changedFields };
          }
          return item;
        });
      } catch (error) {
        console.log(error);
      } finally {
      }
    },
    // MultasJugador
    async getMultasJugador() {
      if (this.multasJugador.length !== 0) return;
      this.loadingDoc = true;
      try {
        const q = query(collection(db, "multasJugador"));
        const qs = await getDocs(q);
        qs.forEach((d) => {
          this.multasJugador.push({
            id: d.id,
            ...d.data(),
          });
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.multasGroupedByJugador = []
        const results = await groupMultasByPlayer();
        for (const value of Object.values(results)) {
          this.multasGroupedByJugador.push(value)
        }
        this.loadingDoc = false;
      }
    },
    async getJugadoresEquipo() {
      this.loadingDoc = true;
      try {
        const q = query(
          collection(db, "jugadores"),
          where("equipo", "==", this.multaEquipo)
        );
        const qs = await getDocs(q);
        this.jugadoresEquipo = [];
        qs.forEach((d) => {
          this.jugadoresEquipo.push({
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
    async createMultaJugador(data) {
      let payload = { ...data };
      this.loadingDoc = true;
      try {
        const docRef = await addDoc(collection(db, "multasJugador"), payload);
        this.multasJugador.push({
          id: docRef.id,
          ...payload,
        });
        console.log('multa creada');

      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
        this.multasGroupedByJugador = []
        console.log('agupando multas');

        const results = await groupMultasByPlayer();
        for (const value of Object.values(results)) {
          this.multasGroupedByJugador.push(value)
        }
      }
    },
    async deleteMultasById(arrayIds) {
      this.loadingDeleteDoc = true;
      try {
        const promesas = arrayIds.map(async (id) => {
          const docRef = doc(db, 'multasJugador', id);
          await deleteDoc(docRef);
        });
        await Promise.all(promesas);
        this.multasJugador = this.multasJugador.filter(
          (item) => !arrayIds.includes(item.id)
        );
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingDeleteDoc = false;
        this.multasGroupedByJugador = []
        const results = await groupMultasByPlayer();
        for (const value of Object.values(results)) {
          this.multasGroupedByJugador.push(value)
        }
      }
    },
    async deleteMultaJugador(id) {
      this.loadingDeleteDoc = true;
      try {
        const docRef = doc(db, "multasJugador", id);
        await deleteDoc(docRef);
        this.multasJugador = this.multasJugador.filter(
          (item) => item.id !== id
        );
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDeleteDoc = false;
        this.multasGroupedByJugador = []
        const results = await groupMultasByPlayer();
        for (const value of Object.values(results)) {
          this.multasGroupedByJugador.push(value)
        }
      }
    },
    async editMultaJugador(multa) {
      const multaId = multa.id;
      try {
        const docRef = doc(db, "multasJugador", multaId);
        const changedFields = {
          ...multa,
        };
        delete changedFields.id;
        await updateDoc(docRef, changedFields);
        this.multasJugador = this.multasJugador.map((item) => {
          if (item.id === multaId) {
            return { ...item, ...changedFields };
          }
          return item;
        });
      } catch (error) {
        console.log(error);
      } finally {
      }
    },
  },
});
