import { Player } from "./Player.js";
import { input, consumeEnter, consumeEscape, consumeUp, consumeDown } from "./Input.js";
import { platforms, slopes, npcs } from "./Level.js";
import { UI } from "./UI.js";

//Debug
//---------------------------------------------------------------
const DEBUG = true;
let mouseX = 0;
let mouseY = 0;
//---------------------------------------------------------------

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
let pauseSelection = 0; 

const player = new Player(220, -2200);
player.loadGame(); // Wczytuje zapis przy starcie/odświeżeniu

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

  // --- 1. OBSŁUGA ESCAPE (PAUZA) ---
  if (input.escape) {
    consumeEscape();
    if (gameState === GameState.PLAYING) {
      gameState = GameState.PAUSED;
      pauseSelection = 0; 
    } else if (gameState === GameState.PAUSED) {
      gameState = GameState.PLAYING;
    }
  }

  // --- 2. LOGIKA STANÓW ---
  if (gameState === GameState.MENU) {
    UI.drawMenu(ctx, canvas, scale, offsetX, offsetY);
    
    if (input.enter) {
      consumeEnter();
      gameState = GameState.PLAYING;
    }
  } 
  else if (gameState === GameState.PAUSED) {
    // Nawigacja w pauzie
    if (input.up) { consumeUp(); pauseSelection = (pauseSelection - 1 + 3) % 3; }
    if (input.down) { consumeDown(); pauseSelection = (pauseSelection + 1) % 3; }

    if (input.enter) {
      consumeEnter();
      if (pauseSelection === 0) { // RESUME
        gameState = GameState.PLAYING;
      } else if (pauseSelection === 1) { // RESTART
        player.reset();
        player.saveGame(); // Czyścimy zapis (nadpisujemy nowym startem)
        gameState = GameState.PLAYING;
      } else if (pauseSelection === 2) { // EXIT
        player.saveGame(); // Zapisujemy przed wyjściem do menu
        gameState = GameState.MENU;
      }
    }

    renderGameScene();
    UI.drawPauseMenu(ctx, player, scale, offsetX, offsetY, pauseSelection);
  } 
  else if (gameState === GameState.PLAYING) {
    player.update(input, delta, platforms, slopes);
    npcs.forEach(n => n.update(delta, player));
    npcs.forEach(n => n.draw(ctx));
    renderGameScene();
  }

  requestAnimationFrame(gameLoop);
}

function renderGameScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(offsetX, offsetY);
  ctx.scale(scale, scale);

  const screenY = Math.floor(player.y / 360);
  ctx.translate(0, -screenY * 360);

  slopes.forEach(s => s.draw(ctx));
  platforms.forEach(p => p.draw(ctx));
  npcs.forEach(n => n.draw(ctx));
  player.draw(ctx);

  ctx.restore();
  UI.drawHUD(ctx, player, scale, offsetX, offsetY);

  //Debug
  //---------------------------------------------------------------
  if (DEBUG) {
  ctx.save();
  ctx.fillStyle = "lime";
  ctx.font = "12px monospace";
  ctx.fillText(`X: ${mouseX}  Y: ${mouseY}`, 10, 340);
  ctx.restore();
}
  //---------------------------------------------------------------
}

//Debug
//---------------------------------------------------------------
canvas.addEventListener("mousemove", (e) => {
  if (!DEBUG) return;

  const rect = canvas.getBoundingClientRect();

  const screenX = (e.clientX - rect.left - offsetX) / scale;
  const screenY = (e.clientY - rect.top - offsetY) / scale;

  const screenIndex = Math.floor(player.y / 360);

  mouseX = Math.floor(screenX);
  mouseY = Math.floor(screenY + screenIndex * 360);
});
//---------------------------------------------------------------

requestAnimationFrame(gameLoop);