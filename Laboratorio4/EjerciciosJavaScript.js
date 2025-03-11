// 1. Tabla de cuadrados y cubos
let num = parseInt(prompt("Ingresa un número:"));  // Pedir numero
document.write("<h3>Tabla de cuadrados y cubos</h3>");
document.write("<table border='1'><tr><th>Número</th><th>Cuadrado</th><th>Cubo</th></tr>");

for (let i = 1; i <= num; i++) {
    let cuadrado = i * i;
    let cubo = i * i * i;
    document.write(`<tr><td>${i}</td><td>${cuadrado}</td><td>${cubo}</td></tr>`);
}
document.write("</table>");

// 2. Suma de dos numeros aleatorios
let num1 = Math.floor(Math.random() * 10) + 1;  // Numero aleatorio entre 1 y 10
let num2 = Math.floor(Math.random() * 10) + 1;
let inicio = Date.now();  // Guardar tiempo de inicio
let respuesta = parseInt(prompt(`¿Cuánto es ${num1} + ${num2}?`));  // Preguntar la suma
let fin = Date.now();  // Guardamos tiempo de finalizacion
let tiempo = (fin - inicio) / 1000;  // Calcular tiempo en segundos

document.write("<h3>Suma aleatoria</h3>");
document.write(`<p>${num1} + ${num2} = ${respuesta}</p>`);
document.write(`<p>${respuesta === num1 + num2 ? "Correcto" : "Incorrecto"}. Tiempo: ${tiempo} segundos.</p>`);

// 3. Contar negativos, ceros y positivos en una lista
function contarNumeros(lista) {
    let negativos = 0, ceros = 0, positivos = 0;
    for (let num of lista) {
        if (num < 0) negativos++;
        else if (num === 0) ceros++;
        else positivos++;
    }
    return { negativos, ceros, positivos };
}
let numerosEjemplo = [-3, 0, 4, -1, 0, 5];
let resultado = contarNumeros(numerosEjemplo);

document.write("<h3>Contador de números</h3>");
document.write(`<p>Negativos: ${resultado.negativos}, Ceros: ${resultado.ceros}, Positivos: ${resultado.positivos}</p>`);

// 4. Promedios de filas en una tabla de numeros
function calcularPromedios(matriz) {
    let promedios = [];
    for (let fila of matriz) {
        let suma = 0;
        for (let num of fila) {
            suma += num;
        }
        promedios.push(suma / fila.length);
    }
    return promedios;
}
let tabla = [[3, 5, 7], [10, 20, 30], [4, 8, 12]];
let promediosCalculados = calcularPromedios(tabla);

document.write("<h3>Promedios de filas</h3>");
document.write(`<p>${promediosCalculados.join(", ")}</p>`);

// 5. Numero inverso
function invertirNumero(numero) {
    return parseInt(numero.toString().split("").reverse().join(""));
}
let numeroOriginal = 12345;
document.write("<h3>Número inverso</h3>");
document.write(`<p>${numeroOriginal} → ${invertirNumero(numeroOriginal)}</p>`);

// 6. Convertir grados Celsius a Fahrenheit
let gradosCelsius = parseFloat(prompt("Ingresa la temperatura en grados Celsius:"));

function convertirAFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

document.write("<h3>Conversión de grados Celsius a Fahrenheit</h3>");
document.write(`<p>${gradosCelsius}°C equivale a ${convertirAFahrenheit(gradosCelsius)}°F</p>`);
