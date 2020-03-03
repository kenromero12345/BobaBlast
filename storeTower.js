function storeTower(game, name, cost, frequency, radius, description, spritesheet, xCoordinate, yCoordinate, 
    width, height, storeGridX, storeGridY, towerType, maxRangeUpgrade, maxDamageUpgrade, maxSpeedUpgrade, 
    maxPoisonUpgrade, maxLaserUpgrade, maxFreezeUpgrade, maxFrequencyUpgrade, maxParalyzeUpgrade, maxExplosiveUpgrade,
    maxRicochetUpgrade, maxPierceUpgrade, maxHomingUpgrade, initRangeUpgrade, initDamageUpgrade, initSpeedUpgrade, 
    initPoisonUpgrade, initLaserUpgrade, initFreezeUpgrade, initFrequencyUpgrade, initParalyzeUpgrade, initExplosiveUpgrade,
    initRicochetUpgrade, initPierceUpgrade, initHomingUpgrade, roundUnlock) {
    this.game = game;
    this.name = name;
    this.towerType = towerType;
    this.cost = cost;
    this.frequency = frequency;
    this.radius = radius;
    this.description = description;
    this.spritesheet = spritesheet;
    this.ctx = game.ctx;
    this.animationStable = new Animation(spritesheet, 580, 90, 350, 350, 1, 0.1, 1, true, 0.2);
    this.animationHover = new Animation(spritesheet, 105, 90, 350, 350, 1, 0.1 , 1, true, 0.2);
    this.x = xCoordinate;
    this.y = yCoordinate;
    this.storeGridX = storeGridX;
    this.storeGridY = storeGridY;
    this.width = width;
    this.height = height;
    // Max Levels
    this.maxRangeUpgrade = maxRangeUpgrade;
    this.maxDamageUpgrade = maxDamageUpgrade;
    this.maxSpeedUpgrade = maxSpeedUpgrade;
    this.maxPoisonUpgrade = maxPoisonUpgrade;
    this.maxLaserUpgrade = maxLaserUpgrade;
    this.maxFreezeUpgrade = maxFreezeUpgrade;
    this.maxFrequencyUpgrade = maxFrequencyUpgrade;
    this.maxParalyzeUpgrade = maxParalyzeUpgrade;
    this.maxExplosiveUpgrade = maxExplosiveUpgrade;
    this.maxRicochetUpgrade = maxRicochetUpgrade;
    this.maxPierceUpgrade = maxPierceUpgrade;
    this.maxHomingUpgrade = maxHomingUpgrade;
    // Initial Levels
    this.initRangeUpgrade = initRangeUpgrade;
    this.initDamageUpgrade = initDamageUpgrade;
    this.initSpeedUpgrade = initSpeedUpgrade;
    this.initPoisonUpgrade = initPoisonUpgrade;
    this.initLaserUpgrade = initLaserUpgrade;
    this.initFreezeUpgrade = initFreezeUpgrade;
    this.initFrequencyUpgrade = initFrequencyUpgrade;
    this.initParalyzeUpgrade = initParalyzeUpgrade;
    this.initExplosiveUpgrade = initExplosiveUpgrade;
    this.initRicochetUpgrade = initRicochetUpgrade;
    this.initPierceUpgrade = initPierceUpgrade;
    this.initHomingUpgrade = initHomingUpgrade;
    this.roundUnlock = roundUnlock;
}

storeTower.prototype.draw = function () {
    // If selected tower, show selected tower animation
    if(selectedTowerRow === this.storeGridY && selectedTowerColumn === this.storeGridX) {
        this.animationHover.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    } 
    // If hover over tower, show hover tower animation
    else if (hoverTowerRow === this.storeGridY && hoverTowerColumn === this.storeGridX) {
        this.animationHover.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    } 
    // Else show regular tower animation
    else {
        this.animationStable.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }
}

storeTower.prototype.update = function () {
    // // Click Mode: If you click a tower, set global variable for selected tower row/column
    if (this.game.click && gameStarted && !paused) {
        // console.log("CLICK");
        var click = this.game.click;
        if(click.x >= this.x && click.x < this.x + 70 && click.y >= this.y && click.y < this.y + 70) {
            if(round < this.roundUnlock) {
                return;
            } 
            if (currentMoney - this.cost < 0) {
                return;
            }
            if(purchaseMode && selectedTowerColumn == this.storeGridX && selectedTowerRow == this.storeGridY) {
                purchaseMode = false;
                selectedTowerColumn = -1;
                selectedTowerRow = -1;
            } else {
                purchaseMode = true;
                selectedTowerColumn = this.storeGridX;
                selectedTowerRow =this.storeGridY;
            }
        }
    }
    // Hover Mode: If hover over a tower, set global variable for hover tower row/column
    if (this.game.mouse && gameStarted && !paused) {
        var mouse = this.game.mouse;
        if(mouse.x >= this.x && mouse.x < this.x + 70 && mouse.y >= this.y && mouse.y < this.y + 70) {
            hoverTowerRow = this.storeGridY;
            hoverTowerColumn = this.storeGridX;
        } 
    } 
    // if (this.game.mouseDown && gameStarted && !paused) {
    //     // console.log("CLICK");
    //     var mouseDown = this.game.mouseDown;
    //     if(mouseDown.x >= this.x && mouseDown.x < this.x + 70 && mouseDown.y >= this.y && mouseDown.y < this.y + 70) {
    //         if (currentMoney - this.cost < 0) {
    //             return;
    //         }
    //         purchaseMode = true;
    //         selectedTowerColumn = this.storeGridX;
    //         selectedTowerRow =this.storeGridY;
    //     }
    // } else {
    //     purchaseMode = false;
    // }

    // if (this.game.mouseUp && gameStarted && !paused) {
    //     // console.log("u")
    //     var mouseUp = this.game.mouseUp;
    //     if (purchaseMode && mouseUp.x < 0 && mouseUp.x > 900 && mouseUp.y > 600 && mouseUp.y < 0 ) {
    //         // console.log("u")
    //         purchaseMode = false;
    //     }
    // }
}
