import '../styles/carrito.css'


function CardCarrito({producto, funcionBorrar}) {
    return (
        <div className="carrito-card" key={producto.id}>
            <div className="carrito-card-content">
                <h3>{producto.nombre}</h3>
                <p>{producto.descripcion}</p>
                <p>${producto.precio}</p>
                <span>Cantidad: {producto.cantidad}</span>
                <p>Total: ${producto.precio * producto.cantidad}</p>
            </div>
            <img className='carrito-image' src={producto.imagen} alt={producto.nombre}></img>
            <button className='carrito-button' onClick={() => funcionBorrar(producto.id)}>Eliminar del carrito</button>
        </div>
    );
}


export default CardCarrito;