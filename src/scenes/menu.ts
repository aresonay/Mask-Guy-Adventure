import Global from "../global";
export default class Menu extends Phaser.Scene {

    private width: number;
    private height: number;

    private backgroundImage : Phaser.GameObjects.TileSprite;
   

    constructor(){
        super(Global.SCENES.MENU); 
    }

    init(){
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;

        this.sound.stopAll();
    }




    create(){
        const logo = this.add.image(this.width / 2, this.height / 2,Global.PLAYER.ID ,Global.PLAYER.ANIMATIONS.JUMP).setScale(10);

        this.backgroundImage = this.add.tileSprite(
            0, 0,
            this.cameras.main.width,
            this.cameras.main.height,
            Global.BACKGROUNDS.MENU).setOrigin(0,0).setDepth(-1);

        const titleTxt : Phaser.GameObjects.BitmapText = this.add.bitmapText(
            250, 50, 
            Global.FONTS.BITMAP,
            Global.MENU.TITLE, 20);

        const playTxt : Phaser.GameObjects.BitmapText = this.add.bitmapText(
            50,
            500, 
            Global.FONTS.BITMAP,
            Global.MENU.PLAY,
            20).setInteractive();

        const settingsTxt : Phaser.GameObjects.BitmapText = this.add.bitmapText(
            300, 500, Global.FONTS.BITMAP, Global.MENU.SETTINGS, 20
        ).setInteractive();

        const creditsTxt : Phaser.GameObjects.BitmapText = this.add.bitmapText(
            550, 500, 
            Global.FONTS.BITMAP, 
            Global.MENU.CREDITS, 
            20).setInteractive();


        this.changeScene(playTxt, Global.SCENES.LEVELSELECTOR, false);
        this.changeScene(settingsTxt, Global.SCENES.SETTINGS, false);
        this.changeScene(creditsTxt, Global.SCENES.CREDITS, false);
    }

    changeScene(playTxt: Phaser.GameObjects.BitmapText, scene: string, hud: boolean = true) {
        playTxt.on('pointerdown', () => {
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