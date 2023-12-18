// Simulador de Casa de Compra con usuarios

let compradores=[];
let productos=[];

//!----------------------- CLASES-------------------
class Persona{
    nombrePersona=prompt("Ingrese su nombre")
    dineroPersona=parseInt(prompt("Ingrese su dinero (esto es para poder hacer compras de otros productos dentro de la app, si lo desea)"))
    constructor(){
        this.nombre=this.nombrePersona,
        this.dinero=this.dineroPersona
    }
}

class Producto{
    nombreP=prompt("Ingrese el nombre del producto")
    precioP=parseInt(prompt("Ingrese el precio del producto"))
    constructor(){
        this.nombre=this.nombreP,
        this.precio=this.precioP
    }
}



// !-------------------------FUNCIONES USUARIOS--------------------------
const agregarUsuario = ()=>{
    nuevo=new Persona();
    if(nuevo.nombre==""){
        alert("⚠ Nombre de usuario invalido")
    }else{
        if(isNaN(nuevo.dinero)){
            alert("⚠ Dinero del usuario invalido")
        }else{
            const esta= compradores.filter(comprador => comprador.nombre !== nuevo.nombre);
            if(compradores.length==esta.length){
                compradores.push(nuevo)
            }else{
                alert("⚠ El nombre ya esta ingresado, pruebe otro nombre")
            }
        }
    }
}

const eliminarUsuario=(aleatorio)=>{
    if(aleatorio==1){//! Si es uno elimina el que el usuario elija, sino lo hace aleatorio
        const mostrar=compradores.map(comprador=>`Usuario: ${comprador.nombre}`)
        if(compradores.length>0){
            let unir=mostrar.join("\n")
            let eliminado=prompt(`
${unir}

Ingrese el usuario a eliminar
`)//!Lo dejo asi porque sino me aparece mal el prompt
        const esta=compradores.filter(comprador=>comprador.nombre!==eliminado);
        if(compradores.length==esta.length){
            alert("⚠ El usuario no existe")
        }else{
            const dondeEsta = compradores.map(comprador=>comprador.nombre)
            const index=dondeEsta.indexOf(eliminado)//!Busca cual es el indice del eliminado
            compradores.splice(index,1);
            alert("👌 El usuario ha sido eliminado exitosamente")
        }
    }else{
        alert("⚠ No hay usuarios ingresados")
    }
    }else{
        if(compradores.length>0){
            let numAleatorio= Math.round(Math.random()*compradores.length-1)
            compradores.splice(numAleatorio,1)
            alert("👌 Se ha sido eliminado aleatoriamente un usuario")
        }else{
            alert("⚠ No hay usuarios ingresados")
        }
        
    }
}


const verUsuario=()=>{
    const mostrar=compradores.map(comprador=>`Nombre: ${comprador.nombre}, Dinero: $${comprador.dinero}`)
    if(compradores.length>0){
        alert(mostrar.join("\n"))
    }else{
        alert("⚠ No hay usuarios ingresados")
    }
}

// !---------------------------FUNCIONES PRODUCTOS---------------------------------

const agregarProducto=()=>{
    nuevo=new Producto();
    if(nuevo.nombre==""){
        alert("⚠ Nombre de producto invalido")
    }else{
        if(isNaN(nuevo.precio)){
            alert("⚠ Precio de producto invalido")
        }else{
            const esta= productos.filter(producto => producto.nombre !== nuevo.nombre);
            if(productos.length==esta.length){
                productos.push(nuevo)
            }else{
                alert("⚠ El producto ya esta ingresado")
            }
        }
    }
}

