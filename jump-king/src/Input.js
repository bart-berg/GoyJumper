export const input = {
    left: false,
    right: false,
    jump: false
}

window.addEventListener("keydown", (e) => {
    if(e.code === "KeyA" || e.code === "ArrowLeft") input.left = true;
    if(e.code === "KeyD" || e.code === "ArrowRight") input.right = true;
    if(e.code === "Space") input.jump = true;
});

window.addEventListener("keyup", (e) => {
    if(e.code === "KeyA" || e.code === "ArrowLeft") input.left = false;
    if(e.code === "KeyD" || e.code === "ArrowRight") input.right = false;
    if(e.code === "Space") input.jump = false;
});

export let startPressed = false;

export function consumeStart() {
  startPressed = false;
}

window.addEventListener("keydown", e => {
  if (e.code === "Enter") startPressed = true;
});

window.addEventListener("keyup", e => {
  if (e.code === "Enter") startPressed = false;
});
