/*
Round 1
Green bubble tea x3, coke x2, minicake x5

Round 2
Red bubble tea x5, sprite x5, watermelon x1, cake x1, chocoCake x1

Round 3
Yellow bubble tea x10, ice golem x1, pumpkin evil x1, pumpkin good x1, bigCake x1, biscuit x2

Round 4
All 11 slimes x9 => 99 slimes
*/
var round = 0;
var displayRoundDone = false;
var roundComplete = false;
var gameOverLose = true;
var gameOverWin = false;
function roundPlan(game) {
    this.spawnTracker = [];
    this.index = 1;
    this.game = game;
    this.ctx = game.ctx;
    this.timeGap = 1000/1000; 
    this.isRoundStart = true;
    this.isEnding = false;
    this.game.running = false;
    // this.spawningFinish = false;
    //this.displayRoundDone = false;
    this.gameOverWin = false;
    this.time = this.game.timer.time;
    this.initialRoundTime;
}

roundPlan.prototype.roundEntity = function(time, game, entity, isRoundEnding) {
    // this.index++;
    // sleep(time / this.game.speed).then(() => {
    //     game.addEntity(entity);
    //     if (isRoundEnding) {
    //         this.isEnding = true;
    //     }
    // })

    // console.log(this.time + " " + time);
    if (this.time >= time && !this.spawnTracker[this.index]) {
        game.addEntity(entity);
        if (isRoundEnding) {
            this.isEnding = true;
        }
        this.spawnTracker[this.index] = true;
    }
    this.index++;
    //make an object that has date (timer.time)
}

roundPlan.prototype.isNoEnemy = function() {
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if (ent.isEnemy) {
            return false;
        }
    }
    return true;
}

roundPlan.prototype.generateRoundDone = function() {
    var ctx = this.ctx;
    var x = 0;
    var y = 0;
    var w = 300;
    var h = 50;
    ctx.fillStyle = "#ff4747";
    ctx.fillRect(x,y,w,h);
    ctx.fillStyle = "black";
    ctx.font = '30px Bahnschrift Light';
    ctx.fillText("Round " + round + " Complete", x + 35, y + 40  );
}

roundPlan.prototype.generateGameOverLose = function() {
    var ctx = this.ctx;
    var x = 0;
    var y = 0;
    var w = 250;
    var h = 100;
    ctx.fillStyle = "#ff4747";
    ctx.fillRect(x,y,w,h);
    ctx.fillStyle = "black";
    ctx.font = '30px Bahnschrift Light';
    ctx.fillText("G", x + 35, y + 40  );
    ctx.font = '26px Bahnschrift Light';
    ctx.fillText("AME", x + 55, y + 40  );
    ctx.font = '30px Bahnschrift Light';
    ctx.fillText("O", x + 120, y + 40  );
    ctx.font = '26px Bahnschrift Light';
    ctx.fillText("VER", x + 140, y + 40  );
    ctx.font = '26px Bahnschrift Light';
    ctx.fillText("YOU LOSE!", x + 35, y + 70  );
    gameOverLose = true;
}

roundPlan.prototype.generateGameOverWin = function() {
    var ctx = this.ctx;
    var x = 0;
    var y = 0;
    var w = 250;
    var h = 100;
    ctx.fillStyle = "#ff4747";
    ctx.fillRect(x,y,w,h);
    ctx.fillStyle = "black";
    ctx.font = '30px Bahnschrift Light';
    ctx.fillText("G", x + 35, y + 40  );
    ctx.font = '26px Bahnschrift Light';
    ctx.fillText("AME", x + 55, y + 40  );
    ctx.font = '30px Bahnschrift Light';
    ctx.fillText("O", x + 120, y + 40  );
    ctx.font = '26px Bahnschrift Light';
    ctx.fillText("VER", x + 140, y + 40  );
    ctx.font = '26px Bahnschrift Light';
    ctx.fillText("YOU WIN!", x + 35, y + 70  );
    gameOverWin = true;
}

