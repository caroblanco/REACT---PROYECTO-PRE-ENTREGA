import React, { useState } from 'react';
import { agregarProducto } from '../assets/requests'; // Asegúrate de importar la función

function FormularioProducto({  }) {
  const [producto, setProducto] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    imagen: ''
  });
  const [errores, setErrores] = useState({});

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!producto.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio.';
    }
    if (!producto.precio || producto.precio <= 0) {
      nuevosErrores.precio = 'El precio debe ser mayor a 0.';
    }
    if (!producto.descripcion.trim() || producto.descripcion.length < 10) {
      nuevosErrores.descripcion = 'La descripción debe tener al menos 10 caracteres.';
    }
    if (!producto.imagen.trim()) {
      nuevosErrores.imagen = 'La URL de la imagen es obligatoria.';
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      agregarProducto(producto)
        .then(() => {
          setProducto({ nombre: '', precio: '', descripcion: '', imagen: '' });
          setErrores({});
        })
        .catch((error) => {
          alert('Error al agregar el producto');
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Producto</h2>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={producto.nombre}
          onChange={handleChange}
          required
        />
        {errores.nombre && <p style={{ color: 'red' }}>{errores.nombre}</p>}
      </div>
      <div>
        <label>Precio:</label>
        <input
          type="number"
          name="precio"
          value={producto.precio}
          onChange={handleChange}
          required
          min="0"
        />
        {errores.precio && <p style={{ color: 'red' }}>{errores.precio}</p>}
      </div>
      <div>
        <label>Descripción:</label>
        <textarea
          name="descripcion"
          value={producto.descripcion}
          onChange={handleChange}
          required
        />
        {errores.descripcion && <p style={{ color: 'red' }}>{errores.descripcion}</p>}
      </div>
      <div>
        <label>Imagen (URL):</label>
        <input
          type="url"
          name="imagen"
          value={producto.imagen}
          onChange={handleChange}
          required
          placeholder="https://ejemplo.com/imagen.jpg"
        />
        {errores.imagen && <p style={{ color: 'red' }}>{errores.imagen}</p>}
      </div>
      <button type="submit">Agregar Producto</button>
    </form>
  );
}

export default FormularioProducto;