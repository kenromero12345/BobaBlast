var AM = new AssetManager();
var gameStarted = false;

function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, sheetWidth
    , frameDuration, frames, loop, scale, flip) {
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
    this.stop = false;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    // if(this.currentFrame() != 1){
        if (!this.stop) { 
            this.elapsedTime += tick;
        }
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
AM.queueDownload("./img/background.png");
AM.queueDownload("./img/background night.png");
AM.queueDownload("./img/background morning.png");
AM.queueDownload("./img/street.png");
AM.queueDownload("./img/street night.png");
AM.queueDownload("./img/street morning.png");
AM.queueDownload("./img/bg1.png");
AM.queueDownload("./img/bg2.png");
AM.queueDownload("./img/bg3.png");
AM.queueDownload("./img/bg4.png");
AM.queueDownload("./img/bg5.png");
AM.queueDownload("./img/bg6.png");
AM.queueDownload("./img/bg7.png");
AM.queueDownload("./img/bg8.png");
AM.queueDownload("./img/win.png");
AM.queueDownload("./img/holder.png");
AM.queueDownload("./img/tower.png");
AM.queueDownload("./img/towerG.png");
AM.queueDownload("./img/towerR.png");
AM.queueDownload("./img/towerY.png");
AM.queueDownload("./img/towerB.png");
AM.queueDownload("./img/towerP.png");
AM.queueDownload("./img/lasertower.png");
AM.queueDownload("./img/mixtower.png");
AM.queueDownload("./img/iceg.png");
AM.queueDownload("./img/icegFlip.png");
AM.queueDownload("./img/cola.png");
AM.queueDownload("./img/colaFlip.png");
// AM.queueDownload("./img/slime.png");
// AM.queueDownload("./img/slimeFlip.png");
AM.queueDownload("./img/slimeWalk.png");
AM.queueDownload("./img/slimeWalkFlip.png");
AM.queueDownload("./img/slimeDie.png");
AM.queueDownload("./img/slimeDieFlip.png");
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
AM.queueDownload("./img/electric.png");
AM.queueDownload("./img/freeze.png");
AM.queueDownload("./img/poison.png");
AM.queueDownload("./img/psn.png");
AM.queueDownload("./img/brn.png");
AM.queueDownload("./img/par.png");
AM.queueDownload("./img/frz.png");
// AM.queueDownload("./img/statuseffect.png")

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

// //Music
// var audio = new Audio('./mp3/KSquare.mp3');
// audio.volume = 0.5;

// var audio2 = new Audio('./mp3/Your Sunset.mp3');
// // var audio2 = new Audio('./mp3/failed.mp3');
// audio2.loop = false;
// audio2.volume = 0.5;

Background.prototype.update = function() {
    // var playPromise = audio.play();
    
    // if (playPromise !== undefined) {
    //     playPromise.then(_ => {
    //         if(gameOverLose == false && gameOverWin == false){
    //             audio.play();
    //             audio2.pause();
    //         }else{
    //             audio.pause();
    //             audio2.play();
    //         }
            
            
    //     })
    //     .catch(error => {
    //         audio.pause();
    //         audio2.pause();
    //     });
    // }
}

// var GAMEBOARD = [];
AM.downloadAll(function () {
    var div = document.querySelector('div');
    divOffset = offset(div);
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();
    
    // gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/background.png")));
    gameEngine.background = new Background(gameEngine, AM.getAsset("./img/bg4.png"));

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

    // gameEngine.addEntity(new bigCake(gameEngine, 450, 550, .25));
    // gameEngine.addEntity(new biscuit(gameEngine, 450, 550, .75));
    // gameEngine.addEntity(new cake(gameEngine, 450, 550, .75));
    // gameEngine.addEntity(new cakeChoco(gameEngine, 450, 550, .75));
    // gameEngine.addEntity(new cola(gameEngine, 450, 550, .85, false));
    // gameEngine.addEntity(new iceGolem(gameEngine, 450, 550, .7));
    // gameEngine.addEntity(new miniCake(gameEngine, 450, 550, .75));
    // gameEngine.addEntity(new pumpkinEvil(gameEngine, 450, 550, .75));
    // gameEngine.addEntity(new pumpkinGood(gameEngine, 450, 550, .75));
    // gameEngine.addEntity(new slime(gameEngine, 450, 550, .75, 10));
    // gameEngine.addEntity(new watermelon(gameEngine, 450, 550, .75));

    // gameEngine.addEntity(new greenTea(gameEngine, 450, 550, false, .75));
    // gameEngine.addEntity(new redTea(gameEngine, 450, 550, false, .75));
    // gameEngine.addEntity(new yellowTea(gameEngine, 450, 550, true, .75));

    // monsters.push();
    
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
    // var a = {x: 0, y: 0}
    // var b = {x: 2, y: 1}
    // console.log(direction(b, a))

    console.log("All Done!");

    var pg = new PlayGame(gameEngine);
    gameEngine.addEntity(pg);

    gameEngine.running = false;
});

var monsters = [];

var divOffset;

function generateStoreTowers(game) {
    //basic tower
    var firstTower = new storeTower(game, "Boba Shooter", 100, 1000/1000, 150, "Basic boba shooter\nShooting Speed: Slow \nRange: Short\nSpecial Ability: None",AM.getAsset("./img/tower.png"), 945, 120, 70,70,0,0, "none", 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, -1, 0, 0);
    //poison tower
    var secondTower = new storeTower(game, "Matcha Boba", 400, 300/1000, 250, "Poisons enemies \nShooting Speed: Fast \nRange: Medium \nSpecial Ability: Poison does \ndamage over time",AM.getAsset("./img/towerG.png"), 1015, 120, 70, 70,1,0, "green", 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, -1, 0, 0);
    //explosive tower
    var thirdTower = new storeTower(game, "Red Bean Boba", 800, 2000/1000, 250,"Burns enemies \nShooting Speed: Very Slow \nRange: Medium \nSpecial Ability: Burn makes \nenemies run faster and \ndoes damage over time \nShoots an explosion that hits \nmultiple enemies",AM.getAsset("./img/towerR.png"), 1085, 120, 70,70,2,0, "red", 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0);
    //super tower
    var fourthTower = new storeTower(game, "Golden Boba", 2500, 50/1000, 500, "Super boba tower \nShooting Speed: Very Fast \nRange: Large\nSpecial Ability: Boba homes in \non enemies. Boba ricochets off \nenemies and pierces through enemies.",AM.getAsset("./img/towerY.png"), 945, 190, 70,70,0,1, "gold", 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 0, 0, 0, 3, 0, 0, 1, 1, 1, 4, 0, 0);
    //wall
    var fifthTower = new storeTower(game, "Pot of Boba", 20, 0, 0, "A wall that stops the \nenemies from progressing\nShooting Speed: None \nRange: None\nSpecial Ability: Can be upgraded to \npower up nearby towers",AM.getAsset("./img/pot.png"), 1015, 190, 70,70,1,1, "pot", 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0);
    //slow tower
    var sixthTower = new storeTower(game, "Iced Boba", 200, 1000/1000, 250, "Ices enemies \nShooting Speed: Slow \nRange: Medium \nSpecial Ability: Ice makes \nenemies move slowly",AM.getAsset("./img/towerB.png"), 1085, 190, 70,70,2,1, "blue", 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 3, 0, 0);
    //stun tower
    var seventhTower = new storeTower(game, "Taro Boba", 300, 600/1000, 150,"Stuns enemies \nShooting Speed: Moderate \nRange: Short \nSpecial Ability: Stun briefly \nstops enemies in place ",AM.getAsset("./img/towerP.png"), 945, 260,70,70,0,2, "purple", 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 3, 0, 0);
    // laser tower
    var eighthTower = new storeTower(game, "Laser Boba", 300, 0.01, 250,"Fires laser boba \nShooting Speed: Moderate \nRange: Medium \nSpecial Ability: Laser boba \nperforms more damage ",AM.getAsset("./img/lasertower.png"), 1015, 260,70,70,1,2, "laser", 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 5, 0, 0);
     // mix tower
     var ninthTower = new storeTower(game, "Multi-Directional Boba", 300, 1000/1000, 250,"Fires boba in all directions \nShooting Speed: Moderate \nRange: Medium \nSpecial Ability: Boba is fired \nin all directions ",AM.getAsset("./img/mixtower.png"), 1085, 260,70,70,2,2, "all", 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, -1, 0, 0);
    var temp = [[firstTower, secondTower, thirdTower],[fourthTower,fifthTower,sixthTower],[seventhTower, eighthTower, ninthTower]];//eightTower,ninthTower
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
