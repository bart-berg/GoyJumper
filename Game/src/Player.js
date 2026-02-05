// === GRACZ: fizyka, input, rysowanie ===
export class Player {
    constructor(x, y) {
        // --- Pozycja startowa i aktualna ---
        this.startX = x;
        this.startY = y;
        this.x = x;
        this.y = y;

        // --- Hitbox i rozmiar wizualny ---
        this.width = 16;
        this.height = 26;
        this.visualWidth = 32;
        this.visualHeight = 32;
        this.facing = 1; // 1 - right, -1 - left

        // --- Prędkości ---
        this.velX = 0;
        this.velY = 0;

        // --- STATYSTYKI I CZAS ---
        this.fallDistance = 0;
        this.jumpCount = 0;
        this.fallCount = 0;
        this.playTime = 0;

        //dla Grafiki
        this.lastFallCount = this.fallCount;
        this.isFaceplanting = false;
        this.walkTimer = 0;

        // --- WARTOŚCI FIZYKI
        this.acceleration = 1200;
        this.maxSpeed = 150;
        this.friction = 2500;
        this.gravity = 2100;
        this.terminalVelocity = 750;

        // --- Skok ładowany ---
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

        // --- WIATR ---
        this.windStrength = 0;
        this.maxWindForce = 400;

        // --- DEBUG ---
        this.debugMode = false;
        this.debugSpeed = 500; // Prędkość latania
    }

    // === STREFY WIATRU (y)   ===
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

    // === HUD: format czasu
    formatTime(seconds) {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        const ms = Math.floor((seconds % 1) * 1000);
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
    }

    // === GŁÓWNA AKTUALIZACJA     ===
    update(input, delta, platforms, slopes) {
        // --- Toggle debug ---
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
            if (input.up) this.y -= this.debugSpeed * delta;
            if (input.down) this.y += this.debugSpeed * delta;

            return; // POMIŃ resztę fizyki, kolizji i wiatru
        }
        // --- TRYB DEBUGOWY KONIEC ---

        // --- Czas gry ---
        this.playTime += delta;

        // --- Timer animacji chodzenia ---
        if (input.left || input.right) {
            this.walkTimer += delta;
        } else {
            this.walkTimer = 0; // Reset do klatki 'walk1' przy zatrzymaniu
        }

        // --- LOGIKA WIATRU (sinus) ---
        const windCycle = 12; // Pełny cykl zmiany kierunku (12 sekund)
        this.windStrength = Math.sin(this.playTime * (Math.PI * 2 / windCycle));

        // Warunek: wiatr wieje tylko na konkretnej wysokości
        let isWindActive = this.isInWindyArea();
        let windForce = isWindActive ? this.windStrength * this.maxWindForce : 0;
        // ---------------------

        // Sito przestrzenne (widoczne ekrany +/-)
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

