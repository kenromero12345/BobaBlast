function boardTower(game, gridX, gridY, type) {
    this.towerType = type;
    for (var i = 0; i < game.activeTowers.length; i++) {
        if (game.activeTowers[i].towerType.name == "powerUp") {
            //it should have a depth
            //check if this tower is part of that depth
            //if true apply buffs on this tower
        }
    }
    this.statusEffectEnabled = false;
    this.name = type.towerType;
    this.depthLevel = type.initDepthUpgrade;
    this.rangeLevel = type.initRangeUpgrade;
    this.damageLevel = type.initDamageUpgrade;
    this.speedLevel = type.initSpeedUpgrade;
    this.poisonLevel = type.initPoisonUpgrade;
    this.laserLevel = type.initLaserUpgrade;
    this.freezeLevel = type.initFreezeUpgrade;
    this.frequencyLevel = type.initFrequencyUpgrade;
    this.paralyzeLevel = type.initParalyzeUpgrade;
    this.explosiveLevel = type.initExplosiveUpgrade;
    this.ricochetLevel = type.initRicochetUpgrade;
    this.pierceLevel = type.initPierceUpgrade;
    this.homingLevel = type.initHomingUpgrade;
    this.depthLevelCost = "Max";
    this.rangeUpgradeCost = "Max";
    this.damageUpgradeCost = "Max";
    this.speedUpgradeCost = "Max";
    this.poisonUpgradeCost = "Max";
    this.laserUpgradeCost = "Max";
    this.freezeUpgradeCost= "Max";
    this.frequencyUpgradeCost = "Max";
    this.paralyzeUpgradeCost = "Max";
    this.explosiveUpgradeCost = "Max";
    this.ricochetUpgradeCost = "Max";
    this.pierceUpgradeCost = "Max";
    this.homingUpgradeCost = "Max";
    if(this.depthLevel !== this.towerType.maxDepthUpgrade) {
        this.depthUpgradeCost = 100;
    }
    if(this.rangeLevel !== this.towerType.maxRangeUpgrade) {
        this.rangeUpgradeCost = 100;
    }
    if(this.damageLevel !== this.towerType.maxDamageUpgrade) {
        this.damageUpgradeCost = 200;
    }
    if(this.speedLevel !== this.towerType.maxSpeedUpgrade) {
        this.speedUpgradeCost = 300;
    }
    if(this.poisonLevel !== this.towerType.maxPoisonUpgrade) {
        this.poisonUpgradeCost = 125;
    }
    if(this.laserLevel !== this.towerType.maxLaserUpgrade) {
        this.laserUpgradeCost = 600;
    }
    if(this.freezeLevel !== this.towerType.maxFreezeUpgrade) {
        this.freezeUpgradeCost= 175;
    }
    if(this.frequencyLevel !== this.towerType.maxFrequencyUpgrade) {
        this.frequencyUpgradeCost = 225;
    }
    if(this.paralyzeLevel !== this.towerType.maxParalyzeUpgrade) {
        this.paralyzeUpgradeCost = 220;
    }
    if(this.explosiveLevel !== this.towerType.maxExplosiveUpgrade) {
        this.explosiveUpgradeCost = 280;
    }
    if(this.ricochetLevel !== this.towerType.maxRicochetUpgrade) {
        this.ricochetUpgradeCost = 400;
    }
    if(this.pierceLevel !== this.towerType.maxPierceUpgrade) {
        this.pierceUpgradeCost = 500;
    }
    if(this.homingLevel !== this.towerType.maxHomingUpgrade) {
        this.homingUpgradeCost = 250;
    }
    this.bobaDamage = 1;
    this.photonDamage = .002;
    this.bobaSpeed = 500;
    this.sellingCost = type.cost / 4;
    this.isTower = true;
    this.spin = false;
    this.counterclockwise = true;
    this.shootTimer = game.timer.time;
    this.pointDirectionIndex = 0;
    this.pointDirection = 'S';
    this.intendedDirection = 'S';
    this.intendedDirectionIndex = 0;
    if(this.name == 'all') {
        this.pointDirection = 'N';
        this.intendedDirection = 'N';
        this.intendedDirectionIndex = 4;
    }
    this.game = game;
    this.ctx = game.ctx;
    this.gridX = gridX;
    this.gridY = gridY;
    this.xOffset = 0;
    this.yOffset = 1;
    this.cost = this.towerType.cost;
    this.spritesheet = type.spritesheet;
    this.animationSouthEast = new Animation(this.spritesheet, 580, 90, 350, 350, 1, 0.1, 1, true, 0.2);
    this.animationSouth = new Animation(this.spritesheet, 105, 90, 350, 350, 1, 0.1 , 1, true, 0.2);
    this.animationEast = new Animation(this.spritesheet, 1000, 60, 440, 420, 1, 0.1 , 1, true, 0.2);
    this.animationNorthEast = new Animation(this.spritesheet, 1480, 80, 350, 350, 1, 0.1, 1, true, 0.2);
    this.animationNorth = new Animation(this.spritesheet, 60, 540, 350, 360, 1, 0.1, 1, true, 0.2);
    this.animationNorthWest = new Animation(this.spritesheet, 540, 540, 350, 360, 1, 0.1, 1, true, 0.2);
    this.animationWest = new Animation(this.spritesheet, 940, 520, 405, 400, 1, 0.1, 1, true, 0.2);
    this.animationSouthWest = new Animation(this.spritesheet, 1460, 560, 350, 350, 1, 0.1, 1, true, 0.2);
    this.x = (gridX - 1) * 100 + 20;
    this.y = gridY * 100 + 10;
    this.centerX = this.x + 30;//used to be +25, now plus +30 to make it total +50
    this.centerY = this.y + 40;// used to be+25, now plus +40 to make it ottal +40
    this.shootOutX = this.x;
    this.shootOutY = this.y;
    this.shootBoba = false;
    this.shootBobaSpeed = null; // TODO
    this.radius = this.towerType.radius;
    this.shootDestinationX = 0;
    this.shootDestinationY = 0;
    this.target = null;
    this.shootBobaEveryMS = this.towerType.frequency;
    this.directions = ['S', 'SE', 'E', 'NE', 'N', 'NW', 'W', 'SW']
    this.shootOutXOffset = [19, 54, 68, 45, 20, -15, -30, -25 ];
    this.shootOutYOffset = [53,42, 14, -10, -20, -5, 10, 40];
    //0 = closest to end by dist
    //1 = farthest to end by dist
    //2 =  closest to end by path
    //3 = farthest to end by path
    //4 = closest to tower
    //5 = farthest to tower
    //6 = biggest hp
    //7 = smallest hp
    this.updateStatusEffectEnabled();
    this.shootingPriorityList = ["Closest To End (Distance)", "Farthest from End (Distance)", "Closest to End (Path)", 
                                "Closest to End (Path)", "Closest to Tower", "Farthest from Tower", "Largest HP", "Smallest HP"];
    this.shootPriorityType = 0;
    this.shootOutXOffsetDir = [0, 50, 50, 50, 0, -50, -50, -50 ];
    this.shootOutYOffsetDir = [50, 50, 0, -50, -50, -50, 0, 50];
    this.time = this.game.timer.time - 1;
    this.timeToMove = this.game.timer.time;
}

