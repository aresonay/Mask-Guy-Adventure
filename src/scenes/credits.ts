import Global from "../global";


export default class Credits extends Phaser.Scene {

    private width : number; 
    private height : number; 


    private backgroundImage : Phaser.GameObjects.TileSprite;

    constructor(){
        super(Global.SCENES.CREDITS);
    }


    init(){
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
    }


    create(): void {
        const goBackTxt : Phaser.GameObjects.BitmapText = this.add.bitmapText(80,500, Global.FONTS.BITMAP, Global.CREDITS.GOBAKC, 16).setInteractive();
    
        goBackTxt.on('pointerdown', () => {
            this.scene.start(Global.SCENES.MENU);
        });
    
        this.backgroundImage = this.add.tileSprite(0,0, this.cameras.main.width, this.cameras.main.height, Global.BACKGROUNDS.MENU).setOrigin(0,0).setDepth(-1);
        
        const madeBy : Phaser.GameObjects.BitmapText = this.add.bitmapText(70, 250, Global.FONTS.BITMAP, Global.CREDITS.CREATEDBY, 16);

        const assetsBy : Phaser.GameObjects.BitmapText = this.add.bitmapText(70, 350, Global.FONTS.BITMAP, Global.CREDITS.ASSETS, 16);


    }


    update(time: number, delta: number): void {
        this.backgroundImage.tilePositionY -= 4;
    }

}