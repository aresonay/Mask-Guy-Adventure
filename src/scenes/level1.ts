import Global from "../global";
import Player from "../game_objects/player";
import Enemies from "../game_objects/enemies";
import MovingPlatforms from "../game_objects/moving-platforms";
import Collectibles from "../game_objects/collectibles";

export default class Level1 extends Phaser.Scene
{
    private width: number;
    private height: number;
    public lives: number;
    public score: number;

    public tileMap: Phaser.Tilemaps.Tilemap;
    private tileSet: Phaser.Tilemaps.Tileset;
    private layerMapLevel: Phaser.Tilemaps.TilemapLayer;

    private background: Phaser.GameObjects.TileSprite;

    private player: Player;

    // Level Time 
    private seconds: number;
    private timeRemaining: number;
    private timeOut: boolean;

    // Enemies
    private bunnyGroup : Enemies;
    private chickenGroup: Enemies;

    // Moving Platforms 
    private movingPlatformsX: MovingPlatforms;
    private movingPlatformsY: MovingPlatforms;

    // Soundtrack 
    private soundtrackLevel: Phaser.Sound.BaseSound;

    // Collectibles
    private applesGroup : Collectibles;
    private cherriesGroup: Collectibles;
    private pineapplesGroup: Collectibles;


    public increaseScore(increasement: number): void {
        this.score += increasement;
    }

    public getScore(): number{
        return this.score;
    }


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
        this.seconds = 1;
        this.timeRemaining = 99;
        this.timeOut = false;
        this.sound.stopAll();

    }


    preload() : void {
        this.soundtrackLevel = this.sound.add(Global.SOUNDS.SOUNDTRACK+1, {loop:true});
        this.soundtrackLevel.play();
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
            frames: this.anims.generateFrameNames(Global.PLAYER.ID, {prefix: Global.PLAYER.ANIMATIONS.IDLE + '-', end: 10}),
            frameRate: 20, // Number of frames per second for anim
            repeat: -1 // Infinite loop
        });


        // RUN 
        this.anims.create({
            key: Global.PLAYER.ANIMATIONS.RUN,
            frames: this.anims.generateFrameNames(Global.PLAYER.ID, {prefix: Global.PLAYER.ANIMATIONS.RUN + '-', end: 11}),
            frameRate: 20,
            repeat: -1
        });


        // EXPLOSION
        this.anims.create({
            key: Global.ENEMIES.EXPLOSION.ANIM, 
            frames: Global.ENEMIES.EXPLOSION.ID,
            frameRate: 15,
            repeat: 0
            });
        

        
        // Collider for player 
        this.physics.add.collider(this.player, this.layerMapLevel);


        // Final Position Sprite
        let finalObject : any = this.tileMap.createFromObjects(
            Global.MAPS.FINALPOSITION,
            {name: Global.MAPS.FINALPOSITION})[0];

        this.physics.world.enable(finalObject);
        finalObject.body.setImmovable(true);
        finalObject.body.setAllowGravity(false);
        finalObject.setTexture(Global.OBJECTS.FINAL);
        finalObject.body.setSize(40,50);
        finalObject.body.setOffset(10,15);


        // Collision for final Sprite, and ending level 
        this.physics.add.collider(this.player, finalObject, () => this.returnToMenu());


        this.bunnyGroup = new Enemies(
            this,
            Global.MAPS.ENEMIES,
            Global.ENEMIES.BUNNY.ID,
            Global.ENEMIES.BUNNY.ANIM,
            Global.ENEMIES.BUNNY.SPEED);

        this.chickenGroup = new Enemies(
            this, 
            Global.MAPS.ENEMIES, 
            Global.ENEMIES.CHICKEN.ID,
            Global.ENEMIES.CHICKEN.ANIM,
            Global.ENEMIES.CHICKEN.SPEED);


    
        this.physics.add.collider(this.bunnyGroup, this.layerMapLevel);
        this.physics.add.collider(this.chickenGroup, this.layerMapLevel);

       this.physics.add.overlap(this.player, this.bunnyGroup, this.player.enemyTouch,null, this);
       this.physics.add.overlap(this.player, this.chickenGroup, this.player.enemyTouch, null, this);

       // Moving Platforms
       this.movingPlatformsX = new MovingPlatforms(this, Global.MAPS.MOVINGPLATFORMS, Global.MOVINGPLATFORM.ID, Global.MOVINGPLATFORM.SPEED, true);
       this.movingPlatformsY = new MovingPlatforms(this, Global.MAPS.MOVINGPLATFORMS, Global.MOVINGPLATFORM.ID, Global.MOVINGPLATFORM.SPEED, false);

       this.physics.add.collider(this.player, [this.movingPlatformsX, this.movingPlatformsY]);
       this.physics.add.collider(this.layerMapLevel, [this.movingPlatformsX, this.movingPlatformsY]);


      // Collectibles 
      this.applesGroup = new Collectibles(this, Global.MAPS.COLLECTIBLES, Global.COLLECTABLES.APPLE.ID, Global.COLLECTABLES.APPLE.ANIM);
      this.physics.add.overlap(this.player, this.applesGroup, this.player.collect, null, this);

      this.cherriesGroup = new Collectibles(this, Global.MAPS.COLLECTIBLES, Global.COLLECTABLES.CHERRY.ID, Global.COLLECTABLES.CHERRY.ANIM);
      this.physics.add.overlap(this.player, this.cherriesGroup, this.player.collect, null, this);

      this.pineapplesGroup = new Collectibles(this, Global.MAPS.COLLECTIBLES, Global.COLLECTABLES.PINEAPPLE.ID, Global.COLLECTABLES.PINEAPPLE.ANIM);
      this.physics.add.overlap(this.player, this.pineapplesGroup, this.player.collect, null, this);

    }


    update(time): void {
        this.background.tilePositionY -= 0.4;

        this.player.update();
        this.bunnyGroup.update();
        this.chickenGroup.update();
        this.movingPlatformsX.update();
        this.movingPlatformsY.update();

        // Time management 
        if((this.seconds != Math.floor(Math.abs(time / 1000))) && !this.timeOut){
            this.seconds = Math.floor(Math.abs(time / 1000));
            this.timeRemaining--;

            let minutes: number  = Math.floor(this.timeRemaining / 60);
            let seconds: number = Math.floor(this.timeRemaining - (minutes * 60));

            // Clock layout setting 
            let textClock: string = Phaser.Utils.String.Pad(minutes, 2, '0', 1) 
                        + ":" 
                        + Phaser.Utils.String.Pad(seconds, 2, '0', 1);

            // Register
            this.registry.set(Global.REGISTRY.CLOCK, textClock);
            // To send to HUD
            this.events.emit(Global.EVENTS.CLOCK);

            if(this.timeRemaining == 0){
                this.timeOut = true;
            }

            if(this.timeOut || this.lives <= 0) this.returnToMenu();
        }
        
    }


    private returnToMenu():void{
        this.cameras.main.fade(700, 0, 0, 0);
        this.cameras.main.on('camerafadeoutcomplete', () => {
            this.sound.stopAll();
            this.scene.stop(Global.SCENES.LEVEL1);
            this.scene.stop(Global.SCENES.HUD);
            this.scene.start(Global.SCENES.MENU);
        });
    }
}