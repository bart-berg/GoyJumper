export class Platform {
    constructor(x, y, width, height, canMove = true) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.canMove = canMove; // Flaga określająca czy można się ruszać
    }

    draw(ctx) {
        // Zmiana koloru dla wizualnego rozróżnienia śniegu (opcjonalnie)
        ctx.fillStyle = this.canMove ? "grey" : "#e2e2e2"; 
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}