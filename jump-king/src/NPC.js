export class NPC {
  constructor(x, y, size, dialogs) {
    this.x = x;
    this.y = y;
    this.size = size;

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

    // ---- AKTYWACJA ----
    this.activationDistance = 35;
    this.playerWasNear = false;
  }


  isPlayerNear(player) {
    const dx = player.x + player.width / 2 - (this.x + this.size / 2);
    const dy = player.y + player.height / 2 - (this.y + this.size / 2);
    return Math.sqrt(dx * dx + dy * dy) <= this.activationDistance;
  }


  tryStartDialog(player) {
    if (this.finished) return;
    if (this.dialogInProgress) return;
    if (this.dialogs.length === 0) {
      this.finished = true;
      return;
    }

    const near = this.isPlayerNear(player);

    // START tylko gdy gracz PODSZEDŁ (false -> true)
    if (near && !this.playerWasNear) {
      this.startNextDialog();
    }

    this.playerWasNear = near;
  }

  startNextDialog() {
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

    this.tryStartDialog(player);
    if (!this.dialogInProgress) return;

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


  draw(ctx) {
    // NPC
    ctx.fillStyle = "#6a5acd";
    ctx.fillRect(this.x, this.y, this.size, this.size);

    if (this.visibleText.length > 0) {
      ctx.font = "8px PixelGosub";
      ctx.textAlign = "center";

      const textX = this.x + this.size / 2;
      const textY = this.y - 6;
      const padding = 4;
      const w = ctx.measureText(this.visibleText).width + padding * 2;

      ctx.fillStyle = "rgba(0,0,0,0.75)";
      ctx.fillRect(textX - w / 2, textY - 16, w, 18);

      ctx.fillStyle = "white";
      ctx.fillText(this.visibleText, textX, textY - 4);
    }
  }
}
