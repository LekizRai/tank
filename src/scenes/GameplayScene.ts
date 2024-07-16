import Player from '../objects/Player'
import Enemy from '../objects/Enemy'
import Obstacle from '../objects/obstacles/Obstacle'

export default class GameplayScene extends Phaser.Scene {
    private map: Phaser.Tilemaps.Tilemap
    private tileset: Phaser.Tilemaps.Tileset
    private layer: Phaser.Tilemaps.TilemapLayer

    private player: Player
    private enemies: Phaser.GameObjects.Group
    private obstacles: Phaser.GameObjects.Group

    private target: Phaser.Math.Vector2

    private pointer: Phaser.Input.Pointer

    constructor() {
        super('gameplay')
    }

    init(): void {}

    create(): void {
        this.cameras.main.setBackgroundColor(0xffffff)
        
        // create tilemap from tiled JSON
        this.map = this.make.tilemap({ key: 'levelMap' })

        this.tileset = this.map.addTilesetImage('tiles')!
        this.layer = this.map.createLayer('tileLayer', this.tileset, 0, 0)!
        this.layer.setCollisionByProperty({ collide: true })

        this.obstacles = this.add.group({
            /*classType: Obstacle,*/
            runChildUpdate: true,
        })

        this.enemies = this.add.group({
            /*classType: Enemy*/
        })
        this.convertObjects()

        // collider layer and obstacles
        this.physics.add.collider(this.player, this.layer)
        this.physics.add.collider(this.player, this.obstacles)

        // collider for bullets
        this.physics.add.collider(
            this.player.getBullets(),
            this.layer,
            this.bulletHitLayer,
            undefined,
            this
        )

        this.physics.add.collider(
            this.player.getBullets(),
            this.obstacles,
            this.bulletHitObstacles,
            undefined,
            this
        )

        this.enemies.getChildren().forEach((enemyObject: Phaser.GameObjects.GameObject) => {
            const enemy = enemyObject as Enemy
            this.physics.add.overlap(
                this.player.getBullets(),
                enemy,
                this.playerBulletHitEnemy,
                undefined,
                this
            )
            this.physics.add.overlap(
                enemy.getBullets(),
                this.player,
                this.enemyBulletHitPlayer,
                undefined
            )

            this.physics.add.collider(
                enemy.getBullets(),
                this.obstacles,
                this.bulletHitObstacles,
                undefined
            )
            this.physics.add.collider(
                enemy.getBullets(),
                this.layer,
                this.bulletHitLayer,
                undefined
            )
        }, this)

        this.cameras.main.startFollow(this.player)

        this.add.zone(0, 0, 1200, 1600)
        this.scene.launch('pause')
    }

    update(): void {
        this.player.update()

        this.enemies.getChildren().forEach((enemyObject: Phaser.GameObjects.GameObject) => {
            const enemy = enemyObject as Enemy
            enemy.update()
            if (this.player.active && enemy.active) {
                const angle = Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(
                    enemy.body.x,
                    enemy.body.y,
                    this.player.body.x,
                    this.player.body.y
                ) + Math.PI / 2)

                enemy.setGunAngle(angle)
                // enemy.getBarrel().angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG
            }
        }, this)
    }

    private convertObjects(): void {
        // find the object layer in the tilemap named 'objects'
        const objects = this.map.getObjectLayer('objects')?.objects as any[]

        objects.forEach((object) => {
            if (object.type === 'player') {
                this.player = new Player(
                    this,
                    object.x,
                    object.y
                    // texture: 'tankBlue',
                )
            } else if (object.type === 'enemy') {
                const enemy = new Enemy(
                    this,
                    object.x,
                    object.y
                    // texture: 'tankRed',
                )

                this.enemies.add(enemy)
            } else {
                const obstacle = new Obstacle({
                    scene: this,
                    x: object.x,
                    y: object.y - 40,
                    texture: object.type,
                })

                this.obstacles.add(obstacle)
            }
        })
    }

    private bulletHitLayer(bullet: any): void {
        bullet.destroy()
    }

    private bulletHitObstacles(bullet: any, obstacle: any): void {
        bullet.destroy()
    }

    private enemyBulletHitPlayer(bullet: any, player: any): void {
        bullet.destroy()
        player.updateHealth()
    }

    private playerBulletHitEnemy(bullet: any, enemy: any): void {
        bullet.destroy()
        enemy.updateHealth()
    }
}
