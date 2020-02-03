function tower(game, name, cost, description, spritesheet) {
    this.game = game;
    this.name = name;
    this.cost = cost;
    this.description = description;
    this.spritesheet = spritesheet;
    this.ctx = game.ctx;
    this.xGridLocation = null;
    this.yGridLocation = null;
}