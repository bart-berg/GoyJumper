// === INPUT ===
export const input = {
    left: false,
    right: false,
    jump: false,
    up: false,
    down: false,
    enter: false,
    escape: false,
    debug: false
};

// === „Konsumowanie” jednorazowych naciśnięć klawiszy
// === (żeby akcja nie powtarzała się co klatkę)   ===
export function consumeEnter() { input.enter = false; }
export function consumeEscape() { input.escape = false; }
export function consumeUp() { input.up = false; }
export function consumeDown() { input.down = false; }

// === OBSŁUGA KLAWIATURY ===
// --- KEYDOWN: ustaw flagę na true ---
window.addEventListener("keydown", (e) => {
    if (e.code === "KeyA" || e.code === "ArrowLeft")  input.left = true;
    if (e.code === "KeyD" || e.code === "ArrowRight") input.right = true;
    if (e.code === "KeyW" || e.code === "ArrowUp")    input.up = true;
    if (e.code === "KeyS" || e.code === "ArrowDown")  input.down = true;
    if (e.code === "Space")                           input.jump = true;
    if (e.code === "Enter")                           input.enter = true;
    if (e.code === "Escape")                          input.escape = true;
    // --- Debug toggle ---
    if (e.code === "KeyP")                            input.debug = true;
});

// --- KEYUP: ustaw flagę na false ---
window.addEventListener("keyup", (e) => {
    if (e.code === "KeyA" || e.code === "ArrowLeft")  input.left = false;
    if (e.code === "KeyD" || e.code === "ArrowRight") input.right = false;
    if (e.code === "KeyW" || e.code === "ArrowUp")    input.up = false;
    if (e.code === "KeyS" || e.code === "ArrowDown")  input.down = false;
    if (e.code === "Space")                           input.jump = false;
    if (e.code === "Enter")                           input.enter = false;
    if (e.code === "Escape")                          input.escape = false;
    // --- Debug toggle ---
    if (e.code === "KeyP")                            input.debug = false;
});