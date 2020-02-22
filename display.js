var currentMoney = 1000;
var currentLifes = 100;

var purchaseMode = false;
var paused = false;
var selectedTowerRow = -1;
var selectedTowerColumn = -1;
var hoverTowerRow = -1;
var hoverTowerColumn = -1;
var towerArray = [];


function display(game, towerArr) {
    towerArray = towerArr;
    this.width = 300;
    this.height = 600;
    this.startX = 900;
    this.startY = 0;
    this.centerFontX = 925;
    this.centerFontY = 50;

    this.scoreWidth = 250;
    this.scoreHeight = 40;
    this.scoreStartX = 925;
    this.scoreStartY = 120;

    this.lifeWidth = 125;
    this.lifeHeight = 40;
    this.lifeStartX = 1050;
    this.lifeStartY = 70;

    this.roundWidth = 120;
    this.roundHeight = 40;
    this.roundStartX = 925;
    this.roundStartY = 70;

    this.towerWidth = 250;
    this.towerHeight = 240;
    this.towerStartX = 925;
    this.towerStartY = 170;

    this.buttonWidth = 250;
    this.buttonHeight = 50;
    this.buttonStartX = 925;
    this.buttonStartY = 540;

    this.descriptionBoxWidth = 250;
    this.descriptionBoxHeight = 110;
    this.descriptionBoxStartX = 925;
    this.descriptionBoxStartY = 420;

    this.game = game;
    this.ctx = game.ctx;
}

