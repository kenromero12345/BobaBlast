/*
Round 1
Green bubble tea x3, coke x2, minicake x5
$100

Round 2
Red bubble tea x5, sprite x5, watermelon x1, cake x1, chocoCake x1
$1760

Round 3
Yellow bubble tea x10, ice golem x1, pumpkin evil x1, pumpkin good x1, bigCake x1, biscuit x2
$475

Round 4
All 11 slimes x9 => 99 slimes
$510
*/
var round;
var gameOverLose = false;
function roundPlan(game) {
    this.round = 0;
    this.index = 1;
    this.game = game;
    this.ctx = game.ctx;
    this.timeGap = 1500;
    this.isRoundStart = true;
    this.isEnding = false;
    this.game.running = false;
    this.spawningFinish = false;
    this.displayRoundDone = false;
    this.gameOverWin = false;
    
}

roundPlan.prototype.roundEntity = function(time, game, entity, isRoundEnding) {
    this.index++;
    sleep(time).then(() => {
        game.addEntity(entity);
        if (isRoundEnding) {
            this.isEnding = true;
        }
    })
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
    ctx.fillText("Round " + this.round + " Complete", x + 35, y + 40  );
}

roundPlan.prototype.generateGameOverLose = function() {
    var ctx = this.ctx;
    var x = 0;
    var y = 0;
    var w = 300;
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
}

roundPlan.prototype.update = function () {
    if (this.isRoundStart && this.game.running) {
        this.round++;
        this.isRoundStart = false;
        this.isEnding = false;
        this.spawningFinish = false;
    } else if (this.isEnding && this.isNoEnemy() && this.game.running) {
        this.isEnding = false;
        this.isRoundStart = true;
        this.game.running = false;
        this.index = 1;
        this.displayRoundDone = true;
        //end of round bonus
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
    round = this.round;
    if (!this.isRoundStart && !this.isEnding && !this.spawningFinish) {
        if (round == 1) {
            this.roundEntity(this.index * this.timeGap, this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap, this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap, this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap, this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap, this.game, new greenTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap, this.game, new miniCake(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap, this.game, new miniCake(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap, this.game, new miniCake(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap, this.game, new miniCake(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap, this.game, new miniCake(this.game, -50, 350, .75), true);
        } else if (round == 2) {
            this.roundEntity(this.index * this.timeGap, this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 0));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 1));
            this.roundEntity(this.index * this.timeGap, this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 2));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 3));
            this.roundEntity(this.index * this.timeGap, this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 4));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 5));
            this.roundEntity(this.index * this.timeGap, this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 6));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap, this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 8));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 9));
            this.roundEntity(this.index * this.timeGap, this.game, new cola(this.game, -50, 350, .85, false));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 10), true);
            this.roundEntity(this.index * this.timeGap, this.game, new biscuit(this.game, -50, 350, .75));    
        } else if (this.round == 3) {
            this.roundEntity(this.index * this.timeGap, this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap, this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap, this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap, this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap, this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap, this.game, new watermelon(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap, this.game, new pumpkinGood(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap, this.game, new biscuit(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap, this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap, this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap, this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap, this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap, this.game, new yellowTea(this.game, -50, 350, true, .75));
            this.roundEntity(this.index * this.timeGap, this.game, new pumpkinEvil(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap, this.game, new cake(this.game, -50, 350, .75));
            this.roundEntity(this.index * this.timeGap, this.game, new biscuit(this.game, -50, 350, .75), true);
        } else if (this.round == 4) {
            this.roundEntity(this.index * this.timeGap, this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap, this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap, this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap, this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap, this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap, this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap, this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap, this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap, this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap, this.game, new redTea(this.game, -50, 350, false, .75));
            this.roundEntity(this.index * this.timeGap, this.game, new cola(this.game, -50, 350, .85, true));
            this.roundEntity(this.index * this.timeGap, this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap, this.game, new bigCake(this.game, -50, 350, .25), true);
            this.roundEntity(this.index * this.timeGap, this.game, new cakeChoco(this.game, -50, 350, .75));
        } else if (this.round == 5) {
            this.roundEntity(this.index * this.timeGap, this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap, this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap, this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap, this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap, this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 0));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 1));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 2));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 3));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 4));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 5));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 6));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 8));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 9));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 10));
            this.roundEntity(this.index * this.timeGap, this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap, this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap, this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap, this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap, this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 0));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 1));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 2));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 3));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 4));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 5));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 6));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 8));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 9));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 10));
            this.roundEntity(this.index * this.timeGap, this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap, this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap, this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap, this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap, this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap, this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 0));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 1));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 2));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 3));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 4));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 5));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 6));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 8));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 9));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 10));
            this.roundEntity(this.index * this.timeGap, this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap, this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap, this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap, this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap, this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 0));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 1));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 2));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 3));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 4));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 5));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 6));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 8));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 9));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 10));
            this.roundEntity(this.index * this.timeGap, this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap, this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap, this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap, this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap, this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 0));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 1));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 2));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 3));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 4));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 5));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 6));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 8));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 9));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 10));
            this.roundEntity(this.index * this.timeGap, this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap, this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap, this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap, this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap, this.game, new iceGolem(this.game, -50, 350, .70));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 0));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 1));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 2));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 3));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 4));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 5));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 6));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 7));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 8));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 9));
            this.roundEntity(this.index * this.timeGap, this.game, new slime(this.game, -50, 350, .75, 10), true);
        } else if (round == 6) {
            //end
            //show gameover you win
            this.gameOverWin = true;
        }
        this.spawningFinish = true;
    }
}

roundPlan.prototype.draw = function () {
    if (this.displayRoundDone) {
        this.generateRoundDone();
        sleep(4000).then(() => {
            this.displayRoundDone = false;
        });
        if (this.game.running) {
            this.displayRoundDone = false;
        }
    }

    if (currentLifes < 1) {
        this.generateGameOverLose();
    }

    if (this.gameOverWin) {
        this.generateGameOverWin();
    }
}
