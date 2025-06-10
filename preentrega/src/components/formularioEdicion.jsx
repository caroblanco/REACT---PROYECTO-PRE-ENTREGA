import React, { useState, useEffect, useContext } from 'react';
import { ProdContext } from '../context/ProdContext.jsx';
import { useParams } from 'react-router-dom';

function FormularioEdicion({ onActualizar }) {
  const { buscarProducto, productoEncontrado } = useContext(ProdContext);
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    if (!productoEncontrado || productoEncontrado.id !== id) {
      buscarProducto(id)
        .catch((error) => {
          console.error('Error al cargar el producto:', error);
          alert('Hubo un problema al cargar el producto.');
        });
    }
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (productoEncontrado && !producto) {
      setProducto(productoEncontrado);
    }
    // eslint-disable-next-line
  }, [productoEncontrado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await fetch(`https://6810114727f2fdac24103476.mockapi.io/products/product/${producto.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(producto),
      });
      if (!respuesta.ok) {
        throw new Error('Error al actualizar el producto.');
      }
      const data = await respuesta.json();
      if (onActualizar) onActualizar(data);
      alert('Producto actualizado correctamente.');
    } catch (error) {
      console.error(error.message);
      alert('Hubo un problema al actualizar el producto.');
    }
  };

  if (!producto) return <p>Cargando producto...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Producto</h2>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={producto.nombre || ''}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Precio:</label>
        <input
          type="number"
          name="precio"
          value={producto.precio || ''}
          onChange={handleChange}
          required
          min="0"
        />
      </div>
      <div>
        <label>Descripción:</label>
        <textarea
          name="descripcion"
          value={producto.descripcion || ''}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Actualizar Producto</button>
    </form>
  );
}

export default FormularioEdicion;