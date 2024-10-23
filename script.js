// Variables del juego
let numeroSecreto, intentosRestantes;

// Referencias al DOM
const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const resultMessage = document.getElementById('resultMessage');
const resetButton = document.getElementById('resetButton');
const startButton = document.getElementById('startButton');
const menu = document.getElementById('menu');
const gameContainer = document.getElementById('gameContainer');

// Corazones
const heartSpans = [
    document.getElementById('heart1'),
    document.getElementById('heart2'),
    document.getElementById('heart3'),
    document.getElementById('heart4'),
    document.getElementById('heart5')
];

// Función para iniciar el juego
startButton.addEventListener('click', function() {
    // Obtener el valor de dificultad
    const difficulty = document.getElementById('difficulty').value;
    
    // Definir rango basado en la dificultad seleccionada
    switch (difficulty) {
        case 'easy':
            numeroSecreto = Math.floor(Math.random() * 50) + 1;
            resultMessage.textContent = "Elige un número entre 1 y 50:";
            break;
        case 'medium':
            numeroSecreto = Math.floor(Math.random() * 100) + 1;
            resultMessage.textContent = "Elige un número entre 1 y 100:";
            break;
        case 'hard':
            numeroSecreto = Math.floor(Math.random() * 200) + 1;
            resultMessage.textContent = "Elige un número entre 1 y 200:";
            break;
        case 'savage':
            numeroSecreto = Math.floor(Math.random() * 1000) + 1;
            resultMessage.textContent = "Elige un número entre 1 y 1000:";
            break;
        default:
            numeroSecreto = Math.floor(Math.random() * 100) + 1;
            resultMessage.textContent = "Elige un número entre 1 y 100:";
    }
    intentosRestantes = 5;

    // Ocultar el menú y mostrar el juego
    menu.style.display = 'none';  // Asegúrate de ocultar el menú
    gameContainer.style.display = 'block'; // Mostrar el contenedor del juego
    resetButton.style.display = 'block'; // Mostrar botón de reinicio
});

// Función para manejar la lógica del juego
guessButton.addEventListener('click', function() {
    let guess = Number(guessInput.value);

    if (!guess || guess < 1 || guess > 1000) {
        resultMessage.textContent = 'Por favor, ingresa un número válido.';
        return;
    }

    if (guess === numeroSecreto) {
        resultMessage.textContent = `¡Felicidades! Adivinaste el número ${numeroSecreto} en el intento ${6 - intentosRestantes}`;
        guessButton.disabled = true; // Deshabilitar el botón de adivinar
        return; // No vaciar más corazones
    }

    intentosRestantes--;

    if (guess < numeroSecreto) {
        resultMessage.textContent = 'El número es mayor.';
    } else {
        resultMessage.textContent = 'El número es menor.';
    }

    // Actualizar los corazones solo si quedan intentos
    if (intentosRestantes >= 0) {
        heartSpans[intentosRestantes].textContent = '♡';
    }

    // Si el jugador no adivina y solo queda un intento
    if (intentosRestantes === 1) {
        heartSpans[1].classList.add('shake'); // Agregar clase de temblor
        setTimeout(() => {
            heartSpans[1].classList.remove('shake'); // Remover clase después de un tiempo
        }, 500); // Duración del temblor
    }

    // Si el jugador no adivinó y ya no quedan intentos
    if (intentosRestantes === 0) {
        resultMessage.textContent = `Lo siento, se acabaron los intentos. El número era ${numeroSecreto}`;
        guessButton.disabled = true; // Deshabilitar el botón de adivinar
    }

    // Limpiar el input
    guessInput.value = '';
});

// Función para reiniciar el juego
resetButton.addEventListener('click', function() {
    const difficulty = document.getElementById('difficulty').value;
    // Generar nuevo número basado en la dificultad seleccionada
    switch (difficulty) {
        case 'easy':
            numeroSecreto = Math.floor(Math.random() * 50) + 1;
            resultMessage.textContent = "Elige un número entre 1 y 50:";
            break;
        case 'medium':
            numeroSecreto = Math.floor(Math.random() * 100) + 1;
            resultMessage.textContent = "Elige un número entre 1 y 100:";
            break;
        case 'hard':
            numeroSecreto = Math.floor(Math.random() * 200) + 1;
            resultMessage.textContent = "Elige un número entre 1 y 200:";
            break;
        case 'savage':
            numeroSecreto = Math.floor(Math.random() * 1000) + 1;
            resultMessage.textContent = "Elige un número entre 1 y 1000:";
            break;
        default:
            numeroSecreto = Math.floor(Math.random() * 100) + 1;
            resultMessage.textContent = "Elige un número entre 1 y 100:";
    }
    intentosRestantes = 5; // Restablecer intentos

    // Reiniciar el mensaje y habilitar el botón de adivinar
    resultMessage.textContent = '';
    guessButton.disabled = false; // Habilitar el botón de adivinar

    // Reiniciar corazones
    heartSpans.forEach(heart => heart.textContent = '♥');

    // Limpiar el input
    guessInput.value = '';
});
