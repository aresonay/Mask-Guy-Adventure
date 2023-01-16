import Global from "../global";


export default class LevelSelector extends Phaser.Scene {

    private backgroundImage : Phaser.GameObjects.TileSprite;
    private width : number;
    private height : number;

    constructor(){
        super(Global.SCENES.LEVELSELECTOR);
    }


    init() {
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
    }


    create(){
        this.backgroundImage = this.add.tileSprite(0,0, this.cameras.main.width, this.cameras.main.height, Global.BACKGROUNDS.LEVELSELECTOR).setOrigin(0,0).setDepth(-1);

        const goBackTxt : Phaser.GameObjects.BitmapText = this.add.bitmapText(
            80, 500, 
            Global.FONTS.BITMAP, 
            Global.LEVELSELECTOR.GOBACK
        ).setInteractive();

        goBackTxt.on('pointerdown', () => {
            this.scene.start(Global.SCENES.LEVELSELECTOR);
        });     

        const level1Txt : Phaser.GameObjects.BitmapText = this.add.bitmapText(80, 50, Global.FONTS.BITMAP, Global.SCENES.LEVEL1, 20).setInteractive();
        this.changeScene(level1Txt, Global.SCENES.LEVEL1);

        const level2Txt : Phaser.GameObjects.BitmapText = this.add.bitmapText(80, 100, Global.FONTS.BITMAP, Global.SCENES.LEVEL2, 20).setInteractive();
        this.changeScene(level2Txt, Global.SCENES.LEVEL2);


    }

    changeScene(Txt: Phaser.GameObjects.BitmapText, scene: string, hud: boolean = true) {
        Txt.on('pointerdown', () => {
            this.sound.stopAll();
            this.scene.start(scene);
            if(hud){
                this.scene.start(Global.SCENES.HUD);
                this.scene.bringToTop(Global.SCENES.HUD);
            }
        });
    }



    update(time: number, delta: number): void {
        this.backgroundImage.tilePositionY -= 4;
    }

}