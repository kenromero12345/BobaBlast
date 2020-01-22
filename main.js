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

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

function BobaWalkLeft(game, spritesheet) {
    this.animation = new Animation(spritesheet, 0, 0, 65, 95, 4, 0.20, 4, true, 1, false);
    this.x = 600;
    this.y = 0;
    this.speed = 100;
    this.game = game;
    this.ctx = game.ctx;
}

BobaWalkLeft.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

BobaWalkLeft.prototype.update = function () {
    if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
        this.x -= this.game.clockTick * this.speed;
    if (this.x < -230) this.x = 800;
}

function BobaRunLeft(game, spritesheet) {
    this.animation = new Animation(spritesheet, 0, 100, 72, 85, 5, 0.18, 5, true, 1, false);
    this.x = 600;
    this.y = 100;
    this.speed = 200;
    this.game = game;
    this.ctx = game.ctx;
}

BobaRunLeft.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

BobaRunLeft.prototype.update = function () {
    if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
        this.x -= this.game.clockTick * this.speed;
    if (this.x < -230) this.x = 800;
}

function BobaDisappearLeft(game, spritesheet) {
    this.animation = new Animation(spritesheet, 0, 560, 74, 85, 6, 0.18, 6, true, 1, false);
    this.x = 0;
    this.y = 200;
    this.speed = 150;
    this.game = game;
    this.ctx = game.ctx;
}

BobaDisappearLeft.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

BobaDisappearLeft.prototype.update = function () {
    // if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
    //     this.x -= this.game.clockTick * this.speed;
    // if (this.x < -230) this.x = 800;
}

function BobaRunRight(game, spritesheet) {
	this.animation = new Animation(spritesheet, 678, 100, 72, 85, 5, 0.18, 5, true, 1, true);
    this.x = 0;
    this.y = 300;
    this.speed = 200;
    this.game = game;
    this.ctx = game.ctx;
}

BobaRunRight.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

BobaRunRight.prototype.update = function () {
    if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
        this.x += this.game.clockTick * this.speed;
    if (this.x > 800) this.x = -230;
}

function BobaWalkRight(game, spritesheet) {
	this.animation = new Animation(spritesheet, 785, 0, 65, 95, 4, 0.20, 4, true, 1, true);
    this.x = 600;
    this.y = 400;
    this.speed = 100;
    this.game = game;
    this.ctx = game.ctx;
}

BobaWalkRight.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

BobaWalkRight.prototype.update = function () {
	if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
        this.x += this.game.clockTick * this.speed;
    if (this.x > 800) this.x = -230;
}

function BobaWalkUpLookLeft(game, spritesheet) {
    this.animation = new Animation(spritesheet, 0, 0, 65, 95, 4, 0.20, 4, true, 1, false);
    this.x = 600;
    this.y = 600;
    this.speed = 100;
    this.game = game;
    this.ctx = game.ctx;
}

BobaWalkUpLookLeft.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

BobaWalkUpLookLeft.prototype.update = function () {
    if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
        this.y -= this.game.clockTick * this.speed;
    if (this.y < -230) this.y = 800;
}

function BobaWalkDownLookLeft(game, spritesheet) {
    this.animation = new Animation(spritesheet, 0, 0, 65, 95, 4, 0.20, 4, true, 1, false);
    this.x = 500;
    this.y = 0;
    this.speed = 100;
    this.game = game;
    this.ctx = game.ctx;
}

BobaWalkDownLookLeft.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

BobaWalkDownLookLeft.prototype.update = function () {
    if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
        this.y += this.game.clockTick * this.speed;
    if (this.y > 800) this.y = -230;
}

function BobaRunUpLookLeft(game, spritesheet) {
    this.animation = new Animation(spritesheet, 0, 100, 72, 85, 5, 0.18, 5, true, 1, false);
    this.x = 100;
    this.y = 600;
    this.speed = 200;
    this.game = game;
    this.ctx = game.ctx;
}

BobaRunUpLookLeft.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

BobaRunUpLookLeft.prototype.update = function () {
    if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
        this.y -= this.game.clockTick * this.speed;
    if (this.y < -230) this.y = 800;
}

function BobaRunDownLookLeft(game, spritesheet) {
    this.animation = new Animation(spritesheet, 0, 100, 72, 85, 5, 0.18, 5, true, 1, false);
    this.x = 200;
    this.y = 0;
    this.speed = 200;
    this.game = game;
    this.ctx = game.ctx;
}

BobaRunDownLookLeft.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

BobaRunDownLookLeft.prototype.update = function () {
    if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
        this.y += this.game.clockTick * this.speed;
    if (this.y > 800) this.y = -230;
}

function BobaWalkUpLookRight(game, spritesheet) {
	this.animation = new Animation(spritesheet, 785, 0, 65, 95, 4, 0.20, 4, true, 1, true);
    this.x = 600;
    this.y = 400;
    this.speed = 100;
    this.game = game;
    this.ctx = game.ctx;
}

BobaWalkUpLookRight.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

BobaWalkUpLookRight.prototype.update = function () {
	if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
        this.y -= this.game.clockTick * this.speed;
    if (this.y < -230) this.y = 800;
}

function BobaWalkDownLookRight(game, spritesheet) {
	this.animation = new Animation(spritesheet, 785, 0, 65, 95, 4, 0.20, 4, true, 1, true);
    this.x = 600;
    this.y = 0;
    this.speed = 100;
    this.game = game;
    this.ctx = game.ctx;
}

