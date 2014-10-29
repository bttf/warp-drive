var game = new Game();

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
  window.webkitRequestAnimationFrame || 
  window.mozRequestAnimationFrame    || 
  window.oRequestAnimationFrame      || 
  window.msRequestAnimationFrame     || 
  function(/* function */ callback, /* DOMElement */ element){
    window.setTimeout(callback, 1000 / 60);
  };
})();

var add_event_listeners = function() {
  // body.addEventListener("keydown", key_down, false);
  // body.addEventListener("keyup", key_up, false);
  // body.addEventListener("keypress", key_press, false);
  // body.addEventListener("mousedown", mouse_down, false);
  // body.addEventListener("mouseup", mouse_up, false);
  // body.addEventListener("mousemove", mouse_move, false);
  body.addEventListener("DOMMouseScroll", mouse_wheel, false);
};

var init_browser = function() {
  // console.log('debug: init_browser called');
  // context.font = "16px Arial";
	body = document.getElementsByTagName("body")[0];
	canvas = document.createElement("canvas");
	canvas.id = "canvas";
	canvas.width = window.innerWidth - 25;
	canvas.height = window.innerHeight - 25;
	context = canvas.getContext('2d');
	body.appendChild(canvas);
  add_event_listeners();
  horizon = (canvas.height / 2);
  center_axis = (canvas.width / 2);
};

var init = function() {
  init_browser();
  game.init(canvas);
};

var loop = function(time) {
  requestAnimFrame(loop);
  game.render(time);
  game.draw(context);
};

var start = function() {
  init();
  loop();
};

var key_down = function(e) {
};

var key_up = function(e) {
};

var mouse_wheel = function(e) {
  game.mouse_wheel(e);
};



window.onload = start;