display.prototype.draw = function () {
    var ctx = this.ctx;
    var x = this.startX;
    var y = this.startY;
    var w = this.width;
    var h = this.height;
    // ctx.strokeStyle = "green";
    // ctx.rect(x,y,w,h);
    // ctx.stroke();
    ctx.fillStyle = "#42f5b9";
    ctx.fillRect(x,y,w,h);
    ctx.fillStyle = "black";
    ctx.font = '48px Bahnschrift SemiBold';
    ctx.fillText("B", this.centerFontX, this.centerFontY);
    ctx.font = '44px Bahnschrift Light';
    ctx.fillText("OBA", this.centerFontX + 30, this.centerFontY);
    ctx.font = '48px Bahnschrift SemiBold';
    ctx.fillText("B", this.centerFontX + 115, this.centerFontY);
    ctx.font = '44px Bahnschrift Light';
    ctx.fillText("LAST", this.centerFontX + 145, this.centerFontY);
    this.generateRoundBoard();
    this.generateScoreBoard();
    this.generateLifeBoard();
    this.generateTowerBoard();
    if(!this.game.running && !paused) {
        this.generateStartButton();
    } else if (!this.game.running && paused) {
        this.generateResumeButton();
    } else if (this.game.running && !paused) {
        this.generatePauseButton();
    }
    this.generateDescriptionBox();

    if (this.game.mouse) {
        var mouse = this.game.mouse;
        // Disable Hover Mode if Not Within Bounds of Boba Tower Store
        if(mouse.x < 945 || mouse.x >= 1155 || mouse.y < 200 && mouse.y >= 410) {
            hoverTowerColumn = -1;
            hoverTowerRow = -1;
        }
        // Hover Over Feature for Cancelling Purchase
        if(mouse.x < this.descriptionBoxStartX - 30 + this.descriptionBoxWidth && mouse.x >= this.descriptionBoxStartX + 20 
            && mouse.y < this.descriptionBoxStartY - 5 + this.descriptionBoxHeight && mouse.y >= this.descriptionBoxStartY + 80) {
            if (purchaseMode) {
                var purchaseX = this.descriptionBoxStartX + 20;
                var purchaseY = this.descriptionBoxStartY + 80;
                var purchaseW = this.descriptionBoxWidth - 50;
                var purchaseH = this.descriptionBoxHeight - 85;
                ctx.fillStyle = "red";
                ctx.fillRect(purchaseX,purchaseY,purchaseW,purchaseH);
            
                ctx.fillStyle = "white";
                ctx.font = '20px Bahnschrift Light';
                ctx.fillText("Cancel Purchase", purchaseX + 25, purchaseY + 20  ); 
            }
        }
        // Hover Over Feature for Starting Round
        if(mouse.x < this.buttonStartX + this.buttonWidth + 10 && mouse.x >= this.buttonStartX 
            && mouse.y < this.buttonStartY + this.buttonHeight && mouse.y >= this.buttonStartY) {
            if(!this.game.running && !paused) {
                var x = this.buttonStartX;
                var y = this.buttonStartY;
                var w = this.buttonWidth;
                var h = this.buttonHeight;
                ctx.fillStyle = "green";
                ctx.fillRect(x,y,w,h);
                ctx.fillStyle = "white";
                ctx.font = '30px Bahnschrift Light';
                ctx.fillText("S", this.buttonStartX + 35, this.buttonStartY + 40  );
                ctx.font = '26px Bahnschrift Light';
                ctx.fillText("TART", this.buttonStartX + 55, this.buttonStartY + 40  );
                ctx.font = '30px Bahnschrift Light';
                ctx.fillText("R", this.buttonStartX + 120, this.buttonStartY + 40  );
                ctx.font = '26px Bahnschrift Light';
                ctx.fillText("OUND", this.buttonStartX + 140, this.buttonStartY + 40  );
            }
            if(this.game.running && !paused) {
                var x = this.buttonStartX;
                var y = this.buttonStartY;
                var w = this.buttonWidth;
                var h = this.buttonHeight;
                ctx.fillStyle = "green";
                ctx.fillRect(x,y,w,h);
                ctx.fillStyle = "white";
                ctx.font = '30px Bahnschrift Light';
                ctx.fillText("P", this.buttonStartX + 35, this.buttonStartY + 40  );
                ctx.font = '26px Bahnschrift Light';
                ctx.fillText("AUSE", this.buttonStartX + 50, this.buttonStartY + 40  );
                ctx.font = '30px Bahnschrift Light';
                ctx.fillText("G", this.buttonStartX + 120, this.buttonStartY + 40  );
                ctx.font = '26px Bahnschrift Light';
                ctx.fillText("AME", this.buttonStartX + 140, this.buttonStartY + 40  );
            }
            if(!this.game.running && paused) {
                var ctx = this.ctx;
                var x = this.buttonStartX;
                var y = this.buttonStartY;
                var w = this.buttonWidth;
                var h = this.buttonHeight;
                ctx.fillStyle = "green";
                ctx.fillRect(x,y,w,h);
                ctx.fillStyle = "white";
                ctx.font = '30px Bahnschrift Light';
                ctx.fillText("R", this.buttonStartX + 35, this.buttonStartY + 40  );
                ctx.font = '26px Bahnschrift Light';
                ctx.fillText("ESUME", this.buttonStartX + 55, this.buttonStartY + 40  );
                ctx.font = '30px Bahnschrift Light';
                ctx.fillText("G", this.buttonStartX + 150, this.buttonStartY + 40  );
                ctx.font = '26px Bahnschrift Light';
                ctx.fillText("AME", this.buttonStartX + 170, this.buttonStartY + 40  );
            }
        }
    }

    if (this.game.click) {
        var click = this.game.click;
        // Cancel Button Click Deselects the Current Tower Selection
        if (purchaseMode) {
            if(click.x < this.descriptionBoxStartX - 30 + this.descriptionBoxWidth
                && click.x >= this.descriptionBoxStartX + 20 
                && click.y < this.descriptionBoxStartY - 5 + this.descriptionBoxHeight && click.y >= this.descriptionBoxStartY + 80)  {
                purchaseMode = false;
                selectedTowerColumn = -1;
                selectedTowerRow = -1;
            }
        }
        // Start Round Button Click
        if(click.x < this.buttonStartX + this.buttonWidth + 10 && click.x >= this.buttonStartX 
            && click.y < this.buttonStartY + this.buttonHeight && click.y >= this.buttonStartY) {
                if(!this.game.running && !paused) {
                    this.game.running = true;
                } else if(this.game.running && !paused) {
                    this.game.running = false;
                    paused = true;
                } else if(!this.game.running && paused) {
                    this.game.running = true;
                    paused = false;
                }
        }
        this.game.click = false;
    }
}

