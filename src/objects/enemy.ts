// import Bullet from './Bullet'
// import IImageConstructor from '../interfaces/image.interface'

// export default class Enemy extends Phaser.GameObjects.Image {
//     body: Phaser.Physics.Arcade.Body

//     // variables
//     private health: number
//     private lastShoot: number
//     private speed: number

//     // children
//     private barrel: Phaser.GameObjects.Image
//     private lifeBar: Phaser.GameObjects.Graphics

//     // game objects
//     private bullets: Phaser.GameObjects.Group

//     public getBarrel(): Phaser.GameObjects.Image {
//         return this.barrel
//     }

//     public getBullets(): Phaser.GameObjects.Group {
//         return this.bullets
//     }

//     constructor(aParams: IImageConstructor) {
//         super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame)

//         this.initContainer()
//         this.scene.add.existing(this)
//     }

//     private initContainer() {
//         // variables
//         this.health = 1
//         this.lastShoot = 0
//         this.speed = 100

//         // image
//         this.setDepth(0)

//         this.barrel = this.scene.add.image(0, 0, 'barrelRed')
//         this.barrel.setOrigin(0.5, 1)
//         this.barrel.setDepth(1)

//         this.lifeBar = this.scene.add.graphics()
//         this.redrawLifebar()

//         // game objects
//         this.bullets = this.scene.add.group({
//             /*classType: Bullet,*/
//             active: true,
//             maxSize: 10,
//             runChildUpdate: true,
//         })

//         // tweens
//         this.scene.tweens.add({
//             targets: this,
//             props: { y: this.y - 200 },
//             delay: 0,
//             duration: 2000,
//             ease: 'Linear',
//             easeParams: null,
//             hold: 0,
//             repeat: -1,
//             repeatDelay: 0,
//             yoyo: true,
//         })

//         // physics
//         this.scene.physics.world.enable(this)
//     }

//     update(): void {
//         if (this.active) {
//             this.barrel.x = this.x
//             this.barrel.y = this.y
//             this.lifeBar.x = this.x
//             this.lifeBar.y = this.y
//             this.handleShooting()
//         } else {
//             this.destroy()
//             this.barrel.destroy()
//             this.lifeBar.destroy()
//         }
//     }

//     private handleShooting(): void {
//         if (this.scene.time.now > this.lastShoot) {
//             if (this.bullets.getLength() < 10) {
//                 this.bullets.add(
//                     new Bullet({
//                         scene: this.scene,
//                         rotation: this.barrel.rotation,
//                         x: this.barrel.x,
//                         y: this.barrel.y,
//                         texture: 'bulletRed',
//                     })
//                 )

//                 this.lastShoot = this.scene.time.now + 400
//             }
//         }
//     }

//     private redrawLifebar(): void {
//         this.lifeBar.clear()
//         this.lifeBar.fillStyle(0xe66a28, 1)
//         this.lifeBar.fillRect(-this.width / 2, this.height / 2, this.width * this.health, 15)
//         this.lifeBar.lineStyle(2, 0xffffff)
//         this.lifeBar.strokeRect(-this.width / 2, this.height / 2, this.width, 15)
//         this.lifeBar.setDepth(1)
//     }

//     public updateHealth(): void {
//         if (this.health > 0) {
//             this.health -= 0.05
//             this.redrawLifebar()
//         } else {
//             this.health = 0
//             this.active = false
//         }
//     }
// }

import Bullet from './Bullet'
import IImageConstructor from '../interfaces/image.interface'

export default class Enemy extends Phaser.GameObjects.Container {
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

    // children
    private barrel: Phaser.GameObjects.Image
    private lifeBar: Phaser.GameObjects.Graphics

    // game objects
    private bullets: Phaser.GameObjects.Group

    // input
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys
    private rotateKeyLeft: Phaser.Input.Keyboard.Key
    private rotateKeyRight: Phaser.Input.Keyboard.Key
    private shootingKey: Phaser.Input.Keyboard.Key
    private pointer: Phaser.Input.Pointer

    public getBullets(): Phaser.GameObjects.Group {
        return this.bullets
    }

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)

        this.initTank()
        this.scene.add.existing(this)
    }

    private initTank() {
        // variables
        this.health = 1
        this.lastShoot = 0
        this.speed = 100

        this.tankLeftTrack = this.scene.add.image(-35, -15, 'track-1').setScale(0.6)
        this.tankRightTrack = this.scene.add.image(35, -15, 'track-1').setScale(0.6)
        this.tankHull = this.scene.add.image(0, 0, 'hull-1').setScale(0.7).setOrigin(0.5, 0.6)
        this.tankBody = this.scene.add.container(0, 0)
        this.tankBody.add(this.tankLeftTrack)
        this.tankBody.add(this.tankRightTrack)
        this.tankBody.add(this.tankHull)

        this.tankGun = this.scene.add.image(0, 0, 'gun-1').setScale(0.7)

        // this.add(this.tankLeftTrack)
        // this.add(this.tankRightTrack)
        // this.add(this.tankHull)

        // image
        // this.setOrigin(0.5, 0.5)
        // this.setDepth(0)
        // this.angle = 180

        // this.barrel = this.scene.add.image(this.x, this.y, 'barrelBlue')
        // this.barrel.setOrigin(0.5, 1)
        // this.barrel.setDepth(1)
        // this.barrel.angle = 180

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
        // this.rotateKeyLeft = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.A)!
        // this.rotateKeyRight = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.D)!
        // this.shootingKey = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)!

        // physics
        this.scene.physics.world.enable(this)
    }

    update(): void {
        if (this.active) {
            // this.barrel.x = this.x
            // this.barrel.y = this.y
            // this.lifeBar.x = this.x
            // this.lifeBar.y = this.y
            this.handleShooting()
        } else {
            this.destroy()
            // this.barrel.destroy()
            this.lifeBar.destroy()
        }
    }

    private handleShooting(): void {
        // this.scene.cameras.main.shake(20, 0.005)
        this.scene.tweens.add({
            targets: this,
            props: { alpha: 0.8 },
            delay: 0,
            duration: 5,
            ease: 'Power1',
            easeParams: null,
            hold: 0,
            repeat: 0,
            repeatDelay: 0,
            yoyo: true,
            paused: false,
        })

        if (this.scene.time.now > this.lastShoot) {
            if (this.bullets.getLength() < 10) {
                this.bullets.add(
                    new Bullet({
                        scene: this.scene,
                        rotation: this.tankGun.rotation,
                        x:
                            this.tankGun.x +
                            this.x +
                            Math.sin(Phaser.Math.DegToRad(this.tankGun.angle)) * 100,
                        y:
                            this.tankGun.y +
                            this.y -
                            Math.cos(Phaser.Math.DegToRad(this.tankGun.angle)) * 100,
                        texture: 'bullet-1',
                    })
                )

                this.lastShoot = this.scene.time.now + 400
            }
        }
    }

    private redrawLifebar(): void {
        this.lifeBar.clear()
        this.lifeBar.fillStyle(0xe66a28, 1)
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
            this.active = false
        }
    }

    public setGunAngle(angle: number): void {
        if (Phaser.Math.Angle.ShortestBetween(this.tankGun.angle, angle) > 0) {
            this.tankGun.angle += 1
        } else {
            this.tankGun.angle -= 1
        }
    }
}
