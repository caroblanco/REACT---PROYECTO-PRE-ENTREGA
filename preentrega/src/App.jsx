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
import Login from './components/Login';
import Admin from './components/Admin';
import { Navigate } from 'react-router-dom';
import Footer from './components/Footer';

function App() {
  const [usuarioLogeado, setUsuarioLogeado] = useState(false)
  const [adminLogeado, setAdminLogeado] = useState(false)

  function manejarAdmin() {
    setAdminLogeado(!adminLogeado);
  }

  function manejarUser() {
    setUsuarioLogeado(!usuarioLogeado);
  }

  return (
    <Router>
      <div id="root">
        <Nav/>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos/>} />  
            <Route path="/carrito" element={<Carrito usuarioLogeado={usuarioLogeado}/>} />    
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contacto />} />
            <Route path="/productos/:id" element={<ProductoDetalle/>} />
            <Route path="/login" element={<Login user={usuarioLogeado} admin={adminLogeado} setLogeadoAdmin={manejarAdmin} setLogeadoUser={manejarUser} />} />
            <Route path="/admin" element={adminLogeado ? <Admin /> : <Navigate to="/login" replace/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
