import Swal from 'sweetalert2'

export function dispararSweet(titulo,texto,icono,textoBoton){
    Swal.fire({
        title: titulo,
        text: texto,
        icon: icono,
        confirmButtonText: textoBoton
      });
}

export function dispararSweet2(titulo, texto, icono, textoBoton1, textoBoton2) {
  return Swal.fire({
    title: titulo,
    text: texto,
    icon: icono,
    showCancelButton: true,
    confirmButtonText: textoBoton1,
    cancelButtonText: textoBoton2
  });
}