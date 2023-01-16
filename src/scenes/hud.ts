import Global from "../global";

export default class HUD extends Phaser.Scene {

    private livesTxt : Phaser.GameObjects.BitmapText;
    private scoreTxt: Phaser.GameObjects.BitmapText;
    private clockTxt: Phaser.GameObjects.BitmapText;
    
    private width: number;
    private height: number;



    constructor(){
        super(Global.SCENES.HUD);
    }

    init(){
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
    }

    create(): void{
        const level1 : Phaser.Scene = this.scene.get(Global.SCENES.LEVEL1);
        level1.events.on(Global.EVENTS.LIVES, this.updateLives, this);
        level1.events.on(Global.EVENTS.SCORE, this.updateScore, this);
        level1.events.on(Global.EVENTS.CLOCK, this.updateClock, this);

        const level2 : Phaser.Scene = this.scene.get(Global.SCENES.LEVEL2);
        level2.events.on(Global.EVENTS.LIVES, this.updateLives, this);
        level2.events.on(Global.EVENTS.SCORE, this.updateScore, this);
        level2.events.on(Global.EVENTS.CLOCK, this.updateClock, this);

        this.livesTxt = this.add.bitmapText(20, 20, Global.FONTS.BITMAP ,Global.HUD.LIVES + this.registry.get(Global.REGISTRY.LIVES), 20);
        this.scoreTxt = this.add.bitmapText(this.width - 50,  20, Global.FONTS.BITMAP , '000', 20);

        this.clockTxt = this.add.bitmapText(this.width / 2, 20, Global.FONTS.BITMAP ,'05:00', 20);
    }

    private updateLives(): void {
        this.livesTxt.text = Global.HUD.LIVES + this.registry.get('lives');
        
    }

    private updateScore(): void{
        this.scoreTxt.text = Phaser.Utils.String.Pad(this.registry.get('score'), 3, '0', 1);
    }


    private updateClock(): void{
        this.clockTxt.text = this.registry.get(Global.REGISTRY.CLOCK);
    }
}