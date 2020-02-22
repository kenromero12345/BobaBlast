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
    // if(this.currentFrame() != 1){
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

    if (!this.statusEffect) {
        ctx.drawImage(this.spriteSheet,
                    xindex * this.frameWidth + this.startX, yindex * this.frameHeight + this.startY,  // source from sheet
                    this.frameWidth, this.frameHeight,
                    x + this.offsetX, y + this.offsetY,
                    this.frameWidth * this.scale,
                    this.frameHeight * this.scale);
    } else {
        // step 1: draw in original image
        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(this.spriteSheet,
                    xindex * this.frameWidth + this.startX, yindex * this.frameHeight + this.startY,  // source from sheet
                    this.frameWidth, this.frameHeight,
                    x + this.offsetX, y + this.offsetY,
                    this.frameWidth * this.scale,
                    this.frameHeight * this.scale);

        // step 2: adjust saturation (chroma, intensity)
        ctx.globalCompositeOperation = "saturation";
        ctx.fillStyle = "hsl(0," + 100 + "%, 50%)";  // hue doesn't matter here
        ctx.fillRect(x + this.offsetX, y + this.offsetY, this.frameWidth, this.frameHeight);

        // step 3: adjust hue, preserve luma and chroma
        ctx.globalCompositeOperation = "hue";
        ctx.fillStyle = "hsl(" + 50 + ",1%, 50%)";  // sat must be > 0, otherwise won't matter
        ctx.fillRect(x + this.offsetX, y + this.offsetY, this.frameWidth, this.frameHeight);

        // step 4: in our case, we need to clip as we filled the entire area
        ctx.globalCompositeOperation = "destination-in";
        ctx.drawImage(this.spriteSheet,
            xindex * this.frameWidth + this.startX, yindex * this.frameHeight + this.startY,  // source from sheet
            this.frameWidth, this.frameHeight,
            x + this.offsetX, y + this.offsetY,
            this.frameWidth * this.scale,
            this.frameHeight * this.scale);

        // step 5: reset comp mode to default
        ctx.globalCompositeOperation = "source-over";
        }
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
AM.queueDownload("./img/towerB.png");
AM.queueDownload("./img/towerP.png");
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
AM.queueDownload("./img/pot.png");
AM.queueDownload("./img/boba.png");
AM.queueDownload("./img/explosion.png");

var audio = new Audio('./mp3/Your Sunset.mp3');
    

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
    audio.play();
}

// var GAMEBOARD = [];
AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/background.png")));

    gameEngine.addEntity(new board(gameEngine));

    gameEngine.addEntity(new roundPlan(gameEngine));

    // BOBA BULLET TESTING
    // gameEngine.addEntity(new display(gameEngine));
    gameEngine.display = new display(gameEngine);
    towerArray = generateStoreTowers(gameEngine);

    //TEST here: comment ount some update of the enemy to be tested
    // gameEngine.addEntity(new bigCake(gameEngine, 450, 250, .25));    
    // gameEngine.addEntity(new biscuit(gameEngine, 450, 250, .75));
    // gameEngine.addEntity(new cake(gameEngine, 450, 250, .75));
    // gameEngine.addEntity(new cakeChoco(gameEngine, 450, 250, .75));
    // gameEngine.addEntity(new cola(gameEngine, 450, 250, .85, false));
    // gameEngine.addEntity(new iceGolem(gameEngine, 450, 250, .7));
    // gameEngine.addEntity(new miniCake(gameEngine, 450, 250, .75));
    // gameEngine.addEntity(new pumpkinEvil(gameEngine, 450, 250, .75)); 
    // gameEngine.addEntity(new pumpkinGood(gameEngine, 450, 250, .75));
    // gameEngine.addEntity(new slime(gameEngine, 450, 250, .75, 10));
    // gameEngine.addEntity(new watermelon(gameEngine, 450, 250, .75));

    // gameEngine.addEntity(new greenTea(gameEngine, 450, 250, false, .75));
    // gameEngine.addEntity(new redTea(gameEngine, 450, 250, false, .75));
    // gameEngine.addEntity(new yellowTea(gameEngine, 450, 250, true, .75));

    console.log("All Done!");

    var pg = new PlayGame(gameEngine);
    gameEngine.addEntity(pg);

    gameEngine.running = false;
});

