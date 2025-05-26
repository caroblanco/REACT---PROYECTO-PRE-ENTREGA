import React, { use } from 'react';  
import { Link } from 'react-router-dom';
import '../styles/nav.css';
import { useContext } from 'react';
import { CarritoContext } from '../context/carritoContext.jsx';
import { useAuthContext } from '../context/AuthContext.jsx';

function Nav({}) {  
    const {productosCarrito} = useContext(CarritoContext);

    // Sumar la cantidad total de productos
    const totalCantidad = productosCarrito.reduce((acc, prod) => acc + (prod.cantidad || 0), 0);
    const {user} = useAuthContext();

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
                    <Link to="/carrito" >
                        Carrito
                        <span>
                            {totalCantidad > 0 ? `: ${totalCantidad}` : ""}
                        </span>
                    </Link>
                </li>  
                <li className="nav-bar li">
                    <Link to={user ? "/profile" : "/login"} >{user ? "Perfil" : "Login"}</Link>
                </li>  
            </ul>  
        </nav>  
    );  
}  


export default Nav;