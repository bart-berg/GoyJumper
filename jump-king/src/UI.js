const menuImage = new Image();
menuImage.src = "./soy.jpg";

export const UI = {
    drawMenu(ctx, canvas, scale, offsetX, offsetY) {
        ctx.fillStyle = "#111";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        ctx.translate(offsetX, offsetY);
        ctx.scale(scale, scale);

        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, 480, 360);

        if (menuImage.complete) {
            ctx.drawImage(menuImage, 40, 50, 70, 140);
            ctx.drawImage(menuImage, 370, 50, 70, 140);
        }

        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";

        ctx.fillText("GOY JUMPER", 240, 80);
        ctx.fillText("PRESS ENTER", 240, 140);
        ctx.fillText("TO START", 240, 165);

        ctx.restore();
    },

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

        ctx.fillStyle = "white";
        ctx.font = "bold 13px 'Courier New', monospace";
        ctx.textAlign = "left";
        ctx.fillText("NEW GAME", 45, 65);

        // Statystyki
        ctx.font = "11px 'Courier New', monospace";
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

    drawHUD(ctx, player, scale, offsetX, offsetY) {
        ctx.save();
        ctx.translate(offsetX, offsetY);
        ctx.scale(scale, scale);

        ctx.fillStyle = "white";
        ctx.font = "14px monospace";
        ctx.textAlign = "left";
        ctx.fillText(player.formatTime(player.playTime), 10, 20);

        ctx.restore();
    },

    drawBox(ctx, x, y, w, h) {
        ctx.fillStyle = "black";
        ctx.fillRect(x, y, w, h);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, w, h);
        ctx.strokeStyle = "#333";
        ctx.strokeRect(x + 3, y + 3, w - 6, h - 6);
    }
};