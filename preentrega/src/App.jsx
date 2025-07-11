import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './layouts/home'
import Productos from './components/productos';
import Carrito from './components/carrito';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav'
import About from './components/About';
import Contacto from './components/Contacto';
import ProductoDetalle from './components/productoDetalle';
import Login2 from './components/login2';
import Admin from './components/Admin';
import { Navigate } from 'react-router-dom';
import Footer from './components/Footer';
import Perfil from './components/profile';
import FormularioProducto from './components/formularioProd';
import { dispararSweet } from './assets/sweetalert'
import FormularioEdicion from './components/formularioEdicion';
import { useAuthContext } from './context/AuthContext'
import { useEffect } from 'react';
import Header from './components/Header';

function App() {
  const {verificacionLog} = useAuthContext();
  useEffect(() => {
          verificacionLog();
      }, []);

  return (
    <Router>
      <div id="root">
        <Header/>
        <Nav/>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos/>} />  
            <Route path="/carrito" element={<Carrito/>} />    
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contacto />} />
            <Route path="/productos/:id" element={<ProductoDetalle/>} />
            <Route path = "/login" element = {<Login2/>}/>
            <Route path="/admin" element={<Admin />} />
            <Route path="/profile" element={<Perfil />} />
            <Route path="/admin/agregar-producto" element={<FormularioProducto />} />
            <Route path="/admin/editarProducto/:id" element={<FormularioEdicion />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

//<Route path="/login" element={<Login user={usuarioLogeado} admin={adminLogeado} setLogeadoAdmin={manejarAdmin} setLogeadoUser={manejarUser} />} />