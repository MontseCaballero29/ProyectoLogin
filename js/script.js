var userMenuDiv = document.getElementById("userMenu");
var userMenu = document.getElementById("userButton");
document.onclick = check;
function check(e) {
    var target = (e && e.target) || (event && event.srcElement);
    if (!checkParent(target, userMenuDiv)) {
        if (checkParent(target, userMenu)) {
            if (userMenuDiv.classList.contains("invisible")) {
                userMenuDiv.classList.remove("invisible");
            } else {
                userMenuDiv.classList.add("invisible");
            }
        } else {
            userMenuDiv.classList.add("invisible");
        }
    }
}
function checkParent(t, elm) {
    while (t && t.parentNode) {
        if (t == elm) {
            return true;
        }
        t = t.parentNode;
    }
    return false;
}

var menuButton = document.getElementById("menuButton");
var sidebar = document.getElementById("sidebar");
menuButton.addEventListener("click", function () {
    sidebar.classList.toggle("menu-abierto");
});

let usuarioActivo = sessionStorage.getItem("usuarioActivo");

if (!usuarioActivo) {
    window.location.href = "login.html";
} else {
    document.getElementById("nombreUsuarioNavbar").textContent = usuarioActivo;
}

let enlacesCerrarSesion = document.querySelectorAll(".enlace-cerrar-sesion");
enlacesCerrarSesion.forEach(function (enlace) {
    enlace.addEventListener("click", function () {
        sessionStorage.removeItem("usuarioActivo");
    });
});

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