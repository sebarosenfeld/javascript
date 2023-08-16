// sweet alert para dar la bienvenida a la pagina
Swal.fire({
    title: 'Bienvenido a WIOR Insumos Hospitalarios',
    timer: 2000,
    showConfirmButton: false
})

// Iniciamos la variable carrito con el contenido de localStorage. Si no hay nada, lo iniciamos como un array vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Traigo el array desde el JSON
function getProductos () {
	return fetch('./productos.json') .then ((response) => response.json())
}

// MOSTRAR productos
function mostrarCatalogo(array) {
    let productCards = document.querySelector ("#product-cards")
    productCards.innerHTML = ""

    for (const pañales of array) {
        let pañales = document.createElement("div")
        pañales.classList.add("col-12", "col-md-6", "col-lg-4", "my-4")
        pañales.innerHTML = `<div id="${producto.id}" class="card" style="width: 18rem;">
        <img class="card-img-top img-fluid" style="height: 200px;"src="assets/${producto.imagen}" alt="${producto.nombreProducto}">
        <div class="card-body">
            <h4 class="card-title">${producto.nombreProducto}</h4>
            <p>descripción: ${producto.descripcion}</p>
            <p class="">Precio: ${producto.precio}</p>
        <button id="agregarBtn${producto.id}" class="btn btn-outline-success">Agregar al carrito</button>
        </div>
</div>`
        productCards.appendChild(nuevoLibro)
        let btnAgregar = document.getElementById(`agregarBtn${producto.id}`)

        btnAgregar.addEventListener("click", () => {
            agregarAlCarrito(pañales)
        })
    }
}
// function mostrarProductos (productos) {
//     let productCards = document.querySelector("#product-cards");

// for (let i = 0; i < productos.length; i++) {
//     let producto = productos[i];

//     let cardHTML = `
    // <div class="col-md-4 mb-4">
    //   <div class="card">
    //     <img src="${producto.imagen}" class="card-img-top" alt="Imagen del producto">
    //     <div class="card-body">
    //       <h5 class="card-title">${producto.descripcion}</h5>
    //       <p class="card-text">Precio: $${producto.precio.toFixed(2)}</p>
    //       <input type="number" class="form-control mb-2" placeholder="Cantidad" value="0" data-producto-id="${producto.id}">
    //       <button class="btn btn-agregar-carrito" data-producto-id="${producto.id}">Agregar al carrito</button>
    //     </div>
    //   </div>
    // </div>
//     `;

//     productCards.innerHTML += cardHTML;
// }

// let cantitdadInputs = document.querySelectorAll('input [type="number"]');

// for (let i = 0; i < cantitdadInputs.length; i++) {
//     let input = cantitdadInputs[i]
//     input.addEventListener("input", actualizarCantidad)
// }

// let agregarButtons = document.getElementsByClassName("btn-agregar-carrito")

// for (let i = 0; i < agregarButtons.length; i++) {
//     let button = agregarButtons[i]
//     button.addEventListener("click", agregarAlCarrito)
// }
// }

// AGREGAR AL CARRITO
function agregarAlCarrito(event) {
    let button = event.target
    let productoId = button.getAttribute("id")
    let producto = productos.find((producto) => producto.id == parseInt(productoId))
    let productoEnCarrito = carrito.find((item) => item.id == producto.id)

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += producto.cantidad;
        Toastify({
            text: "has añadido el producto",
        }).showToast();
    } else {
        carrito.push({ ...producto })
         Toastify({
             text: "has añadido el producto",
       }).showToast();
    }

    console.log("producto agregado al carrito - ID:" + productoId)

    console.log("carrito", carrito)

    localStorage.setItem("carrito", JSON.stringify(carrito))
}

// ACTUALIZAR CANTIDAD
function actualizarCantidad(event) {
    let input = event.target
    let productoId = input.getAttribute("id")
    let cantidad = parseInt(input.value)

    let producto = productos.find((producto) => producto.id == parseInt(productoId))
    producto.cantidad = cantidad

    localStorage.setItem("carrito", JSON.stringify(carrito))
}

function cargarProductosCarrito(array) {
    // modalBody.innerHTML = ""

    array.forEach(productoCarrito => {
        modalBody.innerHTML += `<div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
      <img class="card-img-top" height="300px" src="assets/${productoCarrito.imagen}" alt="${productoCarrito.nombreProducto}">
      <div class="card-body">
              <h4 class="card-title">${productoCarrito.nombreProducto}</h4>
          
              <p class="card-text">$${productoCarrito.precio}</p> 
              <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
      </div>    
  </div>
`
    });

    array.forEach((productoCarrito, indice) => {
        document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click", () => {
            let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
            cardProducto.remove()
            productos.splice(indice, 1)
            localStorage.setItem("carrito", JSON.stringify(productos))
        })

    });
}

botonCarrito.addEventListener("click", () => {
    cargarProductosCarrito(productosEnCarrito)
})

getProductos ().then (productos => {
	mostrarProductos(productos)
})



<img src="${producto.imagen}" alt="${producto.nombreProducto}" />
			<div>
				<h3>${producto.nombreProducto}</h3>
				<p class="product-description">${producto.descripcion}</p>
				<p class="product-price">$${producto.precio}</p>
				<div>
				<button id="decrementar-${producto.id}" class="button">-</button>
				<span class="product-price">${producto.cantidad}u.</span>
				<button id="incrementar-${producto.id}" class="button">+</button>
				</div>
			</div>
			<button id="eliminar-${producto.id}" class="remove">Eliminar</button>