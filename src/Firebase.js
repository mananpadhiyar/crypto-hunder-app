import firebaseConfig from "./config/FirebaseConfig";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseApp = initializeApp(firebaseConfig);

// control + space -> get automatic snippet

const Auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { Auth, db };
