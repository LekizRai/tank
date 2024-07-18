import IBulletConstructor from '../interfaces/bullet.interface'

export default class Bullet extends Phaser.GameObjects.Sprite {
    body: Phaser.Physics.Arcade.Body

    private bulletSpeed: number

    constructor(aParams: IBulletConstructor) {
        super(aParams.scene, aParams.x, aParams.y, aParams.texture)

        this.rotation = aParams.rotation
        this.initImage()
        this.scene.add.existing(this)

        this.setScale(0.7)
    }

    private initImage(): void {
        // variables
        this.bulletSpeed = 1000

        // image
        this.setOrigin(0.5, 0.5)
        this.setDepth(2)

        // physics
        this.scene.physics.world.enable(this)
        this.body.setSize(10, 10)
        this.scene.physics.velocityFromRotation(
            this.rotation - Math.PI / 2,
            this.bulletSpeed,
            this.body.velocity
        )
    }

    public doExplosion(): void {
        this.body.setEnable(false)
        this.play('bullet-explosion').setScale(0.3).on('animationcomplete', () => {
            this.destroy()
        })
        // this.destroy()
    }

    public update(): void {}
}
