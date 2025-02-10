//Ejercicio 4
//Combinar datos de usuario
function combinarUsuarios (usuarios, detalles){
    return usuarios.map(usuario => {
        const detalle = detalles.find(d => d.id === usuario.id);

        if (detalle) {
            return { ...usuario, ...detalle };
        }
        return usuario;
    })
}
const usuarios = [
    { id: 1, nombre: "Juan" }, { id: 2, nombre: "Pedro"}
]
const detalles = [
    { id: 1, edad: 25 }, { id: 2, edad: 30 }
]
const usuariosCombinar = combinarUsuarios(usuarios,detalles)
console.log(usuariosCombinar)