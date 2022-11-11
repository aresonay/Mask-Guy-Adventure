import Level1 from './scenes/level1';
import Load from './scenes/load';
import Menu from './scenes/menu';
import HUD from './scenes/hud';


const Config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 800,
    height: 600,
    scene: [Load, Menu, Level1, HUD]
};

export default Config;