export class Line {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;

    // Kierunek zjazdu
    this.dir = x2 > x1 ? 1 : -1;
  }

  draw(ctx) {
    // 1. Rysujemy wypełnienie (trójkąt)
    ctx.fillStyle = "red"; // Półprzezroczysty czerwony
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    
    // Tworzymy pionową ściankę i podstawę
    // Rysujemy linię prosto w dół od drugiego punktu do poziomu pierwszego
    ctx.lineTo(this.x2, Math.max(this.y1, this.y2)); 
    ctx.lineTo(this.x1, Math.max(this.y1, this.y2));
    
    ctx.closePath();
    ctx.fill();

    // 2. Rysujemy samą krawędź skosu (żeby była wyraźna)
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.stroke();
  }
}