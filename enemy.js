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
        if (ent !== enemy) {
            if (ent.isBoba && enemy.boundingbox.collide(ent.boundingbox)) {
                ent.removeFromWorld = true;
                enemy.hp--;
            } 
            if (ent.isBoba && ent.isFrozen && enemy.boundingbox.collide(ent.boundingbox)) {
                ent.freezeDate = Date.now() + 500;
                ent.tempSpeed = ent.speed;
                ent.speed = ent.tempSpeed / 2;
                // sleep(10000).then(() => {
                //     ent.speed *= 2;
                // })
            }
            if (ent.isBoba && ent.isParalyzed && enemy.boundingbox.collide(ent.boundingbox)) {
                ent.tempSpeed = ent.speed;
                ent.speed = 0;
                ent.paralyzeDate = Date.now() + 500;
                // sleep(500).then(() => {
                //     ent.speed = temp;
                // })
            } 
            if (ent.isBoba && ent.isPoison && enemy.boundingbox.collide(ent.boundingbox)) {
                ent.isPoisoned = true;
                // sleep(10000).then(() => {
                //     ent.isPoisoned = false;
                // })
                ent.poisonDate = Date.now() + 10000;
            } 
            if (ent.isExplosion && enemy.boundingbox.collide(ent.boundingbox)) {
                ent.isBurned = true;
                ent.burnDate = Date.now() + 10000;
                // sleep(10000).then(() => {
                //     ent.isPoisoned = false;
                // })
            } 
        }
    }
}

var enemyStatusEffectUpdate = function(enemy) {
    enemyPoisonUpdate(enemy);
    enemyBurnUpdate(enemy);
    enemyParalyzeUpdate(enemy);
    enemyFreezeUpdate(enemy);
}

var enemyPoisonUpdate = function(enemy) {
    if (enemy.isPoisoned) {
        ent.hp--;
        if (Date.now() >= enemy.poisonDate) {
            enemy.isPoisoned = false;
        }
    }
}

var enemyBurnUpdate = function(enemy) {
    if (enemy.isBurned) {
        ent.hp--;
        if (Date.now() >= enemy.burnDate) {
            enemy.isBurned = false;
        }
    }
}

var enemyParalyzeUpdate = function(enemy) {
    if (enemy.isParalyzed) {
        // ent.hp--;
        if (Date.now() >= enemy.paralyzeDate) {
            enemy.isParalyzed = false;
            enemy.speed = tempSpeed;
        }
    }
}

var enemyFreezeUpdate = function(enemy) {
    if (enemy.isFrozen) {
        // ent.hp--;
        if (Date.now() >= enemy.freezeDate) {
            enemy.isFrozen = false;
            enemy.speed = tempSpeed;
        }
    }
}

var enemyConstructor = function(enemy, scale, spawnX, spawnY, width, height, game) {
    enemy.spawnX = spawnX;
    enemy.spawnY = spawnY;
    enemy.scale = scale;
    enemy.isEnemy = true;
    enemy.width = width * scale;
    enemy.height = height * scale;

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
}