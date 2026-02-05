export class NPC {
  constructor(x, y, size, dialogs) {
    this.x = x;
    this.y = y;
    this.size = size;

    // Dialogi
    this.dialogs = [...dialogs];
    this.currentDialog = null;
    this.sentenceIndex = 0;

    // ---- TYPEWRITER ----
    this.fullText = "";
    this.visibleText = "";
    this.charIndex = 0;
    this.charDelay = 0.05;
    this.pauseAfterSentence = 2;
    this.timer = 0;
    this.state = "idle"; // idle | typing | pause
    this.dialogInProgress = false;
    this.finished = false;

    // ---- ZASIĘG + PROX-GATE (wejście → 1 dialog; kolejny po wyjściu i powrocie) ----
    this.activationDistance = 105;
    this.playerWasNear = false; // zbocze false->true startuje dialog

    // ---- BOX dialogowy (wrap) ----
    this.maxTextWidth = 180; 
    this.lineHeight = 10;   
    this.boxPadding = 4;     
  }

  // ---- POMOCNICZE ----
  isPlayerNear(player) {
    const dx = player.x + player.width / 2 - (this.x + this.size / 2);
    const dy = player.y + player.height / 2 - (this.y + this.size / 2);
    return Math.sqrt(dx * dx + dy * dy) <= this.activationDistance;
  }

  // Start tylko na zboczu: „poza zasięgiem” -> „w zasięgu”
  tryStartDialog(player) {
    if (this.finished || this.dialogInProgress) return;
    if (this.dialogs.length === 0) { this.finished = true; return; }

    const near = this.isPlayerNear(player);
    if (near && !this.playerWasNear) {
      this.startNextDialog();
    }
    this.playerWasNear = near;
  }

  startNextDialog() {
    if (this.dialogs.length === 0) { this.finished = true; return; }
    this.currentDialog = this.dialogs.shift(); // KOLEJNO, nie losowo
    this.sentenceIndex = 0;
    this.dialogInProgress = true;
    this.startSentence();
  }

  startSentence() {
    if (this.sentenceIndex >= this.currentDialog.length) {
      // ---- KONIEC JEDNEGO DIALOGU ----
      this.dialogInProgress = false;
      this.state = "idle";
      this.visibleText = "";
      if (this.dialogs.length === 0) {
        this.finished = true;
      }
      return;
    }
    this.fullText = this.currentDialog[this.sentenceIndex];
    this.visibleText = "";
    this.charIndex = 0;
    this.timer = 0;
    this.state = "typing";
  }

  update(delta, player) {
    if (this.finished) return;

    // Nie uruchamiaj automatyki dla FinalMemoryNPC – on ma własny system
    if (!(this.constructor && this.constructor.name === "FinalMemoryNPC")) {
      this.tryStartDialog(player);
    }
    if (!this.dialogInProgress) return;

    // ---- TYPEWRITER ----
    this.timer += delta;
    if (this.state === "typing") {
      if (this.timer >= this.charDelay) {
        this.timer = 0;
        if (this.charIndex < this.fullText.length) {
          this.visibleText += this.fullText[this.charIndex++];
        } else {
          this.state = "pause";
          this.timer = 0;
        }
      }
    }
    else if (this.state === "pause") {
      if (this.timer >= this.pauseAfterSentence) {
        this.sentenceIndex++;
        this.startSentence();
      }
    }
  }

  // ---- zawijanie tekstu do maks. szerokości ----
  wrapText(ctx, text, maxWidth) {
    const words = text.split(" ");
    const lines = [];
    let line = "";
    for (const word of words) {
      const test = line ? line + " " + word : word;
      if (ctx.measureText(test).width <= maxWidth) {
        line = test;
      } else {
        if (line) lines.push(line);
        // Jeśli pojedyncze słowo jest szersze niż maxWidth – podziel je na znaki
        if (ctx.measureText(word).width <= maxWidth) {
          line = word;
        } else {
          let part = "";
          for (const ch of word) {
            const t2 = part + ch;
            if (ctx.measureText(t2).width <= maxWidth) {
              part = t2;
            } else {
              if (part) lines.push(part);
              part = ch;
            }
          }
          line = part;
        }
      }
    }
    if (line) lines.push(line);
    return lines;
  }

  // ---- rysowanie boxa z zaokrąglonymi rogami ----
  drawRoundedRect(ctx, x, y, w, h, r) {
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + w, y, x + w, y + h, radius);
    ctx.arcTo(x + w, y + h, x, y + h, radius);
    ctx.arcTo(x, y + h, x, y, radius);
    ctx.arcTo(x, y, x + w, y, radius);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  draw(ctx) {
    // NPC (placeholder — kwadrat)
    ctx.fillStyle = "#6a5acd";
    ctx.fillRect(this.x, this.y, this.size, this.size);

    // Tekst dialogu — zawijanie i box rosnący w górę
    if (this.visibleText.length > 0) {
      ctx.save();
      ctx.font = "8px PixelGosub";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const centerX = this.x + this.size / 2;
      const baselineY = this.y - 6; // najniższa „pozycja” tekstu (dolny slot)

      // Zawijanie
      const lines = this.wrapText(ctx, this.visibleText, this.maxTextWidth);

      // Wymiary boxa
      let maxWidth = 0;
      for (const ln of lines) {
        const w = ctx.measureText(ln).width;
        if (w > maxWidth) maxWidth = w;
      }
      const boxW = Math.ceil(maxWidth) + this.boxPadding * 2;
      const boxH = lines.length * this.lineHeight + this.boxPadding * 2;

      // Box ma być nad baseline i rosnąć w górę
      const boxLeft = Math.round(centerX - boxW / 2);
      const boxBottom = baselineY + this.boxPadding; // lekko pod dolnym slotem
      const boxTop = Math.round(boxBottom - boxH);

      // Tło boxa
      ctx.fillStyle = "rgba(0,0,0,0.80)";
      ctx.strokeStyle = "rgba(255,255,255,0.15)";
      ctx.lineWidth = 1;
      this.drawRoundedRect(ctx, boxLeft, boxTop, boxW, boxH, 4);

      // Rysuj każdą linię WYŚRODKOWANĄ pionowo w swoim slocie:
      ctx.fillStyle = "white";
      for (let i = 0; i < lines.length; i++) {
        const fromBottom = (lines.length - 1 - i); // 0 = najniższy slot
        const y = baselineY - fromBottom * this.lineHeight - (this.lineHeight / 2);
        ctx.fillText(lines[i], centerX, y);
      }
      ctx.restore();
    }
  }
}

