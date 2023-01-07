import Global from "../global";
import Level1 from "../scenes/level1";

export default class Player extends Phaser.Physics.Arcade.Sprite{
       
    
    // Input control 
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private WASDkeys: any;
    private spaceKey: Phaser.Input.Keyboard.Key;


    public scene : Level1;

    private waitingTimeForCollisionActive: boolean;


    constructor(config: any){
        super(config.scene, config.x, config.y, config.texture);

        this.scene = config.scene;
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);

        this.body.setSize(20, 30); 
        this.setCollideWorldBounds(true);

        // Input Control 
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.WASDkeys = this.scene.input.keyboard.addKeys('W,A,S,D');
        this.spaceKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
   
        
        this.play(Global.PLAYER.ANIMATIONS.IDLE);
   
    }



    update(): void {

        
        
        // Motion control 
        if(this.WASDkeys.A.isDown || this.cursors.left.isDown){
            this.setVelocityX(-200);
            if(this.body.blocked.down) this.anims.play(Global.PLAYER.ANIMATIONS.RUN, true);
            this.flipX = true;
        }else if(this.WASDkeys.D.isDown || this.cursors.right.isDown){
            this.setVelocityX(200);
            if(this.body.blocked.down) this.anims.play(Global.PLAYER.ANIMATIONS.RUN, true);
            this.flipX = false;

        }
        else{
            this.setVelocityX(0);
            this.anims.play(Global.PLAYER.ANIMATIONS.IDLE);
        }


        if((this.spaceKey.isDown || this.WASDkeys.W.isDown)  && (this.body.blocked.down)){
            this.setVelocityY(-300);
            this.anims.stop();
            this.setTexture(Global.PLAYER.ID, Global.PLAYER.ANIMATIONS.JUMP);
        }

    }


    /* 
        This method handles the collision between the player and an enemy object 
         * The player loses life if an enemy touches him 
         * If player falls over enemy from up enemy is beaten, disappear an increase player score 
         * 'this' is from where this method is called
         * @param player
         * @param enemy
    */

     public enemyTouch(player: Player, enemy: Phaser.Physics.Arcade.Sprite): void{

            if(player.body.velocity.y > 100 && enemy.body.touching.up && player.body.touching.down){
                if(!player.waitingTimeForCollisionActive){
                    let posX = enemy.x;
                    let posY = enemy.y;
                    enemy.destroy();

                    // Increase player score in 100 
                    player.scene.increaseScore(100);
                    player.scene.registry.set(Global.REGISTRY.SCORE, player.scene.getScore());
                    player.scene.events.emit(Global.EVENTS.SCORE);

                    // Explosion Animations
                    let explosion : Phaser.GameObjects.Sprite = player.scene.add.sprite(posX, posY, Global.ENEMIES.EXPLOSION.ID);
                    explosion.play(Global.ENEMIES.EXPLOSION.ANIM);
                    explosion.once('animationcomplete', () => {
                        explosion.destroy();
                    });

                } 
            }else if(!player.waitingTimeForCollisionActive){
                    // Substract life and update HUD 
                    player.scene.lives--;
                    player.scene.registry.set(Global.REGISTRY.LIVES, player.scene.lives);
                    player.scene.events.emit(Global.EVENTS.LIVES);

                    // Active Waiting time for collision 
                    player.waitingTimeForCollisionActive = true;
                    // The player turns red 
                    player.tint = 0xff0000;

                    player.scene.time.addEvent({
                        delay: 600, 
                        callback: () => {
                            player.waitingTimeForCollisionActive = false;
                            player.tint = 0xffffff;
                        }

                    });

                }
     }
    
}