boardTower.prototype.draw = function () {
    if(upgradeMode && selectedUpgradableTower === this) {
        this.ctx.save();
        this.ctx.globalAlpha = 0.25;
        this.ctx.fillStyle = "white";
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.restore();
    }
    if(this.pointDirection === 'SE') {
        this.xOffset = 0;
        this.yOffset = 0;
        this.animationSouthEast.drawFrame(this.game.clockTick, this.ctx, this.x + this.xOffset, this.y + this.yOffset);
    } else if (this.pointDirection === 'S') {
        this.xOffset = 0;
        this.yOffset = 0;
        this.animationSouth.drawFrame(this.game.clockTick, this.ctx, this.x + this.xOffset, this.y + this.yOffset);
    } else if (this.pointDirection === 'E') {
        this.xOffset = -11;
        this.yOffset = -6;
        this.animationEast.drawFrame(this.game.clockTick, this.ctx, this.x + this.xOffset, this.y + this.yOffset);
    } else if (this.pointDirection === 'NE') {
        this.xOffset = -10;
        this.yOffset = -2;
        this.animationNorthEast.drawFrame(this.game.clockTick, this.ctx, this.x + this.xOffset, this.y + this.yOffset);
    } else if (this.pointDirection === 'N') {
        this.xOffset = -9;
        this.yOffset = -5;
        this.animationNorth.drawFrame(this.game.clockTick, this.ctx, this.x + this.xOffset, this.y + this.yOffset);
    } else if (this.pointDirection === 'NW') {
        this.xOffset = -8;
        this.yOffset = -5;
        this.animationNorthWest.drawFrame(this.game.clockTick, this.ctx, this.x + this.xOffset, this.y + this.yOffset);
    } else if (this.pointDirection === 'W') {
        this.xOffset = -23;
        this.yOffset = -9;
        this.animationWest.drawFrame(this.game.clockTick, this.ctx, this.x + this.xOffset, this.y + this.yOffset);
    } else if (this.pointDirection === 'SW') {
        this.xOffset = -14;
        this.yOffset = -1;
        this.animationSouthWest.drawFrame(this.game.clockTick, this.ctx, this.x + this.xOffset, this.y + this.yOffset);
    }
}

