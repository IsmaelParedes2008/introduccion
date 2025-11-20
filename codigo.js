/* ------------------- COMANDOS DE EDICIÓN ------------------- */
function cmd(comando) {
    document.execCommand(comando, false, null);
}

function cmdValue(comando, valor) {
    document.execCommand(comando, false, valor);
}

function limpiar() {
    document.getElementById("editor").innerHTML = "";
}

/* Copiar solo el texto seleccionado */
function copiar() {
    let seleccion = window.getSelection().toString();
    if (seleccion.length > 0) {
        navigator.clipboard.writeText(seleccion);
        alert("Texto copiado: " + seleccion);
    } else {
        alert("Selecciona primero el texto que quieres copiar.");
    }
}

/* Cortar el texto seleccionado */
function cortar() {
    let seleccion = window.getSelection();
    let textoSeleccionado = seleccion.toString();

    if (textoSeleccionado.length > 0) {
        navigator.clipboard.writeText(textoSeleccionado);
        let rango = seleccion.getRangeAt(0);
        rango.deleteContents();
        alert("Texto cortado: " + textoSeleccionado);
    } else {
        alert("Selecciona primero el texto que quieres cortar.");
    }
}

/* Pegar texto desde portapapeles */
async function pegar() {
    try {
        const texto = await navigator.clipboard.readText();
        document.execCommand("insertText", false, texto);
    } catch (err) {
        alert("Error al pegar: " + err);
    }
}

/*Aux*/

function esEspacioONuevaLinea(c) {
    return c === " " || c === "\n";
}

function esVocal(c) {
    return (c === "a" || c === "e" || c === "i" || c === "o" || c === "u" ||
            c === "A" || c === "E" || c === "I" || c === "O" || c === "U");
}

function esLetra(c) {
    return (c >= "A" && c <= "Z") || (c >= "a" && c <= "z");
}

function esConsonante(c) {
    return esLetra(c) && !esVocal(c);
}

function esDigito(c) {
    return c >= "0" && c <= "9";
}

function esPuntuacion(c) {
    return (
        c === "." || c === "," || c === ";" || c === ":" || 
        c === "!" || c === "?" || c === "¿" || c === "¡" || c === "\""
    );
}

function aMinuscula(c) {
    return c.toLowerCase();
}

/*funcion de texto*/

function contarPalabras(texto) {
    let palabras = 0;
    let dentro = false;

    for (let i = 0; i < texto.length; i++) {
        let c = texto[i];

        if (!esEspacioONuevaLinea(c) && !dentro) {
            palabras++;
            dentro = true;
        } else if (esEspacioONuevaLinea(c)) {
            dentro = false;
        }
    }
    return palabras;
}

function contarPuntuacion(texto) {
    let total = 0;
    for (let i = 0; i < texto.length; i++) {
        if (esPuntuacion(texto[i])) total++;
    }
    return total;
}

function contarPares(texto) {
    let contador = 0;

    for (let i = 0; i < texto.length; i++) {
        if (i % 2 === 0 && texto[i] !== " ") {
            contador++;
        }
    }

    return contador;
}


function contarImpares(texto) {
    let contador = 0;

    for (let i = 0; i < texto.length; i++) {
        if (i % 2 !== 0 && texto[i] !== " ") {
            contador++;
        }
    }

    return contador;
}

function contarVocales(texto) {
    let total = 0;
    for (let i = 0; i < texto.length; i++) {
        if (esVocal(texto[i])) total++;
    }
    return total;
}

function contarConsonantes(texto) {
    let total = 0;
    for (let i = 0; i < texto.length; i++) {
        if (esConsonante(texto[i])) total++;
    }
    return total;
}

function contarDigitos(texto) {
    let t = 0;
    for (let i = 0; i < texto.length; i++) {
        if (esDigito(texto[i])) t++;
    }
    return t;
}

function contarMayusInicial(texto) {
    let cont = 0;
    let dentro = false;

    for (let i = 0; i < texto.length; i++) {
        let c = texto[i];

        if (!esEspacioONuevaLinea(c) && !dentro) {
            if (c >= "A" && c <= "Z") cont++;
            dentro = true;
        } else if (esEspacioONuevaLinea(c)) {
            dentro = false;
        }
    }
    return cont;
}

function contarMinusInicial(texto) {
    let cont = 0;
    let dentro = false;

    for (let i = 0; i < texto.length; i++) {
        let c = texto[i];

        if (!esEspacioONuevaLinea(c) && !dentro) {
            if (c >= "a" && c <= "z") cont++;
            dentro = true;
        } else if (esEspacioONuevaLinea(c)) {
            dentro = false;
        }
    }
    return cont;
}

