class scene5 extends Phaser.Scene {
  constructor() {
    super("scene5");
  }

  create() {
    displayGameStats(this)

    this.physics.world.setBoundsCollision(true, true, true, true);

    // Replace cursor keys with WASD keys
    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    });

    this.physics.world.gravity.y = 500;
    this.physics.world.setBounds(0, 0, 20000, 10000);
    this.bg1 = this.add.tileSprite(0, 0, 3960, 940, 'bg_5')
      .setOrigin(0, 0)
      .setScrollFactor(1, 0);

    this.bg2 = this.add.tileSprite(0, 0, 3960, 940, 'bg_6')
      .setOrigin(0, 0)
      .setScrollFactor(1, 0);

    this.bgMain = this.add.tileSprite(0, 0, 3960, 940, 'bg_7')
      .setOrigin(0, 0)
      .setScrollFactor(1, 0);

    this.mapWoods = this.make.tilemap({ key: 'mapWoods' });
    const tiles = this.mapWoods.addTilesetImage('MainLevBuild', 'tilesWoods');
    this.collisionHidden = this.mapWoods.createStaticLayer('collisionhidden', tiles, 0, 0);
    this.background2 = this.mapWoods.createStaticLayer('background2', tiles, 0, 0);
    this.background = this.mapWoods.createStaticLayer('background', tiles, 0, 0);
    this.ground = this.mapWoods.createStaticLayer('ground', tiles, 0, 0);

    this.ground.setCollisionByProperty({ collides: true });
    this.collisionHidden.setCollisionByProperty({ collides: true });
    this.particles = this.add.particles('explode');

    this.emitterPlayerTrail = this.particles.createEmitter({
      lifespan: 200,
      accelerationY: 1500,
      y: 3,
      scale: { start: .05, end: 0 },
      blendMode: 'ADD',
      tint: 0x000000,
      frequency: 100, 
      alpha: { start: 0.8, end: 0 }, 
    });

    this.anims.create({
      key: 'idleAnimation',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 4 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: 'moveRight',
      frames: this.anims.generateFrameNumbers('player', { start: 6, end: 13 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'moveLeft',
      frames: this.anims.generateFrameNumbers('player', { start: 6, end: 13 }),
      frameRate: 10,
      repeat: -1
    });

    this.player = this.physics.add.sprite(100, 2130, "player");
    this.emitterPlayerTrail.startFollow(this.player);
    this.emitterPlayerTrail.setVisible(false);
    this.isPlayerMoving = false;

    this.physics.add.collider(this.player, this.ground, null, null, this);
    this.physics.add.collider(this.player, this.collisionHidden, null, null, this);
    this.cameras.main.setBounds(0, 0, 20000, 10080);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    this.music = this.sound.add("woodsmusic");
    var musicConfig = {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    }
    this.music.play(musicConfig);
  }

  exitToMap() {
    this.sound.stopAll();
    this.scene.switch('scene3');
  }

  update() {
    // Update background tile positions based on camera scroll
    this.bg1.setTilePosition(this.cameras.main.scrollX);
    this.bg2.setTilePosition(this.cameras.main.scrollX);

    // Movement controls
    const speed = 300;
    let isMoving = false;

    if (this.cursors.left.isDown) {
        this.player.setScale(-1, 1);
        this.player.setVelocityX(-speed);
        this.player.anims.play('moveLeft', true);
        isMoving = true;
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(speed);
        this.player.anims.play('moveRight', true);
        this.player.setScale(1, 1);
        isMoving = true;
    } else {
        this.player.setVelocityX(0);
    }

    // Jumping
    if (this.cursors.up.isDown && this.player.body.onFloor()) {
        this.player.setVelocityY(-500);
        this.emitterPlayerTrail.setVisible(true);
        this.sound.play('jumpSound', { volume: 0.5 });
    }

    // Idle animation when not moving
    if (!isMoving && this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0) {
        this.player.anims.play('idleAnimation', true);
    }

    // Check if player falls off the screen
    if (this.player.y > 2400) { // Adjusted y threshold to match your scene's specific height
        this.handlePlayerDeath();
    }

    // Hide trail emitter when player is on ground
    if (this.player.body.onFloor()) {
        this.emitterPlayerTrail.setVisible(false);
    }

    // Check if player reaches specific coordinates to switch scene
    const xInRange = this.player.x >= 2050 && this.player.x <= 2250;
    const yInRange = this.player.y >= 100 && this.player.y <= 210;
    if (xInRange && yInRange) {
        this.sound.stopAll();
        this.scene.switch('scene3');
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
        this.scene.stop('scene5');
        this.scene.start('sceneMenu');
    }
  }
}
