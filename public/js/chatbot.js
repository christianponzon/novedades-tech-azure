// ==========================================
// NOVEDADES TECH
// ASISTENTE VIRTUAL
// ==========================================

const abrirChat =
    document.getElementById("abrirChat");

const cerrarChat =
    document.getElementById("cerrarChat");

const chatbotVentana =
    document.getElementById("chatbotVentana");

const chatbotMensajes =
    document.getElementById("chatbotMensajes");

const chatbotForm =
    document.getElementById("chatbotForm");

const mensajeUsuario =
    document.getElementById("mensajeUsuario");

const opcionesRapidas =
    document.querySelectorAll(
        ".chatbot-opciones button"
    );


// ==========================================
// ABRIR / CERRAR
// ==========================================

abrirChat.addEventListener("click", () => {

    chatbotVentana.classList.toggle("activo");

    if (
        chatbotVentana.classList.contains("activo")
    ) {

        mensajeUsuario.focus();

    }

});


cerrarChat.addEventListener("click", () => {

    chatbotVentana.classList.remove("activo");

});


// ==========================================
// ENVIAR MENSAJE
// ==========================================

chatbotForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();

        const mensaje =
            mensajeUsuario.value.trim();

        if (mensaje === "") {
            return;
        }

        procesarMensaje(mensaje);

        mensajeUsuario.value = "";

    }
);


// ==========================================
// BOTONES RÁPIDOS
// ==========================================

opcionesRapidas.forEach((boton) => {

    boton.addEventListener("click", () => {

        const pregunta =
            boton.dataset.pregunta;

        procesarMensaje(pregunta);

    });

});


// ==========================================
// PROCESAR MENSAJE
// ==========================================

function procesarMensaje(mensaje) {

    agregarMensajeUsuario(mensaje);
    registrarConsultaChat();

    // Pequeña espera para simular respuesta

    setTimeout(() => {

        const respuesta =
            obtenerRespuesta(mensaje);

        agregarMensajeBot(respuesta);

    }, 600);

}


// ==========================================
// RESPUESTAS DEL ASISTENTE
// ==========================================

function obtenerRespuesta(mensaje) {

    const texto =
        mensaje.toLowerCase();


    // SALUDOS

    if (
        texto.includes("hola") ||
        texto.includes("buenas") ||
        texto.includes("buen día") ||
        texto.includes("buen dia")
    ) {

        return `
            ¡Hola! 👋 ¿En qué puedo ayudarte?
            Puedo recomendarte laptops, celulares,
            audífonos, monitores o mostrarte
            nuestras ofertas.
        `;

    }


    // LAPTOP

    if (
        texto.includes("laptop") ||
        texto.includes("computadora") ||
        texto.includes("portátil") ||
        texto.includes("portatil")
    ) {

        return `
            Te recomiendo la Laptop Pro 15.
            Cuenta con Intel Core i7, 16 GB de RAM
            y SSD de 512 GB. Actualmente está
            disponible por S/ 2,499.
        `;

    }


    // CELULAR

    if (
        texto.includes("celular") ||
        texto.includes("smartphone") ||
        texto.includes("telefono") ||
        texto.includes("teléfono")
    ) {

        return `
            Tenemos el Smartphone X5 por
            S/ 1,299. Cuenta con pantalla AMOLED,
            cámara de 50 MP y almacenamiento
            de 256 GB.
        `;

    }


    // AUDÍFONOS

    if (
        texto.includes("audifono") ||
        texto.includes("audífono") ||
        texto.includes("audífonos") ||
        texto.includes("audifonos")
    ) {

        return `
            Los Audífonos Wireless cuestan
            S/ 199 y actualmente tienen
            20% de descuento. Son una buena
            opción si buscas audio inalámbrico.
        `;

    }


    // MONITOR

    if (
        texto.includes("monitor") ||
        texto.includes("pantalla")
    ) {

        return `
            Tenemos el Monitor Ultra 27 por
            S/ 749. Es Full HD y tiene una
            pantalla de 27 pulgadas.
        `;

    }


    // OFERTAS

    if (
        texto.includes("oferta") ||
        texto.includes("descuento") ||
        texto.includes("promocion") ||
        texto.includes("promoción")
    ) {

        return `
            Tenemos varias promociones:
            Laptop Pro 15 con 15% de descuento,
            Smartphone X5 con 10% y
            Audífonos Wireless con 20%.
        `;

    }


    // PRECIO ECONÓMICO

    if (
        texto.includes("barato") ||
        texto.includes("economico") ||
        texto.includes("económico")
    ) {

        return `
            Si buscas una opción económica,
            los Audífonos Wireless cuestan
            S/ 199. También puedo recomendarte
            productos según la categoría que
            necesites.
        `;

    }


    // ENVÍOS

    if (
        texto.includes("envio") ||
        texto.includes("envío") ||
        texto.includes("delivery")
    ) {

        return `
            Realizamos envíos de nuestros
            productos. Antes de finalizar
            la compra podrás revisar los
            productos seleccionados.
        `;

    }


    // COMPRA

    if (
        texto.includes("comprar") ||
        texto.includes("compra") ||
        texto.includes("carrito")
    ) {

        return `
            Para comprar, selecciona
            "Agregar al carrito" en el producto
            que deseas. Luego abre el carrito
            desde la parte superior de la página
            y selecciona "Finalizar compra".
        `;

    }


    // AGRADECIMIENTO

    if (
        texto.includes("gracias")
    ) {

        return `
            ¡Con gusto! 😊 Estoy aquí para
            ayudarte a encontrar el producto
            que necesitas.
        `;

    }


    // RESPUESTA GENERAL

    return `
        No encontré una respuesta exacta para
        esa consulta. Puedes preguntarme por
        laptops, celulares, audífonos,
        monitores, ofertas, envíos o cómo
        realizar una compra.
    `;

}


// ==========================================
// MOSTRAR MENSAJE USUARIO
// ==========================================

function agregarMensajeUsuario(texto) {

    const mensaje =
        document.createElement("div");

    mensaje.className =
        "mensaje usuario";

    mensaje.innerHTML = `
        <div class="mensaje-contenido">
            <p>${texto}</p>
        </div>
    `;

    chatbotMensajes.appendChild(mensaje);

    bajarChat();

}


// ==========================================
// MOSTRAR MENSAJE BOT
// ==========================================

function agregarMensajeBot(texto) {

    const mensaje =
        document.createElement("div");

    mensaje.className =
        "mensaje bot";

    mensaje.innerHTML = `

        <div class="mensaje-avatar">
            <i class="fa-solid fa-robot"></i>
        </div>

        <div class="mensaje-contenido">
            <p>${texto}</p>
        </div>

    `;

    chatbotMensajes.appendChild(mensaje);

    bajarChat();

}


// ==========================================
// SCROLL AUTOMÁTICO
// ==========================================

function bajarChat() {

    chatbotMensajes.scrollTop =
        chatbotMensajes.scrollHeight;

}