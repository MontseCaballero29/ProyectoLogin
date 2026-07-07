//Valida  correo electrónico.
function validarCorreo(correo) {
    let expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresion.test(correo);
}

// valida texto y espacios
function soloLetras(texto) {
    let expresion = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/;
    return expresion.test(texto);
}

//Valida que un número no supere una longitud máxima
function validarLongitud(numero, maxLongitud) {
    return /^\d+$/.test(numero) &&
           String(numero).length <= maxLongitud;
}

// Calcula la edad de una persona a partir de su fecha de nacimiento
function calcularEdad(fechaNacimiento) {
    let nacimiento = new Date(fechaNacimiento + "T00:00:00");
    let hoy = new Date();
    // Validar que la fecha no sea futura
    if (nacimiento > hoy) { return 0; }
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    let cumple = new Date(hoy.getFullYear(), nacimiento.getMonth(), nacimiento.getDate());
    if (hoy < cumple) {edad--;}

    return edad;
}

//Valida si una persona tiene 18 años o más.
function esMayorDeEdad(fechaNacimiento) {
    return calcularEdad(fechaNacimiento) >= 18;
}

//contraseña mínim o de 8 cacrayters
function validarPassword(password) {
    let mayuscula = /[A-Z]/.test(password);
    let minuscula = /[a-z]/.test(password);
    let numero = /[0-9]/.test(password);
    let especial = /[^A-Za-z0-9]/.test(password);
    let longitud = password.length >= 8;
    return mayuscula && minuscula && numero && especial && longitud;
}

//Valida que un teléfono tenga exactamente 10 dígitos.
function validarTelefono(telefono) {
    let expresion = /^\d{10}$/;
    return expresion.test(telefono);
}

// Valida un nombre de usuario.
function validarNombreUsuario(usuario) {
    let expresion = /^[A-Za-z0-9_]+$/;
    return expresion.test(usuario);
}



