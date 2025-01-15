let score = 0;
let timeLeft = 30; // 30 segundos de juego
let gameInterval;  // Para el intervalo de aparición de bugs
let timerInterval; // Para el conteo regresivo

const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const gameContainer = document.getElementById("game-container");
const squishSound = new Audio("./assests/sounds/squish.wav");

// Función que crea un bug en una posición aleatoria dentro del contenedor
function createBug() {
  const bug = document.createElement("img");
  bug.src = "./assests/images/bug.png"; 
  bug.classList.add("bug");

  // Calcular posición aleatoria
  const containerWidth = gameContainer.offsetWidth;
  const containerHeight = gameContainer.offsetHeight;
  const x = Math.random() * (containerWidth - 50);
  const y = Math.random() * (containerHeight - 50);

  // Asignar posición
  bug.style.left = x + "px";
  bug.style.top = y + "px";

  // Cuando se hace clic en el bug, suma puntos y se elimina
  bug.addEventListener("click", () => {
    score++;
    scoreElement.textContent = score;

    // Reproducimos el sonido
    squishSound.currentTime = 0;  // Reinicia el audio por si se solapa
    squishSound.play();

    // Luego removemos el bug
    bug.remove();
  });

  // Agregar al contenedor
  gameContainer.appendChild(bug);

  // El bug desaparece solo después de cierto tiempo (ej. 1.5 s)
  setTimeout(() => {
    if (bug.parentNode) {
      bug.remove();
    }
  }, 1500);
}

// Función para iniciar el juego
function startGame() {
  score = 0;
  timeLeft = 30;
  scoreElement.textContent = score;
  timeElement.textContent = timeLeft;

  // Crear bugs cada 0.8 segundos
  gameInterval = setInterval(createBug, 800);

  // Contador de tiempo
  timerInterval = setInterval(() => {
    timeLeft--;
    timeElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

// Función para terminar el juego
function endGame() {
  clearInterval(gameInterval);
  clearInterval(timerInterval);

  // Mostrar alerta o mensaje final
  alert("¡Tiempo terminado! Puntuación final: " + score);
}

// Iniciar el juego automáticamente (o se puede hacer con un botón)
window.onload = startGame;
