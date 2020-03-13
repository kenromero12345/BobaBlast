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
    this.time = Date.now();
}

Timer.prototype.tick = function () {
    var wallCurrent =  Date.now();
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
    this.rClick = null;
    this.drag = null;
    this.mouseDown = null;
    this.mouseUp = null;
    this.wheel = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;
    this.towers = null;
    this.display = null;
    this.activeTowers = [];
    this.speed = 1;
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

    // var getXandY = function (e) {
    //     var a = e.clientX - divOffset.left - that.ctx.canvas.getBoundingClientRect().left;
    //     var b = e.clientY - divOffset.top - that.ctx.canvas.getBoundingClientRect().top;

    //     var i = Math.floor(a/100) + 1;
    //     var j = Math.floor(b/100);
        
    //     return {x: i, y: j}
    // }

    this.ctx.canvas.addEventListener("keydown", function (e) {
        // if (String.fromCharCode(e.which) === ' ') that.space = true;
        // if (String.fromCharCode(e.which) === 'A') {that.left = true;}
        // if (String.fromCharCode(e.which) === 'S') that.down = true;
        // if (String.fromCharCode(e.which) === 'D') that.right = true;
        // if (String.fromCharCode(e.which) === 'W') that.up = true;
        // if (String.fromCharCode(e.which) === 'R') that.run = true;
        if (String.fromCharCode(e.which) === 'G') that.godMode = true;
    //    console.log(String.fromCharCode(e.which));
        e.preventDefault();
    }, false);

    this.ctx.canvas.addEventListener("click", function (e) {
        //that.click = getXandY(e);
        that.click = { x: e.clientX - divOffset.left, y: e.clientY - divOffset.top};
        // console.log(e);
        // console.log("Left Click Event - X,Y " + e.clientX + ", " + e.clientY);
        // console.log(getXY(e.clientX, e.clientY));
        // var xy = getXY(e.clientX, e.clientY);
      //  GAMEBOARD[xy.x][xy.y].occupied = !GAMEBOARD[xy.x][xy.y].occupied;
    }, false);

    this.ctx.canvas.addEventListener("mouseup", function (e) {
        // that.click = { x: e.clientX, y: e.clientY };
        that.mouseUp = { x: e.clientX - divOffset.left, y: e.clientY - divOffset.top };
    }, false);

    this.ctx.canvas.addEventListener("contextmenu", function (e) {
        // that.click = { x: e.clientX, y: e.clientY };
        that.rClick = { x: e.clientX - divOffset.left, y: e.clientY - divOffset.top };
    }, false);

    this.ctx.canvas.addEventListener("mousedown", function (e) {
        // that.click = { x: e.clientX, y: e.clientY };
        that.mouseDown = { x: e.clientX - divOffset.left, y: e.clientY - divOffset.top };
    }, false);

    this.ctx.canvas.addEventListener("mousemove", function (e) {
        that.mouse = { x: e.clientX - divOffset.left, y: e.clientY - divOffset.top };
    }, false);

    console.log('Input started');
}

GameEngine.prototype.addEntity = function (entity) {
    // console.log('added entity');
    this.entities.push(entity);
}

GameEngine.prototype.enqueueEntity = function (entity) {
    // console.log('added entity');

    this.entities.unshift(entity);
    console.log(this.entities);
}

GameEngine.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.save();
    if (this.background) {
        this.background.draw(this.ctx);
    }
    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].draw(this.ctx);
    }
    if (this.display) {
        this.display.draw(this.ctx);        
    }

    if (this.towers) {
        for (var i = 0; i < this.towers.length; i++) {
            for (var j = 0; j < this.towers[i].length; j++) {
                this.towers[i][j].draw(this.ctx);
            }
        }
    }
    if (this.roundPlan) {
        this.roundPlan.draw(this.ctx);
    }
    this.ctx.restore();
}

GameEngine.prototype.update = function () {
    var entitiesCount = this.entities.length;
    if (this.roundPlan) {
        this.roundPlan.update();
    }
    for (var i = 0; i < entitiesCount; i++) {
        var entity = this.entities[i];

        if (!entity.removeFromWorld) {
            entity.update();
        }
    }

    if (this.display) {
        this.display.update();
    }

    if (this.towers) {
        for (var i = 0; i < this.towers.length; i++) {
            for (var j = 0; j < this.towers[i].length; j++) {
                this.towers[i][j].update();
            }
        }
    }

    for (var i = this.entities.length - 1; i >= 0; --i) {
        if (this.entities[i].removeFromWorld) {
            this.entities.splice(i, 1);
        }
    }
}

