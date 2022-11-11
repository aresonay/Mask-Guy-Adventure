import Config from "../config";

export default class Load extends Phaser.Scene {
    //Loading bar 
    private loadingBar : Phaser.GameObjects.Graphics;
    private progressBar : Phaser.GameObjects.Graphics;

    constructor(){
        super('Load');
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
            'complete', 
            function() {
                this.scene.start('Menu');
            }, this);   

        for(let i=1; i <= 100; i++){
            this.load.image('logo' + i, 'assets/phaser3-logo.png');
        }
        

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