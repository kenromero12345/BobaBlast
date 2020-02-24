var walkRunTeaConstructor = function (tea, game, spawnX, spawnY, isRun) {
    tea.type = "tea"
    tea.spawnX = spawnX;
    tea.spawnY = spawnY;
    tea.isEnemy = true;
    tea.x = spawnX - 50;
    tea.y = spawnY - 50;
    if (isRun) {
        tea.centerX = tea.x + tea.runWidth / 2;
        tea.centerY = tea.y + tea.runHeight / 2;
    } else {
        tea.centerX = tea.x + tea.walkWidth / 2;
        tea.centerY = tea.y + tea.walkHeight / 2;
    }
    tea.walkSpeed = 100;
    tea.runSpeed = 200;
    tea.game = game;
    tea.ctx = game.ctx;
    tea.moveDirection = 1; 
    tea.lookDirectionRight = true;
    tea.paceWalk = !isRun;
    tea.hp = 20;
    tea.tempWalkSpeed = tea.walkSpeed;
    tea.tempRunSpeed = tea.runSpeed;
    if (tea.paceWalk) {
        tea.width = tea.walkWidth;
        tea.height = tea.walkHeight;
        tea.tempFrameDuration = tea.animationWalkLeft.frameDuration;
        
    } else {
        tea.width = tea.runWidth;
        tea.height = tea.runHeight;
        tea.tempFrameDuration = tea.animationRunLeft.frameDuration;
    }
    tea.boxes = true;
    teaSetBoundingBox(tea);
    enemyCenterUpdate(tea);
    tea.isPoisoned = false;
    tea.isBurned = false;
    tea.isFrozen = false;
    tea.isParalyzed = false;
    tea.poisonDate = Date.now();
    tea.burnDate = Date.now();
    tea.freezeDate = Date.now();
    tea.paralyzeDate = Date.now();
    tea.burnResistance = .25;
    tea.poisonResistance = .25;
    tea.paralysisResistance = .25;
    tea.freezeResistance = .25;
    // tea.moveDirection = 3;
    // tea.lookDirectionRight = false;
}

teaSetBoundingBox = function(tea) {
    if (!tea.paceWalk) {
        if(tea.lookDirectionRight || tea.moveDirection == 1 ) {
            tea.boundingbox = new BoundingBox(tea.x + 28 * tea.scale, tea.y + 20 * tea.scale
                , tea.width - 43 * tea.scale , tea.height -30 * tea.scale);
        } else {
            tea.boundingbox = new BoundingBox(tea.x + 11 * tea.scale, tea.y + 20 * tea.scale
                , tea.width - 43 * tea.scale , tea.height -30 * tea.scale);
        }
    } else {
        if (tea.name == "green bubble tea") {
            if(tea.lookDirectionRight || tea.moveDirection == 1 ) {
                tea.boundingbox = new BoundingBox(tea.x + 25 * tea.scale, tea.y + 34 * tea.scale
                    , tea.width - 34 * tea.scale , tea.height -40 * tea.scale);
            } else {
                tea.boundingbox = new BoundingBox(tea.x + 16 * tea.scale, tea.y + 34 * tea.scale
                    , tea.width - 34 * tea.scale , tea.height -40 * tea.scale);
            }
        } else {
            if(tea.lookDirectionRight || tea.moveDirection == 1 ) {
                tea.boundingbox = new BoundingBox(tea.x + 12 * tea.scale, tea.y + 37 * tea.scale
                    , tea.width - 32 * tea.scale , tea.height -42 * tea.scale);
            } else {
                tea.boundingbox = new BoundingBox(tea.x + 12 * tea.scale, tea.y + 37 * tea.scale
                    , tea.width - 32 * tea.scale , tea.height -42 * tea.scale);
            }
        }
    }
}

var walkRunTeaDraw = function (tea) {
    if (tea.hp <= 0) {
        if (tea.lookDirectionRight) {
            tea.animationDisappearRight.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
            if (tea.animationDisappearRight.isDone()) {
                tea.removeFromWorld = true;
            }
        } else {
            tea.animationDisappearLeft.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
            if (tea.animationDisappearLeft.isDone()) {
                tea.removeFromWorld = true;
            }
        }
    } else if (tea.paceWalk) {
        if (tea.moveDirection == 1) {
            tea.animationWalkRight.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
        } else if (tea.moveDirection == 2) {
            if (tea.lookDirectionRight) {
                // console.log("a");
                tea.animationWalkRight.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
            } else {
                tea.animationWalkLeft.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
            }
        } else if (tea.moveDirection == 3) {
            tea.animationWalkLeft.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
        } else {
            if (tea.lookDirectionRight) {
                tea.animationWalkRight.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
            } else {
                tea.animationWalkLeft.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
            }
        }
    } else {
        if (tea.moveDirection == 1) {
            tea.animationRunRight.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
        } else if (tea.moveDirection == 2) {
            if (tea.lookDirectionRight) {
                tea.animationRunRight.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
            } else {
                tea.animationRunLeft.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
            }
        } else if (tea.moveDirection == 3) {
            tea.animationRunLeft.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
        } else {
            if (tea.lookDirectionRight) {
                tea.animationRunRight.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
            } else {
                tea.animationRunLeft.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
            }
        }
    }
    drawBoundingBox(tea);
}

