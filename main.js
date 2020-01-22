function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
    this.spriteSheet = spriteSheet;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y, scaleBy) {
    var scaleBy = scaleBy || 1;
    this.elapsedTime += tick;
    if (this.loop) {
        if (this.isDone()) {
            this.elapsedTime = 0;
        }
    } else if (this.isDone()) {
        return;
    }
    var index = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();
    var vindex = 0;
    if ((index + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
        index -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
        vindex++;
    }
    while ((index + 1) * this.frameWidth > this.spriteSheet.width) {
        index -= Math.floor(this.spriteSheet.width / this.frameWidth);
        vindex++;
    }

    var locX = x;
    var locY = y;
    var offset = vindex === 0 ? this.startX : 0;
    ctx.drawImage(this.spriteSheet,
                  index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,  // source from sheet
                  this.frameWidth, this.frameHeight,
                  locX, locY,
                  this.frameWidth * scaleBy,
                  this.frameHeight * scaleBy);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

function Background(game) {
    Entity.call(this, game, 100, 200);
    this.radius = 200;
}

Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.update = function () {
}

Background.prototype.draw = function (ctx) {
    ctx.fillStyle = "Blue";
    ctx.fillRect(0,500,800,300);
    Entity.prototype.draw.call(this);
}

function Cloud(game) {
    Entity.call(this, game, 100, 200);
    this.radius = 200;
}

Cloud.prototype = new Entity();
Cloud.prototype.constructor = Cloud;

Cloud.prototype.update = function () {
}

Cloud.prototype.draw = function (ctx) {
    ctx.fillStyle = "White";
    ctx.fillRect(400,200,300,100);
    Entity.prototype.draw.call(this);
}

function Sun(game) {
    Entity.call(this, game, 100, 200);
    this.radius = 200;
}

Sun.prototype = new Entity();
Sun.prototype.constructor = Sun;

Sun.prototype.update = function () {
}

Sun.prototype.draw = function (ctx) {
    ctx.fillStyle = "Yellow";
    ctx.fillRect(10,10,200,200);
    Entity.prototype.draw.call(this);
}

function Dragon(game) {
    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/hydrei.png"), 0, 0, 169, 220, 0.05, 45, true);
    this.speed = 275;
    this.ctx = game.ctx;
    Entity.call(this, game, 400, 200);
}

Dragon.prototype = new Entity();
Dragon.prototype.constructor = Dragon;

Dragon.prototype.update = function () {
    this.x -= this.game.clockTick * this.speed;
    if (this.x > 475) {
        this.y += this.game.clockTick * this.speed / 2;
    }
    if (this.x < 475) {
        this.y -= this.game.clockTick * this.speed / 2;
        if (this.x < 200) this.y += this.game.clockTick * this.speed / 2;
    }
    if (this.x < -230) {
        this.x = 800;
        this.y = 100;
    }
    Entity.prototype.update.call(this);
}

Dragon.prototype.draw = function (ctx) {
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

function Tower(game){
    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/twrY.png"), 0,0,490,475, 0.5, 8, true);
    Entity.call(this, game, 200,100);
}

Tower.prototype = new Entity();
Tower.prototype.constructor = Tower;

Tower.prototype.update = function(){}

Tower.prototype.draw = function (ctx) {
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

// the "main" code begins here

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/hydrei.png");
ASSET_MANAGER.queueDownload("./img/twrY.png");

ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    var bg = new Background(gameEngine);
    var cld = new Cloud(gameEngine);
    var sun = new Sun(gameEngine);
    var monster = new Dragon(gameEngine);
    var tower = new Tower(gameEngine)

    gameEngine.addEntity(bg);
    gameEngine.addEntity(cld);
    gameEngine.addEntity(sun);
    gameEngine.addEntity(monster);
    gameEngine.addEntity(tower);

    gameEngine.init(ctx);
    gameEngine.start();
});