// MemoryNPC – „wspomnienie”: białe kwadraty + opcjonalny sprite
// (Wygląd i scramble bez zmian; tylko metoda dialogu jak w NPC.)
export class MemoryNPC extends NPC {
  /**
   * @param {number} x lewy-górny róg prostokąta „ciała”
   * @param {number} y lewy-górny róg prostokąta „ciała”
   * @param {number} width szerokość „ciała” (px)
   * @param {number} height wysokość „ciała” (px)
   * @param {string[][]} dialogs dialogi (jak w NPC)
   * @param {object} opts
   *  - particleCount: ile kwadratów (domyślnie 26)
   *  - sizeMin, sizeMax: zakres boku kwadratu (px) (domyślnie 7..13)
   *  - spacing: minimalny odstęp między kwadratami (px) (domyślnie 2)
   *  - overflow: ile mogą wyjść poza prostokąt (px) (domyślnie 5)
   *  - scrambleMin, scrambleMax: co ile sekund przemeblować (1..2)
   *  - fadeDuration: czas płynnego przejścia (domyślnie 0.25 s)
   *  - jitter: drobne „pływanie” pozycji (domyślnie 0.5 px)
   */
  constructor(x, y, width, height, dialogs, opts = {}) {
    super(x, y, Math.max(width, height), dialogs);

    // Rozmiar „ciała wspomnienia”
    this.bodyWidth = width;
    this.bodyHeight = height;

    // Parametry cząstek (kwadratów)
    this.particleCount = Math.max(1, opts.particleCount ?? 26);
    this.sizeMin = Math.max(2, opts.sizeMin ?? 7);
    this.sizeMax = Math.max(this.sizeMin, opts.sizeMax ?? 13);
    this.spacing = Math.max(0, opts.spacing ?? 2);
    this.overflow = Math.max(0, opts.overflow ?? 5);

    // Scramble & animacja
    this.scrambleMin = Math.max(0.2, opts.scrambleMin ?? 1.0);
    this.scrambleMax = Math.max(this.scrambleMin, opts.scrambleMax ?? 2.0);
    this.fadeDuration = Math.max(0, opts.fadeDuration ?? 0.25);
    this.jitter = opts.jitter ?? 0.5;

    
    this.spriteImg = null;     // Image() lub null → brak sprite'a
    this.spriteW = 32;         // szerokość rysowania sprite'a
    this.spriteH = 32;         // wysokość rysowania
    this.spriteAlpha = 0.18;   // przezroczystość
    this.spriteFacing = 1;     // 1 = normalnie, -1 = lustrzane odbicie (patrzy w lewo


    // Stan układu
    this.prevParticles = [];
    this.nextParticles = [];
    this.transition = 1; // 0..1
    this.scrambleTimer = this._rand(this.scrambleMin, this.scrambleMax);

    // Wstępny układ
    this.nextParticles = this._generateLayout();
    this.prevParticles = this._cloneLayout(this.nextParticles);
  }

