import Global from "../global";
import Player from "../game_objects/player";
import Enemies from "../game_objects/enemies";
import MovingPlatforms from "../game_objects/moving-platforms";
import Collectibles from "../game_objects/collectibles";


export default class LevelController extends Phaser.Scene {

    protected levelName: string;
    
    // Lives and score 
    public lives: number;
    public score: number;

    // Scene Graphic elements
    public tileMap: Phaser.Tilemaps.Tilemap;
    protected tileSet: Phaser.Tilemaps.Tileset;
    protected layerMapLevel: Phaser.Tilemaps.TilemapLayer;
    protected background: Phaser.GameObjects.TileSprite;

    // Main Character 
    protected player: Player;


    // Level Time 
    protected seconds: number;
    protected timeRemaining: number;
    protected timeOut: boolean;


    // Enemies 
    protected enemiesGroup :  Enemies[];

    // Moving Platforms 
    protected movingPlatformsX: MovingPlatforms;
    protected movingPlatformsY: MovingPlatforms;

    // Soundtrack 
    protected soundtrackLevel: Phaser.Sound.BaseSound;

    // Collectibles
    protected applesGroup : Collectibles;
    protected cherriesGroup: Collectibles;
    protected pineapplesGroup: Collectibles;


    public increaseScore(increasement:number):void{
        this.score += increasement;
    }

    public getScore():number{
        return this.score;
    }


    constructor(level: string){
        super(level);
        this.levelName = level;
    }


    init():void{
        this.lives = 3;
        this.score = 0;

        this.seconds = 1;
        this.timeRemaining = 99;
        this.timeOut = false;

        
        this.registry.set(Global.REGISTRY.LIVES, this.lives);
        this.registry.set(Global.REGISTRY.SCORE, this.score);

        this.enemiesGroup = [];
    }


    preload(): void{
        this.soundtrackLevel = this.sound.add(Global.SOUNDS.SOUNDTRACK+1, {loop:true});
        this.soundtrackLevel.play();
    }


     /* 
        This method needs the level json info and the scroll image for background
     */  
     createLevel(jsonMap: string, scrollableImage: string):void{

            // TO-DO
            this.createLevelMap(Global.MAPS.LEVEL1.TILEMAPJSON);
            this.createScrollableBackground(Global.BACKGROUNDS.LEVEL1);
            this.createAnims();
            this.createPlayer();
            this.createFinalObject();
            this.createMovingPlatforms();

     }


     createLevelMap(jsonMap: string, mapImage: string = Global.MAPS.TILESET):void{
         // Sets the map and the measures
         this.tileMap = this.make.tilemap({key: jsonMap});
         this.physics.world.bounds.setTo(0,0, this.tileMap.widthInPixels, this.tileMap.heightInPixels);
         //  Tileset associated to map
         this.tileSet = this.tileMap.addTilesetImage(mapImage); 
         // Platform Layer
         this.layerMapLevel = this.tileMap.createLayer(Global.MAPS.LEVEL1.LAYERPLATFORMS, this.tileSet);
         // Make the layer collisionable
         this.layerMapLevel.setCollisionByExclusion([-1]);
     }

     createScrollableBackground(scrollableImage:string):void{
        this.background = this.add.tileSprite(
            0,0,
            this.tileMap.widthInPixels,
            this.tileMap.heightInPixels, 
            scrollableImage).setOrigin(0,0).setDepth(-1);
     }

     createAnims():void {
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

     }

     createPlayer() : void {
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

        // Collider for player 
        this.physics.add.collider(this.player, this.layerMapLevel);
     }

     createFinalObject() : void{
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
     }

     protected returnToMenu():void{
        this.cameras.main.fade(700, 0, 0, 0);
        this.cameras.main.on('camerafadeoutcomplete', () => {
            this.sound.stopAll();
            this.scene.stop(Global.SCENES.LEVEL1);
            this.scene.stop(Global.SCENES.HUD);
            this.scene.start(Global.SCENES.MENU);
        });
    }


     createEnemies(enemiesConfig: any[]) :void{
         enemiesConfig.forEach(enemiesConfig => {
            let enemies: Enemies = new Enemies(this,Global.MAPS.ENEMIES, enemiesConfig.ID, enemiesConfig.ANIM, enemiesConfig.SPEED);

            this.physics.add.collider(enemies, this.layerMapLevel);
            this.physics.add.overlap(this.player, enemies, this.player.enemyTouch, null, this);
            this.enemiesGroup.push(enemies);
            
         });
     }

     createMovingPlatforms():void{
        this.movingPlatformsX = new MovingPlatforms(this, Global.MAPS.MOVINGPLATFORMS, Global.MOVINGPLATFORM.ID, Global.MOVINGPLATFORM.SPEED, true);
        this.movingPlatformsY = new MovingPlatforms(this, Global.MAPS.MOVINGPLATFORMS, Global.MOVINGPLATFORM.ID, Global.MOVINGPLATFORM.SPEED, false);
        this.physics.add.collider(this.player, [this.movingPlatformsX, this.movingPlatformsY]);
        this.physics.add.collider(this.layerMapLevel, [this.movingPlatformsX, this.movingPlatformsY]);

     }


     createCollectibles(collectiblesConfig: any[]):void{
        collectiblesConfig.forEach(enemiesConfig => {
            let collectibles = new Collectibles(this, Global.MAPS.COLLECTIBLES, enemiesConfig.ID, enemiesConfig.ANIM);
            this.physics.add.overlap(this.player, collectibles, this.player.collect, null, this);
        });
     }


     update(time: number, delta: number): void {
        this.background.tilePositionY -= 0.4;

        this.player.update();
        this.enemiesGroup.forEach(enemies => {
            enemies.update()});
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






}