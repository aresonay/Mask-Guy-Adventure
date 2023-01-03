import Global from "../global";
import Player from "../game_objects/player";

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

    private player: Player;

   


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
        
        // Tilemap load
        this.tileMap = this.make.tilemap({key: Global.MAPS.LEVEL1.TILEMAPJSON, tileWidth: 16, tileHeight: 16});
        this.physics.world.bounds.setTo(0,0, this.tileMap.widthInPixels, this.tileMap.heightInPixels);


        // Load Player on scene 
        this.tileMap.findObject(Global.PLAYER.ID, (d:any) => {
            this.player = new Player({
                scene: this, 
                x:d.x,
                y:d.y,
                texture: Global.PLAYER.ID
            });
        });


        // Cameras following player 
        this.cameras.main.setBounds(0,0, this.tileMap.widthInPixels, this.tileMap.heightInPixels);
        this.cameras.main.startFollow(this.player);

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

        // IDLE
        this.anims.create({
            key: Global.PLAYER.ANIMATIONS.IDLE, 
            frames: this.anims.generateFrameNames(Global.PLAYER.ID, {prefix: Global.PLAYER.ANIMATIONS.IDLE + '-', end: 11}),
            frameRate: 20, // Number of frames per second for anim
            repeat: -1 // Infinite loop
        });


        // RUN 
        this.anims.create({
            key: Global.PLAYER.ANIMATIONS.RUN,
            frames: this.anims.generateFrameNames(Global.PLAYER.ID, {prefix: Global.PLAYER.ANIMATIONS.RUN + '-', end: 12}),
            frameRate: 20,
            repeat: -1
        });

        

        
        // Collider for player 
        this.physics.add.collider(this.player, this.layerMapLevel);


        // Final Position Sprite
        let finalObject : any = this.tileMap.createFromObjects(
            Global.MAPS.FINALPOSITION,
            {name: Global.MAPS.FINALPOSITION})[0];

        this.physics.world.enable(finalObject);
        finalObject.body.setAllowGravity(false);
        finalObject.setTexture(Global.OBJECTS.FINAL);
        finalObject.body.setSize(40,50);
        finalObject.body.setOffset(10,15);


        // Collision for final Sprite, and ending level 
        this.physics.add.collider(this.player, finalObject, () => {
            this.scene.stop(Global.SCENES.LEVEL1);
            this.scene.stop(Global.SCENES.HUD);
            this.scene.start(Global.SCENES.MENU);
        });



    }


    update(): void {
        this.background.tilePositionY -= 0.4;

        if(parseInt(this.registry.get(Global.REGISTRY.LIVES)) === 0){
            this.scene.stop(Global.SCENES.LEVEL1);
            this.scene.stop(Global.SCENES.HUD);
            this.scene.start(Global.SCENES.MENU);
        }

        this.player.update();

        
    }
}