GameEngine.prototype.loop = function () {
    this.clockTick = this.timer.tick() * this.speed;
    this.timer.time += this.clockTick;
    this.update();
    this.draw();
    // this.space = null;
    // this.up = null;
    // this.down = null;
    // this.left = null;
    // this.right = null;
    // this.run = null;
    this.godMode = null;
}

function Entity(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.removeFromWorld = false;
}

Entity.prototype.update = function () {
    // drawRect(this);
}

var drawRect = function (ent) { 
    var ctx = this.ctx;
    var x = ent.x + ent.offsetX;
    var y = ent.y + ent.offsetY;
    var w = ent.width;
    var h = ent.height;
    ctx.strokeStyle = "green";
    ctx.rect(x,y,w,h);
    ctx.stroke();
    // ctx.fillStyle = "green";
    // ctx.fillRect(x,y,w,h);
  }

Entity.prototype.draw = function (ctx) {
    if (this.game.showOutlines && this.radius) {
        this.game.ctx.beginPath();
        this.game.ctx.strokeStyle = "green";
        this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.game.ctx.stroke();
        this.game.ctx.closePath();
    }
    // drawRect(this);
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

// var collide = function (rect1, rect2) {
//     // return (rect1.paceWalk && (rect1.x < rect2.x + rect2.walkWidth && rect1.x + rect1.walkWidth > rect2.x 
//     // && rect1.y < rect2.y + rect2.walkHeight && rect1.walkHeight + rect1.y > rect2.y))
//     // || (!rect1.paceWalk && (rect1.x < rect2.x + rect2.runWidth && rect1.x + rect1.runWidth > rect2.x 
//     //     && rect1.y < rect2.y + rect2.runHeight && rect1.runHeight + rect1.y > rect2.y));
//     return (rect1.x + rect1.offsetX < rect2.x + rect2.offsetX + rect2.width && rect1.x + rect1.offsetX + rect1.width > rect2.x + rect2.offsetX
//         && rect1.y + rect1.offsetY < rect2.y + rect2.offsetY  + rect2.height && rect1.height + rect1.y + rect1.offsetY  > rect2.y + rect2.offsetY );
// };

function BoundingBox(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.left = x;
    this.top = y;
    this.right = this.left + width;
    this.bottom = this.top + height;
}

BoundingBox.prototype.collide = function (oth) {
    // console.log(this);
    // console.log(oth);
    if (this.right > oth.left && this.left < oth.right && this.top < oth.bottom && this.bottom > oth.top) return true;
    return false;
    // return collide()
}

var getXY = function(x, y) {
    var i = Math.floor(x/100) + 1;
    var j = Math.floor(y/100);
  
    return {x: i, y: j}
}

//make it bidirection ?
function getShortestPath(x, y) {
    var queue = [];

	for(var i = 0; i < GAMEBOARD.length; i++) {
	  	for(var j = 0; j < GAMEBOARD[i].length; j++) {
            GAMEBOARD[i][j].distToXY = -1;
            GAMEBOARD[i][j].dir = -1;
	  	}
	}

    var xy = getXY(x, y);
    GAMEBOARD[xy.x][xy.y].distToXY = 0;
    GAMEBOARD[xy.x][xy.y].dir = 0;
    queue.push(xy);

    while (queue.length !== 0) {
        for (let i = 0; i < queue.length; i++) {
            var node = queue.shift();
            // if (node.x == 2 && node.y > 0) {
            //     console.log("problem")
            // }
            if (GAMEBOARD[node.x][node.y].end) {
				return helperToGetDirection(node);
            }

            if (node.x + 1 < GAMEBOARD.length && node.x + 1 >= 0 && !GAMEBOARD[node.x + 1][node.y].occupied 
                && GAMEBOARD[node.x + 1][node.y].dir < 0) {
                var newNode = Object.assign({}, node);
                newNode.x++;
                queue.push(newNode);
				GAMEBOARD[node.x + 1][node.y].distToXY = GAMEBOARD[node.x][node.y].distToXY + 1;
				GAMEBOARD[node.x + 1][node.y].dir = 1;
            }
            if (node.y + 1 < GAMEBOARD[0].length && node.y + 1 >= 0 && !GAMEBOARD[node.x][node.y + 1].occupied 
                && GAMEBOARD[node.x][node.y + 1].dir < 0) {
                var newNode = Object.assign({}, node);
                newNode.y++;
                queue.push(newNode);
				GAMEBOARD[node.x][node.y + 1].distToXY = GAMEBOARD[node.x][node.y].distToXY + 1;
				GAMEBOARD[node.x][node.y + 1].dir = 2;
            }
            if (node.x - 1 < GAMEBOARD.length && node.x - 1 >= 0 && !GAMEBOARD[node.x - 1][node.y].occupied 
                && GAMEBOARD[node.x - 1][node.y].dir < 0) {
                var newNode = Object.assign({}, node);
                newNode.x--;
                queue.push(newNode);
				GAMEBOARD[node.x - 1][node.y].distToXY = GAMEBOARD[node.x][node.y].distToXY + 1;
				GAMEBOARD[node.x - 1][node.y].dir = 3;
            }
            if (node.y - 1 < GAMEBOARD[0].length && node.y - 1 >= 0 && !GAMEBOARD[node.x][node.y - 1].occupied 
                && GAMEBOARD[node.x][node.y - 1].dir < 0) {
                var newNode = Object.assign({}, node);
                newNode.y--;
                queue.push(newNode);
				GAMEBOARD[node.x][node.y - 1].distToXY = GAMEBOARD[node.x][node.y].distToXY + 1;
				GAMEBOARD[node.x][node.y - 1].dir = 4;
            }
        }
    }
    return 0; // no shortest path
};

function helperToGetDirection(node) {

    // if (node.x == 2 && node.y > 0) {
    //     console.log("problem")
    // }
	if(GAMEBOARD[node.x][node.y].distToXY == 0) {
		return node.linkedDir;
	}

	if (node.x + 1 < GAMEBOARD.length && node.x + 1 >= 0 && !GAMEBOARD[node.x + 1][node.y].occupied
		&& GAMEBOARD[node.x + 1][node.y].distToXY == GAMEBOARD[node.x][node.y].distToXY - 1) {
		node.linkedDir = GAMEBOARD[node.x][node.y].dir;
		node.x++;
		return helperToGetDirection(node);
	}
	if (node.y + 1 < GAMEBOARD[0].length && node.y + 1 >= 0 && !GAMEBOARD[node.x][node.y + 1].occupied
		&& GAMEBOARD[node.x][node.y + 1].distToXY == GAMEBOARD[node.x][node.y].distToXY - 1) {
		node.linkedDir = GAMEBOARD[node.x][node.y].dir;
		node.y++;
		return helperToGetDirection(node);
	}
	if (node.x - 1 < GAMEBOARD.length && node.x - 1 >= 0 && !GAMEBOARD[node.x - 1][node.y].occupied
		&& GAMEBOARD[node.x - 1][node.y].distToXY == GAMEBOARD[node.x][node.y].distToXY - 1) {
		node.linkedDir = GAMEBOARD[node.x][node.y].dir;
		node.x--;
		return helperToGetDirection(node);
	}
	if (node.y - 1 < GAMEBOARD[0].length && node.y - 1 >= 0 && !GAMEBOARD[node.x][node.y - 1].occupied 
		&& GAMEBOARD[node.x][node.y - 1].distToXY == GAMEBOARD[node.x][node.y].distToXY - 1) {
		node.linkedDir = GAMEBOARD[node.x][node.y].dir;
        node.y--;
		return helperToGetDirection(node);
	}
};

function getDistanceToEndByPath(x, y) {
    var queue = [];

	for(var i = 0; i < GAMEBOARD.length; i++) {
	  	for(var j = 0; j < GAMEBOARD[i].length; j++) {
            GAMEBOARD[i][j].distToXY = -1;
            GAMEBOARD[i][j].dir = -1;
	  	}
	}

    var xy = getXY(x, y);
    GAMEBOARD[xy.x][xy.y].distToXY = 0;
    GAMEBOARD[xy.x][xy.y].dir = 0;
    queue.push(xy);

    while (queue.length !== 0) {
        for (let i = 0; i < queue.length; i++) {
            var node = queue.shift();
            // if (node.x == 2 && node.y > 0) {
            //     console.log("problem")
            // }
            if (GAMEBOARD[node.x][node.y].end) {
				return GAMEBOARD[node.x][node.y].distToXY;
            }

            if (node.x + 1 < GAMEBOARD.length && node.x + 1 >= 0 && !GAMEBOARD[node.x + 1][node.y].occupied 
                && GAMEBOARD[node.x + 1][node.y].dir < 0) {
                var newNode = Object.assign({}, node);
                newNode.x++;
                queue.push(newNode);
				GAMEBOARD[node.x + 1][node.y].distToXY = GAMEBOARD[node.x][node.y].distToXY + 1;
				GAMEBOARD[node.x + 1][node.y].dir = 1;
            }
            if (node.y + 1 < GAMEBOARD[0].length && node.y + 1 >= 0 && !GAMEBOARD[node.x][node.y + 1].occupied 
                && GAMEBOARD[node.x][node.y + 1].dir < 0) {
                var newNode = Object.assign({}, node);
                newNode.y++;
                queue.push(newNode);
				GAMEBOARD[node.x][node.y + 1].distToXY = GAMEBOARD[node.x][node.y].distToXY + 1;
				GAMEBOARD[node.x][node.y + 1].dir = 2;
            }
            if (node.x - 1 < GAMEBOARD.length && node.x - 1 >= 0 && !GAMEBOARD[node.x - 1][node.y].occupied 
                && GAMEBOARD[node.x - 1][node.y].dir < 0) {
                var newNode = Object.assign({}, node);
                newNode.x--;
                queue.push(newNode);
				GAMEBOARD[node.x - 1][node.y].distToXY = GAMEBOARD[node.x][node.y].distToXY + 1;
				GAMEBOARD[node.x - 1][node.y].dir = 3;
            }
            if (node.y - 1 < GAMEBOARD[0].length && node.y - 1 >= 0 && !GAMEBOARD[node.x][node.y - 1].occupied 
                && GAMEBOARD[node.x][node.y - 1].dir < 0) {
                var newNode = Object.assign({}, node);
                newNode.y--;
                queue.push(newNode);
				GAMEBOARD[node.x][node.y - 1].distToXY = GAMEBOARD[node.x][node.y].distToXY + 1;
				GAMEBOARD[node.x][node.y - 1].dir = 4;
            }
        }
    }
    return 0; // no shortest path
};

//sleep in some milliseconds
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function distance(a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function direction(a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    if(dist > 0) return { x: dx / dist, y: dy / dist }; else return {x:0,y:0};
}

function directionCenter(a, b) {
    var dx = a.centerX - b.centerX;
    var dy = a.centerY - b.centerY;
    var dist = Math.sqrt(dx * dx + dy * dy);
    if(dist > 0) return { x: dx / dist, y: dy / dist }; else return {x:0,y:0};
}

function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft}
}

