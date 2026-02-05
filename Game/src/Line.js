// === POCHYLNIE / KRAWĘDZIE (linie i trójkąty) ===
export class Line {
  constructor(x1, y1, x2, y2, type = 1, isTriangle = false, isIce = false, phase = 0) { 
    // --- Geometria linii ---
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;

    // type: 0 = Bounce (sufit), 1 = Slide (podłoga/skos)
    this.type = type;       
    // isTriangle: czy rysować wypełnienie (trójkąt)
    this.isTriangle = isTriangle; 
    this.dir = x2 > x1 ? 1 : -1;

    // --- Właściwości dodatkowe (powierzchnia/stan) ---
    this.isIce = isIce;
    // phase: 0 - zawsze aktywna, 1 - nieparzyste, 2 - parzyste
    this.phase = phase; 
  }

  draw(ctx) {
    // 1) Rysowanie krawędzi
    ctx.strokeStyle = this.type === 0 ? "orange" : "red";  //trzeba bedze zmienic kolor
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.stroke();

    // 2) (Opcjonalnie) wypełnienie trójkąta
if (this.isTriangle) {
    //ctx.fillStyle = this.type === 0 ? "orange" : "red"; // niepotrzebne, trojkaty beda teksturowane
    ctx.beginPath();

    // Przeciwprostokątna
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);

    // Normalizacja punktów: top/bottom
    const top =
        this.y1 < this.y2
            ? { x: this.x1, y: this.y1 }
            : { x: this.x2, y: this.y2 };

    const bottom =
        this.y1 > this.y2
            ? { x: this.x1, y: this.y1 }
            : { x: this.x2, y: this.y2 };

    if (this.type === 1) {
        // 🔺 SLIDE — podstawa NA DOLE
        ctx.lineTo(top.x, bottom.y);
    } else {
        // 🔻 BOUNCE — podstawa NA GÓRZE
        ctx.lineTo(bottom.x, top.y);
    }

    ctx.closePath();
    ctx.fill();
}
  }
}