import Global from "../global";
import Level1 from "../scenes/level1";


export default class MovingPlatforms extends Phaser.Physics.Arcade.Group {
    
    
    public scene:Level1;
    private speed : number;
    private horizontal: boolean;

    constructor(scene: Level1, ObjectName: string, ObjectId: string, speed: number, horizontal: boolean){
        super(scene.physics.world, scene);

        this.scene = scene;
        this.speed = 60;
        this.horizontal = horizontal;

        let namePlatformObject : string = (this.horizontal) ? Global.MAPS.MOVINGPLATFORM_X : Global.MAPS.MOVINGPLATFORM_Y;

        this.addMultiple(this.scene.tileMap.createFromObjects(ObjectName, {name: namePlatformObject, key: ObjectId}));

        this.children.entries.map((platform:any) => {
            platform.setTexture(ObjectId);
            platform.body.setCollideWorldBounds(true);
            platform.body.setAllowGravity(false);
            platform.body.setImmovable(true);
            if(this.horizontal){
                platform.body.setFrictionX(1);
                platform.body.setVelocityX(this.speed);
                this.movePlatformX((Phaser.Math.Between(0,1) ? 'left' : 'right'), platform);
            }else if(!this.horizontal){
                platform.body.setFrictionY(1);
                platform.body.setVelocityY(this.speed);
                this.movePlatformY((Phaser.Math.Between(0,1) ? 'up' : 'down'), platform);
                
            }
        });
            


        

    }


    public movePlatformX(direction: string, platform: any): void {
        (direction === 'left') ? platform.body.setVelocityX(this.speed*-1) : platform.body.setVelocityX(this.speed);
    }


    public movePlatformY(direction: string, platform: any): void {
        (direction === 'up') ? platform.body.setVelocityY(this.speed*-1) : platform.body.setVelocityY(this.speed);
    }


    public update() : void{ 
        this.children.entries.map((platform: any) => {
            if(this.horizontal){
                if(platform.body.velocity.x === 0){
                    this.movePlatformX((Phaser.Math.Between(0,1) ? 'left' : 'right'), platform);
                }
                if(platform.body.blocked.right){
                    this.movePlatformX('left', platform);
                }else if(platform.body.blocked.left){
                    this.movePlatformX('right', platform);
                }
            }else if(!this.horizontal){
                if(platform.body.velocity.y === 0){
                    this.movePlatformY((Phaser.Math.Between(0,1) ? 'up': 'down'), platform);
                }
                if(platform.body.blocked.top){
                    this.movePlatformY('down', platform);
                }else if(platform.body.blocked.bottom){
                    this.movePlatformY('up', platform);
                }
            }
        });
    }



}