import { onAuthStateChanged } from 'firebase/auth';
import {useEffect, useState } from 'react'
import { auth } from '../firebase/firebase';


export const useAuth = () => {
    return AuthProvider();
}

export const AuthProvider = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser)
    return unsubscribe;
  }, [])

  const initializeUser = async (user) => {
    if(user){
        setCurrentUser({...user});
        setUserLoggedIn(true);
    }else{
        setCurrentUser(null);
        setUserLoggedIn(false);
    }
    setLoading(false);
  }

  return {
    currentUser,
    userLoggedIn,
    loading
  }

}

