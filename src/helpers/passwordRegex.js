// La contraseña debe tener por lo menos una letra mayuscula, una minúscula, un caracter especial (ej:! - $). Debe tener una longitud entre 6 y 20 caracteres

const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{6,20}$/;

module.exports = passRegex