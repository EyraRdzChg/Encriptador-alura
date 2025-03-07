function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

const botonEncriptar = document.getElementById('encryptButton');
const botonDesencriptar = document.getElementById('decryptButton');
const contenedorOutput = document.getElementById('contentOutput');
const inputUsuario = document.getElementById('inputUsuario');
const contenText = document.querySelector('.contenText');


const botonCopiar = document.createElement('button');
botonCopiar.textContent = 'Copiar';
botonCopiar.classList.add('boton-copiar');
botonCopiar.style.display = 'none'; // Lo ocultamos inicialmente


const parrafoResultado = document.createElement('p');
parrafoResultado.classList.add('resultado');
contenedorOutput.appendChild(parrafoResultado); // Agregamos el párrafo al contenedor

const mensajeError = document.createElement('p');
mensajeError.classList.add('error');
mensajeError.style.color = 'red';

inputUsuario.insertAdjacentElement('afterend', mensajeError); // Insertamos el mensaje de error después del input

const mostrarMensajeError = (mensaje) => {
    mensajeError.textContent = mensaje;
};

const ocultarMensajeError = () => {
    mensajeError.textContent = '';
};

const mostrarElementoscontenText = (mostrar) => {

    const displayValue = mostrar ? 'block' : 'none';

    if (contenText) {
        contenText.style.display = displayValue;
    }

    contenedorOutput.style.justifyContent = mostrar ? 'center' : 'space-between';
};

const encriptarTexto = (texto) => {
    const encriptaciones = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };

    const textoEncriptado = texto.split('').map(letra => {
        if (letra === ' ') {
            return ' ';
        }
        return encriptaciones[letra] || letra;
    }).join('');

    return textoEncriptado;
};

const desencriptarTexto = (textoEncriptado) => {
    const desencriptaciones = {
        'enter': 'e',
        'imes': 'i',
        'ai': 'a',
        'ober': 'o',
        'ufat': 'u'
    };

    const textoDesencriptado = textoEncriptado.replace(/enter|imes|ai|ober|ufat/g, match => desencriptaciones[match]);

    return textoDesencriptado;
};

const manejarInputUsuario = (texto, tipo) => {
    const mensaje = texto.toLowerCase().trim();

    // Limpiar el resultado anterior y ocultar el botón de copiar
    parrafoResultado.textContent = '';
    botonCopiar.style.display = 'none';

    if (mensaje === '') {
        mostrarMensajeError('El campo de texto está vacío.');
        mostrarElementoscontenText(true);
        return;
    }

    const hasSpecialCharacters = /[^a-z\s]/i.test(mensaje);
    if (hasSpecialCharacters) {
        mostrarMensajeError('No se permiten caracteres especiales o acentos.');
        mostrarElementoscontenText(true);
        return;
    }

    const hasUppercaseLetters = /[A-Z]/.test(texto);
    if (hasUppercaseLetters) {
        mostrarMensajeError('No se permiten letras mayúsculas.');
        mostrarElementoscontenText(true);
        return;
    }

    ocultarMensajeError();
    const textoTransformado = tipo === 'encriptar' ? encriptarTexto(mensaje) : desencriptarTexto(mensaje);

    parrafoResultado.textContent = textoTransformado;
    botonCopiar.style.display = 'block';
    mostrarElementoscontenText(false); // Ocultar elementos contenText si la encriptación o desencriptación es exitosa
};


botonEncriptar.addEventListener('click', () => manejarInputUsuario(inputUsuario.value, 'encriptar'));
botonDesencriptar.addEventListener('click', () => manejarInputUsuario(inputUsuario.value, 'desencriptar'));

contenedorOutput.appendChild(botonCopiar);

botonCopiar.addEventListener('click', async () => {
    const textoCopiar = parrafoResultado.textContent;

    try {
        // Uso de Clipboard API para copiar el texto encriptado/desencriptado al portapapeles
        await navigator.clipboard.writeText(textoCopiar);
        alert('Texto copiado al portapapeles');
    } catch (err) {
        console.error('Error al copiar el texto:', err);
    }
});