boardTower.prototype.isThereEnemyInRange = function() {
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if (ent !== this && ent.isEnemy) {
            var temp = this.enemyInRange(ent);
            if(temp && ent.hp > 0) {
                return true;
            }
        }
    }
    return false;
}

boardTower.prototype.update = function () {
    // console.log(this.gridX + " " + this.gridY);

    var bestRangeUpgrade = 0;
    var bestDamageUpgrade = 0;
    var bestSpeedUpgrade = 0;
    var bestPoisonUpgrade = 0;
    var bestLaserUpgrade = 0;
    var bestFreezeUpgrade = 0;
    var bestFrequencyUpgrade = 0;
    var bestParalyzeUpgrade = 0;
    var bestExplosiveUpgrade = 0;
    var bestRicochetUpgrade = 0;
    var bestPierceUpgrade = 0;
    var bestHomingUpgrade = 0;

    for (var i = 0; i < this.game.activeTowers.length; i++) {
        // console.log(this.game.activeTowers[i].name);
        if (this.game.activeTowers[i].name == "pot" && this != this.game.activeTowers[i]) {
            // console.log(getTowersDepth(this.game, this.game.activeTowers[i].gridX
            //     , this.game.activeTowers[i].gridY));
            var depth = Math.abs(this.gridY - this.game.activeTowers[i].gridY)
                + Math.abs(this.gridX - this.game.activeTowers[i].gridX);
            // console.log("a");
            if (depth <= this.game.activeTowers[i].depthLevel) {
                // console.log("a");
                if (bestRangeUpgrade < this.game.activeTowers[i].rangeLevel) {
                    bestRangeUpgrade = this.game.activeTowers[i].rangeLevel;
                }
                if (bestDamageUpgrade < this.game.activeTowers[i].damageLevel) {
                    bestDamageUpgrade = this.game.activeTowers[i].damageLevel;
                }
                if (bestSpeedUpgrade < this.game.activeTowers[i].speedLevel) {
                    bestSpeedUpgrade = this.game.activeTowers[i].speedLevel;
                }
                if (bestPoisonUpgrade < this.game.activeTowers[i].poisonLevel) {
                    bestPoisonUpgrade = this.game.activeTowers[i].poisonLevel;
                }
                if (bestLaserUpgrade < this.game.activeTowers[i].laserLevel) {
                    bestLaserUpgrade = this.game.activeTowers[i].laserLevel;
                }
                if (bestFreezeUpgrade < this.game.activeTowers[i].frequencyLevel) {
                    bestFreezeUpgrade = this.game.activeTowers[i].freezeLevel;
                }
                if (bestFreezeUpgrade < this.game.activeTowers[i].frequencyLevel) {
                    bestFrequencyUpgrade = this.game.activeTowers[i].frequencyLevel;
                }
                if (bestParalyzeUpgrade < this.game.activeTowers[i].paralyzeLevel) {
                    bestParalyzeUpgrade = this.game.activeTowers[i].paralyzeLevel;
                }
                if (bestExplosiveUpgrade < this.game.activeTowers[i].explosiveLevel) {
                    bestExplosiveUpgrade = this.game.activeTowers[i].explosiveLevel;
                }
                if (bestRicochetUpgrade < this.game.activeTowers[i].ricochetLevel) {
                    bestRicochetUpgrade = this.game.activeTowers[i].ricochetLevel;
                }
                if (bestPierceUpgrade < this.game.activeTowers[i].pierceLevel) {
                    bestPierceUpgrade = this.game.activeTowers[i].pierceLevel;
                }
                if (bestHomingUpgrade < this.game.activeTowers[i].homingLevel) {
                    bestHomingUpgrade = this.game.activeTowers[i].homingLevel;
                }
            }
        }
    }

    this.tempRangeLevel = this.rangeLevel + bestRangeUpgrade;
    this.tempDamageLevel = this.damageLevel + bestDamageUpgrade;
    this.tempSpeedLevel = this.speedLevel + bestSpeedUpgrade;
    this.tempPoisonLevel = this.poisonLevel + bestPoisonUpgrade;
    this.tempLaserLevel = this.laserLevel + bestLaserUpgrade;
    this.tempFreezeLevel = this.tempFreezeLevel + bestFreezeUpgrade;
    this.tempFrequencyLevel = this.frequencyLevel + bestFrequencyUpgrade;
    this.tempParalyzeLevel = this.paralyzeLevel + bestParalyzeUpgrade;
    this.tempExplosiveLevel = this.explosiveLevel + bestExplosiveUpgrade;
    this.tempRicochetLevel = this.ricochetLevel + bestRicochetUpgrade;
    this.tempPierceLevel = this.pierceLevel + bestPierceUpgrade;
    this.tempHomingLevel = this.homingLevel + bestHomingUpgrade;

    this.tempBobaSpeed = this.bobaSpeed;
    this.tempBobaDamage = this.bobaDamage;
    this.tempPhotonDamage = this.photonDamage;
    this.tempShootBobaEveryMS = this.shootBobaEveryMS;
    this.tempRadius = this.radius;

    if (this.tempRangeLevel != this.rangeLevel) {
        this.tempRadius = this.radius +  100 * (this.tempDamageLevel - this.damageLevel);
    }
    if (this.tempDamageLevel != this.damageLevel) {
        this.tempBobaDamage = this.bobaDamage +  2 * (this.tempDamageLevel - this.damageLevel);
        this.tempPhotonDamage = this.photonDamage +  .001 * (this.tempDamageLevel - this.damageLevel);
    }
    if (this.tempSpeedLevel != this.speedLevel) {
        this.tempBobaSpeed = this.bobaSpeed * Math.pow(2, (this.tempDamageLevel - this.damageLevel));
    }
    if (this.tempFrequencyLevel != this.frequencyLevel) {
        this.tempShootBobaEveryMS = this.shootBobaEveryMS * Math.pow(0.75, (this.tempDamageLevel - this.damageLevel));
    }
    // console.log(this.tempShootBobaEveryMS);

    var isThereEnemyInRange = this.isThereEnemyInRange();
    if (this.game.running && isThereEnemyInRange) {
        this.time += this.game.clockTick;
    }
    if (!isThereEnemyInRange) {
        this.shootBoba = false;
    }
    // if(this.shootBoba) {
    //     if(this.shootTimer < this.game.timer.time) {
    //         if (this.name == "laser") {
    //             this.game.addEntity(new photon(this.game,this.shootOutX, this.shootOutY, this.name, this.target
    //                 , .01, this.bobaSpeed, this.ricochetLevel, -1, this.homingLevel
    //                 , this.poisonLevel, this.laserLevel, this.freezeLevel, this.paralyzeLevel, this.explosiveLevel));
    //         } else if (this.name == "all") {
    //             for(var i = 0; i < this.shootOutXOffset.length; i++) {
    //                 this.game.addEntity(new photon(this.game,this.x + this.shootOutXOffset[i], this.y + this.shootOutYOffset[i], this.name, {centerX: this.x + this.shootOutXOffsetDir[i] * 100, centerY: this.y + this.shootOutYOffsetDir[i] * 100}
    //                     , this.bobaDamage, this.bobaSpeed, this.ricochetLevel, this.pierceLevel, this.homingLevel
    //                     , this.poisonLevel, this.laserLevel, this.freezeLevel, this.paralyzeLevel, this.explosiveLevel));
    //                 }         
    //         } else {
    //             this.game.addEntity(new boba(this.game,this.shootOutX, this.shootOutY, this.name, this.target
    //                 , this.bobaDamage, this.bobaSpeed, this.ricochetLevel, this.pierceLevel, this.homingLevel
    //                 , this.poisonLevel, this.laserLevel, this.freezeLevel, this.paralyzeLevel, this.explosiveLevel));
    //         }
    //         this.shootBoba = false;
    //         this.shootTimer = this.game.timer.time + this.shootBobaEveryMS;
    //     }
    // }
    // This shooting method always shoots the enemy that is closest to the end.
  /*  var withinRange = [];
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if (ent !== this && ent.isEnemy) {
            var temp = this.enemyInRange(ent);
            if(temp && ent.hp >= 1) {
                var dist = distanceToEndPoint(ent.centerX, ent.centerY);
                withinRange.push({enemy: ent, distToEnd: dist});
            }
        }
    }

    if(withinRange.length >= 1) {
        var selectedEnemy = withinRange[0];
        for(var i = 1; i < withinRange.length; i++) {
            if(selectedEnemy.distToEnd >= withinRange[i].distToEnd) {
                selectedEnemy = withinRange[i]
            }
        }
        this.shootDestinationX = selectedEnemy.enemy.centerX;
        this.shootDestinationY = selectedEnemy.enemy.centerY;
        this.target = selectedEnemy.enemy;
        this.calculateDirection(this.target);
        this.shootBoba = true;
    }
*/
    if(this.spin && this.pointDirection === this.intendedDirection && this.name != 'all') {
        this.pointDirectionIndex = this.intendedDirectionIndex;
        this.spin = false;
    }

    // if (this.time >= this.timeToMove || this.name != "laser") {
    //     this.timeToMove = this.time + 5;
    // }

    if(this.spin && this.name != 'all') {
        if(this.counterclockwise) {
            if(this.pointDirection === 'S') {
                this.pointDirection = 'SE';
            } else if (this.pointDirection === 'SE') {
                this.pointDirection = 'E';
            } else if (this.pointDirection === 'E') {
                this.pointDirection = 'NE';
            } else if (this.pointDirection === 'NE') {
                this.pointDirection = 'N';
            } else if (this.pointDirection === 'N') {
                this.pointDirection = 'NW';
            } else if (this.pointDirection === 'NW') {
                this.pointDirection = 'W';
            } else if (this.pointDirection === 'W') {
                this.pointDirection = 'SW';
            } else  {
                this.pointDirection = 'S';
            }
        }
        else {
            if(this.pointDirection === 'S') {
                this.pointDirection = 'SW';
            } else if (this.pointDirection === 'SW') {
                this.pointDirection = 'W';
            } else if (this.pointDirection === 'W') {
                this.pointDirection = 'NW';
            } else if (this.pointDirection === 'NW') {
                this.pointDirection = 'N';
            } else if (this.pointDirection === 'N') {
                this.pointDirection = 'NE';
            } else if (this.pointDirection === 'NE') {
                this.pointDirection = 'E';
            } else if (this.pointDirection === 'E') {
                this.pointDirection = 'SE';
            } else  {
                this.pointDirection = 'S';
            }
        }
    }



    if(this.game.click) {
        var click = this.game.click;
        var upperLeftX = (this.gridX - 1) * 100;
        var upperLeftY = (this.gridY) * 100;
        var width = 100;
        var height = 100;
        if(click.x > 0 && click.x <= 900 && click.y > 0 && click.y <= 600) {
            if(click.x < upperLeftX || click.x > upperLeftX + width || click.y < upperLeftY || click.y > upperLeftY + height) {
             if(upgradeMode && selectedUpgradableTower === this) {
                    upgradeMode = false;
                    selectedUpgradableTower = null;
                } 
            }
        }
        if(click.x >= upperLeftX && click.x < upperLeftX + width && click.y >= upperLeftY && click.y < upperLeftY + height) {
            if(upgradeMode && selectedUpgradableTower === this) {
                upgradeMode = false;
                selectedUpgradableTower = null;
            } else {
                upgradeMode = true;
                selectedUpgradableTower = this;
            }
        // UNCOMMENT BELOW TO TEST CLICK TO SPIN FUNCTIONALITY
             /*
            if(this.pointDirection === 'S') {
                this.pointDirection = 'SW';
            } else if (this.pointDirection === 'SW') {
                this.pointDirection = 'W';
            } else if (this.pointDirection === 'W') {
                this.pointDirection = 'NW';
            } else if (this.pointDirection === 'NW') {
                this.pointDirection = 'N';
            } else if (this.pointDirection === 'N') {
                this.pointDirection = 'NE';
            } else if (this.pointDirection === 'NE') {
                this.pointDirection = 'E';
            } else if (this.pointDirection === 'E') {
                this.pointDirection = 'SE';
            } else  {
                this.pointDirection = 'S';
            }*/
        // TESTING CLICK TO SHOOT FUNCTIONALITY
          /*  if(!this.shootBoba) {
                this.shootBoba = true;
                if(this.pointDirection = 'S') {
                    this.shootOutX = this.x + 15;
                    this.shootOutY = this.y + 50;
                }
            } else {
                this.shootBoba = false;
            }  */
        }
    }

    // This shooting method always shoots the enemy that entered last.
    /*
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if (ent !== this && ent.isEnemy) {
            var temp = this.enemyInRange(ent);
            if(temp && ent.hp >= 1) {
                this.shootDestinationX = ent.centerX;
                this.shootDestinationY = ent.centerY;
                this.calculateDirection(ent);
                this.shootBoba = true;
            }
        }
    } */

    // console.log(this.timeToMove)
    if (this.time >= this.timeToMove || this.name != "laser") {
        this.timeToMove = this.time + 5;
    

    // This shooting method always shoots the enemy that is closest to the end.
    var withinRange = [];
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if (ent !== this && ent.isEnemy) {
            var temp = this.enemyInRange(ent);
            if(temp && ent.hp > 0) {
                var distToEnd = distanceToEndPoint(ent.centerX, ent.centerY);
                var distToTower = getDistance(ent.centerX, ent.centerY, this.centerX, this.centerY);
                var distToEndByPath = getDistanceToEndByPath(ent.centerX, ent.centerY);
                withinRange.push({"enemy": ent, "distToEnd": distToEnd, "distToTower": distToTower
                    , "distToEndByPath": distToEndByPath});
            }
        }
    }

    if(withinRange.length >= 1) {
        var selectedEnemy = withinRange[0];
    //0 = closest to end by dist
    //1 = farthest to end by dist
    //2 =  closest to end by path
    //3 = farthest to end by path
    //4 = closest to tower
    //5 = farthest to tower
    //6 = biggest hp
    //7 = smallest hp
        if (this.shootPriorityType == 0) {
            for(var i = 1; i < withinRange.length; i++) {
                if(selectedEnemy.distToEnd >= withinRange[i].distToEnd) {
                    selectedEnemy = withinRange[i]
                }
            }
        } else if(this.shootPriorityType == 1) {
            for(var i = 1; i < withinRange.length; i++) {
                if(selectedEnemy.distToEnd <= withinRange[i].distToEnd) {
                    selectedEnemy = withinRange[i]
                }
            }
        } else if (this.shootPriorityType == 2) {
            for(var i = 1; i < withinRange.length; i++) {
                if(selectedEnemy.distToEndByPath >= withinRange[i].distToEndByPath) {
                    selectedEnemy = withinRange[i]
                }
            }
        } else if(this.shootPriorityType == 3) {
            for(var i = 1; i < withinRange.length; i++) {
                if(selectedEnemy.distToEndByPath <= withinRange[i].distToEndByPath) {
                    selectedEnemy = withinRange[i]
                }
            }
        } else if (this.shootPriorityType == 4) {
            for(var i = 1; i < withinRange.length; i++) {
                if(selectedEnemy.distToTower >= withinRange[i].distToTower) {
                    selectedEnemy = withinRange[i]
                }
            }
        } else if(this.shootPriorityType == 5) {
            for(var i = 1; i < withinRange.length; i++) {
                if(selectedEnemy.distToTower <= withinRange[i].distToTower) {
                    selectedEnemy = withinRange[i]
                }
            }
        } else if (this.shootPriorityType == 6) {
            for(var i = 1; i < withinRange.length; i++) {
                if(selectedEnemy.enemy.hp <= withinRange[i].enemy.hp) {
                    selectedEnemy = withinRange[i]
                }
            }
        } else if (this.shootPriorityType == 7) {
            for(var i = 1; i < withinRange.length; i++) {
                if(selectedEnemy.enemy.hp >= withinRange[i].enemy.hp) {
                    selectedEnemy = withinRange[i]
                }
            }
        }

        this.shootDestinationX = selectedEnemy.enemy.centerX;
        this.shootDestinationY = selectedEnemy.enemy.centerY;
        this.target = selectedEnemy.enemy;
        if (this.name == "laser") {
            this.target = {"hp": selectedEnemy.enemy.hp, "centerX": selectedEnemy.enemy.centerX
            , "centerY": selectedEnemy.enemy.centerY};
            // console.log(this.target)
            // this.target = selectedEnemy.enemy;
        } else {
            this.target = selectedEnemy.enemy;
        }
        this.calculateDirection(selectedEnemy.enemy);
        this.shootBoba = true;
    }

    }

    if (this.shootBoba && this.game.running) {
        if(this.shootTimer < this.game.timer.time) {
            if (this.name == "laser") {
                // console.log("a")
                this.game.addEntity(new photon(this.game,this.shootOutX + 15, this.shootOutY + 20, this.name, this.target
                    , this.tempPhotonDamage, this.tempBobaSpeed, this.tempRicochetLevel, -1
                    , this.tempHomingLevel
                    , this.tempPoisonLevel, this.tempLaserLevel, this.tempFreezeLevel
                    , this.tempParalyzeLevel, this.tempExplosiveLevel, 50));
                    if (this.game.speed == 2) {
                        this.game.addEntity(new photon(this.game,this.shootOutX + 15
                            , this.shootOutY + 20, this.name, this.target
                            , this.tempPhotonDamage, this.tempBobaSpeed, this.tempRicochetLevel, -1
                            , this.tempHomingLevel
                            , this.tempPoisonLevel, this.tempLaserLevel, this.tempFreezeLevel
                            , this.tempParalyzeLevel, this.tempExplosiveLevel, 50));
                    }
            } else if (this.name == "all") {
                for (var i = 0; i < this.shootOutXOffset.length; i++) {
                    this.game.addEntity(new boba(this.game,this.x + this.shootOutXOffset[i]
                        , this.y + this.shootOutYOffset[i], this.name, {centerX: this.x + this.shootOutXOffsetDir[i] * 100, centerY: this.y + this.shootOutYOffsetDir[i] * 100}
                        , this.tempBobaDamage, this.tempBobaSpeed, this.tempRicochetLevel, this.tempPierceLevel
                        , this.tempHomingLevel
                        , this.tempPoisonLevel, this.tempLaserLevel, this.tempFreezeLevel, this.tempParalyzeLevel
                        , this.tempExplosiveLevel));
                }  
                this.shootBoba = false;
                this.shootTimer = this.game.timer.time + this.tempShootBobaEveryMS;       
            } else {
                this.game.addEntity(new boba(this.game,this.shootOutX, this.shootOutY, this.name, this.target
                    , this.tempBobaDamage, this.tempBobaSpeed, this.tempRicochetLevel, this.tempPierceLevel
                    , this.tempHomingLevel
                    , this.tempPoisonLevel, this.tempLaserLevel, this.tempFreezeLevel, this.tempParalyzeLevel
                    , this.tempExplosiveLevel));
                this.shootBoba = false;
                this.shootTimer = this.game.timer.time + this.tempShootBobaEveryMS;
            }
        }
    }
}

