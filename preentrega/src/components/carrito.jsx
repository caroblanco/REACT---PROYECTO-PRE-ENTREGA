import '../styles/carrito.css'
import CardCarrito from './cardCarrito.jsx';
import { useState } from 'react';  
import { useContext } from 'react';
import { CarritoContext } from '../context/carritoContext.jsx';
import { Navigate } from 'react-router-dom';

function Carrito({usuarioLogeado}){
    const {productosCarrito, vaciarCarrito, borrarProdCarrito, total} = useContext(CarritoContext);

    if(!usuarioLogeado){
        return(
            <Navigate to="/login" replace/>
        )
    }
    
    return (
        <div className='carrito-container'>
            {productosCarrito.length > 0 ? productosCarrito.map((producto) => (
                <>
                <CardCarrito producto={producto} funcionBorrar={borrarProdCarrito} /> 
                </>
            ))
            : <h3>El carrito esta vacio</h3>}
            {total > 0 ? <span>Total: {total.toFixed(2)} </span> : <></>}
            {productosCarrito.length > 0 ? <button className='carrito-button' onClick={vaciarCarrito}>Vaciar carrito</button> : <></>}
        </div>
    );
}
//<span>Subtotal: ${productos.reduce((total, producto) => total + producto.precio, 0).toFixed(2)}</span>
export default Carrito;