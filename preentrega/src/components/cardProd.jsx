import '../styles/productos.css'
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { dispararSweet } from '../assets/sweetalert';

function CardProd({ producto, funcionCarrito }) {
  const [cantidad, setCantidad] = useState(1); // Local state for quantity
  const navigate = useNavigate(); // Hook para navegar


function handleIncrement() {
    setCantidad(cantidad + 1);
  }
function handleDecrement() {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  }

  function handleAddToCart() {
    const productoConCantidad = { ...producto, cantidad };
    dispararSweet("Producto agregado al carrito", "Se ha agregado exitosamente el producto al carrito","success","Cerrar");
    funcionCarrito(productoConCantidad);
  }

  function navegar() {
    navigate(`/productos/${producto.id}`); // Navega a la ruta deseada
  }
  

  return (
    <div className="productos-container">
                    <div className="productos-card">
                        <div>
                        <h3>{producto.nombre}</h3>
                        <p>{producto.descripcion}</p>
                        <img className='productos-image' src={producto.imagen}></img>
                        <p style={{fontWeight: 'bold'}}>${producto.precio}</p>
                        <div>
                          <button className="productos-button" onClick ={handleDecrement}>-</button>
                          <span>{cantidad}</span>
                          <button className="productos-button" onClick ={handleIncrement}>+</button>
                        </div>
                        <button className='productos-button' onClick={handleAddToCart}>Agregar al carrito</button>
                        <button className='productos-button' onClick={navegar}>Ver producto</button>
                        </div>
                    </div>
    </div>
  );
}

export default CardProd;



//tambien podria haber usado <Link to={`/productos/${producto.id}`}><button className='productos-button' onClick={navegar}>Ver producto</button></Link> para navegar a la ruta deseada