import consts from '../consts/consts'
import Button from '../objects/Button'
import GameplayScene from '../scenes/GameplayScene'
import utils from '../utils/utils'

export default class GameoverUI extends Phaser.GameObjects.Container {
    private controlBoard: Phaser.GameObjects.Container
    private screenZone: Phaser.GameObjects.Zone

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)
        this.screenZone = this.scene.add.zone(
            consts.GAME_WIDTH / 2,
            consts.GAME_HEIGHT / 2,
            consts.GAME_WIDTH,
            consts.GAME_HEIGHT
        )
        this.init()
        this.scene.add.existing(this)
    }

    private init(): void {
        this.controlBoard = this.scene.add.container(0, 0).setScale(0.8).setVisible(true)

        const board = this.scene.add.image(0, 0, 'board')

        const restartButton = new Button(this.scene, 0, 0, 'button', 'RESTART', 100).setScale(0.6)
        restartButton.onClick(() => {
            this.scene.scene.start('gameplay')
            this.scene.scene.get('menu').events.emit('transitiondone')
        })
        restartButton.onOver(() => {
            this.scene.add.tween({
                targets: restartButton,
                scale: 0.5,
                duration: 200,
            })
        })
        restartButton.onOut(() => {
            this.scene.add.tween({
                targets: restartButton,
                scale: 0.6,
                duration: 200,
            })
        })
        utils.alignCenter(restartButton, board, -300, 200)

        const menuButton = new Button(this.scene, 0, 0, 'button', 'HOME', 100).setScale(0.6)
        menuButton.onClick(() => {
            this.scene.scene.stop('gameover')
            const gameplayScene = this.scene.scene.get('gameplay')
            if (gameplayScene instanceof GameplayScene) {
                gameplayScene.doTransition('menu')
            }
        })
        menuButton.onOver(() => {
            this.scene.add.tween({
                targets: menuButton,
                scale: 0.5,
                duration: 200,
            })
        })
        menuButton.onOut(() => {
            this.scene.add.tween({
                targets: menuButton,
                scale: 0.6,
                duration: 200,
            })
        })
        utils.alignCenter(menuButton, board, 300, 200)

        this.controlBoard.add(board)
        this.controlBoard.add(restartButton)
        this.controlBoard.add(menuButton)

        this.add(this.controlBoard)

        utils.alignCenter(this.controlBoard, this.screenZone)
    }
}
