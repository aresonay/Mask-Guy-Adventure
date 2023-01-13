import Global from "../global";


export default class Settings extends Phaser.Scene {

    private width : number;
    private height : number;

    private backgroundImage : Phaser.GameObjects.TileSprite;

    constructor(){
        super(Global.SCENES.SETTINGS);
    }

    init(){
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
    }


    create(): void{
        this.backgroundImage = this.add.tileSprite(0,0, this.cameras.main.width, this.cameras.main.height, Global.BACKGROUNDS.MENU).setOrigin(0,0).setDepth(-1);

        // Button to go back 
        const goBackTxt : Phaser.GameObjects.BitmapText = this.add.bitmapText(80,500, Global.FONTS.BITMAP, Global.SETTINGS.GOBACK, 16).setInteractive();

        goBackTxt.on('pointerdown', () => {
            this.scene.start(Global.SCENES.MENU);
        });

        const musicTxt : Phaser.GameObjects.BitmapText = this.add.bitmapText(80,80, Global.FONTS.BITMAP, Global.SETTINGS.MUSIC, 16).setInteractive();
        const sfx : Phaser.GameObjects.BitmapText = this.add.bitmapText(200, 80, Global.FONTS.BITMAP, Global.SETTINGS.SFX,16).setInteractive();



        let musicImage : string = (this.registry.get(Global.REGISTRY.MUSIC) == Global.SETTINGS.SOUNDON) ? Global.SETTINGS.SOUNDON: Global.SETTINGS.SOUNDOFF;

        let sfxImage: string = (this.registry.get(Global.REGISTRY.SFX) == Global.SETTINGS.SOUNDON) ? Global.SETTINGS.SOUNDON: Global.SETTINGS.SOUNDOFF;

        let musicToggler : Phaser.GameObjects.Image = this.add.image(130, 120, musicImage).setScale(0.5).setInteractive();
        let sfxToggler : Phaser.GameObjects.Image = this.add.image(250, 120, sfxImage).setScale(0.5).setInteractive();

        musicToggler.on('pointerdown', () => {
            let value = (this.registry.get(Global.REGISTRY.MUSIC) == Global.SETTINGS.SOUNDON) ? Global.SETTINGS.SOUNDOFF: Global.SETTINGS.SOUNDON;
            this.registry.set(Global.REGISTRY.MUSIC, value);
            musicToggler.setTexture(value);
        });

        sfxToggler.on('pointerdown', () => {
            let value = (this.registry.get(Global.REGISTRY.SFX) == Global.SETTINGS.SOUNDON) ? Global.SETTINGS.SOUNDOFF : Global.SETTINGS.SOUNDON;
            this.registry.set(Global.REGISTRY.SFX, value);
            sfxToggler.setTexture(value);
        });



    }


    update(time: number, delta: number): void {
        this.backgroundImage.tilePositionY -= 4;

    }



}