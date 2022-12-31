import Global from "../global";

export default class Level1 extends Phaser.Scene
{
    private width: number;
    private height: number;
    private lives: number;
    private score: number;

    private tileMap: Phaser.Tilemaps.Tilemap;
    private tileSet: Phaser.Tilemaps.Tileset;
    private layerMapLevel: Phaser.Tilemaps.TilemapLayer;

    private background: Phaser.GameObjects.TileSprite;

    private player: Phaser.Physics.Arcade.Sprite;

    constructor ()
    {
        super(Global.SCENES.LEVEL1);
    }

    init(){
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
        this.lives = 3;
        this.score = 0;
        this.registry.set(Global.REGISTRY.LIVES, this.lives);
        this.registry.set(Global.REGISTRY.SCORE, this.score);
    }


    create ()
    {  
        const logo = this.add.image(400, 70, 'logo1');

        const playTxt: Phaser.GameObjects.Text = this.add.text(
            50, 
            this.height / 2, 
            'Jugando....',
            {fontSize: '32px', color: '#FFFFFF'});
        const livesTxt: Phaser.GameObjects.Text = this.add.text(
            this.width / 2, 
            this.height / 2, 
            'Vidas -',
            {fontSize: '32px', color: '#FFFFFF'}).setInteractive();

        const scoreTxt: Phaser.GameObjects.Text = this.add.text(
            this.width / 2,
            this.height / 2 + 100,
            'Score', 
            {fontSize: '32px', color: '#FFFFFF'} 
        ).setInteractive();

        livesTxt.on('pointerdown', () => {
            this.lives--;
            this.registry.set('lives', this.lives);
            this.events.emit(Global.EVENTS.LIVES);

        });

        scoreTxt.on('pointerdown', () => {
            this.score++;
            this.registry.set('score', this.score);
            this.events.emit(Global.EVENTS.SCORE);
        });

        
        // Tilemap load
        this.tileMap = this.make.tilemap({key: Global.MAPS.LEVEL1.TILEMAPJSON, tileWidth: 16, tileHeight: 16});
        this.tileSet = this.tileMap.addTilesetImage(Global.MAPS.TILESET);
        this.layerMapLevel = this.tileMap.createLayer(Global.MAPS.LEVEL1.LAYERPLATFORMS, this.tileSet);
        // Collision for layer 
        this.layerMapLevel.setCollisionByExclusion([-1]);

        // Background 
        this.background = this.add.tileSprite(
            0,0, 
            this.tileMap.widthInPixels, 
            this.tileMap.heightInPixels,
            Global.BACKGROUNDS.LEVEL1).setOrigin(0, 0).setDepth(-1);

        // Animations
        this.anims.create({
            key: Global.PLAYER.ANIMATIONS.IDLE, 
            frames: this.anims.generateFrameNames(Global.PLAYER.ID, {prefix: Global.PLAYER.ANIMATIONS.IDLE + '-', end: 11}),
            frameRate: 20, // Number of frames per second for anim
            repeat: -1 // Infinite loop
        });
        
        
        this.player = this.physics.add.sprite(80,80, Global.PLAYER.ID).play(Global.PLAYER.ANIMATIONS.IDLE);
        
        // Collider for player 
        this.physics.add.collider(this.player, this.layerMapLevel);

    }


    update(): void {
        this.background.tilePositionY -= 0.4;

        if(parseInt(this.registry.get(Global.REGISTRY.LIVES)) === 0){
            this.scene.stop(Global.SCENES.LEVEL1);
            this.scene.stop(Global.SCENES.HUD);
            this.scene.start(Global.SCENES.MENU);
        }
    }
}