import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB47kghLSRqvmlqtOdtlmIdNSlGg7Jesng",
  authDomain: "legapauperlivorno-a8228.firebaseapp.com",
  projectId: "legapauperlivorno-a8228",
  storageBucket: "legapauperlivorno-a8228.appspot.com",
  messagingSenderId: "709133106077",
  appId: "1:709133106077:web:a8cd4875fc312b961fcd74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;