function generateStoreTowers(game) {
    //basic tower
    var firstTower = new storeTower(game, "Boba", 100, 1000, 150, "Basic boba shooter\nShoots slowly \nShort range",AM.getAsset("./img/tower.png"), 945, 200, 70,70,0,0, "none");
    //poison tower
    var secondTower = new storeTower(game, "Matcha Boba", 400, 300, 250, "Poisons enemies \nShoots fast \nMedium range \n-Poison does damage over time",AM.getAsset("./img/towerG.png"), 1015, 200, 70, 70,1,0, "green");
    //explosive tower
    var thirdTower = new storeTower(game, "Cherry Boba", 800, 2000, 250,"Burns enemies \nShoots very slowly \nMedium range \n-Burn makes enemies run faster \n-Does damage over time",AM.getAsset("./img/towerR.png"), 1085, 200, 70,70,2,0, "red");
    //super tower
    var fourthTower = new storeTower(game, "Golden Boba", 2000, 50, 500, "Super tower \nShoots very fast \nLarge range",AM.getAsset("./img/towerY.png"), 945, 270, 70,70,0,1, "none");
    //wall
    var fifthTower = new storeTower(game, "Pot of Boba", 20, 1, 1, "A wall that \nstops the enemies \nfrom progressing",AM.getAsset("./img/pot.png"), 1015, 270, 70,70,1,1, "none");
    //slow tower
    var sixthTower = new storeTower(game, "Iced Boba", 200, 1000, 250, "Ices enemies \nShoots slowly \nMedium range \n-Ice makes enemies move slowly",AM.getAsset("./img/towerB.png"), 1085, 270, 70,70,2,1, "blue");
    //stun tower
    var seventhTower = new storeTower(game, "Taro Boba", 350, 600, 150,"Stuns enemies \nShoots moderately \nShort range \n-Stun briefly stops enemies in place ",AM.getAsset("./img/towerP.png"), 945, 340,70,70,0,2, "purple");
    
    var eightTower = new storeTower(game, "Tower 8", 2000, 1000, 150, "Tower 8 \n(WIP) DO NOT CLICK \nWILL CREATE INVISIBLE TOWER",AM.getAsset("./img/holder.png"), 1015, 340,70,70,1,2, "none");
    var ninthTower = new storeTower(game, "Tower 9", 2200, 1000, 150,"Tower 9 \n(WIP) DO NOT CLICK \nWILL CREATE INVISIBLE TOWER",AM.getAsset("./img/holder.png"), 1085, 340,70,70,2,2, "none");

    var temp = [[firstTower, secondTower, thirdTower],[fourthTower,fifthTower,sixthTower],[seventhTower,eightTower,ninthTower]];
    for(var i = 0; i < 3; i++) {
        for(var j = 0; j < 3; j++) {
            // game.addEntity(temp[i][j]);
        }
    }
    game.towers = temp;
    return temp;
}

//450//250
//-50//350

// gameEngine.addEntity(new bigCake(gameEngine, 450, 250, .25));    
// gameEngine.addEntity(new biscuit(gameEngine, 450, 250, .75));
// gameEngine.addEntity(new cake(gameEngine, 450, 250, .75));
// gameEngine.addEntity(new cakeChoco(gameEngine, 450, 250, .75));
// gameEngine.addEntity(new cola(gameEngine, 450, 250, .85, false));
// gameEngine.addEntity(new iceGolem(gameEngine, 450, 250, .7));
// gameEngine.addEntity(new miniCake(gameEngine, 450, 250, .75));
// gameEngine.addEntity(new pumpkinEvil(gameEngine, 450, 250, .75));
// gameEngine.addEntity(new pumpkinGood(gameEngine, 450, 250, .75));
// gameEngine.addEntity(new slime(gameEngine, 450, 250, .75, 10));
// gameEngine.addEntity(new watermelon(gameEngine, 450, 250, .75));

// gameEngine.addEntity(new greenTea(gameEngine, 450, 250, false, .75));
// gameEngine.addEntity(new redTea(gameEngine, 450, 250, false, .75));
// gameEngine.addEntity(new yellowTea(gameEngine, 450, 250, true, .75));


// TODO
// gameEngine.addEntity(new squareSlime(gameEngine, 450, 250, .75));
