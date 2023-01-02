import Global from "../global";

export default class Player extends Phaser.Physics.Arcade.Sprite{
       
    
    // Input control 
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private WASDkeys: any;
    private spaceKey: Phaser.Input.Keyboard.Key;


    public scene : Phaser.Scene;


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
    
}