var walkRunTeaUpdate = function (tea) {
    var runMin = 43;
    var runMax = 57;
    var walkMin = 48;
    var walkMax = 52;
    if (tea.isBurned) {
        runMin = 36;
        runMax = 64;
        walkMin = 46;
        walkMax = 54;
    }
    if (((tea.centerX +  100) % 100 > runMin && (tea.centerX + 100) % 100 < runMax
        && tea.centerY % 100 > runMin && tea.centerY % 100 < runMax) && !tea.paceWalk
        || ((tea.centerX +  100) % 100 > walkMin && (tea.centerX + 100) % 100 < walkMax
        && tea.centerY % 100 > walkMin && tea.centerY % 100 < walkMax) && tea.paceWalk) {
            // console.log(tea.centerX + " " + tea.centerY)
        tea.moveDirection = getShortestPath(tea.centerX, tea.centerY);
        if (tea.moveDirection == 1) {
            tea.lookDirectionRight = true;
        } else if (tea.moveDirection == 3) {
            tea.lookDirectionRight = false;
        }
    }

    if (tea.hp > 0) {
        if (tea.paceWalk) {
            if (tea.moveDirection == 1) {
                if (tea.animationWalkRight.elapsedTime < tea.animationWalkRight.totalTime * 8 / 14) {
                    tea.x += tea.game.clockTick * tea.walkSpeed;
                    tea.centerX += tea.game.clockTick * tea.walkSpeed;
                }
            } else if (tea.moveDirection == 2) {
                if (tea.lookDirectionRight) {
                    if (tea.animationWalkRight.elapsedTime < tea.animationWalkRight.totalTime * 8 / 14) {
                        tea.y += tea.game.clockTick * tea.walkSpeed;
                        tea.centerY += tea.game.clockTick * tea.walkSpeed;
                    }
                } else {
                    if (tea.animationWalkLeft.elapsedTime < tea.animationWalkLeft.totalTime * 8 / 14) {
                        tea.y += tea.game.clockTick * tea.walkSpeed;
                        tea.centerY += tea.game.clockTick * tea.walkSpeed;
                    }
                }
            } else if (tea.moveDirection == 3) {
                if (tea.animationWalkLeft.elapsedTime < tea.animationWalkLeft.totalTime * 8 / 14) {
                    tea.x -= tea.game.clockTick * tea.walkSpeed;
                    tea.centerX -= tea.game.clockTick * tea.walkSpeed;
                }
            } else {
                if (tea.lookDirectionRight) {
                    if (tea.animationWalkRight.elapsedTime < tea.animationWalkRight.totalTime * 8 / 14) {
                        tea.y -= tea.game.clockTick * tea.walkSpeed;
                        tea.centerY -= tea.game.clockTick * tea.walkSpeed;
                    }
                } else {
                    if (tea.animationWalkLeft.elapsedTime < tea.animationWalkLeft.totalTime * 8 / 14) {
                        tea.y -= tea.game.clockTick * tea.walkSpeed;
                        tea.centerY -= tea.game.clockTick * tea.walkSpeed;
                    }
                }
            }
        } else {
            if (tea.moveDirection == 1) {
                if (tea.animationRunRight.elapsedTime < tea.animationRunRight.totalTime * 8 / 14) {
                    tea.x += tea.game.clockTick * tea.runSpeed;
                    tea.centerX += tea.game.clockTick * tea.runSpeed;
                }
            } else if (tea.moveDirection == 2) {
                if (tea.lookDirectionRight) {
                    if (tea.animationRunRight.elapsedTime < tea.animationRunRight.totalTime * 8 / 14) {
                        tea.y += tea.game.clockTick * tea.runSpeed;
                        tea.centerY += tea.game.clockTick * tea.runSpeed;
                    }
                } else {
                    if (tea.animationRunLeft.elapsedTime < tea.animationRunLeft.totalTime * 8 / 14) {
                        tea.y += tea.game.clockTick * tea.runSpeed;
                        tea.centerY += tea.game.clockTick * tea.runSpeed;
                    }
                }
            } else if (tea.moveDirection == 3) {
                if (tea.animationRunLeft.elapsedTime < tea.animationRunLeft.totalTime * 8 / 14) {
                    tea.x -= tea.game.clockTick * tea.runSpeed;
                    tea.centerX -= tea.game.clockTick * tea.runSpeed;
                }
            } else {
                if (tea.lookDirectionRight) {
                    if (tea.animationRunRight.elapsedTime < tea.animationRunRight.totalTime * 8 / 14) {
                        tea.y -= tea.game.clockTick * tea.runSpeed;
                        tea.centerY -= tea.game.clockTick * tea.runSpeed;
                    }
                } else {
                    if (tea.animationRunLeft.elapsedTime < tea.animationRunLeft.totalTime * 8 / 14) {
                        tea.y -= tea.game.clockTick * tea.runSpeed;
                        tea.centerY -= tea.game.clockTick * tea.runSpeed;
                    }
                }
            }
        }
    }

    teaSetBoundingBox(tea);

    enemyEscape(tea);

    // for (var i = 0; i < tea.game.entities.length; i++) {
    //     var ent = tea.game.entities[i];
    //     if (ent !== tea && ent.isBoba && tea.boundingbox.collide(ent.boundingbox)) {
    //         ent.removeFromWorld = true;
    //         tea.hp--;
    //     }
    // }
    collideUpdate(tea);

    moneyUpdate(tea);
    // console.log("a")
    enemyStatusEffectUpdate(tea);
}