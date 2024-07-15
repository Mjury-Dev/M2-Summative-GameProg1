// gameStats.js
var gameStats = {
  score: 0,
  coinsCollected: 0
}

function displayGameStats(scene) {
  scene.scoreText = scene.add.text(16, 16, 'Score: ' + gameStats.score, { fontSize: '20px', fill: '#ffffff' }).setScrollFactor(0).setDepth(1000)
  scene.coinsText = scene.add.text(16, 48, 'Coins Collected: ' + gameStats.coinsCollected, { fontSize: '20px', fill: '#ffffff' }).setScrollFactor(0).setDepth(1000)
}

function updateScore(coinValue = 10) {
  gameStats.score += coinValue
  gameStats.coinsCollected += 1
}