  // ====== Nadpisania pod prostokąt pamięci ======
  isPlayerNear(player) {
    // dystans do środka prostokąta pamięci
    const cx = this.x + this.bodyWidth / 2;
    const cy = this.y + this.bodyHeight / 2;
    const dx = (player.x + player.width / 2) - cx;
    const dy = (player.y + player.height / 2) - cy;
    return Math.hypot(dx, dy) <= this.activationDistance;
  }

  update(delta, player) {
    // Najpierw logika dialogu z rodzica (wejście ⇒ dialog; wyjście+powrót ⇒ kolejny)
    super.update(delta, player);

    // Scramble animacja zawsze żyje (nawet gdy dialog się skończył)
    this._updateScramble(delta);
  }

  draw(ctx) {
    
    // 0) SPRITE (pod „ciałem pamięci”)
    if (this.spriteImg && this.spriteImg.complete) {
      // Wyśrodkuj sprite na „ciele”, wyrównaj do dołu
      const sx = Math.round(this.x + (this.bodyWidth  - this.spriteW) / 2 + this.spriteOffsetX);
      const sy = Math.round(this.y + (this.bodyHeight - this.spriteH)      + this.spriteOffsetY);

      ctx.save();
      ctx.globalAlpha = this.spriteAlpha;

      if (this.spriteFacing === -1) {
        // Odbicie lustrzane (patrzy w lewo)
        ctx.translate(sx + this.spriteW, sy);
        ctx.scale(-1, 1);
        ctx.drawImage(this.spriteImg, 0, 0, this.spriteW, this.spriteH);
      } else {
        ctx.drawImage(this.spriteImg, sx, sy, this.spriteW, this.spriteH);
      }

      ctx.restore();
    }
    // 1) Ciało „wspomnienia”
    const layout = this._getCurrentLayout();
    const jitterX = (Math.random() * 2 - 1) * this.jitter;
    const jitterY = (Math.random() * 2 - 1) * this.jitter;

    ctx.save();
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    for (const s of layout) {
      const w = Math.max(1, Math.round(s.size));
      const x = Math.round(s.x - w / 2 + jitterX);
      const y = Math.round(s.y - w / 2 + jitterY);
      ctx.fillRect(x, y, w, w);
    }
    ctx.restore();

    // 2) Box dialogowy z wrapem – wyśrodkowany względem prostokąta pamięci
    if (this.visibleText && this.visibleText.length > 0) {
      this._drawDialogBoxCenteredOnBody(ctx);
    }
  }

