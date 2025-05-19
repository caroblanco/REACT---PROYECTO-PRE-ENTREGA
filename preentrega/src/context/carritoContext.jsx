import React, { createContext, useState } from 'react';
// Crear el contexto
export const CarritoContext = createContext();
// Proveedor del contexto
export function CarritoProvider({ children }) {
    const [productosCarrito, setProductosCarrito] = useState([]);
    const [total, setTotal] = useState(0)

    function funcionCarrito(producto) {
        const existe = productosCarrito.find((item) => item.id === producto.id);
        let productosActualizados;
    
        if (existe) {
            productosActualizados = productosCarrito.map((item) => {
                if (item.id === producto.id) {
                    return { ...item, cantidad: item.cantidad + producto.cantidad };
                }
                return item;
            });
        } else {
            productosActualizados = [...productosCarrito, producto];
        }
    
        setProductosCarrito(productosActualizados);
    
        // Calcula el total usando el array actualizado
        const totalActualizado = productosActualizados.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
        setTotal(totalActualizado);
      }

    const vaciarCarrito = () => {
        setProductosCarrito([]);
        setTotal(0);
    };

    
    function borrarProdCarrito(id) {
        const productosActualizados = productosCarrito.filter((item) => item.id !== id);
        setProductosCarrito(productosActualizados);
        const totalActualizado = productosActualizados.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
        setTotal(totalActualizado);
        
    } 

    return (
        <CarritoContext.Provider value={{ productosCarrito, funcionCarrito, vaciarCarrito, borrarProdCarrito, total }}>
            {children}
        </CarritoContext.Provider>
    );
}