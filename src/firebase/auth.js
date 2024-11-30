import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
// import { sendEmailVerification, sendPasswordResetEmail, updatePassword } from "firebase/auth";
import { auth } from "./firebase";
import { GoogleAuthProvider } from "firebase/auth/cordova";

export const createUserWithEmailPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const doSignInWithEmailAndPassword = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const doSignInWithGoogle = async () => {
    const provider = GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result;
}

export const logOut = async () => {
    return auth.signOut();
}

// export const passwordReset = async (email) => {
//     return sendPasswordResetEmail(auth, email);
// }

// export const passwordChange = async (password) => {
//     return updatePassword(auth.currentUser, password);
// }

// export const sendVerificationEmail = async () => {
//     return sendEmailVerification(auth.currentUser, {url: window.location.origin + "/home"})
// }