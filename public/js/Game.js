function Game() {
}

Game.prototype.init = function(canvas) {
  console.log('debug: init function called');

  this.canvas = canvas;
};

Game.prototype.render = function(time) {
  console.log('debug: render function called');
};

Game.prototype.draw = function(context) {
  console.log('debug: draw function called');
};
