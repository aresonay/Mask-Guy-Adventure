export default class HUD extends Phaser.Scene {

    private livesTxt : Phaser.GameObjects.Text;


    constructor(){
        super('HUD');
    }

    create(): void{
        const level1 : Phaser.Scene = this.scene.get('Level1');
        level1.events.on('changelives', this.updateLives, this);

        this.livesTxt = this.add.text(20, 20, 'Vidas: 3', {fontSize: '32px', color: '#FFFFFF'});
    }

    private updateLives(): void {
        this.livesTxt.text = "Vidas: " + this.registry.get('lives');

    }


}