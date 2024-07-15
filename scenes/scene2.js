class scene2 extends Phaser.Scene {
  constructor() {
    super("scene2")
  }

  create() {
    displayGameStats(this)

    this.physics.world.setBoundsCollision(true, true, true, true)

    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    })

    this.bg1 = this.add.tileSprite(0, 0, 3960, 640, 'bg_1')
      .setOrigin(0, 0)
      .setScrollFactor(0.05, 0)

    this.mapDungeon = this.make.tilemap({ key: 'mapDungeon' })
    const tiles = this.mapDungeon.addTilesetImage('fantasy-tileset', 'tilesDungeon')
    this.door = this.mapDungeon.createStaticLayer('door', tiles, 0, 0)
    this.exit = this.mapDungeon.createStaticLayer('exit', tiles, 0, 0)

    this.particles = this.add.particles('explode')

    this.emitterPlayerTrail = this.particles.createEmitter({
      lifespan: 200,
      accelerationY: 1500,
      y: 3,
      scale: { start: .05, end: 0 },
      blendMode: 'ADD',
      tint: 0x000000,
      frequency: 100,
      alpha: { start: 0.8, end: 0 },
    })

    this.player = this.physics.add.sprite(65, 560, "player")
    this.emitterPlayerTrail.startFollow(this.player)
    this.emitterPlayerTrail.setVisible(false)
    
    this.physics.world.gravity.y = 900
    this.physics.world.setBounds(0, 0, 20000, 3000)

    this.floor = this.mapDungeon.createStaticLayer('floor', tiles, 0, 0)
    this.platforms = this.mapDungeon.createStaticLayer('platforms', tiles, 0, 0)

    this.exit.setCollisionByProperty({ collides: true })
    this.floor.setCollisionByProperty({ collides: true })
    this.platforms.setCollisionByProperty({ collides: true })
    this.physics.add.collider(this.player, this.exit, this.exitToMap, null, this)
    this.physics.add.collider(this.player, this.floor, null, null, this)
    this.physics.add.collider(this.player, this.platforms, this.hit, null, this)

    this.coins = this.physics.add.group({
      key: 'coin',
      repeat: 111,
      setXY: { x: 200, y: 100, stepX: 100 }
    })

    this.coins.children.iterate((coin) => {
      coin.setBounceY(Phaser.Math.FloatBetween(0.2, 0.5))
      coin.setScale(0.029)
    })

    this.physics.add.collider(this.coins, this.floor)
    this.physics.add.collider(this.coins, this.platforms)
    this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this)

    this.cameras.main.setBounds(0, 0, 20000, 640)
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08)

    this.isPlayerMoving = false

    this.player.anims.play('idleAnimation')

    this.anims.create({
      key: 'moveRight',
      frames: this.anims.generateFrameNumbers('player', { start: 6, end: 13 }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'moveLeft',
      frames: this.anims.generateFrameNumbers('player', { start: 6, end: 13 }),
      frameRate: 10,
      repeat: -1
    })

    this.music = this.sound.add("dungeonmusic")
    var musicConfig = {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    }
    this.music.play(musicConfig)

    this.coinSfx = this.sound.add('coinSfx');
  }

  collectCoin(player, coin) {
    coin.disableBody(true, true)
    updateScore()
    this.scoreText.setText('Score: ' + gameStats.score)
    this.coinsText.setText('Coins Collected: ' + gameStats.coinsCollected)

    this.coinSfx.play();
  }

  exitToMap() {
    this.sound.stopAll()
    this.scene.switch('scene4')
  }

  update() {
    this.bg1.setTilePosition(this.cameras.main.scrollX);
  
    if (this.cursors.left.isDown) {
      this.player.setScale(-1, 1);
      this.player.setVelocityX(-300);
      this.player.anims.play('moveLeft', true);
      this.player.setOffset(32, 0);
        
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(300);
      this.player.anims.play('moveRight', true);
      this.player.setOffset(0, 0);
      this.player.setScale(1, 1);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('idleAnimation');
    }
  
    if (this.player.body.onFloor()) {
      this.emitterPlayerTrail.setVisible(false);
    }
  
    if (this.cursors.up.isDown && this.player.body.onFloor()) {
      this.player.setVelocityY(-700);
      this.player.anims.play('idleAnimation');
      this.emitterPlayerTrail.setVisible(true);
      this.sound.play('jumpSound', { volume: 0.5 });
    }
  
    // Check if player falls off the screen
    if (this.player.y >= 640) {
      // Stop all sounds
      this.sound.stopAll();
  
      // Show a popup message
      const confirmBox = confirm("You died. Do you want to retry?");
      
      // Handle user's choice
      if (confirmBox) {
        // Retry
        this.scene.restart();
      } else {
        // Give up, go back to sceneMenu.js
        this.scene.stop('scene2');
        this.scene.start('sceneMenu');
      }
    }
  }
}
