import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext.jsx';

export default function Admin(){
    const {user} = useAuthContext();
    if(!user){
        return <Navigate to="/login" replace/>
    }
    return(
        <div>
            <h1>Admin</h1>
            <p>Esta es la pagina de administracion</p>
        </div>
    )
}