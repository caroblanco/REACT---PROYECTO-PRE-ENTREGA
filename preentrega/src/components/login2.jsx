import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { crearUsuario, iniciarSesion } from '../auth/firebase';

function Login() {
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [registerUser, setRegisterUser] = useState('');
  const [registerPass, setRegisterPass] = useState('');
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const [showRegister, setShowRegister] = useState(false);

  const handleSubmit = (e) => {
    let isAdmin = false; // Variable para determinar si el usuario es admin
    e.preventDefault();
    if (loginUser === 'admin@gmail.com') {
      isAdmin = true; // Si el usuario es admin, establecer isAdmin a true
    }
    iniciarSesion(loginUser, loginPass)
      .then((userCredential) => {
        login(userCredential.user, isAdmin);
        navigate('/');
      })
      .catch((error) => {
        alert('Credenciales incorrectas');
      });
  };

  function handleRegister(e) {
    e.preventDefault();
    if (username === 'admin@gmail.com') {
      isAdmin = true; // Si el usuario es admin, establecer isAdmin a true
    }
    crearUsuario(registerUser, registerPass)
      .then((userCredential) => {
        login(userCredential.user, isAdmin);
        navigate('/');
      })
      .catch((error) => {
        alert('Error al registrar usuario');
      });
  }

  if (showRegister) {
    return (
      <div>
        <form onSubmit={handleRegister}>
          <h2>Registrarse</h2>
          <div>
            <label>Mail:</label>
            <input
              type="text"
              value={registerUser}
              onChange={(e) => setRegisterUser(e.target.value)}
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              value={registerPass}
              onChange={(e) => setRegisterPass(e.target.value)}
            />
          </div>
          <button type="submit">Registrarse</button>
          
        </form>
        <button type="button" onClick={() => setShowRegister(false)}>Iniciar sesión</button>
      </div>
    );
  } else{
    return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>
        <div>
          <label>Mail:</label>
          <input
            type="text"
            value={loginUser}
            onChange={(e) => setLoginUser(e.target.value)}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={loginPass}
            onChange={(e) => setLoginPass(e.target.value)}
          />
        </div>
        <button type="submit">Iniciar sesión</button>
        
      </form>
      <button type="button" onClick={() => setShowRegister(true)}>Registrarse</button>
    </div>
  );
  }
  
}

export default Login;