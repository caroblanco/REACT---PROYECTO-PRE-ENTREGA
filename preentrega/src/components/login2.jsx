import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { crearUsuario, iniciarSesion } from '../auth/firebase';
import { dispararSweet } from '../assets/sweetalert.js';

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
        dispararSweet('Error al iniciar sesión','Credenciales incorrectas.', 'error','Cerrar');
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
        dispararSweet('Error al registrar usuario','No se ha podido registrar el usuario.', 'error','Cerrar');
      });
  }

  if (showRegister) {
    return (
      <div className='d-flex justify-content-center align-items-center mt-3'>
        <form className="p-4 border rounded shadow w-50 " onSubmit={handleRegister}>
          <h2>Registrarse</h2>
          <div className="mb-3 ">
            <label className="form-label">Email</label>
            <input type="text"
                    value={registerUser}
                    onChange={(e) => setRegisterUser(e.target.value)} className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input type="password"
                    value={registerPass}
                    onChange={(e) => setRegisterPass(e.target.value)} className="form-control" required />
          </div>
          <div className="d-grid gap-2 col-6 mx-auto">
            <button className="btn btn-primary">Registrarse</button>
            <button type="button" className="btn btn-secondary" onClick={() => setShowRegister(false)}>Iniciar sesión</button>
          </div>
        </form>
      </div>
    );
  } else{
    return (
    <div className='d-flex justify-content-center align-items-center mt-3'>
      <form className="p-4 border rounded shadow w-50 " onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>
        <div className="mb-3 ">
          <label className="form-label">Email</label>
          <input type="text"
              value={loginUser}
              onChange={(e) => setLoginUser(e.target.value)} className="form-control" required/>
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input type="password"
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)} className="form-control" required />
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button className="btn btn-primary">Iniciar sesión</button>
          <button type="button" className="btn btn-secondary" onClick={() => setShowRegister(true)}>Registrarse</button>
        </div>
      </form>
    </div>
  );
  }
  
}

export default Login;

    