display.prototype.generateRoundBoard = function () {
    var ctx = this.ctx;
    var x = this.roundStartX;
    var y = this.roundStartY;
    var w = this.roundWidth;
    var h = this.roundHeight;
    ctx.fillStyle = "#3ac9a6";
    ctx.fillRect(x,y,w,h);
    ctx.fillStyle = "black";
    ctx.font = '24px Bahnschrift Light';
    ctx.fillText("Round " + round, this.roundStartX + 10, this.roundStartY + 30  );
}

display.prototype.generateScoreBoard = function () {
    var ctx = this.ctx;
    var x = this.scoreStartX;
    var y = this.scoreStartY;
    var w = this.scoreWidth;
    var h = this.scoreHeight;
    ctx.fillStyle = "#3ac9a6";
    ctx.fillRect(x,y,w,h);
    ctx.fillStyle = "black";
    ctx.font = '26px Bahnschrift Light';
    ctx.fillText("Money: " + currentMoney, this.scoreStartX + 20, this.scoreStartY + 30  );
}

display.prototype.generateLifeBoard = function () {
    var ctx = this.ctx;
    var x = this.lifeStartX;
    var y = this.lifeStartY;
    var w = this.lifeWidth;
    var h = this.lifeHeight;
    ctx.fillStyle = "#3ac9a6";
    ctx.fillRect(x,y,w,h);
    ctx.fillStyle = "black";
    ctx.font = '24px Bahnschrift Light';
    ctx.fillText("Lives: " + currentLifes, this.lifeStartX + 10, this.lifeStartY + 30  );
}

display.prototype.generateTowerBoard = function () {
    var ctx = this.ctx;
    var x = this.towerStartX;
    var y = this.towerStartY;
    var w = this.towerWidth;
    var h = this.towerHeight;
    ctx.fillStyle = "#3ac9a6";
    ctx.fillRect(x,y,w,h);
    ctx.fillStyle = "black";
    ctx.font = '20px Bahnschrift Light';
    ctx.fillText("Boba Tower Store", this.towerStartX + 40, this.towerStartY + 25);
}

display.prototype.generateStartButton = function() {
    var ctx = this.ctx;
    var x = this.buttonStartX;
    var y = this.buttonStartY;
    var w = this.buttonWidth;
    var h = this.buttonHeight;
    ctx.fillStyle = "#ff4747";
    ctx.fillRect(x,y,w,h);
    ctx.fillStyle = "black";
    ctx.font = '30px Bahnschrift Light';
    ctx.fillText("S", this.buttonStartX + 35, this.buttonStartY + 40  );
    ctx.font = '26px Bahnschrift Light';
    ctx.fillText("TART", this.buttonStartX + 55, this.buttonStartY + 40  );
    ctx.font = '30px Bahnschrift Light';
    ctx.fillText("R", this.buttonStartX + 120, this.buttonStartY + 40  );
    ctx.font = '26px Bahnschrift Light';
    ctx.fillText("OUND", this.buttonStartX + 140, this.buttonStartY + 40  );
}

