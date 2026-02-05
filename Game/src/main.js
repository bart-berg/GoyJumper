
// === IMPORTY (moduły gry, dane poziomu, grafika) ===
import { Player } from "./Player.js";
import { input, consumeEnter, consumeEscape, consumeUp, consumeDown } from "./Input.js";
import { platforms, slopes, npcs, shapes } from "./Level.js";
import { UI } from "./UI.js";
import { SpriteManager } from "./Graphics.js";
import { Circles } from "./Level.js";
import { FINAL_DIALOG, cutsceneTrigger } from "./Level.js";
import { FinalMemoryNPC } from "./NPC.js";

// === ZASOBY TŁA I TEKSTUR ===
const backgrounds = [];
const blockTextures = []; // Nowa tablica na tekstury bloków
const TOTAL_SCREENS = 49;

for (let i = 0; i <= TOTAL_SCREENS; i++) {
  // Ładowanie tła (już to masz)
  const bgImg = new Image();
  bgImg.src = `backgrounds/bg${i}.png`;
  backgrounds[i] = bgImg;

  // Ładowanie tekstur bloków (dodajemy to)
  const texImg = new Image();
  texImg.src = `textures/tex${i}.png`; // Zakładam nazwy tex0.png, tex1.png itd.
  blockTextures[i] = texImg;
}

// === STAN „CIRCLES” (napisy kręgów) ===
let isQuoteHovered = false;
let displayedCircle = null;
let frameDelta = 0;
let circleTimer = 0;
let activeCircle = null;

let circleTextTime = 0;
let showCircleText = false;

const CIRCLE_DELAY = 2.0;
const TEXT_FADE_IN = 3;
const TEXT_VISIBLE = 5;
const TEXT_FADE_OUT = 1;
const TEXT_TOTAL = TEXT_FADE_IN + TEXT_VISIBLE + TEXT_FADE_OUT;

// === EKRANY / NAWIGACJA ===
let screen = "production";
let productionFinished = false;

// === CUTSCENA FINAŁOWA — parametry timingu i wyglądu ===
const CUTSCENE_BLACK_HOLD     = 1.5;  // ile sekund pełny czarny ekran po wejściu w trigger
const CUTSCENE_BLACK_FADEIN   = 3;    // jak długo „schodzi” czarny (fade-in gry spod spodu)
const CUTSCENE_ENGEL_AFTER    = 2.5;  // ile sekund po zakończeniu czarnego fade-in czekamy na start pojawiania Engel

const CUTSCENE_NPC_ABS = { x: 440, y: -17550 }; // pozycja ABSOLUTNA Engel
const CUTSCENE_FADE_DURATION = 2;               // sekundy (1.0–1.5 wedle życzenia)
const CUTSCENE_DIALOG_DELAY = 1.0;              // sekundy pauzy po pojawieniu

// === CREDITS / THANKS: UI  ===
const END_WHITE_FADE_TIME     = 3.0;  // ile trwa pełne wybielenie po dialogu Engel
const CREDITS_SCROLL_SPEED    = 60;   // px/s – prędkość przewijania napisów (normalna)
const CREDITS_SCROLL_FAST     = 140;   // px/s – przytrzymany Enter (szybkie przewijanie)
const CREDITS_FONT_TITLE      = "68px Blashphemous";
const CREDITS_FONT_TEXT       = "42px Blashphemous";
const THANKS_TITLE_FONT       = "128px Blashphemous";
const THANKS_TEXT_FONT        = "82px Blashphemous";

const crownImage = new Image();
crownImage.src = "./textures/Crown.png";


// Po skończeniu credits ile sekund czekamy zanim wyświetlimy „Dziękujemy…”
const CREDITS_END_HOLD        = 0.8;

// === EFEKT WIATRU (animowana tekstura) ===
const windFrames = [];
const WIND_FRAME_COUNT = 3; // Ile masz plików (wind1, wind2, wind3)

for (let i = 1; i <= WIND_FRAME_COUNT; i++) {
  const img = new Image();
  // Upewnij się, że ścieżka jest poprawna i pliki nazywają się wind1.png, wind2.png itd.
  img.src = `sprites/wind${i}.png`;
  windFrames.push(img);
}

