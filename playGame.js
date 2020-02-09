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
        //this.game.running = true;
    }
}

PlayGame.prototype.draw = function () {
    var ctx = this.ctx;
    if (!this.game.running) {
        ctx.font = "16pt Calibri";
        ctx.fillStyle = "white";
       // ctx.fillRect(0,0,900,900);
        ctx.fillStyle = "black";
        ctx.fillText("In this prototype, we have the following features incorporated:", 50, 130);
        ctx.fillText("Click to play functionality. Green tea, red tea, ice golem animations. ", 50, 160);
        ctx.fillText("Collision detection and death animated for the teas. Collision detection for ice golem. ", 50, 190);
        ctx.fillText("Boba is animated and a few random bobas are shown flying on the board.", 50, 220);
        ctx.fillText("Display on right keeping track of score and lives remaining (filler values used for now) ", 50, 250);
        ctx.fillText("Boba store. Allows user to hover over a tower and view description, price, and name.", 50, 280);
        ctx.fillText("Boba store also allows user to click on the tower. After clicking, user can place the tower on the board.", 50, 310);
        ctx.fillText("When placing the tower on the board, a hover over effect is also displayed on the board.", 50, 340);
        ctx.fillText("Start Round button is a placeholder, does not do anything yet.", 50, 370);
        ctx.fillText("Algorithm created for teas to find shortest path to the end.", 50, 400);
        ctx.fillText("Algorithm created to prevent user from blocking an exit when placing towers.", 50, 430);
        ctx.font = "25pt Impact";
        ctx.fillText("Click to Play!", 200, 500);
    }
}