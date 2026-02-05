
// === ZASOBY EKRANU / LOGO / SPONS ===
const menuImage = new Image();
menuImage.src = "./soy.jpg";
let menuTime = 0;
let menuAnimFinished = false;

//Nowe
//-----------------------------------------
// Losowany wariant logo na ProductionScreen
const logoVariants = [
    "./textures/final_logo.png",
    "./textures/final_logo_G.png",
    "./textures/final_logo_B.png",
    "./textures/final_logo_B2.png"
];

const logoImage = new Image();
logoImage.src = logoVariants[
    Math.floor(Math.random() * logoVariants.length)
];

const sponsorImage = new Image();
sponsorImage.src = "./textures/Giebel.png";


// --- Timery i stan produkcyjnego ekranu ---
let productionTime = 0;
let productionState = "fadeIn"; // fadeIn -> hold -> fadeOut
//-----------------------------------------

// === INTERFEJS UŻYTKOWNIKA ===
export const UI = {
    // === EKRAN GŁÓWNEGO MENU ==
    drawMenu(ctx, canvas, scale, offsetX, offsetY, delta, transitionT = 0) {
        menuTime += delta;

        // Tło pełnoekranowe
        ctx.fillStyle = "#111";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        ctx.translate(offsetX, offsetY);
        ctx.scale(scale, scale);

        // Obszar gry (czarne tło)
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, 480, 360);


        // --- ANIMACJA TYTUŁU ---
        const animDuration = 2.0; // czas spadania (sekundy)
        const t = Math.min(menuTime / animDuration, 1);

        // easing (miękki spadek)
        const easeOut = 1 - Math.pow(1 - t, 3);

        const startY = -40;
        const endY = 90;
        const baseY = startY + (endY - startY) * easeOut;

        // --- LEKKIE DRGANIE NAPISU ---
        const shakeX = Math.sin(menuTime * 3) * 1.2;
        const shakeY = Math.sin(menuTime * 5) * 0.8;

        // Tytuł gry
        ctx.fillStyle = "#690e0e";
        ctx.font = "48px Blashphemous";
        ctx.textAlign = "center";
        ctx.fillText(
            "VIA DOLOROSA",
            240 + shakeX,
            baseY + shakeY
        );

        /*
        // --- CYTAT POD TYTUŁEM --- ten no narazie
        // Cytat dziedziczy ten sam fade co tytuł i ekran (transitionT),
        // dzięki czemu znika idealnie synchronicznie.
        const quoteShakeX = Math.sin(menuTime * 2.2) * 0.6;
        const quoteShakeY = Math.sin(menuTime * 3.1) * 0.4;
    
        ctx.fillStyle = "#bfbfbf";
        ctx.font = "16px Blashphemous";
        ctx.fillText(
            "'I seek no salvation. Only the strength to go on.'",
            240 + quoteShakeX,
            baseY + 28 + quoteShakeY
        );
        */

        if (t >= 1) {
            menuAnimFinished = true;
        }

        // --- MIGAJĄCY TEKST PO ANIMACJI ---
        // Podczas przejścia (transitionT > 0) miganie jest wyłączone
        if (menuAnimFinished && transitionT === 0) {
            const blinkSpeed = 1;
            const visible = Math.floor(menuTime / blinkSpeed) % 2 === 0;

            if (visible) {
                ctx.fillStyle = "white";
                ctx.font = "18px Blashphemous";
                ctx.fillText("PRESS ENTER", 240, 260);
            }
        }

        ctx.restore();
    },

    // --- PRODUCTION SCREEN ---
    drawProduction(ctx, canvas, scale, offsetX, offsetY, delta) {
        productionTime += delta;

        const FADE_TIME = 1.2;
        const HOLD_TIME = 2.0;
        let alpha = 1;

        if (productionState === "fadeIn") {
            alpha = Math.min(productionTime / FADE_TIME, 1);
            if (alpha >= 1) {
                productionState = "hold";
                productionTime = 0;
            }
        }
        else if (productionState === "hold") {
            alpha = 1;
            if (productionTime >= HOLD_TIME) {
                productionState = "fadeOut";
                productionTime = 0;
            }
        }
        else if (productionState === "fadeOut") {
            alpha = 1 - Math.min(productionTime / FADE_TIME, 1);
            if (alpha <= 0) return true;
        }

        // Tło pełnoekranowe
        ctx.fillStyle = "#111";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        ctx.translate(offsetX, offsetY);
        ctx.scale(scale, scale);

        // Białe „płótno” produkcyjne
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, 480, 360);

        // Sterowanie przeźroczystością elementów wewnątrz ekranu
        ctx.globalAlpha = alpha;

        // Logo
        if (logoImage.complete) {
            ctx.drawImage(logoImage, 130, 120, 220, 120);
        }

        // „Sponsorowane przez…”
        ctx.fillStyle = "#000";
        ctx.font = "14px PixelGosub";
        ctx.textAlign = "left";
        ctx.fillText("Sponsorowane przez:", 12, 310);

        if (sponsorImage.complete) {
            ctx.drawImage(sponsorImage, 35, 315, 90, 40);
        }

        ctx.restore();
        ctx.globalAlpha = 1;

        return false;
    },


    // === MENU PAUZY / STATS ===
    drawPauseMenu(ctx, player, scale, offsetX, offsetY, selectedIndex) {
        ctx.save();
        ctx.translate(offsetX, offsetY);
        ctx.scale(scale, scale);

        // Przyciemnienie tła
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, 480, 360);

        // Boxy
        this.drawBox(ctx, 25, 40, 230, 120);
        this.drawBox(ctx, 270, 40, 185, 120);

        // Tytuł i statystyki
        ctx.fillStyle = "white";
        ctx.font = "20px Blashphemous";
        ctx.textAlign = "left";
        ctx.fillText("NEW GAME", 45, 65);

        ctx.font = "20px Blashphemous";
        ctx.fillText(`TIME : ${player.formatTime(player.playTime)}`, 45, 90);
        ctx.fillText(`JUMPS : ${player.jumpCount}`, 45, 115);
        ctx.fillText(`FALLS : ${player.fallCount}`, 45, 140);

        // Opcje Menu
        const options = ["RESUME", "RESTART", "EXIT"];
        options.forEach((opt, i) => {
            const isSelected = (i === selectedIndex);

            ctx.fillStyle = isSelected ? "white" : "#888";
            const prefix = isSelected ? "=> " : "   ";

            ctx.fillText(prefix + opt, 285, 70 + (i * 26));
        });

        ctx.restore();
    },

    // === HUD: czas w lewym górnym
    drawHUD(ctx, player, scale, offsetX, offsetY) {
        // --- TIMER NA CZARNYM PASKU ---a.

        ctx.save();

        ctx.fillStyle = "white";
        ctx.font = `${15 * scale}px Blashphemous`; // Skalujemy czcionkę do wielkości okna
        ctx.textAlign = "left";
        ctx.textBaseline = "top";

        // 10px od lewej krawędzi ekranu
        // offsetY + 10px (żeby był na wysokości góry gry)
        const xPos = 10;
        const yPos = offsetY + (10 * scale);

        ctx.fillText(player.formatTime(player.playTime), xPos, yPos);

        ctx.restore();

        // --- OPCJONALNIE: RESZTA HUD ---
        // Jeśli masz coś co ma być "przyklejone" do gracza, to robisz to tutaj:
        /*
        ctx.save();
        ctx.translate(offsetX, offsetY);
        ctx.scale(scale, scale);
        // ... rysowanie rzeczy wewnątrz obszaru gry ...
        ctx.restore();
        */
    },

    // === Rysowanie boxów ===
    drawBox(ctx, x, y, w, h) {
        ctx.fillStyle = "black";
        ctx.fillRect(x, y, w, h);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, w, h);
        ctx.strokeStyle = "#333";
        ctx.strokeRect(x + 3, y + 3, w - 6, h - 6);
    },

    // === RESETY ANIMACJI (menu/production)
    // pomocniczo do restartu animacji tytułu po powrocie do men
    resetMenuAnimation() {
        menuTime = 0;
        menuAnimFinished = false;
    },

    resetProduction() {
        productionTime = 0;
        productionState = "fadeIn";
    }

};