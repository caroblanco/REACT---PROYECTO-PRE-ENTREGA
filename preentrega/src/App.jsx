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
import  './app.css'

function App() {
  const [productosCarrito, setProductosCarrito] = useState([])
  const [usuarioLogeado, setUsuarioLogeado] = useState(false)
  const [adminLogeado, setAdminLogeado] = useState(false)
  const [total, setTotal] = useState(0)

  function funcionCarrito(producto) {
    const existe = productosCarrito.find((item) => item.id === producto.id);
    let productosActualizados;

    if (existe) {
        productosActualizados = productosCarrito.map((item) => {
            if (item.id === producto.id) {
                return { ...item, cantidad: item.cantidad + producto.cantidad };
            }
            return item;
        });
    } else {
        productosActualizados = [...productosCarrito, producto];
    }

    setProductosCarrito(productosActualizados);

    // Calcula el total usando el array actualizado
    const totalActualizado = productosActualizados.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    setTotal(totalActualizado);
  }

  function borrarProdCarrito(id) {
    const productosActualizados = productosCarrito.filter((item) => item.id !== id);
    setProductosCarrito(productosActualizados);
    const totalActualizado = productosActualizados.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    setTotal(totalActualizado);
    
  } 
  
  function manejarAdmin() {
    setAdminLogeado(!adminLogeado);
  }

  function manejarUser() {
    setUsuarioLogeado(!usuarioLogeado);
  }

  return (
    <Router>
      <div id="root">
        <Nav productosCarrito={productosCarrito} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos funcionCarrito={funcionCarrito} />} />  
            <Route path="/carrito" element={<Carrito productosCarrito={productosCarrito} funcionBorrar={borrarProdCarrito} total = {total}/>} />    
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contacto />} />
            <Route path="/productos/:id" element={<ProductoDetalle funcionCarrito={funcionCarrito} />} />
            <Route path="/login" element={<Login setLogeadoAdmin={manejarAdmin} setLogeadoUser={manejarUser} />} />
            <Route path="/admin" element={adminLogeado ? <Admin /> : <Navigate to="/login" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
