import Level1 from './scenes/level1';
import Level2 from './scenes/level2';
import LevelSelector from './scenes/level-selector';
import Load from './scenes/load';
import Menu from './scenes/menu';
import HUD from './scenes/hud';
import Settings from './scenes/settings';
import Credits from './scenes/credits';


const Config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 800,
    height: 600,
    scene: [Load, Menu, Level1, Level2, LevelSelector ,HUD, Settings, Credits],
    pixelArt: true,
    audio: {
        disableWebAudio:true
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: true
        }

    }
};

export default Config;