import React, { createContext, useContext, useEffect, useState } from "react";
import { crearUsuario, iniciarSesion } from "../auth/firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      // Lógica de admin: puedes cambiar el email por el que quieras
      setAdmin(firebaseUser?.email === "admin@gmail.com");
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = (email, password) => iniciarSesion(email, password);
  const register = (email, password) => crearUsuario(email, password);
  const logout = () => signOut(getAuth());

  function verificacionLog(){
    return (
      new Promise((resolve, reject) => {
        const token = localStorage.getItem('authToken');
        if (token && token == `fake-token-admin@gmail.com`) {
          // Si hay un token, el usuario está autenticado
          setAdmin(true);
          resolve();
        } else if(token){
          setUser(true);
          setAdmin(true); //TODO ELIMINAR
          resolve();
        }
        else {
          // Si no hay token, el usuario no está autenticado
          reject(false);
        }
      }))
  };

  return (
    <AuthContext.Provider value={{ user, admin, login, register, logout, loading, verificacionLog }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}