  // ====== Rysowanie boxa względem bodyWidth/bodyHeight ======
  _drawDialogBoxCenteredOnBody(ctx) {
    ctx.save();
    ctx.font = "8px PixelGosub";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle"; // ważne, żeby linie były optycznie wyśrodkowane
    const centerX = this.x + this.bodyWidth / 2;
    const baselineY = this.y - 6;

    const lines = this.wrapText(ctx, this.visibleText, this.maxTextWidth);

    let maxWidth = 0;
    for (const ln of lines) {
      const w = ctx.measureText(ln).width;
      if (w > maxWidth) maxWidth = w;
    }
    const boxW = Math.ceil(maxWidth) + this.boxPadding * 2;
    const boxH = lines.length * this.lineHeight + this.boxPadding * 2;

    const boxLeft = Math.round(centerX - boxW / 2);
    const boxBottom = baselineY + this.boxPadding;
    const boxTop = Math.round(boxBottom - boxH);

    ctx.fillStyle = "rgba(0,0,0,0.80)";
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 1;
    this.drawRoundedRect(ctx, boxLeft, boxTop, boxW, boxH, 4);

    ctx.fillStyle = "white";
    for (let i = 0; i < lines.length; i++) {
      const fromBottom = (lines.length - 1 - i);
      const y = baselineY - fromBottom * this.lineHeight - (this.lineHeight / 2);
      ctx.fillText(lines[i], centerX, y);
    }
    ctx.restore();
  }

  // ====== Generowanie układu: spatial hash (szybko i bez zacięć) ======
  _rand(min, max) { return min + Math.random() * (max - min); }

