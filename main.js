var AM = new AssetManager();

function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
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
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

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

function BobaWalk(game, spritesheet) {
    this.animation = new Animation(spritesheet, 0, 0, 65, 95, 4, 0.20, 4, true, 1);
    this.x = 600;
    this.y = 0;
    this.speed = 100;
    this.game = game;
    this.ctx = game.ctx;
}

BobaWalk.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

BobaWalk.prototype.update = function () {
    if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
        this.x -= this.game.clockTick * this.speed;
    if (this.x < -230) this.x = 800;
}

function BobaRun(game, spritesheet) {
    this.animation = new Animation(spritesheet, 0, 100, 72, 85, 5, 0.18, 5, true, 1);
    this.x = 600;
    this.y = 100;
    this.speed = 200;
    this.game = game;
    this.ctx = game.ctx;
}

BobaRun.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

BobaRun.prototype.update = function () {
    if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
        this.x -= this.game.clockTick * this.speed;
    if (this.x < -230) this.x = 800;
}

function BobaDisappear(game, spritesheet) {
    this.animation = new Animation(spritesheet, 0, 560, 74, 85, 6, 0.18, 6, true, 1);
    this.x = 600;
    this.y = 200;
    this.speed = 150;
    this.game = game;
    this.ctx = game.ctx;
}

BobaDisappear.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

BobaDisappear.prototype.update = function () {
    // if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
    //     this.x -= this.game.clockTick * this.speed;
    // if (this.x < -230) this.x = 800;
}

// function Boba4(game, spritesheet) {
//     this.animation = new Animation(spritesheet, 0, 420, 85, 85, 4, 0.20, 4, true, 1);
//     this.x = 600;
//     this.y = 300;
//     this.speed = 100;
//     this.game = game;
//     this.ctx = game.ctx;
// }
//
// Boba4.prototype.draw = function () {
//     this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
// }
//
// Boba4.prototype.update = function () {
//     // if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
//     //     this.x -= this.game.clockTick * this.speed;
//     // if (this.x < -230) this.x = 800;
// }

AM.queueDownload("./img/22137.png")

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

	gameEngine.addEntity(new BobaWalk(gameEngine, AM.getAsset("./img/22137.png")));
	gameEngine.addEntity(new BobaRun(gameEngine, AM.getAsset("./img/22137.png")));
	gameEngine.addEntity(new BobaDisappear(gameEngine, AM.getAsset("./img/22137.png")));
	// gameEngine.addEntity(new Boba4(gameEngine, AM.getAsset("./img/22137.png")));

    console.log("All Done!");
});
