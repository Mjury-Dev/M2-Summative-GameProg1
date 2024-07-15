class scene1 extends Phaser.Scene {
  constructor() {
    super("scene1")
  }

  create() {
    
    this.music = this.sound.add("overworldmusic")
    var musicConfig = {
      mute: false,
      volume: 0.02,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    }
    this.music.play(musicConfig)

    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    })

    this.physics.world.gravity.y = 0

    this.map = this.make.tilemap({ key: 'map' })
    this.cameras.main.setBounds(0, 0, 1600, 1400)
    this.physics.world.setBounds(0, 0, 1600, 1400)
    this.physics.world.setBoundsCollision(true, true, true, true)
    const tiles = this.map.addTilesetImage('ground_tiles', 'tiles')
    this.hiddenMap = this.map.createStaticLayer('collide_hidden', tiles, 0, 0)
    this.floor = this.map.createStaticLayer('ground', tiles, 0, 0)
    this.path = this.map.createStaticLayer('path', tiles, 0, 0)
    this.stairs = this.map.createStaticLayer('bridge_stairs', tiles, 0, 0)
    this.player = this.physics.add.sprite(170, 290, 'player')
    this.trees = this.map.createStaticLayer('trees', tiles, 0, 0)

    this.player.setCollideWorldBounds(true)
    this.hiddenMap.setCollisionByProperty({ collides: true })
    this.physics.add.collider(this.player, this.hiddenMap, null, null, this)

    this.anims.create({
      key: 'idleAnimation',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 4 }),
      frameRate: 5,
      repeat: -1,
    })

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

    this.anims.create({
      key: 'moveUp',
      frames: this.anims.generateFrameNumbers('player', { start: 6, end: 13 }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'moveDown',
      frames: this.anims.generateFrameNumbers('player', { start: 6, end: 13 }),
      frameRate: 10,
      repeat: -1
    })

    this.cameras.main.setBounds(0, 0, 3392, 1900)
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08)
  }

  update() {
    const speed = 300
    let isMoving = false

    this.player.setVelocity(0, 0)

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-speed)
      this.player.anims.play('moveUp', true)
      isMoving = true
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(speed)
      this.player.anims.play('moveDown', true)
      isMoving = true
    }

    if (this.cursors.left.isDown) {
      this.player.setScale(-1, 1)
      this.player.setVelocityX(-speed)
      this.player.anims.play('moveLeft', true)
      this.player.setOffset(32, 0)
      isMoving = true
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed)
      this.player.anims.play('moveRight', true)
      this.player.setOffset(0, 0)
      this.player.setScale(1, 1)
      isMoving = true
    }

    if (!isMoving) {
      this.player.anims.play('idleAnimation', true)
      this.player.setOffset(0, 0)
    }

    const xInRange = this.player.x >= 1355 && this.player.x <= 1399
    const yInRange = this.player.y >= 140 && this.player.y <= 160

    if (xInRange && yInRange) {
      this.sound.stopAll()
      this.scene.switch('scene2')
    }
  }
}
