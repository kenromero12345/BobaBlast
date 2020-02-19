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
    if(this.currentFrame() != 5){
        this.elapsedTime += tick;
    }
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
        x -= this.frameWidth;
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

AM.queueDownload("./img/towerY.png");

function Test(game){
    this.fullTurn = new Animation(ASSET_MANAGER.getAsset("./img/towerY.png")
    ,0 ,20 ,480, 480, 4, 0.4, 8, true, 0.15);
    //down up
    this.r28 = new Animation(ASSET_MANAGER.getAsset("./img/towerY.png")
    ,0 ,20 ,480, 480, 4, 0.4, 5, true, 0.15);
    //up down
    this.r82 = new Animation(ASSET_MANAGER.getAsset("./img/towerY.png")
    ,0 ,20 ,480, 480, 4, 0.4, 5, true, 0.15, true);
    //right left
    this.l64 = new Animation(ASSET_MANAGER.getAsset("./img/towerY.png")
    ,960 ,20 ,480, 480, 4, 0.4, 5, true, 0.15);
    //left right
    this.r46 = new Animation(ASSET_MANAGER.getAsset("./img/towerY.png")
    ,960 ,20 ,480, 480, 4, 0.4, 5, true, 0.15, true);
    // this.animation = new Animation(ASSET_MANAGER.getAsset("./img/towerY.png")
    // ,0 ,20 ,480, 480, 0.4, 8, true);
    
    Entity.call(this, game, 100,100);
}

Test.prototype = new Entity();
Test.prototype.constructor = Test;

Test.prototype.update = function(){
}

Test.prototype.draw = function (ctx) {
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y); 
    Entity.prototype.draw.call(this);
}

ASSET_MANAGER.downloadAll(function () {
    console.log("starting dl");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    var test = new Test(gameEngine)

    gameEngine.addEntity(test);

    gameEngine.init(ctx);
    gameEngine.start();
});