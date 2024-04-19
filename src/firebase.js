// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQalpFtQMYb4wZzEgN7gtl59z3Pr3EaFM",
  authDomain: "legapauperlivorno-lpl.firebaseapp.com",
  projectId: "legapauperlivorno-lpl",
  storageBucket: "legapauperlivorno-lpl.appspot.com",
  messagingSenderId: "612801096785",
  appId: "1:612801096785:web:189e5a0589d54ba4085c70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;