import Global from "../global";
import LevelController from "./level-controller";

export default class Level1 extends LevelController
{
   
    constructor(){
        super(Global.SCENES.LEVEL1);
    }

    create():void{
        this.createLevel(Global.MAPS.LEVEL1.TILEMAPJSON, Global.BACKGROUNDS.LEVEL1);
        this.createEnemies([Global.ENEMIES.BUNNY, Global.ENEMIES.CHICKEN]);
        this.createCollectibles([Global.COLLECTABLES.APPLE, Global.COLLECTABLES.CHERRY, Global.COLLECTABLES.PINEAPPLE]);
        
    }


}