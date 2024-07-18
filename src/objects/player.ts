import Bullet from './Bullet'
import IImageConstructor from '../interfaces/image.interface'
import GameEventEmitter from './GameEventEmitter'
import ScoreManager from './ScoreManager'

export default class Player extends Phaser.GameObjects.Container {
    body: Phaser.Physics.Arcade.Body

    // variables
    private health: number
    private lastShoot: number
    private speed: number

    private tankBody: Phaser.GameObjects.Container
    private tankHull: Phaser.GameObjects.Image
    private tankGun: Phaser.GameObjects.Image
    private tankLeftTrack: Phaser.GameObjects.Image
    private tankRightTrack: Phaser.GameObjects.Image

    private directionArrow: Phaser.GameObjects.Image

    // children
    private lifeBar: Phaser.GameObjects.Graphics

    // game objects
    private bullets: Phaser.GameObjects.Group

    // input
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys
    private pointer: Phaser.Input.Pointer

    private flashSprite: Phaser.GameObjects.Sprite

    private addTrackTime: number

    private eventEmitter: GameEventEmitter

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)

        this.initTank()
        this.scene.add.existing(this)


        this.eventEmitter = GameEventEmitter.getInstance()
    }

    public getBullets(): Phaser.GameObjects.Group {
        return this.bullets
    }

    private initTank() {
        this.flashSprite = this.scene.add.sprite(0, 0, 'gun-flash', 'gun-flash-1').setVisible(false).setDepth(100)

        // variables
        this.health = 1
        this.lastShoot = 0
        this.speed = 100

        this.directionArrow = this.scene.add.image(0, -120, 'arrow').setScale(0.2)
        this.tankLeftTrack = this.scene.add.image(-35, -15, 'track-1').setScale(0.6)
        this.tankRightTrack = this.scene.add.image(35, -15, 'track-1').setScale(0.6)
        this.tankHull = this.scene.add.image(0, 0, 'hull-1').setScale(0.7).setOrigin(0.5, 0.6)
        this.tankBody = this.scene.add.container(0, 0)
        this.tankBody.add(this.directionArrow)
        this.tankBody.add(this.tankLeftTrack)
        this.tankBody.add(this.tankRightTrack)
        this.tankBody.add(this.tankHull)

        this.tankGun = this.scene.add.image(0, 0, 'gun-1').setScale(0.7)

        this.addTrackTime = 0

        this.lifeBar = this.scene.add.graphics()

        // game objects
        this.bullets = this.scene.add.group({
            /*classType: Bullet,*/
            active: true,
            maxSize: 10,
            runChildUpdate: true,
        })

        this.add(this.tankBody)
        this.add(this.tankGun)
        this.add(this.lifeBar)

        this.redrawLifebar()

        // input
        this.pointer = this.scene.input.activePointer
        this.cursors = this.scene.input.keyboard?.createCursorKeys()!
        // this.rotateKeyLeft = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.A)!
        // this.rotateKeyRight = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.D)!
        // this.shootingKey = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)!

        // physics
        this.scene.physics.world.enable(this)
        this.setSize(65, 100)
        this.body.setSize(60, 100)

    }

    update(time: number, timeInterval: number): void {
        if (this.active) {
            // this.barrel.x = this.x
            // this.barrel.y = this.y
            // this.lifeBar.x = this.x
            // this.lifeBar.y = this.y
            this.handleInput(timeInterval)
            this.handleShooting()
        } else {
            this.destroy()
            // this.barrel.destroy()
            this.lifeBar.destroy()
        }
    }

    private handleInput(timeInterval: number) {
        this.pointer.updateWorldPoint(this.scene.cameras.main)
        let pointerAngle = Phaser.Math.RadToDeg(
            Phaser.Math.Angle.Between(
                this.tankGun.x,
                this.tankGun.y,
                this.pointer.worldX - this.x,
                this.pointer.worldY - this.y
            ) +
                Math.PI / 2
        )
        if (Phaser.Math.Angle.ShortestBetween(this.tankGun.angle, pointerAngle) > 0) {
            this.tankGun.angle += 1
        } else {
            this.tankGun.angle -= 1
        }

        if (this.cursors.up.isDown) {
            this.scene.physics.velocityFromAngle(
                this.tankBody.angle - 90,
                this.speed,
                this.body.velocity
            )
        } else if (this.cursors.down.isDown) {
            this.scene.physics.velocityFromAngle(
                this.tankBody.angle - 90,
                -this.speed,
                this.body.velocity
            )
        } else {
            this.body.setVelocity(0, 0)
        }

        if (this.cursors.left.isDown) {
            this.tankBody.angle -= 1
        } else if (this.cursors.right.isDown) {
            this.tankBody.angle += 1
        }

        this.flashSprite.setX(
            this.tankGun.x + this.x + Math.sin(Phaser.Math.DegToRad(this.tankGun.angle)) * 100
        )
        this.flashSprite.setY(
            this.tankGun.y + this.y - Math.cos(Phaser.Math.DegToRad(this.tankGun.angle)) * 100
        )
        this.flashSprite.setRotation(this.tankGun.rotation)
    }

    private handleShooting(): void {
        if (
            (this.cursors.space.isDown || this.pointer.leftButtonDown()) &&
            this.scene.time.now > this.lastShoot
        ) {
            // const vector = Phaser.Math.Angle()
            if (this.bullets.getLength() < 10 && this.scene.time.now > this.lastShoot) {
                this.scene.sound.play('tank-shooting', {volume: 0.3})
                this.bullets.add(
                    new Bullet({
                        scene: this.scene,
                        rotation: this.tankGun.rotation,
                        x: this.tankGun.x + this.x + Math.sin(this.tankGun.rotation) * 100,
                        y: this.tankGun.y + this.y - Math.cos(this.tankGun.rotation) * 100,
                        texture: 'bullet-1',
                    })
                )

                this.flashSprite.play('gun-flash').setVisible(true)

                this.lastShoot = this.scene.time.now + 100
            }
        }
    }

    private redrawLifebar(): void {
        this.lifeBar.clear()
        this.lifeBar.fillStyle(0x0000ff, 1)
        this.lifeBar.fillRect(-50, 100, 100 * this.health, 15)
        this.lifeBar.lineStyle(2, 0xffffff)
        this.lifeBar.strokeRect(-50, 100, 100, 15)
        this.lifeBar.setDepth(1)
    }

    public updateHealth(): void {
        if (this.health > 0) {
            this.health -= 0.05
            this.redrawLifebar()
        } else {
            this.health = 0
            ScoreManager.updateHighScore()
            this.eventEmitter.emit('playerdead')
            this.active = false
        }
    }
}