function getTowersDepth(x, y) {
    var queue = [];

	for(var i = 0; i < GAMEBOARD.length; i++) {
	  	for(var j = 0; j < GAMEBOARD[i].length; j++) {
            GAMEBOARD[i][j].distToXY = -1;
            GAMEBOARD[i][j].dir = -1;
	  	}
	}

    var xy = getXY(x, y);
    GAMEBOARD[xy.x][xy.y].distToXY = 0;

    queue.push(xy);

    while (queue.length !== 0) {
        for (let i = 0; i < queue.length; i++) {
            var node = queue.shift();
            // if (node.x == 2 && node.y > 0) {
            //     console.log("problem")
            // }

            if (node.x + 1 < GAMEBOARD.length && node.x + 1 >= 0 
                && GAMEBOARD[node.x + 1][node.y].distToXY < 0) {
                var newNode = Object.assign({}, node);
                newNode.x++;
                queue.push(newNode);
				GAMEBOARD[node.x + 1][node.y].distToXY = GAMEBOARD[node.x][node.y].distToXY + 1;
	
            }
            if (node.y + 1 < GAMEBOARD[0].length && node.y + 1 >= 0  
                && GAMEBOARD[node.x][node.y + 1].distToXY < 0) {
                var newNode = Object.assign({}, node);
                newNode.y++;
                queue.push(newNode);
				GAMEBOARD[node.x][node.y + 1].distToXY = GAMEBOARD[node.x][node.y].distToXY + 1;

            }
            if (node.x - 1 < GAMEBOARD.length && node.x - 1 >= 0  
                && GAMEBOARD[node.x - 1][node.y].distToXY < 0) {
                var newNode = Object.assign({}, node);
                newNode.x--;
                queue.push(newNode);
				GAMEBOARD[node.x - 1][node.y].distToXY = GAMEBOARD[node.x][node.y].distToXY + 1;

            }
            if (node.y - 1 < GAMEBOARD[0].length && node.y - 1 >= 0 
                && GAMEBOARD[node.x][node.y - 1].distToXY < 0) {
                var newNode = Object.assign({}, node);
                newNode.y--;
                queue.push(newNode);
				GAMEBOARD[node.x][node.y - 1].distToXY = GAMEBOARD[node.x][node.y].distToXY + 1;

            }
        }
    }

    var xys = [];
    for(var i = 0; i < GAMEBOARD.length; i++) {
        for(var j = 0; j < GAMEBOARD[i].length; j++) {
            if (GAMEBOARD[i][j].occupied) {
                xys.push({x:i, y:j, depth: GAMEBOARD[x][y].distToXY});
            }
        }
    }

    return xys;
};