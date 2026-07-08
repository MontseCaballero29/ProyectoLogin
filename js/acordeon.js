
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

let seccionesBiblioteca = [
    {
        titulo: "Historia y fundación",
        contenido: `
            <p>La Biblioteca Pública Central "Margarita Maza de Juárez" fue fundada
            el 29 de octubre de 1985, en el marco de una inauguración encabezada por
            el entonces gobernador de Oaxaca, Pedro Vásquez Colmenares.</p>
            <p class="mt-2">Pertenece a la Secretaría de las Culturas y Artes de Oaxaca
            (Seculta) y ocupa una casona del siglo XVIII, representativa de la
            arquitectura civil del centro histórico de la ciudad.</p>
        `
    },
    {
        titulo: "El edificio antes de la biblioteca",
        contenido: `
            <p>El inmueble, ubicado en la esquina de las calles Macedonio Alcalá y
            Morelos, tuvo varios usos antes de convertirse en biblioteca: a inicios
            del siglo XX fue sede del Colegio de San José para señoritas, en 1924
            albergó la Escuela Normal, y más tarde funcionó como espacio de la
            Facultad de Arquitectura de la UABJO.</p>
            <p class="mt-2">La biblioteca fue remodelada por los arquitectos Enrique
            de Esesarte y Jorge Torres, dándole el estilo ecléctico que conserva hasta
            hoy.</p>
        `
    },
    {
        titulo: "Salas y clasificación",
        contenido: `
            <p>El recinto cuenta con dos patios que muestran la arquitectura de las
            casas del centro histórico, y se organiza en varias salas:</p>
            <ul class="list-disc pl-5 mt-2 space-y-1">
                <li>Sala "Jorge L. Tamayo", clasificación 000-339</li>
                <li>Anexo "Jorge L. Tamayo", clasificación 340-539</li>
                <li>Sala "Raúl Bolaños Cacho", clasificación 861-998</li>
                <li>Anexo "Raúl Bolaños Cacho", clasificación 540-861</li>
                <li>Sala "Genaro V. Vásquez", dedicada a temas oaxaqueños</li>
            </ul>
        `
    },
    {
        titulo: "Colección y materiales destacados",
        contenido: `
            <p>Además de su acervo general, resguarda un acervo histórico sobre
            temas y autores oaxaqueños, incluyendo memorias manuscritas del general
            liberalista Ignacio Mejía, periódicos, folletos, boletines y revistas de
            la época.</p>
            <p class="mt-2">Su libro más antiguo es "La Corte Santa", escrito por el
            padre Nicolás Caufino y publicado en 1674, un séptimo tomo de una
            colección religiosa en español antiguo.</p>
        `
    },
    {
        titulo: "Servicios",
        contenido: `
            <p>Cuenta con una sala tiflológica para personas ciegas o con debilidad
            visual, con materiales en sistema braille. También ofrece un "punto de
            acceso", un espacio de lectura y proyecciones digitales sin costo.</p>
            <p class="mt-2">La biblioteca también recibe conferencias y talleres
            para el público en general.</p>
        `
    }
];
 
crearAcordeon("#contenedorAcordeonBiblioteca", seccionesBiblioteca);


let campoBusqueda = document.getElementById("search-toggle");
let contenedorAcordeonBiblioteca = document.querySelector("#contenedorAcordeonBiblioteca");
 
campoBusqueda.addEventListener("input", function () {
    filtrarAcordeonBiblioteca(campoBusqueda.value);
});
 
function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}
 
function filtrarAcordeonBiblioteca(termino) {
    let terminoNormalizado = normalizarTexto(termino.trim());
    let secciones = contenedorAcordeonBiblioteca.querySelectorAll(".acordeon-seccion");
 
    secciones.forEach(function (seccion) {
        let panel = seccion.querySelector(".acordeon-panel");
        let textoDeLaSeccion = normalizarTexto(seccion.textContent);
 
        if (terminoNormalizado === "") {
            seccion.classList.remove("oculto");
            cerrarSeccion(seccion, panel);
            return;
        }
 
        let coincide = textoDeLaSeccion.includes(terminoNormalizado);
 
        if (coincide) {
            seccion.classList.remove("oculto");
            abrirSeccion(seccion, panel);
        } else {
            seccion.classList.add("oculto");
            cerrarSeccion(seccion, panel);
        }
    });
}