function contarParrafos(texto) {
    let parrafos = 0;
    let tieneTexto = false;

    for (let i = 0; i < texto.length; i++) {
        let c = texto[i];

        if (c !== "\n" && c !== " ") tieneTexto = true;

        if (c === "\n") {
            if (tieneTexto) parrafos++;
            tieneTexto = false;
        }
    }

    if (tieneTexto) parrafos++;
    return parrafos;
}

function invertirTexto(texto) {
    let resultado = "";
    let linea = "";

    for (let i = 0; i < texto.length; i++) {
        let c = texto[i];

        if (c !== "\n") {
            linea = c + linea;
        } else {
            resultado += linea + "\n";
            linea = "";
        }
    }

    resultado += linea;
    return resultado;
}

function contarCaracteresSinSaltos(texto) {
    let t = 0;
    for (let i = 0; i < texto.length; i++) {
        if (texto[i] !== "\n") t++;
    }
    return t;
}

function buscarPalabra(texto, palabra) {
    texto = texto.toLowerCase();
    palabra = palabra.toLowerCase();

    let n = texto.length;
    let m = palabra.length;

    for (let i = 0; i < n; i++) {

        let iguales = true;

        for (let j = 0; j < m; j++) {
            if (texto[i + j] !== palabra[j]) {
                iguales = false;
                j = m; 
            }
        }

        if (iguales) {
            return true;
        }
    }

    return false;
}


function contarCaracter(texto, caracter) {
    let contador = 0;

    for (let i = 0; i < texto.length; i++) {
        if (texto[i] === caracter) {
            contador++;
        }
    }

    return contador;
}

function agregarInicio(texto, frag) {
    return frag + " " + texto;
}

function agregarFinal(texto, frag) {
    return texto + " " + frag;
}

/* La parte del menú que sale al final */

function analizar() {
    const texto = document.getElementById("editor").innerText;

    let salida =
        "Palabras: " + contarPalabras(texto) + "\n" +
        "Signos de puntuación: " + contarPuntuacion(texto) + "\n" +
        "Vocales: " + contarVocales(texto) + "\n" +
        "Consonantes: " + contarConsonantes(texto) + "\n" +
        "Dígitos: " + contarDigitos(texto) + "\n" +
        "Palabras con mayúscula inicial: " + contarMayusInicial(texto) + "\n" +
        "Palabras con minúscula inicial: " + contarMinusInicial(texto) + "\n" +
        "Párrafos: " + contarParrafos(texto) + "\n" +
        "Texto invertido: " + invertirTexto(texto) + "\n" +
        "Total de caracteres: " + contarCaracteresSinSaltos(texto) + "\n\n";

    /* Menú adicional con botones azulitos */
    salida += `
Buscar palabra: <input id="buscar" class="border p-1"> 
   <button onclick="ejBuscar()" class="bg-blue-400 text-white px-2 py-1 rounded">OK</button>

Contar carácter: <input id="caracter" maxlength="1" class="border p-1">
   <button onclick="ejCaracter()" class="bg-blue-400 text-white px-2 py-1 rounded">OK</button>

Caracteres en posiciones pares: ${contarPares(texto)}

Caracteres en posiciones impares: ${contarImpares(texto)}

Añadir texto al inicio: <input id="inicio" class="border p-1">
   <button onclick="ejInicio()" class="bg-blue-400 text-white px-2 py-1 rounded">OK</button>

Añadir texto al final: <input id="final" class="border p-1">
   <button onclick="ejFinal()" class="bg-blue-400 text-white px-2 py-1 rounded">OK</button>
`;

    document.getElementById("resultados").innerHTML = salida;
}

function ejBuscar() {
    let texto = document.getElementById("editor").innerText;
    let palabra = document.getElementById("buscar").value;

    if (buscarPalabra(texto, palabra)) {
        alert('La palabra "' + palabra + '" SÍ está en el texto.');
    } else {
        alert('La palabra "' + palabra + '" NO está en el texto.');
    }
}

function ejCaracter() {
    let texto = document.getElementById("editor").innerText;
    let c = document.getElementById("caracter").value;

    let cantidad = contarCaracter(texto, c);
    alert('El carácter "' + c + '" aparece ' + cantidad + ' veces.');
}

function ejInicio() {
    let editor = document.getElementById("editor");
    let frag = document.getElementById("inicio").value;

    editor.innerText = agregarInicio(editor.innerText, frag);
}

function ejFinal() {
    let editor = document.getElementById("editor");
    let frag = document.getElementById("final").value;

    editor.innerText = agregarFinal(editor.innerText, frag);
}