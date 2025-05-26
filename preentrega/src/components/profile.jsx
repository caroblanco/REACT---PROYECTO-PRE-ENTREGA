import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext.jsx';

function Perfil() {
    const {user} = useAuthContext();
    const{logout} = useAuthContext();
    if(!user){
        return <Navigate to="/login" replace/>
    }
  return (
    <div>
      <h1>Perfil</h1>
      <p>Este es el perfil de Carolina Blanco</p>
      <button onClick={logout}>Cerrar Sesion</button>
    </div>
  );
}

export default Perfil;