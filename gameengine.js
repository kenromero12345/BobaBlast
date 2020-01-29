// This game shell was happily copied from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();


function Timer() {
    this.gameTime = 0;
    this.maxStep = 0.05;
    this.wallLastTimestamp = 0;
}

Timer.prototype.tick = function () {
    var wallCurrent = Date.now();
    var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
    this.wallLastTimestamp = wallCurrent;

    var gameDelta = Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
}

function GameEngine() {
    this.entities = [];
    this.showOutlines = false;
    this.ctx = null;
    this.click = null;
    this.mouse = null;
    this.wheel = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;
}

GameEngine.prototype.init = function (ctx) {
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.startInput();
    this.timer = new Timer();
    console.log('game initialized');
}

GameEngine.prototype.start = function () {
    console.log("starting game");
    var that = this;
    (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();
}

GameEngine.prototype.startInput = function () {
    console.log('Starting input');
    var that = this;

    var getXandY = function (e) {
        var a = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
        var b = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

        var i = Math.floor(a/100) + 1;
        var j = Math.floor(b/100);
        
        return {x: i, y: j}
    }

    this.ctx.canvas.addEventListener("keydown", function (e) {
        if (String.fromCharCode(e.which) === ' ') that.space = true;
        if (String.fromCharCode(e.which) === 'A') {that.left = true;}
        if (String.fromCharCode(e.which) === 'S') that.down = true;
        if (String.fromCharCode(e.which) === 'D') that.right = true;
        if (String.fromCharCode(e.which) === 'W') that.up = true;
        if (String.fromCharCode(e.which) === 'R') that.run = true;
    //    console.log(String.fromCharCode(e.which));
        e.preventDefault();
    }, false);

    this.ctx.canvas.addEventListener("click", function (e) {
        //that.click = getXandY(e);
        that.click = { x: e.clientX, y: e.clientY };
        // console.log(e);
        // console.log("Left Click Event - X,Y " + e.clientX + ", " + e.clientY);
        // console.log(getXY(e.clientX, e.clientY));
        var xy = getXY(e.clientX, e.clientY);
      //  GAMEBOARD[xy.x][xy.y].occupied = !GAMEBOARD[xy.x][xy.y].occupied;
    }, false);

    this.ctx.canvas.addEventListener("mousemove", function (e) {
        that.mouse = { x: e.clientX, y: e.clientY };
    }, false);

    console.log('Input started');
}

GameEngine.prototype.addEntity = function (entity) {
    console.log('added entity');
    this.entities.push(entity);
}

GameEngine.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.save();
    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].draw(this.ctx);
    }
    this.ctx.restore();
}

GameEngine.prototype.update = function () {
    var entitiesCount = this.entities.length;

    for (var i = 0; i < entitiesCount; i++) {
        var entity = this.entities[i];

        if (!entity.removeFromWorld) {
            entity.update();
        }
    }

    for (var i = this.entities.length - 1; i >= 0; --i) {
        if (this.entities[i].removeFromWorld) {
            this.entities.splice(i, 1);
        }
    }
}

GameEngine.prototype.loop = function () {
    this.clockTick = this.timer.tick();
    this.update();
    this.draw();
    this.space = null;
    this.up = null;
    this.down = null;
    this.left = null;
    this.right = null;
    this.run = null;
}

function Entity(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.removeFromWorld = false;
}

Entity.prototype.update = function () {
}

Entity.prototype.draw = function (ctx) {
    if (this.game.showOutlines && this.radius) {
        this.game.ctx.beginPath();
        this.game.ctx.strokeStyle = "green";
        this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.game.ctx.stroke();
        this.game.ctx.closePath();
    }
}

Entity.prototype.rotateAndCache = function (image, angle) {
    var offscreenCanvas = document.createElement('canvas');
    var size = Math.max(image.width, image.height);
    offscreenCanvas.width = size;
    offscreenCanvas.height = size;
    var offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.save();
    offscreenCtx.translate(size / 2, size / 2);
    offscreenCtx.rotate(angle);
    offscreenCtx.translate(0, 0);
    offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
    offscreenCtx.restore();
    //offscreenCtx.strokeStyle = "red";
    //offscreenCtx.strokeRect(0,0,size,size);
    return offscreenCanvas;
}

var collide = function (rect1, rect2) {
    // return (rect1.paceWalk && (rect1.x < rect2.x + rect2.walkWidth && rect1.x + rect1.walkWidth > rect2.x 
    // && rect1.y < rect2.y + rect2.walkHeight && rect1.walkHeight + rect1.y > rect2.y))
    // || (!rect1.paceWalk && (rect1.x < rect2.x + rect2.runWidth && rect1.x + rect1.runWidth > rect2.x 
    //     && rect1.y < rect2.y + rect2.runHeight && rect1.runHeight + rect1.y > rect2.y));
    return (rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x 
        && rect1.y < rect2.y + rect2.height && rect1.height + rect1.y > rect2.y);
};
