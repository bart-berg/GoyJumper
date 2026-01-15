export class Platform {
    constructor(x, y, width, height, canMove = true, isIce = false, phase = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.canMove = canMove; // Flaga określająca czy można się ruszać

        this.isIce = isIce; // Domyślnie platforma nie jest lodowa
        this.phase = phase; // 0 - zawsze aktywna, 1 - nieparzyste, 2 - parzyste
    }

    draw(ctx, jumpCount) {

        
        // Zmiana koloru dla wizualnego rozróżnienia śniegu (opcjonalnie)
        ctx.fillStyle = this.canMove ? "grey" : "#e2e2e2";

        //rozróżnienie lodu
        ctx.fillStyle = this.isIce ? "#a0d8ef" : ctx.fillStyle;

        // Rysowanie bloków phase
        if (this.phase === 1) 
        {
            ctx.fillStyle = "#ce1db0"; // Różowy (Uneven)
        } 
        else if (this.phase === 2) 
        {
            ctx.fillStyle = "#f30c0c"; // Fioletowy (Even)
        }

        const isEven = (jumpCount || 0) % 2 === 0;
        const isActive = (this.phase === 0) || (this.phase === 1 && !isEven) || (this.phase === 2 && isEven);
        ctx.globalAlpha = isActive ? 1.0 : 0.2; // Nieaktywne są półprzezroczyste
        

        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.globalAlpha = 1.0; // Resetowanie przezroczystości
    }
}