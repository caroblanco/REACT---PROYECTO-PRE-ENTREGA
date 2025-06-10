import '../styles/productos.css';
import React, { useState, useEffect } from 'react';
import Carrito from './carrito.jsx';
import CardProd from './cardProd.jsx';
import { useContext } from 'react';
import { CarritoContext } from '../context/carritoContext.jsx';
import { ProdContext } from '../context/ProdContext.jsx';

function Productos({}) {
    const [cargando, setCargando] = useState(true); // Set initial loading state to true
    const [error, setError] = useState(null);
    const {funcionCarrito} = useContext(CarritoContext);
    const {productos,obtenerProductos} = useContext(ProdContext);

    useEffect(() => {
        obtenerProductos()
            .then(() => setCargando(false))
            .catch(() => {
                setError('Hubo un problema al cargar los productos.');
                setCargando(false);
            });
    }, [obtenerProductos]);

    function funcionEnProductos(producto) { 
        funcionCarrito(producto);
    }

    if (cargando) {
        return <p>Cargando...</p>;
    } else if (error) {
        return <p>Error: {error}</p>;
    } else {
        return (
            <div>
                <div className="productos-container">
                    {productos.map((producto) => (
                        <CardProd
                            key={producto.id}
                            producto={producto}
                            funcionCarrito={funcionEnProductos}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default Productos;