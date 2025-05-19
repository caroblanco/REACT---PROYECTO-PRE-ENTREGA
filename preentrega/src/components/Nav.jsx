import React from 'react';  
import { Link } from 'react-router-dom';
import home from "../assets/hogar.png"
import acerca from "../assets/acerca-de.png"
import call from "../assets/llamar.png"
import Productos from './productos.jsx';
import Carrito from './carrito.jsx';
import '../styles/nav.css';
import { useContext } from 'react';
import { CarritoContext } from '../context/carritoContext.jsx';

function Nav({}) {  
    const {productosCarrito} = useContext(CarritoContext);
    return (  
        <nav className="nav-bar">  
            <ul style={{ listStyle: "none", display: "flex", justifyContent: "space-around", margin: 0, alignItems:"center" }}>  
                <li className="nav-bar li">
                    <Link to="/" >Inicio</Link>
                </li>  
                <li className="nav-bar li">
                    <Link to="/productos" >Productos</Link>
                </li>   
                <li className="nav-bar li">
                    <Link to="/carrito" >Carrito<span >{productosCarrito.length > 0 ? ": "+productosCarrito.length : ""}</span></Link>
                </li>  
                <li className="nav-bar li">
                    <Link to="/login" >Login</Link>
                </li>  
            </ul>  
        </nav>  
    );  
}  


export default Nav; 