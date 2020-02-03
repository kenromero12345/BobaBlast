function PlayGame(game) {
    this.game = game;
    this.ctx = game.ctx;
}

PlayGame.prototype.reset = function () {
    this.game.running = false;
}
PlayGame.prototype.update = function () {
    if (this.game.click) {
        // console.log("I CLICKED SCREEN");
        this.game.running = true;
    }
}

PlayGame.prototype.draw = function () {
    var ctx = this.ctx;
    if (!this.game.running) {
        ctx.font = "24pt Impact";
        ctx.fillStyle = "yellow";
        ctx.fillText("Click to Play!", 300, 350);
        ctx.fillText("Click on a tower then click on the tile you want to place it on", 100, 380);
    }
}