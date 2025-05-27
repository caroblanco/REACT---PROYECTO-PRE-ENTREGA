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

  const handleSubmit = (e) => {
    e.preventDefault();
    iniciarSesion(loginUser, loginPass)
      .then((userCredential) => {
        login(userCredential.user);
        navigate('/');
      })
      .catch((error) => {
        alert('Credenciales incorrectas');
      });
  };

  function handleRegister(e) {
    e.preventDefault();
    crearUsuario(registerUser, registerPass)
      .then((userCredential) => {
        login(userCredential.user);
        navigate('/');
      })
      .catch((error) => {
        alert('Error al registrar usuario');
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>
        <div>
          <label>Usuario:</label>
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
    </div>
  );
}

export default Login;