import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props) {
  const [currUser, setCurrUser] = useState("");
  const [loading, setLoading] = useState(true);

  function signUp(email, pass) {
    return auth.createUserWithEmailAndPassword(email, pass);
  }

  function logIn(email, pass) {
    return auth.signInWithEmailAndPassword(email, pass);
  }

  function logOut() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const val = {
    currUser,
    signUp,
    logIn,
    logOut,
    resetPassword,
  };
  return (
    <AuthContext.Provider value={val}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
}
