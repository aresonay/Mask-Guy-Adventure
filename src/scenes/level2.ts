import Global from "../global";
import LevelController from "./level-controller";


export default class Level2 extends LevelController {

    constructor(){
       super(Global.SCENES.LEVEL2);
    }


    create(): void {
        this.createLevel(Global.MAPS.LEVEL2.TILEMAPJSON, Global.BACKGROUNDS.LEVEL2);
        this.createEnemies([Global.ENEMIES.BUNNY, Global.ENEMIES.CHICKEN]);
        this.createCollectibles([Global.COLLECTABLES.APPLE, Global.COLLECTABLES.PINEAPPLE]);
    }

}