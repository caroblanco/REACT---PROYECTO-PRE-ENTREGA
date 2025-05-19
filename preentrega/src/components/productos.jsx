import '../styles/productos.css';
import React, { useState, useEffect } from 'react';
import Carrito from './carrito.jsx';
import CardProd from './cardProd.jsx';
import { useContext } from 'react';
import { CarritoContext } from '../context/carritoContext.jsx';

function Productos({}) {
    const [productos, setProductos] = useState([]); // Local state for products
    //const [productosCarrito, setProductosCarrito] = useState([]);
    const [cargando, setCargando] = useState(true); // Set initial loading state to true
    const [error, setError] = useState(null);
    const {funcionCarrito} = useContext(CarritoContext);

    useEffect(() => {
        fetch('https://6810114727f2fdac24103476.mockapi.io/products/product')
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                setProductos(datos); // Update local productos state
                setCargando(false);
            })
            .catch((error) => {
                setError('Hubo un problema al cargar los productos.');
                setCargando(false);
            });
    }, []);

    /*function funcionCarrito(producto) {
        const existe = productosCarrito.find((item) => item.id === producto.id);
        if (existe) {
            const productosActualizados = productosCarrito.map((item) => {
                if (item.id === producto.id) {
                    return { ...item, cantidad: item.cantidad + producto.cantidad };
                }
                return item;
            });
            setProductosCarrito(productosActualizados);
        } else {
            setProductosCarrito([...productosCarrito, producto]);
        }
    }*/


    

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