// Determines if an Enemy is within Range of Tower
boardTower.prototype.enemyInRange = function (rect) {
    // Center of Circle Minus Center of Rectangle
    var circleDistanceX = Math.abs(this.centerX - rect.centerX);
    var circleDistanceY = Math.abs(this.centerY - rect.centerY);

    if(circleDistanceX > rect.boundingbox.width/2 + this.radius) return false;
    if(circleDistanceY > rect.boundingbox.height/2 + this.radius) return false;

    if(circleDistanceX <= rect.boundingbox.width/2) {
         return true;
     }
    if(circleDistanceY <= rect.boundingbox.height/2) {
        return true;
    }

    var cornerDistance_sq = Math.pow(circleDistanceX - rect.boundingbox.width / 2, 2) +
                            Math.pow(circleDistanceY - rect.boundingbox.height /2, 2);

    if(cornerDistance_sq <= Math.pow(this.radius, 2)) {
        return true;
    } else {
        return false;
    }
}

boardTower.prototype.updateStatusEffectEnabled = function() {
    if(this.poisonLevel > 0) {
        this.statusEffectEnabled = true;
        return "poison";
    } else if (this.freezeLevel > 0) {
        this.statusEffectEnabled = true;
        return "freeze";
    } else if (this.paralyzeLevel > 0) {
        this.statusEffectEnabled = true;
        return "paralyze";
    } else if (this.explosiveLevel > 0) {
        this.statusEffectEnabled = true;
        return "burn";
    }
}

