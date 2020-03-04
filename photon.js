function photon(game, startX, startY, name, target, damage, speed, ricochetLevel
    , pierceLevel, homingLevel, poisonLevel, laserLevel, freezeLevel, paralyzeLevel, explosiveLevel, count) {
    this.name = name;
    this.poisonLvl = poisonLevel;
    this.freezeLvl = freezeLevel;
    this.paralyzeLvl = paralyzeLevel;
    this.explosiveLvl = explosiveLevel;
    this.laserLvl = laserLevel;
    this.homingLvl = homingLevel;
    // this.left;
    // this.right;
    this.isPhoton = true;
    this.collidedBeforeList = [];
    this.target = target;
    this.bobaDamage = damage;
    this.name = "photon";
    this.radius = 4;
    this.color = "Black";
    if (this.freezeLvl > 0) {
        this.color = "Blue";
    } 
    if (this.paralysisLvl > 0) {
        this.color = "Purple";
    } 
    if (this.burnLvl > 0) {
        this.color = "Red";
    } 
    if (this.poisonLvl > 0) {
        this.color = "Green";
    } 
    this.centerX = startX;
    this.centerY = startY;
    this.x = startX - this.radius;
    this.y = startY - this.radius;
    this.isBoba = true;
    var dir = direction({'x':this.target.centerX - 10, 'y':this.target.centerY - 13}, this);
    this.velocity = dir;
    this.width = this.radius;
    this.height = this.radius;
    this.speed = speed;
    this.game = game;
    this.ctx = game.ctx;
    // this.boxes = true;
    // this.ricochetLvl = ricochetLevel;
    this.pierceLvl = pierceLevel;
    // if (this.ricochetLvl == 2) {
    //     this.ricochetCount = 3;
    // } else if (this.ricochetLvl == 3) {
    //     this.ricochetCount = 5;
    // } 
    // if(homingLevel == 1) {
    //     this.isHoming = true;
    // }
    // if (laserLevel == 1) {
    //     this.isLaser = true;
    // }
    if (this.pierceLvl == -1) {
        this.pierceCount = Number.MAX_VALUE;
    } 
    // else if (this.pierceLvl == 2) {
    //     this.pierceCount = 3;
    // } else if (this.pierceLvl == 3) {
    //     this.pierceCount = 5;
    // } 
    this.boundingbox = new BoundingBox(this.x, this.y, this.width , this.height);

    if (this.x > 0 && this.x < 900 && this.y > 0 && this.y < 600 && count > 0) {
        this.game.addEntity(new photon(this.game, this.centerX + this.velocity.x * this.game.clockTick * 10
            , this.centerY + this.velocity.y * this.game.clockTick * 10, this.name, this.target
            , this.bobaDamage, this.speed, this.ricochetLvl, this.pierceLvl, this.homingLvl
            , this.poisonLvl, this.laserLvl, this.freezeLvl, this.paralyzeLvl, this.explosiveLvll, count - 1));
    } 
    // console.log(this.x + " " + this.y);
    // if () {

    // }
}

photon.prototype.collidedBefore = function(enemy) {
    for (var i = 0; i < this.collidedBeforeList.length; i++) {
        if (enemy == this.collidedBeforeList[i]) {
            return true;
        }
    }
    return false;
}

photon.prototype.draw = function () {
    if(this.game.running) {
        if (this.boxes) {
            this.ctx.strokeStyle = "red";
            this.ctx.strokeRect(this.x, this.y, this.width, this.height);
            this.ctx.strokeStyle = "green";
            this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
        }
        // console.log("a");
        var ctx = this.ctx;
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
        // ctx.lineWidth = 10;
        // var closestDist = Number.MAX_VALUE;
        // var closest;
        // for (var i = 0; i < this.game.entities.length; i++) {
        //     var ent = this.game.entities[i];
        //     var tempDist = distance(this, ent);
        //     if (ent !== this && ent.isPhoton && closestDist > tempDist && !ent.left && !ent.right) {
        //         closestDist = tempDist;
        //         closest = ent;
        //     }
        // }
        // if (closest) {
        //     ctx.moveTo(this.centerX, this.centerY);    
        //     ctx.lineTo(closest.centerX, closest.centerY);  
        // }
        ctx.closePath();

    }
}

photon.prototype.update = function () {
    if(this.game.running) {
        if (this.freezeLvl > 0) {
            this.color = "Blue";
        } 
        if (this.paralysisLvl > 0) {
            this.color = "Purple";
        } 
        if (this.burnLvl > 0) {
            this.color = "Red";
        } 
        if (this.poisonLvl > 0) {
            this.color = "Green";
        } 
        // if (this.isHoming) {
        //     if (this.target.hp <= 0) {
        //         this.removeFromWorld = true;
        //     }
        //     this.velocity = direction({'x':this.target.centerX -10, 'y':this.target.centerY - 13}, this);
        // }
        if (this.x < 0 || this.y < 0 || this.x > 900 ||  this.y > 600) {
            this.removeFromWorld = true;
        }
        this.x += this.velocity.x * this.game.clockTick * this.speed;
        this.y += this.velocity.y * this.game.clockTick * this.speed;
        this.boundingbox = new BoundingBox(this.x, this.y, this.width , this.height);
    }
}