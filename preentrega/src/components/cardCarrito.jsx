import '../styles/carrito.css';

function CardCarrito({ producto, funcionBorrar }) {
    return (
        <div className="carrito-card shadow rounded d-flex align-items-center mb-3 p-3" key={producto.id} style={{ background: "#fff" }}>
            <img
                className="carrito-image me-3"
                src={producto.imagen}
                alt={producto.nombre}
                style={{
                    width: "90px",
                    height: "90px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    border: "1px solid #eee",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.07)"
                }}
            />
            <div className="carrito-card-content flex-grow-1">
                <h5 className="mb-1" style={{ fontWeight: 600 }}>{producto.nombre}</h5>
                <p className="mb-1 text-muted" style={{ fontSize: "0.95rem" }}>{producto.descripcion}</p>
                <div className="d-flex flex-wrap align-items-center mb-2" style={{ gap: "1.5rem" }}>
                    <span className="fw-bold text-success">${producto.precio}</span>
                    <span className="badge bg-secondary">Cantidad: {producto.cantidad}</span>
                    <span className="fw-bold">Total: ${producto.precio * producto.cantidad}</span>
                </div>
                <button
                    className="btn btn-outline-danger btn-sm mt-3 d-inline-block px-2"
                    onClick={() => funcionBorrar(producto.id)}
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
}

export default CardCarrito;