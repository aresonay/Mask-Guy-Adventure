import Global from "../global";
import LevelController from "../scenes/level-controller";



export default class Collectibles extends Phaser.Physics.Arcade.Group {

    public scene : LevelController;


    constructor(scene: LevelController, objectName: string, objectId: string, objectAnim: string){
        super(scene.physics.world, scene);

        this.addMultiple(this.scene.tileMap.createFromObjects(objectName, {name: objectId, key: objectId}));

        this.scene.physics.world.enable(this.children.entries);

        this.scene.anims.create({key: objectAnim, frames: objectId, frameRate: 20, repeat: -1});

        this.children.entries.map((collectible: any) => {
            collectible.body.setAllowGravity(false);
            collectible.body.setImmovable(true);
            collectible.play(objectAnim);
        });
    }





}