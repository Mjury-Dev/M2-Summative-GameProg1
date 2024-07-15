class sceneMenu extends Phaser.Scene {
    constructor() {
        super("sceneMenu");
    }

    create() {
        
        this.bg = this.add.sprite(0, 0, 'bgMenu').setOrigin(0).setDepth(0);
        
        
        let bgWidth = 930; // Replace with desired width
        let bgHeight = 600; // Replace with desired height
        
        
        this.bg.setDisplaySize(bgWidth, bgHeight);

        this.title = this.add.text(470, 151, 'Dungeon Chronicles: The Lost Brother', {
            fontSize: '40px',
            fill: '#fff',
            fontFamily: 'pixeloid, "Goudy Bookletter 1911", Times, serif'
        }).setOrigin(0.5);

        this.titleStart = this.add.text(470, 271, '\n\n\n\n\n\n\n"FIND YOUR BROTHER".\n\n\n\n     Click to Start.\n\n\n\n\nUSE WASD TO MOVE.', {
            fontSize: '30px',
            fill: '#fff',
            fontFamily: 'pixeloid, "Goudy Bookletter 1911", Times, serif'
        }).setOrigin(0.5);

        this.title.alpha = 0;
        this.tweens.add({
            targets: this.title,
            alpha: 1,
            ease: 'Sine.InOut',
            duration: 2000
        });

        this.titleStart.alpha = 0;
        this.tweens.add({
            targets: this.titleStart,
            alpha: 1,
            ease: 'Sine.InOut',
            duration: 2000,
            delay: 1000
        });
    }

    update() {
        this.input.on('pointerdown', function () {
            this.scene.switch('scene1');
        }, this);
    }
}
