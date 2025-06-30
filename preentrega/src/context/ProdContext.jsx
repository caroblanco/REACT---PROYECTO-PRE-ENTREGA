import React, { createContext, useState, useContext, useEffect } from 'react';
import { dispararSweet, dispararSweet2 } from '../assets/sweetalert.js';
// Crear el contexto
export const ProdContext = createContext();
// Proveedor del contexto
export function ProdProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [productoEncontrado, setProductoEncontrado] = useState(null);
  const [productosOriginales, setProductosOriginales] = useState([]);
  const[tipos,setTipos] = useState([]);

  const agregarProducto = async (producto) => {
    console.log('Llamando a agregarProducto');
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

  useEffect(() => {
    const tiposUnicos = [...new Set(productosOriginales.map((producto) => producto.tipo))];
    setTipos(tiposUnicos);
  }, [productosOriginales]);

  function buscarProducto(id) {
    console.log('Llamando a buscarProducto con id:', id);
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
    console.log('Llamando a eliminarProducto con id:', id);
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
  console.log('Llamando a obtenerProductos');
  return new Promise((resolve, reject) => {
    fetch('https://6810114727f2fdac24103476.mockapi.io/products/product')
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setProductos(datos); // Update local productos state
        setProductosOriginales(datos); // Store original products for filtering
        resolve(datos)
        //setCargando(false);
      })
      .catch((error) => {
        //setError('Hubo un problema al cargar los productos.');
        //setCargando(false);
        reject(error)
      });
  })}

  function editarProducto(producto){
  console.log('Llamando a editarProducto con id:', producto.id);
  return new Promise(async (resolve, reject) => {
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
          resolve(data);
          alert('Producto actualizado correctamente.');
          } catch (error) {
              console.error(error.message);
              alert('Hubo un problema al actualizar el producto.' + error.message);
              reject(error)
          }
          
      }
      )
  }

  function filtrarProductos(busqueda = "") {
  console.log("filtrarProductos llamada con:", busqueda);
  if (!productosOriginales || productosOriginales.length === 0) {
    console.log("No hay productosOriginales para filtrar");
    return;
  }
  if (!busqueda || busqueda.trim() === "") {
    setProductos(productosOriginales);
    console.log("Busqueda vacía, mostrando todos");
    return;
  }
  const productosFiltrados = productosOriginales.filter((producto) =>
    producto.nombre && producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );
  console.log("Filtrados:", productosFiltrados);
  setProductos(productosFiltrados);
  console.log("productosOriginales en filtro:", productosOriginales);
}

  function filtrarPorTipo(tipo){
    if (!tipo || tipo.trim() === "") {
      setProductos(productosOriginales);
      console.log("Filtro de tipo vacío, mostrando todos");
      return;
    }
    const productosFiltrados = productosOriginales.filter((producto) =>
      producto.tipo && producto.tipo.toLowerCase().includes(tipo.toLowerCase())
    );
    setProductos(productosFiltrados);
  }

  return (
    <ProdContext.Provider value={{ tipos, productos, agregarProducto, filtrarPorTipo, filtrarProductos, eliminarProducto, editarProducto, obtenerProductos, productoEncontrado, buscarProducto , productosOriginales}}>
      {children}
    </ProdContext.Provider>
  );
}

export const useProdContext = () => useContext(ProdContext);