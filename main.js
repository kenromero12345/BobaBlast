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
    this.flip = flip;
    this.offsetY = 0;
    this.offsetX = 0;
    if (this.frameWidth < 0 ) {
        this.reverse = true;
    } else {
        this.reverse = false;
    }
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    // if(this.currentFrame() != 2){
        this.elapsedTime += tick;
    // }
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
    if (this.reverse) {
        x -= this.frameWidth * .75;
    }
    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth + this.startX, yindex * this.frameHeight + this.startY,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x + this.offsetX, y + this.offsetY,
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
AM.queueDownload("./img/tower.png");
AM.queueDownload("./img/towerG.png");
AM.queueDownload("./img/towerR.png");
AM.queueDownload("./img/towerY.png");
AM.queueDownload("./img/iceg.png");
AM.queueDownload("./img/icegFlip.png");
AM.queueDownload("./img/cola.png");
AM.queueDownload("./img/colaFlip.png");
AM.queueDownload("./img/slime.png");
AM.queueDownload("./img/slimeFlip.png");
AM.queueDownload("./img/watermelon.png");
AM.queueDownload("./img/watermelonFlip.png");
AM.queueDownload("./img/miniCake.png");
AM.queueDownload("./img/miniCakeFlip.png");
AM.queueDownload("./img/biscuitWarrior.png");
AM.queueDownload("./img/biscuitWarriorFlip.png");
AM.queueDownload("./img/cakeChoco.png");
AM.queueDownload("./img/cakeChocoFlip.png");
AM.queueDownload("./img/sprite.png");
AM.queueDownload("./img/spriteFlip.png");
AM.queueDownload("./img/cake.png");
AM.queueDownload("./img/cakeFlip.png");
AM.queueDownload("./img/bigCake.png");
AM.queueDownload("./img/bigCakeFlip.png");
AM.queueDownload("./img/pumpkinGood.png");
AM.queueDownload("./img/pumpkinGoodFlip.png");
AM.queueDownload("./img/pumpkinEvil.png");
AM.queueDownload("./img/pumpkinEvilFlip.png");

function Background(game, spritesheet) {
    this.isEnemy = false;
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

    gameEngine.addEntity(new roundPlan(gameEngine));

    // BOBA BULLET TESTING
    gameEngine.addEntity(new display(gameEngine));
    towerArray = generateStoreTowers(gameEngine);


    console.log("All Done!");

    var pg = new PlayGame(gameEngine);
    gameEngine.addEntity(pg);

    gameEngine.running = false;
});

function generateStoreTowers(game) {
    var firstTower = new storeTower(game, "Seattle", 100, 1000, 150, "Seattle Tower \ncan shoot one boba per second.",AM.getAsset("./img/tower.png"), 945, 200, 70,70,0,0);
    var secondTower = new storeTower(game, "Portland", 250, 250, 300, "Portland Tower \ncan shoot 4 bobas \nevery second.",AM.getAsset("./img/towerG.png"), 1015, 200, 70, 70,1,0);
    var thirdTower = new storeTower(game, "Los Angeles", 500, 100, 300,"Los Angeles Tower \ncan shoot 10 bobas \nevery second.",AM.getAsset("./img/towerR.png"), 1085, 200, 70,70,2,0);
    var fourthTower = new storeTower(game, "San Diego", 1000, 50, 500, "San Diego Tower \ncan shoot 20 bobas \nevery second.",AM.getAsset("./img/towerY.png"), 945, 270, 70,70,0,1);
    var fifthTower = new storeTower(game, "Tower 5", 200, 1000, 150, "Tower 5 \ncan shoot 2 bobas \nevery second.",AM.getAsset("./img/holder.png"), 1015, 270, 70,70,1,1);
    var sixthTower = new storeTower(game, "Tower 6", 100, 1000, 150, "Tower 6 \ncan shoot 1 boba \nevery second.",AM.getAsset("./img/holder.png"), 1085, 270, 70,70,2,1);
    var seventhTower = new storeTower(game, "Tower 7", 1000, 1000, 150,"Tower 7 \ncan shoot 15 bobas \nevery second.",AM.getAsset("./img/holder.png"), 945, 340,70,70,0,2);
    var eightTower = new storeTower(game, "Tower 8", 2000, 1000, 150, "Tower 8 \ncan shoot 20 bobas \nevery second.",AM.getAsset("./img/holder.png"), 1015, 340,70,70,1,2);
    var ninthTower = new storeTower(game, "Tower 9", 2200, 1000, 150,"Tower 9 \ncan shoot 21 bobas \nevery second.",AM.getAsset("./img/holder.png"), 1085, 340,70,70,2,2);

    var temp = [[firstTower, secondTower, thirdTower],[fourthTower,fifthTower,sixthTower],[seventhTower,eightTower,ninthTower]];
    for(var i = 0; i < 3; i++) {
        for(var j = 0; j < 3; j++) {
            game.addEntity(temp[i][j]);
        }
    }
    return temp;
}

