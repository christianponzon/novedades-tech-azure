// ==========================================
// NOVEDADES TECH
// SISTEMA DE PRODUCTOS Y CARRITO
// ==========================================


// ------------------------------------------
// PRODUCTOS
// ------------------------------------------

const productosTienda = {
    "Laptop Pro 15": {
        nombre: "Laptop Pro 15",
        precio: 2499,
        icono: "fa-laptop"
    },

    "Smartphone X5": {
        nombre: "Smartphone X5",
        precio: 1299,
        icono: "fa-mobile-screen-button"
    },

    "Audífonos Wireless": {
        nombre: "Audífonos Wireless",
        precio: 199,
        icono: "fa-headphones"
    },

    "Monitor Ultra 27": {
        nombre: "Monitor Ultra 27",
        precio: 749,
        icono: "fa-desktop"
    }
};


// ------------------------------------------
// CARRITO
// ------------------------------------------

let carrito = [];


// ------------------------------------------
// ELEMENTOS HTML
// ------------------------------------------

const contadorCarrito =
    document.getElementById("contadorCarrito");

const btnCarrito =
    document.getElementById("btnCarrito");

const carritoPanel =
    document.getElementById("carritoPanel");

const carritoOverlay =
    document.getElementById("carritoOverlay");

const cerrarCarrito =
    document.getElementById("cerrarCarrito");

const carritoContenido =
    document.getElementById("carritoContenido");

const totalCarrito =
    document.getElementById("totalCarrito");

const finalizarCompra =
    document.getElementById("finalizarCompra");


// ==========================================
// ABRIR Y CERRAR CARRITO
// ==========================================

function abrirCarrito() {

    carritoPanel.classList.add("activo");
    carritoOverlay.classList.add("activo");

}


function ocultarCarrito() {

    carritoPanel.classList.remove("activo");
    carritoOverlay.classList.remove("activo");

}


btnCarrito.addEventListener("click", abrirCarrito);

cerrarCarrito.addEventListener("click", ocultarCarrito);

carritoOverlay.addEventListener("click", ocultarCarrito);


// ==========================================
// AGREGAR PRODUCTOS
// ==========================================

const botonesAgregar =
    document.querySelectorAll(".btn-carrito");


botonesAgregar.forEach((boton) => {

    boton.addEventListener("click", () => {

        const nombreProducto =
            boton.dataset.producto;

        agregarProducto(nombreProducto);


        // Efecto visual

        const contenidoOriginal =
            boton.innerHTML;

        boton.innerHTML = `
            <i class="fa-solid fa-check"></i>
            Agregado
        `;

        boton.disabled = true;


        setTimeout(() => {

            boton.innerHTML =
                contenidoOriginal;

            boton.disabled = false;

        }, 800);

    });

});


function agregarProducto(nombre) {

    const producto =
        productosTienda[nombre];


    if (!producto) {
        return;
    }


    const productoExistente =
        carrito.find(
            item => item.nombre === nombre
        );


    if (productoExistente) {

        productoExistente.cantidad++;

    } else {

        carrito.push({
            ...producto,
            cantidad: 1
        });

    }


    actualizarCarrito();
    registrarProductoAgregado();

}


// ==========================================
// ACTUALIZAR CARRITO
// ==========================================

function actualizarCarrito() {

    carritoContenido.innerHTML = "";


    // Si está vacío

    if (carrito.length === 0) {

        carritoContenido.innerHTML = `
            <div class="carrito-vacio">

                <i class="fa-solid fa-cart-shopping"></i>

                <h3>Tu carrito está vacío</h3>

                <p>
                    Agrega productos para comenzar tu compra.
                </p>

            </div>
        `;

        contadorCarrito.textContent = "0";

        totalCarrito.textContent = "S/ 0.00";

        finalizarCompra.disabled = true;

        return;
    }


    finalizarCompra.disabled = false;


    // Crear productos

    carrito.forEach((producto) => {

        const item =
            document.createElement("div");

        item.classList.add("item-carrito");


        item.innerHTML = `

            <div class="item-carrito-icono">

                <i class="fa-solid ${producto.icono}"></i>

            </div>


            <div>

                <h4>${producto.nombre}</h4>

                <span class="item-precio">
                    S/ ${producto.precio.toFixed(2)}
                </span>


                <div class="controles-cantidad">

                    <button
                        onclick="cambiarCantidad(
                            '${producto.nombre}',
                            -1
                        )"
                    >
                        -
                    </button>


                    <span>
                        ${producto.cantidad}
                    </span>


                    <button
                        onclick="cambiarCantidad(
                            '${producto.nombre}',
                            1
                        )"
                    >
                        +
                    </button>

                </div>

            </div>


            <button
                class="eliminar-producto"

                onclick="eliminarProducto(
                    '${producto.nombre}'
                )"
            >

                <i class="fa-solid fa-trash"></i>

            </button>

        `;


        carritoContenido.appendChild(item);

    });


    actualizarTotales();

}


// ==========================================
// CAMBIAR CANTIDAD
// ==========================================

window.cambiarCantidad =
function(nombre, cambio) {

    const producto =
        carrito.find(
            item => item.nombre === nombre
        );


    if (!producto) {
        return;
    }


    producto.cantidad += cambio;


    if (producto.cantidad <= 0) {

        eliminarProducto(nombre);

        return;

    }


    actualizarCarrito();

};


// ==========================================
// ELIMINAR PRODUCTO
// ==========================================

window.eliminarProducto =
function(nombre) {

    carrito =
        carrito.filter(
            item => item.nombre !== nombre
        );


    actualizarCarrito();

};


// ==========================================
// CALCULAR TOTAL
// ==========================================

function actualizarTotales() {

    const cantidad =
        carrito.reduce(
            (total, producto) =>
                total + producto.cantidad,
            0
        );


    const total =
        carrito.reduce(
            (suma, producto) =>
                suma +
                producto.precio *
                producto.cantidad,
            0
        );


    contadorCarrito.textContent =
        cantidad;


    totalCarrito.textContent =
        `S/ ${total.toFixed(2)}`;

}


// ==========================================
// FINALIZAR COMPRA
// ==========================================

finalizarCompra.addEventListener(
    "click",
    () => {

        if (carrito.length === 0) {
            return;
        }

        const totalVenta =
            carrito.reduce(
                (total, producto) =>
                    total +
                    producto.precio *
                    producto.cantidad,
                0
            );

        registrarVenta(totalVenta);

        alert(
            `¡Compra registrada correctamente!

Total: S/ ${totalVenta.toFixed(2)}`
        );

        carrito = [];

        actualizarCarrito();

        ocultarCarrito();

    }
);


// ==========================================
// BUSCADOR
// ==========================================

const inputBuscar =
    document.getElementById("buscarProducto");

const tarjetasProductos =
    document.querySelectorAll(".producto-card");


inputBuscar.addEventListener(
    "input",
    () => {

        const busqueda =
            inputBuscar.value
                .toLowerCase()
                .trim();


        tarjetasProductos.forEach(
            (producto) => {

                const contenido =
                    producto
                        .textContent
                        .toLowerCase();


                if (
                    contenido.includes(busqueda)
                ) {

                    producto.style.display =
                        "block";

                } else {

                    producto.style.display =
                        "none";

                }

            }
        );

    }
);


// ==========================================
// BOTÓN BUSCAR DEL HEADER
// ==========================================

const btnBuscar =
    document.getElementById("btnBuscar");


btnBuscar.addEventListener(
    "click",
    () => {

        document
            .getElementById("productos")
            .scrollIntoView({
                behavior: "smooth"
            });


        setTimeout(() => {

            inputBuscar.focus();

        }, 500);

    }
);


// Iniciar carrito

actualizarCarrito();