var enemyDraw = function(enemy) {
    if(enemy.game.running) {
        if (enemy.hp <= 0) {
            if (enemy.lookDirectionRight) {
                enemy.animationDisappearRight.drawFrame(enemy.game.clockTick, enemy.ctx, enemy.x, enemy.y);
                if (enemy.animationDisappearRight.isDone()) {
                    enemy.removeFromWorld = true;
                }
            } else {
                enemy.animationDisappearLeft.drawFrame(enemy.game.clockTick, enemy.ctx, enemy.x, enemy.y);
                if (enemy.animationDisappearLeft.isDone()) {
                    enemy.removeFromWorld = true;
                }
            }
        } else {
            if (enemy.moveDirection == 1) {
                enemy.animationWalkRight.drawFrame(enemy.game.clockTick, enemy.ctx, enemy.x, enemy.y);
            } else if (enemy.moveDirection == 2) {
                if (enemy.lookDirectionRight) {
                    enemy.animationWalkRight.drawFrame(enemy.game.clockTick, enemy.ctx, enemy.x, enemy.y);
                } else {
                    enemy.animationWalkLeft.drawFrame(enemy.game.clockTick, enemy.ctx, enemy.x, enemy.y);
                }
            } else if (enemy.moveDirection == 3) {
                enemy.animationWalkLeft.drawFrame(enemy.game.clockTick, enemy.ctx, enemy.x, enemy.y);
            } else {
                if (enemy.lookDirectionRight) {
                    enemy.animationWalkRight.drawFrame(enemy.game.clockTick, enemy.ctx, enemy.x, enemy.y);
                } else {
                    enemy.animationWalkLeft.drawFrame(enemy.game.clockTick, enemy.ctx, enemy.x, enemy.y);
                }
            }
        }
        // enemy.drawBoundingBox();
        drawBoundingBox(enemy);
    }
}

var enemyUpdateLookHelper = function(enemy) {
    if (enemy.moveDirection == 1) {
        enemy.lookDirectionRight = true;
    } else if (enemy.moveDirection == 3) {
        enemy.lookDirectionRight = false;
    }
}

var enemyUpdateHelper = function (enemy) {
    // console.log(enemy.centerX + " " + enemy.centerY)
    if (enemy.hp > 0) {
        if (enemy.moveDirection == 1) {
     
                enemy.x += enemy.game.clockTick * enemy.speed;
                enemy.centerX += enemy.game.clockTick * enemy.speed;
                // enemy.boundingbox.x += enemy.game.clockTick * enemy.speed;
            
        } else if (enemy.moveDirection == 2) {
            if (enemy.lookDirectionRight) {
             
                    enemy.y += enemy.game.clockTick * enemy.speed;
                    enemy.centerY +=enemy.game.clockTick * enemy.speed;
                    // enemy.boundingbox.y += enemy.game.clockTick * enemy.speed;
                
            } else {
           
                    enemy.y += enemy.game.clockTick * enemy.speed;
                    enemy.centerY += enemy.game.clockTick * enemy.speed;
                    // enemy.boundingbox.y += enemy.game.clockTick * enemy.speed;
                
            }
        } else if (enemy.moveDirection == 3) {
        
                enemy.x -= enemy.game.clockTick * enemy.speed;
                enemy.centerX -= enemy.game.clockTick * enemy.speed;
                // enemy.boundingbox.x -= enemy.game.clockTick * enemy.speed;
            
        } else {
            if (enemy.lookDirectionRight) {
            
                    enemy.y -= enemy.game.clockTick * enemy.speed;
                    enemy.centerY -= enemy.game.clockTick * enemy.speed;
                    // enemy.boundingbox.y -= enemy.game.clockTick * enemy.speed;
                    
            } else {
                
                    enemy.y -= enemy.game.clockTick * enemy.speed;
                    enemy.centerY -= enemy.game.clockTick * enemy.speed;
                    // enemy.boundingbox.y -= enemy.game.clockTick * enemy.speed;
                
            }
        }
    }
}

var drawBoundingBox = function(enemy) {
    if (enemy.boxes) {
        if (enemy.moveDirection == 1 || enemy.lookDirectionRight) {
            enemy.ctx.strokeStyle = "red";
            enemy.ctx.strokeRect(enemy.x, enemy.y, enemy.width, enemy.height);
            enemy.ctx.strokeStyle = "green";
            enemy.ctx.strokeRect(enemy.boundingbox.x, enemy.boundingbox.y, enemy.boundingbox.width, enemy.boundingbox.height);
        } else {
            enemy.ctx.strokeStyle = "red";
            enemy.ctx.strokeRect(enemy.x, enemy.y, enemy.width, enemy.height);
            enemy.ctx.strokeStyle = "green";
            enemy.ctx.strokeRect(enemy.boundingbox.x, enemy.boundingbox.y, enemy.boundingbox.width, enemy.boundingbox.height);
        }
    }
}

var enemyEscape = function(enemy) {
    xy = getXY(enemy.centerX, enemy.centerY);
    if (xy.x == GAMEBOARD.length - 1 && GAMEBOARD[xy.x][xy.y].end && enemy.hp > 0) {
        enemy.hp = 0; //dead
        currentLifes -= enemy.lifeDeduction;
    } 
}

