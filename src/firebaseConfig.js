import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAkTLx_HUbwKOjXsPHJcv_bkthypiM0aN4",
  authDomain: "munttarpe-51210.firebaseapp.com",
  projectId: "munttarpe-51210",
  storageBucket: "munttarpe-51210.appspot.com",
  messagingSenderId: "649730358082",
  appId: "1:649730358082:web:df891cafceed7a27d666db",
};

initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { db, auth };
