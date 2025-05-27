import '../styles/carrito.css'
import CardCarrito from './cardCarrito.jsx';
import { use, useState } from 'react';  
import { useContext } from 'react';
import { CarritoContext } from '../context/carritoContext.jsx';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext.jsx';

function Carrito({}){
    const {productosCarrito, vaciarCarrito, borrarProdCarrito, total} = useContext(CarritoContext);
    const {user} = useAuthContext();

    if(!user){
        return(
            <Navigate to="/login" replace/>
        )
    }
    
    return (
        <div className='carrito-container'>
            <div>
            {productosCarrito.length > 0 ? productosCarrito.map((producto) => (
                <>
                <CardCarrito producto={producto} funcionBorrar={borrarProdCarrito} /> 
                </>
            ))
            : <h3>El carrito esta vacio</h3>}
            </div>
            <div>
                {total > 0 ? <span>Total: {total.toFixed(2)} </span> : <></>}
                {productosCarrito.length > 0 ? <button className='carrito-button' onClick={vaciarCarrito}>Vaciar carrito</button> : <></>}
            </div>
        </div>
    );
}
//<span>Subtotal: ${productos.reduce((total, producto) => total + producto.precio, 0).toFixed(2)}</span>
export default Carrito;