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
        if (ent !== enemy && enemy.isEnemy && enemy.hp > 0) {
            if (ent.isFreeze && enemy.boundingbox.collide(ent.boundingbox)) {
                if (Math.random() > enemy.freezeResistance - ent.freezeProbAdder) {
                    enemy.isFrozen = true;
                    if (enemy.freezeLvl < ent.freezeLvl) {
                        enemy.freezeLvl = ent.freezeLvl;
                    }
                    if (enemy.type && enemy.type == "tea") {
                        enemy.walkSpeed = enemy.tempWalkSpeed / 4;
                        enemy.runSpeed = enemy.tempRunSpeed / 4;
                    } else {
                        enemy.speed = enemy.tempSpeed / 4;
                    }
                    if (enemy.freezeDate < Date.now() + 10000 + ent.freezeTimeAdder) {
                        enemy.freezeDate = Date.now() + 10000 + ent.freezeTimeAdder;
                    }
                }
            }
            if (ent.isParalyze && enemy.boundingbox.collide(ent.boundingbox)) {
               if (Math.random() > enemy.paralysisResistance - ent.paralysisProbAdder) {
                    enemy.isParalyzed = true;
                    if (enemy.paralysisLvl < ent.paralysisLvl) {
                        enemy.paralysisLvl = ent.paralysisLvl;
                    }
                    enemy.animationWalkLeft.stop = true;
                    enemy.animationWalkRight.stop = true;
                    if (enemy.type && enemy.type == "tea") {
                        enemy.walkSpeed = 0;
                        enemy.runSpeed = 0;
                    } else {
                        enemy.speed = 0;
                    }
                    if (enemy.paralyzeDate < Date.now() + 1500 + ent.paralysisTimeAdder) {
                        enemy.paralyzeDate = Date.now() + 1500 + ent.paralysisTimeAdder;
                    }
               }
            }
            if (ent.isPoison && enemy.boundingbox.collide(ent.boundingbox)) {
                if (Math.random() > enemy.poisonResistance - ent.poisonProbAdder) {
                    enemy.isPoisoned = true;
                    if (enemy.poisonLvl < ent.poisonLvl) {
                        enemy.poisonLvl = ent.poisonLvl;
                    }
                    if (enemy.poisonDate < Date.now() + 5000 + ent.poisonTimeAdder) {
                        enemy.poisonDate = Date.now() + 5000 + ent.poisonTimeAdder;
                    }
                }
            } 
            if ((ent.isExplosion || ent.isFire) && enemy.boundingbox.collide(ent.boundingbox)) {
                if (Math.random() > enemy.burnResistance - ent.burnProbAdder) {
                    enemy.isBurned = true;
                    if (enemy.burnLvl < ent.burnLvl) {
                        enemy.burnLvl = ent.burnLvl;
                    }
                    if (enemy.type && enemy.type == "tea") {
                        enemy.walkSpeed = 2 * enemy.tempWalkSpeed;
                        enemy.runSpeed = 2 * enemy.tempRunSpeed;
                    } else {
                        enemy.speed = 2 * enemy.tempSpeed;
                    }
                    if (enemy.burnDate < Date.now() + 2000 + ent.burnTimeAdder) {
                        enemy.burnDate = Date.now() + 2000 + ent.burnTimeAdder;
                    }
                }
            } 
            if (ent.isBoba && ent.isExplosive && enemy.boundingbox.collide(ent.boundingbox)) {
               // console.log("EXPLOSION");
                enemy.game.addEntity(new Explosion(enemy.game, enemy.x, enemy.y));
            }
            if (ent.isBoba && enemy.boundingbox.collide(ent.boundingbox)) {
                ent.removeFromWorld = true;
                enemy.hp--;
            } 
            if ((ent.isExplosion || ent.isFire) && enemy.boundingbox.collide(ent.boundingbox)) {
                enemy.hp-= 0.1;
            }

            //TODO:if laser(normal, freeze ray, etc..)

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
        enemy.hp -= 0.05;
        if (enemy.poisonLvl == 2) {
            enemy.hp -= 0.01;
        } else if (enemy.poisonLvl == 3) {
            enemy.hp -= 0.02;
        }
        if (Date.now() >= enemy.poisonDate) {
            enemy.isPoisoned = false;
            enemy.poisonLvl = 0;
        }
    }
}