roundPlan.prototype.update = function () {
    if (this.game.running) {
        this.time += this.game.clockTick;
    }

    if (this.isRoundStart && this.game.running) {
        round++;
        this.isRoundStart = false;
        this.isEnding = false;
        // this.spawningFinish = false;
        this.initialRoundTime = this.time;
        // console.log(this.initialRoundTime)
    } else if (this.isEnding && this.isNoEnemy() && this.game.running) {
        this.spawnTracker = [];
        this.isEnding = false;
        this.isRoundStart = true;
        this.game.running = false;
        this.index = 1;
        displayRoundDone = true;
        roundComplete = true;
        currentMoney += 100;
        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if (ent.isBoba) {
                ent.removeFromWorld = true;
            }
        }
        for (var i = 0; i < this.game.activeTowers.length; i++) {
            var ent = this.game.activeTowers[i];
            ent.shootBoba = false;
        }
    }
    // console.log(round)
    // console.log(!this.isRoundStart + " " + !this.isEnding + " " + !this.spawningFinish)
    if (!this.isRoundStart && !this.isEnding) {// && !this.spawningFinish) {
        this.index = 1;
        roundComplete = false;
        if (round == 1) {
            // console.log("a")
            // this.roundEntity(this.index * this.timeGap + this.initialRoundTime
            //     , this.game, new slime(this.game, -50, 350, .75, 1));
            // 10 TOTAL ENTITIES: 10 GREEN TEAS
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75), true);
         /*    */
        } else if (round == 2) {
            // 20 TOTAL ENTITES:  15 GREEN TEAS, 5 MINI CAKE
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new miniCake(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new miniCake(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new miniCake(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new miniCake(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new miniCake(this.game, -50, 350, .75), true); 
        } else if (round == 3) {
            // 20 TOTAL ENTITIES: 10 YELLOW TEAS, 5 GREEN TEAS, 5 MINICAKE
            this.game.background.spritesheet = AM.getAsset("./img/bg5.png");
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new miniCake(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new miniCake(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new miniCake(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new miniCake(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new miniCake(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75), true);  
        } else if (round == 4) {
            // 25 TOTAL ENTITES: 10 YELLOW TEAS, 5 COLAS, 5 MINICAKES, 5 SLIMES
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 0));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new miniCake(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));

            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 1));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new miniCake(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));

            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 2));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new miniCake(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));

            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 3));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new miniCake(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));

            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 4));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new miniCake(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75), true);

            /*

            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new bigCake(this.game, -50, 350, .25), true);
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75)); */
        } else if (round == 5) {
            // 35 TOTAL ENTITIES: 10 YELLOW TEAS, 10 RED TEAS, 10 GREEN TEAS, 5 COLAS
            this.game.background.spritesheet = AM.getAsset("./img/bg3.png");
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75), true);
        } else if (round == 6) {
            // 35 TOTAL ENTITIES: 20 RED TEAS, 5 BISCUITS, 5 WATERMELON, 5 PUMPKIN GOOD
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new watermelon(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinGood(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new watermelon(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinGood(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new watermelon(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinGood(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new watermelon(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinGood(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new watermelon(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinGood(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75), true);
        } else if (round == 7) {
            // 45 TOTAL ENTITIES: 10 GREEN TEA, 10 YELLOW TEA, 10 SLIMES, 10 COLAS, 5 RED TEA
            this.game.background.spritesheet = AM.getAsset("./img/bg2.png");
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75), true);
        } else if (round == 8) {
            // 50 TOTAL ENTITES: 5 YELLOW TEA, 5 RED TEA, 20 SLIMES, 20 GRAY COLAS
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75), true);
        }else if (round == 9) {
            this.game.background.spritesheet = AM.getAsset("./img/bg6.png");
            // 60 TOTAL ENTITES: 10 YELLOW TEA, 10 WATERMELON, 10 BISCUIT, 10 PUMPKIN EVIL, 10 SLIMES, 10 COLAS
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new watermelon(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinEvil(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new watermelon(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinEvil(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new watermelon(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinEvil(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new watermelon(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinEvil(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new watermelon(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinEvil(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new watermelon(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinEvil(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new watermelon(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinEvil(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new watermelon(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinEvil(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new watermelon(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinEvil(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new watermelon(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinEvil(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false), true);
        }
        else if (round == 10) {
            // 70 TOTAL ENTITES: 10 RED TEA, 20 WATERMELON, 20 BISCUIT, 10 COLAS, 10 YELLOW TEAS
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new watermelon(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new watermelon(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new watermelon(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new watermelon(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new watermelon(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new watermelon(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new watermelon(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new watermelon(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new watermelon(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new watermelon(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new watermelon(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new watermelon(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new watermelon(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new watermelon(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new watermelon(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new watermelon(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new watermelon(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new watermelon(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new watermelon(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new watermelon(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75), true);
        }
        else if (round == 11) {
            // CAKE CHOCO
            // 75 ENTNTIES: 20 CAKE CHOCO, 20 RED TEAS, 10 PUMPKIN GOOD, 10 PUMPKIN EVIL, 10 YELLOW TEAS, 5 GREEN TEAS
            this.game.background.spritesheet = AM.getAsset("./img/bg7.png");
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinEvil(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinEvil(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinEvil(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinEvil(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinEvil(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinEvil(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinEvil(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinEvil(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinEvil(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinEvil(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinGood(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinGood(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinGood(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinGood(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinGood(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinGood(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinGood(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinGood(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinGood(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinGood(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new redTea(this.game, -50, 350, false, .75), true);
        }else if (round == 12) {
            // 80 ENTITIES: 15 CAKE CHOCO, 15 RED TEAS, 15 YELLOW TEAS, 5 GREEN TEAS, 16 SLIMES, 10 COLA, 5 whITE COLA
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 0));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 1));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 2));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 3));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 4));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 5));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 6));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 8));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 9));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 10));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 0));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 1));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 2));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 3));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true), true);
                                                                            
        }else if (round == 13) {
            // BIG CAKE: 20 CHOCOLATE CAKE, 20 BIG CAKE, 20 SLIMES, 20 RED TEAS, 10 GREEN TEAS
            // 90 ENTNTIES
            this.game.background.spritesheet = AM.getAsset("./img/bg8.png");
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new bigCake(this.game, -50, 350, .25));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new bigCake(this.game, -50, 350, .25));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 0));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 1));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 2));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 3));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new bigCake(this.game, -50, 350, .25));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new bigCake(this.game, -50, 350, .25));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 0));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 1));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 2));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 3));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new bigCake(this.game, -50, 350, .25));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new bigCake(this.game, -50, 350, .25));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 0));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 1));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 2));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 3));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new bigCake(this.game, -50, 350, .25));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new bigCake(this.game, -50, 350, .25));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 0));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 1));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 2));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 3));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new bigCake(this.game, -50, 350, .25));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new bigCake(this.game, -50, 350, .25));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new bigCake(this.game, -50, 350, .25));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 0));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 1));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 2));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 3));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new bigCake(this.game, -50, 350, .25));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new bigCake(this.game, -50, 350, .25));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new bigCake(this.game, -50, 350, .25));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new bigCake(this.game, -50, 350, .25));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new bigCake(this.game, -50, 350, .25));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new bigCake(this.game, -50, 350, .25));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new bigCake(this.game, -50, 350, .25));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new bigCake(this.game, -50, 350, .25));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new bigCake(this.game, -50, 350, .25));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75), true);
        }else if (round == 14) {
            // 90 ENTITIES:  20 YELLOW TEA, 10 SLIMES, 30 CHOCO CAKE, 20 WHITE COLA, 10 RED COLA 
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 0));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 0));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 0));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 0));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 0));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 0));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 0));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 0));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 0));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 0));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75), true);
                
        } else if (round == 15) {
            // ICE GOLEM
            // 100 ENTITIES: 10 RED TEAS, 10 ICE GOLEMS, 10 SLIMES, 10 PUMPKIN GOOD, 10 PUMPKIN EVIL, 10 BISCUIT, 10 CHOCOCAKE, 20 COLAS
            this.game.background.spritesheet = AM.getAsset("./img/bg1.png");
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));

            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));

            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));

            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));

            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));  
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 0));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));  
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 0));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));  
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 0));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));  
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 0));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));  
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 0));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));  
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 0));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));  
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 0));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));  
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 0));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new redTea(this.game, -50, 350, false, .75));  
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 0));

            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinGood(this.game, -50, 350, .75));

            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinEvil(this.game, -50, 350, .75));

            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinGood(this.game, -50, 350, .75));

            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinEvil(this.game, -50, 350, .75));

            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinGood(this.game, -50, 350, .75));

            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinEvil(this.game, -50, 350, .75));

            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinGood(this.game, -50, 350, .75));

            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinEvil(this.game, -50, 350, .75));

            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinGood(this.game, -50, 350, .75));

            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinEvil(this.game, -50, 350, .75));

            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinGood(this.game, -50, 350, .75));

            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinEvil(this.game, -50, 350, .75));

            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinGood(this.game, -50, 350, .75));

            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinEvil(this.game, -50, 350, .75));

            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinGood(this.game, -50, 350, .75));

            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinEvil(this.game, -50, 350, .75));

            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinGood(this.game, -50, 350, .75));

            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinEvil(this.game, -50, 350, .75));

            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinGood(this.game, -50, 350, .75));

            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new pumpkinEvil(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cakeChoco(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new cola(this.game, -50, 350, .85, false), true);


                                
        }else if (round == 16) {
            // 155 ENTITIES: 29 GREEN TEAS, 66 SLIMES, 30 ICE GOLEMS, 10 RED TEAS, 10 YELLOW TEAS, 10 GEREN TEAS
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
                this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new greenTea(this.game, -50, 350, false, .75));  
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
                this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 0));
                this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new greenTea(this.game, -50, 350, false, .75));  
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 1));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));  
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
                this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 2));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 3));
                this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new greenTea(this.game, -50, 350, false, .75));  
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 4));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 5));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 6));
                this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new greenTea(this.game, -50, 350, false, .75));  
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 8));
                this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 9));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 10));
                this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new greenTea(this.game, -50, 350, false, .75));  
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
                this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new greenTea(this.game, -50, 350, false, .75));  
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
                this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new greenTea(this.game, -50, 350, false, .75));  
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
                this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
                this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new greenTea(this.game, -50, 350, false, .75));  
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 0));
                this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new greenTea(this.game, -50, 350, false, .75));  
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 1));
                this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 2));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 3));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 4));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 5));
                this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new greenTea(this.game, -50, 350, false, .75));  
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 6));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 8));
                this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new greenTea(this.game, -50, 350, false, .75));  
                this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 9));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 10));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
                this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new greenTea(this.game, -50, 350, false, .75));  
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
                this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
                this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new greenTea(this.game, -50, 350, false, .75));  
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 0));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 1));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 2));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 3));
                this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new greenTea(this.game, -50, 350, false, .75));  
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 4));
                this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 5));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 6));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
                this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new greenTea(this.game, -50, 350, false, .75));  
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 8));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 9));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 10));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
                this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new greenTea(this.game, -50, 350, false, .75));  
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
                this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 0));
                this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new greenTea(this.game, -50, 350, false, .75));  
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 1));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 2));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 3));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 4));
                this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new greenTea(this.game, -50, 350, false, .75));  
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 5));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 6));
                this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 8));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 9));
                this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new greenTea(this.game, -50, 350, false, .75));  
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 10));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
                this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new greenTea(this.game, -50, 350, false, .75));  
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
                this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new greenTea(this.game, -50, 350, false, .75));  
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));  
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
                this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new greenTea(this.game, -50, 350, false, .75));  
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 0));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 1));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 2));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 3));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 4));
                this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new greenTea(this.game, -50, 350, false, .75));  
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 5));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 6));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 8));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 9));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 10));
                this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                    , this.game, new greenTea(this.game, -50, 350, false, .75));  
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 0));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 1));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 2));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 3));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 4));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 5));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 6));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 8));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 9));
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new slime(this.game, -50, 350, .75, 10)); 
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));  
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));  
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));  
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75));  
            this.roundEntity(this.index * this.timeGap + this.initialRoundTime
                , this.game, new greenTea(this.game, -50, 350, false, .75), true);  
        } else if (round == 17) {
            this.game.background.spritesheet = AM.getAsset("./img/win.png");
                        //end
            //show gameover you win
            this.gameOverWin = true;
        }
        // this.spawningFinish = true;
    }
}

roundPlan.prototype.draw = function () {
    if (displayRoundDone) {
        this.generateRoundDone();
        sleep(4000).then(() => {
            displayRoundDone = false;
        });
        if (this.game.running) {
            displayRoundDone = false;
        }
    }

    if (currentLifes < 1) {
        this.generateGameOverLose();
    }

    if (this.gameOverWin) {
        this.generateGameOverWin();
    }
}