var enemyCenterUpdate = function(enemy) {
    enemy.centerX = enemy.boundingbox.x + enemy.boundingbox.width / 2;
    enemy.centerY = enemy.boundingbox.y + enemy.boundingbox.height / 2;
        // console.log("x:" + enemy.x + ", y:" + enemy.y + ", cx" + enemy.centerX + ", cy:" + enemy.centerY);
    var difX = enemy.centerX - enemy.spawnX;
    var difY =  enemy.spawnY - enemy.centerY;
    // console.log("dx:" + difX + ", dy:" + difY);
    enemy.centerX = enemy.centerX - difX;
    enemy.centerY = enemy.centerY + difY;
    enemy.x = enemy.x - difX;
    enemy.y = enemy.y + difY;
        // console.log("x:" + enemy.x + ", y:" + enemy.y + ", cx" + enemy.centerX + ", cy:" + enemy.centerY);
}

var moneyUpdate = function(enemy) {
    var xy = getXY(enemy.centerX, enemy.centerY);
    if(enemy.hp <= 0 && !GAMEBOARD[xy.x][xy.y].end) {
        currentMoney += enemy.money;
        enemy.money = 0;
    }
}

var collideUpdate = function(enemy) {
    for (var i = 0; i < enemy.game.entities.length; i++) {
        var ent = enemy.game.entities[i];
        if (ent !== enemy && enemy.hp > 0) {
            // console.log(ent.isFreeze);
            if (ent.isFreeze && enemy.boundingbox.collide(ent.boundingbox)) {
                // console.log("a")
                //TODO: by chance
                if (Math.random() < enemy.freezeResistance ? false : true) {
                    enemy.isFrozen = true;
                    enemy.speed = enemy.tempSpeed / 2;
                    enemy.freezeDate = Date.now() + 10000;
                }
            }
            if (ent.isParalyze && enemy.boundingbox.collide(ent.boundingbox)) {
                //TODO: by chance
                if (Math.random() < enemy.paralysisResistance ? false : true) {
                    enemy.isParalyzed = true;
                    enemy.speed = 0;
                    enemy.paralyzeDate = Date.now() + 2000;
                }
            } 
            if (ent.isPoison && enemy.boundingbox.collide(ent.boundingbox)) {
                //TODO: by chance
                if (Math.random() < enemy.poisonResistance ? false : true) {
                    enemy.isPoisoned = true;
                    enemy.poisonDate = Date.now() + 10000;
                }
            } 
            if ((ent.isExplosion || ent.isFire) && enemy.boundingbox.collide(ent.boundingbox)) {
                //TODO: by chance
                if (Math.random() < enemy.burnResistance ? false : true) {
                    enemy.isBurned = true;
                    enemy.burnDate = Date.now() + 10000;
                }
            } 
            if (ent.isBoba && enemy.boundingbox.collide(ent.boundingbox)) {
                // console.log("a");
                ent.removeFromWorld = true;
                enemy.hp--;
            } 
        }
    }
}

var enemyStatusEffectUpdate = function(enemy) {
    // console.log("b")
    enemyPoisonUpdate(enemy);
    enemyBurnUpdate(enemy);
    enemyParalyzeUpdate(enemy);
    enemyFreezeUpdate(enemy);
}

var enemyPoisonUpdate = function(enemy) {
    if (enemy.isPoisoned) {
        enemy.hp -= 0.05;
        if (Date.now() >= enemy.poisonDate) {
            enemy.isPoisoned = false;
        }
    }
}

var enemyBurnUpdate = function(enemy) {
    if (enemy.isBurned) {
        enemy.hp -= 0.05;
        if (Date.now() >= enemy.burnDate) {
            enemy.isBurned = false;
        }
    }
}

var enemyParalyzeUpdate = function(enemy) {
    if (enemy.isParalyzed) {
        enemy.hp -= 0.05;
        if (Date.now() >= enemy.paralyzeDate) {
            enemy.isParalyzed = false;
            enemy.speed = enemy.tempSpeed;
        }
    }
}

var enemyFreezeUpdate = function(enemy) {
    if (enemy.isFrozen) {
        enemy.hp -= 0.05;
        if (Date.now() >= enemy.freezeDate) {
            enemy.isFrozen = false;
            enemy.speed = enemy.tempSpeed;
        }
    }
}

var enemyConstructor = function(enemy, scale, spawnX, spawnY, width, height, game, speed, frameDuration) {
    enemy.spawnX = spawnX;
    enemy.spawnY = spawnY;
    enemy.scale = scale;
    enemy.isEnemy = true;
    enemy.width = width * scale;
    enemy.height = height * scale;
    enemy.tempSpeed = speed;
    enemy.tempFrameDuration = frameDuration;
    enemy.x = spawnX - 50;
    enemy.y = spawnY - 50;
    enemy.game = game;
    enemy.ctx = game.ctx;
    enemy.moveDirection = 1; //1 is right, down, left, up
    enemy.lookDirectionRight = true;

    enemy.boxes = true;
    enemy.setBoundingBox();
    enemyCenterUpdate(enemy);
    enemy.isPoisoned = false;
    enemy.isBurned = false;
    enemy.isFrozen = false;
    enemy.isParalyzed = false;
    enemy.poisonDate = Date.now();
    enemy.burnDate = Date.now();
    enemy.freezeDate = Date.now();
    enemy.paralyzeDate = Date.now();
    enemy.burnResistance = .25;
    enemy.poisonResistance = .25;
    enemy.paralysisResistance = .25;
    enemy.freezeResistance = .25;
}