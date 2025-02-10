function actualizarStock(productos, id, nuevoStock){
    const producto = productos.find(producto => producto.id === id)
    if (producto) {
        producto.stock = nuevoStock
        return productos        
    }
    return null
}
const productos = [
    {id: 1, nombre: "lápiz", stock: 10,},
    {id:2, nombre: "cuaderno", stock: 5},
]
/* const resultado = actualizarStock(productos, 2, 5);
console.log(resultado) */
/* const resultadoNulo = actualizarStock(productos, 3, 40 )
console.log(resultado) */