  _generateLayout() {
    const list = [];
    // Siatka przyspieszająca testy kolizji: komórka = (maxSize + spacing) / 1
    const cellSize = (this.sizeMax + this.spacing) / 1;
    const invCell = 1 / cellSize;
    const grid = new Map(); // klucz "ix,iy" -> tablica indeksów listy
    const gridKey = (ix, iy) => `${ix},${iy}`;
    const addToGrid = (idx, x, y, half) => {
      const ix = Math.floor((x) * invCell);
      const iy = Math.floor((y) * invCell);
      const key = gridKey(ix, iy);
      if (!grid.has(key)) grid.set(key, []);
      grid.get(key).push(idx);
    };
    const getNeighbors = (x, y) => {
      const ix = Math.floor(x * invCell);
      const iy = Math.floor(y * invCell);
      const res = [];
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const key = gridKey(ix + dx, iy + dy);
          const bucket = grid.get(key);
          if (bucket) res.push(...bucket);
        }
      }
      return res;
    };

    // granice (z overflow)
    const minX = this.x - this.overflow;
    const maxX = this.x + this.bodyWidth + this.overflow;
    const minY = this.y - this.overflow;
    const maxY = this.y + this.bodyHeight + this.overflow;
    let relax = 0; // luzowanie spacingu, jeśli ciasno
    const MAX_PARTICLE_ATTEMPTS = 16; // ograniczamy próby na cząstkę

    for (let i = 0; i < this.particleCount; i++) {
      let placed = false;
      for (let attempt = 0; attempt < MAX_PARTICLE_ATTEMPTS && !placed; attempt++) {
        const size = this._rand(this.sizeMin, this.sizeMax);
        const half = size / 2;
        const x = this._rand(minX + half, maxX - half);
        const y = this._rand(minY + half, maxY - half);
        // sprawdzamy tylko sąsiadów z siatki
        const extra = Math.max(0, this.spacing - relax);
        const nIdx = getNeighbors(x, y);
        let ok = true;
        for (const j of nIdx) {
          const p = list[j];
          if (this._overlapSquares({ x, y, size }, p, extra)) { ok = false; break; }
        }
        if (ok) {
          const idx = list.length;
          list.push({ x, y, size });
          addToGrid(idx, x, y, half);
          placed = true;
        }
        // Po 2/3 prób – lekko luzujemy spacing, żeby nie wisieć
        if (!placed && attempt === Math.floor(MAX_PARTICLE_ATTEMPTS * 2 / 3)) {
          relax += 0.5;
        }
      }
      // Jeśli mimo wszystko nie weszło – trudno, jedziemy dalej (mniej cząstek).
    }
    return list;
  }

  _overlapSquares(a, b, spacing) {
    const ax1 = a.x - a.size / 2, ax2 = a.x + a.size / 2;
    const ay1 = a.y - a.size / 2, ay2 = a.y + a.size / 2;
    const bx1 = b.x - b.size / 2, bx2 = b.x + b.size / 2;
    const by1 = b.y - b.size / 2, by2 = b.y + b.size / 2;
    const s = spacing ?? 0;
    const ax1s = ax1 - s, ax2s = ax2 + s;
    const ay1s = ay1 - s, ay2s = ay2 + s;
    const bx1s = bx1 - s, bx2s = bx2 + s;
    const by1s = by1 - s, by2s = by1 + s;
    const noOverlap = ax2s <= bx1s || bx2s <= ax1s || ay2s <= by1s || by2s <= ay1s;
    return !noOverlap;
  }

  _cloneLayout(list) {
    return list.map(p => ({ x: p.x, y: p.y, size: p.size }));
  }

  _ease(t) {
    // easeInOutQuad
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  _getCurrentLayout() {
    const t = this._ease(Math.max(0, Math.min(1, this.transition)));
    const cur = [];
    const n = Math.min(this.prevParticles.length, this.nextParticles.length);
    for (let i = 0; i < n; i++) {
      const a = this.prevParticles[i];
      const b = this.nextParticles[i];
      cur.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, size: a.size + (b.size - a.size) * t });
    }
    // jeśli nowy układ ma więcej elementów – dorysuj je „od razu”
    for (let i = n; i < this.nextParticles.length; i++) {
      const p = this.nextParticles[i];
      cur.push({ x: p.x, y: p.y, size: p.size });
    }
    return cur;
  }

  _updateScramble(delta) {
    // Odliczanie do kolejnego tasowania
    this.scrambleTimer -= delta;
    if (this.scrambleTimer <= 0) {
      this.prevParticles = this._cloneLayout(this._getCurrentLayout());
      this.nextParticles = this._generateLayout();
      this.transition = 0;
      this.scrambleTimer = this._rand(this.scrambleMin, this.scrambleMax);
    }
    // Interpolacja stare->nowe
    if (this.transition < 1) {
      if (this.fadeDuration > 0) {
        this.transition = Math.min(1, this.transition + delta / this.fadeDuration);
      } else {
        this.transition = 1;
      }
    }
  }
}



// === CUTSCENE: FinalMemoryNPC ===
export class FinalMemoryNPC extends MemoryNPC {
  constructor(x, y, width, height, dialogs, opts = {}) {
    super(x, y, width, height, dialogs, opts);

    // --- SPRITE DUCHA ---
    this.ghostSprite = new Image();
    this.ghostSprite.src = "./sprites/Engel.png";

    // --- FADE-IN (wspólny dla SPRITE + KWADRATY) ---
    const fade = Math.max(0.05, opts.fadeDuration ?? 1.2); 
    this.appearance = 0;
    this.appearanceSpeed = 1 / fade;

    // Po pełnym pojawieniu poczekaj X sekund i dopiero rozpocznij dialog
    this.appearanceDelay = Math.max(0, opts.appearanceDelay ?? 1.0);
    this.afterAppearTimer = 0;

    this.activationDelay = 999999;
    this.autoDialogStarted = false;
    this.particleCount = 13;
    this.fadeDuration = 0.1;
    this.jitter = 0.05;

    // --- PAUZA MIĘDZY ZDANIAMI ---
    if (typeof opts.pauseAfterSentence === "number") {
      this.pauseAfterSentence = opts.pauseAfterSentence; // np. 2.0
    }

    // --- KONTROLA SPRITE’A (rozmiar/kierunek/alpha/przesunięcia) ---
    this.spriteW = opts.spriteWidth  ?? 32;     
    this.spriteH = opts.spriteHeight ?? 32;   
    this.spriteAlpha   = opts.spriteAlpha   ?? 0.18; 
    this.spriteFacing  = opts.spriteFacing  ?? 1;    // 1 = normalnie, -1 = lustrzanie (w prawo↔lewo)
    this.spriteOffsetX = opts.spriteOffsetX ?? 0;   
    this.spriteOffsetY = opts.spriteOffsetY ?? 0;  
  }

