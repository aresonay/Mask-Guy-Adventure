import 'phaser';
import Config from './config';


export class Game extends Phaser.Game{
    
    constructor(configuration: Phaser.Types.Core.GameConfig){
        super(configuration);
    }
}


window.addEventListener('load', () => {
    const game = new Phaser.Game(Config);
});


