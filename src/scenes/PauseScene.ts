import Button from '../objects/Button'
import GameplayScene from './GameplayScene'

export default class PauseScene extends Phaser.Scene {
    private pauseButton: Button

    private replayButton: Button

    private menuButton: Button

    private board: Phaser.GameObjects.Image
    private resumeButton: Button

    constructor() {
        super('pause')
    }

    public preload(): void {}
    public create(): void {
        this.board = this.add.image(600, 500, 'board').setScale(0.5, 0.2).setVisible(false)
        this.pauseButton = new Button(this, 100, 100, 'pause', '')
        this.pauseButton.onClick(() => {
            this.replayButton.setVisible(true)
            this.menuButton.setVisible(true)
            this.pauseButton.setVisible(false)
            this.scene.pause('gameplay')
        })
        this.replayButton = new Button(this, 500, 500, 'replay', '').setVisible(false)
        this.replayButton.onClick(() => {
            this.replayButton.setVisible(false)
            this.menuButton.setVisible(false)
            this.pauseButton.setVisible(true)
            this.scene.resume('gameplay')
        })
        this.replayButton.onOver(() => {
            this.add.tween({
                targets: this.replayButton,
                scale: 0.8,
                duration: 200,
            })
        })
        this.replayButton.onOut(() => {
            this.add.tween({
                targets: this.replayButton,
                scale: 1,
                duration: 200,
            })
        })
        this.menuButton = new Button(this, 600, 600, 'menu', '').setVisible(false)
        this.menuButton.onClick(() => {
            this.scene.stop('pause')
            this.scene.stop('gameplay')
            this.scene.start('menu')
        })
    }
    public update(time: number, timeInterval: number): void {}
}
