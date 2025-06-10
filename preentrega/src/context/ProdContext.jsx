import React, { createContext, useState, useContext } from 'react';
import { dispararSweet, dispararSweet2 } from '../assets/sweetalert.js';
// Crear el contexto
export const ProdContext = createContext();
// Proveedor del contexto
export function ProdProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [productoEncontrado, setProductoEncontrado] = useState(null);

  const agregarProducto = async (producto) => {
    try {
      const respuesta = await fetch('https://6810114727f2fdac24103476.mockapi.io/products/product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto),
      });
      if (!respuesta.ok) throw new Error('Error al agregar el producto');
      const datos = await respuesta.json();
      setProductos((prev) => [...prev, datos]);
      return datos;
    } catch (error) {
      throw error;
    }
  };

  function buscarProducto(id) {
    return new Promise((resolve, reject) => {
      fetch(`https://6810114727f2fdac24103476.mockapi.io/products/product/${id}`)
        .then(async (respuesta) => {
          if (!respuesta.ok) {
            const text = await respuesta.text();
            throw new Error(text || 'Error al cargar el producto');
          }
          return respuesta.json();
        })
        .then((datos) => {
          setProductoEncontrado(datos);
          resolve(datos);
        })
        .catch((error) => {
          setProductoEncontrado(null); // Limpia el producto si hay error
          console.error('Error al cargar el producto:', error);
          reject(error);
        });
    });
  }

  const eliminarProducto = (id) => {
    return new Promise(async (resolve, reject) => {
      const result = await dispararSweet2('¿Estás seguro?', 'Esta acción no se puede deshacer.', 'warning', 'Sí, eliminar', 'Cancelar');
      if (result.isConfirmed) {
        try {
          const respuesta = await fetch(`https://6810114727f2fdac24103476.mockapi.io/products/product/${id}`, {
            method: 'DELETE',
          });
          if (!respuesta.ok) throw new Error('Error al eliminar');
          dispararSweet('Producto Eliminado','Producto eliminado correctamente.', 'success','Cerrar');
          // Opcional: actualiza el estado local
          setProductos((prev) => prev.filter((p) => p.id !== id));
          resolve();
        } catch (error) {
          console.error(error.message);
          alert('Hubo un problema al eliminar el producto.');
          reject(error);
        }
      } else {
        resolve(); // Si cancela, resuelve igual para evitar promesas colgadas
      }
    });
  };

  function obtenerProductos(){
    return new Promise((resolve, reject) => {
              fetch('https://6810114727f2fdac24103476.mockapi.io/products/product')
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                setProductos(datos); // Update local productos state
                resolve(datos)
                //setCargando(false);
            })
            .catch((error) => {
                //setError('Hubo un problema al cargar los productos.');
                //setCargando(false);
                reject(error)
            });
  })}

  return (
    <ProdContext.Provider value={{ productos, agregarProducto, eliminarProducto, obtenerProductos, productoEncontrado, buscarProducto }}>
      {children}
    </ProdContext.Provider>
  );
}

export const useProdContext = () => useContext(ProdContext);