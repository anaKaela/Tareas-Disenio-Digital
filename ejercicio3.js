//Ejercicio 3
// Contador de ocurrencias
function contadorOcurrencias (elementos){
    const objeto = {}

    elementos.forEach(elemento => {
        if (objeto[elemento]) {
            objeto[elemento]++
        }else {
            objeto[elemento] = 1
        }
        
    });
    return objeto
}

const elementos = ["a","b","a","c","b"] 

const resultado = contadorOcurrencias(elementos)
console.log(resultado)