boardTower.prototype.calculateDirection = function (target) {
   // if(this.shootTimer >= this.game.timer.time)  return; // POSSIBLE ERROR
    // var tempDirection = null;
    // var tempShortestDistance = Infinity;
    // var bestIndex = null;
    // for(var i = 0; i < this.directions.length; i++) {
    //     var tempX = this.centerX + this.shootOutXOffsetDir[i]; // Change this to represent corners of the boxes instead of shoototu offest
    //     var tempY = this.centerY + this.shootOutYOffsetDir[i]; // Change this to represetn corners ofthe boxes intead of shoot out offset
    //     var tempDistance = getDistance(target.centerX - 10, target.centerY - 13, tempX, tempY);
    //     if(tempDistance < tempShortestDistance) {
    //         tempDirection = this.directions[i];
    //         tempShortestDistance = tempDistance;
    //         bestIndex = i;
    //     }
    // }
    var dir = directionCenter(target, this);
    if (dir.y >= 2/Math.sqrt(5)) {
        this.intendedDirectionIndex = 0;
        this.intendedDirection = 'S';
    } else if (dir.y <= 2/Math.sqrt(5) && dir.y >= 1/Math.sqrt(5) && dir.x > 0) {
        this.intendedDirectionIndex = 1;
        this.intendedDirection = 'SE';
    } else if (dir.x >= 2/Math.sqrt(5)) {
        this.intendedDirectionIndex = 2;
        this.intendedDirection = 'E';
    } else if (dir.x <= 2/Math.sqrt(5) && dir.x >= 1/Math.sqrt(5) && dir.y < 0) {
        this.intendedDirectionIndex = 3;
        this.intendedDirection = 'NE';
    } else if (dir.y <= -2/Math.sqrt(5)) {
        this.intendedDirectionIndex = 4;
        this.intendedDirection = 'N';
    } else if (dir.y >= -2/Math.sqrt(5) && dir.y <= -1/Math.sqrt(5) && dir.x < 0) {
        this.intendedDirectionIndex = 5;
        this.intendedDirection = 'NW';
    } else if (dir.x <= -2/Math.sqrt(5)) {
        this.intendedDirectionIndex = 6;
        this.intendedDirection = 'W';
    } else {
        this.intendedDirectionIndex = 7;
        this.intendedDirection = 'SW';
    }

    // this.intendedDirectionIndex = bestIndex;
    // this.intendedDirection = tempDirection;
    this.shootOutX = this.x + this.shootOutXOffset[this.intendedDirectionIndex];
    this.shootOutY = this.y + this.shootOutYOffset[this.intendedDirectionIndex];
    if(this.pointDirection != this.intendedDirection) {
        this.spin = true;
        var temp = this.intendedDirectionIndex - this.pointDirectionIndex;
        if((temp >= 0 && temp <= 4) || (temp <= -4 && temp >= -7)) {
            this.counterclockwise = true;
        } else {
            this.counterclockwise = false;
        }
    }
}

function getDistance(x1, y1, x2, y2) {
	var xs = x2 - x1;
    var ys = y2 - y1;

    xs *= xs;
    ys *= ys;

    return Math.sqrt( xs + ys );
}

function distanceToEndPoint(x1, y1) {
	var xs = 900 - x1;
    var ys = 300 - y1;

    xs *= xs;
    ys *= ys;

    return Math.sqrt( xs + ys );
}
