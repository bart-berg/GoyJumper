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

        // --- WARTOŚCI FIZYKI ---
        this.acceleration = 1200; 
        this.maxSpeed = 150;
        this.friction = 2500;
        this.gravity = 2100;
        
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

    update(input, delta, platforms, slopes) {
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
        if (this.onGround && !this.jumpCharging) {
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

        // 3. OBSŁUGA ZBOCZY
        for (let slope of slopes) {
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
            this.x += this.velX * delta;
            this.y += this.velY * delta;
            return; 
        }

        if (wasOnSlope && !this.onSlope) {
            this.slideSpeed = 0;
            this.onGround = false;
        }

        // 4. RUCH PIONOWY I KOLIZJE GÓRA/DÓŁ
        let wasInAir = !this.onGround;
        this.velY += this.gravity * delta;
        this.y += this.velY * delta;

        this.onGround = false;
        for (let plat of platforms) {
            if (this.checkCollision(this, plat)) {
                if (this.velY > 0) { 
                    if (this.y + this.height - this.velY * delta <= plat.y + 10) {
                        this.y = plat.y - this.height;
                        this.velY = 0;
                        this.onGround = true;
                        if (wasInAir) this.velX = 0; 
                    }
                } else if (this.velY < 0) {
                    this.y = plat.y + plat.height;
                    this.velY = 0;
                }
            }
        }

        // 5. RUCH POZIOMY I KOLIZJE
        this.x += this.velX * delta;

        // Granice ekranu - TYLKO ZATRZYMANIE
        if (this.x < 0) { 
            this.x = 0; 
            this.velX = 0; 
        }
        if (this.x + this.width > 480) { 
            this.x = 480 - this.width; 
            this.velX = 0;
        }

        // Kolizje z platformami - ODBIJANIE (0.7)
        for (let plat of platforms) {
            if (this.checkCollision(this, plat)) {
                let isStandingOnThis = (Math.abs((this.y + this.height) - plat.y) < 1.1);

                if (!isStandingOnThis) {
                    if (this.velX > 0) this.x = plat.x - this.width;
                    else if (this.velX < 0) this.x = plat.x + plat.width;
                    
                    if (!this.onGround) {
                        this.velX *= -0.7; // Przywrócone Twoje 0.7
                    } else {
                        this.velX = 0;
                    }
                }
            }
        }

        this.x = Math.round(this.x * 100) / 100;
        this.y = Math.round(this.y * 100) / 100;
    }

    performJump() {
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

    draw(ctx) {
        ctx.fillStyle = this.jumpCharging ? "#ff7777" : "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        if (this.jumpCharging) {
            ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
            ctx.fillRect(this.x, this.y - 12, this.width, 4);
            ctx.fillStyle = "yellow";
            ctx.fillRect(this.x, this.y - 12, (this.jumpCharge / this.maxJumpCharge) * this.width, 4);
        }
    }
}