//sleep in some milliseconds
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

// make other js be off if this is true
var boxesOff = true;

// if there is no enemy when the last enemy is spawned
// means round is done, round ++, (round starts at 1)
//if round is 5, you win, game over
// else game over, you lose


 // gameEngine.addEntity(new bigCake(gameEngine, -50, 350, .25));
    // gameEngine.addEntity(new pumpkinEvil(gameEngine, -50, 350, .75));
    // gameEngine.addEntity(new pumpkinGood(gameEngine, -50, 350, .75));
    // gameEngine.addEntity(new redTea(gameEngine, -50, 350, false, .75));

    // gameEngine.addEntity(new iceGolem(gameEngine, -50, 350));
    // gameEngine.addEntity(new cola(gameEngine, -50, 350, .85, false));
    // // gameEngine.addEntity(new slime(gameEngine, 450, 250, .75, 1));//450//250
    // gameEngine.addEntity(new slime(gameEngine, -50, 350, .75));//450//250
    // gameEngine.addEntity(new watermelon(gameEngine, -50, 350, .75));
    // gameEngine.addEntity(new miniCake(gameEngine, -50, 350, .75));
    // gameEngine.addEntity(new biscuit(gameEngine, -50, 350, .75));
    // gameEngine.addEntity(new cakeChoco(gameEngine, -50, 350, .75));
    // gameEngine.addEntity(new cake(gameEngine, -50, 350, .75));
    // // gameEngine.addEntity(new squareSlime(gameEngine, -50, 350, .75));
    // sleep(2000).then(() => {
    //     gameEngine.addEntity(new greenTea(gameEngine, -50, 350, false, .75));
    //     gameEngine.addEntity(new slime(gameEngine, -50, 350, .75, 10));//450//250
    // })
    // sleep(4000).then(() => {
    //     gameEngine.addEntity(new slime(gameEngine, -50, 350, .75, 7));//450//250
    //     gameEngine.addEntity(new cola(gameEngine, -50, 350, .85, true));
    // })
    // sleep(6000).then(() => {
    //     gameEngine.addEntity(new slime(gameEngine, -50, 350, .75, 8));//450//250
    // })
    // sleep(8000).then(() => {
    //     gameEngine.addEntity(new yellowTea(gameEngine, -50, 350, true, .75));
    //     gameEngine.addEntity(new slime(gameEngine, -50, 350, .75, 5));//450//250
    // })
    // sleep(10000).then(() => {
    //     gameEngine.addEntity(new slime(gameEngine, -50, 350, .75, 4));//450//250
    // })
    // sleep(12000).then(() => {
    //     gameEngine.addEntity(new slime(gameEngine, -50, 350, .75, 3));//450//250
    // })
    // sleep(14000).then(() => {
    //     gameEngine.addEntity(new slime(gameEngine, -50, 350, .75, 0));//450//250
    // })
    // sleep(16000).then(() => {
    //     gameEngine.addEntity(new slime(gameEngine, -50, 350, .75, 2));//450//250
    // })
    // sleep(18000).then(() => {
    //     gameEngine.addEntity(new slime(gameEngine, -50, 350, .75, 1));//450//250
    // })
    // sleep(20000).then(() => {
    //     gameEngine.addEntity(new slime(gameEngine, -50, 350, .75, 9));//450//250
    // })
