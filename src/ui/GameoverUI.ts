import { Game } from 'phaser'
import consts from '../consts/consts'
import Button from '../objects/Button'
import GameEventEmitter from '../objects/GameEventEmitter'
import GameplayScene from '../scenes/GameplayScene'
import utils from '../utils/utils'
import ScoreManager from '../objects/ScoreManager'

export default class GameoverUI extends Phaser.GameObjects.Container {
    private controlBoard: Phaser.GameObjects.Container
    private screenZone: Phaser.GameObjects.Zone

    private eventEmitter: GameEventEmitter

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

        this.eventEmitter = GameEventEmitter.getInstance()
    }

    private init(): void {
        this.controlBoard = this.scene.add.container(0, 0).setScale(0.8).setVisible(true)

        const board = this.scene.add.image(0, 0, 'board')

        const banner = new Button(this.scene, 0, 0, 'banner', 'GAME OVER', 100)
        utils.alignTopCenter(banner, board, 0, -100)

        const restartButton = new Button(this.scene, 0, 0, 'button', 'RESTART', 100).setScale(0.6)
        restartButton.onClick(() => {
            this.controlBoard.setScale(0)
            this.controlBoard.setAngle(-180)
            this.scene.add.tween({
                targets: this.controlBoard,
                angle: 0,
                scale: 0.8,
                duration: 200,
                onComplete: () => {
                    this.controlBoard.setVisible(false)
                },
            })

            this.scene.scene.start('gameplay')
            this.eventEmitter.emit('transitiondone')
        })
        restartButton.onOver(() => {
            restartButton.enableGlow(true)
        })
        restartButton.onOut(() => {
            restartButton.enableGlow(false)
            restartButton.fade(1, 0)
        })
        restartButton.onDown(() => {
            this.scene.sound.play('click-down')
            restartButton.fade(0.8, 0)
        })
        restartButton.onUp(() => {
            this.scene.sound.play('click-up')
            restartButton.fade(1, 0)
        })
        utils.alignCenter(restartButton, board, -300, 250)

        const menuButton = new Button(this.scene, 0, 0, 'button', 'HOME', 100).setScale(0.6)
        menuButton.onClick(() => {
            this.controlBoard.setScale(0)
            this.controlBoard.setAngle(-180)
            this.scene.add.tween({
                targets: this.controlBoard,
                angle: 0,
                scale: 0.8,
                duration: 200,
                onComplete: () => {
                    this.controlBoard.setVisible(false)
                },
            })

            this.scene.scene.stop('gameover')
            const gameplayScene = this.scene.scene.get('gameplay')
            if (gameplayScene instanceof GameplayScene) {
                gameplayScene.doTransition('menu')
            }
        })
        menuButton.onOver(() => {
            menuButton.enableGlow(true)
        })
        menuButton.onOut(() => {
            menuButton.enableGlow(false)
            menuButton.fade(1, 0)
        })
        menuButton.onDown(() => {
            this.scene.sound.play('click-down')
            menuButton.fade(0.8, 0)
        })
        menuButton.onUp(() => {
            this.scene.sound.play('click-up')
            menuButton.fade(1, 0)
        })
        utils.alignCenter(menuButton, board, 300, 250)

        const currentScore = this.scene.add.bitmapText(
            0,
            0,
            'font',
            'SCORE: ' + String(ScoreManager.getCurrentScore()),
            60,
            1
        )
        const highScore = this.scene.add.bitmapText(
            0,
            0,
            'font',
            'HIGHSCORE: ' + String(ScoreManager.getHighScore()),
            60,
            1
        )
        utils.alignCenter(currentScore, board, 0, -50)
        utils.alignCenter(highScore, board, 0, 50)

        this.controlBoard.add(board)
        this.controlBoard.add(banner)
        this.controlBoard.add(restartButton)
        this.controlBoard.add(menuButton)
        this.controlBoard.add(currentScore)
        this.controlBoard.add(highScore)

        this.add(this.controlBoard)

        utils.alignCenter(this.controlBoard, this.screenZone)
    }
}
