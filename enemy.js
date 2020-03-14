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
        if (enemy.centerY >= 475){
            enemy.centerY = 475;
        }
        if (enemy.centerY <= 125){
            enemy.centerY = 125;
        }
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
            // if (ent.pierceCount == -1 && ent.ricochetCount == -1) {
            //     ent.removeFromWorld = true;
            // }
            // if (ent.isPhoton && enemy.boundingbox.collide(ent.boundingbox)) {
            // // console.log(ent.isPhoton);
            //     // console.log(ent.freezeLvl)
            //     // console.log(ent.freezeLvl > 0 && enemy.boundingbox.collide(ent.boundingbox));
            // }

                        // if (ent.pierceCount == -1 && ent.ricochetCount == -1 && ent.pierceLvl != 0 && ent.ricochetLvl != 0
            //     || (ent.pierceCount == -1 && ent.pierceLvl != 0 && ent.ricochetLvl == 0)
            //     || ()) {
            //     ent.removeFromWorld = true;
            // }

            if ((ent.pierceCount == -1 && ent.pierceLvl != 0 && ent.ricochetLvl != 0 && ent.ricochetCount == -1)
                || (ent.pierceCount == -1 && ent.pierceLvl!= 0 && ent.ricochetLvl == 0)
                || (ent.ricochetCount == -1 && ent.ricochetLvl!= 0 && ent.pierceLvl == 0) ) {
                ent.removeFromWorld = true;
            } 

            // if (ent.isPhoton && enemy.boundingbox.collide(ent.boundingbox)) {
            // // console.log(ent.isPhoton);
            //     // console.log(ent.freezeLvl)
            //     // console.log(ent.freezeLvl > 0 && enemy.boundingbox.collide(ent.boundingbox));
            // }
            if (ent.freezeLvl > 0 && enemy.boundingbox.collide(ent.boundingbox)) {
                //   console.log(enemy.freezeResistance  + " - " +  ent.freezeProbAdder);
                if (Math.random() > enemy.freezeResistance - ent.freezeProbAdder) {
                    // console.log("aaaaa");
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
                    if (enemy.freezeDate < enemy.game.timer.time + 10000/1000 + ent.freezeTimeAdder) {
                        enemy.freezeDate = enemy.game.timer.time + 10000/1000 + ent.freezeTimeAdder;
                    }
                }
            }
            if (ent.paralysisLvl > 0 && enemy.boundingbox.collide(ent.boundingbox)) {
               if (Math.random() > enemy.paralysisResistance - ent.paralysisProbAdder) {
                    enemy.isParalyzed = true;
                    if (enemy.paralysisLvl < ent.paralysisLvl) {
                        enemy.paralysisLvl = ent.paralysisLvl;
                    }
                    enemy.animationWalkLeft.stop = true;
                    enemy.animationWalkRight.stop = true;
                    if (enemy.type && enemy.type == "tea") {
                        enemy.walkSpeed = 1;
                        enemy.runSpeed = 1;
                    } else {
                        enemy.speed = 1;
                    }
                    if (enemy.paralyzeDate < enemy.game.timer.time + 1500/1000 + ent.paralysisTimeAdder) {
                        enemy.paralyzeDate = enemy.game.timer.time + 1500/1000 + ent.paralysisTimeAdder;
                    }
               }
            }
            if (ent.poisonLvl > 0 && enemy.boundingbox.collide(ent.boundingbox)) {
                if (Math.random() > enemy.poisonResistance - ent.poisonProbAdder) {
                    enemy.isPoisoned = true;
                    if (enemy.poisonLvl < ent.poisonLvl) {
                        enemy.poisonLvl = ent.poisonLvl;
                    }
                    if (enemy.poisonDate < enemy.game.timer.time + 5000/1000 + ent.poisonTimeAdder) {
                        enemy.poisonDate = enemy.game.timer.time + 5000/1000 + ent.poisonTimeAdder;
                    }
                }
            } 
            if (ent.burnLvl > 0  && enemy.boundingbox.collide(ent.boundingbox)) {
                // console.log(enemy.burnResistance + " " + ent.burnProbAdder);
                if (Math.random() > enemy.burnResistance - ent.burnProbAdder) {
                    // console.log("EXPLOSION");
                    enemy.isBurned = true;
                    if (enemy.burnLvl < ent.burnLvl) {
                        enemy.burnLvl = ent.burnLvl;
                    }
                    if (enemy.type && enemy.type == "tea") {
                        enemy.walkSpeed = 1.25 * enemy.tempWalkSpeed;
                        enemy.runSpeed = 1.25 * enemy.tempRunSpeed;
                    } else {
                        enemy.speed = 1.25 * enemy.tempSpeed;
                    }
                    if(enemy.speed > 300 || enemy.tempWalkSpeed > 300 || enemy.tempRunSpeed> 300){
                        enemy.speed = 300;
                        enemy.tempWalkSpeed = 300;
                        enemy.tempRunSpeed = 300;
                    }
                    if (enemy.burnDate < enemy.game.timer.time + 2000/1000 + ent.burnTimeAdder) {
                        enemy.burnDate = enemy.game.timer.time + 2000/1000 + ent.burnTimeAdder;
                    }
                }
            } 
            if (ent.isBoba && ent.isExplosive && enemy.boundingbox.collide(ent.boundingbox)) {
            //    console.log("EXPLOSION");
                enemy.game.addEntity(new Explosion(enemy.game, enemy.x, enemy.y, ent.burnLvl));
            }

            if (ent.isBoba && ent.isElectric && enemy.boundingbox.collide(ent.boundingbox)) {
                enemy.game.addEntity(new Electric(enemy.game, enemy.x, enemy.y, ent.paralysisLvl));
            }

            if (ent.isBoba && ent.isFreeze && enemy.boundingbox.collide(ent.boundingbox)) {
                enemy.game.addEntity(new Freeze(enemy.game, enemy.x, enemy.y, ent.freezeLvl));
            }

            if (ent.isBoba && ent.isPoison && enemy.boundingbox.collide(ent.boundingbox)) {
                enemy.game.addEntity(new Poison(enemy.game, enemy.x, enemy.y, ent.poisonLvl));
            }

            if (ent.isBoba && enemy.boundingbox.collide(ent.boundingbox)) {
                if (ent.ricochetLvl > 0 && ent.ricochetCount > -1 && !ent.collidedBefore(enemy)) {
                    ent.collidedBeforeList.push(enemy);
                    ent.ricochetCount--;
                    enemy.hp -= ent.bobaDamage;
                    var dist = Number.MAX_VALUE;
                    var newTarget;
                    for (var k = 0; k < enemy.game.entities.length; k++) {
                        var temp = enemy.game.entities[k];
                        if (temp !== enemy && temp.isEnemy && !ent.collidedBefore(temp)) {
                            if(temp.hp > 0) {
                                var tempDist = distance(enemy, temp);
                                if (tempDist < dist) {
                                    newTarget = temp;
                                    dist = tempDist;
                                }
                            }
                        }
                    }
                    if (newTarget) {
                        ent.target = newTarget;
                        ent.velocity = direction({'x':ent.target.centerX - 10, 'y':ent.target.centerY - 13}, ent);
                    } else {
                        ent.removeFromWorld = true;
                    }
                    
                } else if (ent.pierceLvl != 0 && ent.pierceCount > -1 && !ent.collidedBefore(enemy)) {
                    ent.collidedBeforeList.push(enemy);
                    ent.pierceCount--;
                    ent.isHoming = false;
                    enemy.hp -= ent.bobaDamage;
                } else if (!ent.pierceLvl != 0 && !ent.ricochetLvl > 0){
                    enemy.hp -= ent.bobaDamage;
                    ent.removeFromWorld = true;
                }
            } 
            if ((ent.isExplosion) && enemy.boundingbox.collide(ent.boundingbox)) {
                enemy.hp-= 0.1;
            }

            //TODO:if laser(normal, freeze ray, etc..)

        }
    }
}

