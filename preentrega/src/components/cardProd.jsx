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
                    <div className="productos-card mb-3">
                        <div>
                        <h3 className = "mt-3">{producto.nombre}</h3>
                        
                        <img className='productos-image mb-2' src={producto.imagen}></img>
                        <p style={{fontWeight: 'bold'}}>${producto.precio}</p>
                        <div className="mb-3 d-flex justify-content-center align-items-center gap-2">
                          <button className="cantidad-button" onClick={handleDecrement}>-</button>
                          <span style={{ minWidth: 24, textAlign: "center",color:"black" }}>{cantidad}</span>
                          <button className="cantidad-button" onClick={handleIncrement}>+</button>
                        </div>
                        <button className="btn btn-success mb-2 w-100" onClick={handleAddToCart}>Agregar al carrito</button>
                        <button className="btn btn-outline-secondary mb-3 w-100" onClick={navegar}>Ver producto</button>
                        </div>
                    </div>
    </div>
  );
}

export default CardProd;



//tambien podria haber usado <Link to={`/productos/${producto.id}`}><button className='productos-button' onClick={navegar}>Ver producto</button></Link> para navegar a la ruta deseada