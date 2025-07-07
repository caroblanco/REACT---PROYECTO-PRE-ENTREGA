import '../styles/productos.css';
import React, { useState, useEffect } from 'react';
import Carrito from './carrito.jsx';
import CardProd from './cardProd.jsx';
import { useContext } from 'react';
import { CarritoContext } from '../context/carritoContext.jsx';
import { useProdContext } from '../context/ProdContext.jsx';
import { useAuthContext } from '../context/AuthContext.jsx';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function Productos({}) {
    const [cargando, setCargando] = useState(true); // Set initial loading state to true
    const [error, setError] = useState(null);
    const {funcionCarrito} = useContext(CarritoContext);
    const { tipos, obtenerProductos, productos, productosOriginales, filtrarProductos, filtrarPorTipo } = useProdContext();
    const [busqueda, setBusqueda] = useState('');
    const productosPorPagina = 10;
    const [paginaActual, setPaginaActual] = useState(1);
    const indiceUltimoProducto = paginaActual * productosPorPagina;
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
    const productosPagina = productos.slice(indicePrimerProducto, indiceUltimoProducto);
    const totalPaginas = Math.ceil(productos.length / productosPorPagina);
    const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);
    const [tipo,setTipo] = useState(null);
    

    useEffect(() => {
        obtenerProductos()
            .then(() => {
                setCargando(false);
            })
            .catch(() => {
                setError('Hubo un problema al cargar los productos.');
                setCargando(false);
            });
    }, []);

    function funcionEnProductos(producto) { 
        funcionCarrito(producto);
    }

    useEffect(()=>{
        filtrarPorTipo(tipo);
    },[tipo])

    useEffect(() => {
        if (productosOriginales && productosOriginales.length > 0) {
            filtrarProductos(busqueda);
        }
    }, [busqueda]);

    if (cargando) {
        return <p>Cargando...</p>;
    } else if (error) {
        return <p>Error: {error}</p>;
    } else {
        return (
            <div>
                <div className="d-flex justify-content-center align-items-center gap-2 mt-3 mb-4 flex-wrap">
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        className="form-control"
                        style={{ maxWidth: "260px", borderRadius: "18px" }}
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                    <DropdownButton
                        key="secondary"
                        id="dropdown-secondary-button"
                        title="Tipo de producto"
                        variant="secondary"
                        className="mb-0"
                        style={{ borderRadius: "18px" }}
                    >
                        <Dropdown.Item key="null" onClick={() => setTipo(null)}>Todos</Dropdown.Item>
                        <Dropdown.Divider />
                        {tipos.map((tipo, index) => (
                            <Dropdown.Item key={index} onClick={() => setTipo(tipo)}>
                                {tipo}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                </div>
                <div className="productos-container">
                    {productosPagina.map((producto) => (
                        <CardProd
                            key={producto.id}
                            producto={producto}
                            funcionCarrito={funcionEnProductos}
                        />
                    ))}
                </div>
                <div className="d-flex justify-content-center my-4 flex-wrap gap-2">
                    {Array.from({ length: totalPaginas }, (_, index) => (
                        <button
                            key={index + 1}
                            className={`btn ${paginaActual === index + 1 ? "btn-secondary" : "btn-outline-secondary"} rounded-pill px-3`}
                            onClick={() => cambiarPagina(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        );
    }
}

export default Productos;