import Global from "../global";
export default class Menu extends Phaser.Scene {

    private width: number;
    private height: number;

    private soundtrackMenu : Phaser.Sound.BaseSound;

    constructor(){
        super(Global.SCENES.MENU); 
    }

    init(){
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;

        this.sound.stopAll();
    }


    preload(): void{
        this.soundtrackMenu = this.sound.add(Global.SOUNDS.SOUNDTRACK+0, {loop:true});
        this.soundtrackMenu.play();
    }

    create(){
        const logo = this.add.image(this.width / 2, 70, 'logo1');

        const playTxt : Phaser.GameObjects.BitmapText = this.add.bitmapText(
            50,
            this.height / 2, 
            Global.FONTS.BITMAP,
            Global.MENU.PLAY,
            25).setInteractive();

        const settingsTxt : Phaser.GameObjects.BitmapText = this.add.bitmapText(
            300, 500, Global.FONTS.BITMAP, Global.MENU.SETTINGS, 20
        ).setInteractive();

        this.changeScene(playTxt, Global.SCENES.LEVEL1);
        this.changeScene(settingsTxt, Global.SCENES.SETTINGS, false);
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
}