const comprarProducto=()=>{
    if(compradores.length>0){
        const nombresCompradores=compradores.map(comprador=>`Usuario: ${comprador.nombre}`)
        let unirNombres = nombresCompradores.join("\n")
        if(productos.length>0){
            const nombresProductos=productos.map(producto=>`Producto: ${producto.nombre}, Precio: ${producto.precio}`)
            let unirProductos=nombresProductos.join("\n")
            let usuarioComprador=prompt(`
${unirNombres}

Ingrese el usuario que va a realizar la compra 
`)//!Lo dejo asi porque sino me aparece mal el prompt
            const estaNombre=compradores.filter(comprador=>comprador.nombre===usuarioComprador);
            if(estaNombre.length==1){
                const dondeEsta = compradores.map(comprador=>comprador.nombre)
                const indexUsuario=dondeEsta.indexOf(usuarioComprador)//!Busca cual es el indice del comprador
                let productoAComprar=prompt(`
${unirProductos}

Hola ${compradores[indexUsuario].nombre} ingrese el producto que va a comprar, recuerde que su dinero es un total de $${compradores[indexUsuario].dinero}
`)//!Lo dejo asi porque sino me aparece mal el prompt
                const estaProducto=productos.filter(producto=>producto.nombre===productoAComprar)
                if(estaProducto.length==1){
                    const ubicacionProducto=productos.map(producto=>producto.nombre)
                    const indexProducto=ubicacionProducto.indexOf(productoAComprar);
                    if(compradores[indexUsuario].dinero>=productos[indexProducto].precio){//!Si tiene el dinero para comprarlo se elimina el producto y el dinero se le resta al comprador
                        compradores[indexUsuario].dinero-=productos[indexProducto].precio;
                        productos.splice(indexProducto,1);
                        alert("👌 Compra realizada con éxito")
                    }else{
                        alert("⚠ Dinero insuficiente para realizar la compra")
                    }
                }else{
                    alert("⚠ El producto no existe")
                }
            }else{
                alert("⚠ El usuario no existe")
            }
        }else{
            alert("⚠ No hay productos disponibles")
        }
    }else{
        alert("⚠ No hay usuarios registrados")
    }
}



const verProductos=()=>{
    const mostrar=productos.map(producto=>`Nombre: ${producto.nombre}, Precio: $${producto.precio}`)
    if(productos.length>0){
        alert(mostrar.join("\n"))
    }else{
        alert("⚠ No hay productos ingresados")
    }
}



// !--------------------------------GENERALES(MENU)-------------------------------------
const menuUsuario=()=>{//!---------------MENU USUARIOS-------------------
    let activado = true;
    while(activado){
        let opcion = parseInt(
            prompt(
                `
                Bienvenido al Menu de Usuario:
                1-Agregar Usuario
                2-Eliminar Usuario
                3-Ver Usuarios
                4-Ir a opciones de productos
                5-Volver al menu principal
                `
            )
        )
        switch (opcion) {
            case 1:
                agregarUsuario();
                break;
            case 2:
                let aleatorio=parseInt(
                    prompt(
                    `
                    Quieres eliminar tu mismo al usuario?
                    1-Si, lo hago yo
                    2-No, quiero que la suerte se encargue
                    `
                ))
                if(aleatorio==1 || aleatorio==2){
                    eliminarUsuario(aleatorio);
                }else{
                    alert("Opcion invalida")
                }
                break;
            case 3:
                verUsuario();
                break;
            case 4:
                activado=false;
                menuProductos();
                break;
            case 5:
                activado=false;
                menu();
                break;
            default:
                alert("Opcion Invalida")
                break;
        }
    }

}

const menuProductos=()=>{//!-----------------MENU PRODUCTOS----------------------
    let activado = true;
    while(activado){
        let opcion = parseInt(
            prompt(
                `
                Bienvenido al Menu de Productos:
                1-Agregar Producto
                2-Comprar Producto
                3-Ver Productos
                4-Ir a opciones de Usuarios
                5-Volver al menu principal
                `
            )
        )
        switch (opcion) {
            case 1:
                agregarProducto();
                break;
            case 2:
                comprarProducto();
                break;
            case 3:
                verProductos();
                break;
            case 4:
                activado=false;
                menuUsuario();
                break;
            case 5:
                activado=false;
                menu();
                break;
            default:
                alert("Opcion Invalida")
                break;
        }
    }

}



let activado = true;
const menu = () =>{ //!----------------MENU PRINCIPAL--------------------------
    while(activado){
        let opcion = parseInt(
            prompt(
                `
                Bienvenido a La casa de Compra: Subaton
                1-Opciones Usuario
                2-Opciones Productos
                3-Salir
                `
            )
        )
        switch(opcion){
            case 1:
                menuUsuario();
                break;
            case 2:
                menuProductos();
                break;
            case 3:
                activado=false;
                break;
            default:
                alert("Opcion Invalida")
                break;
        }
    }
}


menu();
