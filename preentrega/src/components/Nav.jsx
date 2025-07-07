import React, { use } from 'react';  
import { Link } from 'react-router-dom';
import '../styles/nav.css';
import { useContext } from 'react';
import { CarritoContext } from '../context/carritoContext.jsx';
import { useAuthContext } from '../context/AuthContext.jsx';
import { FaShoppingCart,FaUser, FaHome, FaPlus  } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";

function Nav({}) {  
    const {productosCarrito} = useContext(CarritoContext);

    // Sumar la cantidad total de productos
    const totalCantidad = productosCarrito.reduce((acc, prod) => acc + (prod.cantidad || 0), 0);
    const {user} = useAuthContext();
    const {admin} = useAuthContext();

    return (  
        <nav className="nav-bar">  
            <ul style={{ listStyle: "none", display: "flex", justifyContent: "space-around", margin: 0, alignItems:"center" }}>  
                <li className="nav-bar li">
                    <Link to="/" ><FaHome /> Inicio</Link>
                </li>  
                <li className="nav-bar li">
                    <Link to="/productos" ><TiThMenu /> Productos</Link>
                </li>   
                <li className="nav-bar li">
                    <Link to="/carrito" style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
                        <FaShoppingCart /> Carrito
                        {totalCantidad > 0 && (
                            <span
                                style={{
                                    display: "inline-block",
                                    minWidth: 22,
                                    height: 22,
                                    lineHeight: "22px",
                                    fontSize: "0.95em",
                                    background: "#6c63ff",
                                    color: "#fff",
                                    borderRadius: "50%",
                                    textAlign: "center",
                                    fontWeight: 700,
                                    marginLeft: 8,
                                    transition: "all 0.2s"
                                }}
                            >
                                {totalCantidad}
                            </span>
                        )}
                    </Link>
                </li>  
                <li className="nav-bar li">
                    <Link to={user ? "/profile" : "/login"} ><FaUser />{user ? " Perfil" : " Login"}</Link>
                </li>  
                {admin ? <li className="nav-bar li">
                    <Link to="/admin/agregar-producto" className="agregar-prod-link">
                        <FaPlus /> Agregar
                    </Link>
                </li> : null}
            </ul>  
        </nav>  
    );  
}  


export default Nav;