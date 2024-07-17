import consts from '../consts/consts'
import Button from '../objects/Button'
import GameplayScene from '../scenes/GameplayScene'
import utils from '../utils/utils'

export default class PauseUI extends Phaser.GameObjects.Container {
    private pauseButton: Button
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
        // Pause button
        this.pauseButton = new Button(this.scene, 100, 100, 'pause', '').setScale(0.7)
        this.pauseButton.onClick(() => {
            this.controlBoard.setVisible(true)
            this.pauseButton.setVisible(false)
            this.scene.scene.pause('gameplay')
        })

        // Control board
        this.controlBoard = this.scene.add.container(0, 0).setScale(0.8).setVisible(false)

        const board = this.scene.add.image(0, 0, 'board')

        const continueButton = new Button(this.scene, 0, 0, 'button', 'CONTINUE', 100).setScale(0.6)
        continueButton.onClick(() => {
            this.controlBoard.setVisible(false)
            this.pauseButton.setVisible(true)
            this.scene.scene.resume('gameplay')
        })
        continueButton.onOver(() => {
            this.scene.add.tween({
                targets: continueButton,
                scale: 0.5,
                duration: 200,
            })
        })
        continueButton.onOut(() => {
            this.scene.add.tween({
                targets: continueButton,
                scale: 0.6,
                duration: 200,
            })
        })
        utils.alignCenter(continueButton, board, -300, 200)

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
        utils.alignCenter(restartButton, board, 300, 200)

        this.controlBoard.add(board)
        this.controlBoard.add(continueButton)
        this.controlBoard.add(restartButton)

        this.add(this.pauseButton)
        this.add(this.controlBoard)

        utils.alignCenter(this.controlBoard, this.screenZone)
    }
}
