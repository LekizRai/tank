import Player from '../objects/Player'
import Enemy from '../objects/Enemy'
import Obstacle from '../objects/obstacles/Obstacle'
import GameEventEmitter from '../objects/GameEventEmitter'
import Bullet from '../objects/Bullet'

export default class GameplayScene extends Phaser.Scene {
    private map: Phaser.Tilemaps.Tilemap
    private tileset: Phaser.Tilemaps.Tileset
    private layer: Phaser.Tilemaps.TilemapLayer

    private player: Player
    private enemies: Phaser.GameObjects.Group
    private obstacles: Phaser.GameObjects.Group

    private target: Phaser.Math.Vector2

    private pointer: Phaser.Input.Pointer

    private eventEmitter: GameEventEmitter

    constructor() {
        super('gameplay')
    }

    init(): void {}

    create(): void {
        this.cameras.main.setBackgroundColor(0x000000)

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
        this.physics.add.collider(this.player.getBullets(), this.layer, this.bulletHitLayer, undefined, this)

        this.physics.add.collider(this.player.getBullets(), this.obstacles, this.bulletHitObstacles, undefined, this)

        this.enemies.getChildren().forEach((enemyObject: Phaser.GameObjects.GameObject) => {
            const enemy = enemyObject as Enemy
            this.physics.add.overlap(this.player.getBullets(), enemy, this.playerBulletHitEnemy, undefined, this)
            this.physics.add.overlap(enemy.getBullets(), this.player, this.enemyBulletHitPlayer, undefined, this)

            this.physics.add.collider(enemy.getBullets(), this.obstacles, this.bulletHitObstacles, undefined, this)
            this.physics.add.collider(enemy.getBullets(), this.layer, this.bulletHitLayer, undefined, this)
        })

        this.cameras.main.startFollow(this.player)

        this.eventEmitter = GameEventEmitter.getInstance()
        this.eventEmitter.on('transitiondone', () => {
            this.scene.launch('pause')
        })
        this.eventEmitter.on('playerdead', () => {
            this.scene.launch('gameover')
            this.scene.pause('gameplay')
            this.scene.stop('pause')
        })
    }

    update(time: number, timeInterval: number): void {
        this.player.update(time, timeInterval)

        this.enemies.getChildren().forEach((enemyObject: Phaser.GameObjects.GameObject) => {
            const enemy = enemyObject as Enemy
            enemy.update()
            if (this.player.active && enemy.active) {
                const angle = Phaser.Math.RadToDeg(
                    Phaser.Math.Angle.Between(
                        enemy.body.x,
                        enemy.body.y,
                        this.player.body.x,
                        this.player.body.y
                    ) +
                        Math.PI / 2
                )
                enemy.setGunAngle(angle)
            }
        })
    }

    private convertObjects(): void {
        // find the object layer in the tilemap named 'objects'
        const objects = this.map.getObjectLayer('objects')?.objects as any[]

        objects.forEach((object) => {
            if (object.type === 'player') {
                this.player = new Player(this, object.x, object.y)
            } else if (object.type === 'enemy') {
                const enemy = new Enemy(this, object.x, object.y)

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
        // this.sound.play('hit-obstacle')
        bullet.doExplosion()
    }

    private bulletHitObstacles(bullet: any, obstacle: any): void {
        // this.sound.play('hit-obstacle')
        bullet.doExplosion()
    }

    private enemyBulletHitPlayer(bullet: any, player: any): void {
        this.sound.play('hit-tank', {volume: 0.2})
        bullet.doExplosion()
        player.updateHealth()
    }

    private playerBulletHitEnemy(bullet: any, enemy: any): void {
        this.sound.play('hit-tank', {volume: 0.2})
        bullet.doExplosion()
        enemy.updateHealth()
    }

    public doTransition(sceneKey: string): void {
        const fx = this.cameras.main.postFX.addWipe(0.3, 1, 1)
        this.scene.transition({
            target: 'menu',
            duration: 2000,
            allowInput: false,
            moveBelow: true,
            onUpdate: (progress: number) => {
                fx.progress = progress
            },
        })
    }

    public startPauseScene(): void {
        this.scene.launch('pause')
    }
}
