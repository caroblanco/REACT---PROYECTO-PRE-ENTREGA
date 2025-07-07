import '../styles/carrito.css'
import CardCarrito from './cardCarrito.jsx';
import { useContext } from 'react';
import { CarritoContext } from '../context/carritoContext.jsx';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext.jsx';

function Carrito() {
    const { productosCarrito, vaciarCarrito, borrarProdCarrito, total } = useContext(CarritoContext);
    const { user } = useAuthContext();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="bg-white rounded shadow p-4">
                        <h2 className="mb-4 text-center">🛒 Tu carrito</h2>
                        {productosCarrito.length > 0 ? (
                            productosCarrito.map((producto) => (
                                <CardCarrito key={producto.id} producto={producto} funcionBorrar={borrarProdCarrito} />
                            ))
                        ) : (
                            <h4 className="text-center text-muted my-5">El carrito está vacío</h4>
                        )}
                        <hr />
                        <div className="d-flex justify-content-between align-items-center mt-4">
                            <span className="fs-5 fw-bold">
                                {total > 0 ? <>Total: <span className="text-success">${total.toFixed(2)}</span></> : null}
                            </span>
                            {productosCarrito.length > 0 && (
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={vaciarCarrito}
                                >
                                    Vaciar carrito
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Carrito;