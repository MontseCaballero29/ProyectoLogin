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

let modalEdad = document.getElementById("modalEdad");
let mensajeModalEdad = document.getElementById("mensajeModalEdad");

function cerrarModalEdad() {
    modalEdad.classList.add("hidden");
    modalEdad.classList.remove("flex");

    // El formulario se oculta hasta que se vuelva a elegir Usuarios > Registro
    seccionCaptura.classList.add("hidden");
    formCaptura.reset();
    mensajeCaptura.classList.remove("show");
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

let submenuUsuarios = document.getElementById("submenuUsuarios");
let flechaUsuarios = document.getElementById("flechaUsuarios");

function alternarSubmenuUsuarios() {
    let estaAbierto = !submenuUsuarios.classList.contains("hidden");
    submenuUsuarios.classList.toggle("hidden");
    flechaUsuarios.style.transform = estaAbierto ? "rotate(0deg)" : "rotate(90deg)";
}

// Muestra el formulario de captura únicamente al hacer clic en Registro
let enlaceRegistro = document.getElementById("enlaceRegistro");
let seccionCaptura = document.getElementById("seccionCaptura");

enlaceRegistro.addEventListener("click", function (evento) {
    evento.preventDefault();
    seccionCaptura.classList.remove("hidden");
    seccionCaptura.scrollIntoView({ behavior: "smooth", block: "start" });
});

let formCaptura = document.getElementById("formCaptura");
let capturaNombreCompleto = document.getElementById("capturaNombreCompleto");
let capturaUsuario = document.getElementById("capturaUsuario");
let capturaCorreo = document.getElementById("capturaCorreo");
let capturaPassword = document.getElementById("capturaPassword");
let capturaNumeroControl = document.getElementById("capturaNumeroControl");
let capturaFechaNacimiento = document.getElementById("capturaFechaNacimiento");
let capturaCurp = document.getElementById("capturaCurp");

// Impide seleccionar desde el calendario una fecha posterior al día actual.
let hoyFecha = new Date();
let anioActual = hoyFecha.getFullYear();
let mesActual = String(hoyFecha.getMonth() + 1).padStart(2, "0");
let diaActual = String(hoyFecha.getDate()).padStart(2, "0");
capturaFechaNacimiento.max = anioActual + "-" + mesActual + "-" + diaActual;

let errorCapturaNombreCompleto = document.getElementById("errorCapturaNombreCompleto");
let errorCapturaUsuario = document.getElementById("errorCapturaUsuario");
let errorCapturaCorreo = document.getElementById("errorCapturaCorreo");
let errorCapturaPassword = document.getElementById("errorCapturaPassword");
let errorCapturaNumeroControl = document.getElementById("errorCapturaNumeroControl");
let errorCapturaFechaNacimiento = document.getElementById("errorCapturaFechaNacimiento");
let errorCapturaCurp = document.getElementById("errorCapturaCurp");
let mensajeCaptura = document.getElementById("mensajeCaptura");

formCaptura.addEventListener("submit", function (evento) {
    evento.preventDefault();

    let nombreCompletoValido = soloLetras(capturaNombreCompleto.value.trim());
    let usuarioValido = validarNombreUsuario(capturaUsuario.value.trim());
    let correoValido = validarCorreo(capturaCorreo.value.trim());
    let passwordValida = validarPassword(capturaPassword.value);
    let numeroControlValido = validarNumControl(capturaNumeroControl.value.trim());
    let edad = calcularEdad(capturaFechaNacimiento.value);
    let fechaNacimientoValida = capturaFechaNacimiento.value !== "" &&
        !isNaN(edad) && edad >= 18;
    let curpValida = validarCurp(capturaCurp.value.trim());

    errorCapturaNombreCompleto.classList.toggle("show", !nombreCompletoValido);
    errorCapturaUsuario.classList.toggle("show", !usuarioValido);
    errorCapturaCorreo.classList.toggle("show", !correoValido);
    errorCapturaPassword.classList.toggle("show", !passwordValida);
    errorCapturaNumeroControl.classList.toggle("show", !numeroControlValido);

    // Valida que la fecha exista, no sea futura y corresponda a una persona mayor de edad.
    if (capturaFechaNacimiento.value === "") {
        errorCapturaFechaNacimiento.textContent = "Selecciona tu fecha de nacimiento";
    } else if (isNaN(edad)) {
        errorCapturaFechaNacimiento.textContent = "La fecha de nacimiento no es válida";
    } else if (edad < 0) {
        errorCapturaFechaNacimiento.textContent = "La fecha de nacimiento no puede ser futura";
    } else if (edad < 18) {
        errorCapturaFechaNacimiento.textContent = "Debes ser mayor de edad para registrarte";
    }
    errorCapturaFechaNacimiento.classList.toggle("show", !fechaNacimientoValida);
    errorCapturaCurp.classList.toggle("show", !curpValida);

    let todoValido = nombreCompletoValido && usuarioValido && correoValido &&
        passwordValida && numeroControlValido && fechaNacimientoValida && curpValida;

    if (todoValido) {
        mensajeCaptura.textContent = "Usuario guardado correctamente";
        mensajeCaptura.classList.add("show");

        mensajeModalEdad.textContent =
            "El usuario capturado es mayor de edad. Tiene " + edad + " años.";

        // Muestra el modal. El formulario permanece visible hasta cerrar el modal.
        modalEdad.classList.remove("hidden");
        modalEdad.classList.add("flex");
    } else {
        mensajeCaptura.classList.remove("show");
    }
});