BobaWalkDownLookRight.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

BobaWalkDownLookRight.prototype.update = function () {
	if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
        this.y += this.game.clockTick * this.speed;
    if (this.y > 800) this.y = -230;
}

function BobaRunDownLookRight(game, spritesheet) {
	this.animation = new Animation(spritesheet, 678, 100, 72, 85, 5, 0.18, 5, true, 1, true);
    this.x = 300;
    this.y = 0;
    this.speed = 200;
    this.game = game;
    this.ctx = game.ctx;
}

BobaRunDownLookRight.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

BobaRunDownLookRight.prototype.update = function () {
	if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
        this.y += this.game.clockTick * this.speed;
    if (this.y > 800) this.y = -230;
}

function BobaRunUpLookRight(game, spritesheet) {
	this.animation = new Animation(spritesheet, 678, 100, 72, 85, 5, 0.18, 5, true, 1, true);
    this.x = 300;
    this.y = 0;
    this.speed = 200;
    this.game = game;
    this.ctx = game.ctx;
}

BobaRunUpLookRight.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

BobaRunUpLookRight.prototype.update = function () {
	if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
        this.y -= this.game.clockTick * this.speed;
    if (this.y < -230) this.y = 800;
}

function BobaDisappearRight(game, spritesheet) {
    this.animation = new Animation(spritesheet, 593, 560, 74, 85, 6, 0.18, 6, true, 1, true);
    this.x = 200;
    this.y = 200;
    this.speed = 150;
    this.game = game;
    this.ctx = game.ctx;
}

BobaDisappearRight.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

BobaDisappearRight.prototype.update = function () {
    // if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
    //     this.x -= this.game.clockTick * this.speed;
    // if (this.x < -230) this.x = 800;
}

AM.queueDownload("./img/22137.png");
AM.queueDownload("./img/22137Flip.png");
AM.queueDownload("./img/greenTea.png");
AM.queueDownload("./img/greenTeaFlip.png");
AM.queueDownload("./img/yellowTea.png");
AM.queueDownload("./img/yellowTeaFlip.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

	// gameEngine.addEntity(new BobaWalkLeft(gameEngine, AM.getAsset("./img/22137.png")));
	// gameEngine.addEntity(new BobaRunLeft(gameEngine, AM.getAsset("./img/22137.png")));
	// gameEngine.addEntity(new BobaDisappearLeft(gameEngine, AM.getAsset("./img/22137.png")));
	// gameEngine.addEntity(new BobaRunRight(gameEngine, AM.getAsset("./img/22137Flip.png")));
	// gameEngine.addEntity(new BobaWalkRight(gameEngine, AM.getAsset("./img/22137Flip.png")));

	// gameEngine.addEntity(new BobaDisappearRight(gameEngine, AM.getAsset("./img/22137Flip.png")));
	// gameEngine.addEntity(new BobaWalkUpLookLeft(gameEngine, AM.getAsset("./img/22137.png")));
	// gameEngine.addEntity(new BobaRunUpLookLeft(gameEngine, AM.getAsset("./img/22137.png")));
	// gameEngine.addEntity(new BobaWalkUpLookRight(gameEngine, AM.getAsset("./img/22137Flip.png")));
	// gameEngine.addEntity(new BobaRunUpLookRight(gameEngine, AM.getAsset("./img/22137Flip.png")));
	// gameEngine.addEntity(new BobaRunDownLookLeft(gameEngine, AM.getAsset("./img/22137.png")));
	// gameEngine.addEntity(new BobaWalkDownLookLeft(gameEngine, AM.getAsset("./img/22137.png")));
	// gameEngine.addEntity(new BobaRunDownLookRight(gameEngine, AM.getAsset("./img/22137Flip.png")));
    // gameEngine.addEntity(new BobaWalkDownLookRight(gameEngine, AM.getAsset("./img/22137Flip.png")));
    gameEngine.addEntity(new redTea(gameEngine, -50, 250));
    gameEngine.addEntity(new greenTea(gameEngine, -50, 250));
    gameEngine.addEntity(new yellowTea(gameEngine, -50, 250));
    console.log("All Done!");
});

var GAMEBOARD = [];

  for(var i = 0; i < 10; i++) {
    GAMEBOARD.push([]);
    for(var j = 0; j < 10; j++) {
      GAMEBOARD[i].push({
        block: false
      });
    }
  }

  function drawRect(ctx, x,y,w,h) {
    // console.log("paint")
    ctx.strokeStyle = "green";
    ctx.rect(x,y,w,h);
    ctx.stroke();
  }

  function drawDebug() {
    for(var i = 0; i < 26; i++) {
      for(var j = 0; j < 29; j++) {
        drawRect(i,j);
      }
    }
  }

    // function getGameboardXYToCanvasXY(x, y) {
    //     var i = Math.floor((x - BUBBLES_X_START + BUBBLES_GAP/2)/BUBBLES_GAP);
    //     var j = Math.floor((y - BUBBLES_Y_START + 9)/17.75);
    
    //     return {x: i, y: j}
    // }

    // function getCanvasXYToGameboardXY(x, y) {
    //     var i = Math.floor((x - BUBBLES_X_START + BUBBLES_GAP/2)/BUBBLES_GAP);
    //     var j = Math.floor((y - BUBBLES_Y_START + 9)/17.75);
    
    //     return {x: i, y: j}
    // }