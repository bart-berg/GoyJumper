export class Player {
    constructor(x, y) {
        this.startX = x;
        this.startY = y;
        this.x = x;
        this.y = y;
        this.width = 16;
        this.height = 26;
        this.visualWidth = 32;
        this.visualHeight = 32;
        this.facing = 1; // 1 - right, -1 - left
        this.velX = 0;
        this.velY = 0;

        // --- STATYSTYKI I CZAS ---
        this.jumpCount = 0;
        this.fallCount = 0;
        this.playTime = 0;

        //dla Grafiki
        this.lastFallCount = this.fallCount;
        this.isFaceplanting = false;
        this.walkTimer = 0;

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
        this.isIce = false;

        //WIATR
        this.windStrength = 0;
        this.maxWindForce = 400;

        //DEBUG
        this.debugMode = false;
        this.debugSpeed = 500; // Prędkość latania
    }




    //Dla nowego screenem z wiatrem napisz screenX z wartościami y
    isInWindyArea() {
        const screen1 = (this.y < -10800 && this.y > -11160);
        const screen2 = (this.y < -11160 && this.y > -11520);
        const screen3 = (this.y < -11520 && this.y > -11880);
        const screen4 = (this.y < -11880 && this.y > -12240);
        const screen5 = (this.y < -12240 && this.y > -12600);
        const screen6 = (this.y < -12600 && this.y > -12960);
        //Treachery
        const screen7 = (this.y < -16560 && this.y > -16920);
        const screen8 = (this.y < -16920 && this.y > -17280);
        const screen9 = (this.y < -17280 && this.y > -17640);
        return screen1 || screen2 || screen3 || screen4 || screen5 || screen6 || screen7 || screen8 || screen9;
    }

    formatTime(seconds) {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        const ms = Math.floor((seconds % 1) * 1000);
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
    }

    update(input, delta, platforms, slopes) {
        if (input.debug) {
            this.debugMode = !this.debugMode;
            input.debug = false;
        }
        // --- TRYB DEBUGOWY (LATAJĄCY) ---
        if (this.debugMode) {
            this.velX = 0;
            this.velY = 0;
            this.onGround = true;

            if (input.left) this.x -= this.debugSpeed * delta;
            if (input.right) this.x += this.debugSpeed * delta;
            if (input.up) this.y -= this.debugSpeed * delta; // Upewnij się, że input.up jest w Input.js
            if (input.down) this.y += this.debugSpeed * delta;

            return; // POMIŃ resztę fizyki, kolizji i wiatru
        }
        // --- TRYB DEBUGOWY KONIEC ---


        this.playTime += delta;

        if (input.left || input.right) {
            this.walkTimer += delta;
        } else {
            this.walkTimer = 0; // Reset do klatki 'walk1' przy zatrzymaniu
        }

        // --- LOGIKA WIATRU ---
        const windCycle = 12; // Pełny cykl zmiany kierunku (12 sekund)
        this.windStrength = Math.sin(this.playTime * (Math.PI * 2 / windCycle));

        // Warunek: wiatr wieje tylko na konkretnej wysokości
        let isWindActive = this.isInWindyArea();
        let windForce = isWindActive ? this.windStrength * this.maxWindForce : 0;
        // ---------------------

        // Filtrowanie (bezpieczne dla wydajności)
        const currentScreenY = Math.floor(this.y / 360) * 360;

        //zaczyna sie od -0
        const currentScreen = currentScreenY / 360 * -1;
        console.log(currentScreen);

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

            // --- WIATR W POWIETRZU ---
            if (!this.onGround && this.isInWindyArea()) {
                this.velX += this.windStrength * this.maxWindForce * delta;
            }

            // Sterowanie i ładowanie skoku (TWOJA LOGIKA)
            // --- Sterowanie i ładowanie skoku ---
            if (this.onGround) {
                if (this.isFaceplanting) {
                    if (input.left || input.right || input.jump) {
                        this.isFaceplanting = false;
                    }
                }
                if (input.jump) {
                    if (!this.jumpCharging) {
                        this.jumpCharging = true;
                        // Zeruj prędkość tylko na zwykłym bloku, na lodzie pozwól slizgać sie
                        if (!this.isIce) {
                            // Zamiast totalnego zera, ustawiamy prędkość na taką, jaką dyktuje wiatr
                            // Dzięki temu postać "stoi" względem wiatru, a nie względem mapy
                            let windPushVel = this.isInWindyArea() ? (this.windStrength * this.maxWindForce * 0.20) : 0;
                            this.velX = windPushVel;
                        }
                        this.jumpCharge = this.minJumpCharge;
                    }
                    this.jumpCharge = Math.min(this.maxJumpCharge, this.jumpCharge + this.chargeSpeed * delta);
                    this.jumpDirection = input.left ? -1 : (input.right ? 1 : 0);
                    if (this.jumpCharge >= this.maxJumpCharge) this.performJump();
                } else if (this.jumpCharging) {
                    this.performJump();
                }
            } else {
                //Zapobieganie skokom w powietrzu
                if (this.jumpCharging) {
                    this.jumpCharging = false;
                    this.jumpCharge = 0;
                }
            }

            //tarcie - spaghetti
            //naprawde kurwa zacznij wszystko podpisywać bo się w tym gubie
            if (this.onGround && !this.jumpCharging && this.canMoveOnPlatform) {

                // 1. USTALENIE MNOŻNIKÓW DLA LODU
                // Na lodzie przyspieszamy wolniej
                let accelMultiplier = this.isIce ? 0.30 : 1.0;
                // Na lodzie limit prędkości jest większy
                let currentMaxSpeed = this.isIce ? this.maxSpeed * 1.25 : this.maxSpeed;

                // 2. PRZYSPIESZENIE (z uwzględnieniem mnożnika)
                if (input.left) this.velX -= this.acceleration * accelMultiplier * delta;
                if (input.right) this.velX += this.acceleration * accelMultiplier * delta;

                // --- 3. TARCIE Z UWZGLĘDNIENIEM WIATRU ---
                if (!input.left && !input.right) {
                    let f = this.isIce ? 250 : 2500;

                    // Cel tarcia to nie 0, ale prędkość nadawana przez wiatr na ziemi
                    // 0.20 to współczynnik przyczepności (jak bardzo wiatr nas spycha na ziemi)
                    let targetWindVel = this.isInWindyArea() ? (this.windStrength * this.maxWindForce * 0.20) : 0;

                    if (this.velX > targetWindVel) {
                        this.velX = Math.max(targetWindVel, this.velX - f * delta);
                    } else if (this.velX < targetWindVel) {
                        this.velX = Math.min(targetWindVel, this.velX + f * delta);
                    }
                }

                // 4. LIMIT PRĘDKOŚCI (dynamiczny)
                this.velX = Math.max(-currentMaxSpeed, Math.min(this.velX, currentMaxSpeed));
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
            this.isIce = false;


            //logika dla lodu i platform phase
            const isEven = this.jumpCount % 2 === 0;

            for (let i = 0; i < activePlatforms.length; i++) {
                const plat = activePlatforms[i];

                // LOGIKA FAZ: Jeśli platforma ma fazę, sprawdź czy jest aktywna
                if (plat.phase === 1 && isEven) continue;    // Pomiń, jeśli faza 1 a skok parzysty
                if (plat.phase === 2 && !isEven) continue;   // Pomiń, jeśli faza 2 a skok nieparzysty

                if (this.checkCollision(this, plat)) {
                    if (this.velY > 0 && oldY + this.height <= plat.y + 10) {
                        // Lądowanie od góry

                        this.y = plat.y - this.height;
                        if (preColY >= 1000) {
                            this.fallCount++;
                            this.isFaceplanting = true; // Aktywacja flagi
                            this.velX = 0; // Zatrzymujemy postać przy silnym uderzeniu
                        }
                        this.velY = 0;
                        this.onGround = true;

                        // Jeśli fallCount wzrósł, aktywuj stan faceplant
                        if (this.fallCount > this.lastFallCount) {
                            this.isFaceplanting = true;
                            this.lastFallCount = this.fallCount;
                        }

                        // Jeśli gracz zacznie ładować skok lub się ruszy, przerwij faceplant
                        if (this.jumpCharging || Math.abs(this.velX) > 50) {
                            this.isFaceplanting = false;
                        }

                        // Obsługa lodu
                        if (plat.isIce) this.isIce = true;



                        if (plat.canMove === false) { this.canMoveOnPlatform = false; this.velX = 0; }
                        if (!wasGroundBefore && !this.isIce) this.velX = 0;
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

                //Ta sama logika faz co powyżej
                if (plat.phase === 1 && isEven) continue;
                if (plat.phase === 2 && !isEven) continue;

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
        const jumpPower = 155 + (chargePct * 125);
        this.velY = -this.jumpCharge;

        //pęd startowy od wiatru
        if (this.isInWindyArea()) {
            this.velX += (this.windStrength * this.maxWindForce) * 0.2;
        }

        // Logika prędkości poziomej przy skoku (ogólnie chodzi o to że zachwujesz predkosć jak skoczysz w gore na lodzie i możesz robić kontry)
        if (this.jumpDirection !== 0) {
            if (this.isIce) {
                // Obliczamy nową prędkość: siła skoku w danym kierunku + obecna prędkość
                // Jeśli velX ma przeciwny znak niż jumpDirection, wynik naturalnie się zmniejszy
                this.velX = (this.jumpDirection * jumpPower) + (this.velX * 0.8);
            } else {
                // Na zwykłym podłożu zachowujemy stary, responsywny skok
                this.velX = this.jumpDirection * jumpPower;
            }
        } else {
            // Skok prosto w górę - zachowujemy pęd (bez zmian)
            this.velX = this.velX;
        }
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
        this.x = 240; this.y = -10740;
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

    getSpriteKey(input = {}) {
        if (this.onGround && this.isFaceplanting) {
            return 'faceplant';
        }

        if (!this.onGround && Math.abs(this.velX) > 300) {
            return 'knockback';
        }

        if (this.jumpCharging) return 'charging';

        if (!this.onGround) {
            return this.velY < 0 ? 'rising' : 'falling';
        }

        const isMovingInput = input.left || input.right;

        if (this.onGround && isMovingInput && Math.abs(this.velX) > 10) {
            const cycleDuration = 4 / 5;
            const progress = (this.walkTimer % cycleDuration) / cycleDuration;

            if (progress < 0.4) return 'walk1';
            if (progress < 0.5) return 'walk2';
            if (progress < 0.9) return 'walk3';
            return 'walk2';
        }

        return 'standing';
    }


    draw(ctx, spriteManager, input = {}) {

        // 2. RYSOWANIE GRAFIKI (SPRITE)
        if (spriteManager && spriteManager.isLoaded) {
            const key = this.getSpriteKey(input);
            const img = spriteManager.sprites[key];

            if (img) {
                if (this.onGround && !this.isFaceplanting) {
                    if (input.right) this.facing = 1;
                    else if (input.left) this.facing = -1;
                }

                const xOffset = (this.visualWidth - this.width) / 2;
                const yOffset = this.visualHeight - this.height;

                ctx.save();
                ctx.translate(Math.round(this.x), Math.round(this.y));

                if (this.facing === -1) {
                    ctx.scale(-1, 1);
                    ctx.translate(-this.width - xOffset, -yOffset);
                } else {
                    ctx.translate(-xOffset, -yOffset);
                }

                ctx.drawImage(img, 0, 0, this.visualWidth, this.visualHeight);
                ctx.restore();
            }
        }

        // 3. Pasek ładowania skoku (nad głową)
        if (this.jumpCharging) {
            const barY = Math.round(this.y) - 12;
            ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
            ctx.fillRect(Math.round(this.x), barY, this.width, 4);
            ctx.fillStyle = "yellow";
            ctx.fillRect(Math.round(this.x), barY, (this.jumpCharge / this.maxJumpCharge) * this.width, 4);
        }

        // 4. Wskaźnik wiatru
        if (this.isInWindyArea()) {
            const screenTop = Math.floor(this.y / 360) * 360;
            const barWidth = 100;
            const barX = 240 - (barWidth / 2);
            const barY = screenTop + 20;

            ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
            ctx.fillRect(barX, barY, barWidth, 6);
            ctx.fillStyle = "cyan";
            ctx.fillRect(barX + (barWidth / 2), barY, this.windStrength * (barWidth / 2), 6);
            ctx.strokeStyle = "white";
            ctx.lineWidth = 1;
            ctx.strokeRect(barX, barY, barWidth, 6);
        }

        ///Debug - hitbox
        ///---------------------------------------------------------------
        ctx.save();
        ctx.strokeStyle = "red";
        ctx.lineWidth = 1;

        ctx.strokeRect(Math.round(this.x), Math.round(this.y), this.width, this.height);
        ctx.restore();
        //---------------------------------------------------------------
    }
}