var enemyStatusEffectUpdate = function(enemy) {
    enemyPoisonUpdate(enemy);
    enemyBurnUpdate(enemy);
    enemyFreezeUpdate(enemy);
    enemyParalyzeUpdate(enemy);
}

var enemyPoisonUpdate = function(enemy) {
    if (enemy.isPoisoned) {
        enemy.hp -= 0.05 * enemy.game.speed;
        if (enemy.poisonLvl == 2) {
            enemy.hp -= 0.2 * enemy.game.speed;
        } else if (enemy.poisonLvl == 3) {
            enemy.hp -= 0.3 * enemy.game.speed;
        }
        if (enemy.game.timer.time >= enemy.poisonDate) {
            enemy.isPoisoned = false;
            enemy.poisonLvl = 0;
        }
    }
}

var enemyBurnUpdate = function(enemy) {
    if (enemy.isBurned) {
        enemy.hp -= 0.05 * enemy.game.speed;
        if (enemy.burnLvl == 2) {
            enemy.hp -= 0.10 * enemy.game.speed;
        } else if (enemy.burnLvl == 3) {
            enemy.hp -= 0.15 * enemy.game.speed;
        }
        if (enemy.game.timer.time >= enemy.burnDate) {
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
        // enemy.hp -= 0.025 * enemy.game.speed;
        // if (enemy.paralysisLvl == 2) {
        //     enemy.hp -= 0.005 * enemy.game.speed;
        // } else if (enemy.paralysisLvl == 3) {
        //     enemy.hp -= 0.010 * enemy.game.speed;
        // }
        // console.log(enemy.game.timer.time + " " + enemy.paralyzeDate)
        if (enemy.game.timer.time >= enemy.paralyzeDate) {
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
        enemy.hp -= 0.0025 * enemy.game.speed;
        if (enemy.freezeLvl == 2) {
            enemy.hp -= 0.0075 * enemy.game.speed;
        } else if (enemy.freezeLvl == 3) {
            enemy.hp -= 0.005 * enemy.game.speed;
        }
        if (enemy.game.timer.time >= enemy.freezeDate) {
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
    enemy.maxHp = enemy.hp;
    enemy.boxes = false;
    enemy.setBoundingBox();
    enemyCenterUpdate(enemy);
    enemy.isPoisoned = false;
    enemy.isBurned = false;
    enemy.isFrozen = false;
    enemy.isParalyzed = false;
    enemy.poisonDate = enemy.game.timer.time;
    enemy.burnDate = enemy.game.timer.time;
    enemy.freezeDate = enemy.game.timer.time;
    enemy.paralyzeDate = enemy.game.timer.time;
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
    // var min = 49;
    // var max = 51;
    var min = 50 - enemy.centerGap;
    var max = 50 + enemy.centerGap;
    // if (enemy.isBurned) {
    //     min = 50 - enemy.centerGap * 2;
    //     max = 50 + enemy.centerGap * 2;
    // }
    if (((enemy.centerX +  100) % 100 > min && (enemy.centerX + 100) % 100 < max
        && enemy.centerY % 100 > min && enemy.centerY % 100 < max)
        || enemy.moveDirection == 0 && max < (enemy.centerX +  100) % 100
        || enemy.moveDirection == 1 && max < (enemy.centerY) % 100
        || enemy.moveDirection == 2 && min > (enemy.centerX +  100) % 100
        || enemy.moveDirection == 3 && min > (enemy.centerY) % 100) {
        enemy.moveDirection = getShortestPath(enemy.centerX, enemy.centerY);
        enemyUpdateLookHelper(enemy);
        // if (enemy.name == "cola" && str != enemy.centerGap + " " + min + " " + max) {
        //     console.log(enemy.centerGap + " " + min + " " + max + " " + enemy.moveDirection);
        //     str = enemy.centerGap + " " + min + " " + max;
        // }
    }
    // } else {
    //     if (enemy.moveDirection == 0 && max < (enemy.centerX +  100) % 100) {
    //         enemy.moveDirection = getShortestPath(enemy.centerX, enemy.centerY);
    //         enemyUpdateLookHelper(enemy);
    //     } else if (enemy.moveDirection == 1 && max < (enemy.centerY) % 100) {
    //         enemy.moveDirection = getShortestPath(enemy.centerX, enemy.centerY);
    //         enemyUpdateLookHelper(enemy);
    //     } else if (enemy.moveDirection == 2 && min > (enemy.centerX +  100) % 100) {
    //         enemy.moveDirection = getShortestPath(enemy.centerX, enemy.centerY);
    //         enemyUpdateLookHelper(enemy);
    //     } else if (enemy.moveDirection == 3 && min > (enemy.centerY) % 100){
    //         enemy.moveDirection = getShortestPath(enemy.centerX, enemy.centerY);
    //         enemyUpdateLookHelper(enemy);
    //     }
    // }
}

// var str = ""; 

var drawHP = function (enemy, x, y) {
    if (enemy.hp > 0 && enemy.game.running) {
        drawStatusEffect(enemy, x, y);
        enemy.game.ctx.fillStyle = "red";
        enemy.game.ctx.fillRect(enemy.centerX - 25 + x, enemy.y + y, 50, 2);
        enemy.game.ctx.fillStyle = "green";
        var hp = enemy.hp;
        // if (hp < 0) {
        //     hp = 0;
        // }
        enemy.game.ctx.fillRect(enemy.centerX - 25 + x, enemy.y + y, 50 * hp / enemy.maxHp, 2);
    }
}

var drawStatusEffect = function (enemy, x, y) {
    if (enemy.hp > 0 && enemy.game.running) {
        var scale = 1;
        if (enemy.isBurned) {
            enemy.ctx.drawImage(AM.getAsset("./img/brn.png"),
            enemy.centerX + x - 2 * (27 * scale), enemy.y - 25 + y,
            27 * scale,
            27 * scale);
        }
        if (enemy.isPoisoned) {
            enemy.ctx.drawImage(AM.getAsset("./img/psn.png"),
            enemy.centerX + x - (27 * scale) , enemy.y - 25 + y,
            27 * scale,
            27 * scale);
        }
        if (enemy.isFrozen) {
            enemy.ctx.drawImage(AM.getAsset("./img/frz.png"),
            enemy.centerX + x , enemy.y - 25 + y,
            27 * scale,
            27 * scale);
        }
        if (enemy.isParalyzed) {
            enemy.ctx.drawImage(AM.getAsset("./img/par.png"),
            enemy.centerX + x + 1 * (27 * scale) , enemy.y - 25 + y,
            27 * scale,
            27 * scale);
        }
        // var scale = .1;
        // if (enemy.isBurned) {
        //     enemy.ctx.drawImage(AM.getAsset("./img/brn.png"),
        //     enemy.centerX + x - 2 * (272 * scale) + (272 * scale)/ 2, enemy.y - 15 + y,
        //     272 * scale,
        //     96 * scale);
        // }
        // if (enemy.isPoisoned) {
        //     enemy.ctx.drawImage(AM.getAsset("./img/psn.png"),
        //     enemy.centerX + x - (272 * scale) + (272 * scale)/ 2, enemy.y - 15 + y,
        //     272 * scale,
        //     96 * scale);
        // }
        // if (enemy.isFrozen) {
        //     enemy.ctx.drawImage(AM.getAsset("./img/frz.png"),
        //     enemy.centerX + x + (272 * scale)/ 2 , enemy.y - 15 + y,
        //     272 * scale,
        //     96 * scale);
        // }
        // if (enemy.isParalyzed) {
        //     enemy.ctx.drawImage(AM.getAsset("./img/par.png"),
        //     enemy.centerX + x + 1 * (272 * scale) + (272 * scale)/ 2, enemy.y - 15 + y,
        //     272 * scale,
        //     96 * scale);
        // }
        // enemy.ctx.drawImage(AM.getAsset("./img/statuseffect.png"),
        //     xindex * this.frameWidth + this.startX, yindex * this.frameHeight + this.startY,  // source from sheet
        //     this.frameWidth, this.frameHeight,
        //     x + this.offsetX, y + this.offsetY,
        //     this.frameWidth * this.scale,
        //     this.frameHeight * this.scale);
        // enemy.game.ctx.fillStyle = "red";
        // enemy.game.ctx.fillRect(enemy.centerX - 25 + x, enemy.y + y, 50, 2);
        // enemy.game.ctx.fillStyle = "green";
        // var hp = enemy.hp;

        
    } 
}