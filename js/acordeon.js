
function crearAcordeon(selectorContenedor, cajitas, opciones = {}) {
    let permitirMultiples = opciones.multiple || false;
    let indiceAbiertoPorDefecto = opciones.abiertoPorDefecto;
    if (indiceAbiertoPorDefecto === undefined) {
        indiceAbiertoPorDefecto = null;
    }
    let contenedor = document.querySelector(selectorContenedor);
    if (!contenedor) {
        console.error("No se encontró el contenedor: " + selectorContenedor);
        return;
    }
    contenedor.classList.add("acordeon");
    contenedor.innerHTML = "";

    for (let i = 0; i < cajitas.length; i++) {
        let seleccionado = cajitas[i];
        let debeAbrirseSola = (i === indiceAbiertoPorDefecto);
        let seccion = crearSeccion(seleccionado, debeAbrirseSola, contenedor, permitirMultiples);
        contenedor.appendChild(seccion);
    }
}

function crearSeccion(seleccionado, debeAbrirseSola, contenedor, permitirMultiples) {
    let seccion = document.createElement("div");
    seccion.classList.add("acordeon-seccion");
    let encabezado = crearEncabezado(seleccionado.titulo);
    let panel = crearPanel(seleccionado.contenido);
    if (debeAbrirseSola) {
        abrirSeccion(seccion, panel);
    }
    encabezado.addEventListener("click", function () {
        manejarClicEnSeccion(seccion, panel, contenedor, permitirMultiples);
    });
    seccion.appendChild(encabezado);
    seccion.appendChild(panel);
    return seccion;
}

function crearEncabezado(titulo) {
    let encabezado = document.createElement("button");
    encabezado.classList.add("acordeon-encabezado");
    encabezado.setAttribute("type", "button");
    encabezado.innerHTML = `
        <span>${titulo}</span>
        <span class="acordeon-icono">▼</span>
    `;
    return encabezado;
}

function crearPanel(contenido) {
    let panel = document.createElement("div");
    panel.classList.add("acordeon-panel");
    panel.innerHTML = `<div class="acordeon-contenido">${contenido}</div>`;
    return panel;
}

function abrirSeccion(seccion, panel) {
    seccion.classList.add("activo");
    panel.style.maxHeight = panel.scrollHeight + "px";
}

function cerrarSeccion(seccion, panel) {
    seccion.classList.remove("activo");
    panel.style.maxHeight = null;
}

function cerrarTodasLasSecciones(contenedor) {
    let todasLasSecciones = contenedor.querySelectorAll(".acordeon-seccion");
    todasLasSecciones.forEach(function (otraSeccion) {
        let otroPanel = otraSeccion.querySelector(".acordeon-panel");
        cerrarSeccion(otraSeccion, otroPanel);
    });
}

function manejarClicEnSeccion(seccion, panel, contenedor, permitirMultiples) {
    let estaActivaAhora = seccion.classList.contains("activo");
    if (!permitirMultiples) {cerrarTodasLasSecciones(contenedor);}
    if (!estaActivaAhora) {abrirSeccion(seccion, panel);} 
    else {cerrarSeccion(seccion, panel);}
}