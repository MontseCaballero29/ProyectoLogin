let formLogin = document.getElementById("formLogin");
let campoCorreo = document.getElementById("correo");
let campoPassword = document.getElementById("password");
let errorCorreo = document.getElementById("errorCorreo");
let errorPassword = document.getElementById("errorPassword");
let errorLogin = document.getElementById("errorLogin");

formLogin.addEventListener("submit", function (evento) {
    evento.preventDefault();

    let correo = campoCorreo.value.trim();
    let password = campoPassword.value;

    let correoValido = validarCorreo(correo);
    let passwordValida = validarPassword(password);

    errorCorreo.classList.toggle("show", !correoValido);
    errorPassword.classList.toggle("show", !passwordValida);

    if (correoValido && passwordValida) {
        errorLogin.classList.remove("show");
        sessionStorage.setItem("usuarioActivo", correo);
        window.location.href = "index.html";
    } else {
        errorLogin.textContent = "Revisa los campos marcados en rojo";
        errorLogin.classList.add("show");
    }
});