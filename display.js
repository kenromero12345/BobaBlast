var currentMoney = 1000;
var currentLifes = 100;

var upgradeMode = false;
var selectedUpgradableTower = null;
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
    this.centerFontY = 40;

    this.scoreWidth = 115;
    this.scoreHeight = 40;
    this.scoreStartX = 1081;
    this.scoreStartY = 45;

    this.lifeWidth = 90;
    this.lifeHeight = 40;
    this.lifeStartX = 990;
    this.lifeStartY = 45;

    this.roundWidth = 84;
    this.roundHeight = 40;
    this.roundStartX = 905;
    this.roundStartY = 45;

    this.towerWidth = 290;
    this.towerHeight = 240;
    this.towerStartX = 905;
    this.towerStartY = 90;

    this.buttonWidth = 290;
    this.buttonHeight = 50;
    this.buttonStartX = 905;
    this.buttonStartY = 540;

    this.descriptionBoxWidth = 290;
    this.descriptionBoxHeight = 200;
    this.descriptionBoxStartX = 905;
    this.descriptionBoxStartY = 335;

    this.fastForwardStartX = 1145;
    this.fastForwardStartY = 540;
    this.fastForwardHeight = 50;
    this.fastForwardWidth = 50;

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
    this.generateFastForwardButton();

    if (this.game.mouse) {
        var mouse = this.game.mouse;
        // Disable Hover Mode if Not Within Bounds of Boba Tower Store
        if(mouse.x < 945 || mouse.x >= 1155 || mouse.y < 200 && mouse.y >= 410) {
            hoverTowerColumn = -1;
            hoverTowerRow = -1;
        }
        // Hover Over Feature for Cancelling Purchase
        if(mouse.x < this.descriptionBoxStartX + this.descriptionBoxWidth - 3 && mouse.x >= this.descriptionBoxStartX + 5
            && mouse.y < this.descriptionBoxStartY + this.descriptionBoxHeight - 3 && mouse.y >= this.descriptionBoxStartY + this.descriptionBoxHeight - 35) {
            if (purchaseMode) {
                var purchaseX = this.descriptionBoxStartX + 5;
                var purchaseY = this.descriptionBoxStartY + this.descriptionBoxHeight - 35;
                var purchaseW = this.descriptionBoxWidth - 10;
                var purchaseH = 30;
                ctx.fillStyle = "red";
                ctx.fillRect(purchaseX,purchaseY,purchaseW,purchaseH);
            
                ctx.fillStyle = "white";
                ctx.font = '20px Bahnschrift Light';
                ctx.fillText("Cancel Purchase", purchaseX + 60, purchaseY + 25  ); 
            }
        }
        // Hover Over Feature for Selling Tower
        if(mouse.x < this.descriptionBoxStartX + 270 + 10 && mouse.x >= this.descriptionBoxStartX + 10
            && mouse.y < this.descriptionBoxStartY + 175 + 20 + 2 && mouse.y >= this.descriptionBoxStartY + 175 + 2) {
            if (upgradeMode && !purchaseMode) {
                var x = this.descriptionBoxStartX + 10;
                var y = this.descriptionBoxStartY + 175;
                var w = 270;
                var h = 20;
                ctx.fillStyle = "red";
                ctx.fillRect(x,y,w,h);
                ctx.fillStyle = "white";
                ctx.font = '16px Bahnschrift Light';
                ctx.fillText("Sell Tower for $" + selectedUpgradableTower.sellingCost, x + 60, y + 15);
            }
        }
        // Hover Over Feature for Priority Mode
        if(mouse.x < this.descriptionBoxStartX + 270 + 10 && mouse.x >= this.descriptionBoxStartX + 10
            && mouse.y < this.descriptionBoxStartY + 150 + 20 + 2 && mouse.y >= this.descriptionBoxStartY + 150 + 2) {
            if (upgradeMode && !purchaseMode) {
                var x = this.descriptionBoxStartX + 10;
                var y = this.descriptionBoxStartY + 150;
                var w = 270;
                var h = 20;
                ctx.fillStyle = "red";
                ctx.fillRect(x,y,w,h);
                ctx.fillStyle = "white";
                ctx.font = '12px Bahnschrift Light';
                ctx.fillText("Shooting Priority: " + selectedUpgradableTower.shootingPriorityList[selectedUpgradableTower.shootPriorityType], x + 15, y + 15);
            
            }
        }
        // Hover Over Feature for Upgrade Tower Range
        if(mouse.x < this.descriptionBoxStartX + 200+ 80 && mouse.x >= this.descriptionBoxStartX + 200
            && mouse.y < this.descriptionBoxStartY + 30 + 20 + 2 && mouse.y >= this.descriptionBoxStartY + 30 + 2) {
            if (upgradeMode && !purchaseMode) {
                var x = this.descriptionBoxStartX + 200;
                var y = this.descriptionBoxStartY + 30;
                var w = 80;
                var h = 20;
                ctx.fillStyle = "red";
                ctx.fillRect(x,y,w,h);
                ctx.fillStyle = "white";
                ctx.font = '16px Bahnschrift Light';
                ctx.fillText("↑ $" + selectedUpgradableTower.rangeUpgradeCost, x + 15, y + 15);
            }
        }
        // Hover Over Feature for Upgrade Boba Damage
        if(mouse.x < this.descriptionBoxStartX + 200 + 80 && mouse.x >= this.descriptionBoxStartX + 200
            && mouse.y < this.descriptionBoxStartY + 55 + 20 + 2 && mouse.y >= this.descriptionBoxStartY + 55 + 2) {
            if (upgradeMode && !purchaseMode) {
                var x = this.descriptionBoxStartX + 200;
                var y = this.descriptionBoxStartY + 55;
                var w = 80;
                var h = 20;
                ctx.fillStyle = "red";
                ctx.fillRect(x,y,w,h);
                ctx.fillStyle = "white";
                ctx.font = '16px Bahnschrift Light';
                ctx.fillText("↑ $" + selectedUpgradableTower.damageUpgradeCost, x + 15, y + 15);
            }
        }
        // Hover Over Feature for Upgrade Boba Speed
        if(mouse.x < this.descriptionBoxStartX + 200 + 80 && mouse.x >= this.descriptionBoxStartX + 200
            && mouse.y < this.descriptionBoxStartY + 80 + 20 + 2 && mouse.y >= this.descriptionBoxStartY + 80 + 2) {
            if (upgradeMode && !purchaseMode) {
                var x = this.descriptionBoxStartX + 200;
                var y = this.descriptionBoxStartY + 80;
                var w = 80;
                var h = 20;
                ctx.fillStyle = "red";
                ctx.fillRect(x,y,w,h);
                ctx.fillStyle = "white";
                ctx.font = '16px Bahnschrift Light';
                ctx.fillText("↑ $" + selectedUpgradableTower.speedUpgradeCost, x + 15, y + 15);
            }
        }
        // Hover Over Feature for Starting Round
        if(mouse.x < this.buttonStartX + this.buttonWidth - 55 && mouse.x >= this.buttonStartX
            && mouse.y < this.buttonStartY + this.buttonHeight && mouse.y >= this.buttonStartY) {
            if(!this.game.running && !paused) {
                var x = this.buttonStartX;
                var y = this.buttonStartY;
                var w = this.buttonWidth;
                var h = this.buttonHeight;
                ctx.fillStyle = "green";
                ctx.fillRect(x,y,w - 55,h);
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
                ctx.fillRect(x,y,w - 55,h);
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
                ctx.fillRect(x,y,w - 55,h);
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

            if(mouse.x < this.buttonStartX + this.buttonWidth - 55 && mouse.x >= this.buttonStartX
            && mouse.y < this.buttonStartY + this.buttonHeight && mouse.y >= this.buttonStartY) {
            if(!this.game.running && !paused) {
                var x = this.buttonStartX;
                var y = this.buttonStartY;
                var w = this.buttonWidth;
                var h = this.buttonHeight;
                ctx.fillStyle = "green";
                ctx.fillRect(x,y,w - 55,h);
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
        }
    }

    var x = this.fastForwardStartX;
    var y = this.fastForwardStartY;
    var w = this.fastForwardWidth;
    var h = this.fastForwardHeight;
    if(mouse.x < x + w  && mouse.x >= x
        && mouse.y < y + h && mouse.y >= y) {
        // if(!this.game.running && !paused) {
            // var ctx = this.ctx;
            var x = this.fastForwardStartX;
            var y = this.fastForwardStartY;
            var w = this.fastForwardWidth;
            var h = this.fastForwardHeight;
            ctx.fillStyle = "green";
            ctx.fillRect(x,y,w ,h);
            ctx.fillStyle = "white";
            ctx.font = '30px Bahnschrift Light';
            if (this.game.speed == 1) {
                ctx.fillText("x2", this.fastForwardStartX + 8, this.fastForwardStartY + 40  );
            } else {
                ctx.fillText("x1", this.fastForwardStartX + 8, this.fastForwardStartY + 40  );
            }
        // }
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
        // Selling Tower Button Sells the Current Tower Selection and Gets Rid of It
        // And Removes it from the board
        if(mouse.x < this.descriptionBoxStartX + 270 + 10 && mouse.x >= this.descriptionBoxStartX + 10
            && mouse.y < this.descriptionBoxStartY + 175 + 20 + 2 && mouse.y >= this.descriptionBoxStartY + 175 + 2) {
            if (upgradeMode && !purchaseMode) {
                upgradeMode = false;
                for(var i = 0; i < this.game.activeTowers.length; i++) {
                    if(this.game.activeTowers[i] === selectedUpgradableTower) {
                        currentMoney += selectedUpgradableTower.sellingCost;
                        GAMEBOARD[this.game.activeTowers[i].gridX ][this.game.activeTowers[i].gridY].occupied = false;
                        this.game.activeTowers[i].removeFromWorld = true;
                    }

                }
                selectedUpgradableTower = null;
            }
        }
        // Start Round Button Click
        if(click.x < this.buttonStartX + this.buttonWidth + 10 - 55 && click.x >= this.buttonStartX 
            && click.y < this.buttonStartY + this.buttonHeight && click.y >= this.buttonStartY  && !gameOverLose) {
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

        var x = this.fastForwardStartX;
        var y = this.fastForwardStartY;
        var w = this.fastForwardHeight;
        var h = this.fastForwardWidth;
        if(click.x < x + w  && click.x >= x
            && click.y < y + h && click.y >= y) {
                if (this.game.speed == 1) {
                    this.game.speed = 2;
                } else {
                    this.game.speed = 1;
                }
            // // if(!this.game.running && !paused) {
            //     // var ctx = this.ctx;
            //     var x = this.buttonStartX + 230 - 25 - 5;
            //     var y = this.buttonStartY;
            //     var w = this.buttonHeight;
            //     var h = this.buttonHeight;
            //     ctx.fillStyle = "green";
            //     ctx.fillRect(x,y,w ,h);
            //     ctx.fillStyle = "black";
            //     ctx.font = '30px Bahnschrift Light';
            //     ctx.fillText("x2", x + 8, this.buttonStartY + 40  );
            // // }
        }
        this.game.click = false;
    }
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
    ctx.font = '18px Bahnschrift';
    ctx.fillText("Round " + round, this.roundStartX + 5, this.roundStartY + 30  );
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
    ctx.font = '18px Bahnschrift';
    ctx.fillText("Money: " + currentMoney, this.scoreStartX + 3, this.scoreStartY + 30  );
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
    ctx.font = '18px Bahnschrift';
    if(currentLifes > 100) {
        ctx.fillText("Lives: ∞", this.lifeStartX + 5, this.lifeStartY + 30  );
    } else {
        ctx.fillText("Lives: " + currentLifes, this.lifeStartX + 5, this.lifeStartY + 30  );
    }
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
    ctx.font = '18px Bahnschrift';
    ctx.fillText("Boba Shooter Store", this.towerStartX + 65, this.towerStartY + 20);
}

display.prototype.generateStartButton = function() {
    var ctx = this.ctx;
    var x = this.buttonStartX;
    var y = this.buttonStartY;
    var w = this.buttonWidth;
    var h = this.buttonHeight;
    ctx.fillStyle = "#ff4747";
    ctx.fillRect(x,y,w - 55,h);
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

display.prototype.generateFastForwardButton = function() {
    var ctx = this.ctx;
    var x = this.fastForwardStartX;
    var y = this.fastForwardStartY;
    var w = this.fastForwardWidth;
    var h = this.fastForwardHeight;
    ctx.fillStyle = "#ff4747";
    ctx.fillRect(x,y,w,h);
    ctx.fillStyle = "black";
    ctx.font = '30px Bahnschrift Light';
    if (this.game.speed == 1) {
        ctx.fillText("x2", this.fastForwardStartX + 8, this.fastForwardStartY + 40  );
    } else {
        ctx.fillText("x1", this.fastForwardStartX + 8, this.fastForwardStartY + 40  );
    }
}

display.prototype.generateResumeButton = function() {
    var ctx = this.ctx;
    var x = this.buttonStartX;
    var y = this.buttonStartY;
    var w = this.buttonWidth;
    var h = this.buttonHeight;
    ctx.fillStyle = "#ff4747";
    ctx.fillRect(x,y,w - 55,h);
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
    ctx.fillRect(x,y,w - 55,h);
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
        if(upgradeMode) {
            ctx.fillStyle = "black";
            ctx.font = '20px Bahnschrift SemiBold';
            ctx.fillText("Upgrade " + selectedUpgradableTower.towerType.name + " Tower", this.descriptionBoxStartX + 15, this.descriptionBoxStartY + 20);
            ctx.font = '16px Bahnschrift SemiBold';
            ctx.fillText("Tower Range: Level " + selectedUpgradableTower.rangeLevel, this.descriptionBoxStartX + 15, this.descriptionBoxStartY + 45);
            ctx.fillText("Boba Damage: Level " + selectedUpgradableTower.damageLevel, this.descriptionBoxStartX + 15, this.descriptionBoxStartY + 70);
            ctx.fillText("Boba Speed: Level " + selectedUpgradableTower.speedLevel, this.descriptionBoxStartX + 15, this.descriptionBoxStartY + 95);
            this.generateUpgradeAttributeButton(selectedUpgradableTower.rangeUpgradeCost, 200, 30);
            this.generateUpgradeAttributeButton(selectedUpgradableTower.damageUpgradeCost, 200, 55);
            this.generateUpgradeAttributeButton(selectedUpgradableTower.speedUpgradeCost, 200, 80);
            this.generateSellTowerButton();
            this.generateShootingPriorityButton();
        }
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
        var purchaseX = this.descriptionBoxStartX + 5;
        var purchaseY = this.descriptionBoxStartY + this.descriptionBoxHeight - 35;
        var purchaseW = this.descriptionBoxWidth - 10;
        var purchaseH = 30;
        ctx.fillStyle = "#56fc53";
        ctx.fillRect(purchaseX,purchaseY,purchaseW,purchaseH);
    
        ctx.fillStyle = "black";
        ctx.font = '20px Bahnschrift Light';
        ctx.fillText("Cancel Purchase", purchaseX + 60, purchaseY + 25  ); 
    }
}

display.prototype.update = function () {
    if(!this.game.running) return;
    // currentMoney--;
    // currentLifes--;
}

display.prototype.generateUpgradeAttributeButton = function(cost, xOffset, yOffset) {
    var ctx = this.ctx;
    var x = this.descriptionBoxStartX + xOffset;
    var y = this.descriptionBoxStartY + yOffset;
    var w = 80;
    var h = 20;
    ctx.fillStyle = "green";
    ctx.fillRect(x,y,w,h);
    ctx.fillStyle = "white";
    ctx.font = '16px Bahnschrift Light';
    ctx.fillText("↑ $" + cost, x + 15, y + 15);
}

display.prototype.generateShootingPriorityButton = function() {
    var ctx = this.ctx;
    var x = this.descriptionBoxStartX + 10;
    var y = this.descriptionBoxStartY + 150;
    var w = 270;
    var h = 20;
    ctx.fillStyle = "green";
    ctx.fillRect(x,y,w,h);
    ctx.fillStyle = "white";
    ctx.font = '12px Bahnschrift Light';
    ctx.fillText("Shooting Priority: " + selectedUpgradableTower.shootingPriorityList[selectedUpgradableTower.shootPriorityType], x + 15, y + 15);
}

display.prototype.generateSellTowerButton = function() {
    var ctx = this.ctx;
    var x = this.descriptionBoxStartX + 10;
    var y = this.descriptionBoxStartY + 175;
    var w = 270;
    var h = 20;
    ctx.fillStyle = "green";
    ctx.fillRect(x,y,w,h);
    ctx.fillStyle = "white";
    ctx.font = '16px Bahnschrift Light';
    ctx.fillText("Sell Tower for $" + selectedUpgradableTower.sellingCost, x + 60, y + 15);
}
