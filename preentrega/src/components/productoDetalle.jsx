import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/productoDetalle.css';
import { CarritoContext } from '../context/carritoContext.jsx';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { ProdContext } from '../context/ProdContext.jsx';

function ProductoDetalle({ }) {
    const {admin} = useContext(AuthContext);
    const { id } = useParams();
    const [cantidad, setCantidad] = useState(1);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const {funcionCarrito} = useContext(CarritoContext);
    const {buscarProducto, productoEncontrado, eliminarProducto} = useContext(ProdContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('ID del producto:', id); // Depuración
        buscarProducto(id)
            .then(() => {
                setCargando(false);
            })
            .catch((error) => {
                console.error('Error al cargar el producto:', error); // Depuración
                setError('Hubo un problema al cargar el producto.');
                setCargando(false);
            });
    }, [id]);

    function handleIncrement() {
        setCantidad(cantidad + 1);
    }

    function handleDecrement() {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        }
    }

    function handleAddToCart() {
        if (productoEncontrado) {
            const productoConCantidad = { ...productoEncontrado, cantidad };
            funcionCarrito(productoConCantidad);
        }
    }

    const handleEliminar = async (id) => {
        try {
            await eliminarProducto(id);
            navigate('/productos'); // Redirige antes de que el componente intente recargar el producto
        } catch (error) {
            // Manejo de error opcional
        }
    };

    if (cargando) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!productoEncontrado) {
        return <p>No se encontró el producto.</p>;
    }
     function navegar() {
    navigate(`/admin/editarProducto/${id}`); // Navega a la ruta deseada
    }

    return (
        <div >
            <h1>Detalle del Producto</h1>
                <div className="producto-detalle-container">
                <div className="producto-detalle-card">
                    <img src={productoEncontrado.imagen} alt={productoEncontrado.nombre} />
                </div>
                <div className="producto-detalle-card">
                    <h2>{productoEncontrado.nombre}</h2>
                    <p>{productoEncontrado.descripcion}</p>
                    <p style={{fontWeight: 'bold'}}>${productoEncontrado.precio}</p>
                    <div>
                        <button className="productos-button" onClick={handleDecrement}>-</button>
                        <span>{cantidad}</span>
                        <button className="productos-button" onClick={handleIncrement}>+</button>
                    </div>
                    {admin ? (<div>
                            <button className="productos-button" onClick={navegar}>Editar producto</button>
                            <button className="productos-button" onClick={() => handleEliminar(productoEncontrado.id)}>
  Eliminar producto
</button>
                            </div>
                        ) : (
                        <button className="productos-button" onClick={handleAddToCart}>Agregar al carrito</button>
                        )}
                </div>
            </div>
        </div>
    );
}

export default ProductoDetalle;