display.prototype.generateResumeButton = function() {
    var ctx = this.ctx;
    var x = this.buttonStartX;
    var y = this.buttonStartY;
    var w = this.buttonWidth;
    var h = this.buttonHeight;
    ctx.fillStyle = "#ff4747";
    ctx.fillRect(x,y,w,h);
    ctx.fillStyle = "black";
    ctx.font = '30px Bahnschrift Light';
    ctx.fillText("R", this.buttonStartX + 35, this.buttonStartY + 40  );
    ctx.font = '26px Bahnschrift Light';
    ctx.fillText("ESUME", this.buttonStartX + 55, this.buttonStartY + 40  );
    ctx.font = '30px Bahnschrift Light';
    ctx.fillText("G", this.buttonStartX + 150, this.buttonStartY + 40  );
    ctx.font = '26px Bahnschrift Light';
    ctx.fillText("AME", this.buttonStartX + 170, this.buttonStartY + 40  );
}

display.prototype.generatePauseButton = function() {
    var ctx = this.ctx;
    var x = this.buttonStartX;
    var y = this.buttonStartY;
    var w = this.buttonWidth;
    var h = this.buttonHeight;
    ctx.fillStyle = "#ff4747";
    ctx.fillRect(x,y,w,h);
    ctx.fillStyle = "black";
    ctx.font = '30px Bahnschrift Light';
    ctx.fillText("P", this.buttonStartX + 35, this.buttonStartY + 40  );
    ctx.font = '26px Bahnschrift Light';
    ctx.fillText("AUSE", this.buttonStartX + 50, this.buttonStartY + 40  );
    ctx.font = '30px Bahnschrift Light';
    ctx.fillText("G", this.buttonStartX + 120, this.buttonStartY + 40  );
    ctx.font = '26px Bahnschrift Light';
    ctx.fillText("AME", this.buttonStartX + 140, this.buttonStartY + 40  );
}

display.prototype.generateDescriptionBox = function() {
    var ctx = this.ctx;
    var x = this.descriptionBoxStartX;
    var y = this.descriptionBoxStartY;
    var w = this.descriptionBoxWidth;
    var h = this.descriptionBoxHeight;
    ctx.fillStyle = "#ff4747";
    ctx.fillRect(x,y,w,h);

    var xGrid = hoverTowerColumn;
    var yGrid = hoverTowerRow; 
    if(xGrid === -1 && yGrid === -1) {
        xGrid = selectedTowerColumn;
        yGrid = selectedTowerRow;
    }
    if(xGrid === -1 && yGrid === -1) {
        return;
    }
    var currentTower = towerArray[yGrid][xGrid];
    ctx.fillStyle = "black";
    ctx.font = '14px Bahnschrift SemiBold';
    ctx.fillText("Name: " + currentTower.name, this.descriptionBoxStartX + 15, this.descriptionBoxStartY + 20);
    ctx.fillText("Cost: " + currentTower.cost, this.descriptionBoxStartX + 160, this.descriptionBoxStartY + 20);

    var txt = 'Description: ' + currentTower.description;
    var lineX = this.descriptionBoxStartX + 15;
    var lineY = this.descriptionBoxStartY + 40;
    var lineheight = 15;
    var lines = txt.split('\n');

    for (var i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], lineX, lineY + (i*lineheight) );
    }

    if (purchaseMode && towerArray[yGrid][xGrid] === towerArray[selectedTowerRow][selectedTowerColumn] ) {
        var purchaseX = this.descriptionBoxStartX + 20;
        var purchaseY = this.descriptionBoxStartY + 80;
        var purchaseW = this.descriptionBoxWidth - 50;
        var purchaseH = this.descriptionBoxHeight - 85;
        ctx.fillStyle = "#56fc53";
        ctx.fillRect(purchaseX,purchaseY,purchaseW,purchaseH);
    
        ctx.fillStyle = "black";
        ctx.font = '20px Bahnschrift Light';
        ctx.fillText("Cancel Purchase", purchaseX + 25, purchaseY + 20  ); 
    }
}

display.prototype.update = function () {
    if(!this.game.running) return;
    // currentMoney--;
    // currentLifes--;
}