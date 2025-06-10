import React, { useEffect, useState } from 'react';
function ListaProductos() {
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const respuesta = await fetch('https://mockapi.io/api/v1/productos');
        if (!respuesta.ok) {
          throw new Error('Error al obtener los productos.');
        }
        const data = await respuesta.json();
        setProductos(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchProductos();
  }, []);
  return (
    <div>
      <h2>Lista de Productos</h2>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            <strong>{producto.nombre}</strong>: ${producto.precio}
            <p>{producto.descripcion}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ListaProductos;