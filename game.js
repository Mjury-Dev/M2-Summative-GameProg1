var game;
window.onload = function () {
  let gameConfig = {
    type: Phaser.CANVAS,
    width: 960,
    height: 640,
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: {
        gravity: {y: 200}
      }
    },

    scene: [preloadGame, sceneMenu,scene1, scene2, scene3, scene4, scene5]
  }
  game = new Phaser.Game(gameConfig);
}
