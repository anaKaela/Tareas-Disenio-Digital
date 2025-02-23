//Ejercicio 1
//Filtrar y transformar productos
function aplicarImpuestos(productos) {
  return productos
    .filter((producto) => producto.precio > 50) // Filtra productos con precio mayor a 50
    .map((producto) => ({
      ...producto,
      precio: producto.precio * 1.1, // Aplica el 10% de impuesto
    }));
}
const productos = [
  { nombre: "Camisa", precio: 45 },
  { nombre: "Zapatos", precio: 80 },
];
const productosConImpuesto = aplicarImpuestos(productos);
console.log(productosConImpuesto);
