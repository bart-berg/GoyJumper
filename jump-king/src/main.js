import { Player } from "./Player.js";
import { input, consumeEnter, consumeEscape, consumeUp, consumeDown } from "./input.js";
import { platforms, slopes } from "./Level.js";
import { UI } from "./UI.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const GameState = {
  MENU: "menu",
  PLAYING: "playing",
  PAUSED: "paused"
};

let gameState = GameState.MENU;
let scale, offsetX, offsetY;
let lastTime = 0;
let pauseSelection = 0; // 0: RESUME, 1: RESTART, 2: EXIT

const player = new Player(100, 200);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  scale = Math.min(canvas.width / 480, canvas.height / 360);

  offsetX = (canvas.width - 480 * scale) / 2;
  offsetY = (canvas.height - 360 * scale) / 2;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function gameLoop(time) {
  const rawDelta = (time - lastTime) / 1000;
  const delta = Math.min(rawDelta, 0.05);
  lastTime = time;

  // --- 1. OBSŁUGA PAUZY (ESCAPE) ---
  if (input.escape) {
    consumeEscape();
    if (gameState === GameState.PLAYING) {
      gameState = GameState.PAUSED;
      pauseSelection = 0; // Zawsze zaczynaj od RESUME
    } else if (gameState === GameState.PAUSED) {
      gameState = GameState.PLAYING;
    }
  }

  // --- 2. LOGIKA STANÓW ---
  if (gameState === GameState.MENU) {
    UI.drawMenu(ctx, canvas, scale, offsetX, offsetY);
    
    if (input.enter) {
      consumeEnter();
      player.reset();
      gameState = GameState.PLAYING;
    }
  } 
  else if (gameState === GameState.PAUSED) {
    // Nawigacja w pauzie
    if (input.up) {
      consumeUp();
      pauseSelection = (pauseSelection - 1 + 3) % 3;
    }
    if (input.down) {
      consumeDown();
      pauseSelection = (pauseSelection + 1) % 3;
    }

    // Wybór opcji w pauzie
    if (input.enter) {
      consumeEnter();
      if (pauseSelection === 0) {
        gameState = GameState.PLAYING; // RESUME
      } else if (pauseSelection === 1) {
        player.reset();
        gameState = GameState.PLAYING; // RESTART
      } else if (pauseSelection === 2) {
        gameState = GameState.MENU;    // EXIT
      }
    }

    // Rysujemy zamrożoną scenę i nakładkę menu
    renderGameScene();
    UI.drawPauseMenu(ctx, player, scale, offsetX, offsetY, pauseSelection);
  } 
  else if (gameState === GameState.PLAYING) {
    player.update(input, delta, platforms, slopes);
    renderGameScene();
  }

  requestAnimationFrame(gameLoop);
}

// Pomocnicza funkcja rysująca świat gry
function renderGameScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(offsetX, offsetY);
  ctx.scale(scale, scale);

  // Kamera pionowa (ekrany co 360px)
  const screenY = Math.floor(player.y / 360);
  ctx.translate(0, -screenY * 360);

  slopes.forEach(s => s.draw(ctx));
  platforms.forEach(p => p.draw(ctx));
  player.draw(ctx);

  ctx.restore();

  UI.drawHUD(ctx, player, scale, offsetX, offsetY);
}

requestAnimationFrame(gameLoop);