// Zmienne globalne do obsługi wiatru
let windX = 0;
let currentWindFrameIndex = 0; // Którą klatkę (0, 1 lub 2) pokazujemy
let windFrameTimer = 0;        // Licznik czasu do zmiany klatki
const WIND_FRAME_DURATION = 0.2; // Szybkość animacji

// --- Debug ---
const DEBUG = false;
let mouseX = 0;
let mouseY = 0;

// === PRZEJŚCIA MENU (fade in/out)  ===
let menuTransitionTime = 0;
const MENU_TRANSITION_DURATION = 1.2; // sekundy

// === PŁÓTNO i KONTEKST ===
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// === STAN GRY   ===
const GameState = {
  MENU: "menu",
  PLAYING: "playing",
  PAUSED: "paused"
};

let gameState = GameState.MENU;
let scale, offsetX, offsetY;
let lastTime = 0;
let pauseSelection = 0;

// === INICJALIZACJA GRACZA    ===
const player = new Player(10, 300); //jakis cwel to zmienil i byl zly spawn
player.loadGame(); // Wczytuje zapis przy starcie/odświeżeniu

// === DOPASOWANIE CANVASU     ===
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  scale = Math.min(canvas.width / 480, canvas.height / 360);
  offsetX = (canvas.width - 480 * scale) / 2;
  offsetY = (canvas.height - 360 * scale) / 2;

  ctx.imageSmoothingEnabled = false;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// === CUTSCENA: stan przebiegu i nakładki (alfa)  ===
let inFinalCutscene = false;
let finalCutscenePlayed = false;
let cutsceneNPC = null;
let cutsceneStage = 0;
let cutsceneTimer = 0;
let screenFlashAlpha = 0;
let fadeOutAlpha = 0;
let blackAlpha = 0;

// --- Ekrany końcowe / Credits ---
let whiteAlpha = 0;     
let creditsLines = [];  
let creditsY = 0;      
let creditsDone = false; 
let creditsHold = 0;    

// === DANE CREDITS  ===
const CREDITS = [
  { type: "title", text: "— ZESPÓŁ PRODUKCYJNY —" },
  "Głupi programista #1: Bartłomiej Kamyk",
  "Głupi programista #2: Gabriel Antonik",
  "Głupi programista #3: Robert Giebel",
  "",

  { type: "title", text: "— LEVEL DESIGN —" },
  "Układ mapy (Limbo → Treachery): Bartłomiej Kamyk",
  "Realizacja mapy: Robert Giebel",
  "Mechaniki: Robert Giebel, Bartłomiej Kamyk, Gabriel Antonik",
  "Balans trudności i pętle powrotów: Robert Giebel, Bartłomiej Kamyk, Gabriel Antonik",
  "",
  
  { type: "title", text: "— NARRACJA / TEKSTY —" },
  "Dialogi NPC: Robert Giebel",
  "Finalna scena: Robert Giebel",
  "Cytaty kręgów (PL / LA): Robert Giebel",
  "",


  { type: "title", text: "— GRAFIKA 2D —" },
  "Sprite'y: Bartłomiej Kamyk'",
  "Tła: Bartłomiej Kamyk",
  "Efekty: Bartłomiej Kamyk",
  "Czcionka: Robert Giebel",
  "Logo Spaghetti Code Studio: Robert Giebel",
  "",

  { type: "title", text: "— SYSTEMY —" },
  "Ruch i fizyka: Gabriel Antonik i Bartłomiej Kamyk",
  "Kolizję: Gabriel Antonik i Bartłomiej Kamyk",
  "System NPC: Robert Giebel",
  "",

  { type: "title", text: "— UI / UX —" },
  "Main Menu, Credits: Robert Giebel",
  "Pause Menu, HUD: Gabriel Antonik",
  "",

  { type: "title", text: "— SPECJALNE PODZIĘKOWANIA —" },
  "Za wsparcie, cierpliwość i feedback",
  "Za inspiracje literackie i symboliczne",
  "Za ten olbrzymy hate ze strony innych programistów",
  "Za istnieje Bartosza Cieśli oraz Szymona Rocznika",
  "",

  { type: "title", text: "— PRAWNE / LICENCJE —" },
  "© 2026 Spaghetti Code Studio. Wszelkie prawa zastrzeżone.",
  "",

  { type: "title", text: "— DEDYKACJA —" },
  "Dla Charliego Kirka oraz Jeffrey Epsteina, gra była robiona z myślą o was, spoczywajcie w pokoju",
  "Dla ChatGPT, Gemini oraz Microsoft 365 Copilot za napisanie całego kodu za nas.",
  "Dla firmy Giebel za niewpłacenie ani złamanego grosza na ten projekt"
];

