import React, { useState, useEffect, useContext } from 'react';
import { ProdContext } from '../context/ProdContext.jsx';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { Navigate, useNavigate } from 'react-router-dom';

function FormularioEdicion({ onActualizar }) {
  const { buscarProducto, productoEncontrado, editarProducto } = useContext(ProdContext);
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [errores, setErrores] = useState({});
  const {admin} = useContext(AuthContext);
  const navigate = useNavigate();

  if(!admin){
    return(
        <Navigate to ='/login' replace />
    )
  }

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
    const validarForm = validarFormulario();
    if(validarForm){
        editarProducto(producto).then((actualizado) => {
        setProducto(actualizado);
        alert('Producto actualizado correctamente.');
        navigate('/productos/' + producto.id); // <-- Así está bien
        }).catch((error) => {
        console.error('Error al actualizar el producto:', error);
        alert('Hubo un problema al actualizar el producto.');
        });
    }
        
  };

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

  if (!producto) return <p>Cargando producto...</p>;

  return (
    <div className='d-flex justify-content-center align-items-center mt-3 mb-3'>
      <form className="p-4 border rounded shadow w-50 " onSubmit={handleSubmit}>
          <h2>Editar Producto</h2>
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
          <div className="mb-3">
            <label className="form-label">Precio: </label>
            <input type="number"
            name="precio"
            value={producto.precio || ''}
            onChange={handleChange}
            required
            min="0" className="form-control"  />
          </div>
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
          </div>
          <button type="submit" className="btn btn-success">Actualizar Producto</button>
        </form>
      </div>
  );
}

export default FormularioEdicion;


