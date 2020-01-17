var AM = new AssetManager();

function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
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
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
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

function Animation2(spriteSheet, startX, startY, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
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

Animation2.prototype.drawFrame = function (tick, ctx, x, y) {
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

Animation2.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation2.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

function MushroomDude(game, spritesheet) {
    this.animation = new Animation(spritesheet, 189, 230, 5, 0.10, 14, true, 1);
    this.x = 0;
    this.y = 0;
    this.speed = 100;
    this.game = game;
    this.ctx = game.ctx;
}

MushroomDude.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

MushroomDude.prototype.update = function () {
    if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
        this.x += this.game.clockTick * this.speed;
    if (this.x > 800) this.x = -230;
}

function Boba1(game, spritesheet) {
    this.animation = new Animation(spritesheet, 65,95, 5, 0.20, 4, true, 2);
    this.x = 600;
    this.y = 0;
    this.speed = 100;
    this.game = game;
    this.ctx = game.ctx;
}

Boba1.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

Boba1.prototype.update = function () {
    if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
        this.x -= this.game.clockTick * this.speed;
    if (this.x < -230) this.x = 800;
}

function Boba2(game, spritesheet) {
    this.animation = new Animation2(spritesheet, 0, 100, 72, 85, 5, 0.20, 5, true, 2);
    this.x = 600;
    this.y = 200;
    this.speed = 200;
    this.game = game;
    this.ctx = game.ctx;
}

Boba2.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

Boba2.prototype.update = function () {
    if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
        this.x -= this.game.clockTick * this.speed;
    if (this.x < -230) this.x = 800;
}

function Manakete(game, spritesheet) {
    this.animation = new Animation(spritesheet, 189, 230, 5, 0.10, 14, true, 1);
    this.x = 300;
    this.y = 300;
    this.speed = 100;
    this.game = game;
    this.ctx = game.ctx;
}

AM.queueDownload("./img/22137.png")

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

	gameEngine.addEntity(new Boba1(gameEngine, AM.getAsset("./img/22137.png")));
	gameEngine.addEntity(new Boba2(gameEngine, AM.getAsset("./img/22137.png")));

    console.log("All Done!");
});