  // ZAWSZE „BLISKO” i „STOI” (omijamy bazowe warunki inicjacji)
  isPlayerNear(_)     { return true; }
  isPlayerStanding(_) { return true; }

  update(delta, player) {
    // Utrzymaj mechanikę Memory (scramble, typewriter, wyświetlanie tekstu)
    // (Nie wystartuje dialogu automatycznie, bo activationDelay jest gigantyczny)
    super.update(delta, player);

    // Wspólny fade-in SPRITE + KWADRATY
    if (this.appearance < 1) {
      this.appearance = Math.min(1, this.appearance + this.appearanceSpeed * delta);
    } else {
      // Po pełnym pojawieniu: odlicz pauzę i zacznij dialog (raz)
      if (!this.autoDialogStarted) {
        this.afterAppearTimer += delta;
        if (this.afterAppearTimer >= this.appearanceDelay) {
          this.autoDialogStarted = true;
          this.startNextDialog();
        }
      }
    }

    // „Mów ciągle”: jeśli skończył blok dialogu i nie jest finished, startuj kolejny
    if (!this.dialogInProgress && !this.finished && this.autoDialogStarted) {
      this.startNextDialog();
    }
  }

  draw(ctx) {
    const a = this.appearance;

    // 1) SPRITE (rozmiar i kierunek konfigurowalne)
    if (this.ghostSprite && this.ghostSprite.complete) {
      // Pozycja sprite'a: domyślnie „na dole ciała”, wyśrodkowany w poziomie + offsety
      const sx = Math.round(this.x + (this.bodyWidth - this.spriteW) / 2 + this.spriteOffsetX);
      const sy = Math.round(this.y + (this.bodyHeight - this.spriteH)      + this.spriteOffsetY);

      ctx.save();
      ctx.globalAlpha = this.spriteAlpha * a; // wspólny fade (sprite + kwadraty)

      if (this.spriteFacing === -1) {
        // odbicie lustrzane: rysuj od prawej krawędzi w lewo
        ctx.translate(sx + this.spriteW, sy);
        ctx.scale(-1, 1);
        ctx.drawImage(this.ghostSprite, 0, 0, this.spriteW, this.spriteH);
      } else {
        ctx.drawImage(this.ghostSprite, sx, sy, this.spriteW, this.spriteH);
      }
      ctx.restore();
    }

    // 2) KWADRATY pamięci — ten sam fade (a)
    const layout = this._getCurrentLayout();
    const jitterX = (Math.random() * 2 - 1) * this.jitter;
    const jitterY = (Math.random() * 2 - 1) * this.jitter;

    ctx.save();
    ctx.fillStyle = `rgba(255,255,255,${0.95 * a})`;
    for (const s of layout) {
      const w = Math.max(1, Math.round(s.size));
      const x = Math.round(s.x - w / 2 + jitterX);
      const y = Math.round(s.y - w / 2 + jitterY);
      ctx.fillRect(x, y, w, w);
    }
    ctx.restore();

    // 3) DIALOG (box + tekst) — standard z rodzica
    if (this.visibleText && this.visibleText.length > 0) {
      this._drawDialogBoxCenteredOnBody(ctx);
    }
  }
}