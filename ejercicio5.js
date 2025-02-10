//Ejercicio 5
// Reporte de ventas
function generarReporte (ventas){

    const cantidadTransacciones = ventas.length

    if (cantidadTransacciones === 0) {
        return {
            totalVentas: 0,
            promedio: 0,
            cantidadTransacciones: 0
        }
        
    }
    let totalVentas = 0;

    
    ventas.forEach(venta => {
        totalVentas += venta.monto;
    });

    const promedio = totalVentas / cantidadTransacciones;

    return {
        totalVentas,
        promedio,
        cantidadTransacciones
    };
}
const ventas = [
    { producto: "TV", monto: 1000 },
    { producto: "Radio", monto: 200 },
   ];

const reporte = generarReporte(ventas)
console.log(reporte)
   