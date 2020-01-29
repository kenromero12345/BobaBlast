var AM = new AssetManager();

function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale, flip) {
    this.spriteSheet = spriteSheet;
	this.startX = startX;
	this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
	this.flip = flip
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (!(this.isDone() && !this.loop)) {
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    //xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);
	if (this.flip) {
		xindex = this.sheetWidth - 1 -frame % this.sheetWidth;
	} else {
		xindex = frame % this.sheetWidth;
	}
    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth + this.startX, yindex * this.frameHeight + this.startY,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
    }
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    // console.log(this.elapsedTime >= this.totalTime);
    return (this.elapsedTime >= this.totalTime);
}

AM.queueDownload("./img/22137.png");
AM.queueDownload("./img/22137Flip.png");
AM.queueDownload("./img/greenTea.png");
AM.queueDownload("./img/greenTeaFlip.png");
AM.queueDownload("./img/yellowTea.png");
AM.queueDownload("./img/yellowTeaFlip.png");
// AM.queueDownload("./img/origTea.png");
// AM.queueDownload("./img/origTeaFlip.png");
AM.queueDownload("./img/background.png");
AM.queueDownload("./img/holder.png");
AM.queueDownload("./img/towerG2.png");
AM.queueDownload("./img/towerR2.png");
AM.queueDownload("./img/towerY2.png");

  

function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
}

Background.prototype.draw = function() {
    this.ctx.drawImage(this.spritesheet, this.x, this.y);
}

Background.prototype.update = function() {

}

// var GAMEBOARD = [];
AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();
    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/background.png")));
    // board = new function() {
    //     new board(gameEngine);
    // } 
    // GAMEBOARD = board.GAMEBOARD;
    // gameEngine.addEntity(board);
    gameEngine.addEntity(new board(gameEngine));
    gameEngine.addEntity(new redTea(gameEngine, -50, 250, false));
    sleep(2000).then(() => {
        gameEngine.addEntity(new greenTea(gameEngine, -50, 250, false));
    })
    sleep(8000).then(() => {
        gameEngine.addEntity(new yellowTea(gameEngine, -50, 250, true));
    })
    
    gameEngine.addEntity(new display(gameEngine, this.generateGenericTowers(gameEngine)));

    console.log("All Done!");
});

function generateGenericTowers(game) {
    var firstTower = new tower(game, "Tower 1", 300, "The Kobe tower \ncan shoot 3 bobas \nevery second.",AM.getAsset("./img/towerG2.png"));
    var secondTower = new tower(game, "Tower 2", 300, "The Kobe tower \ncan shoot 3 bobas \nevery second.",AM.getAsset("./img/towerR2.png"));
    var thirdTower = new tower(game, "Tower 3", 300, "The Kobe tower \ncan shoot 3 bobas \nevery second.",AM.getAsset("./img/towerY2.png"));
    var fourthTower = new tower(game, "Tower 4", 300, "The Kobe tower \ncan shoot 3 bobas \nevery second.",AM.getAsset("./img/holder.png"));
    var fifthTower = new tower(game, "Tower 5", 300, "The Kobe tower \ncan shoot 3 bobas \nevery second.",AM.getAsset("./img/holder.png"));
    var sixthTower = new tower(game, "Tower 6", 300, "The Kobe tower \ncan shoot 3 bobas \nevery second.",AM.getAsset("./img/holder.png"));
    var seventhTower = new tower(game, "Tower 7", 300, "The Kobe tower \ncan shoot 3 bobas \nevery second.",AM.getAsset("./img/holder.png"));
    var eightTower = new tower(game, "Tower 8", 300, "The Kobe tower \ncan shoot 3 bobas \nevery second.",AM.getAsset("./img/holder.png"));
    var ninthTower = new tower(game, "Tower 9", 300, "The Kobe tower \ncan shoot 3 bobas \nevery second.",AM.getAsset("./img/holder.png"));
    
    var temp = [[firstTower, secondTower, thirdTower],[fourthTower,fifthTower,sixthTower],[seventhTower,eightTower,ninthTower]];
    return temp;
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }