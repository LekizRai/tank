import { Player } from '../objects/player'
import { Enemy } from '../objects/enemy'
import { Obstacle } from '../objects/obstacles/obstacle'
import { Bullet } from '../objects/bullet'

type GameObjectWithBody = Phaser.Types.Physics.Arcade.GameObjectWithBody

export class GameScene extends Phaser.Scene {
    private map: Phaser.Tilemaps.Tilemap
    private tileSet: Phaser.Tilemaps.Tileset
    private layer: Phaser.Tilemaps.TilemapLayer

    private player: Player
    private enemies: Phaser.GameObjects.Group
    private obstacles: Phaser.GameObjects.Group

    private target: Phaser.Math.Vector2

    constructor() {
        super({
            key: 'GameScene',
        })
    }

    init(): void {}

    create(): void {
        // create tilemap from tiled JSON
        this.map = this.make.tilemap({ key: 'levelMap' })

        const tileSet = this.map.addTilesetImage('tiles')
        if (tileSet) {
            this.tileSet = tileSet
        }
        const layer = this.map.createLayer('tileLayer', this.tileSet, -200, -200)
        if (layer) {
            this.layer = layer
            this.layer.setCollisionByProperty({ collide: true })
        }

        this.player = new Player({scene: this, x: 0, y: 0, texture: "tankBlue"})

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

        this.enemies.getChildren().forEach((enemy: Phaser.GameObjects.GameObject) => {
            if (enemy instanceof Enemy) {
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
            }
        }, this)

        this.cameras.main.startFollow(this.player)
    }

    update(): void {
        this.player.update()

        this.enemies.getChildren().forEach((enemy: Phaser.GameObjects.GameObject) => {
            enemy.update()
            if (this.player.active && enemy.active) {
                if (enemy instanceof Enemy) {
                    var angle = Phaser.Math.Angle.Between(
                        enemy.body.x,
                        enemy.body.y,
                        this.player.body.x,
                        this.player.body.y
                    )
                    enemy.getBarrel().angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG
                }
            }
        }, this)
    }

    private convertObjects(): void {
        // find the object layer in the tilemap named 'objects'
        const objects = this.map.getObjectLayer('objects')?.objects

        if (objects) {
            objects.forEach((object) => {
                if (object instanceof Player) {
                    this.player = new Player({
                        scene: this,
                        x: object.x,
                        y: object.y,
                        texture: 'tankBlue',
                    })
                } else if (object instanceof Enemy) {
                    let enemy = new Enemy({
                        scene: this,
                        x: object.x,
                        y: object.y,
                        texture: 'tankRed',
                    })

                    this.enemies.add(enemy)
                } else if (object instanceof Obstacle) {
                    let obstacle = new Obstacle({
                        scene: this,
                        x: object.x,
                        y: object.y - 40,
                        texture: object.type,
                    })

                    this.obstacles.add(obstacle)
                }
            })
        }
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
