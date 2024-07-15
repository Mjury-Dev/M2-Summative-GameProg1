class preloadGame extends Phaser.Scene {
  constructor() {
    super("PreloadGame")
  }
  
  preload() {
    this.load.spritesheet("player", "assets/images/player_spritesheet.png", {
      frameWidth: 32,
      frameHeight: 32
    })
    this.load.spritesheet("friend", "assets/images/friend_spritesheet.png", {
      frameWidth: 32,
      frameHeight: 32
    })
    this.load.spritesheet("fireworks", "assets/images/fireworks.png", {
      frameWidth: 32,
      frameHeight: 32
    })
   
    this.physics.world.setBounds(0, 0, 960, 640)

    this.load.tilemapTiledJSON('map', 'assets/tiles/map.json')
    this.load.image('tiles', 'assets/tiles/ground_tiles.png')
    this.load.image('wallTiles', 'assets/tiles/wall_tiles.png')
    this.load.tilemapTiledJSON('mapDungeon', 'assets/tiles/dungeon_map.json')
    this.load.image('tilesDungeon', 'assets/tiles/dungeon_tiles.png')
    this.load.tilemapTiledJSON('map2', 'assets/tiles/map2.json')

    this.load.image('tilesForest', 'assets/tiles/forest_tiles.png')
    this.load.tilemapTiledJSON('mapForest', 'assets/tiles/forest_map.json')

    this.load.image('tilesWoods', 'assets/tiles/woods_tiles.png')
    this.load.tilemapTiledJSON('mapWoods', 'assets/tiles/woods_map.json')

    this.load.image("bgMenu", "assets/images/bg_menu.png")
    this.load.image("bgEnd", "assets/images/bg_end.png")
    this.load.image("bgMenuFrog", "assets/images/bg_menu_frog.png")
    this.load.image("bgMenuRabbit", "assets/images/bg_menu_rabbit.png")
    this.load.image('bg_1', 'assets/images/bg-1.png')
    this.load.image('bg_2', 'assets/images/bg-2.png')
    this.load.image('bg_3', 'assets/images/bg-1forest.png')
    this.load.image('bg_4', 'assets/images/bg-2forest.png')
    this.load.image('bg_5', 'assets/images/bg_woods1.png')
    this.load.image('bg_6', 'assets/images/bg_woods2.png')
    this.load.image('bg_7', 'assets/images/bg_woods3.png')
    this.load.image('resetBtn', 'assets/images/reset_button.png')

    this.load.image("explode", "assets/images/orangelight.png")
    this.load.image("coin", "assets/images/coin.png")
    

    this.load.audio("overworldmusic", ["assets/audio/overworld.mp3"])
    this.load.audio("dungeonmusic", ["assets/audio/dungeon1.mp3"])
    this.load.audio("forestmusic", ["assets/audio/forest1.mp3"])
    this.load.audio("woodsmusic", ["assets/audio/woods1.mp3"])
    this.load.audio("victoryMusic", ["assets/audio/victory_theme.mp3"])
    this.load.audio("jumpSound", ["assets/audio/jump.mp3"])
    this.load.audio("coinSfx", ["assets/audio/coinSfx.mp3"]);
  }
  
  create() {
    this.scene.start("sceneMenu")
  }
}
