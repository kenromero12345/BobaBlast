var AM = new AssetManager();
var gameStarted = false;

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
AM.queueDownload("./img/iceg.png");
AM.queueDownload("./img/icegFlip.png");
AM.queueDownload("./img/cola.png");
AM.queueDownload("./img/colaFlip.png");
  

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
    gameEngine.addEntity(new redTea(gameEngine, -50, 250, false, .75));
    gameEngine.addEntity(new iceGolem(gameEngine, -50, 250, .6));
    gameEngine.addEntity(new cola(gameEngine, -50, 250, 1));
    sleep(2000).then(() => {
        gameEngine.addEntity(new greenTea(gameEngine, -50, 250, false, .75));
    })
    sleep(8000).then(() => {
        gameEngine.addEntity(new yellowTea(gameEngine, -50, 250, true, .75));
    })

    // BOBA BULLET TESTING
    gameEngine.addEntity(new boba(gameEngine,500, 500, 300, 350));

    sleep(8000).then(() => {
        gameEngine.addEntity(new boba(gameEngine,500, 500, 300, 350));
    })

    sleep(10000).then(() => {
        gameEngine.addEntity(new boba(gameEngine,500, 500, 200, 200));
    })

    sleep(11000).then(() => {
        gameEngine.addEntity(new boba(gameEngine,100, 100, 200, 200));
    })

    sleep(8000).then(() => {
        gameEngine.addEntity(new boba(gameEngine,0, 500, 900, 50));
    })
    
    gameEngine.addEntity(new display(gameEngine, this.generateGenericTowers(gameEngine)));

    console.log("All Done!");

    var pg = new PlayGame(gameEngine);
    gameEngine.addEntity(pg);

    gameEngine.running = false;
});

function generateGenericTowers(game) {
    var firstTower = new tower(game, "Tower 1", 300, "Tower 1 \ncan shoot 3 bobas \nevery second.",AM.getAsset("./img/towerG2.png"));
    var secondTower = new tower(game, "Tower 2", 320, "Tower 2 \ncan shoot 5 bobas \nevery second.",AM.getAsset("./img/towerR2.png"));
    var thirdTower = new tower(game, "Tower 3", 400, "Tower 3 \ncan shoot 10 bobas \nevery second.",AM.getAsset("./img/towerY2.png"));
    var fourthTower = new tower(game, "Tower 4", 500, "Tower 4 \ncan shoot 30 bobas \nevery second.",AM.getAsset("./img/holder.png"));
    var fifthTower = new tower(game, "Tower 5", 200, "Tower 5 \ncan shoot 2 bobas \nevery second.",AM.getAsset("./img/holder.png"));
    var sixthTower = new tower(game, "Tower 6", 100, "Tower 6 \ncan shoot 1 boba \nevery second.",AM.getAsset("./img/holder.png"));
    var seventhTower = new tower(game, "Tower 7", 1000, "Tower 7 \ncan shoot 15 bobas \nevery second.",AM.getAsset("./img/holder.png"));
    var eightTower = new tower(game, "Tower 8", 2000, "Tower 8 \ncan shoot 20 bobas \nevery second.",AM.getAsset("./img/holder.png"));
    var ninthTower = new tower(game, "Tower 9", 2200, "Tower 9 \ncan shoot 21 bobas \nevery second.",AM.getAsset("./img/holder.png"));
    
    var temp = [[firstTower, secondTower, thirdTower],[fourthTower,fifthTower,sixthTower],[seventhTower,eightTower,ninthTower]];
    return temp;
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }