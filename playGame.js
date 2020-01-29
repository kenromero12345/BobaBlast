function PlayGame(game) {
    this.game = game;
    this.ctx = game.ctx;
}

PlayGame.prototype.reset = function () {
    this.game.running = false;
}
PlayGame.prototype.update = function () {
    if (this.game.click) {
        console.log("I CLICKED SCREEN");
        this.game.running = true;
    }
}

PlayGame.prototype.draw = function () {
    var ctx = this.ctx;
    if (!this.game.running) {
        ctx.font = "24pt Impact";
        ctx.fillStyle = "purple";
        if (this.game.mouse) {
            ctx.fillText("Click to Play!", 300, 300);
        }
    }
}