// === CUTSCENA: „zamrożony” input do rysowania ===
const cutsceneDrawInput = {
  left: false,
  right: false,
  up: false,
  down: false,
  jump: false,
  enter: false,
  escape: false,
  debug: false
};

// Szybkie helpery (auto-walk / zmiana twarzy)
function setCutsceneWalkRight(on) {
  cutsceneDrawInput.right = !!on;
}
function setCutsceneFaceLeft(on) {
  cutsceneDrawInput.left = !!on;
}

// === POMOC: „przytnij” gracza ===
// === CUTSCENE: znajdź najbliższą platformę pod graczem i postaw go na niej ===

// === CUTSCENE: znajdź najbliższą platformę pod graczem i postaw go na niej ===
function snapPlayerToGround() {
  const footY = player.y + player.height;
  let bestPlat = null, bestY = Infinity;

  for (const plat of platforms) {
    const horiz =
      (player.x + player.width) > plat.x &&
      player.x < (plat.x + plat.width);
    const below = plat.y >= footY - 1;
    if (!horiz || !below) continue;

    if (plat.y < bestY) { bestY = plat.y; bestPlat = plat; }
  }

  if (bestPlat) {
    player.y = bestPlat.y - player.height;
    player.velX = 0; player.velY = 0;
    player.onGround = true;
    player.jumpCharging = false; player.jumpCharge = 0;
    player.isFaceplanting = false;
    player.walkTimer = 0;
  }
}

// === CUTSCENA: START / PRZEBIEG ===

// === CUTSCENE === start
function startFinalCutscene() {
  if (finalCutscenePlayed || inFinalCutscene) return;

  inFinalCutscene = true;
  cutsceneStage = 0;
  cutsceneTimer = 0;

  // Czarny ekran od razu na full
  blackAlpha = 1;
  fadeOutAlpha = 0;

  player.facing = 1;

  // Zamroź gracza i dociśnij do podłoża
  player.velX = 0;
  player.velY = 0;
  snapPlayerToGround(); // ← Twój helper, który wcześniej wstawiliśmy

  // NIE obracamy gracza do tyłu — facing zostaje taki, jaki był.

  // WAŻNE: NIE tworzymy jeszcze cutsceneNPC — zrobimy to dopiero po czarnym i odczekaniu kilku sekund
  cutsceneNPC = null;
}

