import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const getUserInfo = async (uid) => {
  try {
    const usersCollectionRef = collection(db, "users");
    const querySnapshot = await getDoc(doc(usersCollectionRef, uid));

    if (querySnapshot.exists()) {
      // Document exists, handle data
      const documentData = querySnapshot.data();
      return documentData;
    } else {
      // Document does not exist
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    throw new Error("Error fetching document");
  }
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await getUserInfo(user.uid);
        resolve(userData);
      } else {
        reject(new Error("No user logged in"));
      }
    });
  });
};
