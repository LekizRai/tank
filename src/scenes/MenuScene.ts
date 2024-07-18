import consts from "../consts/consts"
import GameEventEmitter from "../objects/GameEventEmitter"
import TransitionScene from "./TransitionScene"

export default class MenuScene extends Phaser.Scene {
    private startKey: Phaser.Input.Keyboard.Key
    private bitmapTexts: Phaser.GameObjects.BitmapText[] = []

    private leftDoor: Phaser.GameObjects.Image
    private rightDoor: Phaser.GameObjects.Image

    private eventEmitter: GameEventEmitter

    constructor() {
        super('menu')
    }

    create(): void {
        this.cameras.main.setBackgroundColor(0x000000)
        // this.add.image(0, 0, 'background').setOrigin(0)

        const startKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        if (startKey) {
            this.startKey = startKey
            this.startKey.isDown = false
        }

        const phrase1 = this.add.bitmapText(
            this.sys.canvas.width / 2 - 400,
            this.sys.canvas.height / 2 + 100,
            'font',
            'CLICK TO PLAY',
            60
        )
        this.add.tween({
            targets: phrase1,
            alpha: 0.2,
            duration: 500,
            yoyo: true,
            repeat: -1,
        })

        const phrase2 = this.add.bitmapText(
            this.sys.canvas.width / 2 - 400,
            this.sys.canvas.height / 2 - 100,
            'font',
            'TANK',
            200
        )

        this.input.once('pointerdown', () => {
            this.doTransition('menu')
        })

        this.scene.launch('transition')
        this.eventEmitter = GameEventEmitter.getInstance()
    }

    update(): void {}

    private doTransition(sceneKey: string): void {
        const transitionScene = this.scene.get('transition')
        if (transitionScene instanceof TransitionScene) {
            transitionScene.doTransition()
        }
        const fx = this.cameras.main.postFX.addWipe(0.3, 1, 1)
            this.scene.transition({
                target: 'gameplay',
                duration: 2000,
                allowInput: false,
                moveBelow: true,
                onUpdate: (progress: number) => {
                    if (progress == 1) {
                        this.eventEmitter.emit('transitiondone')
                    }
                    fx.progress = progress
                },
            })
    }
}
