// ==========================================
// NOVEDADES TECH
// SISTEMA DE KPIs
// ==========================================

let metricas = JSON.parse(
    localStorage.getItem("metricasNovedadesTech")
) || {
    visitas: 0,
    agregados: 0,
    ventas: 0,
    chat: 0,
    ingresos: 0
};


// Registrar una visita al cargar la página

if (!sessionStorage.getItem("visitaRegistrada")) {

    metricas.visitas++;

    sessionStorage.setItem(
        "visitaRegistrada",
        "true"
    );

    guardarMetricas();
}


// ==========================================
// GUARDAR
// ==========================================

function guardarMetricas() {

    localStorage.setItem(
        "metricasNovedadesTech",
        JSON.stringify(metricas)
    );

    mostrarMetricas();

}


// ==========================================
// MOSTRAR
// ==========================================

function mostrarMetricas() {

    document.getElementById("kpiVisitas")
        .textContent = metricas.visitas;

    document.getElementById("kpiAgregados")
        .textContent = metricas.agregados;

    document.getElementById("kpiVentas")
        .textContent = metricas.ventas;

    document.getElementById("kpiChat")
        .textContent = metricas.chat;


    document.getElementById("kpiIngresos")
        .textContent =
            `S/ ${metricas.ingresos.toFixed(2)}`;


    let conversion = 0;


    if (metricas.visitas > 0) {

        conversion =
            (
                metricas.ventas /
                metricas.visitas
            ) * 100;

    }


    document.getElementById("kpiConversion")
        .textContent =
            `${conversion.toFixed(1)}%`;

}


// ==========================================
// REGISTRAR EVENTOS
// ==========================================

function registrarProductoAgregado() {

    metricas.agregados++;

    guardarMetricas();

}


function registrarVenta(total) {

    metricas.ventas++;

    metricas.ingresos += total;

    guardarMetricas();

}


function registrarConsultaChat() {

    metricas.chat++;

    guardarMetricas();

}


mostrarMetricas();