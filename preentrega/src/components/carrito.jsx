import '../styles/carrito.css'
import CardCarrito from './cardCarrito.jsx';
import { useState } from 'react';  
import { useContext } from 'react';
import { CarritoContext } from '../context/carritoContext.jsx';

function Carrito({}){
    const {productosCarrito, vaciarCarrito, borrarProdCarrito, total} = useContext(CarritoContext);

    return (
        <div className='carrito-container'>
            {productosCarrito.length > 0 ? productosCarrito.map((producto) => (
                <>
                <CardCarrito producto={producto} funcionBorrar={borrarProdCarrito} /> 
                </>
            ))
            : <h3>El carrito esta vacio</h3>}
            {total > 0 ? <span>Total: {total.toFixed(2)} </span> : <></>}
        </div>
    );
}
//<span>Subtotal: ${productos.reduce((total, producto) => total + producto.precio, 0).toFixed(2)}</span>
export default Carrito;