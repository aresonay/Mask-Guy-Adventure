import Config from "../config";
import Global from "../global";

export default class Load extends Phaser.Scene {
    //Loading bar 
    private loadingBar : Phaser.GameObjects.Graphics;
    private progressBar : Phaser.GameObjects.Graphics;

    constructor(){
        super(Global.SCENES.LOAD);
    }


    preload(): void {
        this.cameras.main.setBackgroundColor(0x000000);
        this.createBars();

        this.load.on(
            'progress',
            function (value : number){
                this.progressBar.clear();
                this.progressBar.fillStyle(0x88e453, 1);
                this.progressBar.fillRect(
                    this.cameras.main.width / 4,
                    this.cameras.main.height / 2 - 16,
                    (this.cameras.main.width / 2) * value, 
                    16
                ); 
            },
            this
        );


        this.load.on(
            'complete', () => {
                const fontJSON = this.cache.json.get(Global.FONTS.JSON);
                this.cache.bitmapFont.add(Global.FONTS.BITMAP, Phaser.GameObjects.RetroFont.Parse(this, fontJSON));

                this.scene.start(Global.SCENES.MENU);
            }, this);   

    
            this.load.image('logo1','assets/phaser3-logo.png');
        
            // Maps Loading
            this.load.tilemapTiledJSON(Global.MAPS.LEVEL1.TILEMAPJSON, 'assets/level1.json');
            this.load.image(Global.MAPS.TILESET, 'assets/tileset.png');

            // Background loading
            this.load.image(Global.BACKGROUNDS.LEVEL1, 'assets/backgrounds/Brown.png');

            // Fonts Loading 
            this.load.json(Global.FONTS.JSON, 'assets/fonts/font.json');
            this.load.image(Global.FONTS.IMAGE, 'assets/fonts/fontPixel.png');

            // Player Loading
            this.load.atlas(Global.PLAYER.ID, 'assets/animations/maskdude.png', 'assets/animations/maskdude.json');
        

            // Final Object
            this.load.image(Global.OBJECTS.FINAL, 'assets/images/final.png');

            // Enemies 
            this.load.spritesheet(Global.ENEMIES.BUNNY.ID, 'assets/images/enemies/bunny.png', {frameWidth: 34, frameHeight: 44});        
            this.load.spritesheet(Global.ENEMIES.CHICKEN.ID, 'assets/images/enemies/chicken.png', {frameWidth: 32, frameHeight: 34});
            this.load.spritesheet(Global.ENEMIES.MUSHROOM.ID, 'assets/images/enemies/mushroom.png', {frameWidth: 32, frameHeight: 32});
            this.load.spritesheet(Global.ENEMIES.RADISH.ID, 'assets/images/enemies/radish.png', {frameWidth: 30, frameHeight: 38});
            this.load.spritesheet(Global.ENEMIES.EXPLOSION.ID, 'assets/images/enemies/explosion.png', {frameWidth:25, frameHeight: 27});
            this.load.image(Global.MOVINGPLATFORM.ID, 'assets/images/platformamovil.png');

    }


    // Create progress Bars
    private createBars():void {
        this.loadingBar = this.add.graphics();
        this.loadingBar.fillStyle(0xffffff, 1);
        this.loadingBar.fillRect(
            this.cameras.main.width / 4 - 2,
            this.cameras.main.height / 2 - 18,
            this.cameras.main.width / 2 + 4,
            20
        );
        this.progressBar = this.add.graphics();
    }

}