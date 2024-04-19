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
  apiKey: "AIzaSyC1f6whE_XgjYai2bmYfEFA2A5U2E7OdM0",
  authDomain: "mtg-lpl.firebaseapp.com",
  projectId: "mtg-lpl",
  storageBucket: "mtg-lpl.appspot.com",
  messagingSenderId: "673909880857",
  appId: "1:673909880857:web:704af4975314be52031288"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;