import { dispararSweet } from './sweetalert';

export const agregarProducto = (producto) => {
  return new Promise((resolve, reject) => {
    fetch('https://6810114727f2fdac24103476.mockapi.io/products/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(producto),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al agregar el producto');
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
        dispararSweet('Producto agregado', 'El producto se ha agregado correctamente', 'success', 'OK');
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const eliminarProducto = (id) => {
  return new Promise((resolve,reject) => {
    const eliminarProducto = async (id) => {
    const confirmar = window.confirm('¿Estás seguro de eliminar?');
    if (confirmar) {
      try {
        const respuesta = await fetch(`https://mockapi.io/6810114727f2fdac24103476/v1/productos/${id}`, {
          method: 'DELETE',
        });
        if (!respuesta.ok) throw new Error('Error al eliminar');
        alert('Producto eliminado correctamente.');
      } catch (error) {
        console.error(error.message);
        alert('Hubo un problema al eliminar el producto.');
      }
    }
    };

  eliminarProducto(id)
    .then(() => resolve())
    .catch((error) => reject(error));
});
}
