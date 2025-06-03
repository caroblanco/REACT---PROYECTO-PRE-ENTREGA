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