        // --- 1) DETEKCJA SKOSÓW ---
        for (let i = 0; i < activeSlopes.length; i++) {
            const slope = this.normalizeSlope(activeSlopes[i]);

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
                    this.velY = Math.abs(this.velY) * 0.1;
                    this.velX = 0;
                    this.y = collisionY + 1;
                    break;
                }
            }
        }

        // --- 2) FIZYKA: skos albo zwykły ruch ---
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
            // --- Grawitacja ---
            this.velY = Math.min(this.terminalVelocity, this.velY + this.gravity * delta);

            const isWindScreen = this.isInWindyArea();

            // Popych wiatru w locie
            if (!this.onGround && this.windEnabled) {
                this.velX += this.windStrength * this.maxWindForce * delta;
            }

            if (!isWindScreen) this.windEnabled = false;

            // --- Sterowanie i ładowanie skoku (na ziemi) ---
            if (this.onGround) {
                if (isWindScreen) this.windEnabled = true;
                if (this.isFaceplanting) {
                    if (input.left || input.right || input.jump) {
                        this.isFaceplanting = false;
                    }
                }
                if (input.jump) {
                    if (!this.jumpCharging) {
                        this.jumpCharging = true;
                        // Zeruj prędkość tylko na zwykłym bloku (nie na lodzie)
                        if (!this.isIce) {
                            if (this.isInWindyArea()) {
                                // Minimalny wpływ wiatru na ziemi
                                const groundWindFactor = 0.05;
                                this.velX = this.windStrength * this.maxWindForce * groundWindFactor;
                            } else {
                                // Poza wiatrem: zeruj poziome momentum podczas ładowania skoku
                                this.velX = 0;
                            }
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
                // Zakaz „podskoku” w powietrzu
                if (this.jumpCharging) {
                    this.jumpCharging = false;
                    this.jumpCharge = 0;
                }
            }

            // --- Tarcie / sterowanie poziome ---
            //tarcie - spaghetti
            //naprawde kurwa zacznij wszystko podpisywać bo się w tym gubie
            if (this.onGround && (!this.jumpCharging || this.isIce) && this.canMoveOnPlatform) {
                // Mnożniki lodu
                let accelMultiplier = this.isIce ? 0.50 : 1.0;
                let currentMaxSpeed = this.isIce ? this.maxSpeed : this.maxSpeed;

                // Zmiana kierunku: „zerowanie” velX przy przeciwnym kierunku
                if (!this.isIce) {
                    if ((input.left && this.velX > 0) || (input.right && this.velX < 0)) {
                        this.velX = 0;
                    }
                }

                // Przyspieszenie poziome
                if (!(this.jumpCharging && this.isIce)) {
                    if (input.left) this.velX -= this.acceleration * accelMultiplier * delta;
                    if (input.right) this.velX += this.acceleration * accelMultiplier * delta;
                }

                // Tarcie z lekkim wpływem wiatru na ziemi
                if (!input.left && !input.right || (this.isIce && this.jumpCharging)) {
                    let f = this.isIce ? (this.jumpCharging ? 700 : 250) : 2500;

                    // Minimalny wpływ wiatru na ziemi
                    let groundWindFactor = 0.05; // ~5% siły wiatru na ziemi
                    let targetWindVel = this.isInWindyArea() ? (this.windStrength * this.maxWindForce * groundWindFactor) : 0;

                    if (this.velX > targetWindVel) {
                        this.velX = Math.max(targetWindVel, this.velX - f * delta);
                    } else if (this.velX < targetWindVel) {
                        this.velX = Math.min(targetWindVel, this.velX + f * delta);
                    }
                }

                // Limit prędkości
                this.velX = Math.max(-currentMaxSpeed, Math.min(this.velX, currentMaxSpeed));
            }
        }

        // === 3) KOLIZJE: pion, potem poziom
        if (!this.onSlope) {
            // A) PION (Y)
            const oldY = this.y;
            this.y += this.velY * delta;
            this.onGround = false;
            this.canMoveOnPlatform = true;
            this.isIce = false;

            if (!this.onGround) {
                this.fallDistance += this.velY * delta; // sumuje dystans spadku
            } else {
                this.fallDistance = 0; // reset po wylądowaniu
            }

            // Tryb „phase” dla platform
            const isEven = this.jumpCount % 2 === 0;

            for (let i = 0; i < activePlatforms.length; i++) {
                const plat = activePlatforms[i];

                // LOGIKA FAZ
                if (plat.phase === 1 && isEven) continue;    
                if (plat.phase === 2 && !isEven) continue;   

                if (this.checkCollision(this, plat)) {
                    if (this.velY > 0 && oldY + this.height <= plat.y + 10) {
                        // Lądowanie od góry
                        this.y = plat.y - this.height;

                        // --- Faceplant po długim locie ---
                        if (this.fallDistance >= 240) { // threshold
                            this.fallCount++;
                            this.isFaceplanting = true;
                            if (!plat.isIce) {
                                this.velX = 0;
                            }
                        }

                        this.velY = 0;
                        this.onGround = true;
                        this.fallDistance = 0; // reset po lądowaniu

                        // Lód
                        if (plat.isIce) this.isIce = true;

                        // Faza platform
                        if (plat.canMove === false) { this.canMoveOnPlatform = false; this.velX = 0; }

                        // Zatrzymanie poziomego ruchu po lądowaniu (jeśli nie lód/faceplant/wiatr)
                        if (!plat.isIce && !this.isFaceplanting && !input.left && !input.right && !this.isInWindyArea()) {
                            this.velX = 0;
                        }
                    } else if (this.velY < 0 && oldY >= plat.y + plat.height) {
                        // Uderzenie głową
                        this.y = plat.y + plat.height;
                        this.velY = 60;
                        this.velX *= 0.4;
                    }
                }
            }

            // B) POZIOM (X)
            const oldX = this.x;
            this.x += this.velX * delta;

            // BLOKADA wchodzenia w skos „z boku”
            if (this.isBlockedBySlope(activeSlopes)) {
                this.x = oldX;
                this.velX = 0;
            }

            // Granice mapy
            if (this.x < 0) { this.x = 0; this.velX = 0; }
            if (this.x + this.width > 480) { this.x = 480 - this.width; this.velX = 0; }

            for (let i = 0; i < activePlatforms.length; i++) {
                const plat = activePlatforms[i];

                if (plat.phase === 1 && isEven) continue;
                if (plat.phase === 2 && !isEven) continue;

                if (this.checkCollision(this, plat)) {
                    if (this.y + this.height > plat.y + 2 && this.y < plat.y + plat.height - 2) {

                        // --- Odbicia przy wietrze (mniejsze) ---
                        let bounceForce = -0.6; // Domyślne odbicie

                        if (this.isInWindyArea()) {
                            if (this.velX > 0 && this.windStrength > 0) bounceForce = -0.2;
                            if (this.velX < 0 && this.windStrength < 0) bounceForce = -0.2;
                        }

                        this.x = (this.velX > 0) ? plat.x - this.width : plat.x + plat.width;

                        if (!this.onGround) {
                            this.velX *= bounceForce;
                        } else {
                            this.velX = 0;
                        }
                    }
                }
            }
        } else {
            // Na skosie — ruch wg wcześniej policzonych velX/velY
            this.y += this.velY * delta;
            this.x += this.velX * delta;
        }
    }

    // === SKOK (charge) ===
    performJump() {

        this.jumpCount++;
        const chargePct = this.jumpCharge / this.maxJumpCharge;
        const jumpPower = 155 + (chargePct * 125);
        this.velY = -this.jumpCharge;
        const wasOnIce = this.isIce;

        // Pęd startowy od wiatru
        if (this.isInWindyArea()) {
            this.velX += (this.windStrength * this.maxWindForce) * 0.2;
        }

        // Logika prędkości poziomej przy skoku
        if (this.jumpDirection !== 0) {
            if (wasOnIce) {
                // Zachowaj część pędu na lodzie
                this.velX = (this.jumpDirection * jumpPower) + (this.velX * 0.8);
            } else {
                this.velX = this.jumpDirection * jumpPower;
            }
        } else {
            // Skok pionowo w górę — zachowaj velX
            this.velX = this.velX;
        }
        this.jumpCharge = 0;
        this.jumpCharging = false;
        this.onGround = false;
        this.jumpDirection = 0;
    }

    // === KOLIZJE  ====
    checkCollision(r1, r2) {
        return r1.x < r2.x + r2.width && r1.x + r1.width > r2.x && r1.y < r2.y + r2.height && r1.y + r1.height > r2.y;
    }

    // --- Y na szczycie gracza dla danego skosu ---
    getSlopeYAtPlayerTop(slope) {
        slope = this.normalizeSlope(slope);

        const xL = this.x;
        const xR = this.x + this.width;
        const minX = Math.min(slope.x1, slope.x2);
        const maxX = Math.max(slope.x1, slope.x2);

        const getVal = (x) => slope.y1 + ((x - slope.x1) / (slope.x2 - slope.x1)) * (slope.y2 - slope.y1);

        let yAtL = (xL >= minX && xL <= maxX) ? getVal(xL) : null;
        let yAtR = (xR >= minX && xR <= maxX) ? getVal(xR) : null;

        if (yAtL !== null && yAtR !== null) {
            return Math.max(yAtL, yAtR);
        }

        return yAtL ?? yAtR;
    }

    // --- Kolizja z podłogowym skosem (Slide) ---
    checkSlopeCollision(slope) {
        slope = this.normalizeSlope(slope);

        const dx = slope.x2 - slope.x1;
        const dy = slope.y2 - slope.y1;

        const bottomPoints = 5;
        const step = this.width / (bottomPoints - 1);

        let collisionDetected = false;
        let targetY = null;
        let targetXOffset = 0;

        // Tylko gdy spadamy/ślizgamy się (nie przy velY < 0 nad skosem)
        if (this.velY < 0 && !this.onSlope) return false;

        for (let i = 0; i < bottomPoints; i++) {
            const px = this.x + i * step;
            if (px < Math.min(slope.x1, slope.x2) || px > Math.max(slope.x1, slope.x2)) continue;

            const slopeY = slope.y1 + ((px - slope.x1) / (slope.x2 - slope.x1)) * dy;

            // Zawężona tolerancja wykrycia
            const tolerance = 12;
            if (this.y + this.height >= slopeY && this.y + this.height <= slopeY + tolerance) {
                collisionDetected = true;
                targetY = targetY === null ? slopeY : Math.min(targetY, slopeY);

                const slopeXAtPlayer = slope.x1 + ((slopeY - slope.y1) / dy) * dx;
                targetXOffset = slopeXAtPlayer - px;
            }
        }

        if (collisionDetected) {
            this.x += targetXOffset;
            this.y = targetY - this.height;
            return true;
        }

        return false;
    }

    // --- Blokada wejścia w skos pod górę z boku ---
    isBlockedBySlope(slopes) {
        for (let raw of slopes) {

            const s = this.normalizeSlope(raw);

            if (s.type !== 1) continue;

            const minX = Math.min(s.x1, s.x2);
            const maxX = Math.max(s.x1, s.x2);

            const goingRight = this.velX > 0;

            // kierunek nachylenia
            const slopeGoesUpRight = s.y2 < s.y1;

            // czy idziemy POD GÓRĘ?
            const uphill =
                (goingRight && slopeGoesUpRight) ||
                (!goingRight && !slopeGoesUpRight);

            if (!uphill) continue; // jeśli w dół → pozwól

            const checkX = goingRight
                ? this.x + this.width
                : this.x;

            if (checkX < minX - 1 || checkX > maxX + 1) continue;

            const getY = (x) =>
                s.y1 + ((x - s.x1) / (s.x2 - s.x1)) * (s.y2 - s.y1);

            const slopeY = getY(checkX);

            if (
                this.onGround &&
                this.y + this.height > slopeY - 6 &&
                this.y + this.height < slopeY + 20
            ) {
                return true;
            }
        }

        return false;
    }

    // --- Normalizacja skosu (x1 <= x2) ---
    normalizeSlope(s) {

        if (s.x1 <= s.x2) return s;

        return {
            ...s,
            x1: s.x2,
            y1: s.y2,
            x2: s.x1,
            y2: s.y1
        };
    }

    // === RESET/IO  ===
    reset() {
        this.x = 10; this.y = 300;
        this.velX = 0; this.velY = 0;
        this.jumpCharge = 0; this.jumpCharging = false;
        this.playTime = 0; this.jumpCount = 0; this.fallCount = 0;
        this.onGround = true;
    }

    saveGame() {
        localStorage.setItem("ViaDolorosaSave", JSON.stringify({ x: this.x, y: this.y, playTime: this.playTime, jumpCount: this.jumpCount, fallCount: this.fallCount }));
    }

    loadGame() {
        const saved = localStorage.getItem("ViaDolorosaSave");
        if (saved) { Object.assign(this, JSON.parse(saved)); return true; }
        return false;
    }

    // === WYBÓR SPRITE GRACZA ===
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

    // === RYSOWANIE   ===
    draw(ctx, spriteManager, input = {}) {
        // 2. RYSOWANIE GRAFIKI (SPRITE)
        if (spriteManager && spriteManager.isLoaded) {
            const key = this.getSpriteKey(input);
            const img = spriteManager.sprites[key];

            if (img) {
                // Kierunek patrzenia (na ziemi i bez faceplanta)
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

                ctx.drawImage(img, 0, 0.4, this.visualWidth, this.visualHeight); //0.4 zeby gracz nie unosil sie nad ziemia
                ctx.restore();
            }
        }

        //wszystko poniżej to debug grafiki i dodatkowe wskaźniki, które mogą być przydatne podczas testowania, ale nie są potrzebne

        // // 3. Pasek ładowania skoku (nad głową)
        // if (this.jumpCharging) {
        //     const barY = Math.round(this.y) - 12;
        //     ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        //     ctx.fillRect(Math.round(this.x), barY, this.width, 4);
        //     ctx.fillStyle = "yellow";
        //     ctx.fillRect(Math.round(this.x), barY, (this.jumpCharge / this.maxJumpCharge) * this.width, 4);
        // }

        // // 4. Wskaźnik wiatru - niepotrzebny
        // if (this.isInWindyArea()) {
        //     const screenTop = Math.floor(this.y / 360) * 360;
        //     const barWidth = 100;
        //     const barX = 240 - (barWidth / 2);
        //     const barY = screenTop + 20;

        //     ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        //     ctx.fillRect(barX, barY, barWidth, 6);
        //     ctx.fillStyle = "cyan";
        //     ctx.fillRect(barX + (barWidth / 2), barY, this.windStrength * (barWidth / 2), 6);
        //     ctx.strokeStyle = "white";
        //     ctx.lineWidth = 1;
        //     ctx.strokeRect(barX, barY, barWidth, 6);
        // }

        // ///Debug - hitbox
        // ///---------------------------------------------------------------
        // ctx.save();
        // ctx.strokeStyle = "red";
        // ctx.lineWidth = 1;

        // ctx.strokeRect(Math.round(this.x), Math.round(this.y), this.width, this.height);
        // ctx.restore();
        // //---------------------------------------------------------------
    }
}