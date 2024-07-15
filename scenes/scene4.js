class scene4 extends Phaser.Scene {
  constructor() {
    super("scene4")
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

    this.physics.world.gravity.y = 900
    this.physics.world.setBounds(0, 0, 20000, 1260)
    this.bg1 = this.add.tileSprite(0, 0, 3960, 940, 'bg_4')
      .setOrigin(0, 0)
      .setScrollFactor(0.1, 0)

    this.bgMain = this.add.tileSprite(0, 0, 3960, 940, 'bg_3')
      .setOrigin(0, 0)
      .setScrollFactor(0.0001, 0)

    this.mapForest = this.make.tilemap({ key: 'mapForest' })
    const tiles = this.mapForest.addTilesetImage('Tiles', 'tilesForest')
    this.fence = this.mapForest.createStaticLayer('fence', tiles, 0, 0)
    this.exit = this.mapForest.createStaticLayer('exit', tiles, 0, 0)
    this.ground = this.mapForest.createStaticLayer('ground', tiles, 0, 0)

    this.player = this.physics.add.sprite(65, 1220, "player")
    this.exit.setCollisionByProperty({ collides: true })
    this.ground.setCollisionByProperty({ collides: true })
    this.physics.add.collider(this.player, this.ground, null, null, this)
    this.physics.add.collider(this.player, this.exit, this.exitToMap, null, this)

    this.cameras.main.setBounds(0, 0, 20000, 1280)
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08)

    // Coins setup
    this.coins = this.physics.add.group({
      key: 'coin',
      repeat: 99,
      setXY: { x: 200, y: 100, stepX: 100 }
    })

    this.coins.children.iterate((coin) => {
      coin.setBounceY(Phaser.Math.FloatBetween(0.2, 0.5))
      coin.setScale(0.029)
    })

    this.physics.add.collider(this.coins, this.ground)
    this.physics.add.collider(this.coins, this.exit)
    this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this)

    this.isPlayerMoving = false

    this.music = this.sound.add("forestmusic")
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

    this.anims.create({
      key: 'idleAnimation',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 4 }),
      frameRate: 5,
      repeat: -1,
    })

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

    this.player.anims.play('idleAnimation')
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
    this.scene.switch('scene5')
  }

  update() {
    // Update background tile positions based on camera scroll
    this.bgMain.setTilePosition(this.cameras.main.scrollX);
    this.bg1.setTilePosition(this.cameras.main.scrollX);

    // Movement controls
    const speed = 300;
    let isMoving = false;

    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-speed);
        this.player.anims.play('moveLeft', true);
        this.player.setScale(-1, 1); // Flip sprite to face left
        isMoving = true;
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(speed);
        this.player.anims.play('moveRight', true);
        this.player.setScale(1, 1); // Normal facing right
        isMoving = true;
    } else {
        this.player.setVelocityX(0);
    }

    // Jumping
    if (this.cursors.up.isDown && this.player.body.onFloor()) {
        this.player.setVelocityY(-650);
    }

    // Idle animation when not moving
    if (!isMoving && this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0) {
        this.player.anims.play('idleAnimation', true);
    }

    // Check if player falls off the screen
    if (this.player.y >= 1290) { // Adjusted y threshold to match your scene's height
        this.handlePlayerDeath();
    }
}

handlePlayerDeath() {
    // Stop all sounds
    this.sound.stopAll();

    // Show a popup message
    const confirmBox = confirm("You fell off the screen. Do you want to retry?");

    // Handle user's choice
    if (confirmBox) {
        // Retry
        this.scene.restart();
    } else {
        // Give up, go back to sceneMenu
        this.scene.stop('scene4');
        this.scene.start('sceneMenu');
    }
  }
}
