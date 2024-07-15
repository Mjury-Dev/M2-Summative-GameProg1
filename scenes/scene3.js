// final scene

function createPopUpBox(scene, width, height, text) {
  const style = { font: '50px pixeloid', fill: '#000000', align: 'center' };
  const textBox = scene.add.text(scene.cameras.main.width / 2, 150, text, style).setOrigin(0.5);
  textBox.setScrollFactor(0);
  textBox.alpha = 0;

  const fadeInTween = scene.tweens.add({
    targets: textBox,
    alpha: 1,
    duration: 1000,
    ease: 'Linear',
  });

  scene.tweens.add({
    targets: textBox,
    alpha: 0,
    delay: 5000,
    duration: 1000,
    ease: 'Linear',
    onComplete: () => {
      textBox.destroy();
    },
  });
}

function rollCredits(scene) {
  console.log('text credits');
  const textContent = "\n \n \n \n \n \n \n \n \n \n \n \n \n \nYou found your Brother, Well Done!!\n\n\n\nLead Developer - Mike Rubino\n\n\n\nDevelopment Team - Mike Rubino\n\nTalent Director - Mike Rubino\n\nMusic - Pixabay, sinneslöschen, Miyagisama \n\nGraphics - Itch.io, Penzilla, Luck\n\n\n\nGame Testers - My Fam\n\n\n\n\n\n\nGame Built on Phaser JS Framework\n\n\n\n\n\n\n\n2023 Mike Rubino \u00A9";
  const textOptions = {
    fontSize: '30px',
    fill: '#ffffff',
    fontFamily: 'pixeloid',
    align: 'center', 
    wordWrap: {
      width: 700 
    },
  };

  const startY = scene.cameras.main.height;

  const creditsText = scene.add.text(scene.cameras.main.width / 2, startY, textContent, textOptions)
    .setOrigin(0.5, 0.3) 
    .setAlpha(1); 

  const scrollDuration = 50000; 
  scene.tweens.add({
    targets: creditsText,
    y: -creditsText.height,
    alpha: 1,
    ease: 'Linear',
    duration: scrollDuration,
 
  });
}

let canMove = true;

const fadeInDuration = 8000;

function creditBackground() {
  this.tweens.add({
    targets: this.bg,
    alpha: 1,
    ease: 'Linear',
    duration: fadeInDuration,
  });
}

class scene3 extends Phaser.Scene {
  constructor() {
    super("scene3");
  }

  create() {

    // Replace cursor keys with WASD keys
    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    });

    this.physics.world.gravity.y = 0;

    this.map = this.make.tilemap({ key: 'map2' });
    this.cameras.main.setBounds(0, 0, 3392, 100);
    this.physics.world.setBounds(0, 0, 3000, 3000);
    this.physics.world.setBoundsCollision(true, true, true, true);

    const tiles = this.map.addTilesetImage('ground_tiles', 'tiles');
    this.hiddenMap = this.map.createStaticLayer('hidden_collision', tiles, 0, 0);
    this.floor = this.map.createStaticLayer('ground', tiles, 0, 0);
    this.walls = this.map.createStaticLayer('walls', tiles, 0, 0);
    this.stairs = this.map.createStaticLayer('bridge_stairs', tiles, 0, 0);
    this.fireworks = this.physics.add.staticGroup();

    this.anims.create({
      key: 'fireworksAnimation',
      frames: this.anims.generateFrameNumbers('fireworks', { start: 0, end: 23 }),
      frameRate: 15,
      repeat: -1
    });

    this.friend = this.physics.add.sprite(334, 267, 'friend');
    this.friend.setImmovable(true);
    this.player = this.physics.add.sprite(882, 127, 'player');
    this.trees = this.map.createStaticLayer('other', tiles, 0, 0);

    this.fireworks.create(180, 145, 'fireworks').setScale(7).refreshBody();
    this.fireworks.create(150, 475, 'fireworks').setScale(7).refreshBody();
    this.fireworks.create(380, 295, 'fireworks').setScale(7).refreshBody();
    this.fireworks.create(410, 445, 'fireworks').setScale(7).refreshBody();
    this.fireworks.create(750, 395, 'fireworks').setScale(7).refreshBody();
    this.fireworks.create(890, 220, 'fireworks').setScale(7).refreshBody();
    this.fireworks.create(870, 500, 'fireworks').setScale(7).refreshBody();
    this.fireworks.create(570, 200, 'fireworks').setScale(7).refreshBody();

    this.fireworksSprites = this.fireworks.getChildren();

    this.fireworksSprites.forEach(sprite => {
      sprite.alpha = 0;
    });

    this.hiddenMap.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, this.hiddenMap, null, null, this);
    this.physics.add.collider(this.player, this.friend, this.hit, null, this);

    this.anims.create({
      key: 'idleAnimation',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 10 }),
      frameRate: 5, 
      repeat: -1,         
    });

    this.anims.create({
      key: 'idleFriendAnimation',       
      frames: this.anims.generateFrameNumbers('friend', { start: 0, end: 5 }),
      frameRate: 5,  
      repeat: -1,             
    });

    this.player.anims.play('idleAnimation');
    this.friend.anims.play('idleFriendAnimation');

    this.anims.create({
      key: 'moveRight',
      frames: this.anims.generateFrameNumbers('player', { start: 11, end: 20 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'moveLeft',
      frames: this.anims.generateFrameNumbers('player', { start: 11, end: 20 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'moveUp',
      frames: this.anims.generateFrameNumbers('player', { start: 6, end: 13 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'moveDown',
      frames: this.anims.generateFrameNumbers('player', { start: 6, end: 13 }),
      frameRate: 10,
      repeat: -1
    });

    this.cameras.main.setBounds(0, 0, 3392, 1900);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    this.music = this.sound.add("overworldmusic");
    this.musicVictory = this.sound.add("victoryMusic");
    var musicConfig = {
      mute: false,
      volume: 0.6,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    }
    this.music.play(musicConfig);
    this.bg = this.add.sprite(0, 0, 'bgEnd').setOrigin(0).setDepth(0);
    this.bg.setAlpha(0);
  }

  hit() {
    rollCredits(this);

    const popupText = `Score: ${gameStats.score}\nCoins Collected: ${gameStats.coinsCollected}`;
    createPopUpBox(this, 400, 200, popupText);
    
    this.fireworks.playAnimation('fireworksAnimation');
    this.sound.stopAll();
    canMove = false;
    this.musicVictory.play();
    this.fireworksSprites.forEach(sprite => {
      sprite.alpha = 1;
    }); 
    this.resetBtn = this.add.sprite(900, 610, 'resetBtn').setInteractive();
    this.resetBtn.visible = true;
    creditBackground.call(this);
    this.resetBtn.on('pointerdown', function () {
      location.reload();
    });
  }

  update() {
    const speed = 300;

    this.player.setVelocity(0, 0);
    if (canMove == true) {
      if (this.cursors.up.isDown) {
        this.player.setVelocityY(-speed);
        this.player.anims.play('moveUp', true);
      } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(speed);
        this.player.anims.play('moveDown', true);
      }

      if (this.cursors.left.isDown) {
        this.player.setScale(-1, 1);
        this.player.setVelocityX(-speed);
        this.player.anims.play('moveLeft', true);
        this.player.setOffset(32, 0); 
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(speed);
        this.player.anims.play('moveRight', true);
        this.player.setOffset(0, 0); 
        this.player.setScale(1, 1);
      } else {
        this.player.setVelocityX(0);
        this.player.anims.play('idleAnimation', true);
        this.player.setOffset(0, 0); 
      }
    }
  }
}
