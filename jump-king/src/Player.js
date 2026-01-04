export class Player {
    constructor(x, y) {
        this.startX = x;
        this.startY = y;
        this.x = x;
        this.y = y;

        this.width = 14; 
        this.height = 22; 
        
        this.velX = 0;
        this.velY = 0;

        // --- STATYSTYKI I CZAS ---
        this.jumpCount = 0;
        this.fallCount = 0;
        this.playTime = 0; // Czas w sekundach

        // --- WARTOŚCI FIZYKI ---
        this.acceleration = 1200; 
        this.maxSpeed = 150;
        this.friction = 2500;
        this.gravity = 2100;
        this.terminalVelocity = 1000; // Maksymalna prędkość spadania
        
        this.jumpCharge = 0;
        this.maxJumpCharge = 860; 
        this.minJumpCharge = 100; 
        this.chargeSpeed = 1200;
        
        this.jumpCharging = false;
        this.onGround = false;
        this.jumpDirection = 0;

        this.onSlope = false;
        this.slideSpeed = 0;
        this.maxSlideSpeed = 500;
        this.slideAccel = 1300;
        this.slopeDir = 0;
    }

    // Metoda pomocnicza do formatowania czasu
    formatTime(seconds) {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        const ms = Math.floor((seconds % 1) * 1000);

        const hDisplay = hrs.toString().padStart(2, '0');
        const mDisplay = mins.toString().padStart(2, '0');
        const sDisplay = secs.toString().padStart(2, '0');
        const msDisplay = ms.toString().padStart(3, '0');

        return `${hDisplay}:${mDisplay}:${sDisplay}.${msDisplay}`;
    }

    update(input, delta, platforms, slopes) {
        // 0. AKTUALIZACJA CZASU I FILTROWANIE WIDOCZNYCH OBIEKTÓW
        this.playTime += delta;

        // Wyliczamy, na którym ekranie (0, 1, 2...) jest gracz
        // Zakładając, że jeden ekran ma 360px wysokości
        const currentScreenY = Math.floor(this.y / 360) * 360;

        // Filtrujemy platformy
        const activePlatforms = platforms.filter(p => 
            p.y >= currentScreenY - 360 && p.y <= currentScreenY + 720
        );
        const activeSlopes = slopes.filter(s => 
            Math.min(s.y1, s.y2) >= currentScreenY - 360 && Math.max(s.y1, s.y2) <= currentScreenY + 720
        );

        let wasOnSlope = this.onSlope;
        this.onSlope = false;

        // 1. ŁADOWANIE SKOKU
        if (input.jump && this.onGround && !this.onSlope) {
            if (!this.jumpCharging) {
                this.jumpCharging = true;
                this.velX = 0;
                this.jumpDirection = 0;
                this.jumpCharge = this.minJumpCharge;
            }

            this.jumpCharge += this.chargeSpeed * delta;
            
            if (input.left) this.jumpDirection = -1;
            else if (input.right) this.jumpDirection = 1;
            else this.jumpDirection = 0;

            if (this.jumpCharge > this.maxJumpCharge) {
                this.jumpCharge = this.maxJumpCharge;
                this.performJump();
            }
        } else if (!input.jump && this.jumpCharging) {
            this.performJump();
        }

        // 2. PORUSZANIE SIĘ NA ZIEMI
        if (this.onGround && !this.jumpCharging && !this.onSlope) {
            if (input.left) this.velX -= this.acceleration * delta;
            if (input.right) this.velX += this.acceleration * delta;

            if (!input.left && !input.right) {
                if (this.velX > 0)
                    this.velX = Math.max(0, this.velX - this.friction * delta);
                else if (this.velX < 0)
                    this.velX = Math.min(0, this.velX + this.friction * delta);
            }
            this.velX = Math.max(-this.maxSpeed, Math.min(this.velX, this.maxSpeed));
        }

        // 3. OBSŁUGA ZBOCZY (tylko aktywne)
        for (let slope of activeSlopes) {
            if (this.checkSlopeCollision(slope)) {
                this.onSlope = true;
                this.slopeDir = slope.dir;
                break;
            }
        }

        if (this.onSlope) {
            this.jumpCharging = false;
            this.onGround = false;
            this.slideSpeed += this.slideAccel * delta;
            this.slideSpeed = Math.min(this.slideSpeed, this.maxSlideSpeed);
            
            const diag = this.slideSpeed * 0.707;
            this.velX = this.slopeDir * diag;
            this.velY = diag;
        }

        if (wasOnSlope && !this.onSlope) {
            this.slideSpeed = 0;
            this.onGround = false;
        }

        // 4. RUCH PIONOWY I KOLIZJE Y
        let wasInAir = !this.onGround;
        
        if (!this.onSlope) {
            this.velY += this.gravity * delta;
        }
        
        if (this.velY > this.terminalVelocity) this.velY = this.terminalVelocity;

        this.y += this.velY * delta;
        let preCollisionVelY = this.velY;

        this.onGround = false;
        for (let plat of activePlatforms) {
            if (this.checkCollision(this, plat)) {
                if (this.velY > 0) { // Spadanie
                    if (this.y + this.height - this.velY * delta <= plat.y + 10) {
                        this.y = plat.y - this.height;
                        
                        if (preCollisionVelY >= 1000) {
                            this.fallCount++;
                        }

                        this.velY = 0;
                        this.onGround = true;
                        if (wasInAir) this.velX = 0; 
                    }
                } else if (this.velY < 0) { // Sufit
                    this.y = plat.y + plat.height;
                    this.velY = 0;
                }
            }
        }

        // 5. RUCH POZIOMY I KOLIZJE X
        this.x += this.velX * delta;

        if (this.x < 0) { this.x = 0; this.velX = 0; }
        if (this.x + this.width > 480) { this.x = 480 - this.width; this.velX = 0; }

        for (let plat of activePlatforms) {
            if (this.checkCollision(this, plat)) {
                let isStandingOnThis = (Math.abs((this.y + this.height) - plat.y) < 1.1);
                if (!isStandingOnThis) {
                    if (this.velX > 0) this.x = plat.x - this.width;
                    else if (this.velX < 0) this.x = plat.x + plat.width;
                    
                    if (!this.onGround) this.velX *= -0.7; 
                    else this.velX = 0;
                }
            }
        }
    }

    performJump() {
        this.jumpCount++;
        const chargePct = this.jumpCharge / this.maxJumpCharge;
        this.velY = -this.jumpCharge;
        if (this.jumpDirection !== 0) {
            this.velX = this.jumpDirection * (155 + (chargePct * 125)); 
        } else {
            this.velX = 0;
        }
        this.jumpCharge = 0;
        this.jumpCharging = false;
        this.onGround = false;
        this.jumpDirection = 0;
    }

    checkCollision(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }

    checkSlopeCollision(slope) {
        const leftX = this.x;
        const rightX = this.x + this.width;
        const feetY = this.y + this.height;
        let hit = false;
        let highestY = Infinity;
        for (let px of [leftX, rightX]) {
            if (px < Math.min(slope.x1, slope.x2) || px > Math.max(slope.x1, slope.x2)) continue;
            const t = (px - slope.x1) / (slope.x2 - slope.x1);
            const lineY = slope.y1 + t * (slope.y2 - slope.y1);
            if (feetY >= lineY - 2 && feetY <= lineY + 6) {
                hit = true;
                highestY = Math.min(highestY, lineY);
            }
        }
        if (hit) {
            this.y = highestY - this.height - 0.5;
            this.onGround = true;
        }
        return hit;
    }

    reset() {
        this.x = 240; 
        this.y = 303;
        this.velX = 0;
        this.velY = 0;
        this.jumpCharge = 0;
        this.jumpCharging = false;
        
        this.playTime = 0;
        this.jumpCount = 0;
        this.fallCount = 0;
        
        this.onGround = true; 
    }

    saveGame() {
        const saveDate = {
            x: this.x,
            y: this.y,
            playTime: this.playTime,
            jumpCount: this.jumpCount,
            fallCount: this.fallCount
        };
        localStorage.setItem("goyJumperSave", JSON.stringify(saveDate));
    }

    loadGame() {
        try {
            const saved = localStorage.getItem("goyJumperSave");
            if (saved) {
                const data = JSON.parse(saved);
                
                this.x = data.x;
                this.y = data.y;
                
                this.playTime = data.playTime || 0;
                this.jumpCount = data.jumpCount || 0;
                this.fallCount = data.fallCount || 0;

                return true;
            }
        } catch (e) {
            console.error("Błąd wczytywania zapisu:", e);
        }
        return false;
    }

    draw(ctx) {
        // Postać i pasek ładowania
        ctx.fillStyle = this.jumpCharging ? "#ff7777" : "red";
        ctx.fillRect(Math.round(this.x), Math.round(this.y), this.width, this.height);
        
        if (this.jumpCharging) {
            ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
            ctx.fillRect(this.x, this.y - 12, this.width, 4);
            ctx.fillStyle = "yellow";
            ctx.fillRect(this.x, this.y - 12, (this.jumpCharge / this.maxJumpCharge) * this.width, 4);
        }
    }
}