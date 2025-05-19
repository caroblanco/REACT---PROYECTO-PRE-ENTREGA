import '../styles/carrito.css'
import CardCarrito from './cardCarrito.jsx';
import { useState } from 'react';

function Carrito({productosCarrito, funcionBorrar, total}){

 

    return (
        <div className='carrito-container'>
            {productosCarrito.length > 0 ? productosCarrito.map((producto) => (
                <>
                <CardCarrito producto={producto} funcionBorrar={funcionBorrar} /> 
                </>
            ))
            : <h3>El carrito esta vacio</h3>}
            {total > 0 ? <span>Total: {total.toFixed(2)} </span> : <></>}
        </div>
    );
}
//<span>Subtotal: ${productos.reduce((total, producto) => total + producto.precio, 0).toFixed(2)}</span>
export default Carrito;