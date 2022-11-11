export default class Level1 extends Phaser.Scene
{
    private width: number;
    private height: number;
    private lives: number;

    constructor ()
    {
        super('Level1');
    }

    init(){
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
        this.lives = 3;
    }


    create ()
    {
        const logo = this.add.image(400, 70, 'logo1');

        const playTxt: Phaser.GameObjects.Text = this.add.text(
            50, 
            this.height / 2, 
            'Jugando....',
            {fontSize: '32px', color: '#FFFFFF'});
        const livesTxt: Phaser.GameObjects.Text = this.add.text(
            this.width / 2, 
            this.height / 2, 
            'Vidas -',
            {fontSize: '32px', color: '#FFFFFF'}).setInteractive();

        livesTxt.on('pointerdown', () => {
            this.lives--;
            this.registry.set('lives', this.lives);
            this.events.emit('changelives');

        });


    }
}