import consts from '../consts/consts'
import Button from '../objects/Button'
import GameEventEmitter from '../objects/GameEventEmitter'
import GameplayScene from '../scenes/GameplayScene'
import utils from '../utils/utils'

export default class PauseUI extends Phaser.GameObjects.Container {
    private pauseButton: Button
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
        // Pause button
        this.pauseButton = new Button(this.scene, 100, 100, 'pause', '').setScale(0.7)
        this.pauseButton.onClick(() => {
            this.controlBoard.setScale(0)
            this.controlBoard.setAngle(-180)
            this.controlBoard.setVisible(true)
            this.scene.add.tween({
                targets: this.controlBoard,
                angle: 0,
                scale: 0.8,
                duration: 200,
            })

            this.scene.add.tween({
                targets: this.pauseButton,
                scale: 0,
                duration: 200,
                onComplete: () => {
                    this.pauseButton.setVisible(false)
                },
            })

            this.scene.scene.pause('gameplay')
        })
        this.pauseButton.onOver(() => {
            this.pauseButton.enableGlow(true)
        })
        this.pauseButton.onOut(() => {
            this.pauseButton.enableGlow(false)
            this.pauseButton.fade(1, 0)
        })
        this.pauseButton.onDown(() => {
            this.scene.sound.play('click-down')
            this.pauseButton.fade(0.8, 0)
        })
        this.pauseButton.onUp(() => {
            this.scene.sound.play('click-up')
            this.pauseButton.fade(1, 0)
        })

        // Control board
        this.controlBoard = this.scene.add.container(0, 0).setScale(0.8).setVisible(false)

        const board = this.scene.add.image(0, 0, 'board')

        const banner = new Button(this.scene, 0, 0, 'banner', 'PAUSE', 100)
        utils.alignTopCenter(banner, board, 0, -100)

        const muteIcon = new Button(this.scene, 0, 0, 'unmuted').setScale(0.6)
        let isMuted: boolean = false
        muteIcon.onClick(() => {
            if (!isMuted) {
                isMuted = true
                muteIcon.setTexture('muted')
                this.scene.sound.setVolume(0)
                let sound1 = this.scene.sound.get('click-down') as Phaser.Sound.HTML5AudioSound
                sound1.setVolume(1)
                let sound2 = this.scene.sound.get('click-up') as Phaser.Sound.HTML5AudioSound
                sound2.setVolume(1)
            } else {
                isMuted = false
                muteIcon.setTexture('unmuted')
                this.scene.sound.setVolume(1)
            }
        })
        muteIcon.onOver(() => {
            muteIcon.enableGlow(true)
        })
        muteIcon.onOut(() => {
            muteIcon.enableGlow(false)
        })
        muteIcon.onDown(() => {
            this.scene.sound.play('click-down')
        })
        muteIcon.onUp(() => {
            this.scene.sound.play('click-up')
        })
        utils.alignCenter(muteIcon, board)

        const continueButton = new Button(this.scene, 0, 0, 'button', 'CONTINUE', 100).setScale(0.6)
        continueButton.onClick(() => {
            this.scene.add.tween({
                targets: this.controlBoard,
                angle: 180,
                scale: 0,
                duration: 200,
                onComplete: () => {
                    this.controlBoard.setVisible(false)
                },
            })

            this.pauseButton.setVisible(true)
            this.scene.add.tween({
                targets: this.pauseButton,
                scale: 0.7,
                duration: 200,
            })

            this.scene.scene.resume('gameplay')
        })
        continueButton.onOver(() => {
            continueButton.enableGlow(true)
        })
        continueButton.onOut(() => {
            continueButton.enableGlow(false)
            continueButton.fade(1, 0)
        })
        continueButton.onDown(() => {
            this.scene.sound.play('click-down')
            continueButton.fade(0.8, 0)
        })
        continueButton.onUp(() => {
            this.scene.sound.play('click-up')
            continueButton.fade(1, 0)
        })
        utils.alignCenter(continueButton, board, -300, 200)

        const restartButton = new Button(this.scene, 0, 0, 'button', 'RESTART', 100).setScale(0.6)
        restartButton.onClick(() => {
            this.scene.add.tween({
                targets: this.controlBoard,
                angle: 180,
                scale: 0,
                duration: 200,
                onComplete: () => {
                    this.controlBoard.setVisible(false)
                },
            })

            this.pauseButton.setVisible(true)
            this.scene.add.tween({
                targets: this.pauseButton,
                scale: 0.7,
                duration: 200,
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
        utils.alignCenter(restartButton, board, 300, 200)

        this.controlBoard.add(board)
        this.controlBoard.add(banner)
        this.controlBoard.add(muteIcon)
        this.controlBoard.add(continueButton)
        this.controlBoard.add(restartButton)

        this.add(this.pauseButton)
        this.add(this.controlBoard)

        utils.alignCenter(this.controlBoard, this.screenZone)
    }
}