// === GŁÓWNA PĘTLA GRY ===
function gameLoop(time) {
  // --- Delta time (clamp do 0.05s) ---
  const delta = Math.min((time - lastTime) / 1000, 0.05);
  lastTime = time;

  // === Ekran „Production”   ===
  if (screen === "production") {
    const finished = UI.drawProduction(
      ctx, canvas, scale, offsetX, offsetY, delta
    );

    if (input.enter || finished) {
      consumeEnter();
      screen = "menu";
      UI.resetProduction();
      UI.resetMenuAnimation();
    }

    requestAnimationFrame(gameLoop);
    return;
  }
  // -----------------------------




  // === TRYB CUTSCENKI (przed creditsami)  ===
  if (inFinalCutscene) {
    cutsceneTimer += delta;

    // Etap 0 — pełna czerń przez CUTSCENE_BLACK_HOLD
    if (cutsceneStage === 0) {
      blackAlpha = 1;
      if (cutsceneTimer >= CUTSCENE_BLACK_HOLD) {
        cutsceneStage = 1;
        cutsceneTimer = 0;
      }
    }

    // Etap 1 — fade-in z czerni (czarny overlay znika powoli)
    else if (cutsceneStage === 1) {
      const t = Math.min(1, cutsceneTimer / CUTSCENE_BLACK_FADEIN);
      blackAlpha = 1 - t; // schodzimy z 1 do 0
      if (t >= 1) {
        cutsceneStage = 2;
        cutsceneTimer = 0;
        blackAlpha = 0;
      }
    }

    // Etap 2 — pauza po fade-in, dopiero potem tworzymy Engel
    else if (cutsceneStage === 2) {
      if (cutsceneTimer >= CUTSCENE_ENGEL_AFTER) {
        // Tworzymy Engel DOPIERO TERAZ
        const pos = { x: CUTSCENE_NPC_ABS.x, y: -17550 };
        cutsceneNPC = new FinalMemoryNPC(
          CUTSCENE_NPC_ABS.x, CUTSCENE_NPC_ABS.y,
          30, 40,
          FINAL_DIALOG,
          {
            // --- czasy cutscenki ---
            fadeDuration: CUTSCENE_FADE_DURATION,    // np. 1.2 s
            appearanceDelay: CUTSCENE_DIALOG_DELAY,  // np. 1.0 s pauzy przed dialogiem

            // --- pauza po KAŻDYM ZDANIU ---
            pauseAfterSentence: 2,                 // ← tutaj możesz to zmienić

            // --- wygląd Engel ---
            spriteWidth: 22,     // szerokość sprite
            spriteHeight: 30,    // wysokość sprite
            spriteAlpha: 0.18,   // przezroczystość ducha (0–1)
            spriteFacing: -1,     // 1 normalnie, -1 = odwróć poziomo
            spriteOffsetX: 0,    // offset X
            spriteOffsetY: 0     // offset Y
          }
        );
        cutsceneStage = 3;
        cutsceneTimer = 0;
      }
    }

    // Etap 3 — Engel się pojawia i mówi
    else if (cutsceneStage === 3) {
      if (cutsceneNPC) {
        cutsceneNPC.update(delta, player);
        if (cutsceneNPC.finished) {
          cutsceneStage = 4;      // teraz białe wygaszenie
          cutsceneTimer = 0;
          whiteAlpha = 0;
        }
      }
    }

    // Etap 4 — białe wygaszenie do pełnej bieli → credits
    else if (cutsceneStage === 4) {
      whiteAlpha = Math.min(1, cutsceneTimer / END_WHITE_FADE_TIME);
      if (whiteAlpha >= 1) {
        initCredits();
        screen = "credits";
        inFinalCutscene = false; // kończymy tryb cutscenki
      }
    }

    // === Render gry pod nakładkami ===
    renderGameScene(delta);

    // --- Nakładki: czarny / fade-out / biały ---
    if (blackAlpha > 0) {
      ctx.fillStyle = `rgba(0,0,0,${blackAlpha})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    if (fadeOutAlpha > 0) {
      ctx.fillStyle = `rgba(0,0,0,${fadeOutAlpha})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    if (whiteAlpha > 0) {
      ctx.fillStyle = `rgba(255,255,255,${whiteAlpha})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    requestAnimationFrame(gameLoop);
    return;
  }

  // === EKRAN „CREDITS”    ===
  if (screen === "credits") {
    drawCredits(delta);

    // Po zakończeniu przewijania → „Thanks”
    if (creditsDone && creditsHold >= CREDITS_END_HOLD) {
      screen = "thanks";
    }

    requestAnimationFrame(gameLoop);
    return;
  }

  // === EKRAN „THANKS”     ===
  if (screen === "thanks") {
    drawThanksAndStats(delta);

    if (input.enter) {
      consumeEnter();
      // Restart gry: usuń zapis i przeładuj
      try { localStorage.removeItem("goyJumperSave"); } catch (e) {}
      window.location.reload();
    }

    if (input.escape) {
      consumeEscape();
      // Powrót do Production → Menu
      screen = "production";
      UI.resetProduction && UI.resetProduction();
      UI.resetMenuAnimation && UI.resetMenuAnimation();
    }

    requestAnimationFrame(gameLoop);
    return;
  }

  // --- Delta do overlayu „Circles” ---
  frameDelta = delta;

  // === PAUZA ESC ===
  if (input.escape) {
    consumeEscape();
    gameState = (gameState === GameState.PLAYING) ? GameState.PAUSED : GameState.PLAYING;
    if (gameState === GameState.PAUSED) pauseSelection = 0;
  }

  // === PRZEŁĄCZANIE STANU ===
  if (gameState === GameState.MENU) {
    UI.drawMenu(ctx, canvas, scale, offsetX, offsetY, delta, 0);

    if (input.enter) {
      consumeEnter();
      gameState = GameState.TRANSITION; // NEW
      menuTransitionTime = 0;           // NEW
    }
  }

  else if (gameState === GameState.TRANSITION) {
    menuTransitionTime += delta;

    const t = Math.min(menuTransitionTime / MENU_TRANSITION_DURATION, 1);

    // najpierw rysujemy grę (fade in)
    ctx.globalAlpha = t;
    renderGameScene(delta);

    // potem menu (fade out)
    ctx.globalAlpha = 1 - t;
    UI.drawMenu(ctx, canvas, scale, offsetX, offsetY, 0, t); // NEW: przekaż t jako transitionT

    ctx.globalAlpha = 1;

    if (t >= 1) {
      gameState = GameState.PLAYING;
    }
  }
  else if (gameState === GameState.PAUSED) {
    // --- Nawigacja w menu pauzy ---
    if (input.up) { consumeUp(); pauseSelection = (pauseSelection - 1 + 3) % 3; }
    if (input.down) { consumeDown(); pauseSelection = (pauseSelection + 1) % 3; }

    if (input.enter) {
      consumeEnter();

      if (pauseSelection === 0) gameState = GameState.PLAYING;
      else if (pauseSelection === 1) { player.reset(); player.saveGame(); gameState = GameState.PLAYING; }
      else if (pauseSelection === 2) { player.saveGame(); gameState = GameState.MENU; }
    }

    renderGameScene(delta);
    UI.drawPauseMenu(ctx, player, scale, offsetX, offsetY, pauseSelection);
  }
  else if (gameState === GameState.PLAYING) {
    // === CUTSCENE: trigger „final” ===
    if (!finalCutscenePlayed && !inFinalCutscene) {
      const p = player, t = cutsceneTrigger;
      const touching =
        p.x < t.x + t.width &&
        p.x + p.width > t.x &&
        p.y < t.y + t.height &&
        p.y + p.height > t.y;
      if (touching) startFinalCutscene();
    }

    // === Overlay „Circles” — wykrywanie ekranu i odpalanie napisu ===
    const screenY = Math.abs(Math.floor(player.y / 360));

    const circle = Circles.find(c =>
      screenY >= c.screenFrom &&
      screenY <= c.screenTo
    );

    if (activeCircle && (!circle || circle !== activeCircle)) {
      activeCircle = null;
      circleTimer = 0;
    }

    if (!activeCircle && circle && !circle.shown && !showCircleText) {
      activeCircle = circle;
      circleTimer = 0;
    }

    if (circle === activeCircle && !circle.shown && !showCircleText) {
      circleTimer += delta;

      if (circleTimer >= CIRCLE_DELAY) {
        showCircleText = true;
        circleTextTime = 0;
        displayedCircle = circle;
        circle.shown = true;
      }
    }
    // -------------------------------

    // === Aktualizacja gry ===
    player.update(input, delta, platforms, slopes);
    npcs.forEach(n => { n.update(delta, player); n.draw(ctx); });
    renderGameScene(delta);
  }

  requestAnimationFrame(gameLoop);
}

// === RYSOWANIE SCENY (kamera, BG) ===
function renderGameScene(delta) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(offsetX, offsetY);
  ctx.scale(scale, scale);

  const screenY = Math.floor(player.y / 360);
  ctx.translate(0, -screenY * 360);

  // --- BG (3 sąsiednie ekrany) ---
  const currentIdx = Math.abs(screenY);
  for (let i = currentIdx - 1; i <= currentIdx + 1; i++) {
    if (i >= 0 && i <= TOTAL_SCREENS && backgrounds[i].complete) {
      ctx.drawImage(backgrounds[i], 0, i * -360, 480, 360);
    }
  }

  // === WIATR: animowany overlay tła   ===
  const isGameActive = gameState === GameState.PLAYING || gameState === GameState.PAUSED;

  // Pobieramy aktualną klatkę animacji
  const currentWindImg = windFrames[currentWindFrameIndex];

  // Wyświetlaj efekt tylko przy spełnionych warunkach
  if (isGameActive && player.isInWindyArea() && currentWindImg && currentWindImg.complete) {

    // --- Aktualizacja animacji tylko w PLAYING ---
    if (gameState === GameState.PLAYING) {
      const baseSpeed = 300;
      windX += (player.windStrength * baseSpeed) * delta;

      // Zawijanie X
      if (windX > 480) windX -= 480;
      if (windX < -480) windX += 480;

      // Klatkowanie
      windFrameTimer += delta;
      if (windFrameTimer >= WIND_FRAME_DURATION) {
        windFrameTimer = 0;
        currentWindFrameIndex = (currentWindFrameIndex + 1) % windFrames.length;
      }
    }

    // --- Rysowanie wiatru z przycięciem do ekranu ---
    ctx.save();

    const windY = screenY * 360;

    ctx.beginPath();
    ctx.rect(0, windY, 480, 360);
    ctx.clip();

    ctx.globalAlpha = 0.4;

    ctx.drawImage(currentWindImg, windX, windY, 480, 360);
    ctx.drawImage(currentWindImg, windX - 480, windY, 480, 360);
    ctx.drawImage(currentWindImg, windX + 480, windY, 480, 360);

    ctx.restore();
  }

  // === TEKSTURY BLOKÓW ===
  let pattern = null;
  const currentTex = blockTextures[currentIdx];
  if (currentTex && currentTex.complete) {
    pattern = ctx.createPattern(currentTex, 'repeat');
  }

  // === SHAPES    ===
  if (shapes) {
    shapes.forEach(shape => {
      ctx.fillStyle = pattern || shape.color;
      ctx.beginPath();
      ctx.moveTo(shape.points[0].x, shape.points[0].y);
      for (let i = 1; i < shape.points.length; i++) ctx.lineTo(shape.points[i].x, shape.points[i].y);
      ctx.closePath();
      ctx.fill();
    });
  }

  // === SLOPES / LINES     ===
  slopes.forEach(s => {
    if (pattern) {
      ctx.strokeStyle = pattern;
      ctx.lineWidth = 0;

      if (s.isTriangle) {
        ctx.fillStyle = pattern;
        ctx.beginPath();
        ctx.moveTo(s.x1, s.y1);
        ctx.lineTo(s.x2, s.y2);
        if (s.type === 1) ctx.lineTo(s.y1 < s.y2 ? s.x1 : s.x2, Math.max(s.y1, s.y2));
        else ctx.lineTo(s.y1 > s.y2 ? s.x1 : s.x2, Math.min(s.y1, s.y2));
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(s.x1, s.y1);
        ctx.lineTo(s.x2, s.y2);
        ctx.stroke();
      }
    } else s.draw(ctx);
  });

  // === PLATFORMS  ===
  platforms.forEach(p => {
    const isEven = (player.jumpCount || 0) % 2 === 0;
    const isActive = (p.phase === 0) || (p.phase === 1 && !isEven) || (p.phase === 2 && isEven);

    ctx.globalAlpha = isActive ? 1.0 : 0.3;

    if (pattern) {
      // 1. Tekstura bloku
      ctx.fillStyle = pattern;
      ctx.fillRect(p.x - 0.5, p.y - 0.5, p.width + 1, p.height + 1);

      // 2. Oznaczenia lodu i pyłu
      if (p.isIce) {
        ctx.fillStyle = "#7AF0FF"; // Twój kolor lodu
        ctx.fillRect(p.x - 0.5, p.y - 0.5, p.width + 1, 3);
      } else if (!p.canMove) {
        ctx.fillStyle = "#FFECB3"; // Kolor pyłu
        ctx.fillRect(p.x - 0.5, p.y - 0.5, p.width + 1, 3);
      }

      // 3. Ramki faz
      if (p.phase !== 0) {
        ctx.save();
        ctx.lineWidth = 2;

        if (p.phase === 1) {
          ctx.strokeStyle = "#D8BFD8"; // Phase 1
        } else if (p.phase === 2) {
          ctx.strokeStyle = "#FFFF00"; // Phase 2
        }

        ctx.strokeRect(p.x + 0.5, p.y + 0.5, p.width - 1, p.height - 1);

        ctx.globalAlpha = isActive ? 0.2 : 0.05;
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fillRect(p.x, p.y, p.width, p.height);

        ctx.restore();
      }
    } else {
      p.draw(ctx, player.jumpCount);
    }

    ctx.globalAlpha = 1.0;
  });

  // === NPC + PLAYER  ===
  ctx.translate(0, -1);
  npcs.forEach(n => n.draw(ctx));

  
  if (inFinalCutscene && cutsceneNPC) {
    cutsceneNPC.draw(ctx);
  }

  // --- Player (z ewentualnym „zamrożonym” inputem w cutscenie) ---
  const inputForDraw = inFinalCutscene ? cutsceneDrawInput : input;
  player.draw(ctx, SpriteManager, inputForDraw);

  ctx.restore();

  // === HUD / OVERLAY ===
  UI.drawHUD(ctx, player, scale, offsetX, offsetY);

  // --- Overlay „Circles” (tytuł + cytat) ---
  if (showCircleText && displayedCircle) {
    circleTextTime += frameDelta;

    let alpha = 1;
    if (circleTextTime < TEXT_FADE_IN) {
      alpha = circleTextTime / TEXT_FADE_IN;
    } else if (circleTextTime > TEXT_FADE_IN + TEXT_VISIBLE) {
      alpha = 1 - (circleTextTime - TEXT_FADE_IN - TEXT_VISIBLE) / TEXT_FADE_OUT;
    }

    if (circleTextTime >= TEXT_TOTAL) {
      showCircleText = false;
      return;
    }

    ctx.save();
    ctx.globalAlpha = Math.max(0, alpha);
    ctx.fillStyle = "#d6c6b8";
    ctx.font = "136px Blashphemous";
    ctx.textAlign = "center";
    ctx.shadowColor = "#000";
    ctx.shadowBlur = 8;

    ctx.fillText(displayedCircle.title, canvas.width / 2, offsetY + 180);

    const quoteText = isQuoteHovered ? displayedCircle.quotePL : displayedCircle.quoteLA;
    ctx.font = "42px Blashphemous";
    ctx.fillText(quoteText, canvas.width / 2, offsetY + 240);

    ctx.restore();
  }

  // --- Debug overlay (pozycja myszy) ---
  if (DEBUG) {
    ctx.save();
    ctx.fillStyle = "lime";
    ctx.font = "12px monospace";
    ctx.fillText(`X: ${mouseX}  Y: ${mouseY}`, 10, 340);
    ctx.restore();
  }
}

// === „Mouse move” (debug, hover) ===
canvas.addEventListener("mousemove", (e) => {
  // --- Hover dla cytatów „Circles” ---
  if (showCircleText && displayedCircle) {
    //textbox (większy od cytatu)
    const textY = offsetY + 300;
    const textWidth = 1200;
    const textHeight = 160;

    const mx = e.clientX;
    const my = e.clientY;

    const cx = canvas.width / 2;
    const left = cx - textWidth / 2;
    const right = cx + textWidth / 2;
    const top = textY - textHeight;
    const bottom = textY;

    isQuoteHovered = mx >= left && mx <= right && my >= top && my <= bottom;
  }

  // --- Debug współrzędnych w świecie ---
  if (!DEBUG) return;

  const rect = canvas.getBoundingClientRect();
  const screenX = (e.clientX - rect.left - offsetX) / scale;
  const screenY = (e.clientY - rect.top - offsetY) / scale;

  const screenIndex = Math.floor(player.y / 360);
  mouseX = Math.floor(screenX);
  mouseY = Math.floor(screenY + screenIndex * 360);
});

// === credits/thanks ===
function initCredits() {
  creditsLines = CREDITS.slice(); // kopia
  creditsDone = false;
  creditsHold = 0;

  // start przewijania nieco poniżej ekranu
  creditsY = canvas.height + 40;
}

function drawCredits(delta) {
  // tło – delikatna czerń (bez alpha) aby nie migały poprzednie klatki
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // prędkość – Enter = szybciej
  const speed = (input.enter ? CREDITS_SCROLL_FAST : CREDITS_SCROLL_SPEED);
  creditsY -= speed * delta;

  ctx.save();
  ctx.fillStyle = "#d6c6b8";

  let y = creditsY;
  for (const item of creditsLines) {
    if (typeof item === "string") {
      ctx.font = CREDITS_FONT_TEXT;
      ctx.textAlign = "center";
      ctx.fillText(item, Math.floor(canvas.width / 2), Math.floor(y));
      y += 64; // odstęp między liniami tekstu
    } else if (item && item.type === "title") {
      ctx.font = CREDITS_FONT_TITLE;
      ctx.textAlign = "center";
      ctx.fillText(item.text, Math.floor(canvas.width / 2), Math.floor(y));
      y += 92; // większy odstęp po sekcji
    } else {
      // pusta linia / separator
      y += 52;
    }
  }
  ctx.restore();

  // koniec credits gdy ostatnia linia wyjedzie nad górną krawędź
  const totalHeight = y - creditsY;
  if (!creditsDone && (creditsY + totalHeight) < 0) {
    creditsDone = true;
    creditsHold = 0;
  }

  if (creditsDone) {
    creditsHold += delta;
  }
}


function drawThanksAndStats(delta) {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Tytuł
  ctx.save();
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";

  // >>> DOPISEK: obliczamy Y tytułu i rysujemy koronę nad nim <<<
  const titleY = Math.floor(canvas.height * 0.30);
  if (crownImage && crownImage.complete) {
    const targetW = 300;                                        // docelowa szerokość (px)
    const ratio = crownImage.height / crownImage.width || 1;    // proporcje obrazka
    const targetH = Math.round(targetW * ratio);                // wysokość wg proporcji

    const x = Math.floor((canvas.width - targetW) / 2);         // centrowanie poziome
    const y = Math.floor(titleY - targetH - 56);                // 24 px odstępu nad napisem

    ctx.drawImage(crownImage, x, y, targetW, targetH);
  }
  // <<< KONIEC DOPISKU >>>

  ctx.font = THANKS_TITLE_FONT;
  ctx.fillText("DZIĘKUJEMY ZA GRĘ", Math.floor(canvas.width/2), titleY);

  // Statystyki (z Player)
  ctx.font = THANKS_TEXT_FONT;
  const lines = [
    `Czas: ${player.formatTime(player.playTime)}`,
    `Skoki: ${player.jumpCount}`,
    `Upadki: ${player.fallCount}`
  ];

  let y = Math.floor(canvas.height*0.45);
  for (const s of lines) {
    ctx.fillText(s, Math.floor(canvas.width/2), y);
    y += 84;
  }

  // Instrukcje
  ctx.fillStyle = "#d6c6b8";
  ctx.font = "36px Blashphemous";
  ctx.fillText("[Enter] Powrót do Main Menu", Math.floor(canvas.width/2), y + 50);

  ctx.restore();
}


// === START APLIKACJI ===
async function init() {
  console.log("Ładowanie zasobów...");
  await SpriteManager.load();
  console.log("Zasoby załadowane, start gry.");

  lastTime = performance.now();
  requestAnimationFrame(gameLoop);
}

init();