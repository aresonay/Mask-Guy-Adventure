import Level1 from "../scenes/level1";
import Global from "../global";


export default class Enemies extends Phaser.Physics.Arcade.Group {

    // Class Atributes
    public scene: Level1;
    private speed: number;


    constructor(scene: Level1, objectName: string, objectID: string, animObject: string, speed: number){
        super(scene.physics.world, scene);

        this.scene = scene;
        this.speed = speed;

        //  Add enemy objects from map sprites array to the group
        this.addMultiple(this.scene.tileMap.createFromObjects(objectName, {name: objectID}));

        // Add Physics to all objects in group
        this.scene.physics.world.enable(this.children.entries);

        // Create Anims for Enemies
        this.scene.anims.create({
            key: animObject,
            frames: objectID,
            frameRate: 20,
            repeat: -1
        });

        this.children.entries.map((enemy: any) => {
            enemy.body.setCollideWorldBounds(true);
            enemy.body.setSize(30,30);
            enemy.body.setOffset(0,10);
            enemy.play(animObject);
            this.moveEnemy((Phaser.Math.Between(0,1) ? 'left': 'right'), enemy);
        });

    }

    
    moveEnemy(direction: string, enemy: any): void{
        if(direction === 'left'){
            enemy.body.setVelocityX(this.speed*-1);
            enemy.flipX = false;
        }else if(direction === 'right'){
            enemy.body.setVelocityX(this.speed);
            enemy.flipX = true;
        }
    }
    
    public update():void{
        this.children.entries.map((enemy: any) => {
            if(enemy.body.velocity.x === 0){
                this.moveEnemy((Phaser.Math.Between(0,1) ? 'left': 'right'), enemy);
            }

            if(enemy.body.blocked.right){
                this.moveEnemy('left', enemy);
            }else if(enemy.body.blocked.left){
                this.moveEnemy('right', enemy);
            }
        });
    }



}