var enemyBurnUpdate = function(enemy) {
    if (enemy.isBurned) {
        enemy.hp -= 0.075;
        if (enemy.burnLvl == 2) {
            enemy.hp -= 0.005;
        } else if (enemy.burnLvl == 3) {
            enemy.hp -= 0.010;
        }
        if (Date.now() >= enemy.burnDate) {
            enemy.isBurned = false;
            enemy.burnLvl = 0;
            if (enemy.type && enemy.type == "tea") {
                enemy.walkSpeed = enemy.tempWalkSpeed;
                enemy.runSpeed = enemy.tempRunSpeed;
            } else {
                enemy.speed = enemy.tempSpeed;
            }
        }
    }
}

var enemyParalyzeUpdate = function(enemy) {
    if (enemy.isParalyzed) {
        enemy.hp -= 0.025;
        if (enemy.paralysisLvl == 2) {
            enemy.hp -= 0.005;
        } else if (enemy.paralysisLvl == 3) {
            enemy.hp -= 0.010;
        }
        if (Date.now() >= enemy.paralyzeDate) {
            enemy.animationWalkLeft.stop = false;
            enemy.animationWalkRight.stop = false;
            enemy.isParalyzed = false;
            enemy.paralysisLvl = 0;
            if (enemy.type && enemy.type == "tea") {
                enemy.walkSpeed = enemy.tempWalkSpeed;
                enemy.runSpeed = enemy.tempRunSpeed;
            } else {
                enemy.speed = enemy.tempSpeed;
            }
        }
    }
}

var enemyFreezeUpdate = function(enemy) {
    if (enemy.isFrozen) {
        enemy.hp -= 0.025;
        if (enemy.freezeLvl == 2) {
            enemy.hp -= 0.005;
        } else if (enemy.freezeLvl == 3) {
            enemy.hp -= 0.010;
        }
        if (Date.now() >= enemy.freezeDate) {
            enemy.isFrozen = false;
            enemy.freezeLvl = 0;
            if (enemy.type && enemy.type == "tea") {
                enemy.walkSpeed = enemy.tempWalkSpeed;
                enemy.runSpeed = enemy.tempRunSpeed;
            } else {
                enemy.speed = enemy.tempSpeed;
            }
        }
    }
}

var enemyConstructor = function(enemy, scale, spawnX, spawnY, width, height, game, speed, frameDuration, gap) {
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

    enemy.boxes = false;
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
    enemy.poisonLvl = 0;
    enemy.paralysisLvl = 0;
    enemy.burnLvl = 0;
    enemy.freezeLvl = 0;
    enemy.isBurned = false;
    enemy.isFrozen = false;
    enemy.isParalyzed = false;

    enemy.centerGap = gap;
}

var enemyChooseDir = function(enemy) {
    var min = 50 - enemy.centerGap;
    var max = 50 + enemy.centerGap;
    // if (enemy.isBurned) {
    //     min = 50 - enemy.centerGap * 2;
    //     max = 50 + enemy.centerGap * 2;
    // }
    if (((enemy.centerX +  100) % 100 > min && (enemy.centerX + 100) % 100 < max
        && enemy.centerY % 100 > min && enemy.centerY % 100 < max)) {
        enemy.moveDirection = getShortestPath(enemy.centerX, enemy.centerY);
        enemyUpdateLookHelper(enemy);
        // if (enemy.name == "cola" && str != enemy.centerGap + " " + min + " " + max) {
        //     console.log(enemy.centerGap + " " + min + " " + max + " " + enemy.moveDirection);
        //     str = enemy.centerGap + " " + min + " " + max;
        // }
    }
}

// var str = ""; 