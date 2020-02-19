var walkRunTeaConstructor = function (tea, game, spawnX, spawnY, isRun) {
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
    tea.tempSpeed = tea.speed;
    tea.poisonDate = Date.now();
    tea.burnDate = Date.now();
    tea.freezeDate = Date.now();
    tea.paralyzeDate = Date.now();
}

teaSetBoundingBox = function(tea) {
    if (!tea.paceWalk) {
        if(tea.lookDirectionRight || tea.moveDirection == 1 ) {
            tea.boundingbox = new BoundingBox(tea.x + 18 * tea.scale, tea.y + 15 * tea.scale
                , tea.width - 30 * tea.scale , tea.height -23 * tea.scale);
        } else {
            tea.boundingbox = new BoundingBox(tea.x + 8 * tea.scale, tea.y + 15 * tea.scale
                , tea.width - 30 * tea.scale , tea.height -23 * tea.scale);
        }
    } else {
        if (tea.name == "green bubble tea") {
            if(tea.lookDirectionRight || tea.moveDirection == 1 ) {
                tea.boundingbox = new BoundingBox(tea.x + 23 * tea.scale, tea.y + 30 * tea.scale
                    , tea.width - 30 * tea.scale , tea.height -35 * tea.scale);
            } else {
                tea.boundingbox = new BoundingBox(tea.x + 13 * tea.scale, tea.y + 30 * tea.scale
                    , tea.width - 30 * tea.scale , tea.height -35 * tea.scale);
            }
        } else {
            if(tea.lookDirectionRight || tea.moveDirection == 1 ) {
                tea.boundingbox = new BoundingBox(tea.x + 10 * tea.scale, tea.y + 30 * tea.scale
                    , tea.width - 30 * tea.scale , tea.height -35 * tea.scale);
            } else {
                tea.boundingbox = new BoundingBox(tea.x + 10 * tea.scale, tea.y + 30 * tea.scale
                    , tea.width - 30 * tea.scale , tea.height -35 * tea.scale);
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
    if (((tea.centerX +  100) % 100 > 43 && (tea.centerX + 100) % 100 < 57
        && tea.centerY % 100 > 43 && tea.centerY % 100 < 57) && !tea.paceWalk
        || ((tea.centerX +  100) % 100 > 49 && (tea.centerX + 100) % 100 < 51
        && tea.centerY % 100 > 48 && tea.centerY % 100 < 52) && tea.paceWalk) {
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

    enemyStatusEffectUpdate(tea);
}