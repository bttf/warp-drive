describe("Game", function() {
  var game;
  beforeEach(function() {
    game = new Game();
  });

  it ("should have an 'init' function", function() {
    expect(typeof game.init).toBe('function');
  });

  it ("should have a 'render' function", function() {
    expect(typeof game.render).toBe('function');
  });

  it ("should have a 'draw' function", function() {
    expect(typeof game.draw).toBe('function');
  });
});
