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
    ingresos: 0,
    campanas: {}
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
// REGISTRAR CAMPAÑAS DIGITALES
// ==========================================

const parametros = new URLSearchParams(window.location.search);

const fuente = parametros.get("utm_source");
const campana = parametros.get("utm_campaign");

if (fuente && campana) {

    const claveCampana = `${fuente}_${campana}`;

    if (!metricas.campanas) {
        metricas.campanas = {};
    }

    const claveSesion = `campana_${claveCampana}`;

if (!sessionStorage.getItem(claveSesion)) {

    metricas.campanas[claveCampana] =
        (metricas.campanas[claveCampana] || 0) + 1;

    sessionStorage.setItem(
        claveSesion,
        "true"
    );

    guardarMetricas();
}
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

    const totalCampanas = Object.values(
    metricas.campanas || {}
).reduce((total, cantidad) => total + cantidad, 0);

document.getElementById("kpiCampanas")
    .textContent = totalCampanas;


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