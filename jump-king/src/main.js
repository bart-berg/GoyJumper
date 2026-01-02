import { Player } from "./Player.js";
import { input, startPressed, consumeStart } from "./input.js";
import { platforms, slopes } from "./Level.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const GameState = {
  MENU: "menu",
  PLAYING: "playing",
  PAUSED: "paused"
};

let gameState = GameState.MENU;

let scale, offsetX, offsetY;

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  scale = Math.min(canvas.width / 480, canvas.height / 360);

  offsetX = (canvas.width - 480 * scale) / 2;
  offsetY = (canvas.height - 360 * scale) / 2;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const player = new Player(100, 200);

let lastTime = 0;

function gameLoop(time){
  const rawDelta = (time - lastTime) / 1000;
  const delta = Math.min(rawDelta, 0.05);
  lastTime = time;

  if (gameState === GameState.MENU) {
    drawMenu();

    if (startPressed) {
        consumeStart();
        resetGame();
        gameState = GameState.PLAYING;
      }

    requestAnimationFrame(gameLoop);
    return;
  }

  if (gameState === GameState.PLAYING) {
    player.update(input, delta, platforms, slopes);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.scale(scale, scale);

    const screenY = Math.floor(player.y / 360);
    ctx.translate(0, -screenY * 360);

    slopes.forEach(s => s.draw(ctx));

    platforms.forEach(p => p.draw(ctx));
    player.draw(ctx);

    ctx.restore();
  }

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

function resetGame() {
  player.x = 240; 
  player.y = 303;
  player.velX = 0;
  player.velY = 0;
  player.jumpCharge = 0;
  player.jumpCharging = false;
}

const menuImage = new Image();
menuImage.src = "./soy.jpg";

function drawMenu() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(offsetX, offsetY);
  ctx.scale(scale, scale);

  // Opcjonalnie: tło obszaru gry, żeby widzieć gdzie są granice 480x360
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, 480, 360);

  // Dostosowane pozycje obrazków (rozstawione szerzej na 480px)
  ctx.drawImage(menuImage, 40, 50, 70, 140);
  ctx.drawImage(menuImage, 370, 50, 70, 140); // Przesunięte w prawo

  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.textAlign = "center";

  ctx.fillText("GOY JUMPER", 240, 80); // Środek to 240
  ctx.fillText("PRESS ENTER", 240, 140);
  ctx.fillText("TO START", 240, 165);

  ctx.restore();
}
