var gameStarted = false; 

function PlayGame(game) {
    this.game = game;
    this.ctx = game.ctx;
    this.buttonStartX = 400;
    this.buttonStartY = 400;
    this.buttonWidth = 400;
    this.buttonHeight = 100;
    this.startButtonColor = "black";
    this.textButtonColor = "white";
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
    ctx.save();
    ctx.globalAlpha = 0.80;
    if (!this.game.running && !gameStarted) {
        ctx.fillStyle = "white";
        ctx.fillRect(0,0,1200,900);
        ctx.restore();
        ctx.fillStyle = "black";
        ctx.font = '70px Bahnschrift SemiBold';
        ctx.fillText("B", 100, 200);
        ctx.font = '55px Bahnschrift Light';
        ctx.fillText("OBA", 150, 200);
        ctx.font = '70px Bahnschrift SemiBold';
        ctx.fillText("B", 260, 200);
        ctx.font = '55px Bahnschrift Light';
        ctx.fillText("LAST", 305, 200);
        ctx.font = '20px Bahnschrift Light';
        ctx.fillText("Our food has come to life and started attacking and we only have boba to stop them!", 100, 250);
        ctx.fillText("Luckly we have been trying a brand new technology to shoot boba!", 100, 275);
        // ctx.fillStyle = "red";
        ctx.fillText("Click to place shooters and create a maze to stop the evil food before they get us!!", 100, 305);
        this.createStartGameButton();
    } else if (paused) {
        ctx.fillStyle = "white";
        ctx.fillRect(0,0,900,900);
    }
    ctx.restore();
}

PlayGame.prototype.update = function () {
    if (!this.game.running && !gameStarted) {
        if(this.game.mouse) {
            var mouse = this.game.mouse;
            if(mouse.x < this.buttonStartX + this.buttonWidth + 10 && mouse.x >= this.buttonStartX 
                && mouse.y < this.buttonStartY + this.buttonHeight && mouse.y >= this.buttonStartY) {
                    this.startButtonColor = "green";
                    this.textButtonColor = "white";
            } else {
                this.startButtonColor = "black";
                this.textButtonColor = "white";
            }
        }
        if(this.game.click) {
            var click = this.game.click;
            if(click.x < this.buttonStartX + this.buttonWidth + 10 && click.x >= this.buttonStartX 
                && click.y < this.buttonStartY + this.buttonHeight && click.y >= this.buttonStartY) {
                    gameStarted = true;
                    gameOverLose = false;
                    audio.play();
                }
        }
    }
}

PlayGame.prototype.createStartGameButton = function () {

    var x = this.buttonStartX;
    var y = this.buttonStartY;
    var w = this.buttonWidth;
    var h = this.buttonHeight;
    var ctx = this.ctx;
    ctx.fillStyle = this.startButtonColor;
    ctx.fillRect(x,y,w,h);
    ctx.fillStyle = this.textButtonColor;
    ctx.font = '30px Bahnschrift Light';
    ctx.fillText("S", this.buttonStartX + 105, this.buttonStartY + 60  );
    ctx.font = '26px Bahnschrift Light';
    ctx.fillText("TART", this.buttonStartX + 125, this.buttonStartY + 60  );
    ctx.font = '30px Bahnschrift Light';
    ctx.fillText("G", this.buttonStartX + 190, this.buttonStartY + 60  );
    ctx.font = '26px Bahnschrift Light';
    ctx.fillText("AME", this.buttonStartX + 210, this.buttonStartY + 60  );
}