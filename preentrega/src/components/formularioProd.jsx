import React, { useState, useContext } from 'react';
import { ProdContext } from '../context/ProdContext.jsx';
import { dispararSweet } from '../assets/sweetalert.js';

function FormularioProducto() {
  const [producto, setProducto] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    imagen: ''
  });
  const [errores, setErrores] = useState({});
  const { agregarProducto } = useContext(ProdContext);

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
        .catch(() => {
          dispararSweet('Error al agregar el producto','No se ha podido agregar el producto.', 'error','Cerrar');
        });
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center mt-3 mb-3'>
      <form className="p-4 border rounded shadow w-50 " onSubmit={handleSubmit}>
          <h2>Agregar Producto</h2>
          <div className="mb-3 ">
            <label className="form-label">Nombre: </label>
            <input 
                type="text"
                name="nombre"
                value={producto.nombre || ''}
                onChange={handleChange}
                required
                className="form-control" />
          </div>
          {errores.nombre && <p style={{ color: 'red' }}>{errores.nombre}</p>}
          <div className="mb-3">
            <label className="form-label">Precio: </label>
            <input type="number"
            name="precio"
            value={producto.precio || ''}
            onChange={handleChange}
            required
            min="0" className="form-control"  />
          </div>
          {errores.precio && <p style={{ color: 'red' }}>{errores.precio}</p>}
          <div className="mb-3">
            <label className="form-label">Descripción:</label>
            <textarea
              name="descripcion"
              value={producto.descripcion || ''}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          {errores.descripcion && <p style={{ color: 'red' }}>{errores.descripcion}</p>}
          <div className="mb-3">
            <label className="form-label">Tipo:</label>
            <input type="text"
              name="tipo"
              value={producto.tipo || ''}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Imagen (URL):</label>
            <input
              type="url"
              name="imagen"
              value={producto.imagen || ''}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="https://ejemplo.com/imagen.jpg"
            />
            {errores.imagen && <p style={{ color: 'red' }}>{errores.imagen}</p>}
          </div>
          <button type="submit" className="btn btn-success">Agregar Producto</button>
        </form>
      </div>
  );
}

export default FormularioProducto;

