import React, { createContext, useState, useContext } from 'react';
// Crear el contexto de autenticación
const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);
  // Estado para manejar si el usuario es admin, por defecto es false
  
  
  //TODO : Implementar lógica para verificar si el usuario es admin
  const login = (username, isAdmin = true) => {
    // Simulando la creación de un token (en una app real, esto sería generado por un servidor)
    const token = `fake-token-${username}`;
    localStorage.setItem('authToken', token);
    //setitem para guardar el token en localStorage, asi no se pierde al recargar la pagina
    setUser(username);
    setAdmin(isAdmin);
    console.log(`Usuario ${username} ha iniciado sesión.`);
  };
  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setAdmin(false);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout, admin }}>
      {children}
    </AuthContext.Provider> );
}
export const useAuthContext = () => useContext(AuthContext);