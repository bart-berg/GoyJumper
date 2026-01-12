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
        this.playTime = 0; 

        // --- WARTOŚCI FIZYKI (DOKŁADNIE TWOJE) ---
        this.acceleration = 1200; 
        this.maxSpeed = 150;
        this.friction = 2500;
        this.gravity = 2100;
        this.terminalVelocity = 750; 
        
        this.jumpCharge = 0;
        this.maxJumpCharge = 860; 
        this.minJumpCharge = 100; 
        this.chargeSpeed = 1200;
        
        this.jumpCharging = false;
        this.onGround = false;
        this.jumpDirection = 0;

        // --- SKOSY ---
        this.onSlope = false;
        this.slideSpeed = 0;
        this.currentSlope = null; 

        // --- FLAGI ---
        this.canMoveOnPlatform = true;
    }

    formatTime(seconds) {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        const ms = Math.floor((seconds % 1) * 1000);
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
    }

    update(input, delta, platforms, slopes) {
        this.playTime += delta;

        // Filtrowanie (bezpieczne dla wydajności)
        const currentScreenY = Math.floor(this.y / 360) * 360;
        const activePlatforms = platforms.filter(p => 
            p.y >= currentScreenY - 360 && p.y <= currentScreenY + 720
        );
        const activeSlopes = slopes.filter(s => 
            Math.max(s.y1, s.y2) >= currentScreenY - 360 && Math.min(s.y1, s.y2) <= currentScreenY + 720
        );

        let wasOnSlope = this.onSlope;
        this.onSlope = false;
        this.currentSlope = null;

        // --- 1. WYKRYWANIE SKOSU (TWOJA LOGIKA) ---
        for (let i = 0; i < activeSlopes.length; i++) {
            const slope = activeSlopes[i];
            if (slope.type === 1 && this.checkSlopeCollision(slope)) {
                if (wasOnSlope || !this.onGround || this.velY > 0) {
                    this.onSlope = true;
                    this.currentSlope = slope;
                    if (!wasOnSlope) {
                        this.slideSpeed = Math.max(150, Math.sqrt(this.velX * this.velX + this.velY * this.velY) * 0.8);
                    }
                    break;
                }
            } else if (slope.type === 0) {
                const collisionY = this.getSlopeYAtPlayerTop(slope);
                if (collisionY !== null && this.y <= collisionY && this.y >= collisionY - 15 && this.velY < 0) {
                    this.velY = Math.abs(this.velY) * 0.5; 
                    this.velX = 0; 
                    this.y = collisionY + 1; 
                    break;
                }
            }
        }

        // --- 2. FIZYKA SKOSU LUB RUCHU ---
        if (this.onSlope && this.currentSlope) {
            this.jumpCharging = false;
            this.onGround = false;
            let dx = this.currentSlope.x2 - this.currentSlope.x1;
            let dy = this.currentSlope.y2 - this.currentSlope.y1;
            if (dy < 0) { dx = -dx; dy = -dy; }
            const angle = Math.atan2(dy, dx); 
            this.slideSpeed = Math.min(this.terminalVelocity, this.slideSpeed + (this.gravity * Math.abs(Math.sin(angle))) * delta);
            this.velX = Math.cos(angle) * this.slideSpeed; 
            this.velY = Math.sin(angle) * this.slideSpeed;
        } else {
            this.slideSpeed = 0;
            // Grawitacja
            this.velY = Math.min(this.terminalVelocity, this.velY + this.gravity * delta);

            // Sterowanie i ładowanie skoku (TWOJA LOGIKA)
            if (input.jump && this.onGround) {
                if (!this.jumpCharging) {
                    this.jumpCharging = true;
                    this.velX = 0;
                    this.jumpCharge = this.minJumpCharge;
                }
                this.jumpCharge = Math.min(this.maxJumpCharge, this.jumpCharge + this.chargeSpeed * delta);
                this.jumpDirection = input.left ? -1 : (input.right ? 1 : 0);
                if (this.jumpCharge >= this.maxJumpCharge) this.performJump();
            } else if (!input.jump && this.jumpCharging) {
                this.performJump();
            }

            if (this.onGround && !this.jumpCharging && this.canMoveOnPlatform) {
                if (input.left) this.velX -= this.acceleration * delta;
                if (input.right) this.velX += this.acceleration * delta;
                if (!input.left && !input.right) {
                    if (this.velX > 0) this.velX = Math.max(0, this.velX - this.friction * delta);
                    else if (this.velX < 0) this.velX = Math.min(0, this.velX + this.friction * delta);
                }
                this.velX = Math.max(-this.maxSpeed, Math.min(this.velX, this.maxSpeed));
            }
        }

        // --- 3. ROZWIĄZANIE KOLIZJI (NAPRAWA CLIPPINGU) ---
        if (!this.onSlope) {
            // A. Najpierw ruch i kolizja w pionie (Y)
            const oldY = this.y;
            this.y += this.velY * delta;
            let preColY = this.velY;
            let wasGroundBefore = this.onGround;
            this.onGround = false;
            this.canMoveOnPlatform = true;

            for (let i = 0; i < activePlatforms.length; i++) {
                const plat = activePlatforms[i];
                if (this.checkCollision(this, plat)) {
                    if (this.velY > 0 && oldY + this.height <= plat.y + 10) { 
                        // Lądowanie od góry
                        this.y = plat.y - this.height;
                        if (preColY >= 1000) this.fallCount++;
                        this.velY = 0;
                        this.onGround = true;
                        if (plat.canMove === false) { this.canMoveOnPlatform = false; this.velX = 0; }
                        if (!wasGroundBefore) this.velX = 0;
                    } else if (this.velY < 0 && oldY >= plat.y + plat.height) {
                        // Uderzenie głową
                        this.y = plat.y + plat.height;
                        this.velY = Math.abs(this.velY) * 0.5;
                    }
                }
            }

            // B. Potem ruch i kolizja w poziomie (X)
            const oldX = this.x;
            this.x += this.velX * delta;
            
            // Granice mapy
            if (this.x < 0) { this.x = 0; this.velX = 0; }
            if (this.x + this.width > 480) { this.x = 480 - this.width; this.velX = 0; }

            for (let i = 0; i < activePlatforms.length; i++) {
                const plat = activePlatforms[i];
                if (this.checkCollision(this, plat)) {
                    // Sprawdzamy, czy to faktycznie kolizja boczna (nie jesteśmy na platformie)
                    if (this.y + this.height > plat.y + 2 && this.y < plat.y + plat.height - 2) {
                        this.x = (this.velX > 0) ? plat.x - this.width : plat.x + plat.width;
                        if (!this.onGround) {
                            this.velX *= -0.6; // Odbicie
                        } else {
                            this.velX = 0;
                        }
                    }
                }
            }
        } else {
            // Jeśli na skosie, po prostu wykonaj ruch (fizyka skosu już go wyliczyła)
            this.y += this.velY * delta;
            this.x += this.velX * delta;
        }
    }

    performJump() {
        this.jumpCount++;
        const chargePct = this.jumpCharge / this.maxJumpCharge;
        this.velY = -this.jumpCharge;
        this.velX = this.jumpDirection !== 0 ? this.jumpDirection * (155 + (chargePct * 125)) : 0;
        this.jumpCharge = 0;
        this.jumpCharging = false;
        this.onGround = false;
        this.jumpDirection = 0;
    }

    checkCollision(r1, r2) {
        return r1.x < r2.x + r2.width && r1.x + r1.width > r2.x && r1.y < r2.y + r2.height && r1.y + r1.height > r2.y;
    }

    getSlopeYAtPlayerTop(slope) {
        const xL = this.x, xR = this.x + this.width;
        const minX = Math.min(slope.x1, slope.x2), maxX = Math.max(slope.x1, slope.x2);
        const getVal = (x) => slope.y1 + ((x - slope.x1) / (slope.x2 - slope.x1)) * (slope.y2 - slope.y1);
        let yL = (xL >= minX && xL <= maxX) ? getVal(xL) : null;
        let yR = (xR >= minX && xR <= maxX) ? getVal(xR) : null;
        return (yL !== null && yR !== null) ? Math.max(yL, yR) : (yL ?? yR);
    }

    checkSlopeCollision(slope) {
        const checkX = (slope.dir === 1) ? this.x : this.x + this.width;
        if (checkX < Math.min(slope.x1, slope.x2) || checkX > Math.max(slope.x1, slope.x2)) return false;
        const lineY = slope.y1 + ((checkX - slope.x1) / (slope.x2 - slope.x1)) * (slope.y2 - slope.y1);
        if (this.y + this.height >= lineY && this.y + this.height <= lineY + 30) {
            this.y = lineY - this.height;
            return true;
        }
        return false;
    }

    reset() {
        this.x = 100; this.y = -5265;
        this.velX = 0; this.velY = 0;
        this.jumpCharge = 0; this.jumpCharging = false;
        this.playTime = 0; this.jumpCount = 0; this.fallCount = 0;
        this.onGround = true; 
    }

    saveGame() {
        localStorage.setItem("goyJumperSave", JSON.stringify({ x: this.x, y: this.y, playTime: this.playTime, jumpCount: this.jumpCount, fallCount: this.fallCount }));
    }

    loadGame() {
        const saved = localStorage.getItem("goyJumperSave");
        if (saved) { Object.assign(this, JSON.parse(saved)); return true; }
        return false;
    }

    draw(ctx) {
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