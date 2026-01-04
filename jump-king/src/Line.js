export class Line {
  constructor(x1, y1, x2, y2, type = 1) { 
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.type = type; // 0: Bounce (od dołu), 1: Slide (na stopy)
    this.dir = x2 > x1 ? 1 : -1;
  }

  draw(ctx) {
    ctx.strokeStyle = this.type === 0 ? "orange" : "red"; 
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.stroke();
  }
}