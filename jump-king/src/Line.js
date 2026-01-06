export class Line {
  constructor(x1, y1, x2, y2, type = 1, isTriangle = false) { 
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.type = type;       // 0: Bounce (sufit), 1: Slide (podłoga)
    this.isTriangle = isTriangle; // Czy rysować wypełnienie
    this.dir = x2 > x1 ? 1 : -1;
  }

  draw(ctx) {
    // 1. Rysujemy samą krawędź (linię)
    ctx.strokeStyle = this.type === 0 ? "orange" : "red"; 
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.stroke();

    // 2. Jeśli isTriangle jest true, rysujemy wypełnienie
    if (this.isTriangle) {
        ctx.fillStyle = this.type === 0 ? "orange" : "red";
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);

        if (this.type === 1) {
            // Wypełnienie w dół (dla podłogi)
            // Znajdujemy niższy punkt Y, żeby wiedzieć jak głęboko rysować "podstawę"
            const maxY = Math.max(this.y1, this.y2) + 20; 
            ctx.lineTo(this.x2, maxY);
            ctx.lineTo(this.x1, maxY);
        } else {
            // Wypełnienie w górę (dla sufitu/odbicia)
            const minY = Math.min(this.y1, this.y2) - 20;
            ctx.lineTo(this.x2, minY);
            ctx.lineTo(this.x1, minY);
        }

        ctx.closePath();
        ctx.fill();
    }
  }
}