import { defineStore } from "pinia";
import { db } from '../firebaseConfig'
import { collection, query, getDocs } from 'firebase/firestore'

export const useDatabaseStore = defineStore('database', {
    state: () => ({
        equipos: []
    }),
    actions: {
        async getEquipos() {
            try {
                const q = query(collection(db, 'equipos'))
                const qs = await getDocs(q)
                qs.forEach(d => {
                    console.log(d.id, d.data());
                })
            } catch (error) {

            } finally {

            }
        }
    }
})