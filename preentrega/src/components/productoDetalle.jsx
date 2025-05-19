import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/productoDetalle.css';
import { CarritoContext } from '../context/carritoContext.jsx';
import { useContext } from 'react';

function ProductoDetalle({ }) {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [cantidad, setCantidad] = useState(1);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const {funcionCarrito} = useContext(CarritoContext);

    useEffect(() => {
        console.log('ID del producto:', id); // Depuración
        fetch(`https://6810114727f2fdac24103476.mockapi.io/products/product/${id}`)
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                console.log('Datos del producto:', datos); // Depuración
                setProducto(datos);
                setCargando(false);
            })
            .catch((error) => {
                console.error('Error al cargar el producto:', error); // Depuración
                setError('Hubo un problema al cargar el producto.');
                setCargando(false);
            });
    }, [id]);// Dependencia de id para recargar el producto si cambia, cada vez que el id cambia, se vuelve a ejecutar el useEffect
    // Esto es útil si el componente se vuelve a montar con un nuevo id

    function handleIncrement() {
        setCantidad(cantidad + 1);
    }

    function handleDecrement() {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        }
    }

    function handleAddToCart() {
        if (producto) {
            const productoConCantidad = { ...producto, cantidad };
            funcionCarrito(productoConCantidad);
        }
    }

    if (cargando) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!producto) {
        return <p>No se encontró el producto.</p>;
    }

    return (
        <div >
            <h1>Detalle del Producto</h1>
                <div className="producto-detalle-container">
                <div className="producto-detalle-card">
                    <img src={producto.imagen} alt={producto.nombre} />
                </div>
                <div className="producto-detalle-card">
                    <h2>{producto.nombre}</h2>
                    <p>{producto.descripcion}</p>
                    <p style={{fontWeight: 'bold'}}>${producto.precio}</p>
                    <div>
                        <button className="productos-button" onClick={handleDecrement}>-</button>
                        <span>{cantidad}</span>
                        <button className="productos-button" onClick={handleIncrement}>+</button>
                    </div>
                    <button className="productos-button" onClick={handleAddToCart}>Agregar al carrito</button>
                </div>
            </div>
        </div>
    );
}

export default ProductoDetalle;