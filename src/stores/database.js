import { defineStore } from "pinia";
import { db } from "../firebaseConfig";
import { collection, query, getDocs } from "firebase/firestore";

export const useDatabaseStore = defineStore("database", {
  state: () => ({
    equipos: [],
    loadingDoc: false,
  }),
  actions: {
    async getEquipos() {
      if (this.equipos.length !== 0) return;
      this.loadingDoc = true;
      try {
        const q = query(collection(db, "equipos"));
        const qs = await getDocs(q);
        qs.forEach((d) => {
          console.log(d.id, d.data());
          this.equipos.push({
            id: d.id,
            ...d.data(),
          });
        });
      } catch (error) {
      } finally {
        this.loadingDoc = false;
      }
    },
  },
});
