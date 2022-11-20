import Global from "../global";

export default class HUD extends Phaser.Scene {

    private livesTxt : Phaser.GameObjects.Text;
    private scoreTxt: Phaser.GameObjects.Text;
    
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
        const level1 : Phaser.Scene = this.scene.get('Level1');
        level1.events.on(Global.EVENTS.LIVES, this.updateLives, this);
        level1.events.on(Global.EVENTS.SCORE, this.updateScore, this);

        this.livesTxt = this.add.text(20, 20, Global.HUD.LIVES + this.registry.get(Global.REGISTRY.LIVES), {fontSize: '32px', color: '#FFFFFF'});
        this.scoreTxt = this.add.text(this.width - 50,  20, '000', {fontSize: '20px', color: '#FFFFFF'})
    }

    private updateLives(): void {
        this.livesTxt.text = "Vidas: " + this.registry.get('lives');
        
    }

    private updateScore(): void{
        this.scoreTxt.text = Phaser.Utils.String.Pad(this.registry.get('score'), 3, '0', 1);
    }


}